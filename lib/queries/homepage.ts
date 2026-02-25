/**
 * Homepage GraphQL Queries
 * 
 * Queries for fetching homepage data including posts, categories, polls, and shop items.
 */

import { POST_CARD_FIELDS, CATEGORY_FIELDS } from './fragments';

/**
 * Get all homepage data in a single query
 * Includes general settings, recent posts, and categories
 */
export const GET_HOMEPAGE_DATA = `
  ${POST_CARD_FIELDS}
  ${CATEGORY_FIELDS}
  
  query GetHomepageData {
    generalSettings {
      title
      description
      url
    }
    posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...PostCardFields
      }
    }
    categories(first: 20, where: { hideEmpty: true }) {
      nodes {
        ...CategoryFields
      }
    }
  }
`;

/**
 * Get recent posts for homepage sections
 */
export const GET_RECENT_POSTS = `
  ${POST_CARD_FIELDS}
  
  query GetRecentPosts($first: Int = 6) {
    posts(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        ...PostCardFields
      }
    }
  }
`;

/**
 * Get categories for "Browse by Category" section
 */
export const GET_CATEGORIES = `
  ${CATEGORY_FIELDS}
  
  query GetCategories($first: Int = 20) {
    categories(first: $first, where: { hideEmpty: true }) {
      nodes {
        ...CategoryFields
      }
    }
  }
`;

/**
 * Poll Results Query
 * 
 * TODO: Replace with actual CPT query once 'poll' CPT is registered in WPGraphQL
 * For now, the API function will return null and the PollResults component 
 * will use its built-in default data.
 * 
 * Expected structure once implemented:
 * query GetPollResults {
 *   polls(first: 1, where: { isActive: true }) {
 *     nodes {
 *       id
 *       title
 *       description
 *       totalResponses
 *       results {
 *         rank
 *         text
 *         percentage
 *         votes
 *       }
 *     }
 *   }
 * }
 */
export const GET_POLL_RESULTS = `
  query GetPollResults {
    # TODO: Wire to actual poll CPT or ACF options page
    # Returning null for now - component will use defaults
  }
`;

/**
 * Shop Items Query
 * 
 * TODO: Replace with actual shop_item CPT query once registered in WPGraphQL
 * For now, the API function will return null and the ShopSection component
 * will use its built-in default items.
 * 
 * Expected structure once implemented:
 * query GetShopItems($first: Int = 5) {
 *   shopItems(first: $first, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
 *     nodes {
 *       id
 *       databaseId
 *       title
 *       slug
 *       excerpt
 *       featuredImage {
 *         node {
 *           sourceUrl
 *           altText
 *         }
 *       }
 *       shopItemFields {
 *         affiliateLink
 *         price
 *         description
 *       }
 *     }
 *   }
 * }
 */
export const GET_SHOP_ITEMS = `
  query GetShopItems($first: Int = 5) {
    # TODO: Wire to shop_item CPT once registered
    # Returning null for now - component will use defaults
  }
`;

/**
 * Top Recipes Query
 * 
 * TODO: Update to use recipe CPT once registered
 * For now using standard posts as a placeholder
 */
export const GET_TOP_RECIPES = `
  ${POST_CARD_FIELDS}
  
  query GetTopRecipes($first: Int = 5) {
    posts(
      first: $first, 
      where: { 
        orderby: { field: DATE, order: DESC }
      }
    ) {
      nodes {
        ...PostCardFields
      }
    }
  }
`;
