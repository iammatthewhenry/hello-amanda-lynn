/**
 * In The Kitchen GraphQL Queries
 *
 * Uses the `in-the-kitchen` Custom Post Type registered in WordPress.
 * WPGraphQL field names: inTheKitchen (single) / inTheKitchens (plural)
 */

// ---------------------------------------------------------------------------
// Fragments (inlined to avoid cross-file fragment duplication at runtime)
// ---------------------------------------------------------------------------

const KITCHEN_CARD_FRAGMENT = `
  fragment KitchenCardFields on InTheKitchen {
    id
    databaseId
    title
    slug
    date
    excerpt
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
  }
`;

const KITCHEN_FULL_FRAGMENT = `
  fragment KitchenFullFields on InTheKitchen {
    id
    databaseId
    title
    slug
    date
    excerpt
    content
    featuredImage {
      node {
        sourceUrl
        altText
        mediaDetails { width height }
      }
    }
    author {
      node {
        name
        avatar { url }
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** All kitchen post slugs - used by generateStaticParams */
export const GET_ALL_KITCHEN_SLUGS = `
  query GetAllKitchenSlugs {
    inTheKitchens(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
      }
    }
  }
`;

/** All kitchen posts (card data) with pagination */
export const GET_ALL_KITCHEN_POSTS = `
  ${KITCHEN_CARD_FRAGMENT}

  query GetAllKitchenPosts($first: Int = 100, $after: String) {
    inTheKitchens(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ...KitchenCardFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/** Single kitchen post by slug */
export const GET_KITCHEN_POST_BY_SLUG = `
  ${KITCHEN_FULL_FRAGMENT}

  query GetKitchenPostBySlug($slug: ID!) {
    inTheKitchen(id: $slug, idType: SLUG) {
      ...KitchenFullFields
    }
  }
`;
