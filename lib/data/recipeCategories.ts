export interface RecipeCategory {
  name: string;
  slug: string;
  taxonomyTerm: string;
  image: string;
  description?: string;
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

/** Build an index keyed by taxonomyTerm slug for fast fallback image lookup */
export const FALLBACK_CATEGORY_IMAGE: Record<string, string> = {
  breakfast:
    'https://images.unsplash.com/photo-1746030057364-64613216f835?q=80&w=1124&auto=format&fit=crop',
  appetizers:
    'https://images.unsplash.com/photo-1630230596557-ad07b433f5c0?q=80&w=1170&auto=format&fit=crop',
  dinners:
    'https://images.unsplash.com/photo-1644921504851-b8861be402ac?q=80&w=1374&auto=format&fit=crop',
  sides:
    'https://images.unsplash.com/photo-1537786090555-3ae8e11b1d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  desserts:
    'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=1364&auto=format&fit=crop',
  drinks:
    'https://images.unsplash.com/photo-1582269438702-578efa319292?q=80&w=1288&auto=format&fit=crop',
  holiday:
    'https://images.unsplash.com/photo-1577308873518-7fd772788ec6?q=80&w=1170&auto=format&fit=crop',
  americana:
    'https://images.unsplash.com/photo-1665061580738-87be64cbd049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
};

const FEATURED_SLUGS = new Set(['appetizers', 'dinners', 'desserts']);

/**
 * Map a WPDishTerm (from WPGraphQL) to a RecipeCategory.
 * Uses the hardcoded image lookup since the dish taxonomy doesn't carry images yet
 * (until ACF/featured image fields are integrated).
 */
export function mapDishTermToCategory(term: {
  name: string;
  slug: string;
  description?: string;
}): RecipeCategory {
  return {
    name: term.name,
    slug: `/category/${term.slug}`,
    taxonomyTerm: term.slug,
    image:
      FALLBACK_CATEGORY_IMAGE[term.slug] ??
      'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=1176&auto=format&fit=crop',
    description: term.description,
    featured: FEATURED_SLUGS.has(term.slug),
  };
}

// ---------------------------------------------------------------------------
// Hardcoded data (used as ISR fallback when WP is unavailable)
// ---------------------------------------------------------------------------

export const recipeCategories: RecipeCategory[] = [
  {
    name: 'Breakfast',
    slug: '/category/breakfast',
    taxonomyTerm: 'breakfast',
    image:
      'https://images.unsplash.com/photo-1746030057364-64613216f835?q=80&w=1124&auto=format&fit=crop',
    featured: false,
  },
  {
    name: 'Appetizers',
    slug: '/category/appetizers',
    taxonomyTerm: 'appetizers',
    image:
      'https://images.unsplash.com/photo-1630230596557-ad07b433f5c0?q=80&w=1170&auto=format&fit=crop',
    featured: true,
  },
  {
    name: 'Dinners',
    slug: '/category/dinners',
    taxonomyTerm: 'dinners',
    image:
      'https://images.unsplash.com/photo-1644921504851-b8861be402ac?q=80&w=1374&auto=format&fit=crop',
    featured: true,
  },
  {
    name: 'Sides',
    slug: '/category/sides',
    taxonomyTerm: 'sides',
    image:
      'https://images.unsplash.com/photo-1537786090555-3ae8e11b1d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    name: 'Desserts',
    slug: '/category/desserts',
    taxonomyTerm: 'desserts',
    image:
      'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=1364&auto=format&fit=crop',
    featured: true,
  },
  {
    name: 'Drinks',
    slug: '/category/drinks',
    taxonomyTerm: 'drinks',
    image:
      'https://images.unsplash.com/photo-1582269438702-578efa319292?q=80&w=1288&auto=format&fit=crop',
  },
  {
    name: 'Holiday',
    slug: '/category/holiday',
    taxonomyTerm: 'holiday',
    image:
      'https://images.unsplash.com/photo-1577308873518-7fd772788ec6?q=80&w=1170&auto=format&fit=crop',
  },
  {
    name: 'Americana',
    slug: '/category/americana',
    taxonomyTerm: 'americana',
    image:
      'https://images.unsplash.com/photo-1665061580738-87be64cbd049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];
