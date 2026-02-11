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

interface FavoriteSpotCardProps {
  name: string;
  city: string;
  state: string;
  specialty: string;
  slug: string;
  baseSlug?: string;
}

/**
 * FavoriteSpotCard - Card component for displaying favorite restaurants/spots
 * Features pink/beige background with text that turns green on hover
 */
function FavoriteSpotCard({ 
  name, 
  city, 
  state, 
  specialty, 
  slug,
  baseSlug = "/ook"
}: FavoriteSpotCardProps) {
  return (
    <a 
      href={`${baseSlug}/${slug}`}
      className="block p-8 text-center transition-colors cursor-pointer hover:text-green"
      style={{ 
        backgroundColor: '#F5EBE8',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)'
      }}
    >
      <h3 className="mb-2 font-bold">{name}</h3>
      <p className="text-muted-foreground text-sm mb-2">{city}, {state}</p>
      <p className="text-muted-foreground mb-6">{specialty}</p>
    </a>
  );
}

export default function OutOfKitchenPage() {
  const favoriteSpots = [
    {
      name: "Corner Café",
      city: "Seattle",
      state: "WA",
      specialty: "Perfect Sunday brunch spot with legendary pancakes",
      slug: "corner-cafe"
    },
    {
      name: "Le Petit Chef", 
      city: "San Francisco",
      state: "CA",
      specialty: "7-course journey through seasonal ingredients",
      slug: "le-petit-chef"
    },
    {
      name: "The Garden Bistro",
      city: "Portland", 
      state: "OR",
      specialty: "Hidden gem with seasonal menu and intimate atmosphere",
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

        {/* Favorite Spots Section with Custom Cards */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-green">Restaurant Reviews</h2>
              <a 
                href="/ook/restaurants"
                className="inline-flex items-center gap-2 text-green font-semibold hover:text-green/70 transition-colors"
              >
                View All Restaurants
                <span>→</span>
              </a>
            </div>
            
            <p className="text-muted-foreground mb-12">
              My honest reviews of dining experiences from cozy cafés to fine dining establishments.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteSpots.map((spot) => (
                <FavoriteSpotCard
                  key={spot.slug}
                  name={spot.name}
                  city={spot.city}
                  state={spot.state}
                  specialty={spot.specialty}
                  slug={spot.slug}
                />
              ))}
            </div>
          </div>
        </section>

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
