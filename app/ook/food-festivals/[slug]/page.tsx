import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader, Takeaway } from '@/components';
import { getOokPostBySlug, getOokPostsByCategory } from '@/lib/api/ook';
import type { OokContentType } from '@/components/ook-header';

export const revalidate = 3600;

interface FoodFestival {
  name: string; city: string; state: string;
  type: string; specialty: string; festivalDates?: string; openDays?: string;
  slug: string; author: string; publishDate: string; image: string;
  description: string; content: string[]; festivalTips: string[];
}

function parseHtmlParagraphs(html: string): string[] {
  return html
    .split(/<\/p>|<br\s*\/?>/)
    .map(s => s.replace(/<[^>]+>/g, '').trim())
    .filter(Boolean);
}

function getLocalData(): FoodFestival[] {
  return [
    {
      name: "International Food Fair", city: "San Francisco", state: "California",
      type: "cultural", specialty: "Global cuisine celebration featuring dishes from 25+ countries",
      festivalDates: "July 5-7, 2025", openDays: "July 5-7, 2025",
      slug: "international-food-fair", author: "Amanda Lynn", publishDate: "July 2025",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "San Francisco's premier multicultural food festival transforms Union Square into a global marketplace, featuring authentic cuisines from over 25 countries.",
      content: ["The International Food Fair is where San Francisco's incredible diversity comes alive through food.", "What makes this festival extraordinary is its commitment to authenticity.", "The cooking demonstrations are educational journeys through global culinary traditions.", "The festival's layout encourages exploration and cultural exchange.", "What sets this festival apart from others is its educational mission."],
      festivalTips: ["Arrive on opening day to beat the crowds and get first pick of vendors", "Purchase the tasting passport for discounted access to multiple vendors", "The cooking demonstrations fill up quickly—arrive 30 minutes early", "Wear comfortable shoes and bring a reusable bag for purchases", "Save room for the dessert village in the south corner—it's unmissable"],
    },
    {
      name: "Annual Harvest Festival", city: "Napa Valley", state: "California",
      type: "seasonal", specialty: "Farm-to-table dining celebrating the autumn harvest",
      festivalDates: "October 2025", openDays: "October 2025",
      slug: "harvest-festival", author: "Amanda Lynn", publishDate: "October 2025",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A celebration of local produce, artisanal foods, and seasonal flavors.",
      content: ["The harvest festival is a true farm-to-table experience that celebrates the bounty of the season.", "Local farmers bring their finest produce, and chefs demonstrate seasonal cooking techniques.", "Wine pairings complement every dish, showcasing the region's exceptional vintages.", "The atmosphere is festive and educational, perfect for food lovers of all ages."],
      festivalTips: ["Book tickets well in advance as this event sells out quickly", "The Saturday farmer's market annex opens at 8am for early birds", "Ask vendors about their growing practices—most love to share their stories", "Pair the event with a winery visit for a full Napa Valley experience"],
    },
  ];
}

export async function generateStaticParams() {
  try {
    const result = await getOokPostsByCategory('food-festivals');
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
  return { title: 'food-festival' };
}

export default async function FoodFestivalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
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
            contentType={'food-festival' as OokContentType}
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
          contentType={'food-festival' as OokContentType}
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
        <Takeaway title="Festival Tips" items={local.festivalTips} />
      </SiteContainer>
    </main>
  );
}
