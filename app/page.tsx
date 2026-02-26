import HeroSlider from '@/components/hero-slider';
import { PollResults } from '@/components/poll-results';
import { BrowseByCategorySection } from '@/components/browse-by-category-section';
import { ExploreMore } from '@/components/explore-more';
import { AboutSection } from '@/components/about-section';
import { TopFive } from '@/components/top-five';
import { ShopSection } from '@/components/shop-section';

import { getSliderManagerSlides } from '@/lib/api/slider';

export const revalidate = 60;

// fallback imports
import { defaultCategories } from '@/components/browse-by-category-section';
import { defaultData as topFiveDefault } from '@/components/top-five';
import { defaultItems as shopDefaultItems } from '@/components/shop-section';

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

export default async function HomePage() {

  // 🔥 THIS pulls from WordPress plugin
  const slides = await getSliderManagerSlides();

  return (
    <main>

      {/* REAL WORDPRESS SLIDER */}
      <HeroSlider slides={slides} />

      <PollResults {...pollFallback} />
      <BrowseByCategorySection categories={defaultCategories} />
      <ExploreMore />
      <AboutSection />
      <TopFive data={topFiveDefault} />
      <ShopSection items={shopDefaultItems} />

    </main>
  );
}