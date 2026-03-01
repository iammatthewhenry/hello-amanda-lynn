import type { Metadata } from 'next';
import { BrowseByCategory } from '@/components';

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
  return (
    <>
      {/* NO extra top padding here */}
      <BrowseByCategory />
    </>
  );
}
