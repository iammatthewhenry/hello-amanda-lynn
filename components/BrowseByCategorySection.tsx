import { CategoryCard } from './CategoryCard';
import { Section, SectionHeader } from './ui';

const CATEGORIES = [
  {
    title: 'In The Kitchen',
    image:
      'https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    href: '/in-the-kitchen',
  },
  {
    title: 'Out of Kitchen',
    image:
      'https://images.unsplash.com/photo-1758275682464-ddd906bf34fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    href: '/out-of-kitchen',
  },
];

export function BrowseByCategorySection() {
  return (
    <Section spacing="lg" containerSize="4xl">
      <SectionHeader
        title="Browse by Category"
        centered
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CATEGORIES.map((category) => (
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
