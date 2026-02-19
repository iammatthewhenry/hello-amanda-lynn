'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader } from '@/components';

// ===================================================================
// TYPES
// ===================================================================
interface Restaurant {
  name: string;
  city: string;
  state: string;
  priceRange: string;
  marketType: string;
  specialty: string;
  openDays: string;
  slug: string;
  author: string;
  publishDate: string;
  image: string;
  description: string;
  content: string[];
  keyTakeaways: string[];
}

// Mock data - clean content matching Figma design
const getRestaurantBySlug = (slug: string): Restaurant | undefined => {
  const restaurants: Restaurant[] = [
    {
      name: "The Garden Bistro",
      city: "Portland",
      state: "OR", 
      priceRange: "$$$",
      marketType: "fine-dining",
      specialty: "Farm-to-table cuisine with seasonal ingredients",
      openDays: "Tuesday–Saturday, 5pm–10pm",
      slug: "the-garden-bistro",
      author: "Amanda Lynn",
      publishDate: "October 15, 2025",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A hidden gem with seasonal menu and intimate atmosphere.",
      content: [
        "Tucked away on a quiet side street downtown, The Garden Bistro is the kind of place you'd walk right past if you weren't looking for it. And that's exactly how they like it. This intimate 20-seat restaurant has become my go-to spot for special occasions and whenever I need to remember why I love food so much.",
        
        "The moment you step inside, you're transported. Exposed brick walls are adorned with trailing pothos plants and warm Edison bulbs. Reclaimed wood tables are set simply with fresh flowers and linen napkins. It feels like dining in someone's impossibly chic living room.",
        
        "The menu changes monthly based on what's available from local farms, but the philosophy remains constant: simple preparations that let quality ingredients shine. During my recent visit, I started with their heirloom tomato salad. The tomatoes—clearly picked at peak ripeness—were simply dressed with olive oil, flaky salt, and torn basil. Sometimes simplicity is sophistication.",
        
        "For my main, I chose the pan-roasted chicken breast with seasonal vegetables. The skin was impossibly crispy, almost shattering when I cut into it, while the meat remained juicy and tender. The vegetables—roasted carrots, turnips, and fennel—were caramelized to bring out their natural sweetness. The jus was rich without being heavy, tying everything together perfectly.",
        
        "My dining companion ordered the house-made pasta with brown butter and sage. The pasta was clearly made in-house—you could taste the difference in texture and flavor. The sauce was a masterclass in restraint: just enough brown butter to coat the noodles, crispy sage leaves for aroma, and a shower of parmesan. Sometimes the simplest dishes are the hardest to execute, and this was flawless.",
        
        "Dessert was their signature chocolate mousse, served in a small glass jar with a dollop of fresh whipped cream. Light and airy with intense chocolate flavor, it was the perfect ending to the meal. Not too heavy, not too sweet—just right.",
        
        "What makes The Garden Bistro special isn't just the food—it's the care evident in every detail. The staff knows regulars by name but makes newcomers feel equally welcome. The wine list is small but thoughtfully curated. The pace of service allows you to actually enjoy your company and conversation. In our rushed world, this unhurried approach to dining feels revolutionary.",
        
        "If you go (and you should), make a reservation well in advance. This little gem has been 'discovered' despite its hidden location. Try to snag a table by the window for the best ambiance. And whatever you do, don't skip dessert. Tuesday through Saturday, 5-10pm. You can thank me later."
      ],
      keyTakeaways: [
        "Make reservations at least 2 weeks in advance",
        "Request a window table for the best ambiance", 
        "The menu changes monthly—check their Instagram for current offerings",
        "Arrive slightly early to enjoy a drink at their small bar",
        "Don't skip dessert—the chocolate mousse is legendary"
      ]
    },
    {
      name: "Corner Café",
      city: "Seattle", 
      state: "WA",
      priceRange: "$$",
      marketType: "casual-dining",
      specialty: "Weekend brunch and legendary pancakes",
      openDays: "Daily, 7am–3pm",
      slug: "corner-cafe",
      author: "Amanda Lynn",
      publishDate: "September 29, 2025",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "The perfect Sunday brunch spot with legendary pancakes.",
      content: [
        "Sunday brunch is sacred in my household, and Corner Café has become our ritual destination. Located in a converted Victorian house with a wraparound porch, this neighborhood café has mastered the art of the leisurely weekend brunch.",
        "The space itself is charming without trying too hard. Mismatched vintage chairs, fresh flowers on every table, and windows that flood the space with natural light. There's both indoor seating and the coveted porch tables where you can watch the neighborhood come to life on Sunday morning.",
        "Let's talk about those pancakes. Their buttermilk pancakes have achieved legendary status in our town, and for good reason. They're impossibly fluffy—almost soufflé-like—with crispy, buttery edges."
      ],
      keyTakeaways: [
        "Arrive before 9am or after 11am to avoid peak wait times",
        "The porch tables are first-come-first-served",
        "Ask about their daily pancake specials"
      ]
    },
    {
      name: "Le Petit Chef",
      city: "San Francisco",
      state: "CA",
      priceRange: "$$$$",
      marketType: "fine-dining",
      specialty: "Seven-course tasting menu with seasonal ingredients",
      openDays: "Tuesday–Saturday, 6pm–10pm",
      slug: "le-petit-chef",
      author: "Amanda Lynn",
      publishDate: "September 20, 2025",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A 7-course journey through seasonal ingredients and creativity.",
      content: [
        "Tasting menus intimidate some people. The commitment, the cost, the unknown. But when done right, they're transcendent—an opportunity to completely surrender to a chef's vision and experience flavors and combinations you'd never order yourself.",
        "The evening began with an amuse-bouche that set the tone: a single, perfect scallop on a spoon, topped with citrus foam and edible flowers. One bite—sweet, acidic, oceanic—and I knew we were in for something special."
      ],
      keyTakeaways: [
        "Reserve well in advance—these seats fill up fast",
        "Opt for the wine pairing to enhance each course",
        "Come with an open mind and empty stomach"
      ]
    }
  ];

  return restaurants.find(r => r.slug === slug);
};

