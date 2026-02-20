'use client';
import { PageHeader, GridSection } from '@/components';

export default function FoodDestinationIndexPage() {
  const foodDestinations = [
    {
      slug: 'local-food-markets',
      title: 'Exploring Local Food Markets',
      description: 'Discovering treasures at the weekly farmer\'s market.',
      image: 'https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    }
  ];

  return (
    <main className="pt-6 sm:pt-8">
      <PageHeader 
        title="Food Destinations"
        description="Exploring culinary adventures beyond the kitchen. From local food markets to hidden gems in different cities, discover the places that inspire my recipes."
      />

      <GridSection
        title="Culinary Destinations"
        posts={foodDestinations}
        baseSlug="/ook/food-destinations"
        isFirstSection={true}
      />
    </main>
  );
}
