'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { GridSection } from '@/components/grid-section';

export default function SidesPage() {
  const sides = [
    {
      slug: 'garlic-herb-roasted-potatoes',
      title: 'Garlic Herb Roasted Potatoes',
      description: 'Crispy golden potatoes seasoned with fresh herbs and garlic, perfect alongside any main dish.',
      image: 'https://images.unsplash.com/photo-1537786090555-3ae8e11b1d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwcG90YXRvZXN8ZW58MXx8fHwxNzY2NjAwODU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'homemade-garlic-bread',
      title: 'Homemade Garlic Bread',
      description: 'Buttery, crispy garlic bread with fresh parsley and parmesan cheese.',
      image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJsaWMlMjBicmVhZHxlbnwxfHx8fDE3NjY1OTI1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'creamy-coleslaw',
      title: 'Creamy Coleslaw',
      description: 'Classic creamy coleslaw with cabbage, carrots, and tangy dressing.',
      image: 'https://images.unsplash.com/photo-1573403707491-38a4ea19edc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xlc2xhdyUyMHNhbGFkfGVufDF8fHx8MTc2NjU5MTIwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'herb-rice-pilaf',
      title: 'Herb Rice Pilaf',
      description: 'Fluffy rice pilaf with aromatic herbs and toasted almonds.',
      image: 'https://images.unsplash.com/photo-1634324092536-74480096b939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGlsYWZ8ZW58MXx8fHwxNzY2NTYzNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'green-beans-almondine',
      title: 'Green Beans Almondine',
      description: 'Tender green beans sautéed with butter, garlic, and toasted almonds.',
      image: 'https://images.unsplash.com/photo-1605402966404-ec40b9bd5009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGJlYW5zJTIwYWxtb25kc3xlbnwxfHx8fDE3NjY2MDA4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'roasted-brussels-sprouts',
      title: 'Roasted Brussels Sprouts',
      description: 'Caramelized Brussels sprouts with balsamic glaze and crispy bacon.',
      image: 'https://images.unsplash.com/photo-1633862033803-7abafaf9bcb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWRlJTIwZGlzaCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjY2MDA4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="container-max px-8 pt-6 pb-4">
        <Breadcrumbs 
          items={[
            { label: 'Recipes', href: '/recipes' },
            { label: 'Sides' },
          ]} 
        />
      </div>

      {/* Page Header */}
      <section className="container-max px-8 pb-8">
        <h1 className="text-[48px] font-bold text-foreground mb-4">Sides</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Complete your meal with these delicious side dishes. From roasted vegetables to creamy salads, find the perfect accompaniment to any main course.
        </p>
      </section>

      {/* Recipe Grid */}
      <GridSection
        title="Side Dish Recipes"
        posts={sides}
        baseSlug="/recipes/sides"
        isFirstSection={true}
      />
    </main>
  );
}
