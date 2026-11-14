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
    <div className="w-full text-slate-900 font-sans selection:bg-amber-200">
      {/* Header Banner: Scaled down padding & text for mobile */}
      <header className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white py-10 sm:py-14 md:py-16 px-4 sm:px-6 text-center rounded-2xl border-b-4 border-amber-500 shadow-lg mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wide mb-3 sm:mb-4">
            Fyodor Dostoevsky
          </h1>
          <p className="text-slate-300 italic text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-serif">
            "Beauty will save the world"
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <section className="w-full">
        {loading ? (
          /* Loading State skeleton container */
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-4 text-center space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-indigo-600"></div>
            <p className="text-base sm:text-lg font-medium text-slate-600 animate-pulse">
              Indexing Google Library... Found{' '}
              <span className="text-indigo-600 font-bold">{totalFound}</span>{' '}
              unique volumes
            </p>
          </div>
        ) : (
          <div>
            {/* Meta bar: Stacks cleanly on very narrow screens */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4 sm:pb-5 mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-slate-800">
                Collected Works
              </h2>
              <span className="self-start sm:self-auto bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
                {books.length} Unique Titles Available
              </span>
            </div>

            {/* Responsive Book Grid: Tighter gaps on mobile, wider on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 lg:gap-8">
              {books.map((book) => {
                const { title, authors, publishedDate, imageLinks } =
                  book.volumeInfo;
                const year = publishedDate
                  ? publishedDate.split('-')[0]
                  : 'N/A';

                return (
                  <article
                    key={book.id}
                    className="flex flex-col bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl sm:hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {/* Book Cover Frame */}
                    <div className="bg-slate-100 p-4 sm:p-6 flex items-center justify-center min-h-[190px] sm:min-h-[220px] relative overflow-hidden border-b border-slate-100">
                      {imageLinks?.thumbnail ? (
                        <img
                          src={imageLinks.thumbnail.replace(
                            'http://',
                            'https://',
                          )}
                          alt={`${title} cover`}
                          loading="lazy"
                          className="h-36 sm:h-40 w-auto object-contain shadow-md rounded group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="h-36 sm:h-40 w-24 sm:w-28 bg-slate-300 flex items-center justify-center rounded shadow-inner text-center p-3 sm:p-4">
                          <span className="text-xs text-slate-500 font-serif italic">
                            No Cover Available
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Book Metadata details */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between space-y-3 sm:space-y-4">
                      <div className="space-y-1">
                        <h3
                          className="font-serif font-bold text-slate-900 leading-snug text-base line-clamp-2 group-hover:text-indigo-600 transition-colors duration-200"
                          title={title}
                        >
                          {title}
                        </h3>
                        <p className="text-xs font-medium text-slate-500 line-clamp-1">
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
      </section>
    </div>
  );
}

export default BookLinks;
