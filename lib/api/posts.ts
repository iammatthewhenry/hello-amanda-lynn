/**
 * Blog Post Data Fetching API
 * 
 * Server-side functions for fetching blog posts (In The Kitchen, Out of Kitchen, etc.)
 */

import { fetchGraphQL } from '@/lib/wordpress';
import {
  GET_ALL_POST_SLUGS,
  GET_POST_BY_SLUG,
  GET_POSTS_BY_CATEGORY,
  GET_ALL_POSTS,
} from '@/lib/queries/posts';
import type { WPPost, WPGraphQLConnection } from '@/lib/types/wordpress';

/**
 * Get all blog post slugs for generateStaticParams
 */
export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<Pick<WPPost, 'slug'>>;
    }>(GET_ALL_POST_SLUGS, {}, 3600);

    return data.posts.nodes.map((post) => post.slug);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  try {
    const data = await fetchGraphQL<{
      post: WPPost | null;
    }>(GET_POST_BY_SLUG, { slug }, 3600);

    return data.post;
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get posts by category slug
 */
export async function getPostsByCategory(
  categorySlug: string,
  first: number = 12,
  after?: string
): Promise<{
  posts: WPPost[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
} | null> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<WPPost>;
    }>(
      GET_POSTS_BY_CATEGORY,
      { categorySlug, first, after },
      3600
    );

    return {
      posts: data.posts.nodes,
      pageInfo: {
        hasNextPage: data.posts.pageInfo?.hasNextPage || false,
        endCursor: data.posts.pageInfo?.endCursor || '',
      },
    };
  } catch (error) {
    console.error(`Error fetching posts for category "${categorySlug}":`, error);
    return null;
  }
}

/**
 * Get all posts with pagination
 */
export async function getAllPosts(
  first: number = 12,
  after?: string
): Promise<{
  posts: WPPost[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
} | null> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<WPPost>;
    }>(GET_ALL_POSTS, { first, after }, 3600);

    return {
      posts: data.posts.nodes,
      pageInfo: {
        hasNextPage: data.posts.pageInfo?.hasNextPage || false,
        hasPreviousPage: data.posts.pageInfo?.hasPreviousPage || false,
        startCursor: data.posts.pageInfo?.startCursor || '',
        endCursor: data.posts.pageInfo?.endCursor || '',
      },
    };
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return null;
  }
}
