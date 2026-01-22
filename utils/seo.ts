interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'recipe';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * Generate SEO-friendly page title with site name
 */
export function generatePageTitle(pageTitle: string, siteName: string = "hello Amanda Lynn"): string {
  if (!pageTitle) return siteName;
  return `${pageTitle} | ${siteName}`;
}

/**
 * Create meta description with proper length limits
 */
export function createMetaDescription(description: string, maxLength: number = 160): string {
  if (description.length <= maxLength) return description;
  
  // Truncate at word boundary
  const truncated = description.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 ? truncated.slice(0, lastSpace) + '...' : truncated + '...';
}

/**
 * Generate structured data for recipes
 */
export function generateRecipeStructuredData(recipe: {
  name: string;
  description: string;
  image: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: number;
  ingredients?: string[];
  instructions?: string[];
  author?: string;
  datePublished?: string;
  nutrition?: {
    calories?: number;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
}) {
  return {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.name,
    "description": recipe.description,
    "image": recipe.image,
    "author": {
      "@type": "Person",
      "name": recipe.author || "Amanda Lynn"
    },
    "datePublished": recipe.datePublished,
    "prepTime": recipe.prepTime,
    "cookTime": recipe.cookTime,
    "totalTime": recipe.totalTime,
    "recipeYield": recipe.servings,
    "recipeIngredient": recipe.ingredients || [],
    "recipeInstructions": recipe.instructions?.map(instruction => ({
      "@type": "HowToStep",
      "text": instruction
    })) || [],
    "nutrition": recipe.nutrition ? {
      "@type": "NutritionInformation",
      "calories": recipe.nutrition.calories,
      "proteinContent": recipe.nutrition.protein,
      "carbohydrateContent": recipe.nutrition.carbs,
      "fatContent": recipe.nutrition.fat
    } : undefined
  };
}

/**
 * Generate structured data for blog articles
 */
export function generateArticleStructuredData(article: {
  headline: string;
  description: string;
  image: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Person",
      "name": article.author || "Amanda Lynn"
    },
    "publisher": {
      "@type": "Organization",
      "name": "hello Amanda Lynn",
      "logo": {
        "@type": "ImageObject",
        "url": "https://your-domain.com/logo.png"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified || article.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": article.url
    }
  };
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(seo: SEOData) {
  const tags = [
    { property: 'og:title', content: seo.title },
    { property: 'og:description', content: seo.description },
    { property: 'og:type', content: seo.type || 'website' },
    { property: 'og:site_name', content: 'hello Amanda Lynn' }
  ];

  if (seo.image) {
    tags.push({ property: 'og:image', content: seo.image });
    tags.push({ property: 'og:image:alt', content: seo.title });
  }

  if (seo.url) {
    tags.push({ property: 'og:url', content: seo.url });
  }

  if (seo.publishedTime) {
    tags.push({ property: 'article:published_time', content: seo.publishedTime });
  }

  if (seo.modifiedTime) {
    tags.push({ property: 'article:modified_time', content: seo.modifiedTime });
  }

  if (seo.author) {
    tags.push({ property: 'article:author', content: seo.author });
  }

  return tags;
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(seo: SEOData) {
  const tags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: seo.title },
    { name: 'twitter:description', content: seo.description }
  ];

  if (seo.image) {
    tags.push({ name: 'twitter:image', content: seo.image });
    tags.push({ name: 'twitter:image:alt', content: seo.title });
  }

  return tags;
}

/**
 * Create canonical URL
 */
export function createCanonicalUrl(path: string, baseUrl: string = 'https://your-domain.com'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Generate keywords from content
 */
export function generateKeywords(content: string, existing: string[] = []): string[] {
  // Simple keyword extraction - you might want to use a more sophisticated approach
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter(word => !['this', 'that', 'with', 'from', 'they', 'were', 'been', 'have', 'their', 'said', 'each', 'which', 'them', 'will', 'other'].includes(word));

  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topWords = Object.entries(wordCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);

  return [...new Set([...existing, ...topWords])];
}
