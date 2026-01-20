'use client';

import { ChefHat, Thermometer, BookOpen, Gamepad2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { BlogPostCard } from "@/components/BlogPostCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";
import { ViewAllPostsButton } from "@/components/ViewAllPostsButton";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { SliderContainer, SliderSlide, SLIDER_CONFIG } from "@/components/ui/slider-adapter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

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
  const [currentSlide, setCurrentSlide] = useState(0);

  // In The Kitchen Slider Content
  const slides = [
    {
      id: "mastering-knife-skills",
      image: "https://images.unsplash.com/photo-1617735605078-8a9336be0816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY29va2luZyUyMGluZ3JlZGllbnRzfGVufDF8fHx8MTc2ODkzMzE5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Kitchen knife skills",
      category: "TECHNIQUES",
      title: "Knife Skills for Beginners",
      description: "Learn the essential knife techniques that will transform your cooking. From proper grip to different cutting styles, these basics will make prep work easier and safer."
    },
    {
      id: "building-spice-collection",
      image: "https://images.unsplash.com/photo-1768572781055-e5cc64015255?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjBraXRjaGVuJTIwdG9vbHN8ZW58MXx8fHwxNzY4OTMzMTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Spice collection",
      category: "TIPS",
      title: "Building Your Essential Spice Collection",
      description: "A guide to the must-have spices that form the foundation of countless recipes. Learn how to store them properly and when to use each one."
    },
    {
      id: "perfect-pasta",
      image: "https://images.unsplash.com/photo-1740727665746-cfe80ababc23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwcHJlcGFyYXRpb24lMjBraXRjaGVufGVufDF8fHx8MTc2ODkzMzE5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      alt: "Making perfect pasta",
      category: "TECHNIQUES",
      title: "The Art of Making Perfect Pasta",
      description: "From selecting the right shape to achieving al dente perfection, discover the secrets to cooking pasta like an Italian grandmother."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDER_CONFIG.autoPlayDelay);

    return () => clearInterval(timer);
  }, [slides.length]);
  
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
    <>
      {/* Breadcrumbs - Match recipe page positioning */}
      <div className="max-w-4xl mx-auto px-[4vw] sm:px-6 lg:px-8 -mt-1.5 mb-0">
        <Breadcrumbs items={[{ label: "In The Kitchen" }]} />
      </div>

      {/* Hero Slider */}
      <section className="w-full pb-2 sm:pb-4 lg:pb-6">
        <div className="container-max">
          <div className="relative h-[250px] sm:h-[320px] lg:h-[420px] xl:h-[480px] overflow-hidden cursor-pointer" onClick={() => router.push(`/in-the-kitchen/${slides[currentSlide].id}`)}>
            <SliderContainer>
              <SliderSlide
                slideKey={currentSlide}
                className="absolute inset-0"
              >
                <ImageWithFallback
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  className="w-full h-full object-cover"
                />
                
                {/* Text Card Overlay */}
                <div className="absolute inset-0 flex items-center justify-center sm:justify-end px-4 sm:px-8 lg:px-16 pointer-events-none">
                  <div className="bg-white p-3 sm:p-6 lg:p-8 xl:p-10 max-w-[384px] sm:max-w-sm lg:max-w-md w-full sm:w-auto" style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}>
                    <p className="text-[10px] sm:text-sm tracking-wider mb-1.5 sm:mb-3 text-green">
                      {slides[currentSlide].category}
                    </p>
                    <h2 className="mb-2 sm:mb-4">
                      {slides[currentSlide].title}
                    </h2>
                    <p className="text-foreground text-[12px] sm:text-base leading-normal sm:leading-normal">
                      {slides[currentSlide].description}
                    </p>
                  </div>
                </div>
              </SliderSlide>
            </SliderContainer>
          </div>
        </div>
      </section>

      <ListingPageLayout
        title="In The Kitchen"
        description="Tips, techniques, and behind the scenes stories from the kitchen. Learn the skills that will elevate your cooking and make time in the kitchen more enjoyable."
        breadcrumbItems={[]} // Breadcrumbs rendered above instead
        items={posts}
        renderItem={renderPost}
        itemsPerPage={10}
        heroClassName="" // No background color for blog pages
        gridClassName="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12"
      >
        {/* View All Posts Button */}
        <ViewAllPostsButton navigateTo="/in-the-kitchen/all-posts" />

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
      </ListingPageLayout>
    </>
  );
}
