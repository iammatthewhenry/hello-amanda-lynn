import RecipePage from '@/components/recipe-page';
import { getRecipeBySlug } from '@/data/recipe-data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const recipe = getRecipeBySlug('eggs-benedict');

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
      canonical: '/recipes/breakfast/eggs-benedict',
    },
  };
}

export default function EggsBenedictPage() {
  const recipe = getRecipeBySlug('eggs-benedict');

  if (!recipe) {
    notFound();
  }

  return <RecipePage params={{ slug: 'eggs-benedict' }} />;
}

// Enable ISR for better performance
export const revalidate = 3600; // Revalidate every hour
