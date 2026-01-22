import { Breadcrumbs } from '@/components/Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  description?: string;
}

/**
 * Page header with optional breadcrumbs and consistent container spacing
 * Updated to match Out of Kitchen page spacing patterns
 */
export function PageHeader({ breadcrumbs, title, description }: PageHeaderProps) {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-6" />}
      <h1 className="text-[48px] font-bold text-foreground mb-4">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground max-w-3xl">{description}</p>
      )}
    </section>
  );
}
