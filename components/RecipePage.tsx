'use client';

import { useState, useEffect, useRef } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star, Copy, Printer } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
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
  const [submittedRatings, setSubmittedRatings] = useState<number[]>([5, 4, 5]);
  const [userRating, setUserRating] = useState<number>(0);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  if (!recipe) {
    notFound();
  }

  const averageRating =
    submittedRatings.length > 0
      ? submittedRatings.reduce((sum, r) => sum + r, 0) / submittedRatings.length
      : 0;

  const reviewCount = submittedRatings.length;

  const handlePrint = () => {
    window.print();
  };

  const getIngredientText = (index: number) => {
    if (!recipe) return "";
    const ingredient = recipe.ingredients[index];
    const text = useMetric ? ingredient.metric : ingredient.imperial;

    if (scale === 1) return text;

    return text.replace(/(\d+\.?\d*)/g, (match) => {
      const num = parseFloat(match);
      return (num * scale).toString();
    });
  };

  return (
    <main>

      {/* 🔥 BREADCRUMBS REMOVED — GlobalBreadcrumbs handles this */}

      <RecipePageTemplate>

        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8 print:hidden">
          <div className="w-[339px] h-[250px] flex-shrink-0 mx-auto md:mx-0 overflow-visible">
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={339}
              height={250}
              className="w-full h-full object-cover border-[16px] border-white -rotate-[6deg] border border-gray-200"
              priority
            />
          </div>

          <div className="flex-1">
            <h1 className="mb-4 text-3xl lg:text-5xl leading-tight">
              {recipe.title}
            </h1>

            <div className="text-muted-foreground mb-4">
              <p>By {recipe.author}</p>
              <p>Published {recipe.publishedDate}</p>
            </div>

            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= averageRating
                      ? 'fill-primary text-primary'
                      : 'fill-none text-green'
                  }`}
                />
              ))}
              <span className="text-muted-foreground text-sm">
                ({reviewCount})
              </span>
            </div>

            <ShareBar
              title={recipe.title}
              description={recipe.description}
              imageUrl={recipe.image}
              showPrint={true}
            />
          </div>
        </div>

        {/* Recipe Tabs + Content */}
        <div className="mt-12">

          <div className="flex gap-3 items-center print:hidden">
            <button onClick={() => setActiveTab('ingredients')}>Ingredients</button>
            <button onClick={() => setActiveTab('instructions')}>Instructions</button>
            <button onClick={() => setActiveTab('notes')}>Notes</button>
            <button onClick={handlePrint} className="ml-auto">
              <Printer />
            </button>
          </div>

          <div className="border-t-2 border-green pt-6 print:hidden">

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-green mb-4">Ingredients</h3>
                <div className="space-y-3">
                  {recipe.ingredients.map((_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Checkbox
                        checked={checkedIngredients[index] || false}
                        onCheckedChange={(checked) => {
                          setCheckedIngredients(prev => ({
                            ...prev,
                            [index]: checked as boolean
                          }));
                        }}
                      />
                      <span>{getIngredientText(index)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div>
                <h3 className="text-green mb-4">Instructions</h3>
                <ol className="list-decimal list-inside space-y-3">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            )}

            {activeTab === 'notes' && (
              <div>
                <h3 className="text-green mb-4">Notes</h3>
                <div className="space-y-3">
                  {recipe.notes.map((note, index) => (
                    <p key={index}>{note}</p>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </RecipePageTemplate>
    </main>
  );
}
