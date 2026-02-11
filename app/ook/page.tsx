'use client';

import { StandaloneBreadcrumbs } from '@/components/StandaloneBreadcrumbs';
import { PageHeader } from "@/components/PageHeader";
import { GridSection } from "@/components/GridSection";

interface BlogPost {
  title: string;
  description: string;
  image: string;
  location?: string;
  date: string;
  slug: string;
}

export default function OutOfKitchenPage() {
  const restaurantReviews: BlogPost[] = [
    {
      title: "Corner Café",
      description: "The perfect Sunday brunch spot with legendary pancakes. Seattle's cozy neighborhood gem delivers on both atmosphere and flavor.",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJ1bmNofGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Seattle, WA",
      date: "September 29, 2025",
      slug: "corner-cafe"
    },
    {
      title: "Le Petit Chef",
      description: "A 7-course journey through seasonal ingredients and creativity. San Francisco fine dining at its most inventive and delicious.",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxNDE5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      location: "San Francisco, CA",
      date: "September 20, 2025",
      slug: "le-petit-chef"
    },
    {
      title: "The Garden Bistro",
      description: "A hidden gem with seasonal menu and intimate atmosphere. Portland's farm-to-table movement at its most authentic.",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MTQwOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Portland, OR",
      date: "October 15, 2025",
      slug: "the-garden-bistro"
    }
  ];

  const foodDestinations: BlogPost[] = [
    {
      title: "Pike Place Market Guide",
      description: "Beyond the fish throwing: discovering the hidden gems and local favorites in Seattle's iconic market.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Seattle, WA",
      date: "August 28, 2025",
      slug: "pike-place-market-guide"
    },
    {
      title: "Napa Valley Food Trail",
      description: "Wine country's best kept culinary secrets. Where to eat between tastings for the perfect Napa Valley experience.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Napa Valley, CA",
      date: "August 15, 2025",
      slug: "napa-valley-food-trail"
    }
  ];

  const travelFood: BlogPost[] = [
    {
      title: "Food Truck Finds in Austin",
      description: "The best mobile eats in the Live Music Capital. From breakfast tacos to late-night barbecue.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Austin, TX",
      date: "July 20, 2025",
      slug: "austin-food-truck-finds"
    },
    {
      title: "Charleston's Lowcountry Flavors",
      description: "Exploring the rich culinary heritage of the South. From shrimp and grits to she-crab soup.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Charleston, SC", 
      date: "July 10, 2025",
      slug: "charleston-lowcountry-flavors"
    }
  ];

  return (
    <>
      {/* StandaloneBreadcrumbs handles container, positioning, and spacing */}
      <StandaloneBreadcrumbs items={[{ label: 'Out of Kitchen' }]} />

      <main className="pt-6 sm:pt-8">
        {/* PageHeader now focuses only on title and description */}
        <PageHeader 
          title="Out of Kitchen"
          description="Join me as I explore the culinary world beyond my kitchen. From restaurant reviews to food destinations, discover amazing dining experiences and culinary adventures."
        />

        <GridSection
          title="Restaurant Reviews"
          posts={restaurantReviews}
          baseSlug="/ook"
          viewAllLink="/ook/restaurants"
          viewAllLabel="View All Restaurants"
          isFirstSection={true}
        />

        <GridSection
          title="Food Destinations"
          posts={foodDestinations}
          baseSlug="/ook"
          viewAllLink="/ook/food-destinations"
          viewAllLabel="View All Destinations"
        />

        <GridSection
          title="Travel & Food"
          posts={travelFood}
          baseSlug="/ook"
          viewAllLink="/ook/travel-food"
          viewAllLabel="View All Travel Food"
        />
      </main>
    </>
  );
}
