'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Copy, Printer } from 'lucide-react';
import { toast } from 'sonner';

// UI Components (assuming these exist in your project)
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShareBar } from '@/components/ShareBar';
import { RecipePageTemplate } from '@/components/RecipePageTemplate';

// Recipe data
import { recipes, getRecipeBySlug, type Recipe } from '@/data/recipe-data';

interface RecipeComponentProps {
  params: {
    slug: string;
  };
}

export default function RecipePage({ params }: RecipeComponentProps) {
  const { slug } = params;
  const recipe = getRecipeBySlug(slug);

  // State management
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'notes'>('ingredients');
  const [isMetric, setIsMetric] = useState(false);
  const [checkedIngredients, setCheckedIngredients] = useState<{[key: number]: boolean}>({});
  const [userRating, setUserRating] = useState(0);
  const [submittedRatings, setSubmittedRatings] = useState<number[]>([]);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  
  const turnstileRef = useRef<HTMLDivElement>(null);

  // If recipe not found, show 404
  if (!recipe) {
    notFound();
  }

  // Temperature conversion function
  const convertTemperatureText = (text: string): string => {
    if (isMetric) {
      return text.replace(/(\d+)°F/g, (match, fahrenheit) => {
        const celsius = Math.round((parseInt(fahrenheit) - 32) * 5 / 9);
        return `${celsius}°C`;
      });
    }
    return text;
  };

  // Get ingredient text based on metric/imperial preference
  const getIngredientText = (index: number): string => {
    const ingredient = recipe.ingredients[index];
    return convertTemperatureText(isMetric ? ingredient.metric : ingredient.imperial);
  };

  // Clipboard copy functionality
  const fallbackCopy = (text: string): boolean => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const result = document.execCommand('copy');
      document.body.removeChild(textArea);
      return result;
    } catch (error) {
      return false;
    }
  };

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Share functionality
  const handleShare = async () => {
    const url = window.location.href;
    const title = recipe.title;
    const text = recipe.description;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        toast.success('Recipe shared successfully!');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Failed to share recipe');
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Recipe link copied to clipboard!');
      } catch (error) {
        if (fallbackCopy(url)) {
          toast.success('Recipe link copied to clipboard!');
        } else {
          toast.error('Failed to copy link');
        }
      }
    }
  };

  // Turnstile integration
  useEffect(() => {
    const loadTurnstile = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '',
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          theme: 'light',
          size: 'compact'
        });
      }
    };

    if (window.turnstile) {
      loadTurnstile();
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.onload = loadTurnstile;
      document.head.appendChild(script);
    }
  }, []);

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Recipes', href: '/recipes' },
    { label: recipe.category, href: `/recipes/category/${recipe.category.toLowerCase().replace(' ', '-')}` },
    { label: recipe.title }
  ];

  return (
    <main>
      <RecipePageTemplate>
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-4 sm:mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          {/* Recipe Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green mb-2 sm:mb-3">
              {recipe.title}
            </h1>
            <p className="text-sm sm:text-base text-foreground/70 mb-3 sm:mb-4">
              {recipe.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-xs sm:text-sm text-foreground/60">
              <span>By {recipe.author}</span>
              <span>•</span>
              <span>{recipe.publishedDate}</span>
              <span>•</span>
              <span>{recipe.category}</span>
            </div>
          </div>

          {/* Recipe Image */}
          <div className="mb-6 sm:mb-8">
            <div className="aspect-video sm:aspect-[4/3] overflow-hidden rounded-lg bg-white border-4 border-white" style={{ boxShadow: 'var(--shadow-hero)' }}>
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Recipe Info Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6 sm:mb-8 p-4 sm:p-6 bg-background rounded-lg border-2 border-green">
            <div className="text-center">
              <div className="text-xs sm:text-sm text-foreground/60 mb-1">Prep Time</div>
              <div className="font-semibold text-sm sm:text-base">{recipe.prepTime}</div>
            </div>
            <div className="text-center">
              <div className="text-xs sm:text-sm text-foreground/60 mb-1">Cook Time</div>
              <div className="font-semibold text-sm sm:text-base">{recipe.cookTime}</div>
            </div>
            <div className="text-center">
              <div className="text-xs sm:text-sm text-foreground/60 mb-1">Servings</div>
              <div className="font-semibold text-sm sm:text-base">{recipe.servings}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-green text-green-foreground hover:bg-green-hover transition-colors text-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print Recipe</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border-2 border-green text-green hover:bg-green hover:text-green-foreground transition-colors text-sm"
            >
              <span>Share Recipe</span>
            </button>
          </div>

          {/* Recipe Content Paragraphs */}
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            {recipe.content.map((paragraph, index) => (
              <p key={index} className="text-sm sm:text-base text-foreground leading-relaxed">
                {convertTemperatureText(paragraph)}
              </p>
            ))}
          </div>

          {/* Recipe Details Container */}
          <div className="bg-background rounded-lg border-2 border-green p-4 sm:p-6 lg:p-8">
            {/* Unit Toggle */}
            <div className="flex justify-center mb-4 sm:mb-6 print:hidden">
              <div className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                <span className={`text-sm ${!isMetric ? 'font-semibold' : ''}`}>Imperial</span>
                <Switch
                  checked={isMetric}
                  onCheckedChange={setIsMetric}
                  aria-label="Toggle between Imperial and Metric measurements"
                />
                <span className={`text-sm ${isMetric ? 'font-semibold' : ''}`}>Metric</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-6 sm:mb-8 print:hidden">
              <div className="flex bg-muted rounded-lg p-1">
                {(['ingredients', 'instructions', 'notes'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                      activeTab === tab
                        ? 'bg-green text-green-foreground'
                        : 'text-foreground hover:text-green'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="print:!block">
              {/* Ingredients Tab Content */}
              {activeTab === 'ingredients' && (
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="text-green">Ingredients</h3>
                    <button
                      onClick={() => {
                        const ingredientsList = recipe.ingredients
                          .map((ingredient, index) => `• ${getIngredientText(index)}`)
                          .join('\n');

                        try {
                          if (navigator.clipboard && window.isSecureContext) {
                            navigator.clipboard.writeText(ingredientsList)
                              .then(() => {
                                toast.success('Ingredients copied to clipboard!');
                              })
                              .catch(() => {
                                // Modern API failed, try fallback
                                if (fallbackCopy(ingredientsList)) {
                                  toast.success('Ingredients copied to clipboard!');
                                } else {
                                  toast.error('Failed to copy ingredients');
                                }
                              });
                          } else {
                            // Modern API not available, use fallback
                            if (fallbackCopy(ingredientsList)) {
                              toast.success('Ingredients copied to clipboard!');
                            } else {
                              toast.error('Failed to copy ingredients');
                            }
                          }
                        } catch (error) {
                          toast.error('Failed to copy ingredients');
                        }
                      }}
                      className="text-green hover:opacity-70 transition-opacity flex items-center gap-1"
                    >
                      <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm">Copy</span>
                    </button>
                  </div>
                  
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center gap-2 sm:gap-3">
                        <Checkbox 
                          id={`ingredient-${index}`}
                          checked={checkedIngredients[index] || false}
                          onCheckedChange={(checked) => {
                            setCheckedIngredients(prev => ({
                              ...prev,
                              [index]: checked as boolean
                            }));
                          }}
                        />
                        <label 
                          htmlFor={`ingredient-${index}`} 
                          className={`cursor-pointer text-sm sm:text-base ${checkedIngredients[index] ? 'line-through text-muted-foreground' : ''}`}
                        >
                          {getIngredientText(index)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions Tab Content */}
              {activeTab === 'instructions' && (
                <div>
                  <h3 className="text-green mb-3 sm:mb-4">Instructions</h3>
                  <ol className="space-y-3 sm:space-y-4 list-decimal list-inside number-font">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="text-foreground text-sm sm:text-base">{convertTemperatureText(instruction)}</li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Notes Tab Content */}
              {activeTab === 'notes' && (
                <div>
                  <h3 className="text-green mb-3 sm:mb-4">Notes</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {recipe.notes.map((note, index) => (
                      <p key={index} className="text-foreground text-sm sm:text-base">{convertTemperatureText(note)}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Equipment Section - Always visible (sticky/not controlled by tabs) */}
            {recipe.equipment && recipe.equipment.length > 0 && (
              <div className="border-t-2 border-green pt-4 sm:pt-6 mt-4 sm:mt-6 print:hidden">
                <h3 className="text-green mb-4 sm:mb-6 font-semibold font-bold">Kitchen Equipment</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                  {recipe.equipment.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div 
                        className="w-full aspect-square mb-3 overflow-hidden bg-white border-4 border-white border border-gray-200"
                        style={{
                          boxShadow: 'var(--shadow-hero)'
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="mb-2 text-sm sm:text-base flex-grow">{item.name}</h4>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green text-green-foreground transition-colors hover:bg-[#6A8B7E] text-sm shadow-md"
                      >
                        Buy Now
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Star Rating Section - Only on recipe page, not on recipe card */}
          <div className="max-w-4xl mx-auto mt-8 sm:mt-12 mb-8 sm:mb-12 print:hidden">
            <div className="text-center">
              <h3 className="text-green mb-4 sm:mb-6">Leave a Review</h3>
              <p className="text-foreground/70 mb-4 sm:mb-6 text-sm sm:text-base">How would you rate this recipe?</p>
              <div className="flex justify-center gap-2 mb-6 sm:mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => {
                      setUserRating(star);
                    }}
                    className="transition-all hover:scale-110"
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star 
                      className={`w-8 h-8 sm:w-10 sm:h-10 text-[#D4A5A5] transition-all ${
                        star <= userRating ? 'fill-[#D4A5A5]' : 'fill-transparent hover:fill-[#D4A5A5]'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  if (userRating > 0) {
                    setSubmittedRatings([...submittedRatings, userRating]);
                    setUserRating(0); // Reset after submission
                    toast.success('Thank you! Your review has been submitted.');
                  } else {
                    toast.error('Please select a star rating first');
                  }
                }}
                className="px-8 py-3 bg-green text-green-foreground hover:bg-green-hover transition-colors text-sm sm:text-base"
              >
                Submit Review
              </button>
            </div>
          </div>

          {/* Turnstile Challenge */}
          <div className="text-center mt-8 print:hidden">
            <div ref={turnstileRef}></div>
          </div>
        </div>
      </RecipePageTemplate>
    </main>
  );
}
