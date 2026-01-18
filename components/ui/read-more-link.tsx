import Link from 'next/link';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface ReadMoreLinkProps {
  href: string;
  children?: ReactNode;
  /** Show arrow icon */
  showArrow?: boolean;
  /** Arrow direction */
  arrowDirection?: 'right' | 'down';
  className?: string;
}

/**
 * Read more link component with hover effect
 * Replaces: .read-more-link CSS class
 */
export function ReadMoreLink({
  href,
  children = 'Read More',
  showArrow = true,
  arrowDirection = 'right',
  className,
}: ReadMoreLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-green hover:text-primary transition-colors inline-flex items-center gap-2',
        className
      )}
    >
      {children}
      {showArrow && (
        <svg
          className={cn(
            'w-4 h-4 transition-transform',
            arrowDirection === 'down' && 'rotate-90'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </Link>
  );
}

export default ReadMoreLink;
