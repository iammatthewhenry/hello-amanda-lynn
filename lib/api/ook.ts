/**
 * Out of Kitchen Data Fetching API
 *
 * Fetches from the `out-of-kitchen` Custom Post Type in WordPress.
 * Category slugs: food-destinations | food-festivals | markets-and-shops | restaurants | wineries
 */

import { fetchGraphQL } from '@/lib/wordpress';
import {
  GET_ALL_OOK_SLUGS,
  GET_ALL_OOK_POSTS,
  GET_OOK_POSTS_BY_CATEGORY,
  GET_OOK_POST_BY_SLUG,
  GET_ALL_OOK_CATEGORIES,
} from '@/lib/queries/ook';
import type { WPOokPost, WPOokCategoryTerm, WPGraphQLConnection } from '@/lib/types/wordpress';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OokPostsResult {
  posts: WPOokPost[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
}

export type OokCategorySlug =
  | 'food-destinations'
  | 'food-festivals'
  | 'markets-and-shops'
  | 'restaurants'
  | 'wineries';

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

/** Get all OOK slugs for generateStaticParams */
export async function getAllOokSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{ outOfKitchens: WPGraphQLConnection<Pick<WPOokPost, 'slug'>> }>(
    GET_ALL_OOK_SLUGS,
    {},
    3600
  );
  return data?.outOfKitchens?.nodes?.map((p) => p.slug) ?? [];
}

/** Get all OOK posts (used by the /ook overview page) */
export async function getAllOokPosts(
  first = 200,
  after?: string
): Promise<OokPostsResult | null> {
  const data = await fetchGraphQL<{ outOfKitchens: WPGraphQLConnection<WPOokPost> }>(
    GET_ALL_OOK_POSTS,
    { first, after },
    3600
  );
  if (!data) return null;
  return {
    posts: data.outOfKitchens.nodes,
    pageInfo: {
      hasNextPage: data.outOfKitchens.pageInfo?.hasNextPage ?? false,
      endCursor: data.outOfKitchens.pageInfo?.endCursor ?? '',
    },
  };
}

/** Get OOK posts filtered by a category slug */
export async function getOokPostsByCategory(
  categorySlug: OokCategorySlug | string,
  first = 100,
  after?: string
): Promise<OokPostsResult | null> {
  const data = await fetchGraphQL<{ outOfKitchens: WPGraphQLConnection<WPOokPost> }>(
    GET_OOK_POSTS_BY_CATEGORY,
    { categorySlug, first, after },
    3600
  );
  if (!data) return null;
  return {
    posts: data.outOfKitchens.nodes,
    pageInfo: {
      hasNextPage: data.outOfKitchens.pageInfo?.hasNextPage ?? false,
      endCursor: data.outOfKitchens.pageInfo?.endCursor ?? '',
    },
  };
}

/** Get a single OOK post by slug */
export async function getOokPostBySlug(slug: string): Promise<WPOokPost | null> {
  const data = await fetchGraphQL<{ outOfKitchen: WPOokPost | null }>(
    GET_OOK_POST_BY_SLUG,
    { slug },
    3600
  );
  return data?.outOfKitchen ?? null;
}

/** Get all ook-categories taxonomy terms */
export async function getAllOokCategories(): Promise<WPOokCategoryTerm[]> {
  const data = await fetchGraphQL<{ ookCategories: WPGraphQLConnection<WPOokCategoryTerm> }>(
    GET_ALL_OOK_CATEGORIES,
    {},
    86400
  );
  return data?.ookCategories?.nodes ?? [];
}
