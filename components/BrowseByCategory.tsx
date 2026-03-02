import { CategoryGrid } from './category-card';
import { recipeCategories, type RecipeCategory } from '@/lib/data/recipeCategories';
import { cn } from '@/lib/utils';

interface BrowseByCategoryProps {
  title?: string;
  className?: string;
  onlyFeatured?: boolean;
  /** Pass fetched WP dish terms to override the hardcoded fallback */
  categories?: RecipeCategory[];
}

export function BrowseByCategory({
  title = 'Browse by Category',
  className,
  onlyFeatured = false,
  categories,
}: BrowseByCategoryProps) {
  // Use provided categories if available, otherwise fall back to hardcoded data
  const sourceCategories = categories && categories.length > 0 ? categories : recipeCategories;

  const filteredCategories = onlyFeatured
    ? sourceCategories.filter((category) => category.featured)
    : sourceCategories;

  const categoriesToRender = filteredCategories.length
    ? filteredCategories
    : sourceCategories;

  const gridCategories = categoriesToRender.map((category) => ({
    title: category.name,
    image: category.image,
    page: category.slug,
  }));

  return (
    <section className={cn(className)}>
      <div className="mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
          {title}
        </h2>
      </div>

      <CategoryGrid categories={gridCategories} />
    </section>
  );
}
