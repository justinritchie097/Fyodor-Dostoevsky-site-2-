import { useState, useEffect } from 'react';

function BookLinks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalFound, setTotalFound] = useState(0);

  useEffect(() => {
    const apikey = import.meta.env.VITE_API_KEY;

    const PAGE_SIZE = 40;
    let uniqueBooksMap = new Map();

    const fetchEntireCatalog = (currentIndex = 0) => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:%22Fyodor%20Dostoevsky%22&Max_Results=${PAGE_SIZE}&startIndex=${currentIndex}&key=${apikey}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const fetchedItems = data.items || [];

          if (fetchedItems.length === 0) {
            setBooks(Array.from(uniqueBooksMap.values()));
            setLoading(false);
            return;
          }

          fetchedItems.forEach((book) => {
            const title = book.volumeInfo?.title?.toLowerCase().trim();
            if (title && !uniqueBooksMap.has(title)) {
              uniqueBooksMap.set(title, book);
            }
          });

          setTotalFound(uniqueBooksMap.size);
          fetchEntireCatalog(currentIndex + fetchedItems.length);
        })
        .catch((err) => {
          console.error('Catalog fetch error:', err);
          setBooks(Array.from(uniqueBooksMap.values()));
          setLoading(false);
        });
    };

    fetchEntireCatalog(0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-200">
      {/* Header Banner */}
      <header className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white py-16 px-6 text-center border-b-4 border-amber-500 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wide mb-4">
            Fyodor Dostoevsky
          </h1>
          <p className="text-slate-300 italic text-base md:text-lg max-w-2xl mx-auto font-serif">
            "Beauty will save the world"
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          /* Loading State skeleton container */
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-lg font-medium text-slate-600 animate-pulse">
              Indexing Google Library... Found{' '}
              <span className="text-indigo-600 font-bold">{totalFound}</span>{' '}
              unique volumes
            </p>
          </div>
        ) : (
          <div>
            {/* Meta bar */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-5 mb-8">
              <h2 className="text-xl font-semibold text-slate-800">
                Collected Works
              </h2>
              <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                {books.length} Unique Titles Available
              </span>
            </div>

            {/* Responsive Book Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {books.map((book) => {
                const {
                  title,
                  authors,
                  publishedDate,
                  imageLinks,
                  description,
                } = book.volumeInfo;
                const year = publishedDate
                  ? publishedDate.split('-')[0]
                  : 'N/A';

                return (
                  <article
                    key={book.id}
                    className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {/* Book Cover Frame */}
                    <div className="bg-slate-100 p-6 flex items-center justify-center min-h-[220px] relative overflow-hidden border-b border-slate-100">
                      {imageLinks?.thumbnail ? (
                        <img
                          src={imageLinks.thumbnail.replace(
                            'http://',
                            'https://',
                          )}
                          alt={`${title} cover`}
                          className="h-40 w-auto object-contain shadow-md rounded group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-40 w-28 bg-slate-300 flex items-center justify-center rounded shadow-inner text-center p-4">
                          <span className="text-xs text-slate-500 font-serif italic">
                            No Cover Available
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Book Metadata details */}
                    <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-1">
                        <h3
                          className="font-serif font-bold text-slate-900 leading-snug text-base line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200"
                          title={title}
                        >
                          {title}
                        </h3>
                        <p className="text-xs font-medium text-slate-500">
                          {authors ? authors.join(', ') : 'Fyodor Dostoevsky'}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                        <span>Published</span>
                        <span className="font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {year}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* Modern Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs border-t border-slate-800 mt-20">
        <p>
          © 2026 Digital Library Project. Curating major literary history
          handles safely via API.
        </p>
      </footer>
    </div>
  );
}

export default BookLinks;
