import { Hero } from '@/components/Hero';
import { QuickKitchenTips } from '@/components/QuickKitchenTips';
import { NameThisGame } from '@/components/NameThisGame';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export const dynamic = 'force-static';

// ===================================================================
// IN THE KITCHEN PAGE
// ===================================================================
export default function InTheKitchenPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'In The Kitchen' },
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Hero */}
      <Hero
        title="In The Kitchen"
        subtitle="Cooking techniques, tips, and everything you need to master your culinary skills"
        backgroundImage="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
      />

      {/* Quick Kitchen Tips */}
      <QuickKitchenTips />

      {/* Name This Game */}
      <NameThisGame />
    </main>
  );
}
