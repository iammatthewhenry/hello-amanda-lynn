'use client';

import { Hero } from '@/components/Hero';
import { BrowseByCategorySection } from '@/components/BrowseByCategorySection';
import { TopFive } from '@/components/TopFive';
import { NameThisGame } from '@/components/NameThisGame';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

// ===================================================================
// IN THE KITCHEN PAGE
// ===================================================================
export default function InTheKitchenPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'In The Kitchen' }
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Page Header Section - Custom styling to match "In The Kitchen" theme */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-background to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green mb-4">
            In The Kitchen
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Cooking techniques, tips, and everything you need to master your culinary skills
          </p>
        </div>
      </section>

      {/* Browse by Recipe Category */}
      <BrowseByCategorySection />

      {/* Name This Game */}
      <NameThisGame 
        gameTitle="Name This Dish!"
        gameDescription="Test your culinary knowledge - can you identify this delicious creation?"
        imageUrl="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800"
        correctAnswer="Salad"
        hint="It's fresh, healthy, and often served as a starter!"
        difficulty="easy"
      />

      {/* Top Five Recipes */}
      <TopFive />
    </main>
  );
}
