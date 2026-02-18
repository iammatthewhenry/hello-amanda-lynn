'use client';

import { useEffect, useState, useRef } from 'react';
import { X, Search, Clock, ChefHat, Utensils } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export interface SearchItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'recipes' | 'in-the-kitchen' | 'out-of-kitchen';
  subcategory?: string;
  prepTime?: string;
  cookTime?: string;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  searchData?: SearchItem[];
}

export function SearchOverlay({ 
  isOpen, 
  onClose,
  searchData = []
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter results based on search query
  useEffect(() => {
    if (!query.trim() || searchData.length === 0) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = searchData.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.content.toLowerCase().includes(searchTerm) ||
        item.excerpt.toLowerCase().includes(searchTerm) ||
        item.subcategory?.toLowerCase().includes(searchTerm)
      );
    });

    setResults(filtered);
  }, [query, searchData]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Clear search when overlay closes
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Group results by category
  const recipeResults = results.filter((r) => r.category === 'recipes');
  const kitchenResults = results.filter((r) => r.category === 'in-the-kitchen');
  const outOfKitchenResults = results.filter((r) => r.category === 'out-of-kitchen');

  // Generate URL based on category
  const getResultUrl = (item: SearchItem) => {
    if (item.category === 'recipes') {
      return `/recipes/${item.slug}`;
    } else if (item.category === 'in-the-kitchen') {
      return `/in-the-kitchen/${item.slug}`;
    } else if (item.category === 'out-of-kitchen') {
      return `/out-of-kitchen/${item.slug}`;
    }
    return '/';
  };

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    if (category === 'recipes') return <ChefHat size={16} className="text-green" />;
    return <Utensils size={16} className="text-green" />;
  };

  // Get category display name
  const getCategoryName = (category: string, subcategory?: string) => {
    if (category === 'recipes') {
      return `Recipes ${subcategory ? `• ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}` : ''}`;
    }
    if (category === 'in-the-kitchen') return 'In The Kitchen';
    if (subcategory === 'restaurant-reviews') return 'Restaurant Reviews';
    if (subcategory === 'travel') return 'Travel & Food';
    return 'Out of Kitchen';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      {/* Search Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-20 max-w-6xl">
        <div className="bg-white shadow-lg max-h-[85vh] flex flex-col rounded-lg overflow-hidden">
          {/* Search Input */}
          <div className="border-b-2 border-green p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <Search size={24} className="text-green flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search recipes, posts, and more..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 text-lg sm:text-xl bg-transparent focus:outline-none placeholder:text-foreground/50"
              />
              <button
                onClick={onClose}
                className="text-green hover:text-green/70 transition-colors flex-shrink-0"
                aria-label="Close search"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6">
            {!query.trim() ? (
              <div className="text-center py-12">
                <Search size={48} className="text-green/30 mx-auto mb-4" />
                <p className="text-foreground/60">Start typing to search</p>
                <p className="text-sm text-foreground/40 mt-2">Search for recipes, blog posts, and more</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60">No results found for "{query}"</p>
                <p className="text-sm text-foreground/40 mt-2">Try different keywords or browse our categories</p>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Recipes Section */}
                {recipeResults.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-green font-bold flex items-center gap-2">
                      <ChefHat size={20} />
                      Recipes ({recipeResults.length})
                    </h3>
                    <div className="space-y-4">
                      {recipeResults.map((result) => (
                        <Link
                          key={result.id}
                          href={getResultUrl(result)}
                          onClick={onClose}
                          className="block group hover:bg-gray-50 transition-colors p-3 -mx-3 rounded"
                        >
                          <div className="flex gap-4">
                            {/* Image */}
                            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 overflow-hidden rounded">
                              <Image
                                src={result.image}
                                alt={result.title}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 mb-1">
                                {getCategoryIcon(result.category)}
                                <span className="text-xs text-foreground/60">
                                  {getCategoryName(result.category, result.subcategory)}
                                </span>
                              </div>
                              <h4 className="font-semibold group-hover:text-green transition-colors line-clamp-1">
                                {result.title}
                              </h4>
                              <p className="text-sm text-foreground/70 line-clamp-2 mt-1">
                                {result.excerpt}
                              </p>
                              {result.prepTime && result.cookTime && (
                                <div className="flex items-center gap-3 mt-2 text-xs text-foreground/60">
                                  <span className="flex items-center gap-1">
                                    <Clock size={12} />
                                    Prep: {result.prepTime}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock size={12} />
                                    Cook: {result.cookTime}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* In The Kitchen Section */}
                {kitchenResults.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-green font-bold flex items-center gap-2">
                      <Utensils size={20} />
                      In The Kitchen ({kitchenResults.length})
                    </h3>
                    <div className="space-y-4">
                      {kitchenResults.map((result) => (
                        <Link
                          key={result.id}
                          href={getResultUrl(result)}
                          onClick={onClose}
                          className="block group hover:bg-gray-50 transition-colors p-3 -mx-3 rounded"
                        >
                          <div className="flex gap-4">
                            {/* Image */}
                            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 overflow-hidden rounded">
                              <Image
                                src={result.image}
                                alt={result.title}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 mb-1">
                                {getCategoryIcon(result.category)}
                                <span className="text-xs text-foreground/60">
                                  {getCategoryName(result.category, result.subcategory)}
                                </span>
                              </div>
                              <h4 className="font-semibold group-hover:text-green transition-colors line-clamp-1">
                                {result.title}
                              </h4>
                              <p className="text-sm text-foreground/70 line-clamp-2 mt-1">
                                {result.excerpt}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Out of Kitchen Section */}
                {outOfKitchenResults.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-green font-bold flex items-center gap-2">
                      <Utensils size={20} />
                      Out of Kitchen ({outOfKitchenResults.length})
                    </h3>
                    <div className="space-y-4">
                      {outOfKitchenResults.map((result) => (
                        <Link
                          key={result.id}
                          href={getResultUrl(result)}
                          onClick={onClose}
                          className="block group hover:bg-gray-50 transition-colors p-3 -mx-3 rounded"
                        >
                          <div className="flex gap-4">
                            {/* Image */}
                            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 overflow-hidden rounded">
                              <Image
                                src={result.image}
                                alt={result.title}
                                width={96}
                                height={96}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2 mb-1">
                                {getCategoryIcon(result.category)}
                                <span className="text-xs text-foreground/60">
                                  {getCategoryName(result.category, result.subcategory)}
                                </span>
                              </div>
                              <h4 className="font-semibold group-hover:text-green transition-colors line-clamp-1">
                                {result.title}
                              </h4>
                              <p className="text-sm text-foreground/70 line-clamp-2 mt-1">
                                {result.excerpt}
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t border-border/50 px-4 sm:px-6 py-3 text-xs text-foreground/50 text-center">
            Press <kbd className="px-2 py-1 bg-gray-100 text-foreground/70 mx-1 rounded">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
