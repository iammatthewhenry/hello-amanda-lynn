import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat, Tinos } from 'next/font/google';
import { Header, Footer } from '@/components';
import SiteContainer from '@/components/layout/site-container';
import GlobalBreadcrumbs from '@/components/layout/global-breadcrumbs';
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
    default: 'Amanda Lynn - Food Blog & Recipes',
    template: '%s | Amanda Lynn',
  },
  description:
    'Discover delicious recipes, cooking tips, and food stories from Amanda Lynn.',
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
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-green text-white px-4 py-2 rounded"
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
      </body>
    </html>
  );
}
