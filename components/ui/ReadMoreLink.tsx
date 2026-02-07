import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ReadMoreLinkProps {
  children?: ReactNode;
  href: string;
  className?: string;
  variant?: 'default' | 'arrow' | 'button';
}

export function ReadMoreLink({ 
  children = 'Read More', 
  href, 
  className,
  variant = 'default'
}: ReadMoreLinkProps) {
  const baseClasses = cn(
    'inline-flex items-center gap-2 font-semibold transition-colors',
    'text-green hover:text-green/70',
    className
  );

  if (variant === 'button') {
    return (
      <Link 
        href={href} 
        className={cn(
          'inline-block px-4 py-2 bg-green text-white rounded-lg hover:bg-green/90 transition-colors',
          className
        )}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={baseClasses}>
      {children}
      {variant === 'arrow' && (
        <span className="transition-transform group-hover:translate-x-1">→</span>
      )}
    </Link>
  );
}

export default ReadMoreLink;
