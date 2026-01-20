'use client';

import { useRouter } from 'next/navigation';
import { ContentCard } from "@/components/ContentCard";
import { ViewAllPostsButton } from "@/components/ViewAllPostsButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
  
  const foodDestinationPosts: BlogPost[] = [
    {
      title: "Exploring Local Food Markets",
      description: "Nothing beats the vibrant energy of a local farmer's market. Today's haul included fresh produce, artisanal cheeses, and the most amazing sourdough bread.",
      image: "https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Farmer's Market",
      date: "October 8, 2025",
      slug: "local-food-markets"
    },
    {
      title: "Wine Tasting at Sunset Vineyard",
      description: "An afternoon of wine tasting in the rolling hills. The sommelier's passion and knowledge made each sip a journey of discovery.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Sunset Vineyard",
      date: "September 12, 2025",
      slug: "wine-tasting"
    },
    {
      title: "Street Food Adventure",
      description: "Exploring the city's vibrant street food scene. From tacos to banh mi, every bite told a story of culture and tradition.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc2MTQ3NDQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "City Streets",
      date: "September 5, 2025",
      slug: "street-food-adventure"
    },
    {
      title: "Chocolate Tasting Experience",
      description: "A delightful journey through different cocoa origins and chocolate-making techniques. Pure indulgence for chocolate lovers.",
      image: "https://images.unsplash.com/photo-1511381939415-e44015466834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0fGVufDF8fHx8MTc2MTQ3NDQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Cocoa House",
      date: "July 20, 2025",
      slug: "chocolate-tasting"
    },
  ];

  const restaurantPosts: BlogPost[] = [
    {
      title: "A Cozy Evening at The Garden Bistro",
      description: "Discovered this hidden gem tucked away in the heart of downtown. The seasonal menu and intimate atmosphere made for an unforgettable dining experience.",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MTQwOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Downtown",
      date: "October 15, 2025",
      slug: "the-garden-bistro"
    },
    {
      title: "Sunday Brunch at Corner Café",
      description: "Their signature pancakes and perfectly brewed coffee made this Sunday brunch absolutely delightful. The cozy ambiance and friendly service keep me coming back.",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJ1bmNofGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Corner Café",
      date: "September 29, 2025",
      slug: "corner-cafe"
    },
    {
      title: "Tasting Menu Experience",
      description: "An incredible 7-course tasting menu that showcased seasonal ingredients in the most creative ways. Each dish was a work of art.",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxNDE5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Le Petit Chef",
      date: "September 20, 2025",
      slug: "le-petit-chef"
    },
    {
      title: "Farm-to-Table Dinner",
      description: "A memorable dinner featuring ingredients sourced from local farms. The chef's creativity shined in every course.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdG8lMjB0YWJsZSUyMGRpbm5lcnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Harvest Table",
      date: "August 20, 2025",
      slug: "farm-to-table"
    },
    {
      title: "Coastal Seafood Feast",
      description: "Fresh catch of the day prepared with simple elegance. The ocean view and sea breeze made it picture perfect.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGxhdHRlcnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "The Wharf",
      date: "August 12, 2025",
      slug: "coastal-seafood"
    },
    {
      title: "Rooftop Dining Under the Stars",
      description: "An enchanting evening of fine dining with a stunning city skyline view. The ambiance was magical.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Sky Terrace",
      date: "July 28, 2025",
      slug: "rooftop-dining"
    },
  ];

  const farmersMarketPosts: BlogPost[] = [
    {
      title: "Afternoon Tea at The Rose Garden",
      description: "An elegant afternoon tea service complete with delicate sandwiches, scones, and an impressive selection of teas.",
      image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnRlcm5vb24lMjB0ZWF8ZW58MXx8fHwxNzYxNDc0NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "The Rose Garden",
      date: "August 28, 2025",
      slug: "afternoon-tea"
    },
    {
      title: "Artisan Bakery Discovery",
      description: "Found this charming bakery where every pastry is handcrafted with love. The croissants are absolutely divine.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cmllc3xlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Village Bakery",
      date: "August 5, 2025",
      slug: "artisan-bakery"
    },
  ];

  const foodFestivalPosts: BlogPost[] = [
    {
      title: "Summer Food Truck Festival",
      description: "A day filled with amazing food trucks, live music, and community vibes. The variety of cuisines was incredible!",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "City Park",
      date: "July 15, 2025",
      slug: "summer-food-truck-festival"
    },
    {
      title: "Annual Harvest Festival",
      description: "Celebrating the season's bounty with local farmers, artisan vendors, and delicious seasonal dishes.",
      image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2ZXN0JTIwZmVzdGl2YWx8ZW58MXx8fHwxNzYxNDc0NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Harvest Grounds",
      date: "October 10, 2025",
      slug: "annual-harvest-festival"
    },
    {
      title: "International Food Fair",
      description: "A journey around the world through food. From authentic tacos to traditional dim sum, this fair had it all.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Convention Center",
      date: "June 20, 2025",
      slug: "international-food-fair"
    },
    {
      title: "BBQ & Blues Festival",
      description: "Smoky meats, tangy sauces, and soulful blues music made this weekend unforgettable.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYnElMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Riverside Park",
      date: "May 25, 2025",
      slug: "bbq-blues-festival"
    },
  ];

  const renderPost = (post: BlogPost, index: number) => (
    <ContentCard
      key={index}
      title={post.title}
      description={post.description}
      image={post.image}
      href={`/out-of-kitchen/${post.slug}`}
    />
  );

  return (
    <>
      {/* Breadcrumbs - Match recipe page positioning */}
      <div className="max-w-4xl mx-auto px-[4vw] sm:px-6 lg:px-8 -mt-1.5 mb-8">
        <Breadcrumbs items={[{ label: "Out of Kitchen" }]} />
      </div>

      {/* Title & Description Section */}
      <section className="section-spacing-bottom">
        <div className="container-max">
          <div className="page-header -mb-[3px]">
            <h1>Out of Kitchen</h1>
            <p>
              Join me on culinary adventures beyond the kitchen. From restaurant reviews to farmers market, and exploring food destinations.
            </p>
          </div>
        </div>
      </section>

      {/* Food Destination Grid */}
      <section className="pt-0 pb-[22px] sm:pt-[37px] sm:pb-16 lg:pt-[53px] lg:pb-20">
        <div className="container-max">
          <h2 className="mb-8 text-[36px]">Food Destination</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {foodDestinationPosts.map((post, index) => renderPost(post, index))}
          </div>
        </div>
      </section>

      {/* View All Food Destinations Button */}
      <ViewAllPostsButton navigateTo="/out-of-kitchen/food-destination/all-posts" label="View All Food Destinations" />

      {/* Restaurants Grid */}
      <section className="pb-[22px] sm:pb-16 lg:pb-20">
        <div className="container-max">
          <h2 className="mb-8 text-[36px]">Restaurants</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {restaurantPosts.map((post, index) => renderPost(post, index))}
          </div>
        </div>
      </section>

      {/* View All Restaurants Button */}
      <ViewAllPostsButton navigateTo="/out-of-kitchen/restaurants/all-posts" label="View All Restaurants" />

      {/* Farmers Markets Grid */}
      <section className="pb-[22px] sm:pb-16 lg:pb-20">
        <div className="container-max">
          <h2 className="mb-8 text-[36px]">Farmers Markets</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {farmersMarketPosts.map((post, index) => renderPost(post, index))}
          </div>
        </div>
      </section>

      {/* View All Farmers Markets Button */}
      <ViewAllPostsButton navigateTo="/out-of-kitchen/farmers-markets/all-posts" label="View All Farmers Markets" />

      {/* Food Festivals Grid */}
      <section className="pb-[22px] sm:pb-16 lg:pb-20">
        <div className="container-max">
          <h2 className="mb-8 text-[36px]">Food Festivals</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {foodFestivalPosts.map((post, index) => renderPost(post, index))}
          </div>
        </div>
      </section>

      {/* View All Food Festivals Button */}
      <ViewAllPostsButton navigateTo="/out-of-kitchen/food-festivals/all-posts" label="View All Food Festivals" />

      {/* Featured Section */}
      <section className="pb-0 sm:pb-[9px] lg:pb-[25px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-[36px]">My Favorite Spots</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These are the places that have captured my heart and my taste buds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "The Garden Bistro", city: "Portland", state: "OR", specialty: "Farm-to-table cuisine", slug: "the-garden-bistro" },
              { name: "Corner Café", city: "Seattle", state: "WA", specialty: "Best brunch in town", slug: "corner-cafe" },
              { name: "Le Petit Chef", city: "San Francisco", state: "CA", specialty: "Fine dining experience", slug: "le-petit-chef" },
            ].map((spot, index) => (
              <div key={index} className="feature-card text-left">
                <h3 className="mb-2 font-bold">{spot.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">{spot.city}, {spot.state}</p>
                <p className="text-muted-foreground mb-6">{spot.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
