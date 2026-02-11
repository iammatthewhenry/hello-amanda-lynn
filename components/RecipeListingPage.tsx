'use client';

import { useState, useMemo } from 'react';
import { Search, Filter } from 'lucide-react';

import { getAllRecipes, getRecipesByCategory, RECIPE_CATEGORIES, type Recipe } from '@/data/recipe-data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContentCard } from '@/components/ContentCard';

interface RecipeListingPageProps {
  initialCategory?: string;
}

export default function RecipeListingPage({ initialCategory }: RecipeListingPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'All');
  const [sortBy, setSortBy] = useState<'recent' | 'title' | 'category'>('recent');

  const allRecipes = getAllRecipes();

  // Filter and search recipes
  const filteredRecipes = useMemo(() => {
    let recipes = allRecipes;

    // Filter by category
    if (selectedCategory !== 'All') {
      recipes = getRecipesByCategory(selectedCategory);
    }

    // Search by title or description
    if (searchTerm) {
      recipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort recipes
    recipes = [...recipes].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return recipes;
  }, [allRecipes, selectedCategory, searchTerm, sortBy]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Recipes', href: '/recipes' },
    ...(selectedCategory !== 'All' ? [{ label: selectedCategory }] : [])
  ];

  return (
    <main>
      <section className="py-[22px] sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Breadcrumbs */}
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green tracking-tight mb-4">
              {selectedCategory === 'All' ? 'All Recipes' : `${selectedCategory} Recipes`}
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover {filteredRecipes.length} delicious recipes from Amanda's kitchen
            </p>
          </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-6">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green focus:border-green"
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green focus:border-green"
              >
                <option value="All">All Categories</option>
                {RECIPE_CATEGORIES.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'title' | 'category')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green focus:border-green"
            >
              <option value="recent">Most Recent</option>
              <option value="title">Alphabetical</option>
              <option value="category">By Category</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
          {searchTerm && (
            <span> for &ldquo;{searchTerm}&rdquo;</span>
          )}
        </div>

        {/* Recipe Grid */}
        {filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecipes.map((recipe) => (
              <ContentCard
                key={recipe.id}
                title={recipe.title}
                description={recipe.description}
                image={recipe.image}
                href={`/recipes/${recipe.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No recipes found</h3>
              <p className="text-sm">
                {searchTerm 
                  ? `No recipes match "${searchTerm}". Try a different search term.`
                  : 'No recipes available in this category.'
                }
              </p>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-green hover:text-green-hover transition-colors text-sm font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
        </div>
      </section>
    </main>
  );
}
