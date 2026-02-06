'use client';

export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShareBar } from '@/components/ShareBar';
import { Tag } from 'lucide-react';
import NotFoundPage from '@/app/not-found';

interface RestaurantPost {
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

const mockRestaurantPosts: Record<string, RestaurantPost> = {
  "the-garden-bistro": {
    title: "A Cozy Evening at The Garden Bistro",
    description: "Discovered this hidden gem tucked away in the heart of downtown. The seasonal menu and intimate atmosphere made for an unforgettable dining experience.",
    image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Downtown Seattle",
    date: "October 15, 2025",
    slug: "the-garden-bistro",
    specialty: "Farm-to-table cuisine",
    content: [
      "Walking into The Garden Bistro felt like stepping into a dream. The exposed brick walls, soft candlelight, and carefully curated local artwork created an ambiance that was both sophisticated and intimate.",
      "The chef's seasonal menu is a testament to their commitment to local sourcing. Every ingredient tells a story, from heirloom tomatoes sourced from nearby farms to pasture-raised chicken from the valley.",
      "I started with their signature beet and goat cheese salad, which was as beautiful as it was delicious. The earthy sweetness of the roasted beets paired perfectly with the creamy, tangy goat cheese and candied walnuts.",
      "For the main course, I chose the pan-seared branzino with seasonal vegetables and a lemon beurre blanc sauce. The fish was cooked to perfection – crispy skin giving way to tender, flaky flesh that practically melted in my mouth.",
      "Dessert was their chocolate flourless cake with raspberry coulis and vanilla gelato. Rich, decadent, and the perfect ending to a memorable meal.",
      "The service was impeccable without being intrusive. Our server knew the menu inside and out and made excellent wine pairings. This is the kind of place where you want to linger over dinner and savor every moment."
    ],
    tips: [
      "Make reservations at least 2 weeks in advance",
      "Request a window table for the best ambiance",
      "The menu changes monthly—check their Instagram for current offerings",
      "Arrive slightly early to enjoy a drink at their small bar",
      "Don't skip dessert—the chocolate mousse is legendary"
    ]
  },

  "mamas-kitchen": {
    title: "Home Cooking at Mama's Kitchen",
    description: "This family-owned restaurant serves comfort food that reminds you of Sunday dinners at your grandmother's house.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Fremont",
    date: "October 10, 2025",
    slug: "mamas-kitchen",
    specialty: "Comfort food classics",
    content: [
      "Mama's Kitchen doesn't try to be trendy or Instagram-worthy. Instead, it focuses on what truly matters: honest, delicious food that makes you feel at home.",
      "Their fried chicken is legendary among locals. Each piece is brined for 24 hours, then coated in a secret spice blend that's been in the family for generations.",
      "The meatloaf comes with real mashed potatoes and gravy that tastes like it was made by someone's grandmother. Because it was – Mama herself still comes in every morning to prep.",
      "This is the kind of place where servers remember your order and ask about your family. Where the portions are generous and the prices are fair.",
      "If you're looking for molecular gastronomy, go elsewhere. If you want a meal that feeds your soul as much as your stomach, this is your place."
    ],
  },

  "seafood-shack": {
    title: "Fresh Catch at The Seafood Shack",
    description: "No-frills seafood restaurant where the fish is so fresh it was swimming this morning. A local favorite for over 30 years.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Ballard",
    date: "October 2, 2025",
    slug: "seafood-shack",
    specialty: "Fresh Pacific seafood",
    content: [
      "The Seafood Shack has been a Ballard institution since before the neighborhood became trendy. The decor hasn't changed much – plastic tablecloths, nautical memorabilia, and the smell of the sea.",
      "What has remained consistent is their commitment to serving the freshest seafood in the city. The fish comes directly from boats that dock just a few blocks away.",
      "Their fish and chips use true cod, not the pollock substitutes you find elsewhere. The batter is light and crispy, letting the sweet fish flavor shine through.",
      "The clam chowder is thick with chunks of clams and potatoes, served with oyster crackers and a view of the working marina outside.",
      "This isn't fine dining – it's honest food served by people who've been doing this for decades. And sometimes, that's exactly what you need."
    ],
  },

  "thai-garden": {
    title: "Authentic Flavors at Thai Garden",
    description: "Family recipes brought directly from Bangkok create some of the most authentic Thai food in the Pacific Northwest.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "International District",
    date: "September 25, 2025",
    slug: "thai-garden",
    specialty: "Traditional Thai cuisine",
    content: [
      "Thai Garden doesn't compromise on authenticity. When they say spicy, they mean it. When they list ingredients you can't pronounce, they're probably importing them directly from Thailand.",
      "The som tam (papaya salad) is a perfect balance of sweet, sour, salty, and spicy. Made to order with a mortar and pestle, each serving is customized to your heat tolerance.",
      "Their pad thai uses tamarind paste instead of ketchup, creating the complex sweet-sour flavor that makes this dish special in its homeland.",
      "The owners, who moved here from Bangkok in the 1990s, still cook most of the curries themselves, using recipes passed down through generations.",
      "This is the kind of place where Thai families come to eat, where the menu includes dishes you won't find at Americanized Thai restaurants, and where every bite transports you to the streets of Bangkok."
    ],
  },

  "pizza-corner": {
    title: "New York Style at Pizza Corner",
    description: "Thin crust pizza that rivals anything you'd find on the East Coast, made by a chef who learned his craft in Brooklyn.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Capitol Hill",
    date: "September 18, 2025",
    slug: "pizza-corner",
    specialty: "New York style pizza",
    content: [
      "Pizza Corner proves that you can find authentic New York pizza 3,000 miles from the Big Apple. Chef Tony moved here from Brooklyn and brought his grandfather's recipes with him.",
      "The dough is made fresh daily and aged for 72 hours, creating the perfect balance of chew and crisp that defines great New York pizza.",
      "Each slice is large enough to fold (as it should be) and the crust has those characteristic char spots that come from a properly heated coal oven.",
      "The sauce is simple – San Marzano tomatoes, garlic, oregano, and salt. No sugar, no herbs that don't belong, just pure tomato flavor.",
      "Late at night, when you need a slice that reminds you why pizza is perfect food, this is where the locals go. No fancy toppings necessary – just cheese, sauce, and dough done right."
    ],
  },

  "corner-cafe": {
    title: "Sunday Brunch at Corner Café",
    description: "Their signature pancakes and perfectly brewed coffee made this Sunday brunch absolutely delightful.",
    image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Capitol Hill",
    date: "September 29, 2025",
    slug: "corner-cafe",
    specialty: "Best brunch in town",
    content: [
      "There is something magical about a Sunday brunch when it is done right. Corner Café has mastered this art, creating a space where time slows down and every bite feels like a celebration.",
      "Their fluffy buttermilk pancakes are the real deal – light as air with just the right amount of tang. Served with real maple syrup and a pat of butter that melts into golden pools, they're worth the 30-minute wait.",
      "The coffee deserves its own paragraph. Roasted locally and brewed to perfection, each cup is a masterclass in balance. Bold enough to wake you up, smooth enough to savor slowly while reading the Sunday paper.",
      "Beyond the food, the vibe is what keeps people coming back. The mismatched vintage chairs, the walls lined with local art, the gentle hum of conversation – it all comes together to create something special.",
      "The service team moves with genuine care for their craft. They remember your order, check on your coffee without hovering, and somehow manage to keep the energy warm and relaxed even during the busiest Sunday rush."
    ],
  },

  "le-petit-chef": {
    title: "Tasting Menu Experience at Le Petit Chef",
    description: "An incredible seven-course tasting menu that showcased seasonal ingredients in the most creative ways.",
    image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Pioneer Square",
    date: "September 20, 2025",
    slug: "le-petit-chef",
    specialty: "Fine dining experience",
    content: [
      "Stepping into Le Petit Chef feels like entering a culinary theater where every detail has been carefully orchestrated. The intimate 20-seat restaurant offers only one seating per night, ensuring every guest receives the chef's undivided attention.",
      "Each course unfolds like a chapter in an edible story. The amuse-bouche – a single spoonful of butternut squash soup with brown butter foam – sets the stage for what's to come: precision, creativity, and an unwavering commitment to flavor.",
      "The standout course was the duck breast, served with a cherry gastrique and microgreens grown in the restaurant's own garden. Every dish is intentional and precisely executed, from the temperature to the final garnish placed with tweezers.",
      "What impressed me most wasn't just the technical skill (though that was evident in every bite), but the way each dish told a story about the Pacific Northwest. Local ingredients were elevated through classical French techniques.",
      "Dessert closes the experience with confidence – a deconstructed apple tart that plays with texture and temperature in ways that surprise and delight. This is not just a meal, but a dialogue between chef and diner that lingers long after the last bite."
    ],
  }
};

export default function RestaurantsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Next.js equivalent of useEffect for scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug || !mockRestaurantPosts[slug]) {
    return <NotFoundPage />;
  }

  const post = mockRestaurantPosts[slug];

  // Build breadcrumb items - matching old React logic
  const breadcrumbItems = [
    { label: "Out of Kitchen", href: "/out-of-kitchen" },
    { label: "Restaurants", href: "/out-of-kitchen/restaurants" },
    { label: post.title }
  ];

  return (
    <main>
      {/* Breadcrumbs - Exact layout from old React */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1.5 mb-8">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Hero Section - Clean layout matching old React */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Left: Blog Post Image */}
          <div className="w-[250px] md:w-[339px] h-[214px] md:h-[250px] flex-shrink-0 mx-auto md:mx-0 overflow-visible">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover border-8 sm:border-[16px] border-white -rotate-[6deg] border border-gray-200"
              style={{
                boxShadow: 'var(--shadow-hero)'
              }}
            />
          </div>

          {/* Right: Title and Meta */}
          <div className="flex-1 pt-4 sm:pt-0">
            <h1 className="mb-3 sm:mb-4 font-bold">{post.title}</h1>
            
            {/* Meta Details - Location and Price Rating */}
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

            <div className="text-muted-foreground text-sm sm:text-base mb-4">
              <p className="mb-1">By Amanda Lynn</p>
              <p>Published {post.date}</p>
            </div>

            {/* Share Bar - Below Meta */}
            <div>
              <ShareBar 
                title={post.title}
                description={post.description}
                imageUrl={post.image}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Article Content - Exact layout from old React */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-muted-foreground">{post.description}</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.map((paragraph, index) => (
            <div key={index}>
              {/* Ad placement after first paragraph - exact from old React */}
              {index === 1 && (
                <div className="my-6 sm:my-8">
                  <div className="w-full aspect-square max-w-[175px] mx-auto bg-muted border-2 border-border flex items-center justify-center">
                    <div className="text-center px-4">
                      <p className="text-muted-foreground text-xs sm:text-sm">Advertisement</p>
                      <p className="text-muted-foreground text-[10px] sm:text-xs mt-2">175x175 Ad Space</p>
                    </div>
                  </div>
                </div>
              )}
              <p className="mb-6 text-foreground leading-relaxed">
                {paragraph}
              </p>
            </div>
          ))}
        </div>

        {/* Tips Section - Exact styling from old React */}
        {post.tips && post.tips.length > 0 && (
          <div className="mt-12 p-8 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="text-green" size={20} />
              <h3 className="m-0">Key Takeaways</h3>
            </div>
            <ul className="space-y-3">
              {post.tips.map((tip, index) => (
                <li key={index} className="text-muted-foreground flex items-start gap-3">
                  <span className="text-green mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </main>
  );
}
