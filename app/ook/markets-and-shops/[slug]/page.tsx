import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader, Takeaway } from '@/components';
import { getOokPostBySlug, getOokPostsByCategory } from '@/lib/api/ook';
import type { OokContentType } from '@/components/ook-header';

export const revalidate = 3600;

interface MarketOrShop {
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

function getLocalData(): MarketOrShop[] {
  return [
    {
      name: "Pike Place Tea at The Rose Market", city: "Seattle", state: "Washington",
      type: "farmers-market", specialty: "Artisanal teas, local honey, and more",
      openDays: "Saturday & Sunday",
      slug: "pike-place-tea-rose-market", author: "Amanda Lynn", publishDate: "August 2025",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Tucked inside Seattle's iconic Pike Place Market, The Rose Market stall is a fragrant haven of loose-leaf teas, wildflower honeys, and small-batch fruit preserves.",
      content: ["Finding The Rose Market stall is half the adventure. Wedged between a flower vendor and a jam-maker on Pike Place's lower level.", "The tea selection spans more than 80 varieties sourced from small farms in Taiwan, Japan, Nepal, and Darjeeling.", "The honey table deserves equal attention. Dana sources directly from three Washington State apiaries.", "A rotating shelf of house-made preserves rounds out the offering: strawberry rhubarb jam in spring, peach ginger in late summer."],
      visitTips: ["Arrive early on Saturday morning for the freshest stock", "The Sunday selection is often slightly different—worth visiting both days", "Ask for a tea tasting before committing to a large purchase", "The honey tasting is free—don't leave without trying the blackberry blossom variety"],
    },
    {
      name: "Artisan Spice Company", city: "Portland", state: "Oregon",
      type: "specialty-shop", specialty: "Hand-blended seasonings and rare ingredients",
      openDays: "Tuesday–Saturday, 10am–6pm",
      slug: "artisan-spice-company", author: "Amanda Lynn", publishDate: "September 2025",
      image: "https://images.unsplash.com/photo-1596040947120-de2ad7bf75ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "Family-owned spice shop with hand-blended seasonings and rare ingredients from around the world.",
      content: ["Walking into the Artisan Spice Company is a sensory experience unlike any other in Portland.", "Owner Marcus Chen has spent two decades building relationships with spice farmers across 30 countries.", "The custom blend station is where the magic happens—bring a recipe and Marcus will create a personalized spice blend.", "Their selection of rare salts alone is worth the visit: Black Hawaiian, Himalayan pink, Icelandic geothermal, and a dozen others."],
      visitTips: ["Call ahead to book a custom blend session with Marcus", "Ask to smell before you buy—the staff encourages it", "Buy spices in smaller quantities for maximum freshness", "Their monthly spice subscription is excellent value for home cooks"],
    },
  ];
}

export async function generateStaticParams() {
  try {
    const result = await getOokPostsByCategory('markets-and-shops');
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
  return { title: 'markets-and-shops' };
}

export default async function MarketOrShopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
            contentType={'markets-and-shops' as OokContentType}
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
          contentType={'markets-and-shops' as OokContentType}
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
        <Takeaway title="Visit Tips" items={local.visitTips} />
      </SiteContainer>
    </main>
  );
}
