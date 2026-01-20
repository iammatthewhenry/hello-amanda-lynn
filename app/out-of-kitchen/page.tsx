import { Hero } from '@/components/Hero';
import { FavoriteSpots } from '@/components/FavoriteSpots';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

// ===================================================================
// OUT OF KITCHEN PAGE
// ===================================================================
export default function OutOfKitchenPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Out of Kitchen' },
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero */}
      <Hero
        title="Out of Kitchen"
        subtitle="Restaurant reviews, culinary travels, and food adventures beyond the home kitchen"
        backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Favorite Spots */}
      <FavoriteSpots />
    </main>
  );
}
