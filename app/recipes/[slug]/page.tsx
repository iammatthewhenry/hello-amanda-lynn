import RecipePage from '@/components/RecipePage';
import { getRecipeBySlug, getAllRecipes } from '@/data/recipe-data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: 'Recipe Not Found | hello Amanda Lynn',
      description: 'The recipe you\'re looking for could not be found.',
    };
  }

  return {
    title: `${recipe.title} | hello Amanda Lynn`,
    description: recipe.description,
    openGraph: {
      title: recipe.title,
      description: recipe.description,
      images: [
        {
          url: recipe.image,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
      type: 'article',
      authors: [recipe.author],
      publishedTime: recipe.publishedDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: recipe.title,
      description: recipe.description,
      images: [recipe.image],
    },
    alternates: {
      canonical: `/recipes/${slug}`,
    },
  };
}

// Generate static paths for all recipes
export async function generateStaticParams() {
  const recipes = getAllRecipes();
  
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return <RecipePage params={{ slug }} />;
}

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour
