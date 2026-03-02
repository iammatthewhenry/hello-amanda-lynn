import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BlogPostTemplate, Container, Breadcrumbs } from '@/components';
import { getKitchenPostBySlug, getAllKitchenSlugs } from '@/lib/api/kitchen';
import { inTheKitchenPosts } from '@/lib/data/blog-posts';

// ---------------------------------------------------------------------------
// Static paths
// ---------------------------------------------------------------------------

export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const wpSlugs = await getAllKitchenSlugs();
    if (wpSlugs.length > 0) return wpSlugs.map((slug) => ({ slug }));
  } catch (e) {
    console.error('generateStaticParams kitchen: WP unavailable', e);
  }
  return Object.keys(inTheKitchenPosts).map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const wpPost = await getKitchenPostBySlug(slug);
  if (wpPost) {
    const description = wpPost.excerpt?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '';
    return {
      title: wpPost.title,
      description,
      openGraph: {
        title: wpPost.title,
        description,
        images: wpPost.featuredImage ? [{ url: wpPost.featuredImage.node.sourceUrl }] : [],
        type: 'article',
        publishedTime: wpPost.date,
      },
    };
  }

  const local = inTheKitchenPosts[slug];
  if (local) {
    return { title: local.title, description: local.description };
  }

  return { title: 'Post Not Found' };
}

// ---------------------------------------------------------------------------
// Helper: parse WP HTML content → paragraphs array
// ---------------------------------------------------------------------------

function parseHtmlParagraphs(html: string): string[] {
  return html
    .split(/<\/p>/i)
    .map((chunk) => chunk.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function InTheKitchenDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 1 — Try WordPress
  const wpPost = await getKitchenPostBySlug(slug);
  if (wpPost) {
    const paragraphs = wpPost.content ? parseHtmlParagraphs(wpPost.content) : [];
    const publishedDate = new Date(wpPost.date).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
    const imageUrl = wpPost.featuredImage?.node.sourceUrl ?? '';
    const description = wpPost.excerpt?.replace(/<[^>]+>/g, '').trim() ?? paragraphs[0] ?? '';

    return (
      <main>
        <Container>
          <Breadcrumbs
            items={[
              { label: 'In The Kitchen', href: '/in-the-kitchen' },
              { label: wpPost.title },
            ]}
          />
        </Container>

        <BlogPostTemplate
          image={imageUrl}
          title={wpPost.title}
          author={wpPost.author?.node.name ?? 'Amanda Lynn'}
          publishedDate={publishedDate}
          metaDetails={null}
          description={description}
          content={paragraphs}
          shareTitle={wpPost.title}
          shareDescription={description}
          shareImageUrl={imageUrl}
        />

      </main>
    );
  }

  // 2 — Fall back to local mock data
  const post = inTheKitchenPosts[slug];
  if (!post) notFound();

  return (
    <main>
      <Container>
        <Breadcrumbs
          items={[
            { label: 'In The Kitchen', href: '/in-the-kitchen' },
            { label: post.title },
          ]}
        />
      </Container>

      <BlogPostTemplate
        image={post.image}
        title={post.title}
        author={post.author}
        publishedDate={post.publishedDate}
        metaDetails={
          <span>
            {post.category} &bull; {post.readTime}
          </span>
        }
        description={post.description}
        content={post.content}
        tipSection={
          post.tips && post.tips.length > 0
            ? { title: 'Key Takeaways', tips: post.tips }
            : undefined
        }
        shareTitle={post.title}
        shareDescription={post.description}
        shareImageUrl={post.image}
      />

    </main>
  );
}
