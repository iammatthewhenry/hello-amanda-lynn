'use client';

import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { ShopSection } from '@/components/ShopSection';
import { PollResults } from '@/components/PollResults';
import { TopFive } from '@/components/TopFive';
import { BrowseByCategorySection } from '@/components/BrowseByCategorySection';
import { ExploreMore } from '@/components/ExploreMore';

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
