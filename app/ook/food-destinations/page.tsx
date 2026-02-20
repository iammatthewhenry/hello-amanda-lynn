'use client';
import { PageHeader, GridSection } from '@/components';

export default function FoodDestinationIndexPage() {
  const foodDestinations = [
    {
      slug: 'local-food-markets',
      title: 'Exploring Local Food Markets',
      description: 'Discovering treasures at the weekly farmer\'s market.',
      image: 'https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'sunset-vineyard-tasting',
      title: 'Sunset Vineyard Tasting',
      description: 'A magical evening wine tasting experience nestled in the rolling hills with sweeping valley views.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      slug: 'napa-valley-culinary-tour',
      title: 'Napa Valley Culinary Tour',
      description: 'A guided journey through wine country featuring farm-to-table dining and artisanal producers.',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      slug: 'coastal-seafood-trail',
      title: 'Coastal Seafood Trail',
      description: 'Following the Pacific coast to discover the freshest seafood and seaside dining experiences.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
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
