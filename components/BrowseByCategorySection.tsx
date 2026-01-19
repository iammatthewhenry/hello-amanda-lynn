import { CategoryCard } from './CategoryCard';
import { Section, SectionHeader } from './ui';

const RECIPE_CATEGORIES = [
  {
    title: 'Breakfast',
    image:
      'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1080&q=80',
    href: '/recipes/breakfast',
  },
  {
    title: 'Appetizers',
    image:
      'https://images.unsplash.com/photo-1541014741259-de529411b96a?auto=format&fit=crop&w=1080&q=80',
    href: '/recipes/appetizers',
  },
  {
    title: 'Dinners',
    image:
      'https://images.unsplash.com/photo-1604908177522-0409f1a0f46a?auto=format&fit=crop&w=1080&q=80',
    href: '/recipes/dinners',
  },
  {
    title: 'Sides',
    image:
      'https://images.unsplash.com/photo-1605478580705-7bfa5b6c3b2c?auto=format&fit=crop&w=1080&q=80',
    href: '/recipes/sides',
  },
  {
    title: 'Desserts',
    image:
      'https://images.unsplash.com/photo-1505253716362-afaea1b7b6ae?auto=format&fit=crop&w=1080&q=80',
    href: '/recipes/desserts',
  },
  {
    title: 'Drinks',
    image:
      'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1080&q=80',
    href: '/recipes/drinks',
  },
  {
    title: 'Holiday',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1080&q=80',
    href: '/recipes/holiday',
  },
  {
    title: 'Americana',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1080&q=80',
    href: '/recipes/americana',
  },
];

export function BrowseByCategorySection() {
  return (
    <Section spacing="lg" containerSize="4xl">
      <SectionHeader title="Browse by Category" centered />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {RECIPE_CATEGORIES.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            image={category.image}
            href={category.href}
            size="sm"
          />
        ))}
      </div>
    </Section>
  );
}
