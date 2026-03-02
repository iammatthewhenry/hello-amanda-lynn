/**
 * Out of Kitchen GraphQL Queries
 *
 * Uses the `out-of-kitchen` Custom Post Type registered in WordPress.
 * WPGraphQL field names: outOfKitchen (single) / outOfKitchens (plural)
 * Taxonomy: ook-categories
 *   WPGraphQL names: ookCategory (singular) / ookCategories (plural)
 * Known category slugs:
 *   food-destinations | food-festivals | markets-and-shops | restaurants | wineries
 */

// ---------------------------------------------------------------------------
// Fragments (inlined)
// ---------------------------------------------------------------------------

const OOK_CARD_FRAGMENT = `
  fragment OokCardFields on OutOfKitchen {
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
    ookCategories {
      nodes {
        name
        slug
      }
    }
  }
`;

const OOK_FULL_FRAGMENT = `
  fragment OokFullFields on OutOfKitchen {
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
    ookCategories {
      nodes {
        id
        databaseId
        name
        slug
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

/** All OOK slugs - used by generateStaticParams */
export const GET_ALL_OOK_SLUGS = `
  query GetAllOokSlugs {
    outOfKitchens(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
      }
    }
  }
`;

/**
 * OOK posts filtered by category slug.
 * OOK_CATEGORIES is the WPGraphQL taxonomy enum name derived from the
 * ook-categories taxonomy registration.
 */
export const GET_OOK_POSTS_BY_CATEGORY = `
  ${OOK_CARD_FRAGMENT}

  query GetOokPostsByCategory($categorySlug: String!, $first: Int = 100, $after: String) {
    outOfKitchens(
      first: $first
      after: $after
      where: {
        orderby: { field: DATE, order: DESC }
        taxQuery: {
          taxArray: [
            { taxonomy: OOK_CATEGORIES, terms: [$categorySlug], field: SLUG }
          ]
        }
      }
    ) {
      nodes {
        ...OokCardFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/** All OOK posts across all categories (used by the /ook overview page) */
export const GET_ALL_OOK_POSTS = `
  ${OOK_CARD_FRAGMENT}

  query GetAllOokPosts($first: Int = 200, $after: String) {
    outOfKitchens(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ...OokCardFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/** Single OOK post by slug */
export const GET_OOK_POST_BY_SLUG = `
  ${OOK_FULL_FRAGMENT}

  query GetOokPostBySlug($slug: ID!) {
    outOfKitchen(id: $slug, idType: SLUG) {
      ...OokFullFields
    }
  }
`;

/** All ook-categories taxonomy terms */
export const GET_ALL_OOK_CATEGORIES = `
  query GetAllOokCategories {
    ookCategories(first: 100) {
      nodes {
        id
        databaseId
        name
        slug
        description
        count
      }
    }
  }
`;
