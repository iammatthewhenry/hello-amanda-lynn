'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShareBar } from '@/components/share-bar';
import { BlogPostTemplate } from '@/components/blog-post-template';
import { Container } from '@/components/container';

interface BlogPost {
  title: string;
  image: string;
  publishedDate: string;
  author: string;
  category: string;
  readTime: string;
  description: string;
  content: string[];
  tips?: string[];
}

const mockPosts: Record<string, BlogPost> = {
  'mastering-knife-skills': {
    title: 'Knife Skills for Beginners',
    image: 'https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'October 20, 2025',
    author: 'Amanda Lynn',
    category: 'Techniques',
    readTime: '8 min read',
    description: 'Learn the essential knife techniques that will transform your cooking.',
    content: [
      'When I first started cooking, I was intimidated by knives. I\'d awkwardly saw through vegetables, my cuts were uneven, and prep work took forever. Learning proper knife skills was a game-changer that transformed not just my cooking, but my confidence in the kitchen.',
      'The first thing to understand is that a sharp knife is actually safer than a dull one. A sharp knife cuts cleanly with minimal pressure, while a dull knife requires force and is more likely to slip. Invest in a good chef\'s knife and learn to keep it sharp—it\'s the most important tool in your kitchen.',
      'Grip is everything. Hold the knife handle with your last three fingers while pinching the blade between your thumb and index finger just above the handle. This gives you maximum control. Your other hand should form a \'claw\' with fingertips tucked back, knuckles forward, guiding the blade.',
      'Master these basic cuts: the slice (straight down), the chop (rocking motion), the dice (uniform cubes), the julienne (thin matchsticks), and the chiffonade (thin ribbons for herbs). Each has its purpose, and with practice, they become second nature.',
      'Practice makes perfect. Start slow, focusing on consistency rather than speed. Speed comes naturally with repetition. I spent weeks dicing onions until my cuts were uniform—now it\'s muscle memory. Your cooking will improve not just because of better knife skills, but because even cooking requires even cuts.'
    ],
    tips: [
      'Keep your knife sharp with regular honing and occasional professional sharpening',
      'Always use a stable cutting board—place a damp towel underneath to prevent slipping',
      'Let your knife do the work—excessive pressure means your blade needs sharpening',
      'Practice the claw grip to protect your fingertips',
      'Start with softer vegetables like zucchini before moving to harder ones'
    ]
  },
  'building-spice-collection': {
    title: 'Building Your Essential Spice Collection',
    image: 'https://images.unsplash.com/photo-1558013637-a125529cc856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZSUyMGphcnMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjczMzg3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'October 12, 2025',
    author: 'Amanda Lynn',
    category: 'Tips',
    readTime: '10 min read',
    description: 'A guide to the must-have spices for every home kitchen.',
    content: [
      'Walking into a well-stocked spice store can be overwhelming. Hundreds of jars, exotic names, steep prices—where do you even start? After years of cooking and experimenting, I\'ve narrowed down the essential spices that form the foundation of my cooking.',
      'Start with these basics: kosher salt (not table salt), black peppercorns (buy whole and grind fresh), garlic powder, onion powder, paprika, cumin, oregano, basil, thyme, cinnamon, and red pepper flakes. These eleven spices can create countless flavor profiles across different cuisines.',
      'Quality matters more than quantity. Buy smaller amounts of high-quality spices rather than large containers of mediocre ones. Whole spices last longer than ground—invest in a small coffee grinder dedicated to spices if you want to take your cooking to the next level.',
      'Storage is crucial. Keep spices away from heat, light, and moisture. That pretty spice rack above your stove? It\'s actually the worst place for spices. I keep mine in a drawer near my prep area—cool, dark, and easily accessible. Label everything with the purchase date.',
      'Don\'t be afraid to experiment. Once you\'re comfortable with the basics, branch out one spice at a time. I add a new spice every month or two, research its uses, and experiment with it in different dishes. This gradual approach builds knowledge and confidence without overwhelming your pantry or wallet.'
    ],
    tips: [
      'Replace ground spices every 6-12 months, whole spices every 2-3 years',
      'Toast whole spices in a dry pan before grinding to intensify flavors',
      'Buy from stores with high turnover to ensure freshness',
      'Start recipes with dried herbs but finish with fresh herbs for maximum flavor',
      'Create your own spice blends—it\'s cheaper and you can customize to your taste'
    ]
  },
  'perfect-pasta': {
    title: 'The Art of Making Perfect Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYxNDc5NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'October 5, 2025',
    author: 'Amanda Lynn',
    category: 'Techniques',
    readTime: '9 min read',
    description: 'Discover the secrets to cooking pasta like an Italian grandmother.',
    content: [
      'Pasta seems simple—boil water, add pasta, drain. But there\'s an art to achieving that perfect al dente texture and properly coating each strand with sauce. These techniques transformed my pasta from merely edible to restaurant-quality.',
      'Use a large pot with plenty of water—at least 4-6 quarts for a pound of pasta. The pasta needs room to move freely. Salt the water generously once it\'s boiling—it should taste like the sea. This is your only chance to season the pasta itself.',
      'Don\'t add oil to the water. It\'s a myth that it prevents sticking (stirring does that) and it actually prevents sauce from adhering to the pasta. Save your good olive oil for finishing the dish.',
      'Al dente means \'to the tooth\'—the pasta should have a slight resistance when bitten. Start testing two minutes before the package directions suggest. Remember, it will continue cooking briefly after draining, and even more if you toss it in a hot pan with sauce.',
      'Never rinse pasta unless you\'re making a cold pasta salad. That starchy water clinging to the pasta helps the sauce adhere. Speaking of starchy water, always reserve a cup before draining. This liquid gold helps emulsify and adjust your sauce consistency. I add it in small splashes while tossing pasta with sauce in the pan—it\'s transformative.'
    ],
    tips: [
      'Match pasta shapes to sauce types—long thin pasta for light sauces, shapes with hollows for chunky sauces',
      'Finish cooking pasta in the sauce for better flavor integration',
      'The pasta-to-sauce ratio should be about 3:1—the sauce should coat, not drown',
      'Add pasta to the sauce, not sauce to pasta',
      'Freshly grated cheese should be added off heat to prevent clumping'
    ]
  },
  'kitchen-organization': {
    title: 'Kitchen Organization Hacks',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'September 28, 2025',
    author: 'Amanda Lynn',
    category: 'Organization',
    readTime: '7 min read',
    description: 'Transform your kitchen workflow with simple organization tips.',
    content: [
      'A disorganized kitchen is frustrating. You waste time searching for tools, ingredients expire forgotten in the back of cabinets, and cooking feels like a chore. When I reorganized my kitchen using these principles, cooking became genuinely enjoyable again.',
      'Start by decluttering ruthlessly. If you haven\'t used something in a year, donate it. Duplicate tools you never reach for? Gone. Those single-purpose gadgets collecting dust? Out. Create space for the tools you actually use regularly.',
      'Organize by workflow, not by category. Keep items where you use them: cutting boards and knives near your prep area, pots and pans near the stove, baking supplies together in one zone. This reduces unnecessary movement and makes cooking more efficient.',
      'Use vertical space. Pot racks, magnetic knife strips, wall-mounted spice racks, and shelf risers multiply your storage capacity. I installed a pegboard system that lets me customize tool placement and see everything at a glance.',
      'Implement the \'first in, first out\' system for ingredients. When you restock, move older items to the front. Label containers with contents and dates. Use clear containers so you can see what you have at a glance. These simple systems prevent waste and save money.'
    ],
    tips: [
      'Keep your most-used tools in the most accessible spots',
      'Group items by meal type—breakfast items together, baking supplies together',
      'Use drawer dividers to prevent utensil chaos',
      'Store lids separately from containers using a file organizer',
      'Create a \'prep station\' with cutting boards, knives, and most-used seasonings in one area'
    ]
  }
};

