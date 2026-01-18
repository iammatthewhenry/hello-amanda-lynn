'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import placeholderImage from '/public/images/placeholder.png';
import logo from '/public/images/logo.png';
import { Star, Copy, Printer } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Container } from '@/components/ui';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ShareBar } from '@/components/ShareBar';
import { RecipePageTemplate } from '@/components/RecipePageTemplate';
import { toast } from 'sonner';

// Extend Window interface for Turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (element: string | HTMLElement, options: {
        sitekey: string;
        callback?: (token: string) => void;
        theme?: string;
        size?: string;
      }) => string;
      reset: (widgetId: string) => void;
    };
  }
}

// Recipe data type
interface Recipe {
  title: string;
  image: string;
  publishedDate: string;
  author: string;
  category: string;
  description: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  content: string[];
  ingredients: {
    imperial: string;
    metric: string;
  }[];
  instructions: string[];
  notes: string[];
  equipment?: {
    name: string;
    image: string;
    link: string;
  }[];
}

// Recipe database
const recipes: Record<string, Recipe> = {
  'fluffy-buttermilk-pancakes': {
    title: 'Fluffy Buttermilk Pancakes',
    image: 'https://images.unsplash.com/photo-1636743713732-125909a35dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBwYW5jYWtlc3xlbnwxfHx8fDE3NjE4ODc4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'October 15, 2025',
    author: 'Amanda Lynn',
    category: 'Breakfast',
    description: 'Light and fluffy pancakes with maple syrup and fresh berries.',
    prepTime: '10 min',
    cookTime: '15 min',
    totalTime: '25 min',
    servings: '4 servings',
    content: [
      'These buttermilk pancakes are the epitome of a perfect weekend breakfast. Light, fluffy, and golden brown, they\'re everything a pancake should be.',
      'The secret to their fluffiness is the buttermilk, which reacts with the baking soda to create air pockets throughout the batter. Don\'t overmix - a few lumps are perfectly fine and will result in tender pancakes.',
      'I love serving these with pure maple syrup and fresh berries, but they\'re also delicious with butter and powdered sugar, or even with a dollop of whipped cream.',
      'Make a double batch and freeze the extras! They reheat beautifully in the toaster for quick weekday breakfasts.'
    ],
    ingredients: [
      { imperial: '2 cups all-purpose flour', metric: '240 g all-purpose flour' },
      { imperial: '2 tablespoons sugar', metric: '25 g sugar' },
      { imperial: '2 teaspoons baking powder', metric: '10 g baking powder' },
      { imperial: '1 teaspoon baking soda', metric: '5 g baking soda' },
      { imperial: '1/2 teaspoon salt', metric: '3 g salt' },
      { imperial: '2 cups buttermilk', metric: '480 ml buttermilk' },
      { imperial: '2 large eggs', metric: '2 large eggs' },
      { imperial: '1/4 cup melted butter', metric: '60 ml melted butter' },
      { imperial: '1 teaspoon vanilla extract', metric: '5 ml vanilla extract' }
    ],
    instructions: [
      'In a large bowl, whisk together flour, sugar, baking powder, baking soda, and salt.',
      'In a separate bowl, whisk together buttermilk, eggs, melted butter, and vanilla extract.',
      'Pour the wet ingredients into the dry ingredients and stir until just combined. Don\'t overmix - a few lumps are fine.',
      'Heat a griddle or large skillet over medium heat and lightly grease with butter or cooking spray.',
      'Pour 1/4 cup of batter for each pancake onto the hot griddle. Cook until bubbles form on the surface and the edges look set, about 2-3 minutes.',
      'Flip and cook for another 1-2 minutes until golden brown on both sides.',
      'Serve immediately with maple syrup, fresh berries, and butter.'
    ],
    notes: [
      'For extra fluffy pancakes, let the batter rest for 5 minutes before cooking.',
      'Don\'t press down on the pancakes with your spatula - this will deflate them.',
      'Keep cooked pancakes warm in a 200°F oven while you finish the batch.',
      'These freeze well for up to 2 months. Reheat in the toaster or microwave.'
    ],
    equipment: [
      {
        name: 'Large Mixing Bowl',
        image: 'https://images.unsplash.com/photo-1675179181679-f636d0a7c629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhpbmclMjBib3dsJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjI2MzA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        link: 'https://www.amazon.com/s?k=mixing+bowl'
      },
      {
        name: 'Whisk',
        image: 'https://images.unsplash.com/photo-1755547721520-22c2ea069bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGlzayUyMGtpdGNoZW4lMjB1dGVuc2lsfGVufDF8fHx8MTc2MjYzMDU0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        link: 'https://www.amazon.com/s?k=whisk'
      },
      {
        name: 'Griddle',
        image: 'https://images.unsplash.com/photo-1688940738506-acfe9334bf5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlkZGxlJTIwcGFuJTIwY29va2luZ3xlbnwxfHx8fDE3NjI2MzA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        link: 'https://www.amazon.com/s?k=griddle'
      },
      {
        name: 'Measuring Cups',
        image: 'https://images.unsplash.com/photo-1677776233852-bc3abd98190e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFzdXJpbmclMjBjdXBzJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjI2MzA1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        link: 'https://www.amazon.com/s?k=measuring+cups'
      },
      {
        name: 'Spatula',
        image: 'https://images.unsplash.com/photo-1615486261079-4452188cacb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGF0dWxhJTIwa2l0Y2hlbiUyMHRvb2x8ZW58MXx8fHwxNzYyNjMwNTQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        link: 'https://www.amazon.com/s?k=spatula'
      }
    ]
  },
  'classic-french-toast': {
    title: 'Classic French Toast',
    image: 'https://images.unsplash.com/photo-1653194512065-ced623ac3cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjB0b2FzdCUyMGJyZWFrZmFzdHxlbnwxfHx8fDE3NjE4NzkxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'October 12, 2025',
    author: 'Amanda Lynn',
    category: 'Breakfast',
    description: 'Golden French toast with cinnamon, powdered sugar, and maple syrup.',
    prepTime: '10 min',
    cookTime: '10 min',
    totalTime: '20 min',
    servings: '4 servings',
    content: [
      'This classic French toast recipe is a breakfast staple that never goes out of style. Soft on the inside, crispy on the outside, and perfectly spiced.',
      'The key is using thick-cut bread that\'s slightly stale. Day-old brioche or challah works beautifully, but any thick-sliced bread will do.',
      'Cinnamon and vanilla give the custard mixture wonderful warmth, while a touch of sugar helps create that golden caramelized exterior.',
      'Serve with your favorite toppings - maple syrup, fresh fruit, whipped cream, or just a dusting of powdered sugar.'
    ],
    ingredients: [
      { imperial: '8 thick slices bread (brioche or challah)', metric: '8 thick slices bread (brioche or challah)' },
      { imperial: '4 large eggs', metric: '4 large eggs' },
      { imperial: '3/4 cup whole milk', metric: '180 ml whole milk' },
      { imperial: '2 tablespoons sugar', metric: '25 g sugar' },
      { imperial: '1 teaspoon vanilla extract', metric: '5 ml vanilla extract' },
      { imperial: '1 teaspoon ground cinnamon', metric: '3 g ground cinnamon' },
      { imperial: '1/4 teaspoon salt', metric: '1.5 g salt' },
      { imperial: 'Butter for cooking', metric: 'Butter for cooking' }
    ],
    instructions: [
      'In a shallow bowl, whisk together eggs, milk, sugar, vanilla, cinnamon, and salt.',
      'Heat a large skillet or griddle over medium heat and add a tablespoon of butter.',
      'Dip each bread slice into the egg mixture, making sure both sides are well coated but not overly soggy.',
      'Place coated bread slices on the hot skillet and cook for 3-4 minutes until golden brown.',
      'Flip and cook for another 2-3 minutes until the second side is golden brown.',
      'Transfer to a serving plate and repeat with remaining bread slices, adding more butter as needed.',
      'Serve immediately with your favorite toppings.'
    ],
    notes: [
      'Use day-old bread for best results - fresh bread tends to get too soggy.',
      'Keep cooked French toast warm in a 200°F oven while finishing the batch.',
      'You can prepare the egg mixture up to 2 hours ahead.',
      'Leftovers can be stored in the refrigerator and reheated in a toaster or oven.'
    ]
  }
};

