import type { Metadata } from 'next';
import { BrowseByCategory } from '@/components';
import { getAllDishTerms } from '@/lib/api/recipes';
import { mapDishTermToCategory } from '@/lib/data/recipeCategories';

/**
 * Recipes Index Page - Server Component
 *
 * Fetches dish taxonomy terms from WordPress to build the category grid.
 * Falls back to hardcoded recipeCategories if WordPress is unavailable.
 */

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Browse all recipes by Amanda Lynn — from hearty dinners and fresh breakfasts to decadent desserts and crowd-pleasing appetizers.',
  openGraph: {
    title: 'Recipes | hello Amanda Lynn',
    description: 'Browse all recipes by Amanda Lynn',
    type: 'website',
  },
};

export default async function RecipesPage() {
  // Fetch dish terms from WordPress (falls back to hardcoded if unavailable)
  const dishTerms = await getAllDishTerms();
  const wpCategories = dishTerms.map(mapDishTermToCategory);

  return (
    <>
      {/* NO extra top padding here */}
      <BrowseByCategory categories={wpCategories.length > 0 ? wpCategories : undefined} />
    </>
  );
}

