'use client';

import { StandaloneBreadcrumbs } from '@/components/StandaloneBreadcrumbs';
import { BrowseByCategorySection } from '@/components/BrowseByCategorySection';

export default function RecipesPage() {
  return (
    <>
      <StandaloneBreadcrumbs items={[{ label: 'Recipes' }]} />

      {/* NO extra top padding here */}
      <BrowseByCategorySection />
    </>
  );
}
