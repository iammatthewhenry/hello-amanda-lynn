import { Hero, AboutSection, ShopSection, PollResults, TopFive, BrowseByCategorySection, ExploreMore } from '@/components';

// Route segment config — tell Next.js to fully statically render this page.
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
