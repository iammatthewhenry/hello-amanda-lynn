import { CategoryGrid } from './CategoryCard';

export function BrowseByCategorySection() {
  const recipeCategories = [
    {
      title: 'Breakfast',
      image:
        'https://images.unsplash.com/photo-1746030057364-64613216f835?q=80&w=1124&auto=format&fit=crop',
      page: '/recipes/breakfast',
    },
    {
      title: 'Appetizers',
      image:
        'https://images.unsplash.com/photo-1630230596557-ad07b433f5c0?q=80&w=1170&auto=format&fit=crop',
      page: '/recipes/appetizers',
    },
    {
      title: 'Dinners',
      image:
        'https://images.unsplash.com/photo-1644921504851-b8861be402ac?q=80&w=1374&auto=format&fit=crop',
      page: '/recipes/dinners',
    },
    {
      title: 'Sides',
      image:
        'https://images.unsplash.com/photo-1537786090555-3ae8e11b1d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      page: '/recipes/sides',
    },
    {
      title: 'Desserts',
      image:
        'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=1364&auto=format&fit=crop',
      page: '/recipes/desserts',
      objectPosition: 'center 75%',
    },
    {
      title: 'Drinks',
      image:
        'https://images.unsplash.com/photo-1582269438702-578efa319292?q=80&w=1288&auto=format&fit=crop',
      page: '/recipes/drinks',
    },
    {
      title: 'Holiday',
      image:
        'https://images.unsplash.com/photo-1577308873518-7fd772788ec6?q=80&w=1170&auto=format&fit=crop',
      page: '/recipes/holiday',
    },
    {
      title: 'Americana',
      image:
        'https://images.unsplash.com/photo-1665061580738-87be64cbd049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      page: '/recipes/americana',
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 text-left">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Browse by Category
          </h2>
        </div>

        <CategoryGrid categories={recipeCategories} />
      </div>
    </section>
  );
}
