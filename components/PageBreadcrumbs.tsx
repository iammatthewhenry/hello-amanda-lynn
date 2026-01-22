import { Breadcrumbs } from './Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * PageBreadcrumbs component - Provides consistent breadcrumb positioning across all pages
 * 
 * Positioning:
 * - Horizontal: container mx-auto px-4 sm:px-6 lg:px-8
 * - Vertical: pt-4
 * 
 * This ensures breadcrumbs appear at the identical position on all pages,
 * regardless of whether a PageHeader component follows or not.
 * 
 * Usage:
 * - Pages WITH PageHeader: No additional spacing needed
 * - Pages WITHOUT PageHeader: Add pt-6 sm:pt-8 to <main> tag for content spacing
 */
export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  // Automatically prepend "Home" to breadcrumb trail
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...items
  ];

  return (
    <Breadcrumbs 
      items={breadcrumbItems} 
      className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4" 
    />
  );
}
