// app/out-of-kitchen/page.tsx

'use client';

import { SectionPageCard } from '@/components/SectionPageCard';
import { SectionPageLayout } from '@/components/SectionPageLayout';
import { FavoriteSpots } from '@/components/sections/FavoriteSpots';

// ===================================================================
// TYPES
// ===================================================================
interface BlogPost {
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  slug: string;
}

// ===================================================================
// OUT OF KITCHEN PAGE
// ===================================================================
export default function OutOfKitchenPage() {
  const posts: BlogPost[] = [
    {
      title: "A Cozy Evening at The Garden Bistro",
      description: "Discovered this hidden gem tucked away in the heart of downtown. The seasonal menu and intimate atmosphere made for an unforgettable dining experience.",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MTQwOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Downtown",
      date: "October 15, 2025",
      slug: "the-garden-bistro"
    },
    {
      title: "Exploring Local Food Markets",
      description: "Nothing beats the vibrant energy of a local farmer's market. Today's haul included fresh produce, artisanal cheeses, and the most amazing sourdough bread.",
      image: "https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Farmer's Market",
      date: "October 8, 2025",
      slug: "local-food-markets"
    },
    {
      title: "Sunday Brunch at Corner Café",
      description: "Their signature pancakes and perfectly brewed coffee made this Sunday brunch absolutely delightful. The cozy ambiance and friendly service keep me coming back.",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJ1bmNofGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Corner Café",
      date: "September 29, 2025",
      slug: "corner-cafe"
    },
    {
      title: "Tasting Menu Experience",
      description: "An incredible 7-course tasting menu that showcased seasonal ingredients in the most creative ways. Each dish was a work of art.",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxNDE5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      location: "Le Petit Chef",
      date: "September 20, 2025",
      slug: "le-petit-chef"
    },
  ];

  const renderPost = (post: BlogPost, index: number) => (
    <SectionPageCard
      key={index}
      title={post.title}
      description={post.description}
      image={post.image}
      href={`/out-of-kitchen/${post.slug}`}
      location={post.location}
      date={post.date}
    />
  );

  return (
    <SectionPageLayout
      title="Out of Kitchen"
      description="Join me on culinary adventures beyond the kitchen. From restaurant reviews to farmers market, and exploring food destinations."
      breadcrumbItems={[{ label: "Out of Kitchen" }]}
      items={posts}
      renderItem={renderPost}
      itemsPerPage={10}
      heroClassName=""
      gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
    >
      {/* Bottom Section */}
      <FavoriteSpots />
    </SectionPageLayout>
  );
}
