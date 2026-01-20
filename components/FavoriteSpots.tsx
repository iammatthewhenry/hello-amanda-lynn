import Image from 'next/image';
import Link from 'next/link';
import { Section, SectionHeader } from './ui';

interface Restaurant {
  id: string;
  name: string;
  location: string;
  cuisine: string;
  image: string;
  rating: number;
  description: string;
  link?: string;
}

interface FavoriteSpotsProps {
  restaurants?: Restaurant[];
}

const DEFAULT_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'The Garden Bistro',
    location: 'Downtown LA',
    cuisine: 'Farm-to-Table',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    rating: 5,
    description: 'A charming spot with fresh, locally-sourced ingredients and a cozy atmosphere. Their seasonal menu never disappoints!',
  },
  {
    id: '2',
    name: 'Nonna\'s Kitchen',
    location: 'Little Italy',
    cuisine: 'Italian',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    rating: 5,
    description: 'Authentic Italian flavors that transport you straight to Italy. The homemade pasta is absolutely divine.',
  },
  {
    id: '3',
    name: 'Spice Route',
    location: 'West Hollywood',
    cuisine: 'Indian Fusion',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    rating: 4,
    description: 'Bold flavors and creative presentations make this my go-to spot for adventurous dining. The curry selection is incredible.',
  },
  {
    id: '4',
    name: 'Ocean View Grill',
    location: 'Santa Monica',
    cuisine: 'Seafood',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    rating: 5,
    description: 'Fresh seafood with stunning ocean views. Perfect for special occasions and romantic dinners.',
  },
  {
    id: '5',
    name: 'The Coffee Corner',
    location: 'Beverly Hills',
    cuisine: 'Café',
    image: 'https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    rating: 4,
    description: 'My favorite spot for morning coffee and pastries. The atmosphere is perfect for both work and relaxation.',
  },
  {
    id: '6',
    name: 'Taco Libre',
    location: 'East LA',
    cuisine: 'Mexican',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
    rating: 5,
    description: 'Authentic street-style tacos that remind me of my travels through Mexico. The al pastor is unbeatable!',
  },
];

export function FavoriteSpots({ restaurants = DEFAULT_RESTAURANTS }: FavoriteSpotsProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <Section spacing="lg" containerSize="4xl">
      <SectionHeader
        title="My Favorite Spots"
        subtitle="Restaurants and cafes that have captured my heart and taste buds"
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg overflow-hidden shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 w-full">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-foreground">
                  {restaurant.name}
                </h3>
                <div className="flex items-center">
                  {renderStars(restaurant.rating)}
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <span>{restaurant.cuisine}</span>
                <span className="mx-2">•</span>
                <span>{restaurant.location}</span>
              </div>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {restaurant.description}
              </p>
              
              {restaurant.link && (
                <Link
                  href={restaurant.link}
                  className="inline-flex items-center text-green hover:text-green/80 transition-colors text-sm font-medium"
                >
                  Read Full Review →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
