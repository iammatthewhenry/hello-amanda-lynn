'use client';

import { useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Copy, Printer } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ShareBar } from "@/components/ShareBar";
import { RecipePageTemplate } from "@/components/RecipePageTemplate";
import { toast } from "sonner";
import { getRecipeBySlug } from "@/data/recipe-data";

interface RecipePageProps {
  params: {
    slug: string;
  };
}

export default function RecipePage({ params }: RecipePageProps) {
  const { slug } = params;
  const recipe = getRecipeBySlug(slug);
  
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'notes'>('ingredients');
  const [scale, setScale] = useState<1 | 2 | 3>(1);
  const [useMetric, setUseMetric] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [headerHoverRating, setHeaderHoverRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submittedRatings, setSubmittedRatings] = useState<number[]>([5, 4, 5]); // Demo ratings
  const [showCaptcha, setShowCaptcha] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string>("");
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [userRating, setUserRating] = useState<number>(0); // User's current rating selection

  // Calculate average rating (from backend/submitted ratings)
  const averageRating = submittedRatings.length > 0
    ? submittedRatings.reduce((sum, r) => sum + r, 0) / submittedRatings.length
    : 0;
  const reviewCount = submittedRatings.length;

  // Get the appropriate measurement text with scaling
  const getIngredientText = (index: number) => {
    if (!recipe) return "";
    const ingredient = recipe.ingredients[index];
    const text = useMetric ? ingredient.metric : ingredient.imperial;
    
    // Simple scaling - multiply numbers in the string
    if (scale === 1) return text;
    
    return text.replace(/(\d+\.?\d*)/g, (match) => {
      const num = parseFloat(match);
      return (num * scale).toString();
    });
  };

  // Convert temperature display based on measurement system
  const convertTemperatureText = (text: string) => {
    // Pattern matches temperatures like "400°F (200°C)" or "165°F (74°C)"
    const tempPattern = /(\d+)°F\s*\((\d+)°C\)/g;
    
    return text.replace(tempPattern, (match, fahrenheit, celsius) => {
      if (useMetric) {
        return `${celsius}°C`;
      } else {
        return `${fahrenheit}°F`;
      }
    });
  };

  // Load Turnstile script
  useEffect(() => {
    if (!showCaptcha) return;

    const existingScript = document.querySelector('script[src="https://challenges.cloudflare.com/turnstile/v0/api.js"]');
    
    const renderWidget = () => {
      if (window.turnstile && turnstileRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
          sitekey: '1x00000000000000000000AA',
          callback: (token: string) => {
            setTurnstileToken(token);
          },
          theme: 'light',
          size: 'compact'
        });
      }
    };

    if (existingScript) {
      if (window.turnstile) {
        renderWidget();
      } else {
        existingScript.addEventListener('load', renderWidget);
      }
    } else {
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = renderWidget;
      document.body.appendChild(script);
    }

    return () => {
      widgetIdRef.current = "";
    };
  }, [showCaptcha]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      alert("Please complete the security verification.");
      return;
    }

    if (rating === 0) {
      alert("Please provide a rating.");
      return;
    }

    console.log("Review submitted:", { rating, reviewName, reviewEmail, reviewComment, turnstileToken });
    
    setSubmittedRatings([...submittedRatings, rating]);
    
    setRating(0);
    setReviewName("");
    setReviewEmail("");
    setReviewComment("");
    setTurnstileToken("");
    setShowCaptcha(false);
    
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
    
    alert("Thank you for your review!");
  };

  const handlePrint = () => {
    window.print();
  };

  if (!recipe) {
    notFound();
  }

  return (
    <main>
      
      <RecipePageTemplate>
          {/* Header with Image and Title */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-6 lg:gap-8 mb-8 sm:mb-8 print:hidden">
            {/* Left: Recipe Image */}
            <div className="w-[280px] md:w-[339px] h-[200px] md:h-[250px] flex-shrink-0 mx-auto md:mx-0 overflow-visible mt-[7px] sm:mt-0">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={339}
                height={250}
                className="w-full h-full object-cover border-[8px] sm:border-[16px] border-white -rotate-[6deg] border border-gray-200"
                style={{
                  boxShadow: 'var(--shadow-hero)'
                }}
                priority
              />
            </div>

            {/* Right: Title and Meta */}
            <div className="flex-1 pt-0 sm:pt-0">
              <h1 className="mb-[2vh] sm:mb-3 md:mb-4 text-[6vw] sm:text-[24px] md:text-[28px] lg:text-[42px] leading-[1.2] mt-[13px] md:mt-0">{recipe.title}</h1>
              <div className="text-muted-foreground text-[3.8vw] sm:text-[15px] md:text-base mb-[2vh] sm:mb-4">
                <p className="mb-1 sm:mb-1">By {recipe.author}</p>
                <p className="text-[3.8vw] sm:text-[15px] md:text-base">Published {recipe.publishedDate}</p>
              </div>
              
              {/* Star Rating (Static - from backend) */}
              <div className="flex items-center gap-2 sm:gap-3 mb-0 sm:mb-4 md:mb-6">
                <div className="flex gap-1 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-[5vw] h-[5vw] sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                        star <= averageRating
                          ? 'fill-primary text-primary'
                          : 'fill-none text-green'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-[3.5vw] sm:text-[14px] md:text-sm">
                  {reviewCount > 0 
                    ? `(${reviewCount})`
                    : '(0)'}
                </span>
              </div>

              {/* Share Bar - Below Review Stars */}
              <div className="mb-6 sm:mb-6 mt-[14px] sm:mt-0">
                <ShareBar 
                  title={recipe.title}
                  description={recipe.description}
                  imageUrl={recipe.image}
                  showPrint={true}
                />
              </div>

              {/* Recipe Meta Info */}

            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 max-w-3xl mb-8 sm:mb-12 lg:mb-16 md:ml-24 lg:ml-36 xl:ml-[150px] print:hidden">
            {recipe.content.map((paragraph, index) => (
              <div key={index}>
                {index === 1 && (
                  <div className="my-6 sm:my-8 md:-ml-24 lg:-ml-36 xl:-ml-[150px]">
                    <div className="w-full aspect-square max-w-[175px] mx-auto bg-muted border-2 border-border flex items-center justify-center">
                      <div className="text-center px-4">
                        <p className="text-muted-foreground text-xs sm:text-sm">Advertisement</p>
                        <p className="text-muted-foreground text-[10px] sm:text-xs mt-2">175x175 Ad Space</p>
                      </div>
                    </div>
                  </div>
                )}
                <p className="text-foreground leading-relaxed text-sm sm:text-base lg:text-lg">
                  {paragraph}
                </p>
              </div>
            ))}
            
            {/* Additional Ad Space */}
            <div className="my-6 sm:my-8 md:-ml-24 lg:-ml-36 xl:-ml-[150px]">
              <div className="w-full aspect-square max-w-[175px] mx-auto bg-muted border-2 border-border flex items-center justify-center">
                <div className="text-center px-4">
                  <p className="text-muted-foreground text-xs sm:text-sm">Advertisement</p>
                  <p className="text-muted-foreground text-[10px] sm:text-xs mt-2">175x175 Ad Space</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recipe Card with Tabs */}
          <div className="mt-12 sm:mt-16 lg:mt-[90px]">

            {/* File Folder Tabs */}
            <div className="flex gap-1 sm:gap-2 lg:gap-3 items-center print:hidden">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`flex-1 lg:flex-initial px-3 py-2 sm:px-6 sm:py-3 lg:px-8 text-xs sm:text-base ${
                  activeTab === 'ingredients'
                    ? 'text-green'
                    : 'bg-muted text-muted-foreground'
                }`}
                style={{
                  borderTopLeftRadius: '0px',
                  borderTopRightRadius: '0px',
                  backgroundColor: activeTab === 'ingredients' ? '#F5EBE8' : undefined
                }}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`flex-1 lg:flex-initial px-2 py-2 sm:px-6 sm:py-3 lg:px-8 text-xs sm:text-base ${
                  activeTab === 'instructions'
                    ? 'text-green'
                    : 'bg-muted text-muted-foreground'
                }`}
                style={{
                  borderTopLeftRadius: '0px',
                  borderTopRightRadius: '0px',
                  backgroundColor: activeTab === 'instructions' ? '#F5EBE8' : undefined
                }}
              >
                Instructions
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 lg:flex-initial px-3 py-2 sm:px-6 sm:py-3 lg:px-8 text-xs sm:text-base ${
                  activeTab === 'notes'
                    ? 'text-green'
                    : 'bg-muted text-muted-foreground'
                }`}
                style={{
                  borderTopLeftRadius: '0px',
                  borderTopRightRadius: '0px',
                  backgroundColor: activeTab === 'notes' ? '#F5EBE8' : undefined
                }}
              >
                Notes
              </button>
              <button
                onClick={handlePrint}
                className="ml-auto p-2 sm:p-3 text-[#7A9B8E] hover:text-[#6A8B7E] transition-colors print:hidden"
                aria-label="Print Recipe"
                title="Print Recipe"
              >
                <Printer className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Recipe Card */}
            <div className="recipe-card-print p-4 sm:p-6 lg:p-8" style={{ backgroundColor: '#F5EBE8', boxShadow: '0 12px 17px -4px rgb(0 0 0 / 0.1), 0 5px 7px -5px rgb(0 0 0 / 0.1)' }}>
              {/* Print Header (shows above green line when printing) */}
              <div className="print-header hidden print:block">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-green" style={{ fontSize: '2em', fontWeight: 'bold' }}>{recipe.title}</h2>
                    {/* Star Rating - Print Version (Static) */}
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= averageRating
                                ? 'fill-primary text-primary'
                                : 'fill-none text-green'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {reviewCount > 0 
                          ? `(${reviewCount} review${reviewCount !== 1 ? 's' : ''})`
                          : 'No reviews'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-6">
                    <Image src={recipe.image} alt="Recipe" width={424} height={424} className="w-[424px] aspect-square object-cover" />
                  </div>
                </div>
                {/* Recipe Meta Info - Print Version */}
                <div className="grid grid-cols-4 gap-4 text-sm border-b-2 border-green">
                  <div>
                    <span className="text-muted-foreground">Prep:</span>
                    <span className="ml-2">{recipe.prepTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cook:</span>
                    <span className="ml-2">{recipe.cookTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total:</span>
                    <span className="ml-2">{recipe.totalTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Servings:</span>
                    <span className="ml-2">{recipe.servings}</span>
                  </div>
                </div>
              </div>

              {/* Screen Display Header */}
              <div className="mb-4 sm:mb-6 print:hidden">
                {/* Title and Image Row */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-start mb-2 sm:mb-3">
                  <div className="flex-1">
                    <h2 className="text-green mb-1" style={{ fontSize: '2em', fontWeight: 'bold' }}>{recipe.title}</h2>
                    
                    {/* Star Rating (Static - from backend) */}
                    <div className="flex items-center gap-2 mb-4 sm:mb-6">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              star <= averageRating
                                ? 'fill-primary text-primary'
                                : 'fill-none text-green'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {reviewCount > 0 
                          ? `(${reviewCount} review${reviewCount !== 1 ? 's' : ''})`
                          : 'No reviews'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Image 
                      src={recipe.image} 
                      alt="Recipe Card"
                      width={214}
                      height={214}
                      className="w-[40vw] max-w-[164px] sm:w-[164px] lg:w-[188px] xl:w-[214px] aspect-square object-cover border-[5px] sm:border-[7px] lg:border-[10px] border-white border border-gray-200"
                      style={{
                        boxShadow: 'var(--shadow-hero)'
                      }}
                    />
                  </div>
                </div>
                
                {/* Recipe Meta Info */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
                  <div>
                    <span className="text-muted-foreground">Prep Time:</span>
                    <span className="ml-2">{recipe.prepTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Cook Time:</span>
                    <span className="ml-2">{recipe.cookTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Time:</span>
                    <span className="ml-2">{recipe.totalTime}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Servings:</span>
                    <span className="ml-2">{recipe.servings}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 print:hidden">
                <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                  <Switch id="cook-mode" className="mt-1 sm:mt-0" />
                  <label htmlFor="cook-mode" className="cursor-pointer text-sm sm:text-base">
                    <span className="font-medium">Cook Mode</span> <span className="text-muted-foreground block sm:inline">Prevent your screen from going dark</span>
                  </label>
                </div>
                
                <div className="flex flex-nowrap items-center gap-2 sm:gap-6 w-full sm:w-auto justify-center sm:justify-end">
                  {/* Scale */}
                  <div className="flex flex-col items-center gap-1 sm:gap-2 flex-shrink-0">
                    <span className="font-medium text-sm sm:text-base text-green">Scale</span>
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => setScale(1)}
                        className={`px-2.5 sm:px-4 py-2 border transition-colors text-sm sm:text-base ${
                          scale === 1
                            ? 'bg-green text-green-foreground border-green'
                            : 'bg-white text-foreground border-green hover:bg-green hover:bg-opacity-10'
                        }`}
                      >
                        1x
                      </button>
                      <button
                        onClick={() => setScale(2)}
                        className={`px-2.5 sm:px-4 py-2 border transition-colors text-sm sm:text-base ${
                          scale === 2
                            ? 'bg-green text-green-foreground border-green'
                            : 'bg-white text-foreground border-green hover:bg-green hover:bg-opacity-10'
                        }`}
                      >
                        2x
                      </button>
                      <button
                        onClick={() => setScale(3)}
                        className={`px-2.5 sm:px-4 py-2 border transition-colors text-sm sm:text-base ${
                          scale === 3
                            ? 'bg-green text-green-foreground border-green'
                            : 'bg-white text-foreground border-green hover:bg-green hover:bg-opacity-10'
                        }`}
                      >
                        3x
                      </button>
                    </div>
                  </div>
                  
                  {/* Measurement */}
                  <div className="flex flex-col items-center gap-1 sm:gap-2 flex-shrink-0">
                    <span className="font-medium text-sm sm:text-base text-green whitespace-nowrap">Measurement</span>
                    <div className="flex gap-1 sm:gap-2">
                      <button
                        onClick={() => setUseMetric(false)}
                        className={`px-2.5 sm:px-4 py-2 border transition-colors text-sm sm:text-base ${
                          !useMetric
                            ? 'bg-green text-green-foreground border-green'
                            : 'bg-white text-foreground border-green hover:bg-green hover:bg-opacity-10'
                        }`}
                      >
                        Imperial
                      </button>
                      <button
                        onClick={() => setUseMetric(true)}
                        className={`px-2.5 sm:px-4 py-2 border transition-colors text-sm sm:text-base ${
                          useMetric
                            ? 'bg-green text-green-foreground border-green'
                            : 'bg-white text-foreground border-green hover:bg-green hover:bg-opacity-10'
                        }`}
                      >
                        Metric
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two-column print layout */}
              <div className="hidden print:block print-columns">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-green">Ingredients</h3>
                    <span className="text-muted-foreground text-sm">(Total: {recipe.ingredients.length})</span>
                  </div>
                  <div className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span>•</span>
                        <span>{getIngredientText(index)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-green">Instructions</h3>
                  <ol className="space-y-3 list-decimal list-inside number-font">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{convertTemperatureText(instruction)}</li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Notes for print */}
              <div className="hidden print:block print-notes">
                <h3 className="text-green">Notes</h3>
                <div className="space-y-2">
                  {recipe.notes.map((note, index) => (
                    <p key={index}>{convertTemperatureText(note)}</p>
                  ))}
                </div>
              </div>

              {/* Logo and title footer for print - appears on every page */}
              <div className="hidden print:block print-logo-footer">
                <div className="print-logo-container">
                  <Image src="/logo.png" alt="Hello Amanda Lynn" width={100} height={100} />
                </div>
                <div className="print-title-container">
                  <p className="print-footer-title">{recipe.title}</p>
                </div>
              </div>

              {/* Tab content for screen */}
              <div className="border-t-2 border-green pt-4 sm:pt-6 print:hidden">
                {/* Ingredients Tab Content */}
                {activeTab === 'ingredients' && (
                  <div>
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <h3 className="text-green">Ingredients</h3>
                      <span className="text-muted-foreground text-sm sm:text-base">(Total: {recipe.ingredients.length})</span>
                      <button 
                        onClick={() => {
                          try {
                            const ingredientsList = recipe.ingredients
                              .map((ingredient) => {
                                let text = useMetric ? ingredient.metric : ingredient.imperial;
                                // Remove prefixes like "For crust:", "For filling:", etc.
                                text = text.replace(/^For [^:]+:\s*/i, '');
                                // Apply scale multiplier to numbers in the ingredient text
                                if (scale !== 1) {
                                  return text.replace(/(\d+(?:\.\d+)?(?:\/\d+)?)/g, (match) => {
                                    // Handle fractions like 1/2
                                    if (match.includes('/')) {
                                      const [num, denom] = match.split('/').map(Number);
                                      const result = (num / denom) * scale;
                                      // Convert back to fraction if it's a simple fraction
                                      if (result === 0.25) return '1/4';
                                      if (result === 0.5) return '1/2';
                                      if (result === 0.75) return '3/4';
                                      if (result % 1 === 0) return result.toString();
                                      return result.toFixed(2);
                                    }
                                    const num = parseFloat(match);
                                    const result = num * scale;
                                    return result % 1 === 0 ? result.toString() : result.toFixed(2);
                                  });
                                }
                                return text;
                              })
                              .join('\n');

                            
                            // Helper function for fallback copy method
                            const fallbackCopy = (text: string) => {
                              const textarea = document.createElement('textarea');
                              textarea.value = text;
                              textarea.style.position = 'fixed';
                              textarea.style.left = '-9999px';
                              textarea.style.top = '0';
                              document.body.appendChild(textarea);
                              textarea.focus();
                              textarea.select();
                              
                              try {
                                const success = document.execCommand('copy');
                                document.body.removeChild(textarea);
                                return success;
                              } catch (err) {
                                document.body.removeChild(textarea);
                                return false;
                              }
                            };
                            
                            // Try modern Clipboard API first
                            if (navigator.clipboard && navigator.clipboard.writeText) {
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
      </RecipePageTemplate>
    </main>
  );
}
