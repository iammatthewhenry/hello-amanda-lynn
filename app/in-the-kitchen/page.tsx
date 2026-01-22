'use client';

import { StandaloneBreadcrumbs } from '@/components/StandaloneBreadcrumbs';
import { PageHeader } from "@/components/PageHeader";
import { GridSection } from "@/components/GridSection";

interface BlogPost {
  title: string;
  description: string;
  image: string;
  location?: string;
  date: string;
  slug: string;
}

export default function InTheKitchenPage() {
  const cookingTipsPosts: BlogPost[] = [
    {
      title: "Knife Skills: The Foundation of Great Cooking",
      description: "Master the basic knife cuts that will transform your cooking. From julienne to chiffonade, learn the techniques that professional chefs use every day.",
      image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "October 20, 2025",
      slug: "knife-skills-foundation"
    },
    {
      title: "Building Flavor Layers",
      description: "Understanding how to build complex flavors through proper seasoning, timing, and technique. The secret to restaurant-quality dishes at home.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "October 15, 2025",
      slug: "building-flavor-layers"
    },
    {
      title: "The Perfect Pan Temperature",
      description: "Learn how to read your pan and achieve the perfect cooking temperature for different techniques. No more burnt garlic or soggy vegetables!",
      image: "https://images.unsplash.com/photo-1556908153-5d2ae5c51390?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "October 10, 2025",
      slug: "perfect-pan-temperature"
    },
    {
      title: "Mise en Place: Organization is Everything",
      description: "The French cooking principle that will revolutionize your kitchen workflow. Why preparation is the key to stress-free cooking.",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "October 5, 2025",
      slug: "mise-en-place-organization"
    }
  ];

  const techniquesPosts: BlogPost[] = [
    {
      title: "Mastering the Art of Searing",
      description: "Achieve restaurant-quality sears on meat and fish. Understanding heat, timing, and the science behind the perfect crust.",
      image: "https://images.unsplash.com/photo-1567954046925-780ec4ab0157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "September 28, 2025",
      slug: "mastering-searing"
    },
    {
      title: "Emulsification Secrets",
      description: "From hollandaise to vinaigrettes, learn the science and technique behind creating stable emulsions that won't break.",
      image: "https://images.unsplash.com/photo-1571197119734-ee2aebea71cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "September 22, 2025",
      slug: "emulsification-secrets"
    },
    {
      title: "Braising Like a Pro",
      description: "The low and slow cooking method that transforms tough cuts into tender, flavorful masterpieces. Perfect for fall and winter cooking.",
      image: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "September 15, 2025",
      slug: "braising-like-pro"
    }
  ];

  const kitchenHacksPosts: BlogPost[] = [
    {
      title: "Time-Saving Prep Shortcuts",
      description: "Professional kitchen tricks that will cut your prep time in half. Work smarter, not harder in the kitchen.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "September 8, 2025",
      slug: "time-saving-prep-shortcuts"
    },
    {
      title: "Storage Solutions That Actually Work",
      description: "Keep your ingredients fresh longer with these proven storage methods. From herbs to cheese, maximize your grocery budget.",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "September 1, 2025",
      slug: "storage-solutions"
    }
  ];

  const equipmentGuidesPosts: BlogPost[] = [
    {
      title: "Essential Knives Every Home Cook Needs",
      description: "You don't need a dozen knives. Here are the three essential knives that will handle 90% of your kitchen tasks.",
      image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "August 25, 2025",
      slug: "essential-knives-guide"
    },
    {
      title: "Cast Iron Care and Cooking",
      description: "Everything you need to know about maintaining and cooking with cast iron. From seasoning to cleaning, master this versatile cookware.",
      image: "https://images.unsplash.com/photo-1567954046925-780ec4ab0157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "August 18, 2025",
      slug: "cast-iron-care-cooking"
    },
    {
      title: "Small Appliances Worth the Investment",
      description: "Which gadgets actually earn their counter space? A honest review of small appliances that will change your cooking game.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      date: "August 10, 2025",
      slug: "small-appliances-investment"
    }
  ];

  return (
    <>
      {/* StandaloneBreadcrumbs handles container, positioning, and spacing */}
      <StandaloneBreadcrumbs items={[{ label: 'In The Kitchen' }]} />

      <main className="pt-6 sm:pt-8">
        {/* PageHeader now focuses only on title and description */}
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
