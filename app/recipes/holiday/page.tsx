'use client';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GridSection } from '@/components/GridSection';

export default function HolidayPage() {
  const holidayRecipes = [
    {
      slug: 'roasted-turkey',
      title: 'Roasted Turkey',
      description: 'Perfectly roasted turkey with herb butter and savory stuffing.',
      image: 'https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwdHVya2V5fGVufDF8fHx8MTc2MTk1NTE0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'christmas-sugar-cookies',
      title: 'Christmas Sugar Cookies',
      description: 'Festive decorated cookies perfect for holiday celebrations and gift-giving.',
      image: 'https://images.unsplash.com/photo-1639590229762-3c9a8c98ca31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjb29raWVzfGVufDF8fHx8MTc2MTk1NTM0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'holiday-fruit-pie',
      title: 'Holiday Fruit Pie',
      description: 'Traditional holiday pie with flaky crust and seasonal fruit filling.',
      image: 'https://images.unsplash.com/photo-1759877409091-a17f677a3777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwcGllfGVufDF8fHx8MTc2MTk1NTM0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'gingerbread-cookies',
      title: 'Gingerbread Cookies',
      description: 'Spiced gingerbread cookies decorated with royal icing for the holidays.',
      image: 'https://images.unsplash.com/photo-1616372383709-de2bc15e3dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5nZXJicmVhZCUyMGNvb2tpZXN8ZW58MXx8fHwxNzYxOTEyMjU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'classic-pumpkin-pie',
      title: 'Classic Pumpkin Pie',
      description: 'Creamy spiced pumpkin filling in a buttery pie crust with whipped cream.',
      image: 'https://images.unsplash.com/photo-1637769712646-4dcd5b30092a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wa2luJTIwcGllfGVufDF8fHx8MTc2MTk1NTM0OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'holiday-feast-spread',
      title: 'Holiday Feast Spread',
      description: 'Complete holiday dinner with all the traditional sides and accompaniments.',
      image: 'https://images.unsplash.com/photo-1519910416653-a864f95daa4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwZGlubmVyJTIwdGFibGV8ZW58MXx8fHwxNzYxOTU1MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="container-max px-8 pt-6 pb-4">
        <Breadcrumbs 
          items={[
            { label: 'Recipes', href: '/recipes' },
            { label: 'Holiday' },
          ]} 
        />
      </div>

      {/* Page Header */}
      <section className="container-max px-8 pb-8">
        <h1 className="text-[48px] font-bold text-foreground mb-4">Holiday</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Celebrate special occasions with these festive recipes. From traditional favorites to creative new dishes perfect for making memories.
        </p>
      </section>

      {/* Recipe Grid */}
      <GridSection
        title="Holiday Recipes"
        posts={holidayRecipes}
        baseSlug="/recipes/holiday"
        isFirstSection={true}
      />
    </main>
  );
}
