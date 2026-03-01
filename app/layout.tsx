export const runtime = 'edge';

import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat, Tinos } from 'next/font/google';
import { Header, Footer } from '@/components';
import SiteContainer from '@/components/layout/site-container';
import GlobalBreadcrumbs from '@/components/layout/global-breadcrumbs';
import { ToasterProvider } from '@/components/toaster-provider';
import { fetchGraphQL } from '@/lib/wordpress';
import { GET_AS_SEEN_ON_LOGOS } from '@/lib/queries/as-seen-on';
import './globals.css';

// ===================================================================
// ENVIRONMENT VARIABLES
// ===================================================================
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://amandalynn.com';

// ===================================================================
// TYPES
// ===================================================================
interface AsSeenOnLogoResponse {
  name: string;
  imageUrl: string;
  altText?: string;
  link?: string;
}

interface AsSeenOnLogosResponse {
  asSeenOnLogos: AsSeenOnLogoResponse[];
}

interface AsSeenOnLogo {
  name: string;
  image?: string;
  text?: string;
  altText?: string;
}

// ===================================================================
// FONTS
// ===================================================================
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

const tinos = Tinos({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tinos',
  display: 'swap',
});

// ===================================================================
// METADATA
// ===================================================================
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Hello Amanda Lynn - Food Blog & Recipes',
    template: '%s | Hello Amanda Lynn',
  },
  description:
    'Discover delicious recipes, cooking tips, restaurant reviews, and food stories from Amanda Lynn.',
  keywords: [
    'food blog',
    'recipes',
    'cooking tips',
    'restaurant reviews',
    'Amanda Lynn',
  ],
  authors: [{ name: 'Amanda Lynn', url: SITE_URL }],
  creator: 'Amanda Lynn',
};

// ===================================================================
// VIEWPORT
// ===================================================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

// ===================================================================
// ROOT LAYOUT
// ===================================================================
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let logos: AsSeenOnLogo[] = [];

  try {
    // ✅ CALL FUNCTION FIRST
    const response = await fetchGraphQL<AsSeenOnLogosResponse>(
      GET_AS_SEEN_ON_LOGOS,
      {},
      86400
    );

    // ✅ NULL SAFETY (required for Cloudflare)
    if (response?.asSeenOnLogos?.length) {
      logos = response.asSeenOnLogos.map((logo) => ({
        name: logo.name,
        image: logo.imageUrl,
        altText: logo.altText,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch As Seen On logos:', error);
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${tinos.variable}`}
    >
      <body className="min-h-screen bg-page text-foreground flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-green text-[#D4A5A5] px-4 py-2 rounded"
        >
          Skip to content
        </a>

        <Header />

        <main id="main-content" className="flex-1">
          <SiteContainer>
            <GlobalBreadcrumbs />
            {children}
          </SiteContainer>
        </main>

        <Footer logos={logos} />
        <ToasterProvider />
      </body>
    </html>
  );
}