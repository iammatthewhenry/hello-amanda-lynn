/**
 * Slider Data Fetching API
 * 
 * Server-side function for fetching slider data from WordPress Slider Manager plugin.
 */

import { fetchGraphQL } from '@/lib/wordpress';
import { GET_SLIDER_ITEMS } from '@/lib/queries/slider';
import type { HeroSlide } from '@/components/hero-slider';

/**
 * WordPress GraphQL response type for slider items
 */
interface WPSliderPost {
  databaseId: number;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string | null;
    };
  } | null;
  contentType: {
    node: {
      name: string;
    };
  } | null;
}

interface SliderResponse {
  sliderManager: WPSliderPost[] | null;
}

/**
 * Strip HTML tags from a string
 */
function stripHtml(html: string | null): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Map WordPress content type name to display category label
 */
function getCategoryLabel(contentTypeName: string | null): string {
  if (!contentTypeName) return 'FEATURED';
  
  const normalized = contentTypeName.toLowerCase();
  
  const categoryMap: Record<string, string> = {
    'post': 'FEATURED',
    'recipe': 'FEATURED RECIPE',
    'restaurant-review': 'RESTAURANT REVIEW',
    'kitchen-tip': 'IN THE KITCHEN',
  };
  
  return categoryMap[normalized] || contentTypeName.toUpperCase();
}

/**
 * Build the correct URL path based on content type
 */
function getSlideLink(contentTypeName: string | null, slug: string): string {
  if (!contentTypeName) return `/${slug}`;
  
  const normalized = contentTypeName.toLowerCase();
  
  const pathMap: Record<string, string> = {
    'recipe': `/recipes/${slug}`,
    'restaurant-review': `/out-of-kitchen/${slug}`,
    'kitchen-tip': `/in-the-kitchen/${slug}`,
    'post': `/blog/${slug}`,
  };
  
  return pathMap[normalized] || `/${slug}`;
}

/**
 * Fetch slider items from WordPress Slider Manager plugin
 * 
 * @returns Array of HeroSlide objects in the order returned by the plugin
 */
export async function getSliderItems(): Promise<HeroSlide[]> {
  try {
    const data = await fetchGraphQL<SliderResponse>(
      GET_SLIDER_ITEMS,
      {},
      300 // Revalidate every 5 minutes (300 seconds)
    );
    
    // Return empty array if no slider data
    if (!data.sliderManager || data.sliderManager.length === 0) {
      return [];
    }
    
    // Transform WPGraphQL posts to HeroSlide objects
    const slides: HeroSlide[] = data.sliderManager
      .filter((post) => post.featuredImage?.node?.sourceUrl) // Only include posts with featured images
      .map((post) => ({
        id: post.databaseId.toString(),
        image: post.featuredImage!.node.sourceUrl,
        alt: post.featuredImage!.node.altText || post.title,
        category: getCategoryLabel(post.contentType?.node?.name || null),
        title: post.title,
        description: stripHtml(post.excerpt),
        link: getSlideLink(post.contentType?.node?.name || null, post.slug),
      }));
    
    return slides;
  } catch (error) {
    console.error('Error fetching slider items:', error);
    // Return empty array on error - HeroSlider will use its defaults
    return [];
  }
}
