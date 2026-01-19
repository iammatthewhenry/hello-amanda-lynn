'use client';

import { Hero } from '@/components/Hero';
import { CategoryCard } from '@/components/CategoryCard';
import { AboutSection } from '@/components/AboutSection';
import { ShopSection } from '@/components/ShopSection';
import { PollResults } from '@/components/PollResults';
import { TopFive } from '@/components/TopFive';
import { BrowseByCategorySection } from '@/components/BrowseByCategorySection';
import { Section, SectionHeader } from '@/components/ui';

export const dynamic = 'force-static';

const EXPLORE_CATEGORIES = [
  {
    title: 'In The Kitchen',
    image:
      'https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    page: 'in-the-kitchen',
  },
  {
    title: 'Out of Kitchen',
    image:
      'https://images.unsplash.com/photo-1758275682464-ddd906bf34fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    page: 'out-of-kitchen',
  },
];

export default function HomePage() {
  return (
    <main>
      <Hero />
      <PollResults />
      <BrowseByCategorySection />

      <Section spacing="lg" containerSize="4xl">
        <SectionHeader
          title="Explore More"
          subtitle="Dive deeper into my culinary world with stories, tips, and adventures"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {EXPLORE_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              image={category.image}
              href={`/${category.page}`}
            />
          ))}
        </div>
      </Section>

      <AboutSection />
      <TopFive />
      <ShopSection />
    </main>
  );
}
