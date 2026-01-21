'use client';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { GridSection } from '@/components/GridSection';

export default function DessertsPage() {
  const desserts = [
    {
      slug: 'rich-chocolate-cake',
      title: 'Rich Chocolate Cake',
      description: 'Decadent multi-layer chocolate cake with smooth ganache frosting.',
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDF8fHx8MTc2MTkxNzc3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'fresh-fruit-tart',
      title: 'Fresh Fruit Tart',
      description: 'Buttery tart shell filled with vanilla cream and seasonal fruits.',
      image: 'https://images.unsplash.com/photo-1670819916757-e8d5935a6c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHRhcnR8ZW58MXx8fHwxNzYxOTU1MTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'classic-tiramisu',
      title: 'Classic Tiramisu',
      description: 'Italian coffee-soaked dessert with mascarpone and cocoa.',
      image: 'https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxODg2OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'creme-brulee',
      title: 'Crème Brûlée',
      description: 'Silky vanilla custard topped with caramelized sugar crust.',
      image: 'https://images.unsplash.com/photo-1676300184943-09b2a08319a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVtZSUyMGJydWxlZXxlbnwxfHx8fDE3NjE5NTUxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'artisan-ice-cream',
      title: 'Artisan Ice Cream',
      description: 'Homemade ice cream in classic and creative flavors.',
      image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbXxlbnwxfHx8fDE3NjE5MDg0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      slug: 'french-macarons',
      title: 'French Macarons',
      description: 'Delicate almond meringue cookies with smooth buttercream filling.',
      image: 'https://images.unsplash.com/photo-1580421383318-f87fc861a696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNhcm9ucyUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxOTU1MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <main>
      {/* Breadcrumbs */}
      <div className="container-max px-8 pt-6 pb-4">
        <Breadcrumbs 
          items={[
            { label: 'Recipes', href: '/recipes' },
            { label: 'Desserts' },
          ]} 
        />
      </div>

      {/* Page Header */}
      <section className="container-max px-8 pb-8">
        <h1 className="text-[48px] font-bold text-foreground mb-4">Desserts</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Sweet treats and delicious desserts to satisfy your cravings. From simple cookies to show-stopping cakes, find your next favorite dessert.
        </p>
      </section>

      {/* Recipe Grid */}
      <GridSection
        title="Dessert Recipes"
        posts={desserts}
        baseSlug="/recipes/desserts"
        isFirstSection={true}
      />
    </main>
  );
}
