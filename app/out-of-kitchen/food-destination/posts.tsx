'use client';

import { useRouter } from 'next/navigation';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentCard } from "@/components/ContentCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";

interface FoodDestinationPost {
  title: string;
  description: string;
  location: string;
  date: string;
  slug: string;
  image: string;
}

export default function FoodDestinationAllPostsPage() {
  const router = useRouter();

  const foodDestinationPosts: FoodDestinationPost[] = [
    {
      title: "Exploring Local Food Markets",
      description: "Nothing beats the vibrant energy of a local farmer's market. Today's haul included fresh produce, artisanal cheeses, and the most amazing sourdough bread.",
      image: "https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Farmer's Market",
      date: "October 8, 2025",
      slug: "local-food-markets"
    },
    {
      title: "Wine Tasting at Sunset Vineyard",
      description: "An afternoon of wine tasting in the rolling hills. The sommelier's passion and knowledge made each sip a journey of discovery.",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwdGFzdGluZ3xlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Sunset Vineyard",
      date: "September 12, 2025",
      slug: "wine-tasting"
    },
    {
      title: "Street Food Adventure",
      description: "Exploring the city's vibrant street food scene. From tacos to banh mi, every bite told a story of culture and tradition.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBmb29kfGVufDF8fHx8MTc2MTQ3NDQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "City Streets",
      date: "September 5, 2025",
      slug: "street-food-adventure"
    },
    {
      title: "Chocolate Tasting Experience",
      description: "A delightful journey through different cocoa origins and chocolate-making techniques. Pure indulgence for chocolate lovers.",
      image: "https://images.unsplash.com/photo-1511381939415-e44015466834?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0fGVufDF8fHx8MTc2MTQ3NDQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Cocoa House",
      date: "July 20, 2025",
      slug: "chocolate-tasting"
    },
  ];

  const renderPost = (post: FoodDestinationPost, index: number) => (
    <ContentCard
      key={index}
      title={post.title}
      description={post.description}
      image={post.image}
      href={`/out-of-kitchen/${post.slug}`}
    />
  );

  return (
    <>
      {/* Breadcrumbs - Match recipe page positioning */}
      <div className="max-w-4xl mx-auto px-[4vw] sm:px-6 lg:px-8 -mt-1.5 mb-8">
        <Breadcrumbs items={[
          { label: "Out of Kitchen", href: "/out-of-kitchen" },
          { label: "Food Destination" }
        ]} />
      </div>

      {/* Title & Description Section */}
      <section className="section-spacing-bottom">
        <div className="container-max">
          <div className="page-header -mb-[3px]">
            <h1>Food Destination</h1>
            <p>
              Exploring culinary adventures beyond the kitchen. From local food markets to hidden gems in different cities, discover the places that inspire my recipes.
            </p>
          </div>
        </div>
      </section>

      <ListingPageLayout
        title=""
        description=""
        breadcrumbItems={[]} // Breadcrumbs rendered above instead
        items={foodDestinationPosts}
        renderItem={renderPost}
        itemsPerPage={999}
        heroClassName="" // No background color for blog pages
        gridClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
      />
    </>
  );
}
