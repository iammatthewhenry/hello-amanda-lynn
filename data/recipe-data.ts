// Recipe data types
export interface Recipe {
  id: string;
  slug: string;
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

// Recipe categories
export const RECIPE_CATEGORIES = [
  'Breakfast',
  'Main Dishes',
  'Desserts',
  'Soups',
  'Appetizers',
  'Sides',
  'Salads',
  'Beverages',
  'Snacks',
  'Holiday'
] as const;

// Recipe database with extracted recipes from the original component
export const recipes: Record<string, Recipe> = {
  "fluffy-buttermilk-pancakes": {
    id: "1",
    slug: "fluffy-buttermilk-pancakes",
    title: "Fluffy Buttermilk Pancakes",
    image: "https://images.unsplash.com/photo-1636743713732-125909a35dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBwYW5jYWtlc3xlbnwxfHx8fDE3NjE4ODc4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "October 15, 2025",
    author: "Amanda Lynn",
    category: "Breakfast",
    description: "Light and fluffy pancakes with maple syrup and fresh berries.",
    prepTime: "10 min",
    cookTime: "15 min",
    totalTime: "25 min",
    servings: "4 servings",
    content: [
      "These buttermilk pancakes are the epitome of a perfect weekend breakfast. Light, fluffy, and golden brown, they're everything a pancake should be.",
      "The secret to their fluffiness is the buttermilk, which reacts with the baking soda to create air pockets throughout the batter. Don't overmix - a few lumps are perfectly fine and will result in tender pancakes.",
      "I love serving these with pure maple syrup and fresh berries, but they're also delicious with butter and powdered sugar, or even with a dollop of whipped cream.",
      "Make a double batch and freeze the extras! They reheat beautifully in the toaster for quick weekday breakfasts."
    ],
    ingredients: [
      { imperial: "2 cups all-purpose flour", metric: "240 g all-purpose flour" },
      { imperial: "2 tablespoons sugar", metric: "25 g sugar" },
      { imperial: "2 teaspoons baking powder", metric: "10 g baking powder" },
      { imperial: "1 teaspoon baking soda", metric: "5 g baking soda" },
      { imperial: "1/2 teaspoon salt", metric: "3 g salt" },
      { imperial: "2 cups buttermilk", metric: "480 ml buttermilk" },
      { imperial: "2 large eggs", metric: "2 large eggs" },
      { imperial: "1/4 cup melted butter", metric: "60 ml melted butter" },
      { imperial: "1 teaspoon vanilla extract", metric: "5 ml vanilla extract" }
    ],
    instructions: [
      "In a large bowl, whisk together flour, sugar, baking powder, baking soda, and salt.",
      "In a separate bowl, whisk together buttermilk, eggs, melted butter, and vanilla extract.",
      "Pour the wet ingredients into the dry ingredients and stir until just combined. Don't overmix - a few lumps are fine.",
      "Heat a griddle or large skillet over medium heat and lightly grease with butter or cooking spray.",
      "Pour 1/4 cup of batter for each pancake onto the hot griddle. Cook until bubbles form on the surface and the edges look set, about 2-3 minutes.",
      "Flip and cook for another 1-2 minutes until golden brown on both sides.",
      "Serve immediately with maple syrup, fresh berries, and butter."
    ],
    notes: [
      "For extra fluffy pancakes, let the batter rest for 5 minutes before cooking.",
      "Don't press down on the pancakes with your spatula - this will deflate them.",
      "Keep cooked pancakes warm in a 200°F oven while you finish the batch.",
      "These freeze well for up to 2 months. Reheat in the toaster or microwave."
    ],
    equipment: [
      {
        name: "Large Mixing Bowl",
        image: "https://images.unsplash.com/photo-1675179181679-f636d0a7c629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhpbmclMjBib3dsJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjI2MzA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=mixing+bowl"
      },
      {
        name: "Whisk",
        image: "https://images.unsplash.com/photo-1755547721520-22c2ea069bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGlzayUyMGtpdGNoZW4lMjB1dGVuc2lsfGVufDF8fHx8MTc2MjYzMDU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=whisk"
      },
      {
        name: "Griddle",
        image: "https://images.unsplash.com/photo-1688940738506-acfe9334bf5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlkZGxlJTIwcGFuJTIwY29va2luZ3xlbnwxfHx8fDE3NjI2MzA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=griddle"
      },
      {
        name: "Measuring Cups",
        image: "https://images.unsplash.com/photo-1677776233852-bc3abd98190e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFzdXJpbmclMjBjdXBzJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjI2MzA1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=measuring+cups"
      },
      {
        name: "Spatula",
        image: "https://images.unsplash.com/photo-1615486261079-4452188cacb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGF0dWxhJTIwa2l0Y2hlbiUyMHRvb2x8ZW58MXx8fHwxNzYyNjMwNTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=spatula"
      }
    ]
  },
  "classic-french-toast": {
    id: "2",
    slug: "classic-french-toast",
    title: "Classic French Toast",
    image: "https://images.unsplash.com/photo-1653194512065-ced623ac3cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjB0b2FzdCUyMGJyZWFrZmFzdHxlbnwxfHx8fDE3NjE4NzkxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "October 12, 2025",
    author: "Amanda Lynn",
    category: "Breakfast",
    description: "Golden French toast with cinnamon, powdered sugar, and maple syrup.",
    prepTime: "10 min",
    cookTime: "10 min",
    totalTime: "20 min",
    servings: "4 servings",
    content: [
      "This classic French toast recipe is a breakfast staple that never goes out of style. Soft on the inside, crispy on the outside, and perfectly spiced.",
      "The key is using thick-cut bread that's slightly stale. Day-old brioche or challah works beautifully, but any thick-sliced bread will do.",
      "Cinnamon and vanilla give the custard mixture wonderful warmth, while a touch of sugar helps create that golden caramelized exterior.",
      "Serve with your favorite toppings - maple syrup, fresh fruit, whipped cream, or just a dusting of powdered sugar."
    ],
    ingredients: [
      { imperial: "8 thick slices bread (brioche or challah)", metric: "8 thick slices bread (brioche or challah)" },
      { imperial: "4 large eggs", metric: "4 large eggs" },
      { imperial: "3/4 cup whole milk", metric: "180 ml whole milk" },
      { imperial: "2 tablespoons sugar", metric: "25 g sugar" },
      { imperial: "1 teaspoon vanilla extract", metric: "5 ml vanilla extract" },
      { imperial: "1 teaspoon ground cinnamon", metric: "3 g ground cinnamon" },
      { imperial: "1/4 teaspoon salt", metric: "1.5 g salt" },
      { imperial: "Butter for cooking", metric: "Butter for cooking" },
      { imperial: "Powdered sugar and maple syrup for serving", metric: "Powdered sugar and maple syrup for serving" }
    ],
    instructions: [
      "In a shallow bowl, whisk together eggs, milk, sugar, vanilla, cinnamon, and salt until well combined.",
      "Heat a large skillet or griddle over medium heat and add a little butter.",
      "Dip each slice of bread into the egg mixture, letting it soak for about 30 seconds on each side.",
      "Cook the soaked bread slices in the hot skillet for 2-3 minutes per side, until golden brown.",
      "Transfer to a serving plate and dust with powdered sugar.",
      "Serve immediately with maple syrup, fresh berries, or your favorite toppings."
    ],
    notes: [
      "Day-old bread works best as it absorbs the custard without falling apart.",
      "Keep cooked French toast warm in a 200°F oven if making a large batch.",
      "Try stuffing with cream cheese or Nutella for a decadent twist.",
      "Leftover French toast can be frozen and reheated in the toaster."
    ],
    equipment: [
      {
        name: "Large Skillet",
        image: "https://images.unsplash.com/photo-1567954046925-780ec4ab0157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        link: "https://www.amazon.com/s?k=large+skillet"
      },
      {
        name: "Whisk",
        image: "https://images.unsplash.com/photo-1755547721520-22c2ea069bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        link: "https://www.amazon.com/s?k=whisk"
      }
    ]
  },
  // Adding more recipes to expand the collection
  "chocolate-chip-cookies": {
    id: "3",
    slug: "chocolate-chip-cookies",
    title: "Classic Chocolate Chip Cookies",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    publishedDate: "October 20, 2025",
    author: "Amanda Lynn",
    category: "Desserts",
    description: "My grandmother's secret recipe for the most perfect, chewy chocolate chip cookies.",
    prepTime: "15 min",
    cookTime: "12 min",
    totalTime: "27 min",
    servings: "24 cookies",
    content: [
      "These chocolate chip cookies have been in my family for generations. They're perfectly chewy with crispy edges and that perfect golden-brown color.",
      "The secret is using both brown and white sugar, which gives them the ideal texture and depth of flavor. Brown sugar keeps them soft while white sugar helps create those delicious crispy edges.",
      "Don't overbake them - they'll continue cooking on the hot pan even after you take them out of the oven. This ensures they stay soft and chewy.",
      "These disappear fast in our house, so I always make a double batch!"
    ],
    ingredients: [
      { imperial: "2 1/4 cups all-purpose flour", metric: "280 g all-purpose flour" },
      { imperial: "1 teaspoon baking soda", metric: "5 g baking soda" },
      { imperial: "1 teaspoon salt", metric: "6 g salt" },
      { imperial: "1 cup butter, softened", metric: "225 g butter, softened" },
      { imperial: "3/4 cup granulated sugar", metric: "150 g granulated sugar" },
      { imperial: "3/4 cup packed brown sugar", metric: "165 g packed brown sugar" },
      { imperial: "2 large eggs", metric: "2 large eggs" },
      { imperial: "2 teaspoons vanilla extract", metric: "10 ml vanilla extract" },
      { imperial: "2 cups chocolate chips", metric: "340 g chocolate chips" }
    ],
    instructions: [
      "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.",
      "In a medium bowl, whisk together flour, baking soda, and salt. Set aside.",
      "In a large bowl, cream together softened butter and both sugars until light and fluffy, about 3 minutes.",
      "Beat in eggs one at a time, then add vanilla extract.",
      "Gradually mix in the flour mixture until just combined. Don't overmix.",
      "Fold in chocolate chips with a wooden spoon.",
      "Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.",
      "Bake for 9-12 minutes, until edges are golden but centers still look soft.",
      "Cool on baking sheet for 5 minutes before transferring to wire rack."
    ],
    notes: [
      "Don't overbake - cookies will continue cooking on the hot pan.",
      "Room temperature ingredients mix better for best results.",
      "Chill dough for 30 minutes for thicker cookies.",
      "Store in airtight container for up to 1 week."
    ],
    equipment: [
      {
        name: "Stand Mixer",
        image: "https://images.unsplash.com/photo-1758279745446-2e4ba34c7d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        link: "https://www.amazon.com/s?k=stand+mixer"
      },
      {
        name: "Cookie Sheets",
        image: "https://images.unsplash.com/photo-1634149603428-fcb69966c29e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        link: "https://www.amazon.com/s?k=cookie+sheets"
      },
      {
        name: "Cookie Scoop",
        image: "https://images.unsplash.com/photo-1629539890438-cb562ec70f70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        link: "https://www.amazon.com/s?k=cookie+scoop"
      }
    ]
  },
  "creamy-tomato-basil-soup": {
    id: "4",
    slug: "creamy-tomato-basil-soup",
    title: "Creamy Tomato Basil Soup",
    image: "https://images.unsplash.com/photo-1617671622427-fea1f1f2cb2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    publishedDate: "October 18, 2025",
    author: "Amanda Lynn",
    category: "Soups",
    description: "A velvety smooth tomato soup with fresh basil and cream - perfect comfort food.",
    prepTime: "15 min",
    cookTime: "30 min",
    totalTime: "45 min",
    servings: "6 servings",
    content: [
      "This is the ultimate comfort food - rich, creamy, and bursting with fresh tomato and basil flavors. It's perfect paired with a grilled cheese sandwich.",
      "Using both canned San Marzano tomatoes and tomato paste creates incredible depth of flavor, while fresh basil adds that aromatic finish.",
      "The key to the silky texture is blending the soup until completely smooth, then finishing with heavy cream for richness.",
      "This soup freezes beautifully (before adding the cream), so make a big batch for easy weeknight dinners."
    ],
    ingredients: [
      { imperial: "2 tablespoons olive oil", metric: "30 ml olive oil" },
      { imperial: "1 large onion, diced", metric: "1 large onion, diced" },
      { imperial: "4 cloves garlic, minced", metric: "4 cloves garlic, minced" },
      { imperial: "2 tablespoons tomato paste", metric: "30 g tomato paste" },
      { imperial: "2 (28 oz) cans San Marzano tomatoes", metric: "2 (800 g) cans San Marzano tomatoes" },
      { imperial: "2 cups vegetable broth", metric: "480 ml vegetable broth" },
      { imperial: "1/2 cup fresh basil leaves", metric: "15 g fresh basil leaves" },
      { imperial: "1/2 cup heavy cream", metric: "120 ml heavy cream" },
      { imperial: "1 teaspoon salt", metric: "6 g salt" },
      { imperial: "1/2 teaspoon black pepper", metric: "2 g black pepper" },
      { imperial: "1 tablespoon sugar", metric: "12 g sugar" }
    ],
    instructions: [
      "Heat olive oil in a large pot over medium heat. Add diced onion and cook until softened, about 5 minutes.",
      "Add minced garlic and tomato paste. Cook for 1 minute until fragrant.",
      "Add canned tomatoes (crushing them with your hands), vegetable broth, and most of the basil (reserve some for garnish).",
      "Bring to a boil, then reduce heat and simmer for 20 minutes.",
      "Using an immersion blender, blend the soup until completely smooth. Alternatively, carefully transfer to a regular blender in batches.",
      "Stir in heavy cream, salt, pepper, and sugar. Taste and adjust seasonings.",
      "Simmer for 5 more minutes to heat through.",
      "Serve hot, garnished with remaining fresh basil and a drizzle of cream if desired."
    ],
    notes: [
      "San Marzano tomatoes make a big difference in flavor, but good quality canned tomatoes work too.",
      "For a lighter version, substitute half-and-half for heavy cream.",
      "Soup can be made 2 days ahead - just reheat gently before serving.",
      "Perfect with crusty bread or grilled cheese sandwiches."
    ],
    equipment: [
      {
        name: "Immersion Blender",
        image: "https://images.unsplash.com/photo-1675179181679-f636d0a7c629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        link: "https://www.amazon.com/s?k=immersion+blender"
      },
      {
        name: "Large Stock Pot",
        image: "https://images.unsplash.com/photo-1721582057403-8d5e3b78b44e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        link: "https://www.amazon.com/s?k=stock+pot"
      }
    ]
  },
  "lemon-herb-roasted-chicken": {
    id: "5",
    slug: "lemon-herb-roasted-chicken",
    title: "Lemon Herb Roasted Chicken",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    publishedDate: "October 16, 2025",
    author: "Amanda Lynn",
    category: "Main Dishes",
    description: "Perfectly juicy roasted chicken with crispy skin, fresh herbs, and bright lemon flavor.",
    prepTime: "20 min",
    cookTime: "1 hour 15 min",
    totalTime: "1 hour 35 min",
    servings: "6 servings",
    content: [
      "This roasted chicken recipe produces the juiciest meat with the crispiest skin every single time. The secret is starting at high heat to get that golden skin, then reducing the temperature.",
      "Fresh herbs and lemon create the most amazing aromatics, and the pan drippings make the perfect base for gravy.",
      "Don't skip the resting time - it's crucial for juicy meat. The internal temperature will continue to rise as it rests.",
      "This is my go-to recipe for Sunday dinner - it feels special but is surprisingly simple to make."
    ],
    ingredients: [
      { imperial: "1 whole chicken (4-5 lbs)", metric: "1 whole chicken (1.8-2.3 kg)" },
      { imperial: "2 lemons (1 juiced, 1 quartered)", metric: "2 lemons (1 juiced, 1 quartered)" },
      { imperial: "1/4 cup olive oil", metric: "60 ml olive oil" },
      { imperial: "4 cloves garlic, minced", metric: "4 cloves garlic, minced" },
      { imperial: "2 tablespoons fresh rosemary, chopped", metric: "6 g fresh rosemary, chopped" },
      { imperial: "2 tablespoons fresh thyme", metric: "6 g fresh thyme" },
      { imperial: "1 tablespoon salt", metric: "18 g salt" },
      { imperial: "1 teaspoon black pepper", metric: "4 g black pepper" },
      { imperial: "2 tablespoons butter, softened", metric: "30 g butter, softened" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Pat chicken completely dry with paper towels.",
      "Mix lemon juice, olive oil, minced garlic, rosemary, thyme, salt, and pepper in a bowl.",
      "Gently loosen the skin over the breast and thighs. Rub softened butter under the skin.",
      "Rub the herb mixture all over the chicken, including under the loosened skin.",
      "Stuff the cavity with the quartered lemon and any remaining herbs.",
      "Truss the chicken with kitchen twine for even cooking.",
      "Roast for 20 minutes, then reduce temperature to 375°F (190°C).",
      "Continue roasting for 45-55 minutes until internal temperature reaches 165°F (74°C).",
      "Let rest for 10 minutes before carving. Serve with pan juices."
    ],
    notes: [
      "Use a meat thermometer for best results - check the thickest part of the thigh.",
      "Patting the chicken dry is crucial for crispy skin.",
      "Save the drippings to make delicious gravy.",
      "Leftovers are perfect for chicken salad or soup."
    ],
    equipment: [
      {
        name: "Roasting Pan",
        image: "https://images.unsplash.com/photo-1567954046925-780ec4ab0157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        link: "https://www.amazon.com/s?k=roasting+pan"
      },
      {
        name: "Meat Thermometer",
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        link: "https://www.amazon.com/s?k=meat+thermometer"
      }
    ]
  }
};

// Helper functions
export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes[slug];
}

export function getAllRecipes(): Recipe[] {
  return Object.values(recipes);
}

export function getRecipesByCategory(category: string): Recipe[] {
  return Object.values(recipes).filter(recipe => recipe.category === category);
}

export function getFeaturedRecipes(limit?: number): Recipe[] {
  const allRecipes = Object.values(recipes);
  return limit ? allRecipes.slice(0, limit) : allRecipes;
}

export function getRecentRecipes(limit: number = 5): Recipe[] {
  return Object.values(recipes)
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, limit);
}