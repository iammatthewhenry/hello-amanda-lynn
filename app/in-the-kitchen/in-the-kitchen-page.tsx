'use client';

import { ChefHat, Thermometer, BookOpen, Gamepad2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { PageHeader } from "@/components/PageHeader";
import { GridSection } from "@/components/GridSection";

interface KitchenPost {
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

export default function InTheKitchenPage() {
  const router = useRouter();
  
  // Techniques posts
  const techniquesPosts: KitchenPost[] = [
    {
      title: "Knife Skills for Beginners",
      description: "Learn the essential knife techniques that will transform your cooking. From proper grip to different cutting styles, these basics will make prep work easier and safer.",
      image: "https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "October 20, 2025",
      slug: "mastering-knife-skills"
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
      title: "Mastering Homemade Stocks",
      description: "Learn how to make rich, flavorful stocks from scratch that will elevate all your soups and sauces.",
      image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwc3RvY2slMjBzb3VwfGVufDF8fHx8MTc2MTQ3NDQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "September 20, 2025",
      slug: "homemade-stocks"
    },
    {
      title: "Perfectly Roasted Vegetables",
      description: "Master the art of roasting vegetables to bring out their natural sweetness and achieve perfect caramelization.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "August 18, 2025",
      slug: "roasted-vegetables"
    },
    {
      title: "Making Fresh Pasta at Home",
      description: "Experience the joy of creating silky smooth pasta from scratch with just flour, eggs, and a bit of patience.",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHBhc3RhJTIwbWFraW5nfGVufDF8fHx8MTc2MTQ3NDQwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Techniques",
      date: "August 10, 2025",
      slug: "fresh-pasta-home"
    },
  ];

  // Tips & Organization posts
  const tipsPosts: KitchenPost[] = [
    {
      title: "Building Your Essential Spice Collection",
      description: "A guide to the must-have spices that form the foundation of countless recipes. Learn how to store them properly and when to use each one.",
      image: "https://images.unsplash.com/photo-1558013637-a125529cc856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZSUyMGphcnMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjczMzg3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tips",
      date: "October 12, 2025",
      slug: "building-spice-collection"
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
      title: "Meal Prep Like a Pro",
      description: "Efficient strategies for planning and preparing meals ahead of time to save hours during busy weeknights.",
      image: "https://images.unsplash.com/photo-1546548970-71785318a17b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFsJTIwcHJlcCUyMGNvbnRhaW5lcnN8ZW58MXx8fHwxNzYxNDc0NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tips",
      date: "September 1, 2025",
      slug: "meal-prep-pro"
    },
  ];

  // Tools & Equipment posts
  const toolsPosts: KitchenPost[] = [
    {
      title: "Choosing the Right Cookware",
      description: "A comprehensive guide to selecting quality pots and pans that will last a lifetime in your kitchen.",
      image: "https://images.unsplash.com/photo-1584990347449-1082b80fbfe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rd2FyZSUyMHBhbnN8ZW58MXx8fHwxNzYxNDc0NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tools",
      date: "September 15, 2025",
      slug: "choosing-cookware"
    },
    {
      title: "Seasoning Cast Iron Cookware",
      description: "Learn the proper technique for seasoning and maintaining cast iron to create a naturally non-stick surface.",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN0JTIwaXJvbiUyMHNraWxsZXR8ZW58MXx8fHwxNzYxNDc0NDA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Tools",
      date: "August 3, 2025",
      slug: "seasoning-cast-iron"
    },
  ];

  // Ingredients & Baking posts
  const ingredientsPosts: KitchenPost[] = [
    {
      title: "Understanding Cooking Oils",
      description: "Discover which oils to use for different cooking methods and how their flavor profiles can enhance your dishes.",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwb2lsc3xlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Ingredients",
      date: "August 25, 2025",
      slug: "understanding-oils"
    },
    {
      title: "Bread Baking Basics",
      description: "Start your bread baking journey with these fundamental techniques and simple recipes that guarantee success.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVhZCUyMGJha2luZ3xlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Baking",
      date: "September 8, 2025",
      slug: "bread-baking-basics"
    },
  ];

  const quickTips = [
    {
      icon: Thermometer,
      title: "Room Temperature Ingredients",
      tip: "Bring eggs, butter, and dairy to room temperature before baking for better texture and consistency.",
    },
    {
      icon: BookOpen,
      title: "Read the Recipe First",
      tip: "Always read through the entire recipe before starting. It helps you plan and avoid surprises.",
    },
  ];

  return (
    <>
      <PageHeader 
        title="In The Kitchen"
        description="Tips, techniques, and behind the scenes stories from the kitchen. Learn the skills that will elevate your cooking and make time in the kitchen more enjoyable."
        breadcrumbLabel="In The Kitchen"
      />

      <GridSection
        title="Techniques"
        posts={techniquesPosts}
        baseSlug="/in-the-kitchen"
        viewAllLink="/in-the-kitchen/techniques/all-posts"
        viewAllLabel="View All Techniques"
        isFirstSection={true}
      />

      <GridSection
        title="Tips & Organization"
        posts={tipsPosts}
        baseSlug="/in-the-kitchen"
        viewAllLink="/in-the-kitchen/tips/all-posts"
        viewAllLabel="View All Tips"
      />

      <GridSection
        title="Tools & Equipment"
        posts={toolsPosts}
        baseSlug="/in-the-kitchen"
        viewAllLink="/in-the-kitchen/tools/all-posts"
        viewAllLabel="View All Tools"
      />

      <GridSection
        title="Ingredients & Baking"
        posts={ingredientsPosts}
        baseSlug="/in-the-kitchen"
        viewAllLink="/in-the-kitchen/ingredients/all-posts"
        viewAllLabel="View All Ingredients & Baking"
      />

      {/* Quick Kitchen Tips */}
      <section className="pb-0 sm:pb-[9px] lg:pb-[25px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-4 text-[36px]">Quick Kitchen Tips</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple tips that make a big difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickTips.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="feature-card">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green/10 rounded-full mb-4">
                    <Icon className="text-green" size={28} />
                  </div>
                  <h3 className="mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.tip}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Name This Game */}
      <section className="pb-0 sm:pb-[9px] lg:pb-[25px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary p-6 text-center max-w-3xl mx-auto border-2 border-border">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-green/10 rounded-full">
                <Gamepad2 className="text-green" size={18} />
              </div>
              <h3 className="font-semibold">Name This Game</h3>
            </div>
            <p className="text-muted-foreground mb-4 text-sm">
              Test your culinary knowledge! Can you identify these dishes, ingredients, and kitchen tools?
            </p>
            <button
              onClick={() => router.push('/name-this')}
              className="px-5 py-2 btn-green-scale text-sm"
            >
              Start Game
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
