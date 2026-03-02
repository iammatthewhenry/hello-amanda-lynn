import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader, Takeaway } from '@/components';
import { getOokPostBySlug, getOokPostsByCategory } from '@/lib/api/ook';
import type { OokContentType } from '@/components/ook-header';

export const revalidate = 3600;

interface FoodDestination {
  name: string; city: string; state: string;
  type: string; specialty: string; openDays?: string;
  slug: string; author: string; publishDate: string; image: string;
  description: string; content: string[]; experienceTips: string[];
}

function parseHtmlParagraphs(html: string): string[] {
  return html
    .split(/<\/p>|<br\s*\/?>/)
    .map(s => s.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
}

function getLocalData(): FoodDestination[] {
  return [
    {
      name: "Wine Tasting at Sunset Vineyard", city: "Napa Valley", state: "California",
      type: "winery", specialty: "Award-winning Cabernet Sauvignon and artisan cheese pairings",
      openDays: "Daily, 11am–6pm", slug: "sunset-vineyard-tasting",
      author: "Amanda Lynn", publishDate: "September 2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A boutique family winery nestled in the rolling hills of Napa Valley, offering an intimate tasting experience with panoramic vineyard views and expertly crafted wines.",
      content: ["Driving up the winding gravel road to Sunset Vineyard, you immediately understand why this family-owned winery has captured the hearts of wine enthusiasts from around the world.", "The tasting room occupies a converted 1920s farmhouse, complete with wide-plank floors and French doors that open onto a wraparound porch.", "The tasting flight showcases five wines, each paired with artisanal cheeses sourced from local Sonoma County creameries.", "What sets Sunset Vineyard apart isn't just the quality of their wines, but the education that comes with each pour."],
      experienceTips: ["Book the sunset tasting for the most spectacular views and golden light", "Ask Elena about the vineyard tour—she personally leads weekend walks through the property", "Their wine club offers exclusive access to limited-production bottles", "The artisan cheese pairings are sourced from within 50 miles of the vineyard"],
    },
    {
      name: "Napa Valley Culinary Tour", city: "Napa", state: "California",
      type: "food-tour", specialty: "Farm-to-table dining and artisanal producers",
      openDays: "Daily", slug: "napa-valley-culinary-tour",
      author: "Amanda Lynn", publishDate: "August 2025",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A guided journey through wine country featuring farm-to-table dining and artisanal producers.",
      content: ["Napa Valley is synonymous with wine, but its culinary landscape extends far beyond the vineyard.", "Our guide led us through a morning of farmers market stops, artisan cheese tastings, and cooking demonstrations.", "The afternoon brought us to two Michelin-starred restaurants where we observed kitchen operations.", "By evening we understood why Napa has become one of the world's foremost food destinations."],
      experienceTips: ["Book the full-day tour for the most comprehensive experience", "Wear comfortable shoes—there's considerable walking between stops", "Come with an appetite and pace yourself throughout the day", "The cooking demonstration at the culinary school is not to be missed"],
    },
  ];
}

export async function generateStaticParams() {
  try {
    const result = await getOokPostsByCategory('food-destinations');
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
  return { title: 'food-destination' };
}

export default async function FoodDestinationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
            contentType={'food-destination' as OokContentType}
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
          contentType={'food-destination' as OokContentType}
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
        <Takeaway title="Travel Notes" items={local.experienceTips} />
      </SiteContainer>
    </main>
  );
}
