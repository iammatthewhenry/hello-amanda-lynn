/**
 * Blog Post GraphQL Queries
 * 
 * Queries for fetching blog posts (In The Kitchen articles, restaurant reviews, etc.)
 */

import { POST_CARD_FIELDS, POST_FULL_FIELDS } from './fragments';

/**
 * Get all blog post slugs for static generation
 */
export const GET_ALL_POST_SLUGS = `
  query GetAllPostSlugs {
    posts(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
      }
    }
  }
`;

/**
 * Get a single blog post by slug
 */
export const GET_POST_BY_SLUG = `
  ${POST_FULL_FIELDS}
  
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      ...PostFullFields
    }
  }
`;

/**
 * Get posts by category (for In The Kitchen, Out of Kitchen, etc.)
 */
export const GET_POSTS_BY_CATEGORY = `
  ${POST_CARD_FIELDS}
  
  query GetPostsByCategory($categorySlug: String!, $first: Int = 12, $after: String) {
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
 * Get all posts with pagination
 */
export const GET_ALL_POSTS = `
  ${POST_CARD_FIELDS}
  
  query GetAllPosts($first: Int = 12, $after: String) {
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
