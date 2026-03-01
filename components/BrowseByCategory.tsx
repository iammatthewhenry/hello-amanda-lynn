import { CategoryGrid } from './category-card';
import { recipeCategories } from '@/lib/data/recipeCategories';
import { cn } from '@/lib/utils';

interface BrowseByCategoryProps {
  title?: string;
  className?: string;
  onlyFeatured?: boolean;
}

export function BrowseByCategory({
  title = 'Browse by Category',
  className,
  onlyFeatured = false,
}: BrowseByCategoryProps) {
  const filteredCategories = onlyFeatured
    ? recipeCategories.filter((category) => category.featured)
    : recipeCategories;

  const categoriesToRender = filteredCategories.length
    ? filteredCategories
    : recipeCategories;

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
