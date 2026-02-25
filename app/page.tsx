import { heroSlider as HeroSlider } from '@/components/hero-slider';
import { PollResults } from '@/components/poll-results';
import { BrowseByCategorySection } from '@/components/browse-by-category-section';
import { ExploreMore } from '@/components/explore-more';
import { AboutSection } from '@/components/about-section';
import { TopFive } from '@/components/top-five';
import { ShopSection } from '@/components/shop-section';
import { getHomepageData, getPollResults, getShopItems } from '@/lib/api/homepage';

/**
 * Homepage - Server Component
 * 
 * Fetches data from WordPress GraphQL and passes to client components as props.
 * Falls back to component defaults if WordPress data is unavailable.
 */

// ISR: Revalidate every 60 seconds for dynamic homepage content
export const revalidate = 60;

export default async function HomePage() {
  // Fetch all homepage data in parallel
  const [homepageData, pollResults, shopItems] = await Promise.all([
    getHomepageData(),
    getPollResults(),
    getShopItems(),
  ]);

  return (
    <main>
      <HeroSlider />
      
      {/* Poll Results - uses defaults if data is null */}
      <PollResults {...(pollResults || {})} />
      
      {/* Browse by Category - passes WordPress categories or uses defaults */}
      <BrowseByCategorySection categories={homepageData?.categories} />
      
      <ExploreMore />
      
      <AboutSection />
      
      {/* Top Five Recipes - uses defaults for now (TODO: wire to WP data) */}
      <TopFive />
      
      {/* Shop Section - uses defaults if data is null */}
      <ShopSection {...(shopItems || {})} />
    </main>
  );
}
