'use client';

import { useState } from 'react';

// ===================================================================
// NEWSLETTER SIGNUP COMPONENT
// ===================================================================
interface NewsletterSignupProps {
  className?: string;
}

export function NewsletterSignup({ className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed to subscribe');

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <div className={`bg-background border-b border-border ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-foreground/70 mb-3 sm:mb-6 text-sm sm:text-base">
            Get new recipes and kitchen tips delivered straight to your inbox!
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="w-full sm:flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-[#FEFAF8] border border-border focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent transition-all text-sm sm:text-base disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-1.5 sm:px-6 sm:py-3 bg-green text-white font-semibold hover:opacity-70 transition-opacity whitespace-nowrap text-sm sm:text-base disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          {status === 'success' && (
            <p className="text-green mt-3 sm:mt-4 text-sm font-medium">✓ Successfully subscribed!</p>
          )}
          {status === 'error' && (
            <p className="text-red-500 mt-3 sm:mt-4 text-sm font-medium">✗ Failed to subscribe. Please try again.</p>
          )}
        </div>
      </div>
    </div>
  );
}
