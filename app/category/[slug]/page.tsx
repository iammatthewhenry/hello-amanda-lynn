import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRecipesByCategory, getAllDishTerms } from '@/lib/api/recipes';
import RecipeListingPage from '@/components/recipe-listing-page';

/**
 * Category Recipe Listing Page - Server Component
 * 
 * Displays recipes filtered by dish taxonomy from WordPress.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = false;

/**
 * Generate static paths for all recipe dish taxonomy terms
 */
export async function generateStaticParams() {
  try {
    const dishTerms = await getAllDishTerms();
    if (dishTerms && dishTerms.length > 0) {
      return dishTerms.map((dish) => ({
        slug: dish.slug,
      }));
    }
  } catch (error) {
    console.error('Error generating dish category paths:', error);
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
 * Fetches recipes from WordPress filtered by dish taxonomy
 * and passes them to the RecipeListingPage component for display.
 */
export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const data = await getRecipesByCategory(slug);
    
    if (!data || data.recipes.length === 0) {
      notFound();
    }

    // Pass WordPress recipes to the component
    return <RecipeListingPage wpRecipes={data.recipes} categorySlug={slug} />;
  } catch (error) {
    console.error(`Error fetching recipes for category "${slug}":`, error);
    notFound();
  }
}
