'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShoppingBasket } from '@/components/ShoppingBasket';

// Mock data - replace with WordPress API call
const getRestaurantBySlug = (slug: string) => {
  const restaurants = [
    {
      name: "Corner Café",
      city: "Seattle",
      state: "WA",
      cuisine: "Brunch & Café",
      description: "The perfect Sunday brunch spot with legendary pancakes.",
      slug: "corner-cafe",
      date: "September 29, 2025",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwYnJ1bmNofGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.5,
      priceRange: "$",
      address: "1234 Pine Street, Seattle, WA 98101",
      phone: "(206) 555-0123",
      website: "https://cornercafeseattle.com",
      hours: "Mon-Sun: 7:00 AM - 3:00 PM",
      content: `
        <p>Nestled in the heart of Seattle's bustling downtown, Corner Café has become my go-to spot for weekend brunch. From the moment you walk in, the warm atmosphere and the aroma of freshly brewed coffee welcome you like an old friend.</p>
        
        <h3>The Standout Dishes</h3>
        <p>Their legendary buttermilk pancakes are truly something special. Fluffy, golden, and served with real maple syrup and a pat of butter that melts into perfect pools. I also highly recommend their eggs Benedict - the hollandaise is rich and perfectly tangy.</p>
        
        <h3>Atmosphere & Service</h3>
        <p>The service here is consistently excellent. Our server, Maria, was attentive without being intrusive, and she knew the menu inside and out. The café has that perfect neighborhood feel - cozy enough for a quiet morning read, but lively enough for catching up with friends.</p>
        
        <h3>Value & Overall Experience</h3>
        <p>For the quality and portion sizes, Corner Café offers excellent value. Most entrees are under $15, and you definitely won't leave hungry. It's the kind of place that makes you feel good about supporting local business.</p>
        
        <p>Whether you're a local looking for your new weekend tradition or a visitor wanting to experience authentic Seattle café culture, Corner Café delivers on all fronts. I'll definitely be back to try their dinner menu!</p>
      `,
      tags: ["Brunch", "Coffee", "Local", "Casual Dining"],
      pros: [
        "Amazing pancakes and coffee",
        "Friendly, knowledgeable staff", 
        "Great value for money",
        "Cozy neighborhood atmosphere"
      ],
      cons: [
        "Can get busy on weekends",
        "Limited parking nearby"
      ]
    },
    {
      name: "Le Petit Chef",
      city: "San Francisco", 
      state: "CA",
      cuisine: "Fine Dining",
      description: "A 7-course journey through seasonal ingredients and creativity.",
      slug: "le-petit-chef",
      date: "September 20, 2025",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZm9vZCUyMHBsYXRpbmd8ZW58MXx8fHwxNzYxNDE5NTk1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      priceRange: "$$$",
      address: "567 Market Street, San Francisco, CA 94102",
      phone: "(415) 555-0789", 
      website: "https://lepetitchefsf.com",
      hours: "Tue-Sat: 5:30 PM - 10:00 PM",
      content: `
        <p>Le Petit Chef represents everything I love about fine dining - creativity, technique, and an unwavering commitment to quality ingredients. This intimate 32-seat restaurant in San Francisco's Financial District offers a dining experience that transcends the typical restaurant meal.</p>
        
        <h3>The Tasting Menu Experience</h3>
        <p>Chef Laurent's 7-course tasting menu is a masterclass in seasonal cooking. Each dish tells a story, from the delicate amuse-bouche featuring local uni to the stunning duck breast with cherry gastrique. The wine pairings, curated by sommelier Elena, complement each course perfectly.</p>
        
        <h3>Standout Moments</h3>
        <p>The highlight of the evening was undoubtedly the signature "Garden" course - a vegetable-forward dish that managed to be both visually stunning and deeply satisfying. The attention to detail in both flavor and presentation was remarkable.</p>
        
        <h3>Service & Ambiance</h3>
        <p>The service here is choreographed perfection. Every team member knows their role, and the timing between courses allows for perfect pacing. The intimate dining room, with its warm lighting and carefully curated music, creates an atmosphere of relaxed elegance.</p>
        
        <p>Le Petit Chef is undoubtedly a special occasion restaurant, but for those seeking a memorable culinary journey, it delivers an experience worth every penny. Reservations are essential, and I recommend booking at least a month in advance.</p>
      `,
      tags: ["Fine Dining", "Tasting Menu", "Wine Pairing", "Special Occasion"],
      pros: [
        "Exceptional culinary creativity",
        "Flawless service and timing",
        "Beautiful presentation", 
        "Intimate, elegant atmosphere"
      ],
      cons: [
        "Very expensive ($200+ per person)",
        "Difficult to get reservations",
        "May be too formal for some"
      ]
    },
    {
      name: "The Garden Bistro",
      city: "Portland",
      state: "OR", 
      cuisine: "Farm-to-table",
      description: "A hidden gem with seasonal menu and intimate atmosphere.",
      slug: "the-garden-bistro",
      date: "October 15, 2025",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc2MTQwOTc1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      priceRange: "$$",
      address: "891 NW 23rd Avenue, Portland, OR 97210",
      phone: "(503) 555-0456",
      website: "https://gardenbistropdx.com",
      hours: "Wed-Sun: 5:00 PM - 9:30 PM",
      content: `
        <p>Tucked away on a quiet side street in Portland's trendy Nob Hill neighborhood, The Garden Bistro embodies everything I love about the Pacific Northwest dining scene. This 40-seat restaurant champions local ingredients and changes its menu with the seasons.</p>
        
        <h3>Farm-to-Table Excellence</h3>
        <p>Chef Sarah's commitment to local sourcing is evident in every dish. The autumn menu features ingredients from farms within 50 miles of the restaurant. The roasted beet salad with goat cheese from Jacobs Creamery was a perfect example of how simple, quality ingredients can create magic on the plate.</p>
        
        <h3>Seasonal Highlights</h3>
        <p>The pan-seared salmon with mushroom risotto showcased Pacific Northwest flavors beautifully. The fish was cooked to perfection, and the accompanying wild mushrooms added an earthy depth that spoke to the season. Don't skip dessert - the pear tart with hazelnut ice cream is worth the splurge.</p>
        
        <h3>Atmosphere & Philosophy</h3>
        <p>The restaurant feels like dining in a friend's beautiful home. The exposed brick walls are adorned with art from local artists, and the open kitchen allows you to watch the passionate team at work. There's a genuine commitment to sustainability here that goes beyond the ingredients to encompass every aspect of the operation.</p>
        
        <p>The Garden Bistro represents the best of Portland's food scene - creative, sustainable, and deeply connected to the local community. It's a place that makes you proud to support local business while delivering a truly memorable meal.</p>
      `,
      tags: ["Farm-to-table", "Seasonal Menu", "Local Ingredients", "Sustainable"],
      pros: [
        "Outstanding local ingredient sourcing",
        "Cozy, welcoming atmosphere",
        "Knowledgeable staff about ingredients",
        "Commitment to sustainability"
      ],
      cons: [
        "Limited menu options",
        "Can be noisy when full",
        "No reservations for parties under 6"
      ]
    }
  ];

  return restaurants.find(r => r.slug === slug);
};

