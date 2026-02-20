'use client';
import { PageHeader, GridSection } from '@/components';

export default function RestaurantReviewsIndexPage() {
  const restaurants = [
    {
      slug: "corner-cafe",
      title: "Corner Café",
      description: "The perfect Sunday brunch spot with legendary pancakes.",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJ1bmNofGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      slug: "le-petit-chef",
      title: "Le Petit Chef",
      description: "A 7-course journey through seasonal ingredients and creativity.",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxNDE5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      slug: "the-garden-bistro",
      title: "The Garden Bistro",
      description: "A hidden gem with seasonal menu and intimate atmosphere.",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MTQwOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <main className="pt-6 sm:pt-8">
      <PageHeader 
        title="Restaurant Reviews"
        description="My favorite dining experiences, from cozy cafés to fine dining establishments. Join me as I explore and share honest reviews of local and destination restaurants."
      />

      <GridSection
        title="Restaurant Reviews"
        posts={restaurants}
        baseSlug="/ook/restaurants"
        isFirstSection={true}
      />
    </main>
  );
}
