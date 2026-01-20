'use client';

import { Hero } from '@/components/Hero';
import { FeaturedPosts } from '@/components/FeaturedPosts';
import { RestaurantReviews } from '@/components/RestaurantReviews';
import { TravelMap } from '@/components/TravelMap';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

// ===================================================================
// OUT OF KITCHEN PAGE
// ===================================================================
export default function OutOfKitchenPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Out of Kitchen' }
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Page Header Section - Custom styling to match "Out of Kitchen" theme */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green mb-4">
            Out of Kitchen
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Restaurant reviews, culinary travels, and food adventures beyond the home kitchen
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      <FeaturedPosts />

      {/* Restaurant Reviews */}
      <RestaurantReviews />

      {/* Travel Map */}
      <TravelMap />
    </main>
  );
}
