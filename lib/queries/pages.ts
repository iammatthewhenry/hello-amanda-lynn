/**
 * Page GraphQL Queries
 * 
 * Queries for fetching WordPress pages (About, Contact, Terms, Privacy, etc.)
 */

import { PAGE_FIELDS } from './fragments';

/**
 * Get all page slugs for static generation
 */
export const GET_ALL_PAGE_SLUGS = `
  query GetAllPageSlugs {
    pages(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

/**
 * Get a single page by slug
 */
export const GET_PAGE_BY_SLUG = `
  ${PAGE_FIELDS}
  
  query GetPageBySlug($slug: ID!) {
    page(id: $slug, idType: URI) {
      ...PageFields
    }
  }
`;

/**
 * Get a page by database ID
 */
export const GET_PAGE_BY_ID = `
  ${PAGE_FIELDS}
  
  query GetPageById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      ...PageFields
    }
  }
`;

/**
 * Get multiple specific pages by slug
 * Useful for fetching multiple static pages at once
 */
export const GET_PAGES_BY_SLUGS = `
  ${PAGE_FIELDS}
  
  query GetPagesBySlugs($slugs: [ID]!) {
    pages(where: { nameIn: $slugs }, first: 100) {
      nodes {
        ...PageFields
      }
    }
  }
`;
