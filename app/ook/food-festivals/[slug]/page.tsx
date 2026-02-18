'use client';

export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import { Breadcrumbs, ShareBar, BlogPostTemplate } from '@/components';
import NotFoundPage from '@/app/not-found';

interface FoodFestivalPost {
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  slug: string;
  content: string[];
  specialty: string;
}

const mockFoodFestivalPosts: Record<string, FoodFestivalPost> = {
  "taste-of-seattle": {
    title: "Taste of Seattle: A Summer Food Celebration",
    description: "Seattle's premier food festival brings together the city's best restaurants, food trucks, and local vendors for a weekend of incredible flavors at Seattle Center.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Seattle Center",
    date: "July 15, 2025",
    slug: "taste-of-seattle",
    specialty: "Multi-vendor food festival",
    content: [
      "Taste of Seattle transforms Seattle Center into a culinary wonderland where the city's best restaurants serve their signature dishes alongside food trucks, local farmers, and artisanal producers. It's like having the entire Seattle food scene in one location.",
      "The festival showcases over 60 restaurants, from James Beard Award winners to neighborhood gems you might never discover otherwise. Each vendor offers smaller portions at festival prices, allowing you to sample widely without breaking the bank.",
      "What sets this festival apart is its commitment to highlighting local ingredients. The Washington State Pavilion features local farms, wineries, and specialty producers. I discovered Beecher's Handmade Cheese here years before they became famous, and tasted wine from small Woodinville producers I still seek out.",
      "The cooking demonstrations on the main stage feature celebrity chefs alongside local favorites. Watching Tom Douglas prepare his famous coconut cream pie while sharing stories about Seattle's food evolution is both entertaining and educational.",
      "Don't miss the beverage gardens featuring local breweries, distilleries, and coffee roasters. This is where you can pair that perfect IPA with fish tacos or discover a new coffee roast while people-watching from the shade.",
      "The festival atmosphere captures what makes Seattle special – casual but sophisticated, innovative but rooted in tradition. Families picnic on the grass while food enthusiasts debate the merits of different preparations. It's a celebration of community as much as cuisine."
    ],
  },

  "pike-place-chowder-fest": {
    title: "Pike Place Chowder Fest: Battle of the Bowls",
    description: "An annual celebration of the Pacific Northwest's finest chowders, where restaurants compete for the title of best bowl while visitors sample infinite variations of this coastal classic.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Pike Place Market",
    date: "February 8, 2025",
    slug: "pike-place-chowder-fest",
    specialty: "Chowder competition & tasting",
    content: [
      "Pike Place Chowder Fest proves that chowder is serious business in the Pacific Northwest. This February festival brings together the region's best seafood restaurants to compete in categories ranging from traditional New England style to innovative Pacific Northwest interpretations.",
      "The competition is fierce and the variations are endless. Traditional clam chowder battles it out with salmon bisques, crab and corn chowders, and creative combinations like smoked salmon and dill or Dungeness crab with roasted red pepper.",
      "What makes this festival special is the education component. Chefs explain their techniques, from how to properly prepare fresh clams to the secrets of achieving the perfect consistency without using too much flour or cream.",
      "The People's Choice award always generates passionate debate among locals. Last year's winner was an unexpected geoduck clam chowder that divided the crowd – you either loved its briny intensity or found it too adventurous for comfort.",
      "Beyond the competition, the festival celebrates the broader seafood culture of the Pacific Northwest. Local fishermen share stories about sustainable harvesting, while marine biologists explain the ecosystem that produces our incredible shellfish.",
      "February might seem like an odd time for a food festival, but there's something perfect about warming up with a hot bowl of chowder while winter rain patters on the market's tin roof. It's quintessentially Seattle."
    ],
  },

  "international-district-night-market": {
    title: "International District Night Market: Street Food Paradise",
    description: "A vibrant evening celebration of Asian street food, where the aromas of grilled meats, steaming dumplings, and exotic spices fill the streets of Seattle's historic International District.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "International District",
    date: "August 22, 2025",
    slug: "international-district-night-market",
    specialty: "Asian street food & night market culture",
    content: [
      "The International District Night Market transforms the historic neighborhood into a bustling Asian night market, complete with paper lanterns, live music, and the intoxicating aromas of street food from across Asia.",
      "Vendors line the streets offering everything from hand-pulled noodles made to order to Korean corn dogs with exotic toppings. The diversity is staggering – Vietnamese banh mi, Filipino lumpia, Japanese takoyaki, Thai mango sticky rice, and Chinese scallion pancakes all within a few blocks.",
      "What makes this festival authentic is its connection to the neighborhood's history. Many vendors are local restaurant owners and their families, sharing recipes that have been passed down through generations of immigrants who made this area home.",
      "The night market atmosphere captures the energy of Asian street food culture. Tables and chairs appear on sidewalks, families gather around steaming bowls of pho, and the sound of sizzling woks mingles with conversations in multiple languages.",
      "Don't miss the dessert vendors – everything from Hong Kong egg waffles to Korean bingsu (shaved ice with sweet toppings). The bubble tea stands alone could occupy an entire evening, with vendors competing to create the most Instagram-worthy drinks.",
      "This isn't just a food festival – it's a cultural celebration that honors the International District's role as the heart of Asian America in Seattle. Every bite tells a story of immigration, adaptation, and the preservation of culinary traditions in a new homeland."
    ],
  },

  "apple-blossom-festival": {
    title: "Wenatchee Apple Blossom Festival: Orchard to Table",
    description: "Eastern Washington's celebration of apple harvest season combines small-town charm with incredible local food, wine, and the beauty of orchards in full bloom.",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Wenatchee Valley",
    date: "April 26, 2025",
    slug: "apple-blossom-festival",
    specialty: "Apple harvest & agricultural celebration",
    content: [
      "The Wenatchee Apple Blossom Festival is pure Americana – a small-town celebration that happens when the valley's apple orchards are in full bloom, creating a landscape that looks like a real-life fairy tale.",
      "The food vendors focus on everything apple-related, but with a sophistication that reflects the valley's evolution into a premier agricultural region. Apple cider donuts, caramel apples, and fresh apple pie are just the beginning.",
      "Local restaurants create special menus featuring the valley's agricultural abundance. Apple-wood smoked salmon, pork tenderloin with apple chutney, and salads featuring ingredients grown within miles of where you're eating them.",
      "The wine component has grown significantly as local vineyards have gained recognition. The high desert climate produces wines with intense fruit flavors that pair beautifully with the region's apple-centric cuisine.",
      "What makes this festival special is its authenticity – this is a working agricultural community celebrating what it does best. Farmers give tours of their orchards, explaining different apple varieties and sustainable farming practices.",
      "The timing is perfect – late April when the weather is warm but not yet hot, the orchards are in bloom, and the sense of renewal and growth is palpable. It's a reminder that great food starts with great agriculture, and that celebration of the harvest is one of humanity's oldest and most meaningful traditions."
    ],
  },

  "seafood-wine-festival": {
    title: "Pacific Northwest Seafood & Wine Festival",
    description: "A sophisticated celebration pairing the region's finest seafood with world-class wines, showcasing the perfect marriage of Pacific waters and terroir-driven winemaking.",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Edmonds Marina",
    date: "September 12, 2025",
    slug: "seafood-wine-festival",
    specialty: "Seafood & wine pairing experiences",
    content: [
      "The Pacific Northwest Seafood & Wine Festival elevates the concept of a food festival, focusing on the sophisticated pairing of local seafood with regional wines in a waterfront setting that celebrates both elements.",
      "Master sommeliers lead guided tastings that pair everything from raw oysters with crisp Sauvignon Blanc to cedar-plank salmon with Oregon Pinot Noir. These aren't random combinations – each pairing is designed to highlight how local food and wine complement each other.",
      "The chef demonstrations feature techniques for preparing Pacific Northwest seafood, from the proper way to shuck oysters to smoking salmon using traditional methods. These are skills you can take home and use in your own kitchen.",
      "Local fishermen and boat captains share stories about sustainable fishing practices while you sample the day's catch. This connection between the people who harvest your food and your plate creates a deeper appreciation for both the ocean and the meal.",
      "The wine selection focuses exclusively on Pacific Northwest producers, many of whom are present to discuss their winemaking philosophy. This is where you discover small wineries that don't distribute widely but create wines that perfectly capture the region's character.",
      "Set against the backdrop of Puget Sound with the Olympic Mountains in the distance, the festival setting reinforces the connection between terroir and cuisine. Every sip and bite tastes like the place it came from – clean, fresh, and authentically Northwestern."
    ],
  },

  "fremont-oktoberfest": {
    title: "Fremont Oktoberfest: Seattle's Bavarian Celebration",
    description: "A neighborhood festival that brings authentic German food, beer, and gemütlichkeit to the quirky Fremont district, complete with traditional music and dancing.",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Fremont Neighborhood",
    date: "September 19, 2025",
    slug: "fremont-oktoberfest",
    specialty: "German cuisine & beer culture",
    content: [
      "Fremont Oktoberfest brings authentic German culture to one of Seattle's quirkiest neighborhoods, creating an unlikely but perfect pairing of Bavarian tradition and Pacific Northwest eccentricity.",
      "The beer selection focuses on authentic German styles, many brewed locally using traditional methods. Redhook's Märzen, Georgetown Brewing's Oktoberfest, and imports from actual Munich breweries create a lineup that would make any German proud.",
      "The food vendors serve traditional German fare made with local ingredients. Bratwurst made from locally-raised pork, sauerkraut from Washington-grown cabbage, and pretzels baked fresh throughout the day using imported German flour.",
      "What makes this festival special is its authenticity combined with Fremont's irreverent spirit. You'll find traditional oompah bands playing alongside local indie rock groups, and vendors selling both lederhosen and vintage t-shirts.",
      "The family atmosphere captures the true spirit of Oktoberfest – this is a community celebration, not just a drinking festival. Children play traditional German games while their parents enjoy beer and conversation at long communal tables.",
      "The setting under Fremont's famous troll statue adds surreal charm to the proceedings. Only in Seattle would you find people in dirndls and lederhosen celebrating German culture in the shadow of a massive concrete troll clutching a real Volkswagen Beetle."
    ],
  }
};

export default function FoodFestivalsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (!slug || !mockFoodFestivalPosts[slug]) {
    return <NotFoundPage />;
  }

  const post = mockFoodFestivalPosts[slug];

  return (
    <main>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs 
          items={[
            { label: 'Out of Kitchen', href: '/out-of-kitchen' },
            { label: 'Food Festivals', href: '/out-of-kitchen/food-festivals' },
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
