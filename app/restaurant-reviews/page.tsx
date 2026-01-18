'use client';

import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Pagination } from '@/components/Pagination';
import { useState } from 'react';
import { Container, Section, PageHeader, ReadMoreLink } from '@/components/ui';

interface RestaurantReview {
  name: string;
  city: string;
  state: string;
  cuisine: string;
  description: string;
  slug: string;
  date: string;
  image: string;
}

export default function RestaurantReviewsIndexPage() {
  const router = useRouter();

  const restaurantReviews: RestaurantReview[] = [
    {
      name: 'Corner Café',
      city: 'Seattle',
      state: 'WA',
      cuisine: 'Brunch & Café',
      description: 'The perfect Sunday brunch spot with legendary pancakes.',
      slug: 'corner-cafe',
      date: 'September 29, 2025',
      image: 'https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJ1bmNofGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'Le Petit Chef',
      city: 'San Francisco',
      state: 'CA',
      cuisine: 'Fine Dining',
      description: 'A 7-course journey through seasonal ingredients and creativity.',
      slug: 'le-petit-chef',
      date: 'September 20, 2025',
      image: 'https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxNDE5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080'
    },
    {
      name: 'The Garden Bistro',
      city: 'Portland',
      state: 'OR',
      cuisine: 'Farm-to-table',
      description: 'A hidden gem with seasonal menu and intimate atmosphere.',
      slug: 'the-garden-bistro',
      date: 'October 15, 2025',
      image: 'https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MTQwOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080'
    }
  ].sort((a, b) => a.name.localeCompare(b.name));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(restaurantReviews.length / itemsPerPage);
  const currentItems = restaurantReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <main>
      {/* Breadcrumbs - Standalone */}
      <Container size="4xl" className="-mt-1.5 mb-8">
        <Breadcrumbs items={[
          { label: 'Out of Kitchen', href: '/out-of-kitchen' },
          { label: 'Restaurant Reviews' }
        ]} />
      </Container>

      {/* Hero */}
      <Section spacing="lg" containerSize="4xl">
        <PageHeader
          title="Restaurant Reviews"
          description="My favorite dining experiences, from cozy cafés to fine dining establishments. Join me as I explore and share honest reviews of local and destination restaurants."
        />
      </Section>

      {/* Restaurant Reviews List */}
      <Container size="4xl" className="py-20">
        <div className="space-y-8">
          {currentItems.map((review) => (
            <article 
              key={review.slug}
              className="border-b border-gray-200 pb-8 last:border-b-0 cursor-pointer group"
              onClick={() => router.push(`/out-of-kitchen/${review.slug}`)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex-1 order-2 sm:order-1">
                  <h2 className="mb-2 group-hover:text-green transition-colors">
                    {review.name}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-muted-foreground text-sm">
                    <span>{review.city}, {review.state}</span>
                    <span>•</span>
                    <span>{review.cuisine}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {review.description}
                  </p>
                  <ReadMoreLink href={`/out-of-kitchen/${review.slug}`}>
                    Read Review
                  </ReadMoreLink>
                </div>
                <div className="w-full sm:w-48 h-48 flex-shrink-0 order-1 sm:order-2">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover border-[16px] border-white border border-gray-200"
                    style={{
                      boxShadow: 'var(--shadow-hero)'
                    }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>
    </main>
  );
}
