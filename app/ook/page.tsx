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
  baseSlug = "/ook/restaurant"
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
  const foodDestinations: BlogPost[] = [
    {
      title: "Exploring Local Food Markets",
      description: "Discovering treasures at the weekly farmer's market and connecting with local vendors.",
      image: "https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Various Locations",
      date: "October 8, 2025",
      slug: "local-food-markets"
    },
    {
      title: "Wine Tasting at Sunset Vineyard", 
      description: "An afternoon of wine tasting paired with local artisan cheeses in Napa Valley.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Napa Valley, CA",
      date: "September 15, 2025",
      slug: "sunset-vineyard-tasting"
    },
    {
      title: "Street Food Adventures",
      description: "Exploring the vibrant street food scene and discovering hidden gems in Portland.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Portland, OR",
      date: "August 28, 2025",
      slug: "street-food-adventures"
    }
  ];

  const restaurants: BlogPost[] = [
    {
      title: "A Cozy Evening at The Garden Bistro",
      description: "An intimate farm-to-table experience showcasing seasonal ingredients.",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Portland, OR", 
      date: "October 15, 2025",
      slug: "the-garden-bistro"
    },
    {
      title: "Sunday Brunch at Corner Café",
      description: "The perfect weekend brunch spot with legendary pancakes and fresh coffee.",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Seattle, WA",
      date: "September 29, 2025",
      slug: "corner-cafe"
    },
    {
      title: "Tasting Menu Experience",
      description: "A seven-course journey through seasonal flavors at San Francisco's Le Petit Chef.",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "San Francisco, CA",
      date: "September 20, 2025", 
      slug: "le-petit-chef"
    }
  ];

  const farmersMarkets: BlogPost[] = [
    {
      title: "Pike Place Tea at The Rose Market",
      description: "Discovering artisanal teas and local honey at Seattle's beloved weekend market.",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Seattle, WA",
      date: "August 20, 2025",
      slug: "pike-place-tea-rose-market"
    },
    {
      title: "Artisan Bakery Discovery", 
      description: "Finding the perfect sourdough and meeting passionate bread makers.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Portland, OR",
      date: "August 10, 2025",
      slug: "artisan-bakery-discovery"
    }
  ];

  const foodFestivals: BlogPost[] = [
    {
      title: "Seafood Town Food Festival",
      description: "A celebration of coastal cuisine featuring local seafood and craft beverages.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", 
      location: "Monterey, CA",
      date: "July 25, 2025",
      slug: "seafood-town-festival"
    },
    {
      title: "Annual Harvest Festival",
      description: "Farm-to-table dining experiences celebrating the autumn harvest season.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Napa Valley, CA", 
      date: "July 15, 2025",
      slug: "annual-harvest-festival"
    },
    {
      title: "International Food Fair",
      description: "Global flavors and cultural food experiences in the heart of the city.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "San Francisco, CA",
      date: "July 5, 2025", 
      slug: "international-food-fair"
    }
  ];

  const favoriteSpots = [
    {
      name: "The Garden Bistro",
      city: "Portland", 
      state: "OR",
      specialty: "Farm-to-table cuisine",
      slug: "the-garden-bistro"
    },
    {
      name: "Corner Café",
      city: "Seattle",
      state: "WA", 
      specialty: "Best brunch in town",
      slug: "corner-cafe"
    },
    {
      name: "Le Petit Chef",
      city: "San Francisco",
      state: "CA",
      specialty: "Fine dining experience", 
      slug: "le-petit-chef"
    }
  ];

  return (
    <>
      <StandaloneBreadcrumbs items={[{ label: 'Out of Kitchen' }]} />

      <main className="pt-6 sm:pt-8">
        <PageHeader 
          title="Out of Kitchen"
          description="Join me as I explore the culinary world beyond my kitchen. From restaurant reviews to food destinations, discover amazing dining experiences and culinary adventures."
        />

        <GridSection
          title="Food Destination"
          posts={foodDestinations}
          baseSlug="/ook/food-destination"
          viewAllLink="/ook/food-destinations"
          viewAllLabel="View All Food Destinations"
          isFirstSection={true}
        />

        <GridSection
          title="Restaurants"
          posts={restaurants}
          baseSlug="/ook/restaurant"
          viewAllLink="/ook/restaurants" 
          viewAllLabel="View All Restaurants"
        />

        <GridSection
          title="Farmers Markets"
          posts={farmersMarkets}
          baseSlug="/ook/farmers-market"
          viewAllLink="/ook/farmers-markets"
          viewAllLabel="View All Farmers Markets"
        />

        <GridSection
          title="Food Festivals"
          posts={foodFestivals}
          baseSlug="/ook/food-festival"
          viewAllLink="/ook/food-festivals"
          viewAllLabel="View All Food Festivals"
        />

        {/* My Favorite Spots Section - Beige Cards at Bottom */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-green mb-4">My Favorite Spots</h2>
              <p className="text-muted-foreground">
                These are the places that have captured my heart and my taste buds
              </p>
            </div>

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
      </main>
    </>
  );
}
