'use client';

import { RecipeCard } from '@/components/RecipeCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BrowseByCategorySection } from '@/components/BrowseByCategorySection';
import { PageHeader } from '@/components/PageHeader';
import { Container, Section, SectionHeader, Button } from '@/components/ui';

export default function RecipesPage() {
  const allRecipes = [
    {
      id: 'creamy-pasta-carbonara',
      title: 'Creamy Pasta Carbonara',
      description: 'A classic Italian dish with a silky, creamy sauce that comes together in minutes.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYxNDc5NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      time: '30 min',
      servings: '4 servings',
    },
    {
      id: 'summer-harvest-salad',
      title: 'Fresh Summer Salad',
      description: 'Vibrant and refreshing salad bowl packed with seasonal vegetables and herbs.',
      image: 'https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NjE0MjEwNzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      time: '15 min',
      servings: '2 servings',
    },
    {
      id: 'chocolate-layer-cake',
      title: 'Decadent Chocolate Dessert',
      description: 'Rich and indulgent chocolate treat perfect for special occasions.',
      image: 'https://images.unsplash.com/photo-1509512738205-712eca26a2ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBkZXNzZXJ0fGVufDF8fHx8MTc2MTUxMzIzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      time: '45 min',
      servings: '8 servings',
    },
    {
      id: 'gourmet-breakfast-toast',
      title: 'Gourmet Breakfast Toast',
      description: 'Elevated breakfast with perfectly balanced flavors and beautiful presentation.',
      image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjB0YWJsZXxlbnwxfHx8fDE3NjE1MTMyMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      time: '20 min',
      servings: '2 servings',
    },
    {
      id: 'artisan-sourdough-bread',
      title: 'Homemade Artisan Bread',
      description: 'Learn to bake crusty, flavorful bread right in your own kitchen.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwYnJlYWR8ZW58MXx8fHwxNzYxNTEzNDI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      time: '3 hours',
      servings: '1 loaf',
    },
    {
      id: 'thai-green-curry',
      title: 'Thai Green Curry',
      description: 'Aromatic and flavorful curry with coconut milk and fresh herbs.',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGN1cnJ5fGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      time: '40 min',
      servings: '4 servings',
    },
  ];

  return (
    <main>
      {/* Breadcrumbs - Standalone */}
      <Container size="4xl" className="-mt-1.5 mb-8">
        <Breadcrumbs items={[{ label: 'Recipes' }]} />
      </Container>

      {/* Hero */}
      <Section spacing="none" className="pb-0 sm:pb-2 lg:pb-6">
        <PageHeader
          title="Recipes"
          description="Browse through my collection of tried-and-tested recipes. From quick weeknight dinners to special occasion desserts, find your next favorite dish."
        />
      </Section>

      {/* Categories Section */}
      <BrowseByCategorySection />

      {/* Recipe Builder Teaser */}
      <Section spacing="none" className="pb-0 sm:pb-2 lg:pb-6">
        <SectionHeader title="What to Cook?" subtitle="Find Recipes Based on What Ingredients You Have" />
        <Button variant="green" size="lg">
          Recipe Builder
        </Button>
      </Section>

      {/* Quick Recipe Tips */}
      <Section spacing="none" className="pb-0 sm:pb-2 lg:pb-6">
        <SectionHeader title="Featured Recipes" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allRecipes.map((recipe, index) => (
            <RecipeCard key={index} {...recipe} />
          ))}
        </div>
      </Section>
    </main>
  );
}
