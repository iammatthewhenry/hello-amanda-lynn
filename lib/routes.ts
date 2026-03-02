/**
 * Centralized URL/Route Generation Utilities
 * 
 * Single source of truth for all route patterns across the application.
 * Prevents URL inconsistencies and makes refactoring easier.
 */

// ===================================================================
// RECIPE ROUTES
// ===================================================================

/**
 * Generate URL for a single recipe post
 * @param slug - Recipe post slug from WordPress or local data
 * @returns URL path like /recipes/fluffy-pancakes
 */
export function getRecipePostUrl(slug: string): string {
  return `/recipes/${slug}`;
}

/**
 * Generate URL for a dish taxonomy archive page
 * @param slug - Dish term slug (e.g., "appetizers", "desserts")
 * @returns URL path like /recipes/appetizers
 * 
 * NOTE: This uses the same pattern as recipe posts (/recipes/{slug}).
 * The dynamic route at /app/recipes/[slug]/page.tsx determines whether
 * the slug is a recipe post or dish term by attempting to fetch both.
 */
export function getRecipeDishUrl(slug: string): string {
  return `/recipes/${slug}`;
}

/**
 * Get main recipes listing page URL
 */
export function getRecipesUrl(): string {
  return '/recipes';
}

// ===================================================================
// IN THE KITCHEN ROUTES
// ===================================================================

/**
 * Generate URL for a single "In The Kitchen" post
 */
export function getKitchenPostUrl(slug: string): string {
  return `/in-the-kitchen/${slug}`;
}

/**
 * Get main "In The Kitchen" listing page URL
 */
export function getKitchenUrl(): string {
  return '/in-the-kitchen';
}

// ===================================================================
// OUT OF KITCHEN (OOK) ROUTES
// ===================================================================

/**
 * Generate URL for a single "Out of Kitchen" post
 */
export function getOokPostUrl(slug: string): string {
  return `/ook/${slug}`;
}

/**
 * Generate URL for an OOK category archive
 * @param slug - OOK category term slug
 */
export function getOokCategoryUrl(slug: string): string {
  return `/ook/${slug}`;
}

/**
 * Get main OOK listing page URL
 */
export function getOokUrl(): string {
  return '/ook';
}

// ===================================================================
// GENERAL ROUTES
// ===================================================================

/**
 * Get home page URL
 */
export function getHomeUrl(): string {
  return '/';
}

/**
 * Get about page URL
 */
export function getAboutUrl(): string {
  return '/about';
}

/**
 * Get contact page URL
 */
export function getContactUrl(): string {
  return '/contact';
}
