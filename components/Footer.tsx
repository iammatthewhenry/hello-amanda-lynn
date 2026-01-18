// components/Footer.tsx - REFACTORED VERSION
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { SocialIconsRow, DEFAULT_SOCIAL_LINKS } from './SocialIcons';
import { Container, Button } from '@/components/ui';

const FOOTER_LINKS = [
  { href: '/work-with-me', label: 'Work With Me' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
] as const;

const MEDIA_LOGOS = ['PBS', 'Better Homes & Gardens', 'Food Network'] as const;

interface FooterProps {
  showBannerAd?: boolean;
}

export default function Footer({ showBannerAd = true }: FooterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: React.FormEvent) => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-6">
      {/* Banner Ad */}
      {showBannerAd && (
        <div className="bg-background border-b border-border">
          <Container size="7xl" className="py-6 sm:py-8">
            <div className="w-full max-w-[728px] h-[90px] mx-auto bg-muted border-2 border-border flex items-center justify-center rounded-lg">
              <div className="text-center px-4">
                <p className="text-muted-foreground text-xs sm:text-sm">Advertisement</p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">728x90 Banner Ad</p>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-background border-b border-border">
        <Container size="7xl" className="py-6 sm:py-12 lg:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-6">
              Get new recipes and kitchen tips delivered straight to your inbox!
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="w-full sm:flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-white border-2 border-green focus:outline-none focus:ring-2 focus:ring-green/50 transition-all text-sm sm:text-base rounded-lg"
              />
              <Button
                type="submit"
                disabled={status === 'loading'}
                variant="green"
                className="whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            
            {status === 'success' && (
              <p className="text-green mt-3 sm:mt-4">✓ Successfully subscribed!</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 mt-3 sm:mt-4">✗ Failed to subscribe. Please try again.</p>
            )}
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <div className="bg-secondary">
        <Container size="7xl" className="py-8 sm:py-12">
          <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:justify-between px-4 sm:px-6 lg:px-12">
            {/* Social Icons */}
            <div className="flex flex-col items-center gap-4 order-1">
              <SocialIconsRow links={DEFAULT_SOCIAL_LINKS} size="md" />
            </div>

            {/* AS SEEN ON Box */}
            <div className="flex flex-col items-center gap-4 order-2">
              <div className="px-6 py-4 sm:py-6 w-full lg:w-fit bg-secondary border border-border rounded-lg shadow-sm">
                <p className="text-xs sm:text-sm tracking-wider mb-3 sm:mb-4 text-center text-green font-semibold">
                  AS SEEN ON
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
                  {MEDIA_LOGOS.map((media) => (
                    <span key={media} className="text-sm sm:text-base font-semibold text-foreground">
                      {media}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Back to Top & Footer Links */}
            <div className="flex flex-col items-center gap-4 order-3">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-1 text-green hover:text-green/70 transition-colors font-semibold"
                aria-label="Back to top"
              >
                <ArrowUp size={16} />
                <span className="text-xs sm:text-sm">BACK TO TOP</span>
              </button>
              
              <div className="flex flex-col gap-3 sm:gap-4 items-center text-xs sm:text-sm">
                <div className="flex gap-2 sm:gap-4 items-center">
                  {FOOTER_LINKS.slice(0, 2).map((link, index) => (
                    <span key={link.href} className="flex items-center">
                      <Link href={link.href} className="text-green hover:text-green/70 transition-colors">
                        {link.label}
                      </Link>
                      {index < 1 && <span className="text-foreground/50 mx-2 sm:mx-3">•</span>}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 sm:gap-4 items-center">
                  {FOOTER_LINKS.slice(2).map((link, index) => (
                    <span key={link.href} className="flex items-center">
                      <Link href={link.href} className="text-green hover:text-green/70 transition-colors">
                        {link.label}
                      </Link>
                      {index < FOOTER_LINKS.slice(2).length - 1 && (
                        <span className="text-foreground/50 mx-2 sm:mx-3">•</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 sm:pt-8 border-t border-green text-foreground/70 text-xs sm:text-sm">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:justify-center">
              <p>&copy; {currentYear} Hello Amanda Lynn. All rights reserved.</p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
