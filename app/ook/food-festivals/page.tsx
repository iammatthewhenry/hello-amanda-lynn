'use client';
import { PageHeader, GridSection } from '@/components';

export default function FoodFestivalsIndexPage() {
  const foodFestivals = [
    {
      slug: 'harvest-festival',
      title: 'Annual Harvest Festival',
      description: 'A celebration of local produce, artisanal foods, and seasonal flavors in the heart of downtown.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzYxOTU1MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'wine-and-dine',
      title: 'Wine & Dine Weekend',
      description: 'Three days of wine tastings, gourmet food trucks, and cooking demonstrations by local chefs.',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwZmVzdGl2YWx8ZW58MXx8fHwxNzYxOTU1MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'street-food-night',
      title: 'Street Food Night Market',
      description: 'International street food vendors gather for a monthly celebration of global flavors and community.',
      image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc2MTk1NTM0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <main className="pt-6 sm:pt-8">
      <PageHeader 
        title="Food Festivals"
        description="Join me at the most exciting food festivals and culinary events. From local harvest celebrations to international street food markets, discover where food culture comes alive."
      />

      <GridSection
        title="Festival Reviews"
        posts={foodFestivals}
        baseSlug="/ook/food-festivals"
        isFirstSection={true}
      />
    </main>
  );
}