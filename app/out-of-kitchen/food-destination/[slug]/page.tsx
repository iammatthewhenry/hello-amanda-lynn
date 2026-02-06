'use client';

export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShareBar } from '@/components/ShareBar';
import { BlogPostTemplate } from '@/components/BlogPostTemplate';
import NotFoundPage from '@/app/not-found';

interface FoodDestinationPost {
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  slug: string;
  content: string[];
  specialty: string;
}

const mockFoodDestinationPosts: Record<string, FoodDestinationPost> = {
  "portland-food-scene": {
    title: "A Culinary Weekend in Portland",
    description: "From food trucks to fine dining, Portland's diverse food scene offers something for every palate. A perfect culinary destination just a short drive from Seattle.",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Portland, Oregon",
    date: "October 8, 2025",
    slug: "portland-food-scene",
    specialty: "Food truck culture & farm-to-table",
    content: [
      "Portland has earned its reputation as a food lover's paradise, where creativity meets sustainability and every neighborhood has its own culinary personality. A weekend here feels like a treasure hunt where every meal is a discovery.",
      "The food truck scene is legendary for good reason. These aren't just quick bites – they're full culinary experiences on wheels. Le Pigeon's food truck serves restaurant-quality dishes that would be at home in any fine dining establishment, while Koi Fusion revolutionized Korean-Mexican fusion years before it became trendy.",
      "What sets Portland apart is its commitment to local sourcing that goes beyond buzzwords. At Canard, every ingredient tells a story about Oregon's agricultural abundance. The seasonal menu changes based on what's actually growing, not what's trendy.",
      "The coffee culture here is serious business. Stumptown may have put Portland coffee on the map, but places like Heart and Coava are pushing boundaries with single-origin roasts and brewing methods that treat coffee like the complex agricultural product it is.",
      "Don't miss the distillery scene – Portland has become a craft spirits destination. Clear Creek Distillery's pear brandy captures the essence of Hood River orchards in a bottle, while Eastside Distilling creates innovative spirits that reflect the city's creative spirit.",
      "What I love most about Portland's food scene is how it embraces both innovation and tradition. You can eat at a James Beard Award winner's restaurant for lunch and grab the city's best donut from a tiny shop for dessert. Both experiences are equally valued and celebrated."
    ],
  },

  "vancouver-bc-eats": {
    title: "Cross-Border Culinary Adventure in Vancouver",
    description: "Just a few hours north, Vancouver offers an incredible Asian food scene, fresh Pacific seafood, and a multicultural dining experience that rivals any major food city.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Vancouver, BC",
    date: "October 1, 2025",
    slug: "vancouver-bc-eats",
    specialty: "Asian cuisine & fresh seafood",
    content: [
      "Vancouver's food scene reflects its position as a Pacific gateway city, where Asian immigration has created one of the most authentic Chinese food scenes outside of China. This is where you come for dim sum that rivals Hong Kong.",
      "Richmond's dumpling trail is a food lover's pilgrimage. Din Tai Fung may get the headlines, but local spots like Shanghai River and Chen's Shanghai Kitchen serve hand-pulled noodles and soup dumplings that transport you directly to Shanghai's street stalls.",
      "The sushi here benefits from Vancouver's position on the Pacific. The fish is so fresh that many restaurants fly their catch to Tokyo, then serve what's left to lucky Vancouver diners. Tojo's may be famous, but neighborhood spots often offer equal quality at half the price.",
      "Don't miss the multicultural neighborhoods. Little India on Main Street offers some of the most authentic South Asian food in North America, while Chinatown's traditional tea houses serve dim sum the way it was meant to be – from rolling carts with mysterious bamboo baskets.",
      "The craft beer scene has exploded in recent years, with breweries like 33 Acres and Brassneck creating uniquely West Coast styles that pair perfectly with Vancouver's seafood-heavy cuisine.",
      "What makes Vancouver special is how authentic ethnic cuisines exist alongside innovative farm-to-table restaurants. You can eat legitimate Sichuan hot pot for lunch and locally-foraged fine dining for dinner, both prepared by immigrants and locals who take their craft seriously."
    ],
  },

  "la-conner-tulip-festival": {
    title: "Spring Flavors During Tulip Season in La Conner",
    description: "The annual tulip festival brings visitors for the flowers, but the local food scene showcases the best of Skagit Valley's agricultural abundance.",
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c3a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "La Conner, Washington",
    date: "September 22, 2025",
    slug: "la-conner-tulip-festival",
    specialty: "Farm-fresh dining & local produce",
    content: [
      "La Conner during tulip season is magical – fields of color stretching to the horizon and a small town that comes alive with visitors celebrating spring's arrival. But beyond the flowers lies a food scene that reflects the Skagit Valley's incredible agricultural richness.",
      "The Skagit Valley is one of the most fertile agricultural regions in the state, producing everything from oysters to berries to some of the best onions in the country. Local restaurants take advantage of this abundance with menus that change with the seasons.",
      "La Conner Brewing Company serves gastropub fare that showcases local ingredients – their fish and chips use fresh Pacific cod, while their beef comes from grass-fed cattle raised just miles away. The beer garden overlooks the Swinomish Channel, making every meal feel like a celebration.",
      "Don't miss the local oyster farms. Taylor Shellfish has been farming these waters for generations, and their oysters reflect the clean, cold waters of Puget Sound. Eat them raw with a squeeze of lemon and taste the sea.",
      "The town's small scale means every restaurant feels personal. Chefs know their suppliers by name, servers can tell you which farm grew your salad greens, and meals feel connected to the land in a way that's rare in larger cities.",
      "Visit during tulip season and you'll understand why this valley has been called the 'Holland of America.' But come hungry, because the real treasure here isn't just the flowers – it's the incredible food that grows in this fertile soil."
    ],
  },

  "hood-river-gorge": {
    title: "Fruit Country Adventures in Hood River",
    description: "The Columbia River Gorge isn't just scenic – it's one of the West Coast's premier fruit-growing regions, with orchards, wineries, and restaurants that celebrate local agriculture.",
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Hood River, Oregon",
    date: "September 18, 2025",
    slug: "hood-river-gorge",
    specialty: "Orchards, wineries & scenic dining",
    content: [
      "Hood River sits in one of the most beautiful agricultural settings in the Pacific Northwest, where the Columbia River Gorge creates perfect conditions for growing stone fruit, apples, and grapes. This is agritourism at its most scenic.",
      "The orchards here produce some of the best fruit in the world. During harvest season, you can pick your own apples, pears, and cherries while looking out at Mount Hood. The fruit is so perfect it seems almost artificial – until you bite into it.",
      "pFriem Family Brewers has put Hood River on the craft beer map, creating Belgian-inspired ales that pair perfectly with the local cuisine. Their restaurant serves dishes made from ingredients grown within 50 miles, often within sight of your table.",
      "The wineries in the Hood River Valley are producing wines that rival anything from the Willamette Valley. The cooler climate and volcanic soil create ideal conditions for Pinot Noir and Chardonnay that express their terroir beautifully.",
      "Don't miss the fruit stands along the highway – these aren't tourist traps but actual farm stands selling fruit picked that morning. The peaches in summer are so ripe you have to eat them immediately or watch them drip down your chin.",
      "The combination of incredible scenery, perfect fruit, and passionate growers makes Hood River a destination that feeds both your stomach and your soul. Every meal feels like a celebration of what happens when humans work with nature instead of against it."
    ],
  },

  "san-francisco-mission": {
    title: "Mission District Taco Trail",
    description: "San Francisco's Mission District offers some of the best Mexican food outside of Mexico, with taquerías, bakeries, and markets that have been family-owned for generations.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "San Francisco, California",
    date: "September 12, 2025",
    slug: "san-francisco-mission",
    specialty: "Authentic Mexican cuisine",
    content: [
      "The Mission District isn't just a neighborhood – it's a taste of Mexico in the heart of San Francisco. Generations of Mexican immigrants have created an authentic food scene that rivals anything you'd find south of the border.",
      "La Taquería may be the most famous, but every block has its own treasure. Family-run taquerías that have been serving the same recipes for decades, where the staff speaks Spanish and the regulars order by pointing at the menu.",
      "The tortillas here are made fresh throughout the day. You can watch the process at places like La Palma Mexicatessen, where they've been making tortillas since 1953. The difference between these and store-bought tortillas is like comparing fresh bread to cardboard.",
      "Don't miss the panaderías (Mexican bakeries) scattered throughout the district. Conchas, tres leches cake, and churros that are crispy outside and soft inside. These aren't desserts – they're cultural experiences.",
      "The produce markets stock ingredients you won't find elsewhere in the city. Tomatillos, poblano peppers, Mexican chocolate, and dozens of varieties of dried chiles that add complexity to everything from mole to simple salsas.",
      "What makes the Mission special isn't just the food – it's the culture. This is a living, breathing community where food traditions continue because they're part of daily life, not museum pieces preserved for tourists."
    ],
  },

  "san-juan-islands": {
    title: "Island Hopping for Local Flavors",
    description: "The San Juan Islands offer a unique culinary adventure where fresh seafood, island-grown produce, and artisanal products create an unforgettable food destination.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "San Juan Islands, Washington",
    date: "September 22, 2025",
    slug: "san-juan-islands",
    specialty: "Fresh seafood & island agriculture",
    content: [
      "The San Juan Islands feel like a secret that locals have been keeping to themselves – a place where the pace slows down and every meal feels connected to the land and sea around you. This is destination dining at its most authentic.",
      "On Orcas Island, Doe Bay Cafe serves breakfast that makes you understand why people move to islands. Their eggs come from chickens you can see wandering the property, while the salmon was swimming in nearby waters just hours before landing on your plate.",
      "Lopez Island's local farms create a agricultural paradise in miniature. At Lopez Island Vineyards, you can taste wines made from grapes that grow in view of the tasting room, while Vita's Wildly Delicious preserves capture the island's berry abundance in jams that taste like summer.",
      "The seafood here is a revelation if you've only experienced it in the city. Penn Cove mussels are sweet and briny in a way that speaks to the pristine waters they come from. At Duck Soup on San Juan Island, they're prepared simply to let their natural flavor shine.",
      "What makes island dining special isn't just the ingredients – it's the stories. Every chef knows their suppliers personally, every server can tell you which farm grew your salad greens, and every meal feels like a celebration of place.",
      "Take the ferry with a cooler and visit the island farmers markets. You'll leave with treasures like Westcott Bay sea salt, aged on the beach where it was harvested, and fresh oysters that taste like the sea air feels on your skin."
    ],
  },

  "yakima-valley": {
    title: "Wine and Harvest Season in Yakima Valley",
    description: "Eastern Washington's agricultural heartland offers a different kind of food destination – one where wine, fresh produce, and farm-to-table dining create an authentic taste of the region.",
    image: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Yakima Valley, Washington",
    date: "September 15, 2025",
    slug: "yakima-valley",
    specialty: "Wine country & agricultural tours",
    content: [
      "The Yakima Valley in harvest season is Washington's agricultural heart on full display. This is where much of the state's wine grapes, hops, apples, and vegetables are grown, creating a food destination that's about experiencing the source of your food.",
      "The wine scene here predates the more famous Walla Walla by decades, and it shows in the confidence of winemakers who've been perfecting their craft on these hillsides for generations. At Kiona Vineyards, you taste history in every bottle – they've been growing grapes here since the 1970s.",
      "But it's not just about wine. The valley produces some of the best stone fruit in the world, and visiting during peach season is like tasting summer in its most perfect form. Local farm stands offer fruit so ripe you have to eat it immediately or watch it drip down your chin.",
      "The farm-to-table movement here isn't trendy – it's practical. At El Corazón in Ellensburg, the menu changes based on what's being harvested that week. The chef works directly with local growers to plan menus around peak seasonality.",
      "Don't miss the hop farms if you're a beer lover. The Yakima Valley produces most of America's hops, and visiting during harvest gives you a new appreciation for the complexity that goes into every beer. The aroma during hop harvest is intoxicating – literally and figuratively.",
      "The real magic happens when you combine all these elements – pairing local wines with just-picked produce while sitting on a hillside overlooking the valley where everything was grown. This is agritourism at its most delicious."
    ],
  }
};

export default function FoodDestinationsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (!slug || !mockFoodDestinationPosts[slug]) {
    return <NotFoundPage />;
  }

  const post = mockFoodDestinationPosts[slug];

  return (
    <main>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs 
          items={[
            { label: 'Out of Kitchen', href: '/out-of-kitchen' },
            { label: 'Food Destinations', href: '/out-of-kitchen/food-destinations' },
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
          <div className="flex flex-wrap items-center gap-4 mb-4 text-muted-foreground">
            <span className="text-sm">{post.location}</span>
            <span>•</span>
            <span className="text-sm">{post.specialty}</span>
          </div>
        }
        description={post.description}
        content={post.content}
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
