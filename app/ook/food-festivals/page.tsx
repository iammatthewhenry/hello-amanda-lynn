import type { Metadata } from 'next';
import { PageHeader, GridSection } from '@/components';
import { getOokPostsByCategory } from '@/lib/api/ook';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Food Festivals',
  description: 'The best food festivals worth attending — a guide to celebrating local flavors, cultures, and culinary traditions.',
};

interface OokPost {
  slug: string;
  title: string;
  description: string;
  image: string;
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const FALLBACK_POSTS: OokPost[] = [
  {
    "slug": "harvest-festival",
    "title": "Annual Harvest Festival",
    "description": "A celebration of local produce, artisanal foods, and seasonal flavors in the heart of downtown.",
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "wine-and-dine",
    "title": "Wine & Dine Weekend",
    "description": "Three days of wine tastings, gourmet food trucks, and cooking demonstrations.",
    "image": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "street-food-night",
    "title": "Street Food Night Market",
    "description": "International street food vendors gather for a monthly celebration of global flavors.",
    "image": "https://images.unsplash.com/photo-1514933651103-005eec06c04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export default async function FoodFestivalsIndexPage() {
  let posts: OokPost[] = FALLBACK_POSTS;
  try {
    const result = await getOokPostsByCategory('food-festivals');
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
        title="Food Festivals"
        description="Join me at the most exciting food festivals and culinary events. From local harvest celebrations to international street food markets, discover where food culture comes alive."
      />
      <GridSection
        title="Festival Reviews"
        posts={posts}
        baseSlug="/ook/food-festivals"
        isFirstSection={true}
      />
    </main>
  );
}
