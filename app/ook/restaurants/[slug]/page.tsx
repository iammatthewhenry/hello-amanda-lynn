'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// Mock data - clean content matching Figma design
const getRestaurantBySlug = (slug: string) => {
  const restaurants = [
    {
      name: "The Garden Bistro",
      city: "Portland",
      state: "OR", 
      priceRange: "$$$",
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
      slug: "corner-cafe",
      author: "Amanda Lynn",
      publishDate: "September 29, 2025",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "The perfect Sunday brunch spot with legendary pancakes.",
      content: [
        "Sunday brunch is sacred in my household, and Corner Café has become our ritual destination. Located in a converted Victorian house with a wraparound porch, this neighborhood café has mastered the art of the leisurely weekend brunch.",
        
        "The space itself is charming without trying too hard. Mismatched vintage chairs, fresh flowers on every table, and windows that flood the space with natural light. There's both indoor seating and the coveted porch tables where you can watch the neighborhood come to life on Sunday morning.",
        
        "Let's talk about those pancakes. Their buttermilk pancakes have achieved legendary status in our town, and for good reason. They're impossibly fluffy—almost soufflé-like—with crispy, buttery edges. The secret, I've learned after chatting up the chef, is separating the eggs and folding in whipped egg whites just before cooking. It makes all the difference.",
        
        "The pancakes come with real maple syrup (none of that corn syrup nonsense) and your choice of additions. I'm partial to the fresh blueberry version, where they fold plump berries into the batter. My partner always gets the chocolate chip, which arrives with extra chocolate chips melted on top. They're not stingy with portions—two pancakes easily feed one person.",
        
        "But Corner Café is more than just pancakes. Their eggs Benedict is textbook perfect: Canadian bacon, poached eggs with jammy yolks, hollandaise that's lemony and rich without being heavy, all on a toasted English muffin. The breakfast burrito—stuffed with scrambled eggs, black beans, cheese, avocado, and salsa—is the size of a football and incredibly satisfying.",
        
        "The coffee deserves its own paragraph. They roast their own beans and take their coffee seriously. The drip coffee is consistently excellent—hot, fresh, and refilled promptly. Their cappuccinos are properly made with microfoam and lovely latte art. They even do pour-overs if you're in the mood for something special.",
        
        "Service is warm and efficient without being rushed. The staff seems genuinely happy to be there, which creates a welcoming atmosphere. They know regulars by name but make everyone feel like a regular. During busy times, there might be a wait, but they're upfront about it and have coffee available while you wait.",
        
        "The vibe is relaxed and unhurried—exactly what Sunday brunch should be. People linger over multiple cups of coffee, catching up with friends, reading the paper. There's no pressure to vacate your table. This unhurried approach to hospitality is increasingly rare and deeply appreciated."
      ],
      keyTakeaways: [
        "Arrive before 9am or after 11am to avoid peak wait times",
        "The porch tables are first-come-first-served",
        "Ask about their daily pancake specials", 
        "Try the house-made jam—it's available for purchase",
        "Come with time to linger—rushing defeats the purpose"
      ]
    },
    {
      name: "Le Petit Chef",
      city: "San Francisco",
      state: "CA",
      priceRange: "$$$$", 
      slug: "le-petit-chef",
      author: "Amanda Lynn",
      publishDate: "September 20, 2025",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A 7-course journey through seasonal ingredients and creativity.",
      content: [
        "Tasting menus intimidate some people. The commitment, the cost, the unknown. But when done right, they're transcendent—an opportunity to completely surrender to a chef's vision and experience flavors and combinations you'd never order yourself. Le Petit Chef's autumn tasting menu was exactly that kind of experience.",
        
        "The evening began with an amuse-bouche that set the tone: a single, perfect scallop on a spoon, topped with citrus foam and edible flowers. One bite—sweet, acidic, oceanic—and I knew we were in for something special. This wasn't just dinner; it was a story told through food.",
        
        "Course one was a play on autumn in New England: butternut squash soup with sage oil, toasted pumpkin seeds, and a quenelle of mascarpone. The soup was silky smooth with concentrated squash flavor, the sage oil added aromatic depth, and the mascarpone provided richness. Simple ingredients, flawless execution.",
        
        "Course two showcased local mushrooms three ways: a mushroom tart with herb crust, pickled wild mushrooms, and a mushroom duxelles. Each preparation highlighted different aspects of mushrooms—earthiness, texture, umami. The wine pairing, a light Oregon pinot noir, complemented perfectly.",
        
        "The third course was the most visually striking: beet-cured salmon with dill cream, pickled mustard seeds, and microgreens. The salmon was jewel-toned from the beet cure, the acidity from pickles cut through the richness, and the presentation looked like abstract art on the plate.",
        
        "Course four, the palate cleanser, was a revelation: grapefruit granita with Campari and fresh mint. Icy, bitter, sweet, refreshing—it reset our palates beautifully and provided a moment of lightness before the heavier courses to come.",
        
        "The main event—course five—was slow-braised short rib with celery root puree, roasted root vegetables, and red wine reduction. The meat was fork-tender, falling apart at the touch. The puree was impossibly smooth and velvety. The reduction was concentrated and glossy. This was comfort food elevated to fine art.",
        
        "Course six featured local artisanal cheeses with housemade crackers, honeycomb, and fruit compote. I appreciated that they offered three small portions rather than an overwhelming board—just enough to transition from savory to sweet. The honeycomb's addition was inspired, adding textural interest and natural sweetness.",
        
        "Dessert—course seven—was a deconstructed apple pie: apple sorbet, cinnamon streusel, vanilla crème anglaise, and caramelized apple chips. All the flavors of classic apple pie but light and sophisticated. After a rich meal, this dessert felt refreshing rather than heavy.",
        
        "The entire experience lasted three hours, but time seemed suspended. Between courses, we talked, savored, anticipated the next creation. The service was impeccable—attentive without hovering, knowledgeable without being pretentious. Each dish arrived with a brief description that enhanced rather than overshadowed the food."
      ],
      keyTakeaways: [
        "Reserve well in advance—these seats fill up fast",
        "Opt for the wine pairing to enhance each course",
        "Pace yourself—it's a marathon, not a sprint",
        "Ask questions—the staff loves talking about the food", 
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
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1.5 mb-8">
        <Breadcrumbs items={[
          { label: "Out of Kitchen", href: "/out-of-kitchen" },
          { label: "Restaurant Reviews", href: "/out-of-kitchen/restaurants" },
          { label: restaurant.name }
        ]} />
      </div>

      {/* Hero Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 896px, 896px"
            className="object-cover border-[16px] border-white"
            style={{ boxShadow: 'var(--shadow-hero)' }}
            priority
          />
        </div>
      </section>

      {/* Restaurant Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green mb-4">
          {restaurant.name}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <span className="text-lg text-muted-foreground">
            {restaurant.city}, {restaurant.state}
          </span>
          <div className="flex items-center gap-1">
            <span className="text-lg font-medium">{restaurant.priceRange}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
          <span>By {restaurant.author}</span>
          <span>Published {restaurant.publishDate}</span>
        </div>

        {/* Social Sharing Buttons */}
        <div className="flex gap-3 mb-8">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="text-gray-600">f</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="text-gray-600">@</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="text-gray-600">in</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="text-gray-600">✉</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="text-gray-600">📱</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="text-gray-600">🔗</span>
          </button>
        </div>
      </section>

      {/* Description */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-lg text-muted-foreground italic">
          {restaurant.description}
        </p>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="prose prose-lg max-w-none">
          {restaurant.content.map((paragraph, index) => (
            <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
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

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200 pt-8 pb-12">
        <Link 
          href="/out-of-kitchen/restaurants"
          className="inline-flex items-center gap-2 text-green font-semibold hover:text-green/70 transition-colors"
        >
          ← Back to Restaurant Reviews
        </Link>
      </div>
    </main>
  );
}
