'use client';

import { BrowseByCategorySection } from '@/components/BrowseByCategorySection';

export default function RecipesPage() {
  return (
    <>
       items={[{ label: 'Recipes' }]} />

      {/* NO extra top padding here */}
      <BrowseByCategorySection />
    </>
  );
}
