import type { Metadata } from 'next';
import { BlogPostCard, ListingPageLayout } from "@/components";
import { getAllKitchenPosts } from '@/lib/api/kitchen';

export const metadata: Metadata = {
  title: 'All Posts — In The Kitchen',
  description: 'Browse all In The Kitchen posts from Amanda Lynn — tips, techniques, and behind-the-scenes kitchen stories.',
};

export const revalidate = 3600;

// ---------------------------------------------------------------------------
// Post type
// ---------------------------------------------------------------------------

interface KitchenPost {
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

// ---------------------------------------------------------------------------
// Hardcoded fallback data when WordPress is unavailable
// ---------------------------------------------------------------------------

const FALLBACK_POSTS: KitchenPost[] = [
  {
    title: "Knife Skills for Beginners",
    description: "Learn the essential knife techniques that will transform your cooking.",
    image: "https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Techniques",
    date: "October 20, 2025",
    slug: "mastering-knife-skills",
  },
  {
    title: "Building Your Essential Spice Collection",
    description: "A guide to the must-have spices that form the foundation of countless recipes.",
    image: "https://images.unsplash.com/photo-1558013637-a125529cc856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Tips",
    date: "October 12, 2025",
    slug: "building-spice-collection",
  },
  {
    title: "The Art of Making Perfect Pasta",
    description: "Discover the secrets to cooking pasta like an Italian grandmother.",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Techniques",
    date: "October 5, 2025",
    slug: "perfect-pasta",
  },
  {
    title: "Kitchen Organization Hacks",
    description: "Transform your kitchen workflow with these simple organization tips.",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "Organization",
    date: "September 28, 2025",
    slug: "kitchen-organization",
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function InTheKitchenAllPostsPage() {
  const result = await getAllKitchenPosts(200);
  const wpPosts = result?.posts ?? [];

  const posts: KitchenPost[] = wpPosts.length > 0
    ? wpPosts.map((post) => ({
        title: post.title,
        description: post.excerpt?.replace(/<[^>]+>/g, '').trim() ?? '',
        image: post.featuredImage?.node.sourceUrl ?? '',
        category: '',
        date: new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        slug: post.slug,
      }))
    : FALLBACK_POSTS;

  const renderPost = (post: KitchenPost, index: number) => (
    <BlogPostCard
      key={index}
      title={post.title}
      description={post.description}
      image={post.image}
      href={`/in-the-kitchen/${post.slug}`}
    />
  );

  return (
    <ListingPageLayout
      title="All Posts - In The Kitchen"
      description="Browse all In The Kitchen posts organized by date. Tips, techniques, and behind the scenes stories from the kitchen."
      items={posts}
      renderItem={renderPost}
      itemsPerPage={40}
      gridClassName="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12"
    />
  );
}