type ContentType = 'loading' | 'blog-post' | 'not-found';
type ContentData = BlogPost | null;

export default function InTheKitchenDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [contentType, setContentType] = useState<ContentType>('loading');
  const [content, setContent] = useState<ContentData>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadContent() {
      if (!slug) {
        setContentType('not-found');
        return;
      }

      const mockPost = mockPosts[slug];
      if (mockPost) {
        setContent(mockPost);
        setContentType('blog-post');
      } else {
        setContentType('not-found');
      }
    }

    loadContent();
  }, [slug]);

  if (contentType === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (contentType === 'not-found' || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Post not found</h1>
          <p className="text-muted-foreground">The post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const post = content as BlogPost;

  return (
    <main>
      <Container size="4xl" className="-mt-1.5 mb-[50px]">
        <Breadcrumbs 
          items={[
            { label: 'In The Kitchen', href: '/in-the-kitchen' },
            { label: post.title }
          ]}
        />
      </Container>

      <BlogPostTemplate
        image={post.image}
        title={post.title}
        author={post.author}
        publishedDate={post.publishedDate}
        metaDetails={
          <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
            <span className="text-sm">{post.category}</span>
          </div>
        }
        description={post.description}
        content={post.content}
        tipSection={
          post.tips && post.tips.length > 0
            ? {
                title: 'Key Takeaways',
                tips: post.tips,
              }
            : undefined
        }
        shareTitle={post.title}
        shareDescription={post.description}
        shareImageUrl={post.image}
      />

      <ShareBar
        title={post.title}
        description={post.description}
        imageUrl={post.image}
      />
    </main>
  );
}
