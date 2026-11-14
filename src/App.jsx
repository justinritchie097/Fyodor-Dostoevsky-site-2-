import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import BookLinks from './BookLinks';
import About from './About';
import CommunityFeed from './CommunityFeed';
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';
import Signin from './signin';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-slate-50 flex flex-col justify-between">
      {/* 1. Navbar stays on top of every page layout */}
      <Navbar session={session} />

      {/* 2. Responsive container with mobile-first padding */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/books" element={<BookLinks />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/CommunityFeed"
            element={<CommunityFeed session={session} />}
          />
        </Routes>
      </main>

      {/* 3. Footer stays pinned to the bottom */}
      <Footer />
    </div>
  );
}

export default App;
