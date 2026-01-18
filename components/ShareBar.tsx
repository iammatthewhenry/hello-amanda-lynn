'use client';

import { useState, useCallback } from 'react';
import { Check, Printer, Share2 } from 'lucide-react';
import { getSocialIcon, type SocialPlatform } from './SocialIcons';

// ===================================================================
// TYPES
// ===================================================================
interface ShareBarProps {
  url?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  showPrint?: boolean;
}

// ===================================================================
// SHARE URL GENERATORS
// ===================================================================
function getShareUrls(url: string, title: string, description: string, imageUrl: string) {
  return {
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}${imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ''}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description + '\n\n' + url)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  };
}

// ===================================================================
// SHARE BUTTON COMPONENT
// ===================================================================
interface ShareButtonProps {
  href: string;
  label: string;
  platform: SocialPlatform | 'email' | 'reddit' | 'whatsapp';
  children?: React.ReactNode;
}

function ShareButton({ href, label, platform, children }: ShareButtonProps) {
  const isPlatformIcon = ['facebook', 'pinterest', 'instagram', 'youtube', 'x'].includes(platform);
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-foreground/70 hover:text-green hover:scale-110 transition-all duration-200"
      aria-label={label}
      title={label}
    >
      {isPlatformIcon ? getSocialIcon(platform as SocialPlatform, 'w-5 h-5') : children}
    </a>
  );
}

// ===================================================================
// CUSTOM ICONS FOR NON-SOCIAL PLATFORMS
// ===================================================================
const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const RedditIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

// ===================================================================
// SHARE BAR COMPONENT
// ===================================================================
export function ShareBar({
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Check out this recipe!',
  description = '',
  imageUrl = '',
  showPrint = true,
}: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== 'undefined' && navigator.share;
  const shareUrls = getShareUrls(url, title, description, imageUrl);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  const handleNativeShare = useCallback(async () => {
    if (canShare) {
      try {
        await navigator.share({ title, text: description, url });
      } catch {
        // Share cancelled or failed
      }
    }
  }, [canShare, title, description, url]);

  const handlePrint = useCallback(() => window.print(), []);

  return (
    <div className="share-bar-container">
      {/* Mobile Native Share Button */}
      {canShare && (
        <div className="block md:hidden mb-6">
          <button
            onClick={handleNativeShare}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-green text-white transition-all hover:bg-green/90 rounded-lg font-semibold"
            aria-label="Share"
          >
            <Share2 size={20} />
            <span>Share</span>
          </button>
        </div>
      )}

      {/* Desktop Share Bar */}
      <div className={`${canShare ? 'hidden md:flex' : 'flex'} items-center justify-center gap-1 flex-wrap bg-white rounded-lg p-4 border border-border`}>
        <ShareButton href={shareUrls.pinterest} label="Share on Pinterest" platform="pinterest" />
        <ShareButton href={shareUrls.facebook} label="Share on Facebook" platform="facebook" />
        <ShareButton href={shareUrls.x} label="Share on X" platform="x" />
        
        <ShareButton href={shareUrls.whatsapp} label="Share on WhatsApp" platform="whatsapp">
          <WhatsAppIcon />
        </ShareButton>
        
        <ShareButton href={shareUrls.email} label="Share via Email" platform="email">
          <EmailIcon />
        </ShareButton>
        
        <ShareButton href={shareUrls.reddit} label="Share on Reddit" platform="reddit">
          <RedditIcon />
        </ShareButton>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="p-2 text-foreground/70 hover:text-green hover:scale-110 transition-all duration-200"
          aria-label="Copy Link"
          title={copied ? 'Copied!' : 'Copy Link'}
        >
          {copied ? <Check size={20} className="text-green" /> : <LinkIcon />}
        </button>

        {/* Print */}
        {showPrint && (
          <button
            onClick={handlePrint}
            className="p-2 text-foreground/70 hover:text-green hover:scale-110 transition-all duration-200"
            aria-label="Print"
            title="Print"
          >
            <Printer size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
