// app/in-the-kitchen/page.tsx

'use client';

import { SectionPageCard } from '@/components/SectionPageCard';
import { SectionPageLayout } from '@/components/SectionPageLayout';
import { QuickKitchenTips } from '@/components/sections/QuickKitchenTips';
import { NameThisGame } from '@/components/sections/NameThisGame';

// ===================================================================
// TYPES
// ===================================================================
interface KitchenPost {
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

// ===================================================================
// IN THE KITCHEN PAGE
// ===================================================================
export default function InTheKitchenPage() {
  const posts: KitchenPost[] = [
    {
      title: "Knife Skills for Beginners",
      description: "Learn the essential knife techniques that will transform your cooking. From proper grip to different cutting styles, these basics will make prep work easier and safer.",
      image: "https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Techniques",
      date: "October 20, 2025",
      slug: "mastering-knife-skills"
    },
    {
      title: "Building Your Essential Spice Collection",
      description: "A guide to the must-have spices that form the foundation of countless recipes. Learn how to store them properly and when to use each one.",
      image: "https://images.unsplash.com/photo-1558013637-a125529cc856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZSUyMGphcnMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjczMzg3MHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Tips",
      date: "October 12, 2025",
      slug: "building-spice-collection"
    },
    {
      title: "The Art of Making Perfect Pasta",
      description: "From selecting the right shape to achieving al dente perfection, discover the secrets to cooking pasta like an Italian grandmother.",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYxNDc5NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Techniques",
      date: "October 5, 2025",
      slug: "perfect-pasta"
    },
    {
      title: "Kitchen Organization Hacks",
      description: "Transform your kitchen workflow with these simple organization tips. A well-organized kitchen makes cooking more enjoyable and efficient.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Organization",
      date: "September 28, 2025",
      slug: "kitchen-organization"
    },
  ];

  const renderPost = (post: KitchenPost, index: number) => (
    <SectionPageCard
      key={index}
      title={post.title}
      description={post.description}
      image={post.image}
      href={`/in-the-kitchen/${post.slug}`}
      category={post.category}
      date={post.date}
    />
  );

  return (
    <SectionPageLayout
      title="In The Kitchen"
      description="Tips, techniques, and behind the scenes stories from the kitchen. Learn the skills that will elevate your cooking and make time in the kitchen more enjoyable."
      breadcrumbItems={[{ label: "In The Kitchen" }]}
      items={posts}
      renderItem={renderPost}
      itemsPerPage={10}
      heroClassName=""
      gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
    >
      {/* Bottom Sections */}
      <QuickKitchenTips />
      <NameThisGame />
    </SectionPageLayout>
  );
}
