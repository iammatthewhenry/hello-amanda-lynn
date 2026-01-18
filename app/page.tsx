'use client';

import { useRouter } from 'next/navigation';
import { Hero } from '@/components/Hero';
import { CategoryCard } from '@/components/CategoryCard';
import { AboutSection } from '@/components/AboutSection';
import { ShopSection } from '@/components/ShopSection';
import { PollResults } from '@/components/PollResults';
import { TopFive } from '@/components/TopFive';
import { BrowseByCategorySection } from '@/components/BrowseByCategorySection';
import { Section, SectionHeader, Container } from '@/components/ui';

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
    image: 'https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
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
    image: 'https://images.unsplash.com/photo-1758275682464-ddd906bf34fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJhdmVsJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjE5MzcyMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    page: 'out-of-kitchen',
  },
];

// ===================================================================
// HOME PAGE COMPONENT
// ===================================================================
export default function HomePage() {
  const router = useRouter();

  return (
    <main>
      {/* Hero Slider */}
      <div className="mt-16 sm:mt-20">
        <Hero />
      </div>

      {/* Poll Results */}
      <PollResults />

      {/* Browse by Recipe Category */}
      <BrowseByCategorySection />

      {/* Explore More Section */}
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
              description={category.description}
              image={category.image}
              onClick={() => router.push(`/${category.page}`)}
            />
          ))}
        </div>
      </Section>

      {/* About Section */}
      <AboutSection />

      {/* Top Five Recipes */}
      <TopFive />

      {/* Shop Section */}
      <ShopSection />
    </main>
  );
}
