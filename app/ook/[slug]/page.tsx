'use client';
export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import { Breadcrumbs, ShareBar, BlogPostTemplate } from '@/components';
import NotFoundPage from '@/app/not-found';

interface OutOfKitchenPost {
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  slug: string;
  content: string[];
  specialty: string;
  tips?: string[];
}

const mockPosts: Record<string, OutOfKitchenPost> = {
  "local-food-markets": {
    title: "Exploring Local Food Markets",
    description: "Discovering treasures at the weekly farmer's market. The energy, colors, and direct connection to where your food comes from transforms grocery shopping into an adventure.",
    image: "https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Various Locations",
    date: "October 8, 2025",
    slug: "local-food-markets",
    specialty: "$$",
    content: [
      "There's something magical about farmer's markets. The energy, the colors, the direct connection to where your food comes from - it transforms grocery shopping from a chore into an adventure.",
      "I arrive early, around 7:30am, when the vendors are just finishing their setup and the morning light is soft and golden. Early arrival means first pick of the best produce.",
      "My first stop is always Tom's produce stand. Tom grows heritage varieties you won't find in supermarkets - Cherokee purple tomatoes with their deep, complex flavor.",
      "The bread stand is dangerous. The aroma of fresh-baked sourdough is impossible to resist. They sell out of their cranberry-walnut loaves by 9am.",
      "Beyond the food, there's community. I've made friends with other regular shoppers, exchanged recipe ideas, and learned about new vendors through word-of-mouth."
    ],
    tips: [
      "Arrive early for the best selection and fewer crowds",
      "Bring plenty of reusable bags and small bills",
      "Build relationships with vendors for insider tips",
      "Try one new item each visit to expand your palate",
      "Don't be afraid to ask for samples or cooking advice"
    ]
  },

  "wine-tasting-experience": {
    title: "Wine Tasting at Sunset Vineyard",
    description: "An afternoon of wine tasting in the rolling hills. The sommelier's passion and knowledge made each sip a journey of discovery through local terroir.",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Wine Country",
    date: "September 12, 2025",
    slug: "wine-tasting-experience",
    specialty: "$$$",
    content: [
      "Nestled in the rolling hills just an hour from the city, Sunset Vineyard offers an intimate wine tasting experience that goes beyond just sampling wines.",
      "Our sommelier, Maria, had an infectious passion for the vineyard's story. Each pour came with tales of the soil, the weather, and the careful decisions that shaped each vintage.",
      "The afternoon tasting included five wines, each paired with small bites that enhanced the flavors. The 2019 Pinot Noir was the standout - complex, earthy, with notes of cherry and spice.",
      "What made this special wasn't just the wine, but the setting. We sat on a terrace overlooking the vines, watching the light change as afternoon turned to early evening.",
      "This is wine tasting done right - educational, relaxed, and focused on appreciation rather than consumption. A perfect way to spend a lazy weekend afternoon."
    ],
    tips: [
      "Book reservations well in advance, especially for weekends",
      "Designate a driver or arrange transportation ahead of time",
      "Eat a good meal beforehand to help absorb the alcohol",
      "Don't feel obligated to finish every pour - quality over quantity",
      "Ask about wine club memberships for discounts on purchases"
    ]
  },

  "street-food-adventure": {
    title: "Street Food Adventure Downtown",
    description: "Exploring the city's vibrant street food scene. From tacos to banh mi, every bite told a story of culture and tradition brought to life on busy street corners.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "City Streets",
    date: "September 5, 2025",
    slug: "street-food-adventure",
    specialty: "$",
    content: [
      "The best way to understand a city's food culture is through its street food. Last weekend, I spent an entire afternoon exploring downtown's diverse food truck and cart scene.",
      "My first stop was Miguel's taco truck, where he's been serving authentic Mexican street tacos for over a decade. The carnitas were perfectly seasoned and impossibly tender.",
      "Next, I discovered a Vietnamese banh mi cart run by a grandmother who barely spoke English but whose sandwiches spoke volumes about authentic flavors and technique.",
      "The highlight was stumbling upon a Korean-Mexican fusion truck that was doing incredible things with kimchi and Korean barbecue in taco form.",
      "Street food represents the democratic nature of great cooking - no fancy dining room needed, just skilled hands, quality ingredients, and passion for sharing culture through food."
    ],
    tips: [
      "Follow the crowds - locals know where the good food is",
      "Bring cash, as many vendors don't accept cards",
      "Come hungry but pace yourself across multiple vendors",
      "Check health department ratings if available",
      "Be adventurous but trust your instincts about food safety"
    ]
  },

  "cooking-class-experience": {
    title: "Hands-On Cooking Class Experience",
    description: "Learning traditional pasta making from a chef who learned in Italy. Three hours of flour-covered hands and incredible techniques that transformed my home cooking.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Culinary Institute",
    date: "August 28, 2025",
    slug: "cooking-class-experience",
    specialty: "$$",
    content: [
      "I've always been intimidated by making pasta from scratch. After a three-hour class with Chef Antonio, who trained in Bologna, I feel like I have a new superpower.",
      "We started with the basics of egg pasta dough - just flour, eggs, and a pinch of salt. But the technique in mixing, kneading, and rolling makes all the difference.",
      "Learning to use the pasta machine properly was revelatory. The dough transforms from rough and shaggy to silky smooth through patient, methodical rolling and folding.",
      "We made three shapes: fettuccine, ravioli, and tortellini. Each requires different techniques and a different relationship between dough thickness and final texture.",
      "The best part was sitting down together to eat what we'd made, paired with simple sauces that let the pasta shine. Sometimes the most rewarding meals are the ones you create with your own hands."
    ],
    tips: [
      "Wear comfortable, closed-toe shoes and bring an apron",
      "Don't eat a heavy meal beforehand - you'll be tasting throughout",
      "Ask lots of questions and take notes on techniques",
      "Many classes provide recipes - bring them home and practice",
      "Consider taking multiple classes to build on your skills"
    ]
  }
};

export default function OutOfKitchenDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (!slug || !mockPosts[slug]) {
    return <NotFoundPage />;
  }

  const post = mockPosts[slug];

  return (
    <main>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs 
          items={[
            { label: 'Out of Kitchen', href: '/out-of-kitchen' },
            { label: post.title }
          ]}
        />
      </div>

      <BlogPostTemplate
        image={post.image}
        title={post.title}
        author="Amanda Lynn"
        publishedDate={post.date}
        metaDetails={
          <div className="mb-4 text-muted-foreground">
            <p className="text-sm mb-1">{post.location}</p>
            <div className="flex items-center gap-1">
              <span className="text-sm">Price: </span>
              <div className="flex items-center">
                <span className="text-green">$</span>
                <span className="text-green">$</span>
                <span className="text-green">$</span>
              </div>
            </div>
          </div>
        }
        description={post.description}
        content={post.content}
        tipSection={post.tips ? {
          title: "Key Takeaways",
          tips: post.tips
        } : undefined}
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
