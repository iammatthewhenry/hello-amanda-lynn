'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader } from '@/components';

// ===================================================================
// TYPES
// ===================================================================
interface FoodDestination {
  name: string;
  city: string;
  state: string;
  type: 'winery' | 'brewery' | 'distillery' | 'food-tour' | 'culinary-experience';
  specialty: string;
  openDays?: string;
  slug: string;
  author: string;
  publishDate: string;
  image: string;
  description: string;
  content: string[];
  experienceTips: string[];
}

// ===================================================================
// MOCK DATA
// ===================================================================
const getFoodDestinationBySlug = (slug: string): FoodDestination | undefined => {
  const destinations: FoodDestination[] = [
    {
      name: "Wine Tasting at Sunset Vineyard",
      city: "Napa Valley",
      state: "California",
      type: "winery",
      specialty: "Award-winning Cabernet Sauvignon and artisan cheese pairings",
      openDays: "Daily, 11am–6pm",
      slug: "sunset-vineyard-tasting",
      author: "Amanda Lynn",
      publishDate: "September 2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A boutique family winery nestled in the rolling hills of Napa Valley, offering an intimate tasting experience with panoramic vineyard views and expertly crafted wines.",
      content: [
        "Driving up the winding gravel road to Sunset Vineyard, you immediately understand why this family-owned winery has captured the hearts of wine enthusiasts from around the world. The 30-acre property sits perched on a hillside with sweeping views of the Napa Valley floor, and the golden hour light that filters through the ancient oak trees creates an almost magical atmosphere.",
        "The tasting room occupies a converted 1920s farmhouse, complete with wide-plank floors and French doors that open onto a wraparound porch. Owner and winemaker Elena Rossi greets every visitor personally, sharing stories about her family's four-generation commitment to sustainable viticulture and traditional winemaking techniques passed down from their Italian heritage.",
        "The tasting flight showcases five wines, each paired with artisanal cheeses sourced from local Sonoma County creameries. Their flagship 2019 Cabernet Sauvignon is exceptional—rich and complex with notes of dark cherry, cedar, and a hint of vanilla from 18 months in French oak. The pairing with aged Manchego creates a harmony that elevates both the wine and cheese to new heights.",
        "What sets Sunset Vineyard apart isn't just the quality of their wines, but the education that comes with each pour. Elena explains the terroir, the specific microclimates of each vineyard block, and how weather patterns affect the growing season. By the end of the tasting, you'll have a deeper appreciation for the craft and artistry that goes into every bottle."
      ],
      experienceTips: [
        "Book the sunset tasting for the most spectacular views and golden light",
        "Ask Elena about the vineyard tour—she personally leads weekend walks through the property",
        "Their wine club offers exclusive access to limited-production bottles",
        "The artisan cheese pairings are sourced from within 50 miles of the vineyard"
      ]
    },
    {
      name: "Coastal Brewery Experience",
      city: "Half Moon Bay",
      state: "California",
      type: "brewery",
      specialty: "Small-batch craft beer and ocean-view tasting",
      openDays: "Wednesday–Sunday, 2pm–8pm",
      slug: "coastal-brewery-experience",
      author: "Amanda Lynn",
      publishDate: "October 2025",
      image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A clifftop brewery specializing in hop-forward ales and innovative sour beers, where you can taste exceptional craft beer while watching waves crash against the Pacific coastline.",
      content: [
        "Perched on dramatic bluffs overlooking the Pacific Ocean, Coastal Brewery represents everything that makes California craft beer culture special. The taproom occupies a converted 1940s fishing lodge, with floor-to-ceiling windows that frame an unobstructed view of the coastline stretching north toward San Francisco.",
        "Brewmaster Jake Morrison focuses on small-batch production, typically brewing just three barrels at a time. This allows him to experiment with unique ingredients like locally foraged sea beans, coastal sage, and even fog water collected during marine layer season. His West Coast IPA showcases Citra and Mosaic hops grown in nearby Sonoma County.",
        "The beer flight includes six tastings, ranging from their crisp Pilsner to a barrel-aged imperial stout that's been conditioning in bourbon barrels for eight months. Each pour comes with tasting notes and the story behind its creation. The sour beer program is particularly impressive—wild fermentation using native coastal yeasts creates complex, funkier flavors you won't find anywhere else."
      ],
      experienceTips: [
        "Arrive before sunset for the best lighting and whale watching opportunities",
        "Try the seasonal sour beers—they're only available at the brewery",
        "The food truck on weekends serves locally caught fish tacos",
        "Bring a jacket—coastal winds can be chilly even on warm days"
      ]
    }
  ];

  return destinations.find(d => d.slug === slug);
};

// ===================================================================
// PAGE COMPONENT
// ===================================================================
export default function FoodDestinationPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const destination = getFoodDestinationBySlug(slug);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Destination Not Found</h1>
          <Link href="/ook/food-destinations" className="text-green hover:text-green/70">
            ← Back to Food Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Header Section */}
      <SiteContainer>
        <OokHeader
          title={destination.name}
          image={destination.image}
          contentType="food-destination"
          location={{
            city: destination.city,
            state: destination.state
          }}
          author={destination.author}
          publishDate={destination.publishDate}
          marketType={destination.type}
          specialty={destination.specialty}
          openDays={destination.openDays}
          shareProps={{
            title: destination.name,
            description: destination.description,
            imageUrl: destination.image
          }}
        />
      </SiteContainer>

      {/* Article Content */}
      <SiteContainer>
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            {destination.content.map((paragraph, index) => (
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

      {/* Experience Tips */}
      <SiteContainer>
        <section className="mb-12">
          <div className="bg-green/5 p-8 rounded-lg border border-green/20">
            <h3 className="text-xl font-bold text-green mb-6">Experience Tips</h3>
            <ul className="space-y-3">
              {destination.experienceTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-green rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </SiteContainer>
    </main>
  );
}
