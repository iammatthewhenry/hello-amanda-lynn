'use client';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GridSection } from '@/components/GridSection';
import { americanaRecipes } from '@/data/americana-recipes';

export default function AmericanaPage() {
  return (
    <main>
      {/* Breadcrumbs */}
      <div className="container-max px-8 pt-6 pb-4">
        <Breadcrumbs 
          items={[
            { label: 'Recipes', href: '/recipes' },
            { label: 'Americana' }
          ]} 
        />
      </div>

      {/* Page Header */}
      <section className="container-max px-8 pb-8">
        <h1 className="text-[48px] font-bold text-foreground mb-4">Americana</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Celebrate America's 250th anniversary with these classic American recipes that have shaped our culinary heritage. From coast to coast, these timeless dishes represent the heart and soul of American cooking.
        </p>
      </section>

      {/* Recipe Grid */}
      <GridSection
        title="Americana Recipes"
        posts={americanaRecipes}
        baseSlug="/recipes/americana"
        isFirstSection={true}
      />
    </main>
  );
}
