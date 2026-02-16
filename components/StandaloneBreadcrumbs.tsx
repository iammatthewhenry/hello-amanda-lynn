import { Breadcrumbs } from '@/components/Breadcrumbs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

/*
 LOCKED SITE-WIDE BREADCRUMBS WRAPPER
 Must match recipe page breadcrumb position exactly
 NO extra top padding allowed
*/
export function ({ items }: Props) {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-4">
      <Breadcrumbs items={items} />
    </div>
  );
}
