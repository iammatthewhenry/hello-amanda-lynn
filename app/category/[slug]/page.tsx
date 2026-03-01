export const runtime = 'edge';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRecipesByCategory } from '@/lib/api/recipes';
import { getCategories } from '@/lib/api/homepage';
import RecipeListingPage from '@/components/recipe-listing-page';

/**
 * Category Recipe Listing Page - Server Component
 * 
 * Displays recipes filtered by category from WordPress.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = false;

/**
 * Generate static paths for all recipe categories
 */
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    if (categories && categories.length > 0) {
      return categories.map((cat) => ({
        slug: cat.page.replace('/recipes/', ''),
      }));
    }
  } catch (error) {
    console.error('Error generating category paths:', error);
  }

  // Fallback to default categories
  return [
    { slug: 'breakfast' },
    { slug: 'appetizers' },
    { slug: 'dinners' },
    { slug: 'sides' },
    { slug: 'desserts' },
    { slug: 'drinks' },
    { slug: 'holiday' },
    { slug: 'americana' },
  ];
}

/**
 * Generate metadata for category pages
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categoryName = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${categoryName} Recipes`,
    description: `Explore ${categoryName.toLowerCase()} recipes from hello Amanda Lynn - delicious, tested recipes for every occasion.`,
    openGraph: {
      title: `${categoryName} Recipes`,
      description: `Browse ${categoryName.toLowerCase()} recipes by Amanda Lynn`,
      type: 'website',
    },
  };
}

/**
 * Category page component
 * 
 * TODO: Update RecipeListingPage component to accept WordPress post data
 * For now returns placeholder until component is updated
 */
export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const data = await getRecipesByCategory(slug);
    
    if (!data || data.recipes.length === 0) {
      notFound();
    }

    // TODO: Pass WordPress recipes to RecipeListingPage once component supports it
    // For now, the component will use its internal data
    return <RecipeListingPage />;
  } catch (error) {
    console.error(`Error fetching recipes for category "${slug}":`, error);
    notFound();
  }
}
