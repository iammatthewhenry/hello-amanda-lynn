import { CategoryGrid } from './CategoryCard';

export function BrowseByCategorySection() {
  const recipeCategories = [
    {
      title: 'Breakfast',
      image: 'https://images.unsplash.com/photo-1746030057364-64613216f835?q=80&w=1124&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      page: 'breakfast',
    },
    {
      title: 'Appetizers',
      image: 'https://images.unsplash.com/photo-1630230596557-ad07b433f5c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      page: 'appetizers',
    },
    {
      title: 'Dinners',
      image: 'https://images.unsplash.com/photo-1644921504851-b8861be402ac?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      page: 'dinners',
    },
    {
      title: 'Sides',
      image: 'https://images.unsplash.com/photo-1537786090555-3ae8e11b1d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwcG90YXRvZXN8ZW58MXx8fHwxNzY2NjAwODU3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      page: 'sides',
    },
    {
      title: 'Desserts',
      image: 'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      page: 'desserts',
      objectPosition: 'center 75%',
    },
    {
      title: 'Drinks',
      image: 'https://images.unsplash.com/photo-1582269438702-578efa319292?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      page: 'drinks',
    },
    {
      title: 'Holiday',
      image: 'https://images.unsplash.com/photo-1577308873518-7fd772788ec6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      page: 'holiday',
    },
    {
      title: 'Americana',
      image: 'https://images.unsplash.com/photo-1665061580738-87be64cbd049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXRyaW90aWMlMjBhbWVyaWNhbiUyMGZvb2QlMjBmbGFnfGVufDF8fHx8MTc2NzgzMjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      page: 'americana',
    },
  ];

  return (
    <section className="pt-0 pb-[22px] sm:pt-[37px] sm:pb-16 lg:pt-[53px] lg:pb-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="page-section-header">
          <h2>Browse by Category</h2>
        </div>

        <CategoryGrid categories={recipeCategories} variant="recipes" />
      </div>
    </section>
  );
}
