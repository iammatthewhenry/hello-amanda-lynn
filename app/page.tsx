'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { ShopSection } from '@/components/ShopSection';
import { PollResults } from '@/components/PollResults';
import { TopFive } from '@/components/TopFive';
import { BrowseByCategorySection } from '@/components/BrowseByCategorySection';
import { Section, SectionHeader } from '@/components/ui';

export const dynamic = 'force-static';

// ===================================================================
// HOME PAGE CONFIGURATION
// ===================================================================
const EXPLORE_CATEGORIES = [
  {
    title: 'In The Kitchen',
    description: (
      <>
        Cooking techniques
        <br />
        and tips
      </>
    ),
    image:
      'https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    page: 'in-the-kitchen',
  },
  {
    title: 'Out of Kitchen',
    description: (
      <>
        Restaurant reviews
        <br />
        and culinary travels
      </>
    ),
    image:
      'https://images.unsplash.com/photo-1758275682464-ddd906bf34fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    page: 'out-of-kitchen',
  },
];

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
      <Section spacing="lg" containerSize="4xl">
        <SectionHeader
          title="Explore More"
          subtitle="Dive deeper into my culinary world with stories, tips, and adventures"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {EXPLORE_CATEGORIES.map((category) => (
            <Link 
              key={category.title}
              href={`/${category.page}`}
              className="group relative block overflow-hidden rounded-lg aspect-[16/10]"
            >
              <div className="relative w-full h-full">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* About */}
      <AboutSection />

      {/* Top Five Recipes */}
      <TopFive />

      {/* Shop */}
      <ShopSection />
    </main>
  );
}
