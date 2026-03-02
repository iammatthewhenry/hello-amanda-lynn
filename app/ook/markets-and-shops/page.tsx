import type { Metadata } from 'next';
import { PageHeader, GridSection } from '@/components';
import { getOokPostsByCategory } from '@/lib/api/ook';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Markets & Shops',
  description: 'Farmers markets, specialty shops, and artisan producers worth a visit — where to find the best ingredients.',
};

interface OokPost {
  slug: string;
  title: string;
  description: string;
  image: string;
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const FALLBACK_POSTS: OokPost[] = [
  {
    "slug": "downtown-farmers-market",
    "title": "Downtown Farmers Market",
    "description": "Weekly market featuring local produce, artisanal breads, and specialty food vendors.",
    "image": "https://images.unsplash.com/photo-1488459716781-31db52582fe9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "artisan-spice-company",
    "title": "Artisan Spice Company",
    "description": "Family-owned spice shop with hand-blended seasonings and rare ingredients from around the world.",
    "image": "https://images.unsplash.com/photo-1596040947120-de2ad7bf75ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "heritage-bakery",
    "title": "Heritage Bakery",
    "description": "Traditional European-style bakery offering fresh breads, pastries, and seasonal specialties.",
    "image": "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "corner-cheese-shop",
    "title": "Corner Cheese Shop",
    "description": "Curated selection of local and imported cheeses with knowledgeable staff and tasting opportunities.",
    "image": "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export default async function MarketsAndShopsIndexPage() {
  let posts: OokPost[] = FALLBACK_POSTS;
  try {
    const result = await getOokPostsByCategory('markets-and-shops');
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
        title="Markets & Shops"
        description="Discover my favorite markets, specialty food shops, and local purveyors. From farmers markets to artisan shops, these are the places where I source the best ingredients."
      />
      <GridSection
        title="Market & Shop Reviews"
        posts={posts}
        baseSlug="/ook/markets-and-shops"
        isFirstSection={true}
      />
    </main>
  );
}
