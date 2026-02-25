/**
 * Recipe GraphQL Queries
 * 
 * Queries for fetching recipe data. These will be updated once the Recipe CPT
 * is registered in WordPress with custom fields.
 */

import { POST_CARD_FIELDS, POST_FULL_FIELDS } from './fragments';

/**
 * Get all recipe slugs for static generation
 * 
 * TODO: Update to use recipe CPT once registered
 * Currently using standard posts as placeholder
 */
export const GET_ALL_RECIPE_SLUGS = `
  query GetAllRecipeSlugs {
    posts(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
      }
    }
  }
`;

/**
 * Get a single recipe by slug
 * 
 * TODO: Update to use recipe CPT with custom fields once registered
 * Expected custom fields:
 * - prepTime, cookTime, totalTime
 * - servings, difficulty
 * - ingredients[], instructions[]
 * - nutrition info
 */
export const GET_RECIPE_BY_SLUG = `
  ${POST_FULL_FIELDS}
  
  query GetRecipeBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFullFields
    }
  }
`;

/**
 * Get recipes by category
 * 
 * TODO: Update to use recipe CPT once registered
 */
export const GET_RECIPES_BY_CATEGORY = `
  ${POST_CARD_FIELDS}
  
  query GetRecipesByCategory($categorySlug: String!, $first: Int = 12, $after: String) {
    posts(
      first: $first,
      after: $after,
      where: {
        categoryName: $categorySlug,
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        ...PostCardFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/**
 * Get all recipes with pagination
 */
export const GET_ALL_RECIPES = `
  ${POST_CARD_FIELDS}
  
  query GetAllRecipes($first: Int = 12, $after: String) {
    posts(
      first: $first,
      after: $after,
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ...PostCardFields
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

/**
 * Search recipes by keyword
 * 
 * TODO: Enhance with recipe-specific field search once CPT is registered
 */
export const SEARCH_RECIPES = `
  ${POST_CARD_FIELDS}
  
  query SearchRecipes($search: String!, $first: Int = 12) {
    posts(
      first: $first,
      where: {
        search: $search,
        orderby: { field: RELEVANCE, order: DESC }
      }
    ) {
      nodes {
        ...PostCardFields
      }
    }
  }
`;

/**
 * Get recipes by multiple categories (for filtered views)
 */
export const GET_RECIPES_BY_CATEGORIES = `
  ${POST_CARD_FIELDS}
  
  query GetRecipesByCategories($categorySlugs: [String]!, $first: Int = 12) {
    posts(
      first: $first,
      where: {
        categoryIn: $categorySlugs,
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        ...PostCardFields
      }
    }
  }
`;
