import type { Metadata } from 'next';
import { BrowseByCategorySection } from '@/components';
import { getCategories } from '@/lib/api/homepage';

/**
 * Recipes Index Page - Server Component
 * 
 * Displays all recipe categories. Fetches from WordPress with fallback to defaults.
 */

export const revalidate = false;

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
  // Fetch categories from WordPress
  const categories = await getCategories();

  return (
    <>
      {/* NO extra top padding here */}
      <BrowseByCategorySection categories={categories?.length ? categories : undefined} />
    </>
  );
}
