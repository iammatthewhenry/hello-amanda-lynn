'use client';

import { ListingPageLayout } from '@/components/ListingPageLayout';
import { RecipeCard } from '@/components/RecipeCard';

export default function AmericanaPage() {
  const americanaRecipes = [
    {
      id: 'apple-pie',
      title: 'Classic Apple Pie',
      description: 'Traditional American dessert with a buttery crust and spiced apple filling.',
      image: 'https://images.unsplash.com/photo-1504521800090-033f378e1e54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHBpZXxlbnwxfHx8fDE3NjE5NjEwMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '90 min',
      servings: '8 servings',
    },
    {
      id: 'burger-deluxe',
      title: 'Deluxe American Burger',
      description: 'Juicy beef patty with all the fixings on a classic bun.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbiUyMGJ1cmdlcnxlbnwxfHx8fDE3NjE5NjEwMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '20 min',
      servings: '4 servings',
    },
    {
      id: 'bbq-ribs',
      title: 'BBQ Ribs',
      description: 'Fall-off-the-bone ribs with a rich BBQ sauce.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYnElMjByaWJzfGVufDF8fHx8fDE3NjE5NjEwMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '240 min',
      servings: '6 servings',
    },
    {
      id: 'mac-cheese',
      title: 'Mac and Cheese',
      description: 'Creamy, cheesy pasta comfort food at its finest.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWMlMjBhbmQlMjBjaGVlc2V8ZW58MXx8fHwxNzYxOTYxMDA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '35 min',
      servings: '6 servings',
    },
    {
      id: 'fried-chicken',
      title: 'Southern Fried Chicken',
      description: 'Crispy, golden fried chicken with a perfectly seasoned crust.',
      image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc45e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMGNoaWNrZW58ZW58MXx8fHwxNzYxOTYxMDA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '60 min',
      servings: '4 servings',
    },
    {
      id: 'cornbread',
      title: 'Classic Cornbread',
      description: 'Sweet and savory cornbread perfect as a side dish.',
      image: 'https://images.unsplash.com/photo-1585238341710-4913b86b456b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuYnJlYWR8ZW58MXx8fHwxNzYxOTYxMDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      time: '35 min',
      servings: '8 servings',
    },
    {
      id: 'clam-chowder',
      title: 'New England Clam Chowder',
      description: 'Creamy white chowder loaded with tender clams and potatoes.',
      image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      time: '45 min',
      servings: '6 servings',
    },
    {
      id: 'buffalo-wings',
      title: 'Buffalo Wings',
      description: 'Spicy chicken wings with tangy buffalo sauce and blue cheese dip.',
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      time: '30 min',
      servings: '4 servings',
    },
  ];

  return (
    <ListingPageLayout
      title="Americana"
      description="Celebrate America's culinary heritage with these classic American recipes. From coast to coast, these timeless dishes represent the heart and soul of American cooking."
      breadcrumbItems={[
        { label: 'Recipes', href: '/recipes' },
        { label: 'Americana' },
      ]}
      items={americanaRecipes}
      renderItem={(recipe, index) => <RecipeCard key={index} {...recipe} />}
      itemsPerPage={10}
    />
  );
}
