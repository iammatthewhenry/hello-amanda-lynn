import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

/*
 Locked breadcrumb layout
 - Tape will never clip
 - Same vertical start on all pages
 - Matches global grid
*/
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn(
      "pt-8 sm:pt-10 pb-2 relative z-10", 
      className
    )}>
      <div className="relative inline-flex flex-wrap overflow-visible">
        
        {/* Tape background */}
        <div 
          className="absolute bg-[#F5EBE8]/80 pointer-events-none"
          style={{
            top: '-10px',
            bottom: '-10px',
            left: '-22px',
            right: '-22px',
            transform: 'skewY(-1deg)',
            boxShadow: '0 3px 8px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.4)',
            borderTop: '1px solid rgba(212,165,165,0.2)',
            borderBottom: '1px solid rgba(212,165,165,0.2)',
          }}
        />

        {/* Breadcrumb content */}
        <div className="bg-secondary px-3 py-1.5 inline-flex relative">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap">
              {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                  <div key={index} className="inline-flex items-center gap-2">
                    <li>
                      {isLast ? (
                        <span className="text-green text-sm font-medium">
                          {item.label}
                        </span>
                      ) : (
                        <Link 
                          href={item.href!}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                    {!isLast && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </ol>
          </nav>
        </div>

      </div>
    </div>
  );
}

export default Breadcrumbs;
