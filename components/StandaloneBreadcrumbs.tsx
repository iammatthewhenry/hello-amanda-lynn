import { Breadcrumbs } from '@/components/Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface StandaloneBreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Standalone breadcrumbs with positioning that matches recipe category pages
 * Use when breadcrumbs appear alone without a page header (like About page)
 * 
 * Positioning matches the breadcrumbs inside PageHeader component:
 * - Same container and horizontal padding
 * - Same top padding (pt-4) 
 * - Shorter bottom padding (pb-4) since no title follows
 */
export function StandaloneBreadcrumbs({ items }: StandaloneBreadcrumbsProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
      <Breadcrumbs items={items} />
    </div>
  );
}
