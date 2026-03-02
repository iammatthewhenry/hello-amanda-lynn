import type { Metadata } from 'next';
import { PageHeader, GridSection } from '@/components';
import { getOokPostsByCategory } from '@/lib/api/ook';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Restaurant Reviews',
  description: 'Honest, passionate restaurant reviews from Amanda Lynn — finding the best dining experiences from cozy cafés to fine dining.',
};

interface OokPost {
  slug: string;
  title: string;
  description: string;
  image: string;
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const FALLBACK_POSTS: OokPost[] = [
  {
    "slug": "corner-cafe",
    "title": "Corner Café",
    "description": "The perfect Sunday brunch spot with legendary pancakes.",
    "image": "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "le-petit-chef",
    "title": "Le Petit Chef",
    "description": "A 7-course journey through seasonal ingredients and creativity.",
    "image": "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "the-garden-bistro",
    "title": "The Garden Bistro",
    "description": "A hidden gem with seasonal menu and intimate atmosphere.",
    "image": "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export default async function RestaurantReviewsIndexPage() {
  let posts: OokPost[] = FALLBACK_POSTS;
  try {
    const result = await getOokPostsByCategory('restaurants');
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
        title="Restaurant Reviews"
        description="My favorite dining experiences, from cozy cafés to fine dining establishments. Join me as I explore and share honest reviews of local and destination restaurants."
      />
      <GridSection
        title="Restaurant Reviews"
        posts={posts}
        baseSlug="/ook/restaurants"
        isFirstSection={true}
      />
    </main>
  );
}
