// components/SectionPageLayout.tsx

import { ReactNode } from 'react';
import { Breadcrumbs } from './breadcrumbs';

// ===================================================================
// TYPES
// ===================================================================
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface SectionPageLayoutProps<T> {
  title: string;
  description: string;
  breadcrumbItems: BreadcrumbItem[];
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemsPerPage?: number;
  heroClassName?: string;
  gridClassName?: string;
  children?: ReactNode; // Bottom sections
}

// ===================================================================
// SECTION PAGE LAYOUT
// ===================================================================
export function SectionPageLayout<T>({
  title,
  description,
  breadcrumbItems,
  items,
  renderItem,
  itemsPerPage = 10,
  heroClassName = '',
  gridClassName = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12',
  children,
}: SectionPageLayoutProps<T>) {
  // Add "Home" as first breadcrumb item
  const fullBreadcrumbs = [
    { label: 'Home', href: '/' },
    ...breadcrumbItems,
  ];

  // For now, show all items (pagination can be added later)
  const displayedItems = items.slice(0, itemsPerPage);

  return (
    <main className="min-h-screen">
      {/* Breadcrumbs */}
      <section className="bg-background py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={fullBreadcrumbs} />
        </div>
      </section>

      {/* Page Header */}
      <section className={`py-8 sm:py-12 lg:py-16 ${heroClassName}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-foreground/70">
            {description}
          </p>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-8 sm:py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className={gridClassName}>
            {displayedItems.map((item, index) => renderItem(item, index))}
          </div>
        </div>
      </section>

      {/* Bottom Sections (passed as children) */}
      {children}
    </main>
  );
}
