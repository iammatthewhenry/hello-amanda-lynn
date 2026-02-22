'use client';

import { Breadcrumbs, GridSection } from '@/components';

export default function DrinksPage() {
  const drinks = [
    {
      slug: 'freshly-squeezed-lemonade',
      title: 'Freshly Squeezed Lemonade',
      description: 'Classic homemade lemonade with fresh lemons and mint.',
      image: 'https://images.unsplash.com/photo-1660664361474-ed33e0b1b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbmFkZSUyMGRyaW5rfGVufDF8fHx8MTc2MTk1NTE1MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'berry-smoothie',
      title: 'Berry Smoothie Bowl',
      description: 'Nutrient-packed smoothie with fresh berries and superfoods.',
      image: 'https://images.unsplash.com/photo-1563282396-c299392870cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGRyaW5rfGVufDF8fHx8MTc2MTk1NTE1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'artisan-coffee-latte',
      title: 'Artisan Coffee Latte',
      description: 'Perfect espresso with steamed milk and beautiful latte art.',
      image: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXR0ZXxlbnwxfHx8fDE3NjE5MzIyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'fresh-lemonade',
      title: 'Fresh Lemonade',
      description: 'Classic homemade lemonade with fresh squeezed lemons.',
      image: 'https://images.unsplash.com/photo-1573500883698-e3ef47a95feb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbmFkZSUyMGRyaW5rfGVufDF8fHx8MTc2MTk1NTE2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'peach-iced-tea',
      title: 'Peach Iced Tea',
      description: 'Refreshing sweet tea infused with fresh peaches.',
      image: 'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwdGVhfGVufDF8fHx8MTc2MTk1NTE2MHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'strawberry-milkshake',
      title: 'Strawberry Milkshake',
      description: 'Creamy milkshake made with fresh strawberries and vanilla ice cream.',
      image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2V8ZW58MXx8fHwxNzYxOTU1MTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="container-max px-4 sm:px-8 pt-6 pb-4">
        <Breadcrumbs 
          items={[
            { label: 'Recipes', href: '/recipes' },
            { label: 'Drinks' },
          ]} 
        />
      </div>

      {/* Page Header */}
      <section className="container-max px-4 sm:px-8 pb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-[48px] font-bold text-foreground mb-4">Drinks</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Refreshing beverages for every occasion. From morning coffee to evening cocktails, discover drinks that complement any meal or moment.
        </p>
      </section>

      {/* Recipe Grid */}
      <GridSection
        title="Drink Recipes"
        posts={drinks}
        baseSlug="/recipes/drinks"
        isFirstSection={true}
      />
    </main>
  );
}