export default function RestaurantReviewPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const restaurant = getRestaurantBySlug(slug);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant Not Found</h1>
          <Link href="/out-of-kitchen/restaurants" className="text-green hover:text-green/70">
            ← Back to Restaurant Reviews
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Header Section - Using OOK Header Component */}
      <SiteContainer>
        <OokHeader
          title={restaurant.name}
          image={restaurant.image}
          contentType="restaurant"
          location={{
            city: restaurant.city,
            state: restaurant.state
          }}
          rating={{
            type: 'price',
            value: restaurant.priceRange
          }}
          author={restaurant.author}
          publishDate={restaurant.publishDate}
          marketType={restaurant.marketType}
          specialty={restaurant.specialty}
          openDays={restaurant.openDays}
          shareProps={{
            title: restaurant.name,
            description: restaurant.description,
            imageUrl: restaurant.image
          }}
        />
      </SiteContainer>

      {/* Description */}
      <SiteContainer>
        <section className="mb-8">
          <p className="text-lg text-muted-foreground italic text-center">
            {restaurant.description}
          </p>
        </section>
      </SiteContainer>

      {/* Article Content */}
      <SiteContainer>
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            {restaurant.content.map((paragraph, index) => (
              <div key={index}>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
                {/* Advertisement after 3rd paragraph */}
                {index === 2 && (
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-12 text-center mb-8">
                    <p className="text-sm text-gray-500 mb-2">Advertisement</p>
                    <p className="text-xs text-gray-400">728x90 Banner Ad</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </SiteContainer>

      {/* Key Takeaways */}
      <SiteContainer>
        <section className="mb-12">
          <div className="bg-green/5 p-8 rounded-lg border border-green/20">
            <h3 className="text-xl font-bold text-green mb-6">Key Takeaways</h3>
            <ul className="space-y-3">
              {restaurant.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </SiteContainer>
    </main>
  );
}
