'use client';

import { useRouter } from 'next/navigation';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentCard } from "@/components/ContentCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";

interface FoodFestivalPost {
  title: string;
  description: string;
  location: string;
  date: string;
  slug: string;
  image: string;
}

export default function FoodFestivalsAllPostsPage() {
  const router = useRouter();

  const foodFestivalPosts: FoodFestivalPost[] = [
    {
      title: "Summer Food Truck Festival",
      description: "A day filled with amazing food trucks, live music, and community vibes. The variety of cuisines was incredible!",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwdHJ1Y2slMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "City Park",
      date: "July 15, 2025",
      slug: "summer-food-truck-festival"
    },
    {
      title: "Annual Harvest Festival",
      description: "Celebrating the season's bounty with local farmers, artisan vendors, and delicious seasonal dishes.",
      image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2ZXN0JTIwZmVzdGl2YWx8ZW58MXx8fHwxNzYxNDc0NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Harvest Grounds",
      date: "October 10, 2025",
      slug: "annual-harvest-festival"
    },
    {
      title: "International Food Fair",
      description: "A journey around the world through food. From authentic tacos to traditional dim sum, this fair had it all.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcm5hdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Convention Center",
      date: "June 20, 2025",
      slug: "international-food-fair"
    },
    {
      title: "BBQ & Blues Festival",
      description: "Smoky meats, tangy sauces, and soulful blues music made this weekend unforgettable.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYnElMjBmZXN0aXZhbHxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Riverside Park",
      date: "May 25, 2025",
      slug: "bbq-blues-festival"
    },
  ];

  const renderPost = (post: FoodFestivalPost, index: number) => (
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
          { label: "Food Festivals" }
        ]} />
      </div>

      {/* Title & Description Section */}
      <section className="section-spacing-bottom">
        <div className="container-max">
          <div className="page-header -mb-[3px]">
            <h1>Food Festivals</h1>
            <p>
              From food truck rallies to harvest celebrations, explore the festivals that bring communities together through food. Join me as I discover local and regional food events.
            </p>
          </div>
        </div>
      </section>

      <ListingPageLayout
        title=""
        description=""
        breadcrumbItems={[]} // Breadcrumbs rendered above instead
        items={foodFestivalPosts}
        renderItem={renderPost}
        itemsPerPage={999}
        heroClassName="" // No background color for blog pages
        gridClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
      />
    </>
  );
}
