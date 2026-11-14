import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navButtonStyle =
    'block w-full md:w-auto text-center border-double border-4 border-sky-200 font-extrabold text-white bg-blue-500 hover:bg-blue-600 rounded-full py-2.5 px-5 transition-colors duration-200';

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-slate-50 border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top Row: Brand Title + Mobile Hamburger Button */}
        <div className="flex items-center justify-between md:hidden">
          <Link
            to="/"
            onClick={closeMenu}
            className="font-serif font-bold text-xl text-slate-900"
          >
            Dostoevsky Hub
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
            className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isOpen ? (
              /* Close (X) Icon */
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              /* Hamburger Menu Icon */
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links: Stacked dropdown on mobile, horizontal row on md+ */}
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } md:flex flex-col md:flex-row md:flex-wrap md:justify-around items-stretch md:items-center gap-3 md:gap-4 mt-4 md:mt-0`}
        >
          <Link to="/" onClick={closeMenu} className={navButtonStyle}>
            Home
          </Link>

          <Link to="/books" onClick={closeMenu} className={navButtonStyle}>
            Books
          </Link>

          <Link to="/signin" onClick={closeMenu} className={navButtonStyle}>
            Sign up/Sign in
          </Link>

          <Link
            to="/CommunityFeed"
            onClick={closeMenu}
            className={navButtonStyle}
          >
            Community
          </Link>

          <Link to="/about" onClick={closeMenu} className={navButtonStyle}>
            About
          </Link>

          <a
            href="https://www.youtube.com/watch?v=ckzmEoIhqJs"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className={navButtonStyle}
          >
            Documentary
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
