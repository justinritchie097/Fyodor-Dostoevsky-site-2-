import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Mainimg from './Mainimg';
import Home from './Home';
import BookLinks from './BookLinks';
import About from './About';
import AuthPortal from './AuthPortal';
import CommunityFeed from './CommunityFeed';
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';
import Signin from './signin';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Listen for login / logout events
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <div></div>

      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        {/* 1. Navbar stays on top of every page layout */}
        <Navbar />

        {/* 3. Dynamic content block based on current browser path address */}
        <main className="flex-grow">
          <Routes>
            {/* Path for the homepage layout view */}
            <Route path="/" element={<Home />} />

            {/* Path for navigating specifically to view book lists / details */}

            <Route path="/signin" element={<Signin />} />
            <Route path="/books" element={<BookLinks />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/CommunityFeed"
              element={<CommunityFeed session={session} />}
            />
          </Routes>
        </main>

        {/* 4. Footer stays pinned to the absolute bottom of all paths */}
        <Footer />
      </div>
    </>
  );
}
export default App;
