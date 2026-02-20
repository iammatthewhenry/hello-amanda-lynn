'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader, Takeaway } from '@/components';

// ===================================================================
// TYPES
// ===================================================================
interface FoodFestival {
  name: string;
  city: string;
  state: string;
  type: 'cultural' | 'seasonal' | 'specialty' | 'competition' | 'chef-showcase';
  specialty: string;
  festivalDates?: string;
  slug: string;
  author: string;
  publishDate: string;
  image: string;
  description: string;
  content: string[];
  festivalTips: string[];
}

// ===================================================================
// MOCK DATA
// ===================================================================
const getFoodFestivalBySlug = (slug: string): FoodFestival | undefined => {
  const festivals: FoodFestival[] = [
    {
      name: "International Food Fair",
      city: "San Francisco",
      state: "California",
      type: "cultural",
      specialty: "Global cuisine celebration featuring dishes from 25+ countries",
      festivalDates: "July 5-7, 2025",
      slug: "international-food-fair",
      author: "Amanda Lynn",
      publishDate: "July 2025",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "San Francisco's premier multicultural food festival transforms Union Square into a global marketplace, featuring authentic cuisines from over 25 countries alongside cooking demonstrations, cultural performances, and artisan exhibitions.",
      content: [
        "The International Food Fair is where San Francisco's incredible diversity comes alive through food. For three days each July, Union Square becomes a global village where you can taste your way around the world without leaving the city. This isn't your typical food truck festival—it's a carefully curated celebration of authentic international cuisine prepared by immigrant families and established restaurants who've made San Francisco their home.",
        "What makes this festival extraordinary is its commitment to authenticity. Each participating vendor must demonstrate their cultural connection to the cuisine they're serving. You'll find third-generation Italian grandmothers hand-rolling pasta alongside recent Ethiopian immigrants serving traditional injera with berbere-spiced stews. The festival actively seeks out home cooks and small family businesses that might not otherwise have a platform to share their traditional recipes.",
        "The cooking demonstrations are educational journeys through global culinary traditions. I watched a Lebanese baker explain the delicate process of stretching phyllo dough for baklava while sharing stories about her grandmother's bakery in Beirut. A Mexican chef demonstrated the art of making mole from scratch, grinding chiles and spices on a traditional metate while explaining the cultural significance of each ingredient.",
        "The festival's layout encourages exploration and cultural exchange. Food stalls are organized by continent, but there are also themed areas like 'Street Foods of the World' and 'Desert Delights.' Live music and dance performances happen throughout the day, creating an atmosphere where food becomes the catalyst for broader cultural celebration.",
        "What sets this festival apart from others is its educational mission. The Global Spice Market features vendors selling hard-to-find ingredients with cooking classes throughout the weekend. The Children's Cultural Kitchen offers hands-on cooking activities where kids can make dumplings, roll sushi, or decorate sugar cookies while learning about different cultures through food."
      ],
      festivalTips: [
        "Arrive early on Saturday for the freshest offerings and shortest lines",
        "Bring cash—many smaller vendors prefer cash payments",
        "Don't miss the Global Spice Market for unique ingredients and cooking tips",
        "The Cultural Kitchen workshops require advance registration on the festival website",
        "Try the Festival Passport—a guided tasting tour featuring signature dishes from each continent"
      ]
    },
    {
      name: "Taste of Seattle",
      city: "Seattle",
      state: "Washington", 
      type: "specialty",
      specialty: "Multi-vendor food festival featuring local restaurants and vendors",
      festivalDates: "July 15-17, 2025",
      slug: "taste-of-seattle",
      author: "Amanda Lynn",
      publishDate: "July 2025",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Seattle's premier food festival brings together the city's best restaurants, food trucks, and local vendors for a weekend of incredible flavors at Seattle Center.",
      content: [
        "Taste of Seattle transforms Seattle Center into a culinary wonderland where the city's best restaurants serve their signature dishes alongside food trucks, local farmers, and artisanal producers. It's like having the entire Seattle food scene in one location.",
        "The festival showcases over 60 restaurants, from James Beard Award winners to neighborhood gems you might never discover otherwise. Each vendor offers smaller portions at festival prices, allowing you to sample widely without breaking the bank.",
        "What sets this festival apart is its commitment to highlighting local ingredients. The Washington State Pavilion features local farms, wineries, and specialty producers."
      ],
      festivalTips: [
        "Arrive early for the best food selection",
        "Try the festival's signature wine pairings",
        "Visit the cooking demonstrations on the main stage"
      ]
    }
  ];

  return festivals.find(f => f.slug === slug);
};

// ===================================================================
// PAGE COMPONENT
// ===================================================================
export default function FoodFestivalPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const festival = getFoodFestivalBySlug(slug);

  if (!festival) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Festival Not Found</h1>
          <Link href="/ook/food-festivals" className="text-green hover:text-green/70">
            ← Back to Food Festivals
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
          title={festival.name}
          image={festival.image}
          contentType="food-festival"
          location={{
            city: festival.city,
            state: festival.state
          }}
          author={festival.author}
          publishDate={festival.publishDate}
          marketType={festival.type}
          specialty={festival.specialty}
          openDays={festival.festivalDates}
          shareProps={{
            title: festival.name,
            description: festival.description,
            imageUrl: festival.image
          }}
        />
      </SiteContainer>

      {/* Article Content */}
      <SiteContainer>
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            {festival.content.map((paragraph, index) => (
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

      {/* Festival Tips */}
      <SiteContainer>
        <Takeaway 
          title="Festival Tips"
          items={festival.festivalTips}
        />
      </SiteContainer>
    </main>
  );
}
