// app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { Inter, Montserrat, Tinos } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

// ===================================================================
// ENVIRONMENT VARIABLES
// ===================================================================
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://amandalynn.com';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// ===================================================================
// FONTS - Using next/font
// ===================================================================
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: [
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'arial',
  ],
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'arial'],
});

const tinos = Tinos({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-tinos',
  display: 'swap',
  preload: false,
  fallback: ['Georgia', 'Times New Roman', 'serif'],
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
    'Discover delicious recipes, cooking tips, and food stories from Amanda Lynn. From quick weeknight dinners to impressive desserts, find inspiration for every meal.',

  keywords: [
    'food blog',
    'recipes',
    'cooking',
    'baking',
    'healthy meals',
    'Amanda Lynn',
    'food photography',
    'meal planning',
  ],

  authors: [{ name: 'Amanda Lynn', url: SITE_URL }],
  creator: 'Amanda Lynn',
  publisher: 'Amanda Lynn',

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

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Amanda Lynn Food Blog',
    title: 'Amanda Lynn - Food Blog & Recipes',
    description: 'Discover delicious recipes and cooking inspiration',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Amanda Lynn Food Blog',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@amandalynn',
    creator: '@amandalynn',
    title: 'Amanda Lynn - Food Blog & Recipes',
    description: 'Discover delicious recipes and cooking inspiration',
    images: ['/images/twitter-image.jpg'],
  },

  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },

  alternates: {
    canonical: SITE_URL,
  },

  category: 'food',
};

// ===================================================================
// VIEWPORT
// ===================================================================
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7a9b8e' },
    { media: '(prefers-color-scheme: dark)', color: '#7a9b8e' },
  ],
};

// ===================================================================
// ROOT LAYOUT COMPONENT
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
      <head>
        {/* Preconnect */}
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Google Analytics (Next 15 safe) */}
        {GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>

      <body className="min-h-screen flex flex-col">
        {/* Skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-green focus:text-white focus:rounded"
        >
          Skip to main content
        </a>

        <Header />

        <div id="main-content" className="flex-1">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
