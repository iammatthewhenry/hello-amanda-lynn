import type { Metadata } from 'next';
import { PageHeader, GridSection } from "@/components";
import { getAllKitchenPosts } from '@/lib/api/kitchen';

export const metadata: Metadata = {
  title: 'In The Kitchen',
  description: 'Cooking tips, techniques, and kitchen wisdom from Amanda Lynn to help you cook with confidence.',
};

export const revalidate = 3600;

// Shape expected by GridSection
interface SectionPost {
  title: string;
  description: string;
  image: string;
  location?: string;
  date: string;
  slug: string;
}

// ---------------------------------------------------------------------------
// Hardcoded fallbacks — shown when WordPress is unavailable
// ---------------------------------------------------------------------------

const FALLBACK_COOKING_TIPS: SectionPost[] = [
  {
    title: "Knife Skills: The Foundation of Great Cooking",
    description: "Master the basic knife cuts that will transform your cooking.",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "October 20, 2025",
    slug: "knife-skills-foundation",
  },
  {
    title: "Building Flavor Layers",
    description: "Understanding how to build complex flavors through proper seasoning, timing, and technique.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "October 15, 2025",
    slug: "building-flavor-layers",
  },
  {
    title: "The Perfect Pan Temperature",
    description: "Learn how to read your pan and achieve the perfect cooking temperature for different techniques.",
    image: "https://images.unsplash.com/photo-1556908153-5d2ae5c51390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "October 10, 2025",
    slug: "perfect-pan-temperature",
  },
  {
    title: "Mise en Place: Organization is Everything",
    description: "The French cooking principle that will revolutionize your kitchen workflow.",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "October 5, 2025",
    slug: "mise-en-place-organization",
  },
];

const FALLBACK_TECHNIQUES: SectionPost[] = [
  {
    title: "Mastering the Art of Searing",
    description: "Achieve restaurant-quality sears on meat and fish.",
    image: "https://images.unsplash.com/photo-1567954046925-780ec4ab0157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "September 28, 2025",
    slug: "mastering-searing",
  },
  {
    title: "Emulsification Secrets",
    description: "From hollandaise to vinaigrettes, learn the science behind stable emulsions.",
    image: "https://images.unsplash.com/photo-1571197119734-ee2aebea71cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "September 22, 2025",
    slug: "emulsification-secrets",
  },
  {
    title: "Braising Like a Pro",
    description: "The low and slow cooking method that transforms tough cuts into tender masterpieces.",
    image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "September 15, 2025",
    slug: "braising-like-pro",
  },
];

const FALLBACK_HACKS: SectionPost[] = [
  {
    title: "Time-Saving Prep Shortcuts",
    description: "Professional kitchen tricks that will cut your prep time in half.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "September 8, 2025",
    slug: "time-saving-prep-shortcuts",
  },
  {
    title: "Storage Solutions That Actually Work",
    description: "Keep your ingredients fresh longer with these proven storage methods.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "September 1, 2025",
    slug: "storage-solutions",
  },
];

const FALLBACK_EQUIPMENT: SectionPost[] = [
  {
    title: "Essential Knives Every Home Cook Needs",
    description: "You don't need a dozen knives. Here are the three essentials.",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "August 25, 2025",
    slug: "essential-knives-guide",
  },
  {
    title: "Cast Iron Care and Cooking",
    description: "Everything you need to know about maintaining and cooking with cast iron.",
    image: "https://images.unsplash.com/photo-1567954046925-780ec4ab0157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "August 18, 2025",
    slug: "cast-iron-care-cooking",
  },
  {
    title: "Small Appliances Worth the Investment",
    description: "Which gadgets actually earn their counter space?",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "August 10, 2025",
    slug: "small-appliances-investment",
  },
];

// ---------------------------------------------------------------------------
// Adapter
// ---------------------------------------------------------------------------

function toSectionPost(post: {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
}): SectionPost {
  return {
    title: post.title,
    description: post.excerpt?.replace(/<[^>]+>/g, '').trim() ?? '',
    image: post.featuredImage?.node.sourceUrl ?? '',
    date: new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    slug: post.slug,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function InTheKitchenPage() {
  // Fetch up to 100 posts from the in-the-kitchen CPT
  const result = await getAllKitchenPosts(100);
  const wpPosts = result?.posts ?? [];

  // Until the CPT has taxonomies for section grouping, we slice the ordered
  // list into the four sections.  Falls back fully to hardcoded when WP is empty.
  const useWp = wpPosts.length > 0;

  const cookingTipsPosts   = useWp ? wpPosts.slice(0, 4).map(toSectionPost)  : FALLBACK_COOKING_TIPS;
  const techniquesPosts    = useWp ? wpPosts.slice(4, 7).map(toSectionPost)  : FALLBACK_TECHNIQUES;
  const kitchenHacksPosts  = useWp ? wpPosts.slice(7, 9).map(toSectionPost)  : FALLBACK_HACKS;
  const equipmentGuidesPosts = useWp ? wpPosts.slice(9, 12).map(toSectionPost) : FALLBACK_EQUIPMENT;

  return (
    <>
      <main className="pt-6 sm:pt-8">
        <PageHeader
          title="In The Kitchen"
          description="Tips, techniques, and behind the scenes stories from the kitchen. Learn the skills that will elevate your cooking and make time in the kitchen more enjoyable."
        />

        <GridSection
          title="Cooking Tips"
          posts={cookingTipsPosts}
          baseSlug="/in-the-kitchen"
          viewAllLink="/in-the-kitchen/cooking-tips/all-posts"
          viewAllLabel="View All Cooking Tips"
          isFirstSection={true}
        />

        <GridSection
          title="Techniques"
          posts={techniquesPosts}
          baseSlug="/in-the-kitchen"
          viewAllLink="/in-the-kitchen/techniques/all-posts"
          viewAllLabel="View All Techniques"
        />

        <GridSection
          title="Kitchen Hacks"
          posts={kitchenHacksPosts}
          baseSlug="/in-the-kitchen"
          viewAllLink="/in-the-kitchen/kitchen-hacks/all-posts"
          viewAllLabel="View All Kitchen Hacks"
        />

        <GridSection
          title="Equipment Guides"
          posts={equipmentGuidesPosts}
          baseSlug="/in-the-kitchen"
          viewAllLink="/in-the-kitchen/equipment-guides/all-posts"
          viewAllLabel="View All Equipment Guides"
        />
      </main>
    </>
  );
}
