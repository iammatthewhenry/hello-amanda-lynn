/**
 * Page Data Fetching API
 * 
 * Server-side functions for fetching WordPress pages (About, Contact, Terms, etc.)
 */

import { fetchGraphQL } from '@/lib/wordpress';
import {
  GET_ALL_PAGE_SLUGS,
  GET_PAGE_BY_SLUG,
  GET_PAGE_BY_ID,
} from '@/lib/queries/pages';
import type { WPPage, WPGraphQLConnection } from '@/lib/types/wordpress';

/**
 * Get all page slugs for generateStaticParams
 */
export async function getAllPageSlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{
      pages: WPGraphQLConnection<Pick<WPPage, 'slug'>>;
    }>(GET_ALL_PAGE_SLUGS, {}, 3600);

    return data.pages.nodes.map((page) => page.slug);
  } catch (error) {
    console.error('Error fetching page slugs:', error);
    return [];
  }
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  try {
    const data = await fetchGraphQL<{
      page: WPPage | null;
    }>(GET_PAGE_BY_SLUG, { slug }, 3600);

    return data.page;
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get a single page by database ID
 */
export async function getPageById(id: number): Promise<WPPage | null> {
  try {
    const data = await fetchGraphQL<{
      page: WPPage | null;
    }>(GET_PAGE_BY_ID, { id }, 3600);

    return data.page;
  } catch (error) {
    console.error(`Error fetching page with ID ${id}:`, error);
    return null;
  }
}
