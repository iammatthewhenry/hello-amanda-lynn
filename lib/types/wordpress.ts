/**
 * WordPress/WPGraphQL Type Definitions
 * 
 * TypeScript interfaces for data shapes returned by the WPGraphQL API.
 * These types represent the core WordPress content types and their relationships.
 */

// Core WordPress Media Types
export interface WPMediaItem {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

// Core WordPress Post Type
export interface WPPost {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  content?: string;
  featuredImage?: {
    node: WPMediaItem;
  };
  categories?: {
    nodes: WPCategory[];
  };
  tags?: {
    nodes: WPTag[];
  };
  author?: {
    node: WPAuthor;
  };
}

// WordPress Category
export interface WPCategory {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  parent?: {
    node: {
      name: string;
      slug: string;
    };
  };
  // ACF or custom field - will be wired later
  image?: {
    sourceUrl: string;
    altText: string;
  };
}

// WordPress Tag
export interface WPTag {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
}

// WordPress Author
export interface WPAuthor {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  description?: string;
  avatar?: {
    url: string;
  };
}

// WordPress Page Type
export interface WPPage {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  featuredImage?: {
    node: WPMediaItem;
  };
  seo?: WPSeoData;
}

// SEO Data (if using Yoast or RankMath)
export interface WPSeoData {
  title?: string;
  metaDesc?: string;
  opengraphImage?: {
    sourceUrl: string;
  };
}

// Placeholder types for Custom Post Types (CPTs)
// These will be expanded once CPTs are registered in WordPress

/**
 * Recipe Custom Post Type
 * TODO: Add ACF/WP Recipe Maker fields once CPT is registered
 */
export interface WPRecipe extends WPPost {
  recipeFields?: {
    prepTime?: string;
    cookTime?: string;
    totalTime?: string;
    servings?: number;
    difficulty?: string;
    ingredients?: string[];
    instructions?: string[];
    nutrition?: {
      calories?: number;
      protein?: number;
      carbs?: number;
      fat?: number;
    };
  };
}

/**
 * Restaurant Review Custom Post Type
 * TODO: Add review-specific fields once CPT is registered
 */
export interface WPRestaurantReview extends WPPost {
  reviewFields?: {
    restaurantName?: string;
    location?: string;
    address?: string;
    cuisine?: string;
    priceRange?: string;
    rating?: number;
    visitDate?: string;
    highlights?: string[];
    mapLink?: string;
  };
}

/**
 * Shop Item Custom Post Type
 * TODO: Wire to actual shop_item CPT once registered
 */
export interface WPShopItem {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  excerpt?: string;
  featuredImage?: {
    node: WPMediaItem;
  };
  shopItemFields?: {
    affiliateLink?: string;
    price?: string;
    description?: string;
    category?: string;
  };
}

/**
 * Poll Result Type
 * TODO: Wire to actual poll CPT or ACF options page once implemented
 */
export interface WPPollResult {
  rank: number;
  text: string;
  percentage: number;
  votes?: number;
}

/**
 * Poll Type
 * TODO: Wire to actual poll CPT once implemented
 */
export interface WPPoll {
  id: string;
  databaseId: number;
  title: string;
  description?: string;
  results: WPPollResult[];
  totalResponses: number;
  isActive: boolean;
  slug: string;
}

// GraphQL Connection/Pagination Types
export interface WPPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface WPGraphQLConnection<T> {
  nodes: T[];
  pageInfo?: WPPageInfo;
  edges?: Array<{
    cursor: string;
    node: T;
  }>;
}

// GraphQL Response Wrapper
export interface WPGraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

// General Settings (from WordPress)
export interface WPGeneralSettings {
  title: string;
  description: string;
  url: string;
  language?: string;
  timezone?: string;
}
