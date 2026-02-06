'use client';

import { useRouter } from 'next/navigation';
import { StandaloneBreadcrumbs } from '@/components/StandaloneBreadcrumbs';
import { PageHeader } from "@/components/PageHeader";
import { GridSection } from "@/components/GridSection";
import { FavoriteSpotCard } from "@/components/FavoriteSpotCard";

interface BlogPost {
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  slug: string;
}

export default function OutOfKitchenPage() {
  const router = useRouter();
  
  // Food Destinations - matches food-destinations-page.tsx
  const foodDestinationPosts: BlogPost[] = [
    {
      title: "A Culinary Weekend in Portland",
      description: "From food trucks to fine dining, Portland's diverse food scene offers something for every palate. A perfect culinary destination just a short drive from Seattle.",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Portland, Oregon",
      date: "October 8, 2025",
      slug: "portland-food-scene"
    },
    {
      title: "Cross-Border Culinary Adventure in Vancouver",
      description: "Just a few hours north, Vancouver offers an incredible Asian food scene, fresh Pacific seafood, and a multicultural dining experience that rivals any major food city.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Vancouver, BC",
      date: "October 1, 2025",
      slug: "vancouver-bc-eats"
    },
    {
      title: "Spring Flavors During Tulip Season in La Conner",
      description: "The annual tulip festival brings visitors for the flowers, but the local food scene showcases the best of Skagit Valley's agricultural abundance.",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c3a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "La Conner, Washington",
      date: "September 22, 2025",
      slug: "la-conner-tulip-festival"
    },
    {
      title: "Fruit Country Adventures in Hood River",
      description: "The Columbia River Gorge isn't just scenic – it's one of the West Coast's premier fruit-growing regions, with orchards, wineries, and restaurants that celebrate local agriculture.",
      image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Hood River, Oregon",
      date: "September 18, 2025",
      slug: "hood-river-gorge"
    },
  ];

  // Restaurants - matches restaurants-page.tsx
  const restaurantPosts: BlogPost[] = [
    {
      title: "A Cozy Evening at The Garden Bistro",
      description: "Discovered this hidden gem tucked away in the heart of downtown. The seasonal menu and intimate atmosphere made for an unforgettable dining experience.",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Downtown Seattle",
      date: "October 15, 2025",
      slug: "the-garden-bistro"
    },
    {
      title: "Home Cooking at Mama's Kitchen",
      description: "This family-owned restaurant serves comfort food that reminds you of Sunday dinners at your grandmother's house.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Fremont",
      date: "October 10, 2025",
      slug: "mamas-kitchen"
    },
    {
      title: "Fresh Catch at The Seafood Shack",
      description: "No-frills seafood restaurant where the fish is so fresh it was swimming this morning. A local favorite for over 30 years.",
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Ballard",
      date: "October 2, 2025",
      slug: "seafood-shack"
    },
    {
      title: "Authentic Flavors at Thai Garden",
      description: "Family recipes brought directly from Bangkok create some of the most authentic Thai food in the Pacific Northwest.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "International District",
      date: "September 25, 2025",
      slug: "thai-garden"
    },
    {
      title: "New York Style at Pizza Corner",
      description: "Thin crust pizza that rivals anything you'd find on the East Coast, made by a chef who learned his craft in Brooklyn.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Capitol Hill",
      date: "September 18, 2025",
      slug: "pizza-corner"
    },
  ];

  // Markets & Shops - matches markets-and-shops-page.tsx
  const marketsAndShopsPosts: BlogPost[] = [
    {
      title: "Early Morning at Pike Place Market",
      description: "The best time to experience Seattle's iconic market is before the crowds arrive. Fresh seafood, seasonal produce, and the energy of vendors starting their day.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Pike Place, Seattle",
      date: "October 12, 2025",
      slug: "pike-place-market"
    },
    {
      title: "Community Shopping at PCC Natural Markets",
      description: "More than just a grocery store, PCC represents a commitment to local, organic, and sustainable food that has shaped Seattle's food culture for decades.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Multiple locations",
      date: "October 8, 2025",
      slug: "pcc-natural-markets"
    },
    {
      title: "Vintage Kitchen Treasures at Golden Age Collectables",
      description: "A treasure hunter's paradise for vintage kitchen equipment and collectibles. You never know what culinary gems you'll discover in this eclectic shop.",
      image: "https://images.unsplash.com/photo-1552566090-4a3b6d8f9c6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Georgetown",
      date: "October 3, 2025",
      slug: "golden-age-collectables"
    },
    {
      title: "Global Flavors at The Spice Merchant",
      description: "A specialty spice shop where every jar contains stories from around the world. This is where serious cooks come to find ingredients that transform ordinary dishes into extraordinary experiences.",
      image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Pike Place Market",
      date: "September 30, 2025",
      slug: "spice-merchant"
    },
  ];

  // Food Festivals - matches food-festivals-page.tsx
  const foodFestivalPosts: BlogPost[] = [
    {
      title: "Taste of Seattle: A Summer Food Celebration",
      description: "Seattle's premier food festival brings together the city's best restaurants, food trucks, and local vendors for a weekend of incredible flavors at Seattle Center.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Seattle Center",
      date: "July 15, 2025",
      slug: "taste-of-seattle"
    },
    {
      title: "Pike Place Chowder Fest: Battle of the Bowls",
      description: "An annual celebration of the Pacific Northwest's finest chowders, where restaurants compete for the title of best bowl while visitors sample infinite variations of this coastal classic.",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Pike Place Market",
      date: "February 8, 2025",
      slug: "pike-place-chowder-fest"
    },
    {
      title: "International District Night Market: Street Food Paradise",
      description: "A vibrant evening celebration of Asian street food, where the aromas of grilled meats, steaming dumplings, and exotic spices fill the streets of Seattle's historic International District.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "International District",
      date: "August 22, 2025",
      slug: "international-district-night-market"
    },
    {
      title: "Wenatchee Apple Blossom Festival: Orchard to Table",
      description: "Eastern Washington's celebration of apple harvest season combines small-town charm with incredible local food, wine, and the beauty of orchards in full bloom.",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      location: "Wenatchee Valley",
      date: "April 26, 2025",
      slug: "apple-blossom-festival"
    },
  ];

  return (
    <>
      {/* StandaloneBreadcrumbs handles container, positioning, and spacing */}
      <StandaloneBreadcrumbs items={[{ label: 'Out of Kitchen' }]} />

      <main className="pt-6 sm:pt-8">
        {/* PageHeader now focuses only on title and description */}
        <PageHeader 
          title="Out of Kitchen"
          description="Join me on culinary adventures beyond the kitchen. From restaurant reviews to farmers markets, and exploring food destinations."
        />

        <GridSection
          title="Food Destinations"
          posts={foodDestinationPosts}
          baseSlug="/out-of-kitchen/food-destinations"
          viewAllLink="/out-of-kitchen/food-destinations/all-posts"
          viewAllLabel="View All Food Destinations"
          isFirstSection={true}
        />

        <GridSection
          title="Restaurants"
          posts={restaurantPosts}
          baseSlug="/out-of-kitchen/restaurants"
          viewAllLink="/out-of-kitchen/restaurants/all-posts"
          viewAllLabel="View All Restaurants"
        />

        <GridSection
          title="Markets & Shops"
          posts={marketsAndShopsPosts}
          baseSlug="/out-of-kitchen/markets-and-shops"
          viewAllLink="/out-of-kitchen/markets-and-shops/all-posts"
          viewAllLabel="View All Markets & Shops"
        />

        <GridSection
          title="Food Festivals"
          posts={foodFestivalPosts}
          baseSlug="/out-of-kitchen/food-festivals"
          viewAllLink="/out-of-kitchen/food-festivals/all-posts"
          viewAllLabel="View All Food Festivals"
        />

        {/* Featured Section */}
        <section className="pb-0 sm:pb-[9px] lg:pb-[25px]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="mb-4 text-[36px] pl-[1.5%]">My Favorite Spots</h2>
              <p className="text-muted-foreground max-w-2xl pl-[1.5%]">
                These are the places that have captured my heart and my taste buds
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "The Garden Bistro", city: "Seattle", state: "WA", specialty: "Farm-to-table cuisine", slug: "restaurants/the-garden-bistro" },
                { name: "Pike Place Market", city: "Seattle", state: "WA", specialty: "Fresh seafood & produce", slug: "markets-and-shops/pike-place-market" },
                { name: "Taste of Seattle", city: "Seattle", state: "WA", specialty: "Multi-vendor food festival", slug: "food-festivals/taste-of-seattle" },
              ].map((spot, index) => (
                <FavoriteSpotCard
                  key={index}
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
