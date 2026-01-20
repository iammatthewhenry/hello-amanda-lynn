// components/sections/FavoriteSpots.tsx

'use client';

import { useRouter } from "next/navigation";

// ===================================================================
// FAVORITE SPOTS SECTION
// ===================================================================
interface Spot {
  name: string;
  city: string;
  state: string;
  specialty: string;
  slug: string;
}

interface FavoriteSpotsProps {
  spots?: Spot[];
  title?: string;
  subtitle?: string;
}

const defaultSpots: Spot[] = [
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
  },
];

export function FavoriteSpots({ 
  spots = defaultSpots,
  title = "My Favorite Spots",
  subtitle = "These are the places that have captured my heart and my taste buds"
}: FavoriteSpotsProps) {
  const router = useRouter();

  return (
    <section className="pb-0 sm:pb-[9px] lg:pb-[25px] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[36px] font-bold text-foreground">{title}</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spots.map((spot, index) => (
            <div 
              key={index} 
              className="bg-white p-8 text-center flex flex-col"
              style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)' }}
            >
              <h3 className="mb-2 font-bold text-foreground text-lg">{spot.name}</h3>
              <p className="text-foreground/60 text-sm mb-4">{spot.city}, {spot.state}</p>
              <p className="text-foreground/80 mb-8">{spot.specialty}</p>
              <button 
                className="mt-auto flex items-center justify-center gap-2 text-green text-sm font-medium hover:gap-3 transition-all group"
                onClick={() => router.push(`/out-of-kitchen/${spot.slug}`)}
              >
                <span>Read Review</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
