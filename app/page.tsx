'use client';

import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about-section';
import { ShopSection } from '@/components/shop-section';
import { PollResults } from '@/components/poll-results';
import { TopFive } from '@/components/top-five';
import { BrowseByCategorySection } from '@/components/browse-by-category-section';
import { ExploreMore } from '@/components/explore-more';

export const dynamic = 'force-static';

// ===================================================================
// HOME PAGE
// ===================================================================
export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Poll Results */}
      <PollResults />

      {/* Browse by Recipe Category */}
      <BrowseByCategorySection />

      {/* Explore More */}
      <ExploreMore />

      {/* About */}
      <AboutSection />

      {/* Top Five Recipes */}
      <TopFive />

      {/* Shop */}
      <ShopSection />
    </main>
  );
}
