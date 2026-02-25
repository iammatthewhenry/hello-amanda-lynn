/**
 * SEO & Metadata Utility
 * 
 * Reusable functions for generating Next.js metadata objects for pages.
 * Provides consistent SEO structure across the site.
 */

import type { Metadata } from 'next';

const SITE_URL = 'https://helloamandalyn.com';
const SITE_NAME = 'hello Amanda Lynn';
const DEFAULT_DESCRIPTION = 'A modern food blog featuring recipes, restaurant reviews, and culinary adventures by Amanda Lynn.';

interface PageMetadataParams {
  title: string;
  description?: string;
  image?: string;
  slug?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

/**
 * Generate comprehensive metadata for a page
 * 
 * @param params - Page metadata parameters
 * @returns Next.js Metadata object
 */
export function generatePageMetadata({
  title,
  description,
  image,
  slug,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags,
}: PageMetadataParams): Metadata {
  const pageUrl = slug ? `${SITE_URL}/${slug}` : SITE_URL;
  const fullTitle = `${title} | ${SITE_NAME}`;
  const metaDescription = description || DEFAULT_DESCRIPTION;

  const metadata: Metadata = {
    title,
    description: metaDescription,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: pageUrl,
      siteName: SITE_NAME,
      type,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDescription,
      site: '@helloamandalyn', // Update with actual Twitter handle if available
      creator: '@helloamandalyn',
    },
    alternates: {
      canonical: pageUrl,
    },
  };

  // Add images if provided
  if (image) {
    metadata.openGraph = {
      ...metadata.openGraph,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    };
    metadata.twitter = {
      ...metadata.twitter,
      images: [image],
    };
  }

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      tags,
    };
  }

  return metadata;
}

/**
 * Generate metadata for recipe pages
 */
export function generateRecipeMetadata({
  title,
  description,
  image,
  slug,
  publishedDate,
  category,
  prepTime,
  cookTime,
}: {
  title: string;
  description: string;
  image?: string;
  slug: string;
  publishedDate?: string;
  category?: string;
  prepTime?: string;
  cookTime?: string;
}): Metadata {
  const metadata = generatePageMetadata({
    title,
    description,
    image,
    slug: `recipes/${slug}`,
    type: 'article',
    publishedTime: publishedDate,
    tags: category ? [category] : undefined,
  });

  // Add recipe-specific structured data
  // TODO: Add JSON-LD structured data for recipes once recipe CPT fields are available

  return metadata;
}

/**
 * Generate metadata for blog post pages (In The Kitchen, etc.)
 */
export function generatePostMetadata({
  title,
  excerpt,
  image,
  slug,
  publishedDate,
  author,
  categories,
}: {
  title: string;
  excerpt?: string;
  image?: string;
  slug: string;
  publishedDate?: string;
  author?: string;
  categories?: string[];
}): Metadata {
  return generatePageMetadata({
    title,
    description: excerpt,
    image,
    slug: `in-the-kitchen/${slug}`,
    type: 'article',
    publishedTime: publishedDate,
    author,
    tags: categories,
  });
}

/**
 * Generate metadata for category/listing pages
 */
export function generateCategoryMetadata({
  categoryName,
  description,
  image,
  slug,
}: {
  categoryName: string;
  description?: string;
  image?: string;
  slug: string;
}): Metadata {
  return generatePageMetadata({
    title: `${categoryName} Recipes`,
    description:
      description ||
      `Explore ${categoryName.toLowerCase()} recipes from hello Amanda Lynn - delicious, tested recipes for every occasion.`,
    image,
    slug: `recipes/${slug}`,
    type: 'website',
  });
}

/**
 * Generate default/fallback metadata
 */
export function generateDefaultMetadata(title: string = SITE_NAME): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    openGraph: {
      title,
      description: DEFAULT_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: DEFAULT_DESCRIPTION,
    },
    keywords: [
      'recipes',
      'food blog',
      'cooking',
      'Amanda Lynn',
      'restaurant reviews',
      'culinary',
      'food photography',
    ],
    authors: [{ name: 'Amanda Lynn' }],
    creator: 'Amanda Lynn',
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
}
