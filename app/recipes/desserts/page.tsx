'use client';

import { StandaloneBreadcrumbs } from '@/components/StandaloneBreadcrumbs';
import { PageHeader } from "@/components/PageHeader";
// Add other imports as needed

export default function DessertsPage() {
  return (
    <>
      {/* StandaloneBreadcrumbs handles container, positioning, and spacing */}
      <StandaloneBreadcrumbs items={[
        { label: 'Recipes', href: '/recipes' },
        { label: 'Desserts' }
      ]} />

      <main className="pt-6 sm:pt-8">
        {/* PageHeader now focuses only on title and description */}
        <PageHeader 
          title="Desserts"
          description="Sweet treats and dessert recipes to satisfy your cravings"
        />

        {/* Your existing content goes here */}
      </main>
    </>
  );
}
