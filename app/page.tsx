'use client';

import { Hero, AboutSection, ShopSection, PollResults, TopFive, BrowseByCategorySection, ExploreMore } from '@/components';

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