// Rating stars component
function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <ShoppingBasket
          key={star}
          size={20}
          className={`${
            star <= rating ? 'text-green' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating}/5
      </span>
    </div>
  );
}

// Price range component
function PriceRange({ price }: { price: string }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-green font-bold">{price}</span>
      <span className="text-xs text-muted-foreground ml-1">
        {price === "$" ? "Budget-friendly" : 
         price === "$$" ? "Moderate" : 
         price === "$$$" ? "Upscale" : "Fine dining"}
      </span>
    </div>
  );
}

export default function RestaurantReviewPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const restaurant = getRestaurantBySlug(slug);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Restaurant Not Found</h1>
          <Link href="/ook/restaurants" className="text-green hover:text-green/70">
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
          { label: "Out of Kitchen", href: "/ook" },
          { label: "Restaurants", href: "/ook/restaurants" },
          { label: restaurant.name }
        ]} />
      </div>

      {/* Hero Image */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
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

      {/* Restaurant Info */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green mb-4">
            {restaurant.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <RatingStars rating={restaurant.rating} />
            <PriceRange price={restaurant.priceRange} />
            <span className="text-muted-foreground">{restaurant.cuisine}</span>
            <span className="text-muted-foreground">
              {restaurant.city}, {restaurant.state}
            </span>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            {restaurant.description}
          </p>

          {/* Restaurant Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 p-6 bg-background rounded-lg border border-gray-200">
            <div>
              <h4 className="font-semibold text-green mb-2">Address</h4>
              <p className="text-sm text-muted-foreground">{restaurant.address}</p>
            </div>
            <div>
              <h4 className="font-semibold text-green mb-2">Phone</h4>
              <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
            </div>
            <div>
              <h4 className="font-semibold text-green mb-2">Hours</h4>
              <p className="text-sm text-muted-foreground">{restaurant.hours}</p>
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <h4 className="font-semibold text-green mb-2">Website</h4>
              <Link 
                href={restaurant.website} 
                target="_blank"
                className="text-sm text-green hover:text-green/70 transition-colors"
              >
                {restaurant.website}
              </Link>
            </div>
          </div>
        </div>

        {/* Review Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div 
            className="prose-headings:text-green prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: restaurant.content }}
          />
        </article>

        {/* Pros & Cons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green/5 p-6 rounded-lg border border-green/20">
            <h3 className="font-bold text-green mb-4 flex items-center gap-2">
              <span>✓</span> What I Loved
            </h3>
            <ul className="space-y-2">
              {restaurant.pros.map((pro, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-green mt-1">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h3 className="font-bold text-orange-700 mb-4 flex items-center gap-2">
              <span>⚠</span> Keep in Mind
            </h3>
            <ul className="space-y-2">
              {restaurant.cons.map((con, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-orange-600 mt-1">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-12">
          <h3 className="font-bold text-green mb-4">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {restaurant.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-green/10 text-green text-sm rounded-full border border-green/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-200 pt-8 pb-12">
          <Link 
            href="/ook/restaurants"
            className="inline-flex items-center gap-2 text-green font-semibold hover:text-green/70 transition-colors"
          >
            ← Back to Restaurant Reviews
          </Link>
        </div>
      </section>
    </main>
  );
}
