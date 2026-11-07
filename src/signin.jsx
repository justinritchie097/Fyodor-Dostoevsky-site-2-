import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import AuthPortal from './AuthPortal';

function Signin() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e1e4e8',
      fontFamily: 'sans-serif',
    },
    signOutBtn: {
      padding: '0.5rem 1rem',
      backgroundColor: '#e53e3e',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
  };

  useEffect(() => {
    // 1. Check active session on initial page load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Listen for authentication state changes (sign in, sign out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        Loading session...
      </div>
    );
  }

  return (
    <div>
      {session ? (
        /* Rendered ONLY when signed in */
        <header style={styles.header}>
          <span>
            Logged in as: <strong>{session.user.email}</strong>
          </span>
          <button
            onClick={() => supabase.auth.signOut()}
            style={styles.signOutBtn}
          >
            Sign Out
          </button>
        </header>
      ) : (
        /* Rendered ONLY when signed out */
        <AuthPortal />
      )}
    </div>
  );
}

export default Signin;
