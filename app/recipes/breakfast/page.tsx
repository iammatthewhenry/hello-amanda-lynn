'use client';
import { PageHeader } from '@/components/PageHeader';
import { GridSection } from '@/components/GridSection';

export default function BreakfastPage() {
  const breakfasts = [
    {
      slug: 'fluffy-pancakes',
      title: 'Fluffy Pancakes',
      description: 'Light and airy pancakes perfect for a weekend breakfast.',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBwYW5jYWtlc3xlbnwxfHx8fDE3NjE5NTUzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'eggs-benedict',
      title: 'Eggs Benedict',
      description: 'Classic brunch dish with poached eggs and hollandaise sauce.',
      image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2dzJTIwYmVuZWRpY3R8ZW58MXx8fHwxNzYxOTU1MzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'greek-yogurt-parfait',
      title: 'Greek Yogurt Parfait',
      description: 'Layered yogurt with granola, honey, and fresh berries.',
      image: 'https://images.unsplash.com/photo-1636143938155-4c5735fca7f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjB5b2d1cnR8ZW58MXx8fHwxNzYxOTU1MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'avocado-toast',
      title: 'Avocado Toast',
      description: 'Smashed avocado on toasted sourdough with cherry tomatoes and poached egg.',
      image: 'https://images.unsplash.com/photo-1687276287139-88f7333c8ca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3R8ZW58MXx8fHwxNzYxOTE5ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'berry-smoothie-bowl',
      title: 'Berry Smoothie Bowl',
      description: 'Thick berry smoothie topped with granola, seeds, and fresh fruit.',
      image: 'https://images.unsplash.com/photo-1665833876953-9aa02c235d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBzbW9vdGhpZXxlbnwxfHx8fDE3NjE5NTUzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
  <main className="pt-6 sm:pt-8">
    <PageHeader 
      title="Breakfast"
      description="Start your day right with these delicious breakfast recipes from quick weekday options to leisurely weekend brunches."
    />

    <GridSection
      title="Breakfast Recipes"
      posts={breakfasts}
      baseSlug="/recipes/breakfast"
      isFirstSection={true}
    />
  </main>
);

}
