/**
 * Recipe GraphQL Queries
 *
 * Uses the `recipes` Custom Post Type registered in WordPress.
 * WPGraphQL field names: recipe (single) / recipes (plural)
 * Taxonomy: dish → dishes
 *
 * NOTE on WPGraphQL naming:
 *   CPT graphqlSingleName="recipe", graphqlPluralName="recipes".
 *   Taxonomy graphqlSingleName="dish", graphqlPluralName="dishes".
 */

// ---------------------------------------------------------------------------
// Reusable fragments (inline to avoid cross-file fragment duplication issues)
// ---------------------------------------------------------------------------

const RECIPE_CARD_FRAGMENT = `
  fragment RecipeCardFields on Recipe {
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
    dishes {
      nodes {
        name
        slug
      }
    }
  }
`;

const RECIPE_FULL_FRAGMENT = `
  fragment RecipeFullFields on Recipe {
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
    dishes {
      nodes {
        id
        databaseId
        name
        slug
        description
        count
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

/** Get all recipe slugs for generateStaticParams */
export const GET_ALL_RECIPE_SLUGS = `
  query GetAllRecipeSlugs {
    recipes(first: 1000, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        slug
      }
    }
  }
`;

/** Get a single recipe by slug */
export const GET_RECIPE_BY_SLUG = `
  ${RECIPE_FULL_FRAGMENT}

  query GetRecipeBySlug($slug: ID!) {
    recipe(id: $slug, idType: SLUG) {
      ...RecipeFullFields
    }
  }
`;

/** Get all recipe cards with pagination */
export const GET_ALL_RECIPES = `
  ${RECIPE_CARD_FRAGMENT}

  query GetAllRecipes($first: Int = 24, $after: String) {
    recipes(
      first: $first
      after: $after
      where: { orderby: { field: DATE, order: DESC } }
    ) {
      nodes {
        ...RecipeCardFields
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
 * Get recipes filtered by a dish taxonomy term slug.
 * DISH is the WPGraphQL taxonomy enum (auto-derived from the "dish" slug).
 */
export const GET_RECIPES_BY_DISH = `
  ${RECIPE_CARD_FRAGMENT}

  query GetRecipesByDish($dishSlug: String!, $first: Int = 24, $after: String) {
    recipes(
      first: $first
      after: $after
      where: {
        orderby: { field: DATE, order: DESC }
        taxQuery: {
          taxArray: [
            { taxonomy: DISH, terms: [$dishSlug], field: SLUG }
          ]
        }
      }
    ) {
      nodes {
        ...RecipeCardFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

/** Get all dish taxonomy terms (populates the Browse By Category grid) */
export const GET_ALL_DISH_TERMS = `
  query GetAllDishTerms {
    dishes(first: 100, where: { orderby: NAME, order: ASC }) {
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

/** Search recipes by keyword */
export const SEARCH_RECIPES = `
  ${RECIPE_CARD_FRAGMENT}

  query SearchRecipes($search: String!, $first: Int = 12) {
    recipes(
      first: $first
      where: {
        search: $search
        orderby: { field: RELEVANCE, order: DESC }
      }
    ) {
      nodes {
        ...RecipeCardFields
      }
    }
  }
`;

// ---------------------------------------------------------------------------
// Legacy aliases — kept so existing imports don't break during the migration
// ---------------------------------------------------------------------------
/** @deprecated Use GET_RECIPES_BY_DISH */
export const GET_RECIPES_BY_CATEGORY = GET_RECIPES_BY_DISH;