export default function RecipePage() {
  const params = useParams();
  const slug = params.slug as string;
  const recipe = recipes[slug];
  
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'notes'>('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [useMetric, setUseMetric] = useState(false);
  const [servingMultiplier, setServingMultiplier] = useState(1);

  if (!recipe) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Recipe not found</h1>
          <p className="text-muted-foreground">The recipe you're looking for doesn't exist.</p>
        </div>
      </main>
    );
  }

  const convertTemperatureText = (text: string): string => {
    return text.replace(/(\d+)°F/g, (match, temp) => {
      const f = parseInt(temp);
      const c = Math.round((f - 32) * 5/9);
      return `${f}°F (${c}°C)`;
    });
  };

  const getIngredientText = (index: number): string => {
    const ingredient = recipe.ingredients[index];
    const text = useMetric ? ingredient.metric : ingredient.imperial;
    
    if (servingMultiplier !== 1) {
      return text.replace(/(\d+(?:\.\d+)?)/g, (match) => {
        const num = parseFloat(match);
        const result = num * servingMultiplier;
        return result % 1 === 0 ? result.toString() : result.toFixed(2);
      });
    }
    return text;
  };

  const handleCopyIngredients = async () => {
    try {
      const ingredientsList = recipe.ingredients
        .map((_, index) => getIngredientText(index))
        .join('\n');

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
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ingredientsList)
          .then(() => {
            toast.success('Ingredients copied to clipboard!');
          })
          .catch(() => {
            if (fallbackCopy(ingredientsList)) {
              toast.success('Ingredients copied to clipboard!');
            } else {
              toast.error('Failed to copy ingredients');
            }
          });
      } else {
        if (fallbackCopy(ingredientsList)) {
          toast.success('Ingredients copied to clipboard!');
        } else {
          toast.error('Failed to copy ingredients');
        }
      }
    } catch (error) {
      toast.error('Failed to copy ingredients');
    }
  };

  return (
    <main>
      <RecipePageTemplate>
        {/* Breadcrumbs */}
        <Container size="4xl" className="-mt-1.5 mb-8">
          <Breadcrumbs items={[
            { label: 'Recipes', href: '/recipes' },
            { label: recipe.category, href: `/recipes/${recipe.category.toLowerCase()}` },
            { label: recipe.title }
          ]} />
        </Container>

        {/* Hero Section with Image */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-1/2">
              <Image
                src={recipe.image}
                alt={recipe.title}
                width={500}
                height={400}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-1/2 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{recipe.category}</span>
              </div>
              <h1 className="text-4xl font-bold">{recipe.title}</h1>
              <p className="text-muted-foreground text-lg">{recipe.description}</p>
              
              <div className="grid grid-cols-2 gap-4 py-6">
                <div>
                  <p className="text-sm text-muted-foreground">Prep Time</p>
                  <p className="text-lg font-semibold">{recipe.prepTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cook Time</p>
                  <p className="text-lg font-semibold">{recipe.cookTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Time</p>
                  <p className="text-lg font-semibold">{recipe.totalTime}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Servings</p>
                  <p className="text-lg font-semibold">{recipe.servings}</p>
                </div>
              </div>

              <ShareBar title={recipe.title} />
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="prose prose-sm max-w-none space-y-4">
            {recipe.content.map((paragraph, index) => (
              <p key={index} className="text-foreground text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Recipe Details */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-4">
                  {(['ingredients', 'instructions', 'notes'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 font-semibold capitalize border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-green text-green'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ingredients Tab */}
              {activeTab === 'ingredients' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2">
                        <span className="text-sm">Metric</span>
                        <Switch checked={useMetric} onCheckedChange={setUseMetric} />
                      </label>
                      <div className="flex items-center gap-2">
                        <label htmlFor="servings">Servings:</label>
                        <select
                          id="servings"
                          value={servingMultiplier}
                          onChange={(e) => setServingMultiplier(parseFloat(e.target.value))}
                          className="border border-gray-300 rounded px-2 py-1"
                        >
                          <option value={0.5}>0.5x</option>
                          <option value={1}>1x</option>
                          <option value={2}>2x</option>
                          <option value={3}>3x</option>
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={handleCopyIngredients}
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

              {/* Instructions Tab */}
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

              {/* Notes Tab */}
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
          </div>

          {/* Equipment Section */}
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
        </section>
      </RecipePageTemplate>
    </main>
  );
}
