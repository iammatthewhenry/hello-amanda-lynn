// app/error.tsx - Global Error Boundary
'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Application error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: 700,
        color: '#7a9b8e',
        marginBottom: '1rem',
      }}>
        Oops! Something went wrong
      </h1>
      
      <p style={{
        fontSize: '1.125rem',
        color: '#2c2c2c',
        marginBottom: '2rem',
        maxWidth: '500px',
      }}>
        We're sorry for the inconvenience. Our team has been notified and we're working on fixing this issue.
      </p>
      
      <button
        onClick={() => reset()}
        style={{
          padding: '0.75rem 2rem',
          backgroundColor: '#7a9b8e',
          color: 'white',
          border: 'none',
          borderRadius: '0.25rem',
          fontSize: '1rem',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'opacity 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      >
        Try again
      </button>
      
      <a
        href="/"
        style={{
          marginTop: '1rem',
          color: '#7a9b8e',
          textDecoration: 'underline',
          fontSize: '0.875rem',
        }}
      >
        Or go back to homepage
      </a>
    </div>
  );
}
