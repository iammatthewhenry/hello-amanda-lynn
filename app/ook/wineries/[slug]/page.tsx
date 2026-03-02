import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader, Takeaway } from '@/components';
import { getOokPostBySlug, getOokPostsByCategory } from '@/lib/api/ook';
import type { OokContentType } from '@/components/ook-header';

export const revalidate = 3600;

interface Winery {
  name: string; city: string; state: string;
  type: string; specialty: string; openDays?: string;
  slug: string; author: string; publishDate: string; image: string;
  description: string; content: string[]; visitTips: string[];
}

function parseHtmlParagraphs(html: string): string[] {
  return html
    .split(/<\/p>|<br\s*\/?>/)
    .map(s => s.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
}

function getLocalData(): Winery[] {
  return [
    {
      name: "Sunset Ridge Winery", city: "Sonoma", state: "California",
      type: "boutique", specialty: "Small-batch Pinot Noir and Chardonnay with organic farming practices",
      openDays: "Thursday-Sunday, 11am-5pm",
      slug: "sunset-ridge-winery", author: "Amanda Lynn", publishDate: "September 2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A family-owned boutique winery nestled in the rolling hills of Sonoma County, specializing in terroir-driven wines.",
      content: ["Driving up the gravel road to Sunset Ridge Winery feels like discovering a hidden secret.", "What sets Sunset Ridge apart isn't just the quality of their wines—it's their unwavering commitment to sustainable and organic farming practices.", "The tasting experience here is intimate and personal, limited to just eight guests per session.", "The flagship wine, their Estate Pinot Noir, showcases everything Elena has learned about this challenging grape variety.", "Beyond the wine itself, what makes Sunset Ridge special is Elena's passion for education and hospitality."],
      visitTips: ["Make a reservation well in advance—sessions fill quickly on weekends", "Opt for the estate tour to walk the vineyard with Elena herself", "The Thursday evening 'sunset tasting' offers the most spectacular views", "Their wine club offers early access to new releases before they sell out", "Pack a picnic—the property has a designated area with vineyard views"],
    },
    {
      name: "Heritage Valley Estates", city: "Willamette Valley", state: "Oregon",
      type: "estate", specialty: "Bold reds and innovative blends from estate-grown grapes",
      openDays: "Daily, 10am–5pm",
      slug: "heritage-valley-estates", author: "Amanda Lynn", publishDate: "August 2025",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Bold reds and innovative blends from estate-grown grapes in the Willamette Valley.",
      content: ["Heritage Valley Estates represents the new generation of Oregon winemaking—bold, experimental, and deeply rooted in place.", "The estate's 80 acres span three distinct soil types, each contributing unique characteristics to the wines.", "Winemaker James Thornton approaches blending like a composer working with instruments.", "The tasting room is housed in a restored 1890s barn with exposed timber beams and floor-to-ceiling windows."],
      visitTips: ["Try the Collector's Reserve tasting for access to library wines", "Book a food and wine pairing session for the full estate experience", "The harvest season (September-October) offers unique behind-the-scenes access", "Ask about the barrel room tour—it's only available with advance booking"],
    },
  ];
}

export async function generateStaticParams() {
  try {
    const result = await getOokPostsByCategory('wineries');
    return (result?.posts ?? []).map(p => ({ slug: p.slug }));
  } catch {
    const data = getLocalData();
    return data.map(item => ({ slug: item.slug }));
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const wpPost = await getOokPostBySlug(slug);
  if (wpPost) {
    return {
      title: wpPost.title,
      description: wpPost.excerpt?.replace(/<[^>]+>/g, '').trim() ?? '',
    };
  }
  const local = getLocalData().find(item => item.slug === slug);
  if (local) return { title: local.name, description: local.description };
  return { title: 'winery' };
}

export default async function WineryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const wpPost = await getOokPostBySlug(slug);

  if (wpPost) {
    const paragraphs = parseHtmlParagraphs(wpPost.content ?? '');
    const description = wpPost.excerpt?.replace(/<[^>]+>/g, '').trim() ?? '';
    const publishDate = wpPost.date
      ? new Date(wpPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      : '';
    return (
      <main>
        <SiteContainer>
          <OokHeader
            title={wpPost.title}
            image={wpPost.featuredImage?.node?.sourceUrl ?? ''}
            contentType={'winery' as OokContentType}
            author="Amanda Lynn"
            publishDate={publishDate}
            shareProps={{ title: wpPost.title, description, imageUrl: wpPost.featuredImage?.node?.sourceUrl }}
          />
        </SiteContainer>
        <SiteContainer>
          <section className="mb-8">
            <p className="text-lg text-muted-foreground italic text-center">{description}</p>
          </section>
        </SiteContainer>
        <SiteContainer>
          <section className="mb-24">
            <div className="prose prose-lg max-w-none pt-[37px]">
              {paragraphs.map((paragraph, index) => (
                <div key={index}>
                  <p className="mb-6 text-muted-foreground leading-relaxed">{paragraph}</p>
                  {index === 2 && (
                    <div className="bg-gray-100 border border-gray-200 rounded-lg p-12 text-center mb-8">
                      <p className="text-sm text-gray-500 mb-2">Advertisement</p>
                      <p className="text-xs text-gray-400">728x90 Banner Ad</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </SiteContainer>
      </main>
    );
  }

  const local = getLocalData().find(item => item.slug === slug);
  if (!local) notFound();

  return (
    <main>
      <SiteContainer>
        <OokHeader
          title={local.name}
          image={local.image}
          contentType={'winery' as OokContentType}
          location={{ city: local.city, state: local.state }}
          author={local.author}
          publishDate={local.publishDate}
          specialty={local.specialty}
          openDays={local.openDays}
          shareProps={{ title: local.name, description: local.description, imageUrl: local.image }}
        />
      </SiteContainer>
      <SiteContainer>
        <section className="mb-8">
          <p className="text-lg text-muted-foreground italic text-center">{local.description}</p>
        </section>
      </SiteContainer>
      <SiteContainer>
        <section className="mb-24">
          <div className="prose prose-lg max-w-none pt-[37px]">
            {local.content.map((paragraph, index) => (
              <div key={index}>
                <p className="mb-6 text-muted-foreground leading-relaxed">{paragraph}</p>
                {index === 2 && (
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-12 text-center mb-8">
                    <p className="text-sm text-gray-500 mb-2">Advertisement</p>
                    <p className="text-xs text-gray-400">728x90 Banner Ad</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </SiteContainer>
      <SiteContainer>
        <Takeaway title="Tasting Notes" items={local.visitTips} />
      </SiteContainer>
    </main>
  );
}
