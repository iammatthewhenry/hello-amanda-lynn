'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Clock, Star, Users, DollarSign, Tag } from 'lucide-react';
import { ShareBar } from '@/components/ShareBar';
import { Container, Card, Button } from '@/components/ui';

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

// Blog Posts Database
const inTheKitchenPosts: Record<string, BlogPost> = {
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
      'Let\'s start with the basics: holding your knife correctly. Place your thumb and forefinger on opposite sides of the blade, just above the handle. Your other three fingers wrap around the handle. This \'pinch grip\' gives you maximum control and feels awkward at first, but stick with it.',
      'Your other hand—the guide hand—is equally important. Curl your fingertips inward, using your knuckles as a guide for the blade. This \'claw grip\' protects your fingertips while keeping ingredients stable. The knife blade should rest against your knuckles as you cut.',
      'The three essential cuts every home cook should master are the slice, the dice, and the chiffonade. For slicing, use a smooth rocking motion, keeping the tip of the knife on the cutting board. For dicing, first slice lengthwise, then crosswise. For chiffonade (ribbons), stack leafy greens, roll tightly, and slice thinly.',
      'Practice makes perfect, but smart practice makes progress faster. Start slow and focus on consistency rather than speed. Speed will come naturally as your technique improves. Use a sharp knife—dull knives are actually more dangerous because they require more pressure and are more likely to slip.',
      'A good quality chef\'s knife is worth the investment. You don\'t need a whole set—just one 8-inch chef\'s knife will handle 90% of your kitchen tasks. Keep it sharp, hand wash it, and store it properly. A sharp knife is a safe knife and makes cooking so much more enjoyable.',
      'One of my favorite exercises for beginners is the \'dice an onion\' challenge. Onions are forgiving, affordable, and require all the basic techniques. Practice dicing a few onions (freeze them for later use!) and watch your confidence soar.'
    ],
    tips: [
      'Keep your knife sharp—a sharp knife is safer than a dull one',
      'Use a stable cutting board with a damp towel underneath to prevent slipping',
      'Focus on consistency before speed—speed comes with practice',
      'Practice the claw grip to protect your fingertips',
      'Invest in one good chef\'s knife rather than a cheap set'
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
      'Let\'s start with the big five: salt, black pepper, garlic powder, onion powder, and paprika. These five spices will get you through most basic recipes. Real kosher salt and freshly ground black pepper are non-negotiables in my kitchen. The difference in flavor is dramatic.',
      'Next level up: add cumin, chili powder, cinnamon, oregano, and basil. Now you can cook Mexican, Italian, Middle Eastern, and baking recipes. These ten spices cover about 80% of recipes you\'ll encounter. Buy them in small quantities from bulk bins if possible—spices lose potency over time.',
      'Storage matters more than people think. Spices should be stored in airtight containers away from heat, light, and moisture. That means not above your stove! A cool, dark cabinet is ideal. Whole spices last longer than ground—buy whole peppercorns, nutmeg, and cinnamon sticks when possible.',
      'Here\'s a controversial opinion: those pre-mixed spice blends aren\'t always bad. Italian seasoning, herbs de Provence, and curry powder are convenient and consistent. But read the ingredients—some contain fillers or salt. As you grow more confident, you can create your own custom blends.',
      'When to use dried vs. fresh herbs? Heartier herbs like rosemary, thyme, and oregano work well dried for long cooking times. Delicate herbs like basil, cilantro, and parsley are best fresh as a finishing touch. Dried herbs are about 3x more potent than fresh, so adjust accordingly.',
      'Finally, smell your spices before using them. If they don\'t smell strongly, they won\'t taste strongly. Most ground spices last 1-2 years, whole spices 3-4 years. Date your jars and refresh them regularly. Quality, fresh spices make the difference between okay food and amazing food.'
    ],
    tips: [
      'Start with the basic five: salt, pepper, garlic powder, onion powder, paprika',
      'Buy in small quantities and refresh regularly for best flavor',
      'Store in a cool, dark place away from the stove',
      'Toast whole spices before grinding for maximum flavor',
      'Smell test your spices—if they don\'t smell strong, they won\'t taste strong'
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
      'First, use plenty of water. The general rule is 4-6 quarts of water per pound of pasta. Pasta needs room to move freely as it cooks. Cramped pasta sticks together and cooks unevenly. Yes, it takes longer to boil that much water, but it\'s worth it.',
      'Salt your water generously—it should taste like the sea. This is your only chance to season the pasta itself. About 1-2 tablespoons of salt per pound of pasta. Don\'t add oil to the water; it prevents sauce from adhering to the pasta later.',
      'Don\'t rely solely on the package timing. Start testing pasta 2 minutes before the recommended time. Al dente means \'to the tooth\' in Italian—the pasta should have a slight firmness when you bite into it. It will continue cooking slightly after you drain it.',
      'Here\'s the game-changer: save a cup of pasta cooking water before draining. This starchy, salty water is liquid gold for creating silky, cohesive sauces. Add it gradually to your sauce along with the pasta to achieve that glossy, restaurant-quality finish.',
      'Never rinse your pasta unless you\'re making a cold pasta salad. The starch on the surface helps sauce cling. Instead, immediately toss hot, just-drained pasta with your sauce. The residual heat helps the sauce penetrate the pasta.',
      'Match pasta shapes to sauces thoughtfully. Long, thin pasta like spaghetti pairs with oil-based or light tomato sauces. Tube pasta like penne holds chunky sauces. Wide noodles like pappardelle work with hearty meat sauces. Ridged pasta (rigate) catches more sauce than smooth.'
    ],
    tips: [
      'Use 4-6 quarts of water per pound of pasta',
      'Salt water generously until it tastes like the sea',
      'Save pasta water before draining—it\'s perfect for sauce',
      'Test pasta 2 minutes before package time for al dente',
      'Never rinse hot pasta—the starch helps sauce cling'
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
      'Start with a ruthless declutter. If you haven\'t used something in a year, donate it. That single-use gadget you never reach for? Gone. Duplicate tools collecting dust? Out. Be honest about what you actually use and need.',
      'Organize by workflow, not by appearance or category. Keep items where you use them. Cutting boards and knives near the prep area. Pots and pans near the stove. Baking supplies together in one zone. This means less movement and more efficiency.',
      'Use vertical space effectively. Wall-mounted shelves, magnetic knife strips, hanging pots, pegboards—they multiply your storage capacity. I installed a pegboard system that lets me see everything at a glance and customize the layout.',
      'Implement the \'first in, first out\' system for ingredients. Move older items to the front when restocking. Use clear containers so you can see what you have at a glance. Label everything with contents and dates.',
      'Create zones for different meal types. Breakfast items in one area, baking supplies together, snacking foods grouped. This makes meal prep faster and prevents you from buying duplicates.',
      'Finally, a clean and organized kitchen isn\'t about being perfect—it\'s about making cooking enjoyable. Invest in storage solutions that fit your kitchen and your habits. What works for me might not work for you, so experiment and adjust.'
    ],
    tips: [
      'Organize by workflow, not appearance',
      'Keep your most-used tools in the most accessible spots',
      'Use clear containers and label with dates',
      'Create a \'first in, first out\' system for ingredients',
      'Invest in vertical storage solutions to maximize space'
    ]
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const blogPost = inTheKitchenPosts[slug];
    if (blogPost) {
      setPost(blogPost);
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Post Not Found</h1>
          <p className="text-muted-foreground mb-4">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/blog')} variant="ghost" className="text-green hover:underline">
            Back to Blog
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Breadcrumbs */}
      <Container size="4xl" className="-mt-1.5 mb-8">
        <Breadcrumbs
          items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title }
          ]}
        />
      </Container>

      {/* Hero Image */}
      <Container size="4xl" className="mb-12">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-lg shadow-lg mb-8"
        />
      </Container>

      {/* Post Header */}
      <Container size="4xl" className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-lg text-muted-foreground mb-6">{post.description}</p>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground pb-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Tag size={16} />
            <span>{post.category}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{post.publishedDate}</span>
          </div>
        </div>
      </Container>

      {/* Post Content */}
      <Container size="4xl" className="mb-12">
        <div className="prose prose-sm max-w-none space-y-6">
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-foreground text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>

      {/* Tips Section */}
      {post.tips && post.tips.length > 0 && (
        <Container size="4xl" className="mb-12">
          <Card variant="feature" className="p-8 rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Key Takeaways</h2>
            <ul className="space-y-3">
              {post.tips.map((tip, index) => (
                <li key={index} className="flex gap-3">
                  <Star size={20} className="text-green flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        </Container>
      )}

      {/* Share Bar */}
      <Container size="4xl">
        <ShareBar
          title={post.title}
          description={post.description}
          imageUrl={post.image}
        />
      </Container>
    </main>
  );
}

// Calendar icon since it's not in lucide-react by default
function Calendar({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
