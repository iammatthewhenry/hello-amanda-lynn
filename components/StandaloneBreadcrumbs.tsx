import { Breadcrumbs } from '@/components/Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface StandaloneBreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Standalone breadcrumbs with consistent container and spacing
 * Use when breadcrumbs appear alone without a page header
 */
export function StandaloneBreadcrumbs({ items }: StandaloneBreadcrumbsProps) {
  return (
    <div className="container-max px-8 pt-6 pb-4">
      <Breadcrumbs items={items} />
    </div>
  );
}
