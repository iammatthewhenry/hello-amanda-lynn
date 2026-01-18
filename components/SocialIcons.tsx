import { Instagram, Youtube } from 'lucide-react';
import { cn } from '@/lib/utils';

// ===================================================================
// SOCIAL ICONS - Consolidated component for all social media icons
// Replaces duplicate code in Header.tsx, Footer.tsx, and ShareBar.tsx
// ===================================================================

export type SocialPlatform = 'facebook' | 'pinterest' | 'instagram' | 'youtube' | 'x';

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label?: string;
}

// Default social links - can be overridden via props
export const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { platform: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
  { platform: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
  { platform: 'pinterest', href: 'https://pinterest.com', label: 'Pinterest' },
  { platform: 'youtube', href: 'https://youtube.com', label: 'YouTube' },
];

// ===================================================================
// SVG ICONS - Centralized icon definitions
// ===================================================================
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={cn('w-[18px] h-[18px]', className)}
    aria-hidden="true"
  >
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 3.667h-3.533v7.98H9.101z" />
  </svg>
);

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={cn('w-[18px] h-[18px]', className)}
    aria-hidden="true"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={cn('w-[18px] h-[18px]', className)}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// ===================================================================
// GET ICON COMPONENT
// ===================================================================
export function getSocialIcon(platform: SocialPlatform, className?: string) {
  const icons: Record<SocialPlatform, React.ReactNode> = {
    facebook: <FacebookIcon className={className} />,
    pinterest: <PinterestIcon className={className} />,
    instagram: <Instagram className={cn('w-[18px] h-[18px]', className)} />,
    youtube: <Youtube className={cn('w-[18px] h-[18px]', className)} />,
    x: <XIcon className={className} />,
  };
  return icons[platform];
}

// ===================================================================
// SOCIAL ICON BUTTON - Single icon with link
// ===================================================================
interface SocialIconButtonProps {
  platform: SocialPlatform;
  href: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10 sm:w-12 sm:h-12',
  lg: 'w-12 h-12',
};

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-[18px] h-[18px] sm:w-[22px] sm:h-[22px]',
  lg: 'w-[22px] h-[22px]',
};

export function SocialIconButton({
  platform,
  href,
  label,
  size = 'md',
  variant = 'filled',
  className,
}: SocialIconButtonProps) {
  const baseClasses = cn(
    'rounded-full flex items-center justify-center transition-all duration-300',
    'hover:opacity-70 hover:scale-105',
    sizeClasses[size],
    variant === 'filled' ? 'bg-green text-white' : 'bg-white border-2 border-green text-green',
    className
  );

  return (
    <a
      href={href}
      className={baseClasses}
      aria-label={label || platform}
      target="_blank"
      rel="noopener noreferrer"
    >
      {getSocialIcon(platform, iconSizeClasses[size])}
    </a>
  );
}

// ===================================================================
// SOCIAL ICONS ROW - Group of social icons
// ===================================================================
interface SocialIconsRowProps {
  links?: SocialLink[];
  size?: 'sm' | 'md' | 'lg';
  variant?: 'filled' | 'outline';
  className?: string;
  gap?: 'sm' | 'md' | 'lg';
}

const gapClasses = {
  sm: 'gap-2',
  md: 'gap-3 sm:gap-4',
  lg: 'gap-4',
};

export function SocialIconsRow({
  links = DEFAULT_SOCIAL_LINKS,
  size = 'md',
  variant = 'filled',
  className,
  gap = 'md',
}: SocialIconsRowProps) {
  return (
    <div className={cn('flex', gapClasses[gap], className)}>
      {links.map((link) => (
        <SocialIconButton
          key={link.platform}
          platform={link.platform}
          href={link.href}
          label={link.label}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  );
}
