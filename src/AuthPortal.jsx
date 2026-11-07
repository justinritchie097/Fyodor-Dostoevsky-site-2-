import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function AuthPortal({ onAuthSuccess }) {
  // Views: 'signin' | 'signup' | 'forgot'
  const [view, setView] = useState('signin');

  // Form Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // UI States
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const clearMessages = () => {
    setErrorMsg('');
    setInfoMsg('');
  };

  // 1. Handle Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }, // Store extra user metadata
      },
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setInfoMsg(
        'Registration successful! Please check your email for a confirmation link.',
      );
    }
  };

  // 2. Handle Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      if (onAuthSuccess) onAuthSuccess(data.session);
    }
  };

  // 3. Handle Password Reset Request
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    clearMessages();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      setInfoMsg('Password reset link sent to your email.');
    }
  };

  // 4. Handle OAuth (Google / GitHub)
  const handleOAuthSignIn = async (provider) => {
    clearMessages();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) setErrorMsg(error.message);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Navigation Tabs */}
        <div style={styles.tabContainer}>
          <button
            style={view === 'signin' ? styles.activeTab : styles.tab}
            onClick={() => {
              setView('signin');
              clearMessages();
            }}
          >
            Sign In
          </button>
          <button
            style={view === 'signup' ? styles.activeTab : styles.tab}
            onClick={() => {
              setView('signup');
              clearMessages();
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Feedback Messages */}
        {errorMsg && <div style={styles.errorBanner}>{errorMsg}</div>}
        {infoMsg && <div style={styles.infoBanner}>{infoMsg}</div>}

        {/* Forms */}
        {view === 'signin' && (
          <form onSubmit={handleSignIn} style={styles.form}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => {
                setView('forgot');
                clearMessages();
              }}
              style={styles.linkBtn}
            >
              Forgot your password?
            </button>
          </form>
        )}

        {view === 'signup' && (
          <form onSubmit={handleSignUp} style={styles.form}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
              style={styles.input}
            />
            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        )}

        {view === 'forgot' && (
          <form onSubmit={handleForgotPassword} style={styles.form}>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </button>
            <button
              type="button"
              onClick={() => {
                setView('signin');
                clearMessages();
              }}
              style={styles.linkBtn}
            >
              Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f4f5f7',
    fontFamily: 'sans-serif',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '2px solid #e1e4e8',
    marginBottom: '1.5rem',
  },
  tab: {
    flex: 1,
    padding: '0.75rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#586069',
  },
  activeTab: {
    flex: 1,
    padding: '0.75rem',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid #3ecf8e',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
    color: '#3ecf8e',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #d1d5da',
    fontSize: '1rem',
  },
  submitBtn: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#3ecf8e',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#0366d6',
    cursor: 'pointer',
    fontSize: '0.875rem',
    textAlign: 'center',
  },
  errorBanner: {
    backgroundColor: '#ffeef0',
    color: '#b31d28',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.875rem',
  },
  infoBanner: {
    backgroundColor: '#dcffe4',
    color: '#165c26',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    fontSize: '0.875rem',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: '1.5rem 0',
    color: '#8c8c8c',
    fontSize: '0.75rem',
  },
  oauthContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  oauthBtn: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #d1d5da',
    backgroundColor: '#fafbfc',
    cursor: 'pointer',
    fontSize: '0.875rem',
  },
};
