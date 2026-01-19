import { CategoryCard } from './CategoryCard';
import { Section, SectionHeader } from './ui';
import { ReactNode } from 'react';

// ===================================================================
// TYPES
// ===================================================================
interface ExploreCategory {
  title: string;
  description: ReactNode;
  image: string;
  page: string;
}

interface ExploreMoreProps {
  categories?: ExploreCategory[];
}

// ===================================================================
// DEFAULT CATEGORIES
// ===================================================================
const DEFAULT_CATEGORIES: ExploreCategory[] = [
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
// EXPLORE MORE
// ===================================================================
export function ExploreMore({ categories = DEFAULT_CATEGORIES }: ExploreMoreProps) {
  return (
    <Section spacing="lg" containerSize="4xl">
      <SectionHeader
        title="Explore More"
        subtitle="Dive deeper into my culinary world with stories, tips, and adventures"
        centered
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            description={category.description}
            image={category.image}
            href={`/${category.page}`}
          />
        ))}
      </div>
    </Section>
  );
}
