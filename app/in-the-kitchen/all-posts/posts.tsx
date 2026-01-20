'use client';

import { useRouter } from 'next/navigation';
import { BlogPostCard } from "@/components/BlogPostCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";

interface KitchenPost {
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

export default function InTheKitchenAllPostsPage() {
  const router = useRouter();
  
  // All posts organized by date (newest first)
  const posts: KitchenPost[] = [
    {
      title: "Knife Skills for Beginners",
      description: "Learn the essential knife techniques that will transform your cooking. From proper grip to different cutting styles, these basics will make prep work easier and safer.",
      image: "https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "October 20, 2025",
      slug: "mastering-knife-skills"
    },
    {
      title: "Building Your Essential Spice Collection",
      description: "A guide to the must-have spices that form the foundation of countless recipes. Learn how to store them properly and when to use each one.",
      image: "https://images.unsplash.com/photo-1558013637-a125529cc856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZSUyMGphcnMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjczMzg3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tips",
      date: "October 12, 2025",
      slug: "building-spice-collection"
    },
    {
      title: "The Art of Making Perfect Pasta",
      description: "From selecting the right shape to achieving al dente perfection, discover the secrets to cooking pasta like an Italian grandmother.",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYxNDc5NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "October 5, 2025",
      slug: "perfect-pasta"
    },
    {
      title: "Kitchen Organization Hacks",
      description: "Transform your kitchen workflow with these simple organization tips. A well-organized kitchen makes cooking more enjoyable and efficient.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Organization",
      date: "September 28, 2025",
      slug: "kitchen-organization"
    },
    {
      title: "Mastering Cooking Techniques",
      description: "Essential cooking methods every home chef should know. From sautéing to braising, master the fundamentals that will elevate your dishes.",
      image: "https://images.unsplash.com/photo-1677776233852-bc3abd98190e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwdGVjaG5pcXVlc3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "September 20, 2025",
      slug: "mastering-cooking-techniques"
    },
    {
      title: "Baking Tips for Perfect Results",
      description: "Unlock the secrets to consistent baking success. Learn the tricks professionals use to create perfect pastries, cakes, and breads every time.",
      image: "https://images.unsplash.com/photo-1669221262092-5fd1232482b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdGlwcyUyMGJha2luZ3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Baking",
      date: "September 15, 2025",
      slug: "baking-tips-perfect-results"
    },
    {
      title: "Food Prep Made Easy",
      description: "Streamline your cooking with smart food preparation strategies. Save time and reduce stress with these meal prep techniques.",
      image: "https://images.unsplash.com/photo-1655890193532-3f51318b23c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJlcGFyYXRpb24lMjBjb29raW5nfGVufDF8fHx8MTc2ODkzMjI2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tips",
      date: "September 10, 2025",
      slug: "food-prep-made-easy"
    },
    {
      title: "Understanding Flavor Profiles",
      description: "Learn how to balance sweet, salty, sour, and bitter flavors. Understanding flavor profiles will help you create more complex and delicious dishes.",
      image: "https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "September 5, 2025",
      slug: "understanding-flavor-profiles"
    },
    {
      title: "Kitchen Tool Essentials",
      description: "The must-have tools for every home kitchen. Build your collection with these essential items that will make cooking easier and more enjoyable.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Organization",
      date: "August 28, 2025",
      slug: "kitchen-tool-essentials"
    },
    {
      title: "Cooking with Fresh Herbs",
      description: "Elevate your dishes with fresh herbs. Learn which herbs work best in different recipes and how to store them for maximum freshness.",
      image: "https://images.unsplash.com/photo-1558013637-a125529cc856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZSUyMGphcnMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjczMzg3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tips",
      date: "August 20, 2025",
      slug: "cooking-with-fresh-herbs"
    },
    {
      title: "Perfecting Your Sauces",
      description: "Master the art of sauce making. From classic French mother sauces to quick pan sauces, learn techniques that will transform your cooking.",
      image: "https://images.unsplash.com/photo-1677776233852-bc3abd98190e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwdGVjaG5pcXVlc3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "August 15, 2025",
      slug: "perfecting-your-sauces"
    },
    {
      title: "Seasonal Cooking Guide",
      description: "Cook with the seasons for the best flavor and value. Discover which ingredients are at their peak and how to use them.",
      image: "https://images.unsplash.com/photo-1655890193532-3f51318b23c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJlcGFyYXRpb24lMjBjb29raW5nfGVufDF8fHx8MTc2ODkzMjI2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tips",
      date: "August 10, 2025",
      slug: "seasonal-cooking-guide"
    },
    {
      title: "Bread Baking Basics",
      description: "Start your bread baking journey with these fundamental techniques. From kneading to proofing, learn how to make beautiful homemade bread.",
      image: "https://images.unsplash.com/photo-1669221262092-5fd1232482b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdGlwcyUyMGJha2luZ3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Baking",
      date: "August 5, 2025",
      slug: "bread-baking-basics"
    },
    {
      title: "Meal Planning Strategies",
      description: "Save time and money with effective meal planning. Learn how to plan, shop, and prep for a week of delicious meals.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Organization",
      date: "July 28, 2025",
      slug: "meal-planning-strategies"
    },
    {
      title: "Cooking with Cast Iron",
      description: "Discover the versatility of cast iron cookware. Learn proper seasoning, maintenance, and cooking techniques for these kitchen workhorses.",
      image: "https://images.unsplash.com/photo-1677776233852-bc3abd98190e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwdGVjaG5pcXVlc3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "July 20, 2025",
      slug: "cooking-with-cast-iron"
    },
    {
      title: "Pantry Organization Tips",
      description: "Create a functional and beautiful pantry. Smart organization tips that will help you find ingredients quickly and reduce food waste.",
      image: "https://images.unsplash.com/photo-1558013637-a125529cc856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZSUyMGphcnMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjczMzg3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Organization",
      date: "July 15, 2025",
      slug: "pantry-organization-tips"
    },
    {
      title: "Grilling and BBQ Techniques",
      description: "Master outdoor cooking with these grilling and BBQ tips. Learn temperature control, timing, and flavor enhancement techniques.",
      image: "https://images.unsplash.com/photo-1655890193532-3f51318b23c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJlcGFyYXRpb24lMjBjb29raW5nfGVufDF8fHx8MTc2ODkzMjI2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "July 10, 2025",
      slug: "grilling-bbq-techniques"
    },
    {
      title: "Kitchen Cleaning Hacks",
      description: "Keep your kitchen sparkling with these efficient cleaning tips. Quick and effective methods to maintain a clean cooking space.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tips",
      date: "July 5, 2025",
      slug: "kitchen-cleaning-hacks"
    },
    {
      title: "Cake Decorating for Beginners",
      description: "Start decorating beautiful cakes with these beginner-friendly techniques. From frosting basics to simple decorations.",
      image: "https://images.unsplash.com/photo-1669221262092-5fd1232482b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdGlwcyUyMGJha2luZ3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Baking",
      date: "June 28, 2025",
      slug: "cake-decorating-beginners"
    },
    {
      title: "Cooking with Wine",
      description: "Enhance your dishes with cooking wine. Learn which wines work best in different recipes and when to add them for maximum flavor.",
      image: "https://images.unsplash.com/photo-1677776233852-bc3abd98190e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwdGVjaG5pcXVlc3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "June 20, 2025",
      slug: "cooking-with-wine"
    },
    {
      title: "Freezer Meal Prep",
      description: "Stock your freezer with ready-to-cook meals. Learn what freezes well and how to properly store meals for future use.",
      image: "https://images.unsplash.com/photo-1655890193532-3f51318b23c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcHJlcGFyYXRpb24lMjBjb29raW5nfGVufDF8fHx8MTc2ODkzMjI2M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tips",
      date: "June 15, 2025",
      slug: "freezer-meal-prep"
    },
    {
      title: "Working with Yeast",
      description: "Demystify yeast baking with this comprehensive guide. Understanding yeast will open up a world of baking possibilities.",
      image: "https://images.unsplash.com/photo-1669221262092-5fd1232482b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdGlwcyUyMGJha2luZ3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Baking",
      date: "June 10, 2025",
      slug: "working-with-yeast"
    },
    {
      title: "Slow Cooker Secrets",
      description: "Get the most out of your slow cooker. Tips for choosing recipes, adapting cooking times, and achieving perfect results.",
      image: "https://images.unsplash.com/photo-1677776233852-bc3abd98190e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwdGVjaG5pcXVlc3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "June 5, 2025",
      slug: "slow-cooker-secrets"
    },
    {
      title: "Food Storage Solutions",
      description: "Keep your food fresh longer with proper storage techniques. Learn the best ways to store different types of ingredients.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Organization",
      date: "May 28, 2025",
      slug: "food-storage-solutions"
    },
    {
      title: "Pastry Dough Mastery",
      description: "Perfect your pastry dough technique. From flaky pie crusts to delicate puff pastry, master the art of working with dough.",
      image: "https://images.unsplash.com/photo-1669221262092-5fd1232482b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdGlwcyUyMGJha2luZ3xlbnwxfHx8fDE3Njg5MzIyNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Baking",
      date: "May 20, 2025",
      slug: "pastry-dough-mastery"
    },
  ];

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
      breadcrumbItems={[
        { label: "In The Kitchen", href: "/in-the-kitchen" },
        { label: "All Posts" }
      ]}
      items={posts}
      renderItem={renderPost}
      itemsPerPage={20}
      heroClassName=""
      gridClassName="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12"
    />
  );
}
