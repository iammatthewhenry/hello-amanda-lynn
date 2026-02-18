import { CategoryCard } from './category-card';
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
    page: 'ook',
  },
];

// ===================================================================
// EXPLORE MORE
// ===================================================================
export function ExploreMore({ categories = DEFAULT_CATEGORIES }: ExploreMoreProps) {
  return (
    <section className="py-[22px] sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green tracking-tight mb-4">
            Explore More
          </h2>
          <p className="text-lg text-muted-foreground">
            Dive deeper into my culinary world with stories, tips, and adventures
          </p>
        </div>

        {/* Category Grid */}
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
      </div>
    </section>
  );
}
