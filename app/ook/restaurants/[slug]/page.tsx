import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader, Takeaway } from '@/components';
import { getOokPostBySlug, getOokPostsByCategory } from '@/lib/api/ook';
import type { OokContentType } from '@/components/ook-header';

export const revalidate = 3600;

interface Restaurant {
  name: string; city: string; state: string;
  priceRange: string; marketType: string; specialty: string; openDays: string;
  slug: string; author: string; publishDate: string; image: string;
  description: string; content: string[]; keyTakeaways: string[];
}

function parseHtmlParagraphs(html: string): string[] {
  return html
    .split(/<\/p>|<br\s*\/?>/)
    .map(s => s.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
}

function getLocalData(): Restaurant[] {
  return [
    {
      name: "The Garden Bistro", city: "Portland", state: "OR",
      priceRange: "$$$", marketType: "fine-dining",
      specialty: "Farm-to-table cuisine with seasonal ingredients",
      openDays: "Tuesday–Saturday, 5pm–10pm",
      slug: "the-garden-bistro", author: "Amanda Lynn", publishDate: "October 15, 2025",
      image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A hidden gem with seasonal menu and intimate atmosphere.",
      content: ["Tucked away on a quiet side street downtown, The Garden Bistro is the kind of place you'd walk right past if you weren't looking for it.", "The moment you step inside, you're transported. Exposed brick walls are adorned with trailing pothos plants and warm Edison bulbs.", "The menu changes monthly based on what's available from local farms, but the philosophy remains constant: simple preparations that let quality ingredients shine.", "For my main, I chose the pan-roasted chicken breast with seasonal vegetables. The skin was impossibly crispy, almost shattering when I cut into it.", "What makes The Garden Bistro special isn't just the food—it's the care evident in every detail. The staff knows regulars by name but makes newcomers feel equally welcome."],
      keyTakeaways: ["Make reservations at least 2 weeks in advance", "Request a window table for the best ambiance", "The menu changes monthly—check their Instagram for current offerings", "Arrive slightly early to enjoy a drink at their small bar", "Don't skip dessert—the chocolate mousse is legendary"],
    },
    {
      name: "Corner Café", city: "Seattle", state: "WA",
      priceRange: "$$", marketType: "casual-dining",
      specialty: "Weekend brunch and legendary pancakes",
      openDays: "Daily, 7am–3pm",
      slug: "corner-cafe", author: "Amanda Lynn", publishDate: "September 29, 2025",
      image: "https://images.unsplash.com/photo-1670404160809-243ee6673d8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "The perfect Sunday brunch spot with legendary pancakes.",
      content: ["Sunday brunch is sacred in my household, and Corner Café has become our ritual destination.", "The space itself is charming without trying too hard. Mismatched vintage chairs, fresh flowers on every table.", "Let's talk about those pancakes. Their buttermilk pancakes have achieved legendary status in our town, and for good reason."],
      keyTakeaways: ["Arrive before 9am or after 11am to avoid peak wait times", "The porch tables are first-come-first-served", "Ask about their daily pancake specials"],
    },
    {
      name: "Le Petit Chef", city: "San Francisco", state: "CA",
      priceRange: "$$$$", marketType: "fine-dining",
      specialty: "Seven-course tasting menu with seasonal ingredients",
      openDays: "Tuesday–Saturday, 6pm–10pm",
      slug: "le-petit-chef", author: "Amanda Lynn", publishDate: "September 20, 2025",
      image: "https://images.unsplash.com/photo-1750943082012-efe6d2fd9e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A 7-course journey through seasonal ingredients and creativity.",
      content: ["Tasting menus intimidate some people. The commitment, the cost, the unknown. But when done right, they're transcendent.", "The evening began with an amuse-bouche that set the tone: a single, perfect scallop on a spoon, topped with citrus foam and edible flowers."],
      keyTakeaways: ["Reserve well in advance—these seats fill up fast", "Opt for the wine pairing to enhance each course", "Come with an open mind and empty stomach"],
    },
  ];
}

export async function generateStaticParams() {
  try {
    const result = await getOokPostsByCategory('restaurants');
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
  return { title: 'restaurant' };
}

export default async function RestaurantReviewPage({ params }: { params: Promise<{ slug: string }> }) {
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
            contentType={'restaurant' as OokContentType}
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
          contentType={'restaurant' as OokContentType}
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
        <Takeaway title="Dining Notes" items={local.keyTakeaways} />
      </SiteContainer>
    </main>
  );
}
