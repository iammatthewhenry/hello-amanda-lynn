'use client';

import { StandaloneBreadcrumbs } from '@/components/StandaloneBreadcrumbs';
import { PageHeader } from "@/components/PageHeader";
// Add other imports as needed

export default function BreakfastPage() {
  return (
    <>
      {/* StandaloneBreadcrumbs handles container, positioning, and spacing */}
      <StandaloneBreadcrumbs items={[
        { label: 'Recipes', href: '/recipes' },
        { label: 'Breakfast' }
      ]} />

      <main className="pt-6 sm:pt-8">
        {/* PageHeader now focuses only on title and description */}
        <PageHeader 
          title="Breakfast"
          description="Start your day with these delicious breakfast recipes"
        />

        {/* Your existing content goes here */}
      </main>
    </>
  );
}
