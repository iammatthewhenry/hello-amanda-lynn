'use client';

import { useState, useEffect } from 'react';
import { Section, SectionHeader } from '@/components/ui';

// Fix TypeScript declaration for Cloudflare Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (element: string | HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        'error-callback'?: () => void;
        theme?: 'light' | 'dark' | 'auto';
        size?: 'normal' | 'compact';
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string>('');

  useEffect(() => {
    // Load Cloudflare Turnstile
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.turnstile) {
        const widgetId = window.turnstile.render('#turnstile-widget', {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
          callback: (token: string) => {
            setTurnstileToken(token);
          },
        });
        setTurnstileWidgetId(widgetId);
      }
    };

    return () => {
      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.remove(turnstileWidgetId);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset Turnstile
      if (window.turnstile && turnstileWidgetId) {
        window.turnstile.reset(turnstileWidgetId);
      }
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <main>
      <Section spacing="lg" containerSize="3xl">
        <SectionHeader
          title="Get In Touch"
          subtitle="Have a question or want to work together? I'd love to hear from you!"
          centered
        />

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border-2 border-green/20 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all rounded-md"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border-2 border-green/20 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all rounded-md"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border-2 border-green/20 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all rounded-md"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white border-2 border-green/20 focus:outline-none focus:ring-2 focus:ring-green/50 transition-all rounded-md resize-none"
              />
            </div>

            {/* Cloudflare Turnstile */}
            <div id="turnstile-widget"></div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-6 py-3 bg-green text-white font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-50 rounded-md"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green text-center">✓ Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-center">✗ Failed to send message. Please try again.</p>
            )}
          </form>
        </div>
      </Section>
    </main>
  );
}
