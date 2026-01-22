import RecipeListingPage from '@/components/RecipeListingPage';
import { getAllRecipes } from '@/data/recipe-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recipes | hello Amanda Lynn',
  description: 'Discover delicious recipes from Amanda\'s kitchen. From breakfast favorites to decadent desserts, find your next culinary adventure.',
  openGraph: {
    title: 'Recipes | hello Amanda Lynn',
    description: 'Discover delicious recipes from Amanda\'s kitchen. From breakfast favorites to decadent desserts, find your next culinary adventure.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recipes | hello Amanda Lynn',
    description: 'Discover delicious recipes from Amanda\'s kitchen. From breakfast favorites to decadent desserts, find your next culinary adventure.',
  },
};

export default function RecipesPage() {
  return <RecipeListingPage />;
}

// Generate static props for better SEO
export async function generateStaticParams() {
  return [];
}

// Enable ISR
export const revalidate = 3600; // Revalidate every hour
