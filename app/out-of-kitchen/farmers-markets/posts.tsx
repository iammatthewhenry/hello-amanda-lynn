'use client';

import { useRouter } from 'next/navigation';
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogPostCard } from "@/components/BlogPostCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";

interface FarmersMarketPost {
  title: string;
  description: string;
  location: string;
  date: string;
  slug: string;
  image: string;
}

export default function FarmersMarketsAllPostsPage() {
  const router = useRouter();

  const farmersMarketPosts: FarmersMarketPost[] = [
    {
      title: "Afternoon Tea at The Rose Garden",
      description: "An elegant afternoon tea service complete with delicate sandwiches, scones, and an impressive selection of teas.",
      image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnRlcm5vb24lMjB0ZWF8ZW58MXx8fHwxNzYxNDc0NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "The Rose Garden",
      date: "August 28, 2025",
      slug: "afternoon-tea"
    },
    {
      title: "Artisan Bakery Discovery",
      description: "Found this charming bakery where every pastry is handcrafted with love. The croissants are absolutely divine.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cmllc3xlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Village Bakery",
      date: "August 5, 2025",
      slug: "artisan-bakery"
    },
  ];

  const renderPost = (post: FarmersMarketPost, index: number) => (
    <BlogPostCard
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
          { label: "Farmers Markets" }
        ]} />
      </div>

      {/* Title & Description Section */}
      <section className="section-spacing-bottom">
        <div className="container-max">
          <div className="page-header -mb-[3px]">
            <h1>Farmers Markets</h1>
            <p>
              Discovering treasures at local bakeries, afternoon tea spots, and artisan markets. These are the places where I find inspiration and the finest ingredients.
            </p>
          </div>
        </div>
      </section>

      <ListingPageLayout
        title=""
        description=""
        breadcrumbItems={[]} // Breadcrumbs rendered above instead
        items={farmersMarketPosts}
        renderItem={renderPost}
        itemsPerPage={999}
        heroClassName="" // No background color for blog pages
        gridClassName="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10"
      />
    </>
  );
}
