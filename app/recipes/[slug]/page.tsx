import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllRecipeSlugs, getRecipeBySlug } from '@/lib/api/recipes';
import RecipePage from '@/components/recipe-page';
import { getRecipeBySlug as getLocalRecipe, getAllRecipes as getAllLocalRecipes } from '@/data/recipe-data';

/**
 * Recipe Detail Page - Server Component
 * 
 * Fetches recipe data from WordPress. Falls back to local data if WordPress is unavailable.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ISR: Revalidate every hour for recipe pages
export const revalidate = 3600;

/**
 * Generate static paths for all recipes
 * Uses WordPress slugs, falls back to local data
 */
export async function generateStaticParams() {
  try {
    const wpSlugs = await getAllRecipeSlugs();
    if (wpSlugs.length > 0) {
      return wpSlugs.map((slug) => ({ slug }));
    }
  } catch (error) {
    console.error('Error generating recipe paths from WordPress, using local data:', error);
  }

  // Fallback to local recipe data
  return getAllLocalRecipes().map((recipe) => ({ slug: recipe.slug }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try WordPress first
  try {
    const wpRecipe = await getRecipeBySlug(slug);
    if (wpRecipe) {
      const description = wpRecipe.excerpt || wpRecipe.content?.substring(0, 160) || "Delicious recipe from hello Amanda Lynn";
      const imageUrl = wpRecipe.featuredImage?.node.sourceUrl || '';

      return {
        title: wpRecipe.title,
        description,
        openGraph: {
          title: wpRecipe.title,
          description,
          images: imageUrl ? [{ url: imageUrl, width: 1080, alt: wpRecipe.title }] : [],
          type: 'article',
          publishedTime: wpRecipe.date,
        },
        twitter: {
          card: 'summary_large_image',
          title: wpRecipe.title,
          description,
          images: imageUrl ? [imageUrl] : [],
        },
      };
    }
  } catch (error) {
    console.error('Error fetching recipe metadata from WordPress:', error);
  }

  // Fallback to local data
  const localRecipe = getLocalRecipe(slug);
  if (localRecipe) {
    return {
      title: localRecipe.title,
      description: localRecipe.description,
      openGraph: {
        title: localRecipe.title,
        description: localRecipe.description,
        images: [{ url: localRecipe.image, width: 1080, alt: localRecipe.title }],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: localRecipe.title,
        description: localRecipe.description,
        images: [localRecipe.image],
      },
    };
  }

  return {
    title: 'Recipe Not Found',
    description: "The recipe you're looking for could not be found.",
  };
}

/**
 * Recipe page component
 * 
 * TODO: Update RecipePage component to accept WordPress data format
 * For now, passes slug to component which uses local data
 */
export default async function RecipeSlugPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Try to fetch from WordPress
  try {
    const wpRecipe = await getRecipeBySlug(slug);
    if (wpRecipe) {
      // TODO: Transform wpRecipe to RecipePage props format once component is updated
      // For now, fall through to local data
    }
  } catch (error) {
    console.error('Error fetching recipe from WordPress:', error);
  }

  // Use local data (existing behavior)
  const recipe = getLocalRecipe(slug);
  if (!recipe) notFound();

  return <RecipePage params={{ slug }} />;
}
