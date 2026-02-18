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
export function FavoriteSpotCard({ 
  name, 
  city, 
  state, 
  specialty, 
  slug,
  baseSlug = "/out-of-kitchen"
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
