import HeroSlider from '@/components/hero-slider';
import { PollResults } from '@/components/poll-results';
import { BrowseByCategorySection } from '@/components/browse-by-category-section';
import { ExploreMore } from '@/components/explore-more';
import { AboutSection } from '@/components/about-section';
import { TopFive } from '@/components/top-five';
import { ShopSection } from '@/components/shop-section';
// import { getHomepageData, getPollResults, getShopItems } from '@/lib/api/homepage';

/**
 * Homepage - Server Component
 * 
 * Fetches data from WordPress GraphQL and passes to client components as props.
 * Falls back to component defaults if WordPress data is unavailable.
 */

// ISR: Revalidate every 60 seconds for dynamic homepage content
export const revalidate = 60;


// Import fallback/defaults for all sections
import { defaultCategories } from '@/components/browse-by-category-section';
import { defaultData as topFiveDefault } from '@/components/top-five';
import { defaultItems as shopDefaultItems } from '@/components/shop-section';
// import { PollResults } from '@/components/poll-results';

const pollFallback = {
  title: 'Poll Results',
  description: "Here's what our community loves most",
  results: [
    { rank: 1, text: 'Chocolate Chip Cookies', percentage: 82 },
    { rank: 2, text: 'Ice Cream', percentage: 76 },
    { rank: 3, text: 'Cheesecake', percentage: 71 },
    { rank: 4, text: 'Brownies', percentage: 65 },
    { rank: 5, text: 'Apple Pie', percentage: 58 }
  ],
  totalResponses: 0,
  pollLink: '/poll',
};

export default function HomePage() {
  return (
    <main>
      <HeroSlider />
      {/* Poll Results - always fallback */}
      <PollResults {...pollFallback} />
      {/* Browse by Category - always fallback */}
      <BrowseByCategorySection categories={defaultCategories} />
      <ExploreMore />
      <AboutSection />
      {/* Top Five Recipes - always fallback */}
      <TopFive data={topFiveDefault} />
      {/* Shop Section - always fallback */}
      <ShopSection items={shopDefaultItems} />
    </main>
  );
}
