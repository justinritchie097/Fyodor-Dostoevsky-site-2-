import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import AuthPortal from './AuthPortal';

export default function CommunityFeed({ session }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);

  const [replyingToPostId, setReplyingToPostId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  // 1. Fetch posts with joined profiles and nested comments
  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        id,
        content,
        created_at,
        user_id,
        profiles (
          full_name
        ),
        post_comments (
          id,
          content,
          created_at,
          user_id,
          profiles (
            full_name
          )
        )
      `,
      )
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error.message);
    } else {
      const formattedPosts = (data || []).map((post) => ({
        ...post,
        post_comments: (post.post_comments || []).sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at),
        ),
      }));
      setPosts(formattedPosts);
    }
  };

  useEffect(() => {
    fetchPosts();

    const uniqueChannelName = `public:feed:${Math.random()}`;
    const channel = supabase
      .channel(uniqueChannelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'posts' },
        () => fetchPosts(),
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'post_comments' },
        () => fetchPosts(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 2. Handle publishing a new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) {
      alert('You must be signed in to post.');
      return;
    }
    if (!newPost.trim()) return;

    setLoading(true);
    const { error } = await supabase.from('posts').insert([
      {
        content: newPost,
        user_id: session.user.id,
      },
    ]);
    setLoading(false);

    if (error) {
      alert('Error creating post: ' + error.message);
    } else {
      setNewPost('');
    }
  };

  // 3. Handle publishing a reply
  const handleReplySubmit = async (postId) => {
    if (!replyText.trim()) return;

    setReplyLoading(true);
    const { error } = await supabase.from('post_comments').insert([
      {
        post_id: postId,
        user_id: session.user.id,
        content: replyText,
      },
    ]);
    setReplyLoading(false);

    if (error) {
      alert('Error posting reply: ' + error.message);
    } else {
      setReplyText('');
      setReplyingToPostId(null);
    }
  };

  // 4. Handle deleting a post
  const handleDeletePost = async (postId) => {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) alert('Could not delete post: ' + error.message);
  };

  // 5. Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    const { error } = await supabase
      .from('post_comments')
      .delete()
      .eq('id', commentId);
    if (error) alert('Could not delete comment: ' + error.message);
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-slate-900">
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mb-6">
        Community Forum
      </h2>

      {/* Post Composer */}
      {session ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-sm mb-8 flex flex-col gap-3"
        >
          <textarea
            rows="3"
            placeholder="Write anything on your mind related to Dostoevsky."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full rounded-lg border border-slate-300 p-3 text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 resize-y"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto sm:self-end bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      ) : (
        <div className="bg-indigo-50 border border-indigo-100 text-indigo-900 rounded-xl p-4 mb-8 text-sm sm:text-base text-center">
          Please sign in to join the conversation!
        </div>
      )}

      {/* Feed List */}
      <div className="space-y-4 sm:space-y-6">
        {posts.map((post) => {
          const authorName = post.profiles?.full_name || 'Anonymous User';
          const isPostOwner = session?.user?.id === post.user_id;
          const isReplyingHere = replyingToPostId === post.id;

          return (
            <article
              key={post.id}
              className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm"
            >
              {/* Post Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                <span className="font-semibold text-slate-900 text-sm sm:text-base">
                  {authorName}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>

              {/* Post Content */}
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words mb-4">
                {post.content}
              </p>

              {/* Post Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
                {isPostOwner && (
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-xs sm:text-sm font-medium text-red-600 hover:text-red-800 py-1.5 px-2.5 rounded-md hover:bg-red-50 transition-colors"
                  >
                    Delete Post
                  </button>
                )}
                {session && (
                  <button
                    onClick={() => {
                      setReplyingToPostId(isReplyingHere ? null : post.id);
                      setReplyText('');
                    }}
                    className="text-xs sm:text-sm font-medium text-indigo-600 hover:text-indigo-800 py-1.5 px-2.5 rounded-md hover:bg-indigo-50 transition-colors"
                  >
                    {isReplyingHere ? 'Cancel' : 'Respond'}
                  </button>
                )}
              </div>

              {/* Reply Input Form */}
              {isReplyingHere && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <textarea
                    rows="2"
                    placeholder="Write a response..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-3 text-base sm:text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600"
                  />
                  <button
                    onClick={() => handleReplySubmit(post.id)}
                    disabled={replyLoading}
                    className="w-full sm:w-auto sm:self-end bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-medium text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    {replyLoading ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              )}

              {/* Comments Thread */}
              {post.post_comments && post.post_comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 pl-3 sm:pl-5 border-l-2 border-indigo-100">
                  {post.post_comments.map((comment) => {
                    const commentAuthor =
                      comment.profiles?.full_name || 'Anonymous User';
                    const isCommentOwner =
                      session?.user?.id === comment.user_id;

                    return (
                      <div
                        key={comment.id}
                        className="bg-slate-50 rounded-lg p-3 sm:p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <span className="font-semibold text-slate-800 text-xs sm:text-sm">
                            {commentAuthor}
                          </span>
                          <span className="text-xs text-slate-400">
                            {new Date(comment.created_at).toLocaleTimeString(
                              [],
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )}
                          </span>
                        </div>
                        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
                          {comment.content}
                        </p>
                        {isCommentOwner && (
                          <div className="mt-2 flex justify-end">
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="text-xs font-medium text-red-600 hover:text-red-800 py-1 px-2 rounded hover:bg-red-100/60 transition-colors"
                            >
                              Delete{' '}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
