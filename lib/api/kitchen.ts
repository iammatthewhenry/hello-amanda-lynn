/**
 * In The Kitchen Data Fetching API
 *
 * Fetches from the `in-the-kitchen` Custom Post Type in WordPress.
 */

import { fetchGraphQL } from '@/lib/wordpress';
import {
  GET_ALL_KITCHEN_SLUGS,
  GET_ALL_KITCHEN_POSTS,
  GET_KITCHEN_POST_BY_SLUG,
} from '@/lib/queries/kitchen';
import type { WPKitchenPost, WPGraphQLConnection } from '@/lib/types/wordpress';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface KitchenPostsResult {
  posts: WPKitchenPost[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
}

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

/** Get all kitchen post slugs for generateStaticParams */
export async function getAllKitchenSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{ inTheKitchens: WPGraphQLConnection<Pick<WPKitchenPost, 'slug'>> }>(
    GET_ALL_KITCHEN_SLUGS,
    {},
    3600
  );
  return data?.inTheKitchens?.nodes?.map((p) => p.slug) ?? [];
}

/** Get all kitchen posts with optional pagination */
export async function getAllKitchenPosts(
  first = 100,
  after?: string
): Promise<KitchenPostsResult | null> {
  const data = await fetchGraphQL<{ inTheKitchens: WPGraphQLConnection<WPKitchenPost> }>(
    GET_ALL_KITCHEN_POSTS,
    { first, after },
    3600
  );
  if (!data) return null;
  return {
    posts: data.inTheKitchens.nodes,
    pageInfo: {
      hasNextPage: data.inTheKitchens.pageInfo?.hasNextPage ?? false,
      endCursor: data.inTheKitchens.pageInfo?.endCursor ?? '',
    },
  };
}

/** Get a single kitchen post by slug */
export async function getKitchenPostBySlug(slug: string): Promise<WPKitchenPost | null> {
  const data = await fetchGraphQL<{ inTheKitchen: WPKitchenPost | null }>(
    GET_KITCHEN_POST_BY_SLUG,
    { slug },
    3600
  );
  return data?.inTheKitchen ?? null;
}
