
import type { Metadata } from 'next';
import { BrowseByCategorySection } from '@/components';

export const metadata: Metadata = {
  title: 'Recipes',
  description: 'Browse all recipes by Amanda Lynn — from hearty dinners and fresh breakfasts to decadent desserts and crowd-pleasing appetizers.',
};

export default function RecipesPage() {
  return (
    <>
       

      {/* NO extra top padding here */}
      <BrowseByCategorySection />
    </>
  );
}
