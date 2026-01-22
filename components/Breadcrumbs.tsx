import Link from 'next/link';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * Tape-style breadcrumbs navigation component
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      className={cn('flex items-center text-xs overflow-hidden', className)} 
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === items.length - 1;
        
        return (
          <div
            key={index}
            className={cn(
              'relative px-3 py-2 min-h-[32px] flex items-center',
              'bg-green text-white transition-colors',
              // First item - no left arrow
              !isFirst && 'ml-[-8px] pl-4',
              // Last item - different color and no right arrow
              isLast && 'bg-[#F5EBE8] text-foreground',
              // Right arrow for all except last
              !isLast && "after:content-[''] after:absolute after:right-[-8px] after:top-0 after:w-0 after:h-0 after:border-l-[8px] after:border-t-[16px] after:border-b-[16px] after:border-t-transparent after:border-b-transparent after:z-10",
              !isLast && 'after:border-l-green',
              // Special case for second-to-last item
              index === items.length - 2 && 'after:border-l-green',
              // Left arrow for all except first
              !isFirst && "before:content-[''] before:absolute before:left-0 before:top-0 before:w-0 before:h-0 before:border-l-[8px] before:border-t-[16px] before:border-b-[16px] before:border-t-transparent before:border-b-transparent before:border-l-white before:z-0"
            )}
            style={isLast ? {} : { 
              clipPath: isFirst 
                ? 'polygon(0 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%)'
                : 'polygon(8px 0, calc(100% - 8px) 0, 100% 50%, calc(100% - 8px) 100%, 0 100%, 8px 50%)'
            }}
          >
            {item.href ? (
              <Link 
                href={item.href} 
                className={cn(
                  'font-medium transition-opacity hover:opacity-80 relative z-10',
                  isLast ? 'text-foreground' : 'text-white'
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(
                'font-medium relative z-10',
                isLast ? 'text-foreground' : 'text-white'
              )}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
