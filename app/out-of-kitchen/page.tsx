'use client';

import { useRouter } from "next/navigation";
import { BlogPostCard } from '@/components/BlogPostCard';
import { ListingPageLayout } from '@/components/ListingPageLayout';

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
  const router = useRouter();
  
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
    <BlogPostCard
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
    <ListingPageLayout
      title="Out of Kitchen"
      description="Join me on culinary adventures beyond the kitchen. From restaurant reviews to farmers market, and exploring food destinations."
      breadcrumbItems={[{ label: "Out of Kitchen" }]}
      items={posts}
      renderItem={renderPost}
      itemsPerPage={10}
      heroClassName=""
      gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
    >
      {/* Featured Section - My Favorite Spots */}
      <section className="pb-0 sm:pb-[9px] lg:pb-[25px] bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-[36px] font-bold text-foreground">My Favorite Spots</h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              These are the places that have captured my heart and my taste buds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
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
            ].map((spot, index) => (
              <div 
                key={index} 
                className="bg-secondary p-6 border-2 border-border text-left flex flex-col"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <h3 className="mb-2 font-bold text-foreground">{spot.name}</h3>
                <p className="text-foreground/70 text-sm mb-2">{spot.city}, {spot.state}</p>
                <p className="text-foreground/70 mb-6">{spot.specialty}</p>
                <button 
                  className="mt-auto flex items-center gap-2 text-green text-sm font-medium hover:gap-3 transition-all group"
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
    </ListingPageLayout>
  );
}
