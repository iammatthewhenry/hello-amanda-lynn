import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat, Tinos } from 'next/font/google';
import { Header, Footer } from '@/components';
import SiteContainer from '@/components/layout/site-container';
import GlobalBreadcrumbs from '@/components/layout/global-breadcrumbs';
import { ToasterProvider } from '@/components/toaster-provider';
import './globals.css';

// ===================================================================
// ENVIRONMENT VARIABLES
// ===================================================================
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://amandalynn.com';

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
  keywords: ['food blog', 'recipes', 'cooking tips', 'restaurant reviews', 'Amanda Lynn'],
  authors: [{ name: 'Amanda Lynn', url: SITE_URL }],
  creator: 'Amanda Lynn',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Hello Amanda Lynn',
    title: 'Hello Amanda Lynn - Food Blog & Recipes',
    description: 'Discover delicious recipes, cooking tips, restaurant reviews, and food stories from Amanda Lynn.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Hello Amanda Lynn - Food Blog & Recipes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hello Amanda Lynn - Food Blog & Recipes',
    description: 'Discover delicious recipes, cooking tips, restaurant reviews, and food stories from Amanda Lynn.',
    images: [`${SITE_URL}/og-image.png`],
    creator: '@helloamandalynn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${tinos.variable}`}
    >
      <body className="min-h-screen bg-page text-foreground flex flex-col">

        {/* Skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-green text-[#D4A5A5] px-4 py-2 rounded"
        >
          Skip to content
        </a>

        <Header />

        {/* GLOBAL CONTENT WRAP */}
        <main id="main-content" className="flex-1">
          <SiteContainer>
            <GlobalBreadcrumbs />
            {children}
          </SiteContainer>
        </main>

        <Footer />
        <ToasterProvider />
      </body>
    </html>
  );
}
