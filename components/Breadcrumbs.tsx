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
 * Breadcrumbs navigation component - reverted to original simple pill design
 */
export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      className={cn('flex items-center gap-2 text-xs', className)} 
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-foreground/50">•</span>}
          {item.href ? (
            <Link 
              href={item.href} 
              className="text-green hover:text-green/70 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <div className="bg-[#F5EBE8] px-3 py-2 rounded-lg">
              <span className="text-foreground font-medium">{item.label}</span>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
