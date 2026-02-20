'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import SiteContainer from '@/components/layout/site-container';
import { OokHeader, Takeaway } from '@/components';

// ===================================================================
// TYPES
// ===================================================================
interface Winery {
  name: string;
  city: string;
  state: string;
  type: 'boutique' | 'family-owned' | 'estate' | 'organic' | 'traditional';
  specialty: string;
  openDays?: string;
  slug: string;
  author: string;
  publishDate: string;
  image: string;
  description: string;
  content: string[];
  visitTips: string[];
}

// ===================================================================
// MOCK DATA
// ===================================================================
const getWineryBySlug = (slug: string): Winery | undefined => {
  const wineries: Winery[] = [
    {
      name: "Sunset Ridge Winery",
      city: "Sonoma",
      state: "California",
      type: "boutique",
      specialty: "Small-batch Pinot Noir and Chardonnay with organic farming practices",
      openDays: "Thursday-Sunday, 11am-5pm",
      slug: "sunset-ridge-winery",
      author: "Amanda Lynn",
      publishDate: "September 2025",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A family-owned boutique winery nestled in the rolling hills of Sonoma County, specializing in terroir-driven wines that capture the unique character of their sustainably farmed vineyard.",
      content: [
        "Driving up the gravel road to Sunset Ridge Winery feels like discovering a hidden secret. This family-owned boutique operation sits on 15 acres of prime Sonoma County hillside, where fourth-generation winemaker Elena Martinez has been crafting exceptional wines that truly express their terroir since taking over from her grandmother in 2018.",
        "What sets Sunset Ridge apart isn't just the quality of their wines—it's their unwavering commitment to sustainable and organic farming practices. Elena converted the entire vineyard to organic certification in 2019, eliminating synthetic pesticides and fertilizers in favor of cover crops, beneficial insects, and biodynamic preparations that work in harmony with the natural ecosystem.",
        "The tasting experience here is intimate and personal, limited to just eight guests per session to ensure quality one-on-one time with Elena or her assistant winemaker, Carlos. They'll walk you through their current releases while sharing the stories behind each wine—how the 2022 Pinot Noir benefited from an unusually cool summer, or why their single-vineyard Chardonnay spends 18 months in French oak to develop its signature butterscotch notes.",
        "The flagship wine, their Estate Pinot Noir, showcases everything Elena has learned about this challenging grape variety. Light in color but complex in flavor, it offers notes of cherry, earth, and spice with a silky texture that speaks to the careful attention paid to every step of the winemaking process. The Chardonnay, fermented in concrete eggs and aged in neutral French oak, displays beautiful minerality and bright acidity.",
        "Beyond the wine itself, what makes Sunset Ridge special is Elena's passion for education and hospitality. She genuinely wants visitors to understand not just what they're tasting, but why it tastes that way. The hour-long tasting sessions often stretch to 90 minutes as Elena shares insights about soil composition, harvest timing, and the subtle art of blending that makes each vintage unique."
      ],
      visitTips: [
        "Book tastings at least two weeks in advance—they only accommodate 8 guests per session",
        "Ask about their vineyard tour—Elena often leads these personally on weekends",
        "The golden hour tasting (3-4pm) offers stunning light and views across the valley",
        "Join their wine club for access to limited-production bottles and exclusive events",
        "Bring a designated driver—the mountain roads can be winding"
      ]
    },
    {
      name: "Heritage Valley Estates",
      city: "Paso Robles",
      state: "California", 
      type: "family-owned",
      specialty: "Bold reds and innovative blends from estate-grown grapes",
      openDays: "Daily, 10am-6pm",
      slug: "heritage-valley-estates",
      author: "Amanda Lynn",
      publishDate: "October 2025",
      image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      description: "A dynamic family winery in Paso Robles creating bold, food-friendly wines with a focus on sustainable practices and innovative winemaking techniques.",
      content: [
        "Heritage Valley Estates represents the new generation of Paso Robles winemaking—respectful of tradition but unafraid to innovate. Brothers Marcus and David Chen took over their family's 40-acre vineyard in 2020 and have been quietly revolutionizing their approach to both grape growing and winemaking.",
        "The tasting room occupies a converted 1940s barn with soaring ceilings and floor-to-ceiling windows that frame views of the surrounding vineyard blocks. The space feels modern but warm, with reclaimed wood tables and industrial lighting that creates an inviting atmosphere for serious wine tasting.",
        "Their wine portfolio focuses on bold reds that pair beautifully with food—Cabernet Sauvignon, Syrah, and innovative blends that showcase the diversity of Paso Robles terroir. Their signature wine, 'Convergence,' is a Rhône-style blend that changes year to year based on what the vintage gives them."
      ],
      visitTips: [
        "Try their wine and food pairing experience on weekends",
        "The barrel tasting room offers current releases straight from the source",
        "Ask about their sustainable farming practices—they're pioneers in water conservation"
      ]
    }
  ];

  return wineries.find(w => w.slug === slug);
};

// ===================================================================
// PAGE COMPONENT
// ===================================================================
export default function WineryPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const winery = getWineryBySlug(slug);

  if (!winery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Winery Not Found</h1>
          <Link href="/ook/wineries" className="text-green hover:text-green/70">
            ← Back to Wineries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      {/* Header Section */}
      <SiteContainer>
        <OokHeader
          title={winery.name}
          image={winery.image}
          contentType="winery"
          location={{
            city: winery.city,
            state: winery.state
          }}
          author={winery.author}
          publishDate={winery.publishDate}
          marketType={winery.type}
          specialty={winery.specialty}
          openDays={winery.openDays}
          shareProps={{
            title: winery.name,
            description: winery.description,
            imageUrl: winery.image
          }}
        />
      </SiteContainer>

      {/* Article Content */}
      <SiteContainer>
        <section className="mb-12">
          <div className="prose prose-lg max-w-none pt-3">
            {winery.content.map((paragraph, index) => (
              <div key={index}>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
                {/* Advertisement after 3rd paragraph */}
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

      {/* Visit Tips */}
      <SiteContainer>
        <Takeaway 
          title="Visit Tips"
          items={winery.visitTips}
        />
      </SiteContainer>
    </main>
  );
}