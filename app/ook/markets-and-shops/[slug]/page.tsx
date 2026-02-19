'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader } from '@/components';

// ===================================================================
// TYPES
// ===================================================================
interface MarketOrShop {
  name: string;
  city: string;
  state: string;
  type: 'farmers-market' | 'specialty-shop' | 'food-hall' | 'co-op';
  specialty: string;
  openDays?: string;
  slug: string;
  author: string;
  publishDate: string;
  image: string;
  description: string;
  content: string[];
  visitTips: string[];
}

// ===================================================================
// MOCK DATA
// ===================================================================
const getMarketOrShopBySlug = (slug: string): MarketOrShop | undefined => {
  const places: MarketOrShop[] = [
    {
      name: "Pike Place Tea at The Rose Market",
      city: "Seattle",
      state: "Washington",
      type: "farmers-market",
      specialty: "Artisanal teas, local honey, and handcrafted preserves",
      openDays: "Saturdays & Sundays, 9am–3pm year-round",
      slug: "pike-place-tea-rose-market",
      author: "Amanda Lynn",
      publishDate: "August 2025",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Tucked inside Seattle's iconic Pike Place Market, The Rose Market stall is a fragrant haven of loose-leaf teas, wildflower honeys, and small-batch fruit preserves from growers across the Pacific Northwest.",
      content: [
        "Finding The Rose Market stall is half the adventure. Wedged between a flower vendor and a jam-maker on Pike Place's lower level, it announces itself with an unmistakable cloud of jasmine, chamomile, and roasted oolong that drifts into the corridor and pulls you in whether you meant to stop or not.",
        "The tea selection spans more than 80 varieties sourced from small farms in Taiwan, Japan, Nepal, and Darjeeling, alongside a Pacific Northwest-specific collection that includes a Douglas fir needle tisane and a smoked Cascades blend unlike anything you'd typically find in a market stall. Owner and tea specialist Dana Rosetti blends many of these herself in small batches, adjusting ratios seasonally based on what she's tasting.",
        "The honey table deserves equal attention. Dana sources directly from three Washington State apiaries, and the difference in flavor between the early-season clover honey and the late-summer blackberry blossom variety is striking enough to make you rethink honey as a category entirely. Tastings are offered freely—just ask.",
        "A rotating shelf of house-made preserves rounds out the offering: strawberry rhubarb jam in spring, peach ginger in late summer, and a savory fig and onion spread that pairs beautifully with aged cheeses. Everything is made in small enough quantities that the selection changes week to week. Come back often and you'll rarely see the exact same lineup twice."
      ],
      visitTips: [
        "Come mid-morning on Saturday for the widest tea selection before popular blends sell out",
        "Ask Dana for a guided tasting—she'll walk you through three or four teas based on your flavor preferences",
        "The smoked Cascades blend makes an exceptional gift and is exclusive to this stall",
        "Pair a honey purchase with one of the soft cheeses from the artisan cheese vendor two stalls down"
      ]
    },
    {
      name: "Green Acres Farmers Market",
      city: "Portland",
      state: "Oregon",
      type: "farmers-market",
      specialty: "Organic produce and small-batch preserves",
      openDays: "Saturdays, 8am–1pm, April through November",
      slug: "green-acres-farmers-market",
      author: "Amanda Lynn",
      publishDate: "May 2025",
      image: "/images/green-acres-market.jpg",
      description: "One of Portland's most beloved seasonal markets, Green Acres brings together over 60 local vendors every Saturday morning.",
      content: [
        "Tucked into a leafy neighborhood park, Green Acres Farmers Market has been a Saturday morning ritual for Portland locals since 2003. The market draws a devoted crowd of home cooks, chefs, and families who come for the extraordinary selection of organic produce, freshly baked breads, and small-batch preserves you simply can't find anywhere else.",
        "What sets Green Acres apart is its strict commitment to Oregon-grown goods. Every vendor must source their products within 200 miles of the city, meaning you'll find the most seasonal, hyper-local produce imaginable. In spring, expect ramps, fiddleheads, and Walla Walla onions. By summer the tables overflow with heirloom tomatoes, stone fruit, and sweet corn.",
        "The baked goods section is a highlight in its own right. Wildflour Bakery sets up a full booth of naturally leavened sourdoughs and laminated pastries that tend to sell out by 9am—arrive early. Across the path, Three Sisters Farm offers a rotating roster of fermented goods: krauts, kimchi, and shrubs that have developed a cult following.",
        "Beyond the food, the market has a genuine community feel. Live acoustic music plays most weekends, and a small food-truck row offers coffee, breakfast burritos, and crepes to fuel your shopping. Plan on staying at least two hours if you want to take it all in without rushing."
      ],
      visitTips: [
        "Arrive before 9am to snag the best selection from bakery vendors",
        "Bring your own tote bags and small bills for cash-only stalls",
        "The coffee cart near the east entrance is worth seeking out",
        "Check the market's Instagram the week of your visit for featured vendors"
      ]
    },
    {
      name: "The Larder",
      city: "Nashville",
      state: "Tennessee",
      type: "specialty-shop",
      specialty: "Imported cheeses, cured meats, and natural wines",
      slug: "the-larder-nashville",
      author: "Amanda Lynn",
      publishDate: "March 2025",
      image: "/images/the-larder-nashville.jpg",
      description: "A destination cheese and charcuterie shop in East Nashville that doubles as a neighborhood gathering place.",
      content: [
        "The Larder opened quietly in East Nashville in 2019, but word spread fast. Owner and cheesemonger Priya Odem spent years sourcing directly from small American creameries and European importers before opening her own shop, and that depth of knowledge shows in every item on the shelves.",
        "The cheese counter is the heart of the store—roughly 80 wheels and wedges from the US, France, Spain, Italy, and beyond. Priya and her staff are enthusiastic guides; come with questions and you'll leave with a bag of samples and more context about what you're eating than most wine shops provide about their bottles.",
        "The charcuterie selection is equally thoughtful, leaning toward traditional European producers alongside a handful of American makers. Pair these with the shop's house-made accompaniments—fig mostarda, honey with truffle, spiced nuts—and you have everything you need for an effortless entertaining spread.",
        "A short natural wine list, mostly available by the glass or bottle to go, rounds out the offering. On Friday evenings the shop hosts informal tastings, casual enough to show up alone but festive enough that it becomes a social event. It's the kind of shop that makes a neighborhood feel complete."
      ],
      visitTips: [
        "Ask for the 'staff picks' board—it changes weekly and is always interesting",
        "Friday evening tastings are free with any purchase",
        "Call ahead to order a custom charcuterie board for entertaining",
        "Parking on the street is free after 5pm on weekdays"
      ]
    },
    {
      name: "Hudson Valley Food Hall",
      city: "Kingston",
      state: "New York",
      type: "food-hall",
      specialty: "Regional Hudson Valley producers under one roof",
      slug: "hudson-valley-food-hall",
      author: "Amanda Lynn",
      publishDate: "June 2025",
      image: "/images/hudson-valley-food-hall.jpg",
      description: "A beautifully renovated warehouse space housing a rotating collection of Hudson Valley food and drink producers.",
      content: [
        "The Hudson Valley Food Hall occupies a former textile warehouse just off Kingston's Rondout waterfront, and the building's industrial bones—exposed brick, timber trusses, concrete floors—make for a striking backdrop to the market stalls inside. Since opening in 2022 it has become one of the most compelling reasons to make the two-hour drive from New York City.",
        "Anchored by a year-round indoor farmers market, the space also hosts a rotating lineup of prepared-food stalls that change seasonally. On a recent visit, options included wood-fired Neapolitan pizza, Japanese-influenced sandwiches made with locally raised pork, and hand-rolled pasta with sauces built entirely from Hudson Valley produce.",
        "The drinks program is equally strong. A dedicated cider and wine bar pours exclusively from New York State producers, including several small cideries from the valley that have no tasting rooms of their own. Guided flights are available on weekends.",
        "Whether you're stocking up on provisions for a country rental or making a dedicated day trip, the food hall rewards extended browsing. Plan your visit around lunch or an early dinner to take full advantage of the hot food vendors."
      ],
      visitTips: [
        "Visit on a Saturday for the largest selection of market vendors",
        "The cider bar offers a 4-pour flight—perfect for discovering local producers",
        "Ample free parking directly adjacent to the building",
        "A handful of stalls accept cash only, so come prepared"
      ]
    }
  ];

  return places.find(p => p.slug === slug);
};

