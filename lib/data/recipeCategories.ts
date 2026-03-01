export interface RecipeCategory {
  name: string;
  slug: string;
  taxonomyTerm: string;
  image: string;
  description?: string;
  featured?: boolean;
}

export const recipeCategories: RecipeCategory[] = [
  {
    name: 'Breakfast',
    slug: '/recipes/breakfast',
    taxonomyTerm: 'breakfast',
    image:
      'https://images.unsplash.com/photo-1746030057364-64613216f835?q=80&w=1124&auto=format&fit=crop',
    featured: false,
  },
  {
    name: 'Appetizers',
    slug: '/recipes/appetizers',
    taxonomyTerm: 'appetizers',
    image:
      'https://images.unsplash.com/photo-1630230596557-ad07b433f5c0?q=80&w=1170&auto=format&fit=crop',
    featured: true,
  },
  {
    name: 'Dinners',
    slug: '/recipes/dinners',
    taxonomyTerm: 'dinners',
    image:
      'https://images.unsplash.com/photo-1644921504851-b8861be402ac?q=80&w=1374&auto=format&fit=crop',
    featured: true,
  },
  {
    name: 'Sides',
    slug: '/recipes/sides',
    taxonomyTerm: 'sides',
    image:
      'https://images.unsplash.com/photo-1537786090555-3ae8e11b1d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
  {
    name: 'Desserts',
    slug: '/recipes/desserts',
    taxonomyTerm: 'desserts',
    image:
      'https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?q=80&w=1364&auto=format&fit=crop',
    featured: true,
  },
  {
    name: 'Drinks',
    slug: '/recipes/drinks',
    taxonomyTerm: 'drinks',
    image:
      'https://images.unsplash.com/photo-1582269438702-578efa319292?q=80&w=1288&auto=format&fit=crop',
  },
  {
    name: 'Holiday',
    slug: '/recipes/holiday',
    taxonomyTerm: 'holiday',
    image:
      'https://images.unsplash.com/photo-1577308873518-7fd772788ec6?q=80&w=1170&auto=format&fit=crop',
  },
  {
    name: 'Americana',
    slug: '/recipes/americana',
    taxonomyTerm: 'americana',
    image:
      'https://images.unsplash.com/photo-1665061580738-87be64cbd049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  },
];
