'use client';

export const dynamic = 'force-dynamic';

import { useParams } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShareBar } from '@/components/share-bar';
import { BlogPostTemplate } from '@/components/blog-post-template';
import NotFoundPage from '@/app/not-found';

interface MarketPost {
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
  slug: string;
  content: string[];
  specialty: string;
}

const mockMarketPosts: Record<string, MarketPost> = {
  "pike-place-market": {
    title: "Early Morning at Pike Place Market",
    description: "The best time to experience Seattle's iconic market is before the crowds arrive. Fresh seafood, seasonal produce, and the energy of vendors starting their day.",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Pike Place, Seattle",
    date: "October 12, 2025",
    slug: "pike-place-market",
    specialty: "Fresh seafood & produce",
    content: [
      "There's magic in Pike Place Market at 6 AM, before the tourists arrive and when the vendors are setting up for the day. The fish mongers are arranging their glistening displays, and the flower vendors are creating bouquets that will brighten someone's day.",
      "I started my morning with Tony at Pure Food Fish, who's been working here for over 20 years. He taught me how to identify the freshest salmon – look for bright eyes, firm flesh, and that ocean-fresh smell. The king salmon I took home was so fresh it practically sparkled.",
      "The produce vendors at this hour are arranging their displays with an artist's eye. Heirloom tomatoes in shades from deep purple to golden yellow, corn so fresh you can eat it raw, and herbs that perfume the air with their intensity.",
      "What strikes me most is the sense of community among the vendors. They share coffee, joke with each other, and have genuine relationships that span decades. This isn't just commerce – it's a way of life that connects people to their food and to each other.",
      "My favorite discovery was a small honey vendor tucked away in one of the lower levels. Her lavender honey is unlike anything I've tasted – floral but not overpowering, with a complexity that changes as it sits on your tongue. These are the treasures you find when you take the time to explore beyond the main aisles."
    ],
  },

  "pcc-natural-markets": {
    title: "Community Shopping at PCC Natural Markets",
    description: "More than just a grocery store, PCC represents a commitment to local, organic, and sustainable food that has shaped Seattle's food culture for decades.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Multiple locations",
    date: "October 8, 2025",
    slug: "pcc-natural-markets",
    specialty: "Organic & local products",
    content: [
      "PCC Natural Markets has been setting the standard for conscious grocery shopping in Seattle since 1953. Long before 'organic' became a buzzword, PCC was championing sustainable agriculture and fair trade practices.",
      "The produce section reads like a map of local farms. You'll find vegetables from Oxbow Farm, apples from Larsen Apple Barn, and herbs from City Grown Seattle – all with signs telling you exactly who grew your food and where.",
      "Their bulk section is a revelation for anyone trying to reduce packaging waste. Bring your own containers and fill up on everything from quinoa to dark chocolate chips, paying only for what you need.",
      "The deli case showcases local makers like Essential Baking Company bread, Delancey Pizza dough, and Macrina Bakery pastries. It's like having the best of Seattle's food scene under one roof.",
      "What sets PCC apart isn't just what they sell, but their commitment to education. The staff knows their products, the cooking classes teach real skills, and the member-owner structure ensures the community has a voice in decisions."
    ],
  },

  "golden-age-collectables": {
    title: "Vintage Kitchen Treasures at Golden Age Collectables",
    description: "A treasure hunter's paradise for vintage kitchen equipment and collectibles. You never know what culinary gems you'll discover in this eclectic shop.",
    image: "https://images.unsplash.com/photo-1552566090-4a3b6d8f9c6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Georgetown",
    date: "October 3, 2025",
    slug: "golden-age-collectables",
    specialty: "Vintage kitchenware & collectibles",
    content: [
      "Golden Age Collectables is where kitchen history lives on. Every aisle holds stories – a 1950s stand mixer that still works perfectly, copper pots with a patina that speaks of decades of good cooking, cast iron pieces that predate modern manufacturing.",
      "The owner, Margaret, has an encyclopedia knowledge of vintage cookware. She can date a piece by its maker's mark, explain why certain materials work better than modern alternatives, and share stories about the families who originally owned these treasures.",
      "I found a set of French copper pots that cook more evenly than anything modern I've used. The heat distribution is so superior that it changes how you think about temperature control in cooking.",
      "The collection of vintage cookbooks is worth the visit alone. Recipes from church ladies' circles, community fundraiser collections, and family compilations passed down through generations – each one a window into how people cooked in different eras.",
      "This isn't just shopping – it's archaeology. Every piece has a history, and Margaret ensures that history continues when these tools find new homes with cooks who will appreciate their quality and craftsmanship."
    ],
  },

  "spice-merchant": {
    title: "Global Flavors at The Spice Merchant",
    description: "A specialty spice shop where every jar contains stories from around the world. This is where serious cooks come to find ingredients that transform ordinary dishes into extraordinary experiences.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Pike Place Market",
    date: "September 30, 2025",
    slug: "spice-merchant",
    specialty: "International spices & blends",
    content: [
      "The Spice Merchant is sensory overload in the best possible way. The aroma hits you before you're through the door – cardamom from Guatemala, star anise from Vietnam, sumac from Turkey, and hundreds of other scents that transport you around the world.",
      "Owner David sources directly from growers when possible, ensuring the spices are as fresh as they can be when they reach your kitchen. The difference in potency and flavor compared to grocery store spices is remarkable.",
      "Their custom spice blends are legendary among local chefs. The ras el hanout contains 35 different spices, each one carefully balanced to create the complex North African flavor profile that transforms tagines and couscous.",
      "This is where you come when a recipe calls for 'true' cinnamon (Ceylon, not cassia) or when you want to understand why saffron costs more per ounce than gold. David will explain the differences and help you choose the right grade for your cooking.",
      "The educational aspect is invaluable. You'll learn about the history of the spice trade, how to toast whole spices for maximum flavor, and which combinations work best for different cuisines. Every visit expands your culinary vocabulary."
    ],
  },

  "local-beer-shop": {
    title: "Craft Beer Culture at Local Beer Shop",
    description: "More than just a bottle shop, this is where beer enthusiasts gather to discover new breweries, learn about brewing techniques, and celebrate the Pacific Northwest's incredible beer culture.",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Wallingford",
    date: "September 26, 2025",
    slug: "local-beer-shop",
    specialty: "Craft beer & local breweries",
    content: [
      "Local Beer Shop curates one of the most thoughtful selections of craft beer in the city. Owner Mark focuses on small, independent breweries, often featuring beers you can't find anywhere else in Seattle.",
      "The staff's knowledge is encyclopedic. They can guide you to the perfect beer based on your taste preferences, suggest food pairings, and explain the brewing techniques that create different flavor profiles.",
      "The rotating tap selection features experimental small-batch brews from local favorites like Fremont Brewing, Holy Mountain, and Urban Family. These are often one-off collaborations or seasonal specialties available nowhere else.",
      "What makes this place special is the community it fosters. Regular events like brewery spotlight nights and beer education classes turn casual beer drinkers into knowledgeable enthusiasts.",
      "This is where you come to understand that beer is agriculture – the hops, malt, and yeast all come from farms, and the best beers reflect their terroir just like wine. It's a perspective that deepens your appreciation for every sip."
    ],
  },

  "melrose-market": {
    title: "Hidden Gems at Melrose Market",
    description: "This intimate market in Capitol Hill offers some of the best artisanal foods and specialty items in the city. A perfect spot for discovering unique ingredients.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "Capitol Hill",
    date: "October 5, 2025",
    slug: "melrose-market",
    specialty: "Artisanal foods & specialty items",
    content: [
      "Melrose Market feels like Seattle's best-kept secret, though it's been a Capitol Hill institution for years. This intimate market brings together some of the city's most passionate food artisans under one historic roof.",
      "The first stop is always Sitka & Spruce's market counter, where chef Matt Dillon sources ingredients for the restaurant upstairs. The selection changes daily based on what's best and in season – today it's perfect chanterelles and just-picked pears.",
      "Homegrown Sustainable Sandwich Shop proves that fast food can be thoughtful food. Their sandwiches use house-made everything – from the bread to the pickles to the aioli. The roasted vegetable sandwich with herbed goat cheese has become my weekly ritual.",
      "What makes this market special isn't just the quality of the vendors, but the way they work together. The butcher at Rain Shadow Meats will recommend the perfect cut for a recipe, while the cheese monger at Calf & Kid suggests the ideal pairing.",
      "This is where I come when I want to be inspired rather than just fed. Every visit teaches me something new about food, whether it's a technique from the oyster shucker or a wine recommendation that opens up a whole new region to explore."
    ],
  },

  "university-district-farmers-market": {
    title: "Saturday Morning at University District Farmers Market",
    description: "The energy and abundance of Seattle's largest farmers market, where local producers showcase the best of Pacific Northwest agriculture.",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    location: "University District",
    date: "September 28, 2025",
    slug: "university-district-farmers-market",
    specialty: "Local farms & producers",
    content: [
      "Saturday mornings at the University District Farmers Market are a celebration of everything that makes Pacific Northwest agriculture special. The market stretches for blocks, filled with vendors who grow, raise, and make everything they sell.",
      "The apple vendors this time of year are incredible – varieties you'll never see in a grocery store like Ashmead's Kernel and Esopus Spitzenburg. Each farmer has their own story about why they chose certain varieties and how they tend their orchards.",
      "The mushroom foragers always draw a crowd with their displays of chanterelles, hedgehogs, and matsutake. They share stories of their pre-dawn hunts in the Cascade forests and offer cooking tips that transform these wild treasures into memorable meals.",
      "What I love most is the direct connection to the people who grow your food. The Alvarez family has been farming in the Yakima Valley for three generations, and their passion for perfect sweet corn and peppers is evident in every conversation.",
      "The market isn't just about shopping – it's about learning. I've discovered new vegetables I'd never heard of, learned preservation techniques that extend the harvest season, and found recipes that have become family favorites. This is food education at its most delicious."
    ],
  }
};

export default function MarketsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  if (!slug || !mockMarketPosts[slug]) {
    return <NotFoundPage />;
  }

  const post = mockMarketPosts[slug];

  return (
    <main>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs 
          items={[
            { label: 'Out of Kitchen', href: '/out-of-kitchen' },
            { label: 'Markets & Shops', href: '/out-of-kitchen/markets-and-shops' },
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
