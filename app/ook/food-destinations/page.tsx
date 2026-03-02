import type { Metadata } from 'next';
import { PageHeader, GridSection } from '@/components';
import { getOokPostsByCategory } from '@/lib/api/ook';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Food Destinations',
  description: 'Discover incredible food destinations around the world — markets, streets, and cities worth eating your way through.',
};

interface OokPost {
  slug: string;
  title: string;
  description: string;
  image: string;
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const FALLBACK_POSTS: OokPost[] = [
  {
    "slug": "local-food-markets",
    "title": "Exploring Local Food Markets",
    "description": "Discovering treasures at the weekly farmer's market.",
    "image": "https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "sunset-vineyard-tasting",
    "title": "Sunset Vineyard Tasting",
    "description": "A magical evening wine tasting experience nestled in the rolling hills.",
    "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "napa-valley-culinary-tour",
    "title": "Napa Valley Culinary Tour",
    "description": "A guided journey through wine country featuring farm-to-table dining.",
    "image": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "coastal-seafood-trail",
    "title": "Coastal Seafood Trail",
    "description": "Following the Pacific coast to discover the freshest seafood.",
    "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export default async function FoodDestinationIndexPage() {
  let posts: OokPost[] = FALLBACK_POSTS;
  try {
    const result = await getOokPostsByCategory('food-destinations');
    if (result?.posts?.length) {
      posts = result.posts.map(p => ({
        slug: p.slug,
        title: p.title,
        description: p.excerpt ? p.excerpt.replace(/<[^>]+>/g, '').trim() : '',
        image: p.featuredImage?.node?.sourceUrl ?? PLACEHOLDER,
      }));
    }
  } catch { /* use fallback */ }

  return (
    <main className="pt-6 sm:pt-8">
      <PageHeader
        title="Food Destinations"
        description="Exploring culinary adventures beyond the kitchen. From local food markets to hidden gems in different cities, discover the places that inspire my recipes."
      />
      <GridSection
        title="Culinary Destinations"
        posts={posts}
        baseSlug="/ook/food-destinations"
        isFirstSection={true}
      />
    </main>
  );
}
