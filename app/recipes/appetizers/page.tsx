'use client';

import { PageHeader } from '@/components/layout/PageHeader';
import { GridSection } from '@/components/GridSection';

export default function AppetizersPage() {
  const appetizers = [
    {
      slug: 'classic-bruschetta',
      title: 'Classic Bruschetta',
      description: 'Toasted bread topped with fresh tomatoes, basil, and garlic.',
      image: 'https://images.unsplash.com/photo-1536739782508-c2388552aad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVzY2hldHRhJTIwYXBwZXRpemVyfGVufDF8fHx8MTc2MTg3OTA3M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'artisan-cheese-board',
      title: 'Artisan Cheese Board',
      description: 'Curated selection of gourmet cheeses with fruits, nuts, and honey.',
      image: 'https://images.unsplash.com/photo-1589881210718-42da05899fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBwbGF0dGVyfGVufDF8fHx8MTc2MTk1NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'fresh-spring-rolls',
      title: 'Fresh Spring Rolls',
      description: 'Light and refreshing Vietnamese rolls with vegetables and herbs.',
      image: 'https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjByb2xsc3xlbnwxfHx8fDE3NjE4ODg1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'stuffed-mushrooms',
      title: 'Stuffed Mushrooms',
      description: 'Savory mushroom caps filled with herbs, cheese, and breadcrumbs.',
      image: 'https://images.unsplash.com/photo-1622268805718-ca073548d4ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVmZmVkJTIwbXVzaHJvb21zfGVufDF8fHx8MTc2MTk1NTE0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'deviled-eggs',
      title: 'Deviled Eggs',
      description: 'Classic appetizer with creamy yolk filling and paprika garnish.',
      image: 'https://images.unsplash.com/photo-1626895597772-74988e263fab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZpbGVkJTIwZWdnc3xlbnwxfHx8fDE3NjE5NTUxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'caprese-salad-skewers',
      title: 'Caprese Salad Skewers',
      description: 'Fresh mozzarella, tomatoes, and basil on skewers with balsamic glaze.',
      image: 'https://images.unsplash.com/photo-1595587870672-c79b47875c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXByZXNlJTIwc2FsYWR8ZW58MXx8fHwxNzYxOTE4NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { label: 'Recipes', href: '/recipes' },
          { label: 'Appetizers' },
        ]}
        title="Appetizers"
        description="Perfect starters and small bites for any occasion. From elegant party appetizers to simple snacks, find the perfect way to begin your meal."
      />

      <GridSection
        title="Appetizer Recipes"
        posts={appetizers}
        baseSlug="/recipes/appetizers"
        isFirstSection={true}
      />
    </main>
  );
}
