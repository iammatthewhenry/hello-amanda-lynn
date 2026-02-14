'use client';

import { StandaloneBreadcrumbs } from '@/components/StandaloneBreadcrumbs';
import { BrowseByCategorySection } from '@/components/BrowseByCategorySection';

export default function RecipesPage() {
  return (
    <>
      <StandaloneBreadcrumbs items={[{ label: 'Recipes' }]} />

      {/* REMOVE extra <main> — layout.tsx already has one */}
      <div className="pt-2 sm:pt-4">
        <BrowseByCategorySection />
      </div>
    </>
  );
}
