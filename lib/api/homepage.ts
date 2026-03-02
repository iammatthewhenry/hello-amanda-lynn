/**
 * Homepage Data Fetching API
 */

import { fetchGraphQL } from '@/lib/wordpress';
import { getRecipeDishUrl } from '@/lib/routes';
import {
  GET_HOMEPAGE_DATA,
  GET_CATEGORIES,
  GET_TOP_RECIPES,
  GET_RECENT_POSTS,
} from '@/lib/queries/homepage';

import type {
  WPPost,
  WPCategory,
  WPGraphQLConnection,
  WPGeneralSettings,
} from '@/lib/types/wordpress';

// ======================================================
// TYPES
// ======================================================

interface CategoryItem {
  title: string;
  image: string;
  page: string;
  objectPosition?: string;
  count?: number;
  description?: string;
}

interface HomepageData {
  generalSettings: WPGeneralSettings;
  recentPosts: WPPost[];
  categories: CategoryItem[];
}

// ======================================================
// FALLBACK IMAGES
// ======================================================

const CATEGORY_IMAGE_FALLBACKS: Record<
  string,
  { image: string; objectPosition?: string }
> = {
  breakfast: {
    image:
      'https://images.unsplash.com/photo-1746030057364-64613216f835?q=80&w=1124&auto=format&fit=crop',
  },
  appetizers: {
    image:
      'https://images.unsplash.com/photo-1630230596557-ad07b433f5c0?q=80&w=1170&auto=format&fit=crop',
  },
  dinners: {
    image:
      'https://images.unsplash.com/photo-1644921504851-b8861be402ac?q=80&w=1374&auto=format&fit=crop',
  },
  sides: {
    image:
      'https://images.unsplash.com/photo-1537786090555-3ae8e11b1d4d?q=80&w=1080&auto=format&fit=crop',
  },
  desserts: {
    image:
      'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=1364&auto=format&fit=crop',
    objectPosition: 'center 75%',
  },
  drinks: {
    image:
      'https://images.unsplash.com/photo-1582269438702-578efa319292?q=80&w=1288&auto=format&fit=crop',
  },
  holiday: {
    image:
      'https://images.unsplash.com/photo-1577308873518-7fd772788ec6?q=80&w=1170&auto=format&fit=crop',
  },
  americana: {
    image:
      'https://images.unsplash.com/photo-1665061580738-87be64cbd049?q=80&w=1080&auto=format&fit=crop',
  },
};

// ======================================================
// HOMEPAGE DATA
// ======================================================

export async function getHomepageData(): Promise<HomepageData | null> {
  try {
    const data = await fetchGraphQL<{
      generalSettings: WPGeneralSettings;
      posts: WPGraphQLConnection<WPPost>;
      categories: WPGraphQLConnection<WPCategory>;
    }>(GET_HOMEPAGE_DATA, {}, 60);

    // ✅ CRITICAL NULL GUARD
    if (!data) return null;

    const categories: CategoryItem[] = data.categories.nodes.map((cat) => ({
      title: cat.name,
      image:
        cat.image?.sourceUrl ||
        CATEGORY_IMAGE_FALLBACKS[cat.slug.toLowerCase()]?.image ||
        '',
      page: getRecipeDishUrl(cat.slug),
      objectPosition:
        CATEGORY_IMAGE_FALLBACKS[cat.slug.toLowerCase()]?.objectPosition,
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

// ======================================================
// CATEGORIES
// ======================================================

export async function getCategories(): Promise<CategoryItem[] | null> {
  try {
    const data = await fetchGraphQL<{
      categories: WPGraphQLConnection<WPCategory>;
    }>(GET_CATEGORIES, { first: 20 }, 3600);

    if (!data) return null;

    const categories: CategoryItem[] = data.categories.nodes.map((cat) => ({
      title: cat.name,
      image:
        cat.image?.sourceUrl ||
        CATEGORY_IMAGE_FALLBACKS[cat.slug.toLowerCase()]?.image ||
        '',
      page: getRecipeDishUrl(cat.slug),
      objectPosition:
        CATEGORY_IMAGE_FALLBACKS[cat.slug.toLowerCase()]?.objectPosition,
      count: cat.count,
      description: cat.description,
    }));

    return categories.length ? categories : null;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return null;
  }
}

// ======================================================
// TOP RECIPES
// ======================================================

export async function getTopRecipes(): Promise<WPPost[] | null> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<WPPost>;
    }>(GET_TOP_RECIPES, { first: 5 }, 3600);

    if (!data) return null;

    return data.posts.nodes.length ? data.posts.nodes : null;
  } catch (error) {
    console.error('Error fetching top recipes:', error);
    return null;
  }
}

// ======================================================
// RECENT POSTS
// ======================================================

export async function getRecentPosts(
  count: number = 6
): Promise<WPPost[] | null> {
  try {
    const data = await fetchGraphQL<{
      posts: WPGraphQLConnection<WPPost>;
    }>(GET_RECENT_POSTS, { first: count }, 60);

    if (!data) return null;

    return data.posts.nodes.length ? data.posts.nodes : null;
  } catch (error) {
    console.error('Error fetching recent posts:', error);
    return null;
  }
}
// ======================================================
// TEMP PLACEHOLDERS (prevents build errors)
// ======================================================

export async function getPollResults(): Promise<null> {
  return null;
}

export async function getShopItems(): Promise<null> {
  return null;
}