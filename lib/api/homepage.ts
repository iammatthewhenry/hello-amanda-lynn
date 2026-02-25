/**
 * Homepage Data Fetching API
 * 
 * Server-side functions for fetching homepage data from WordPress.
 * Each function includes error handling with graceful fallbacks.
 */

import { fetchGraphQL } from '@/lib/wordpress';
import {
  GET_HOMEPAGE_DATA,
  GET_CATEGORIES,
  GET_POLL_RESULTS,
  GET_SHOP_ITEMS,
  GET_TOP_RECIPES,
  GET_RECENT_POSTS,
} from '@/lib/queries/homepage';
import type {
  WPPost,
  WPCategory,
  WPGraphQLConnection,
  WPGeneralSettings,
} from '@/lib/types/wordpress';

// Component prop types (matching existing components)
interface CategoryItem {
  title: string;
  image: string;
  page: string;
  objectPosition?: string;
  count?: number;
  description?: string;
}

interface PollResultItem {
  rank: number;
  text: string;
  percentage: number;
}

interface ShopItem {
  title: string;
  image: string;
  link?: string;
}

interface HomepageData {
  generalSettings: WPGeneralSettings;
  recentPosts: WPPost[];
  categories: CategoryItem[];
}

/**
 * Fallback category images
 * These match the existing hardcoded images in BrowseByCategorySection
 */
const CATEGORY_IMAGE_FALLBACKS: Record<string, { image: string; objectPosition?: string }> = {
  breakfast: {
    image: 'https://images.unsplash.com/photo-1746030057364-64613216f835?q=80&w=1124&auto=format&fit=crop',
  },
  appetizers: {
    image: 'https://images.unsplash.com/photo-1630230596557-ad07b433f5c0?q=80&w=1170&auto=format&fit=crop',
  },
  dinners: {
    image: 'https://images.unsplash.com/photo-1644921504851-b8861be402ac?q=80&w=1374&auto=format&fit=crop',
  },
  sides: {
    image: 'https://images.unsplash.com/photo-1537786090555-3ae8e11b1d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  desserts: {
    image: 'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=1364&auto=format&fit=crop',
    objectPosition: 'center 75%',
  },
  drinks: {
    image: 'https://images.unsplash.com/photo-1582269438702-578efa319292?q=80&w=1288&auto=format&fit=crop',
  },
  holiday: {
    image: 'https://images.unsplash.com/photo-1577308873518-7fd772788ec6?q=80&w=1170&auto=format&fit=crop',
  },
  americana: {
    image: 'https://images.unsplash.com/photo-1665061580738-87be64cbd049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
};

/**
 * Get all homepage data in one request
 * Falls back to empty arrays if WordPress is unavailable
 */
export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    const data = await fetchGraphQL<{
      generalSettings: WPGeneralSettings;
      posts: WPGraphQLConnection<WPPost>;
      categories: WPGraphQLConnection<WPCategory>;
    }>(GET_HOMEPAGE_DATA, {}, 60); // Revalidate every 60 seconds

    // Transform categories to match component props
    const categories: CategoryItem[] = data.categories.nodes.map((cat) => ({
      title: cat.name,
      image: cat.image?.sourceUrl || CATEGORY_IMAGE_FALLBACKS[cat.slug.toLowerCase()]?.image || '',
      page: `/recipes/${cat.slug}`,
      objectPosition: CATEGORY_IMAGE_FALLBACKS[cat.slug.toLowerCase()]?.objectPosition,
      count: cat.count,
      description: cat.description,
    }));

    return {
      generalSettings: data.generalSettings,
      recentPosts: data.posts.nodes,
      categories,
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}

/**
 * Get categories for Browse by Category section
 * Returns transformed data matching CategoryCard props
 */
export async function getCategories(): Promise<CategoryItem[] | null> {
  try {
    const data = await fetchGraphQL<{
      categories: WPGraphQLConnection<WPCategory>;
    }>(GET_CATEGORIES, { first: 20 }, 3600);

    const categories: CategoryItem[] = data.categories.nodes.map((cat) => ({
      title: cat.name,
      image: cat.image?.sourceUrl || CATEGORY_IMAGE_FALLBACKS[cat.slug.toLowerCase()]?.image || '',
      page: `/recipes/${cat.slug}`,
      objectPosition: CATEGORY_IMAGE_FALLBACKS[cat.slug.toLowerCase()]?.objectPosition,
      count: cat.count,
      description: cat.description,
    }));

    return categories.length > 0 ? categories : null;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

/**
 * Get poll results
 * 
 * TODO: Wire to actual poll CPT once implemented
 * Currently returns null - component will use its built-in defaults
 */
export async function getPollResults(): Promise<{
  title: string;
  description: string;
  results: PollResultItem[];
  totalResponses: number;
} | null> {
  try {
    // TODO: Uncomment and wire once poll CPT is registered
    // const data = await fetchGraphQL<{ polls: WPGraphQLConnection<WPPoll> }>(
    //   GET_POLL_RESULTS,
    //   {},
    //   60 // Short revalidation for dynamic poll data
    // );
    // 
    // if (data.polls.nodes.length > 0) {
    //   const poll = data.polls.nodes[0];
    //   return {
    //     title: poll.title,
    //     description: poll.description || "Here's what our community loves most",
    //     results: poll.results,
    //     totalResponses: poll.totalResponses,
    //   };
    // }

    return null; // Component will use defaults
  } catch (error) {
    console.error('Error fetching poll results:', error);
    return null;
  }
}

/**
 * Get shop items
 * 
 * TODO: Wire to actual shop_item CPT once implemented
 * Currently returns null - component will use its built-in defaults
 */
export async function getShopItems(): Promise<{ items: ShopItem[] } | null> {
  try {
    // TODO: Uncomment and wire once shop_item CPT is registered
    // const data = await fetchGraphQL<{ shopItems: WPGraphQLConnection<WPShopItem> }>(
    //   GET_SHOP_ITEMS,
    //   { first: 5 },
    //   3600
    // );
    //
    // if (data.shopItems.nodes.length > 0) {
    //   const items: ShopItem[] = data.shopItems.nodes.map((item) => ({
    //     title: item.title,
    //     image: item.featuredImage?.node.sourceUrl || '',
    //     link: item.shopItemFields?.affiliateLink,
    //   }));
    //
    //   return { items };
    // }

    return null; // Component will use defaults
  } catch (error) {
    console.error('Error fetching shop items:', error);
    return null;
  }
}

/**
 * Get top/featured recipes
 * 
 * TODO: Update to use recipe CPT with featured flag once implemented
 * Currently uses recent posts as placeholder
 */
export async function getTopRecipes(): Promise<WPPost[] | null> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<WPPost>;
    }>(GET_TOP_RECIPES, { first: 5 }, 3600);

    return data.posts.nodes.length > 0 ? data.posts.nodes : null;
  } catch (error) {
    console.error('Error fetching top recipes:', error);
    return null;
  }
}

/**
 * Get recent posts
 */
export async function getRecentPosts(count: number = 6): Promise<WPPost[] | null> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<WPPost>;
    }>(GET_RECENT_POSTS, { first: count }, 60);

    return data.posts.nodes.length > 0 ? data.posts.nodes : null;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return null;
  }
}
