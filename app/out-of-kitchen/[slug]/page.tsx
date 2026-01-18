'use client';

// ⬇️ THIS IS THE FIX
export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import { ShareBar } from '@/components/ShareBar';
import { BlogPostTemplate } from '@/components/BlogPostTemplate';
import NotFoundPage from '@/app/not-found';

interface RestaurantPost {
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  slug: string;
  content: string[];
  specialty: string;
}

const mockPosts: Record<string, RestaurantPost> = {
  "the-garden-bistro": {
    title: "A Cozy Evening at The Garden Bistro",
    description:
      "Discovered this hidden gem tucked away in the heart of downtown. The seasonal menu and intimate atmosphere made for an unforgettable dining experience.",
    image:
      "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Downtown",
    date: "October 15, 2025",
    slug: "the-garden-bistro",
    specialty: "Farm-to-table cuisine",
    content: [
      "Walking into The Garden Bistro felt like stepping into a dream. The exposed brick walls, soft candlelight, and carefully curated local artwork created an ambiance that was both sophisticated and intimate.",
      "The chef’s seasonal menu is a testament to their commitment to local sourcing. Every ingredient tells a story, from heirloom tomatoes to pasture-raised chicken.",
      "I started with their signature beet and goat cheese salad, which was as beautiful as it was delicious.",
      "For the main course, I chose the pan-seared branzino with seasonal vegetables and a lemon beurre blanc sauce.",
      "Dessert was their chocolate flourless cake with raspberry coulis and vanilla gelato.",
      "The service was impeccable without being intrusive."
    ],
  },

  "corner-cafe": {
    title: "Sunday Brunch at Corner Café",
    description:
      "Their signature pancakes and perfectly brewed coffee made this Sunday brunch absolutely delightful.",
    image:
      "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Seattle, WA",
    date: "September 29, 2025",
    slug: "corner-cafe",
    specialty: "Best brunch in town",
    content: [
      "There is something magical about a Sunday brunch when it is done right.",
      "Their fluffy buttermilk pancakes are the real deal.",
      "The coffee deserves its own paragraph.",
      "Beyond the food, the vibe is what keeps people coming back.",
      "The service team moves with genuine care for their craft."
    ],
  },

  "le-petit-chef": {
    title: "Tasting Menu Experience at Le Petit Chef",
    description:
      "An incredible seven-course tasting menu that showcased seasonal ingredients in the most creative ways.",
    image:
      "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "San Francisco, CA",
    date: "September 20, 2025",
    slug: "le-petit-chef",
    specialty: "Fine dining experience",
    content: [
      "Stepping into Le Petit Chef feels like entering a culinary theater.",
      "Each course unfolds like a chapter.",
      "Every dish is intentional and precisely executed.",
      "Dessert closes the experience with confidence.",
      "This is not just a meal, but a dialogue between chef and diner."
    ],
  },
};

export default function OutOfKitchenDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (!slug || !mockPosts[slug]) {
    return <NotFoundPage />;
  }

  const post = mockPosts[slug];

  return (
    <main>
      <BlogPostTemplate
        image={post.image}
        title={post.title}
        author="Amanda Lynn"
        publishedDate={post.date}
        metaDetails={
          <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
            <span className="text-sm">{post.location}</span>
            <span>•</span>
            <span className="text-sm">{post.specialty}</span>
          </div>
        }
        description={post.description}
        content={post.content}
      />

      <ShareBar
        title={post.title}
        description={post.description}
        imageUrl={post.image}
      />
    </main>
  );
}
