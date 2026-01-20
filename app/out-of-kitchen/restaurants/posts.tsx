'use client';

import { useRouter } from 'next/navigation';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentCard } from "@/components/ContentCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";

interface RestaurantPost {
  title: string;
  description: string;
  location: string;
  date: string;
  slug: string;
  image: string;
}

export default function RestaurantsAllPostsPage() {
  const router = useRouter();

  const restaurantPosts: RestaurantPost[] = [
    {
      title: "A Cozy Evening at The Garden Bistro",
      description: "Discovered this hidden gem tucked away in the heart of downtown. The seasonal menu and intimate atmosphere made for an unforgettable dining experience.",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MTQwOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Downtown",
      date: "October 15, 2025",
      slug: "the-garden-bistro"
    },
    {
      title: "Sunday Brunch at Corner Café",
      description: "Their signature pancakes and perfectly brewed coffee made this Sunday brunch absolutely delightful. The cozy ambiance and friendly service keep me coming back.",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJ1bmNofGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Corner Café",
      date: "September 29, 2025",
      slug: "corner-cafe"
    },
    {
      title: "Tasting Menu Experience",
      description: "An incredible 7-course tasting menu that showcased seasonal ingredients in the most creative ways. Each dish was a work of art.",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxNDE5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Le Petit Chef",
      date: "September 20, 2025",
      slug: "le-petit-chef"
    },
    {
      title: "Farm-to-Table Dinner",
      description: "A memorable dinner featuring ingredients sourced from local farms. The chef's creativity shined in every course.",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXJtJTIwdG8lMjB0YWJsZSUyMGRpbm5lcnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Harvest Table",
      date: "August 20, 2025",
      slug: "farm-to-table"
    },
    {
      title: "Coastal Seafood Feast",
      description: "Fresh catch of the day prepared with simple elegance. The ocean view and sea breeze made it picture perfect.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFmb29kJTIwcGxhdHRlcnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "The Wharf",
      date: "August 12, 2025",
      slug: "coastal-seafood"
    },
    {
      title: "Rooftop Dining Under the Stars",
      description: "An enchanting evening of fine dining with a stunning city skyline view. The ambiance was magical.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Sky Terrace",
      date: "July 28, 2025",
      slug: "rooftop-dining"
    },
  ];

  const renderPost = (post: RestaurantPost, index: number) => (
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
          { label: "Restaurants" }
        ]} />
      </div>

      {/* Title & Description Section */}
      <section className="section-spacing-bottom">
        <div className="container-max">
          <div className="page-header -mb-[3px]">
            <h1>Restaurants</h1>
            <p>
              My favorite dining experiences, from cozy cafés to fine dining establishments. Join me as I explore and share honest reviews of local and destination restaurants.
            </p>
          </div>
        </div>
      </section>

      <ListingPageLayout
        title=""
        description=""
        breadcrumbItems={[]} // Breadcrumbs rendered above instead
        items={restaurantPosts}
        renderItem={renderPost}
        itemsPerPage={999}
        heroClassName="" // No background color for blog pages
        gridClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
      />
    </>
  );
}
