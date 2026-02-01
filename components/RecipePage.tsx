'use client';

import { useState, useEffect, useRef } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star, Copy, Printer, Share2 } from 'lucide-react';
import { toast } from 'sonner';

// UI Components
import { Checkbox } from '@/components/ui/checkbox';
import { Breadcrumbs } from '@/components/Breadcrumbs';

// Recipe data
import { getRecipeBySlug } from '@/data/recipe-data';

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
  const [hoveredRating, setHoveredRating] = useState(0);
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const turnstileRef = useRef<HTMLDivElement>(null);

  // If recipe not found, show 404
  if (!recipe) {
    notFound();
  }

  // Scale ingredient amounts
  const scaleIngredient = (ingredientText: string): string => {
    if (servingMultiplier === 1) return ingredientText;
    
    return ingredientText.replace(/(\d+(?:\/\d+)?|\d+\.\d+)/g, (match) => {
      if (match.includes('/')) {
        const [num, den] = match.split('/').map(Number);
        const scaled = (num / den) * servingMultiplier;
        if (scaled < 1 && scaled * 2 === Math.floor(scaled * 2)) {
          return `${Math.floor(scaled * 2)}/2`;
        }
        if (scaled < 1 && scaled * 4 === Math.floor(scaled * 4)) {
          return `${Math.floor(scaled * 4)}/4`;
        }
        return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
      }
      const scaled = parseFloat(match) * servingMultiplier;
      return scaled % 1 === 0 ? scaled.toString() : scaled.toFixed(1);
    });
  };

  // Get ingredient text with scaling
  const getIngredientText = (index: number): string => {
    const ingredient = recipe.ingredients[index];
    const text = isMetric ? ingredient.metric : ingredient.imperial;
    return scaleIngredient(text);
  };

  // Get scaled servings
  const getScaledServings = (): string => {
    const match = recipe.servings.match(/(\d+)/);
    if (!match) return recipe.servings;
    const baseServings = parseInt(match[1]);
    const scaledServings = baseServings * servingMultiplier;
    return recipe.servings.replace(/\d+/, scaledServings.toString());
  };

  // Copy ingredients to clipboard
  const handleCopyIngredients = () => {
    const ingredientsList = recipe.ingredients
      .map((_, index) => `• ${getIngredientText(index)}`)
      .join('\n');

    try {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(ingredientsList)
          .then(() => toast.success('Ingredients copied to clipboard!'))
          .catch(() => toast.error('Failed to copy ingredients'));
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = ingredientsList;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success('Ingredients copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to copy ingredients');
    }
  };

  // Print recipe
  const handlePrint = () => {
    window.print();
  };

  // Breadcrumbs
  const breadcrumbs = [
    { label: 'Recipes', href: '/recipes' },
    { label: recipe.category, href: `/recipes/${recipe.category.toLowerCase()}` },
    { label: recipe.title }
  ];

  // Social share icons
  const socialIcons = [
    { name: 'pinterest', icon: 'P' },
    { name: 'facebook', icon: 'f' },
    { name: 'twitter', icon: 'X' },
    { name: 'email', icon: '@' },
    { name: 'link', icon: '🔗' },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section - Image Left, Content Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 sm:mb-12">
            {/* Left: Polaroid Image */}
            <div className="flex justify-center lg:justify-start">
              <div 
                className="bg-white p-3 sm:p-4"
                style={{ 
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                  transform: 'rotate(-2deg)',
                  maxWidth: '400px',
                  width: '100%'
                }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right: Recipe Header */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3">
                {recipe.title}
              </h1>
              
              <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                <p>By {recipe.author}</p>
                <p>Published {recipe.publishedDate}</p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= 3.5 ? 'fill-orange-400 text-orange-400' : 'fill-none text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(3)</span>
              </div>

              {/* Social Share Icons */}
              <div className="flex gap-2 mb-6">
                {socialIcons.map((social) => (
                  <button
                    key={social.name}
                    className="w-8 h-8 rounded-full bg-green/10 hover:bg-green/20 flex items-center justify-center text-green text-xs font-semibold transition-colors"
                    aria-label={`Share on ${social.name}`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>

              <p className="text-base text-foreground/80 leading-relaxed">
                {recipe.description}
              </p>
            </div>
          </div>

          {/* Description Paragraphs with Ad Placements */}
          <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
            {recipe.content.map((paragraph, index) => (
              <div key={index}>
                <p className="text-base leading-relaxed text-foreground/90 mb-4">
                  {paragraph}
                </p>
                
                {/* Ad Placements after certain paragraphs */}
                {(index === 0 || index === 2) && (
                  <div className="my-8 bg-peach-light border border-green/20 rounded-lg p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-1">Advertisement</p>
                    <p className="text-xs text-muted-foreground/70">728x90 Ad Space</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recipe Card */}
          <div 
            className="bg-peach-light rounded-lg p-4 sm:p-6 lg:p-8 mb-8"
            style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
          >
            {/* Tabs */}
            <div className="flex border-b border-green/20 mb-6">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === 'ingredients'
                    ? 'text-green border-b-2 border-green'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === 'instructions'
                    ? 'text-green border-b-2 border-green'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Instructions
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === 'notes'
                    ? 'text-green border-b-2 border-green'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Notes
              </button>
              
              {/* Print Button */}
              <button
                onClick={handlePrint}
                className="ml-auto p-2 text-green hover:bg-green/10 rounded-full transition-colors"
                aria-label="Print recipe"
              >
                <Printer className="w-5 h-5" />
              </button>
            </div>

            {/* Recipe Info Card */}
            <div className="bg-white rounded-lg p-4 sm:p-5 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                {/* Recipe Image Thumbnail */}
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                </div>

                {/* Timing and Servings */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-3">{recipe.title}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= 3.5 ? 'fill-orange-400 text-orange-400' : 'fill-none text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">(3 reviews)</span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Prep Time:</p>
                      <p className="font-semibold">{recipe.prepTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Cook Time:</p>
                      <p className="font-semibold">{recipe.cookTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Total Time:</p>
                      <p className="font-semibold">{recipe.totalTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs mb-1">Servings:</p>
                      <p className="font-semibold">{getScaledServings()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cook Mode Notice */}
              <div className="bg-peach-light p-3 rounded text-sm text-foreground/70 flex items-start gap-2">
                <span className="text-base">💡</span>
                <span>Cook Mode: Prevent your screen from going dark</span>
              </div>
            </div>

            {/* Scaling and Measurement Controls */}
            {activeTab === 'ingredients' && (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-green/10">
                {/* Scale Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">Scale:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((multiplier) => (
                      <button
                        key={multiplier}
                        onClick={() => setServingMultiplier(multiplier)}
                        className={`px-3 py-1 text-sm font-semibold rounded transition-colors ${
                          servingMultiplier === multiplier
                            ? 'bg-green text-white'
                            : 'bg-white text-foreground hover:bg-green/10'
                        }`}
                      >
                        {multiplier}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Measurement Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMetric(false)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-l transition-colors ${
                      !isMetric
                        ? 'bg-green text-white'
                        : 'bg-white text-foreground hover:bg-green/10'
                    }`}
                  >
                    Imperial
                  </button>
                  <button
                    onClick={() => setIsMetric(true)}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-r transition-colors ${
                      isMetric
                        ? 'bg-green text-white'
                        : 'bg-white text-foreground hover:bg-green/10'
                    }`}
                  >
                    Metric
                  </button>
                </div>
              </div>
            )}

            {/* Tab Content */}
            {activeTab === 'ingredients' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">
                    Ingredients <span className="text-muted-foreground">(Total: {recipe.ingredients.length})</span>
                  </h4>
                  <button
                    onClick={handleCopyIngredients}
                    className="text-green hover:text-green/80 transition-colors flex items-center gap-1 text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                </div>

                <ul className="space-y-3">
                  {recipe.ingredients.map((_, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Checkbox
                        id={`ingredient-${index}`}
                        checked={checkedIngredients[index] || false}
                        onCheckedChange={(checked) => {
                          setCheckedIngredients(prev => ({
                            ...prev,
                            [index]: checked as boolean
                          }));
                        }}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor={`ingredient-${index}`}
                        className={`flex-1 text-sm cursor-pointer ${
                          checkedIngredients[index] ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {getIngredientText(index)}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div>
                <h4 className="font-semibold text-foreground mb-4">Instructions</h4>
                <ol className="space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green text-white flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <p className="flex-1 text-sm text-foreground/90 leading-relaxed pt-0.5">
                        {instruction}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h4 className="font-semibold text-foreground mb-4">Notes</h4>
                <div className="space-y-3">
                  {recipe.notes.map((note, index) => (
                    <div 
                      key={index}
                      className="bg-white rounded-lg p-4 text-sm text-foreground/90 leading-relaxed"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Kitchen Equipment */}
            {recipe.equipment && recipe.equipment.length > 0 && (
              <div className="border-t border-green/10 pt-6 mt-6">
                <h4 className="font-semibold text-foreground mb-6">Kitchen Equipment</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {recipe.equipment.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="relative aspect-square mb-3 rounded-lg overflow-hidden bg-white">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      </div>
                      <h5 className="text-sm font-semibold text-foreground mb-2">{item.name}</h5>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-3 py-1 bg-green text-white text-sm font-semibold rounded hover:bg-green/90 transition-colors"
                      >
                        Buy Now
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Review Section */}
          <div className="mb-8 sm:mb-12">
            <div 
              className="bg-white rounded-lg p-6 sm:p-8"
              style={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Leave a Review</h3>
              <p className="text-sm text-muted-foreground mb-6 text-center">
                How would you rate this recipe?
              </p>

              {/* Star Rating */}
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 sm:w-10 sm:h-10 ${
                        star <= (hoveredRating || userRating)
                          ? 'fill-orange-400 text-orange-400'
                          : 'fill-none text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (userRating > 0) {
                      toast.success('Thank you! Your review has been submitted.');
                      setUserRating(0);
                    } else {
                      toast.error('Please select a star rating first');
                    }
                  }}
                  className="px-8 py-3 bg-green text-white font-semibold rounded-lg hover:bg-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={userRating === 0}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Ad */}
          <div className="mb-8 bg-peach-light border border-green/20 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Advertisement</p>
            <p className="text-xs text-muted-foreground/70">728x90 Bottom Ad Space</p>
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <section className="bg-peach-light py-12 sm:py-16 border-t border-green/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Get new recipes and kitchen tips delivered straight to your inbox
            </h3>
          </div>

          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-green text-white font-semibold rounded-lg hover:bg-green/90 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Turnstile */}
      <div className="text-center py-8">
        <div ref={turnstileRef}></div>
      </div>
    </main>
  );
}
