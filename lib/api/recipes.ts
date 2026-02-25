/**
 * Recipe Data Fetching API
 * 
 * Server-side functions for fetching recipe data from WordPress.
 * TODO: Update to use Recipe CPT once registered in WordPress.
 */

import { fetchGraphQL } from '@/lib/wordpress';
import {
  GET_ALL_RECIPE_SLUGS,
  GET_RECIPE_BY_SLUG,
  GET_RECIPES_BY_CATEGORY,
  GET_ALL_RECIPES,
  SEARCH_RECIPES,
} from '@/lib/queries/recipes';
import type { WPPost, WPRecipe, WPGraphQLConnection } from '@/lib/types/wordpress';

/**
 * Get all recipe slugs for generateStaticParams
 * Returns array of slugs for static generation
 */
export async function getAllRecipeSlugs(): Promise<string[]> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<Pick<WPPost, 'slug'>>;
    }>(GET_ALL_RECIPE_SLUGS, {}, 3600);

    return data.posts.nodes.map((post) => post.slug);
  } catch (error) {
    console.error('Error fetching recipe slugs:', error);
    return [];
  }
}

/**
 * Get a single recipe by slug
 * 
 * TODO: Update to return WPRecipe with custom fields once CPT is registered
 */
export async function getRecipeBySlug(slug: string): Promise<WPPost | null> {
  try {
    const data = await fetchGraphQL<{
      post: WPPost | null;
    }>(GET_RECIPE_BY_SLUG, { slug }, 3600);

    return data.post;
  } catch (error) {
    console.error(`Error fetching recipe with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Get recipes filtered by category slug
 */
export async function getRecipesByCategory(
  categorySlug: string,
  first: number = 12,
  after?: string
): Promise<{
  recipes: WPPost[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
} | null> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<WPPost>;
    }>(
      GET_RECIPES_BY_CATEGORY,
      { categorySlug, first, after },
      3600
    );

    return {
      recipes: data.posts.nodes,
      pageInfo: {
        hasNextPage: data.posts.pageInfo?.hasNextPage || false,
        endCursor: data.posts.pageInfo?.endCursor || '',
      },
    };
  } catch (error) {
    console.error(`Error fetching recipes for category "${categorySlug}":`, error);
    return null;
  }
}

/**
 * Get all recipes with pagination
 */
export async function getAllRecipes(
  first: number = 12,
  after?: string
): Promise<{
  recipes: WPPost[];
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
    }>(GET_ALL_RECIPES, { first, after }, 3600);

    return {
      recipes: data.posts.nodes,
      pageInfo: {
        hasNextPage: data.posts.pageInfo?.hasNextPage || false,
        hasPreviousPage: data.posts.pageInfo?.hasPreviousPage || false,
        startCursor: data.posts.pageInfo?.startCursor || '',
        endCursor: data.posts.pageInfo?.endCursor || '',
      },
    };
  } catch (error) {
    console.error('Error fetching all recipes:', error);
    return null;
  }
}

/**
 * Search recipes by keyword
 */
export async function searchRecipes(
  searchTerm: string,
  first: number = 12
): Promise<WPPost[] | null> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<WPPost>;
    }>(
      SEARCH_RECIPES,
      { search: searchTerm, first },
      60 // Short cache for search results
    );

    return data.posts.nodes;
  } catch (error) {
    console.error(`Error searching recipes for "${searchTerm}":`, error);
    return null;
  }
}
