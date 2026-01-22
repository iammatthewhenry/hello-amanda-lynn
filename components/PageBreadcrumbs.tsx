import { Breadcrumbs } from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * PageBreadcrumbs - Wrapper component with standardized positioning
 * 
 * This component automatically applies the North Star positioning specs:
 * - Container width with responsive padding
 * - Proper top spacing (pt-4)
 * - Left-aligned positioning
 * 
 * Usage:
 * <PageBreadcrumbs items={breadcrumbItems} />
 * 
 * No need to manually add className or positioning - it's all handled automatically!
 */
export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <Breadcrumbs items={items} />
    </div>
  );
}

export default PageBreadcrumbs;