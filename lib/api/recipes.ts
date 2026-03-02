/**
 * Recipe Data Fetching API
 *
 * Fetches from the `recipes` Custom Post Type in WordPress.
 * Falls back to local recipe-data.ts when WP is unavailable.
 */

import { fetchGraphQL } from '@/lib/wordpress';
import {
  GET_ALL_RECIPE_SLUGS,
  GET_RECIPE_BY_SLUG,
  GET_RECIPES_BY_DISH,
  GET_ALL_RECIPES,
  GET_ALL_DISH_TERMS,
  SEARCH_RECIPES,
} from '@/lib/queries/recipes';
import type { WPRecipePost, WPDishTerm, WPGraphQLConnection } from '@/lib/types/wordpress';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RecipesResult {
  recipes: WPRecipePost[];
  pageInfo: { hasNextPage: boolean; hasPreviousPage: boolean; startCursor: string; endCursor: string };
}

export interface RecipesByDishResult {
  recipes: WPRecipePost[];
  pageInfo: { hasNextPage: boolean; endCursor: string };
}

// ---------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------

/** Get all recipe slugs for generateStaticParams */
export async function getAllRecipeSlugs(): Promise<string[]> {
  const data = await fetchGraphQL<{ recipes: WPGraphQLConnection<Pick<WPRecipePost, 'slug'>> }>(
    GET_ALL_RECIPE_SLUGS,
    {},
    3600
  );
  return data?.recipes?.nodes?.map((r) => r.slug) ?? [];
}

/** Get a single recipe by slug */
export async function getRecipeBySlug(slug: string): Promise<WPRecipePost | null> {
  const data = await fetchGraphQL<{ recipe: WPRecipePost | null }>(
    GET_RECIPE_BY_SLUG,
    { slug },
    3600
  );
  return data?.recipe ?? null;
}

/** Get all recipes with optional pagination */
export async function getAllRecipes(
  first = 24,
  after?: string
): Promise<RecipesResult | null> {
  const data = await fetchGraphQL<{ recipes: WPGraphQLConnection<WPRecipePost> }>(
    GET_ALL_RECIPES,
    { first, after },
    3600
  );
  if (!data) return null;
  return {
    recipes: data.recipes.nodes,
    pageInfo: {
      hasNextPage: data.recipes.pageInfo?.hasNextPage ?? false,
      hasPreviousPage: data.recipes.pageInfo?.hasPreviousPage ?? false,
      startCursor: data.recipes.pageInfo?.startCursor ?? '',
      endCursor: data.recipes.pageInfo?.endCursor ?? '',
    },
  };
}

/** Get recipes filtered by a dish taxonomy term slug */
export async function getRecipesByDish(
  dishSlug: string,
  first = 24,
  after?: string
): Promise<RecipesByDishResult | null> {
  const data = await fetchGraphQL<{ recipes: WPGraphQLConnection<WPRecipePost> }>(
    GET_RECIPES_BY_DISH,
    { dishSlug, first, after },
    3600
  );
  if (!data) return null;
  return {
    recipes: data.recipes.nodes,
    pageInfo: {
      hasNextPage: data.recipes.pageInfo?.hasNextPage ?? false,
      endCursor: data.recipes.pageInfo?.endCursor ?? '',
    },
  };
}

/** Get all dish taxonomy terms (for Browse By Category) */
export async function getAllDishTerms(): Promise<WPDishTerm[]> {
  const data = await fetchGraphQL<{ dishes: WPGraphQLConnection<WPDishTerm> }>(
    GET_ALL_DISH_TERMS,
    {},
    86400        // dish terms rarely change — cache 24h
  );
  return data?.dishes?.nodes ?? [];
}

/** Search recipes by keyword */
export async function searchRecipes(
  search: string,
  first = 12
): Promise<WPRecipePost[]> {
  const data = await fetchGraphQL<{ recipes: WPGraphQLConnection<WPRecipePost> }>(
    SEARCH_RECIPES,
    { search, first },
    0             // search results should not be cached
  );
  return data?.recipes?.nodes ?? [];
}

// ---------------------------------------------------------------------------
// Legacy aliases — kept so existing call sites don't break
// ---------------------------------------------------------------------------
/** @deprecated Use getRecipesByDish */
export const getRecipesByCategory = getRecipesByDish;
