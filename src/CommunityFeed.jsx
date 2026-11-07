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

  // Inside handleSubmit
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
    // ...
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
    <div style={styles.container}>
      <h2>Community Forum</h2>

      {/* Post Composer */}
      {session ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            rows="3"
            placeholder="Write anything on your mind related to Dostoevsky."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={styles.textarea}
          />
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      ) : (
        <p style={styles.signInPrompt}>
          Please sign in to join the conversation!
        </p>
      )}

      {/* Feed List */}
      <div style={styles.feed}>
        {posts.map((post) => {
          const authorName = post.profiles?.full_name || 'Anonymous User';
          const isPostOwner = session?.user?.id === post.user_id;
          const isReplyingHere = replyingToPostId === post.id;

          // Added explicit return here!
          return (
            <div key={post.id} style={styles.card}>
              <div style={styles.header}>
                <span style={styles.author}>{authorName}</span>
                <span style={styles.date}>
                  {new Date(post.created_at).toLocaleString()}
                </span>
              </div>
              <p style={styles.content}>{post.content}</p>

              <div style={styles.postActions}>
                {isPostOwner && (
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    style={styles.deleteBtn}
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
                    style={styles.replyToggleBtn}
                  >
                    {isReplyingHere ? 'Cancel' : 'Respond'}
                  </button>
                )}
              </div>

              {/* Reply Input Form */}
              {isReplyingHere && (
                <div style={styles.replyFormContainer}>
                  <textarea
                    rows="2"
                    placeholder="Write a response..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    style={styles.textarea}
                  />
                  <button
                    onClick={() => handleReplySubmit(post.id)}
                    disabled={replyLoading}
                    style={styles.replySubmitBtn}
                  >
                    {replyLoading ? 'Sending...' : 'Send Reply'}
                  </button>
                </div>
              )}

              {/* Comments Thread */}
              {post.post_comments && post.post_comments.length > 0 && (
                <div style={styles.commentsList}>
                  {post.post_comments.map((comment) => {
                    const commentAuthor =
                      comment.profiles?.full_name || 'Anonymous User';
                    const isCommentOwner =
                      session?.user?.id === comment.user_id;

                    // Added explicit return here too!
                    return (
                      <div key={comment.id} style={styles.commentCard}>
                        <div style={styles.commentHeader}>
                          <span style={styles.commentAuthor}>
                            {commentAuthor}
                          </span>
                          <span style={styles.date}>
                            {new Date(comment.created_at).toLocaleTimeString(
                              [],
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              },
                            )}
                          </span>
                        </div>
                        <p style={styles.commentContent}>{comment.content}</p>
                        {isCommentOwner && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            style={styles.deleteCommentBtn}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  textarea: {
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    resize: 'vertical',
  },
  button: {
    alignSelf: 'flex-end',
    padding: '0.5rem 1.5rem',
    backgroundColor: '#3ecf8e',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  signInPrompt: {
    color: '#666',
    fontStyle: 'italic',
    marginBottom: '1.5rem',
  },
  feed: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  card: {
    padding: '1rem',
    borderRadius: '6px',
    border: '1px solid #e1e4e8',
    backgroundColor: '#ffffff',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem',
  },
  author: {
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: '0.8rem',
    color: '#888',
  },
  content: {
    margin: '0 0 0.5rem 0',
    color: '#444',
    whiteSpace: 'pre-wrap',
  },
  postActions: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#e53e3e',
    fontSize: '0.8rem',
    cursor: 'pointer',
    padding: 0,
  },
  replyToggleBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#3182ce',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: 0,
  },
  replyFormContainer: {
    marginTop: '0.75rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    paddingLeft: '1rem',
    borderLeft: '2px solid #3182ce',
  },
  replySubmitBtn: {
    alignSelf: 'flex-end',
    padding: '0.4rem 1rem',
    backgroundColor: '#3182ce',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
  commentsList: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    paddingLeft: '1rem',
    borderLeft: '2px solid #e2e8f0',
  },
  commentCard: {
    padding: '0.75rem',
    borderRadius: '4px',
    backgroundColor: '#f7fafc',
    border: '1px solid #edf2f7',
  },
  commentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.25rem',
  },
  commentAuthor: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
    color: '#2d3748',
  },
  commentContent: {
    margin: '0 0 0.25rem 0',
    fontSize: '0.9rem',
    color: '#4a5568',
    whiteSpace: 'pre-wrap',
  },
  deleteCommentBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#e53e3e',
    fontSize: '0.75rem',
    cursor: 'pointer',
    padding: 0,
  },
};
