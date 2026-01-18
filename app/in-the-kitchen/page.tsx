'use client';

import { ChefHat, Thermometer, BookOpen, Gamepad2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BlogPostCard } from '@/components/BlogPostCard';
import { ListingPageLayout } from '@/components/ListingPageLayout';
import { Section, SectionHeader, Container, Card, Button } from '@/components/ui';

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
  
  const posts: KitchenPost[] = [
    {
      title: 'Knife Skills for Beginners',
      description: 'Learn the essential knife techniques that will transform your cooking. From proper grip to different cutting styles, these basics will make prep work easier and safer.',
      image: 'https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Techniques',
      date: 'October 20, 2025',
      slug: 'mastering-knife-skills'
    },
    {
      title: 'Building Your Essential Spice Collection',
      description: 'A guide to the must-have spices that form the foundation of countless recipes. Learn how to store them properly and when to use each one.',
      image: 'https://images.unsplash.com/photo-1558013637-a125529cc856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZSUyMGphcnMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjczMzg3MHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Tips',
      date: 'October 12, 2025',
      slug: 'building-spice-collection'
    },
    {
      title: 'The Art of Making Perfect Pasta',
      description: 'From selecting the right shape to achieving al dente perfection, discover the secrets to cooking pasta like an Italian grandmother.',
      image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYxNDc5NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Techniques',
      date: 'October 5, 2025',
      slug: 'perfect-pasta'
    },
    {
      title: 'Kitchen Organization Hacks',
      description: 'Transform your kitchen workflow with these simple organization tips. A well-organized kitchen makes cooking more enjoyable and efficient.',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      category: 'Organization',
      date: 'September 28, 2025',
      slug: 'kitchen-organization'
    },
  ];

  const quickTips = [
    {
      icon: Thermometer,
      title: 'Room Temperature Ingredients',
      tip: 'Bring eggs, butter, and dairy to room temperature before baking for better texture and consistency.',
    },
    {
      icon: BookOpen,
      title: 'Read the Recipe First',
      tip: 'Always read through the entire recipe before starting. It helps you plan and avoid surprises.',
    },
  ];

  const renderPost = (post: KitchenPost, index: number) => (
    <BlogPostCard
      key={index}
      title={post.title}
      description={post.description}
      image={post.image}
      onClick={() => router.push(`/in-the-kitchen/${post.slug}`)}
    />
  );

  return (
    <ListingPageLayout
      title="In The Kitchen"
      description="Tips, techniques, and behind the scenes stories from the kitchen. Learn the skills that will elevate your cooking and make time in the kitchen more enjoyable."
      breadcrumbItems={[{ label: 'In The Kitchen' }]}
      items={posts}
      renderItem={renderPost}
      itemsPerPage={10}
      heroClassName="" // No background color for blog pages
      gridClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
    >
      {/* Quick Kitchen Tips */}
      <Section spacing="none" className="pb-0 sm:pb-2 lg:pb-6">
        <SectionHeader 
          title="Quick Kitchen Tips" 
          subtitle="Simple tips that make a big difference"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickTips.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} variant="feature" centered>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green/10 rounded-full mb-4">
                  <Icon className="text-green" size={28} />
                </div>
                <h3 className="mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.tip}</p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Name This Game */}
      <Section spacing="none" className="pb-0 sm:pb-2 lg:pb-6">
        <Card variant="feature" className="p-6 text-center max-w-3xl mx-auto border-2 border-border" centered>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green/10 rounded-full">
              <Gamepad2 className="text-green" size={18} />
            </div>
            <h3 className="font-semibold">Name This Game</h3>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Test your culinary knowledge! Can you identify these dishes, ingredients, and kitchen tools?
          </p>
          <Button 
            onClick={() => router.push('/name-this')}
            variant="green"
            size="md"
          >
            Start Game
          </Button>
        </Card>
      </Section>
    </ListingPageLayout>
  );
}
