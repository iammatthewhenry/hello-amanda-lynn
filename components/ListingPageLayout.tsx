'use client';

import { useState } from 'react';
import { Pagination } from './Pagination';
import { Container, Section, PageHeader } from './ui';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ListingPageLayoutProps<T> {
  title: string;
  description: string;
  breadcrumbItems: BreadcrumbItem[];
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemsPerPage?: number;
  heroClassName?: string; // For custom hero background styling
  gridClassName?: string; // For custom grid layout
  children?: React.ReactNode; // For additional sections like quick tips
}

export function ListingPageLayout<T>({
  title,
  description,
  breadcrumbItems,
  items,
  renderItem,
  itemsPerPage = 12,
  heroClassName = 'bg-white',
  gridClassName = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8',
  children,
}: ListingPageLayoutProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination calculations
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main>
      {/* Breadcrumbs */}
      {breadcrumbItems.length > 0 && (
        <Container className="-mt-1.5 mb-8">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className="text-foreground/50">•</span>}
                {item.href ? (
                  <a href={item.href} className="text-green hover:text-green/70 transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-foreground">{item.label}</span>
                )}
              </div>
            ))}
          </nav>
        </Container>
      )}

      {/* Hero/Description Section */}
      <Section spacing="lg" className={`${heroClassName} border-b border-border`}>
        <PageHeader
          title={title}
          description={description}
          className="mb-0"
        />
      </Section>

      {/* Grid Section */}
      <Section spacing="lg">
        {currentItems.length > 0 ? (
          <div className={gridClassName}>
            {currentItems.map((item, index) => renderItem(item, index))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/70">No items found.</p>
          </div>
        )}
      </Section>

      {/* Pagination */}
      {totalPages > 1 && (
        <Section spacing="lg" className="pt-0">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Section>
      )}

      {/* Additional Sections */}
      {children}
    </main>
  );
}
