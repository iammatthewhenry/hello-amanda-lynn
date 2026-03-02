import type { Metadata } from 'next';
import { PageHeader, GridSection } from '@/components';
import { getOokPostsByCategory } from '@/lib/api/ook';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Wineries',
  description: 'Beautiful wineries and tasting rooms worth visiting — explore terroir, varietals, and unforgettable wine experiences.',
};

interface OokPost {
  slug: string;
  title: string;
  description: string;
  image: string;
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

const FALLBACK_POSTS: OokPost[] = [
  {
    "slug": "sunset-ridge-winery",
    "title": "Sunset Ridge Winery",
    "description": "Small-batch Pinot Noir and Chardonnay with organic farming practices.",
    "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    "slug": "heritage-valley-estates",
    "title": "Heritage Valley Estates",
    "description": "Bold reds and innovative blends from estate-grown grapes.",
    "image": "https://images.unsplash.com/photo-1547036967-23d11aacaee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export default async function WineriesIndexPage() {
  let posts: OokPost[] = FALLBACK_POSTS;
  try {
    const result = await getOokPostsByCategory('wineries');
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
        title="Wineries & Tasting Rooms"
        description="Discover exceptional wineries & tasting rooms and taste the passion behind every bottle. From boutique family operations to innovative estates, explore the places where great wine stories begin."
      />
      <GridSection
        title="Winery Reviews"
        posts={posts}
        baseSlug="/ook/wineries"
        isFirstSection={true}
      />
    </main>
  );
}
