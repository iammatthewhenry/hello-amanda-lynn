import { ArrowUp } from "lucide-react";
import { useState } from "react";
import Link from 'next/link';

// SocialIcon Component
interface SocialIconProps {
  platform: 'facebook' | 'pinterest' | 'x' | 'youtube' | 'instagram';
  href?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

function SocialIcon({
  platform,
  href = '#',
  size = 'medium',
  className = '',
}: SocialIconProps) {
  const sizeClasses = {
    small: 'w-8 h-8 xl:w-10 xl:h-10',
    medium: 'w-10 h-10 sm:w-12 sm:h-12',
    large: 'w-12 h-12',
  };
  
  const iconSizes = {
    small: { width: 16, height: 16, className: 'xl:w-[18px] xl:h-[18px]' },
    medium: { width: 18, height: 18, className: 'sm:w-[22px] sm:h-[22px]' },
    large: { width: 22, height: 22, className: '' },
  };
  
  const baseClasses = `${sizeClasses[size]} rounded-full flex items-center justify-center hover:opacity-70 hover:scale-105 transition-all duration-300 bg-green`;
  const finalClasses = `${baseClasses} ${className}`.trim();
  const iconSize = iconSizes[size];
  
  const icons = {
    instagram: (
      <svg width={iconSize.width} height={iconSize.height} className={iconSize.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="#FEFAF8"/>
      </svg>
    ),
    facebook: (
      <svg width={iconSize.width} height={iconSize.height} className={iconSize.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z" fill="#FEFAF8"/>
      </svg>
    ),
    pinterest: (
      <svg width={iconSize.width} height={iconSize.height} className={iconSize.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" fill="#FEFAF8"/>
      </svg>
    ),
    x: (
      <svg width={iconSize.width} height={iconSize.height} className={iconSize.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#FEFAF8"/>
      </svg>
    ),
    youtube: (
      <svg width={iconSize.width} height={iconSize.height} className={iconSize.className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FEFAF8"/>
      </svg>
    ),
  };
  
  return (
    <a
      href={href}
      className={finalClasses}
      aria-label={platform.charAt(0).toUpperCase() + platform.slice(1)}
    >
      {icons[platform]}
    </a>
  );
}

// SeenOnBox Component
interface SeenOnBoxProps {
  className?: string;
}

function SeenOnBox({ className = '' }: SeenOnBoxProps) {
  return (
    <div className={`px-6 py-4 sm:py-6 w-full bg-white rounded-lg ${className}`.trim()} style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
      <p className="text-xs sm:text-sm tracking-wider mb-3 sm:mb-4 text-center text-green font-semibold">
        AS SEEN ON
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
        {/* PBS */}
        <div className="flex items-center">
          <span className="text-2xl sm:text-3xl text-foreground font-bold" style={{ fontFamily: 'serif' }}>PBS</span>
        </div>
        
        {/* Better Homes & Gardens */}
        <div className="flex items-center">
          <div className="text-center">
            <div className="text-xs sm:text-sm tracking-wide text-foreground font-semibold">BETTER HOMES</div>
            <div className="text-xs sm:text-sm tracking-wide -mt-1 text-foreground font-semibold">& GARDENS</div>
          </div>
        </div>
        
        {/* Food Network */}
        <div className="flex items-center">
          <div className="text-center">
            <div className="text-base sm:text-lg text-foreground font-semibold">FOOD</div>
            <div className="text-base sm:text-lg -mt-1 text-foreground font-semibold">NETWORK</div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FooterProps {
  showBannerAd?: boolean;
}

export default function Footer({ showBannerAd = true }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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
    <footer className="mt-6">
      {/* Banner Ad */}
      {showBannerAd && (
        <div className="bg-background border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="w-full max-w-[728px] h-[90px] mx-auto bg-muted border-2 border-border flex items-center justify-center rounded-lg">
              <div className="text-center px-4">
                <p className="text-muted-foreground text-xs sm:text-sm">Advertisement</p>
                <p className="text-muted-foreground text-[10px] sm:text-xs mt-1">728x90 Banner Ad</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-6">
              Get new recipes and kitchen tips delivered straight to your inbox!
            </h2>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="w-full sm:flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-white border-2 border-green focus:outline-none focus:ring-2 focus:ring-green/50 transition-all text-sm sm:text-base rounded-lg"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="inline-block px-4 sm:px-5 py-2 sm:py-3 bg-green text-white font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity whitespace-nowrap rounded-lg"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            {status === 'success' && (
              <p className="text-green mt-3 sm:mt-4">✓ Successfully subscribed!</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 mt-3 sm:mt-4">✗ Failed to subscribe. Please try again.</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="mb-6 sm:mb-8 flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:justify-between">
            
            {/* Social Icons and Butterfly - Left */}
            <div className="flex flex-col items-center gap-4 order-1">
              {/* Social Icons */}
              <div className="flex gap-3 sm:gap-4">
                <SocialIcon platform="instagram" href="https://instagram.com" size="medium" />
                <SocialIcon platform="facebook" href="https://facebook.com" size="medium" />
                <SocialIcon platform="pinterest" href="https://pinterest.com" size="medium" />
                <SocialIcon platform="x" href="https://twitter.com" size="medium" />
                <SocialIcon platform="youtube" href="https://youtube.com" size="medium" />
              </div>
              
              {/* Butterfly Image Placeholder */}
              <div className="flex justify-center">
                <div className="w-20 h-16 bg-green/20 rounded-lg flex items-center justify-center text-xs text-green">
                  🦋 Butterfly
                </div>
              </div>
            </div>

            {/* AS SEEN ON Box - Center */}
            <div className="flex flex-col items-center gap-4 order-2">
              <SeenOnBox />
            </div>

            {/* Back to Top & Footer Links - Right */}
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
                  <Link href="/work-with-me" className="text-green hover:text-green/70 transition-colors">
                    Work With Me
                  </Link>
                  <span className="text-foreground/50 mx-2 sm:mx-3">•</span>
                  <Link href="/contact" className="text-green hover:text-green/70 transition-colors">
                    Contact
                  </Link>
                </div>
                
                <div className="flex gap-2 sm:gap-4 items-center">
                  <Link href="/privacy" className="text-green hover:text-green/70 transition-colors">
                    Privacy
                  </Link>
                  <span className="text-foreground/50 mx-2 sm:mx-3">•</span>
                  <Link href="/terms" className="text-green hover:text-green/70 transition-colors">
                    Terms
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-6 sm:pt-8 border-t border-green text-foreground/70 text-xs sm:text-sm">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:justify-center">
              <p>&copy; {currentYear} hello Amanda Lynn. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