// ===================================================================
// PAGE COMPONENT
// ===================================================================
export default function MarketOrShopPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const place = getMarketOrShopBySlug(slug);

  if (!place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Not Found</h1>
          <Link href="/ook/markets-and-shops" className="text-green hover:text-green/70">
            ← Back to Markets &amp; Shops
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
          title={place.name}
          image={place.image}
          contentType="markets-and-shops"
          location={{
            city: place.city,
            state: place.state
          }}
          author={place.author}
          publishDate={place.publishDate}
          shareProps={{
            title: place.name,
            description: place.description,
            imageUrl: place.image
          }}
        />
      </SiteContainer>

      {/* Description */}
      <SiteContainer>
        <section className="mb-8">
          <p className="text-lg text-muted-foreground italic text-center">
            {place.description}
          </p>
        </section>
      </SiteContainer>

      {/* Meta badges (type, specialty, open days) */}
      <SiteContainer>
        <section className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <span className="bg-green/10 text-green text-sm font-medium px-3 py-1 rounded-full capitalize">
              {place.type.replace(/-/g, ' ')}
            </span>
            <span className="bg-green/10 text-green text-sm font-medium px-3 py-1 rounded-full">
              {place.specialty}
            </span>
            {place.openDays && (
              <span className="bg-green/10 text-green text-sm font-medium px-3 py-1 rounded-full">
                {place.openDays}
              </span>
            )}
          </div>
        </section>
      </SiteContainer>

      {/* Advertisement Section */}
      <SiteContainer>
        <section className="mb-8">
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-12 text-center">
            <p className="text-sm text-gray-500 mb-2">Advertisement</p>
            <p className="text-xs text-gray-400">728x90 Banner Ad</p>
          </div>
        </section>
      </SiteContainer>

      {/* Article Content */}
      <SiteContainer>
        <section className="mb-12">
          <div className="prose prose-lg max-w-none">
            {place.content.map((paragraph, index) => (
              <p key={index} className="mb-6 text-muted-foreground leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </SiteContainer>

      {/* Visit Tips */}
      <SiteContainer>
        <section className="mb-12">
          <div className="bg-green/5 p-8 rounded-lg border border-green/20">
            <h3 className="text-xl font-bold text-green mb-6">Visit Tips</h3>
            <ul className="space-y-3">
              {place.visitTips.map((tip, index) => (
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
