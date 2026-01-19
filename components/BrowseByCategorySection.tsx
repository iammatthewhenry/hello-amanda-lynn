import { CategoryCard } from './CategoryCard';
import { Section, SectionHeader } from './ui';

const RECIPE_CATEGORIES = [
  {
    title: 'Breakfast',
    image: '/images/categories/category-breakfast.jpg',
    href: '/recipes/breakfast',
  },
  {
    title: 'Appetizers',
    image: '/images/categories/category-appetizers.jpg',
    href: '/recipes/appetizers',
  },
  {
    title: 'Dinners',
    image: '/images/categories/category-dinners.jpg',
    href: '/recipes/dinners',
  },
  {
    title: 'Sides',
    image: '/images/categories/category-sides.jpg',
    href: '/recipes/sides',
  },
  {
    title: 'Desserts',
    image: '/images/categories/category-desserts.jpg',
    href: '/recipes/desserts',
  },
  {
    title: 'Drinks',
    image: '/images/categories/category-drinks.jpg',
    href: '/recipes/drinks',
  },
  {
    title: 'Holiday',
    image: '/images/categories/category-holiday.jpg',
    href: '/recipes/holiday',
  },
  {
    title: 'Americana',
    image: '/images/categories/category-americana.jpg',
    href: '/recipes/americana',
  },
];

export function BrowseByCategorySection() {
  return (
    <Section spacing="lg" containerSize="7xl">
      <SectionHeader title="Browse by Category" centered />

      {/* Figma-aligned spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 sm:gap-16 lg:gap-20">
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
