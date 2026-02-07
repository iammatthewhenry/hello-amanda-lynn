'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// Sample restaurant data for the main page preview
const featuredRestaurants = [
  {
    name: "Corner Café",
    city: "Seattle",
    state: "WA",
    cuisine: "Brunch & Café",
    description: "The perfect Sunday brunch spot with legendary pancakes.",
    slug: "corner-cafe",
    date: "September 29, 2025",
    image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJ1bmNofGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "Le Petit Chef",
    city: "San Francisco",
    state: "CA",
    cuisine: "Fine Dining",
    description: "A 7-course journey through seasonal ingredients and creativity.",
    slug: "le-petit-chef",
    date: "September 20, 2025",
    image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxNDE5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    name: "The Garden Bistro",
    city: "Portland",
    state: "OR",
    cuisine: "Farm-to-table",
    description: "A hidden gem with seasonal menu and intimate atmosphere.",
    slug: "the-garden-bistro",
    date: "October 15, 2025",
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MTQwOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export default function OutOfKitchenPage() {
  return (
    <main>
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1.5 mb-8">
        <Breadcrumbs items={[
          { label: "Out of Kitchen" }
        ]} />
      </div>

      {/* Hero */}
      <section className="pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="page-header">
            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-green">Out of Kitchen</h1>
            <p className="text-lg text-muted-foreground">
              Join me as I explore the culinary world beyond my kitchen. From restaurant reviews to food destinations, 
              discover amazing dining experiences and culinary adventures.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurant Reviews Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-green">Restaurant Reviews</h2>
            <Link 
              href="/ook/restaurants"
              className="inline-flex items-center gap-2 text-green font-semibold hover:text-green/70 transition-colors"
            >
              View All Restaurants
              <span>→</span>
            </Link>
          </div>
          
          <p className="text-muted-foreground mb-12">
            My honest reviews of dining experiences from cozy cafés to fine dining establishments.
          </p>

          <div className="grid gap-8">
            {featuredRestaurants.map((restaurant) => (
              <article key={restaurant.slug} className="group cursor-pointer">
                <Link href={`/ook/restaurants/${restaurant.slug}`}>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-green transition-colors">
                        {restaurant.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mb-3 text-muted-foreground text-sm">
                        <span>{restaurant.city}, {restaurant.state}</span>
                        <span>•</span>
                        <span>{restaurant.cuisine}</span>
                        <span>•</span>
                        <span>{restaurant.date}</span>
                      </div>
                      <p className="text-muted-foreground">
                        {restaurant.description}
                      </p>
                    </div>
                    <div className="w-full sm:w-48 h-48 flex-shrink-0">
                      <div className="relative w-full h-full">
                        <Image
                          src={restaurant.image}
                          alt={restaurant.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 192px"
                          className="object-cover border-[16px] border-white"
                          style={{
                            boxShadow: 'var(--shadow-hero)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Future Sections Placeholder */}
      {/* You can add more sections here like:
          - Farmers Markets
          - Food Destinations
          - Travel Food Guides
          etc. */}
    </main>
  );
}
