'use client';

import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import Image from 'next/image';
import { useState } from 'react';

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

// Pagination Component (inline for now)
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Previous
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 text-sm border rounded-md ${
            currentPage === page
              ? 'bg-green text-white border-green'
              : 'hover:bg-gray-50'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );
}

export default function RestaurantReviewsIndexPage() {
  const router = useRouter();

  const restaurantReviews: RestaurantReview[] = [
    {
      name: "Corner Café",
      city: "Seattle",
      state: "WA",
      cuisine: "Brunch & Café",
      description: "The perfect Sunday brunch spot with legendary pancakes.",
      slug: "corner-cafe",
      date: "September 29, 2025",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJ1bmNofGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "Le Petit Chef",
      city: "San Francisco",
      state: "CA",
      cuisine: "Fine Dining",
      description: "A 7-course journey through seasonal ingredients and creativity.",
      slug: "le-petit-chef",
      date: "September 20, 2025",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxNDE5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      name: "The Garden Bistro",
      city: "Portland",
      state: "OR",
      cuisine: "Farm-to-table",
      description: "A hidden gem with seasonal menu and intimate atmosphere.",
      slug: "the-garden-bistro",
      date: "October 15, 2025",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MTQwOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1.5 mb-8">
        <Breadcrumbs items={[
          { label: "Out of Kitchen", href: "/ook" },
          { label: "Restaurants" }
        ]} />
      </div>

      {/* Hero */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="page-header">
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-green">Restaurant Reviews</h1>
            <p className="text-lg text-muted-foreground">
              My favorite dining experiences, from cozy cafés to fine dining establishments. 
              Join me as I explore and share honest reviews of local and destination restaurants.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurant Reviews List */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8">
          {currentItems.map((review) => (
            <article 
              key={review.slug}
              className="border-b border-gray-200 pb-8 last:border-b-0 cursor-pointer group"
              onClick={() => router.push(`/ook/restaurants/${review.slug}`)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex-1 order-2 sm:order-1">
                  <h2 className="mb-2 text-2xl sm:text-3xl font-bold group-hover:text-green transition-colors">
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
                  <button className="inline-flex items-center gap-2 text-green font-semibold hover:text-green/70 transition-colors">
                    Read Review
                    <span>→</span>
                  </button>
                </div>
                <div className="w-full sm:w-48 h-48 flex-shrink-0 order-1 sm:order-2">
                  <div className="relative w-full h-full">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 192px"
                      className="object-cover border-[16px] border-white"
                      style={{
                        boxShadow: 'var(--shadow-hero)'
                      }}
                    />
                  </div>
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
      </section>
    </main>
  );
}
