import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllRecipeSlugs, getRecipeBySlug, getRecipesByDish, getAllDishTerms } from '@/lib/api/recipes';
import RecipePage from '@/components/recipe-page';
import RecipeListingPage from '@/components/recipe-listing-page';
import { getRecipeBySlug as getLocalRecipe, getAllRecipes as getAllLocalRecipes } from '@/data/recipe-data';

/**
 * Recipe Dynamic Route - Server Component
 * 
 * Handles BOTH:
 * 1. Individual recipe posts (e.g., /recipes/fluffy-pancakes)
 * 2. Dish taxonomy archives (e.g., /recipes/appetizers)
 * 
 * ROUTING LOGIC:
 * - First attempts to fetch as a recipe post
 * - If not found, attempts to fetch as a dish taxonomy term
 * - If neither exists, returns 404
 * 
 * NOTE: Static routes (e.g., /recipes/breakfast/page.tsx) take precedence
 * over this dynamic route per Next.js routing rules.
 */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = false;

/**
 * Generate static paths for both recipes AND dish terms
 */
export async function generateStaticParams() {
  const paths: { slug: string }[] = [];

  try {
    // 1. Get all recipe post slugs
    const recipeSlugs = await getAllRecipeSlugs();
    if (recipeSlugs.length > 0) {
      paths.push(...recipeSlugs.map((slug) => ({ slug })));
    }

    // 2. Get all dish taxonomy term slugs
    const dishTerms = await getAllDishTerms();
    if (dishTerms.length > 0) {
      paths.push(...dishTerms.map((term) => ({ slug: term.slug })));
    }

    if (paths.length > 0) {
      return paths;
    }
  } catch (error) {
    console.error('Error generating recipe/dish paths from WordPress:', error);
  }

  // Fallback: include both local recipes and common dish terms
  const localPaths = getAllLocalRecipes().map((recipe) => ({ slug: recipe.slug }));
  const dishPaths = [
    'breakfast', 'appetizers', 'dinners', 'sides', 
    'desserts', 'drinks', 'holiday', 'americana'
  ].map((slug) => ({ slug }));

  return [...localPaths, ...dishPaths];
}

/**
 * Generate metadata for SEO
 * Handles both recipe posts and dish taxonomy archives
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Try as recipe post first
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
    // Not a recipe post, could be a dish term
  }

  // Try as dish taxonomy term
  try {
    const dishData = await getRecipesByDish(slug);
    if (dishData && dishData.recipes.length > 0) {
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
  } catch (error) {
    // Not a dish term either
  }

  // Fallback to local recipe data
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
    title: 'Not Found',
    description: "The page you're looking for could not be found.",
  };
}

/**
 * Dynamic page component - handles both recipe posts and dish taxonomy archives
 * 
 * DETERMINATION LOGIC:
 * 1. Try to fetch as recipe post from WordPress
 * 2. If not found, try to fetch as dish taxonomy term
 * 3. If neither, fall back to local recipe data
 * 4. If still not found, return 404
 */
export default async function RecipeSlugPage({ params }: PageProps) {
  const { slug } = await params;
  
  // ================================================================
  // DEBUG LOGGING - Server-side only, visible in build/dev logs
  // ================================================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`[Recipe Route] Processing slug: "${slug}"`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // ================================================================
  // ATTEMPT 1: Fetch as Recipe Post
  // ================================================================
  try {
    console.log(`[Recipe Route] → Attempting to fetch as recipe post...`);
    const wpRecipe = await getRecipeBySlug(slug);
    
    if (wpRecipe) {
      console.log(`[Recipe Route] ✓ SUCCESS: Found recipe post "${wpRecipe.title}"`);
      console.log(`[Recipe Route] → Rendering RecipePage component`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      // TODO: Transform wpRecipe to RecipePage props format once component is updated
      // For now, fall through to local data
    } else {
      console.log(`[Recipe Route] ✗ Not found as recipe post`);
    }
  } catch (error) {
    console.log(`[Recipe Route] ✗ Error fetching as recipe:`, error);
  }

  // ================================================================
  // ATTEMPT 2: Fetch as Dish Taxonomy Archive
  // ================================================================
  try {
    console.log(`[Recipe Route] → Attempting to fetch as dish taxonomy term...`);
    const dishData = await getRecipesByDish(slug);
    
    console.log(`[Recipe Route] GraphQL Response:`, {
      hasData: !!dishData,
      recipesCount: dishData?.recipes?.length || 0,
      hasPageInfo: !!dishData?.pageInfo,
    });
    
    if (dishData && dishData.recipes && dishData.recipes.length > 0) {
      console.log(`[Recipe Route] ✓ SUCCESS: Found ${dishData.recipes.length} recipes for dish "${slug}"`);
      console.log(`[Recipe Route] → Rendering RecipeListingPage component`);
      console.log(`[Recipe Route] First 3 recipes:`, dishData.recipes.slice(0, 3).map(r => r.title));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      
      return <RecipeListingPage wpRecipes={dishData.recipes} categorySlug={slug} />;
    } else {
      console.log(`[Recipe Route] ✗ No recipes found for dish term "${slug}"`);
      
      // DIAGNOSIS: Determine if this is a WordPress or frontend issue
      if (dishData && dishData.recipes && dishData.recipes.length === 0) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  DIAGNOSIS: WordPress Issue');
        console.log('   - GraphQL query succeeded but returned 0 posts');
        console.log('   - Check WordPress admin: are recipes tagged with this dish?');
        console.log('   - Verify taxonomy "dishes" is properly registered');
        console.log('   - Verify taxonomy is exposed to GraphQL (graphqlSingleName="dish")');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      } else if (!dishData) {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('⚠️  DIAGNOSIS: GraphQL Connection Issue');
        console.log('   - WordPress GraphQL endpoint may be unreachable');
        console.log('   - Check WORDPRESS_GRAPHQL_ENDPOINT configuration');
        console.log('   - Verify network connectivity to WordPress');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      }
    }
  } catch (error) {
    console.log(`[Recipe Route] ✗ Error fetching as dish term:`, error);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  DIAGNOSIS: GraphQL Query Error');
    console.log('   - Check if query syntax is correct');
    console.log('   - Verify taxonomy enum name (should be DISH)');
    console.log('   - Check WordPress GraphQL schema');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  }

  // ================================================================
  // FALLBACK: Local Recipe Data
  // ================================================================
  console.log(`[Recipe Route] → Attempting fallback to local recipe data...`);
  const recipe = getLocalRecipe(slug);
  
  if (recipe) {
    console.log(`[Recipe Route] ✓ Found in local data: "${recipe.title}"`);
    console.log(`[Recipe Route] → Rendering RecipePage with local data`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    return <RecipePage params={{ slug }} />;
  }

  // ================================================================
  // NOT FOUND
  // ================================================================
  console.log(`[Recipe Route] ✗ Not found in any data source`);
  console.log(`[Recipe Route] → Returning 404`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  notFound();
}
