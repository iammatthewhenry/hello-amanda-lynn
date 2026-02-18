import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import placeholderImage from "figma:asset/35808c81d7cd89370d8f67dd0991aeb673d95e77.png";
import logo from "figma:asset/1eefd97f526469b74dc55ccb45fb73c601090f12.png";
import { Star, Copy, Printer } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";
import { Breadcrumbs } from "../Breadcrumbs";
import { ShareBar } from "../ShareBar";
import { RecipePageTemplate } from "../RecipePageTemplate";
import { toast } from "sonner@2.0.3";

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
  "fluffy-buttermilk-pancakes": {
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
      "Heat a large skillet or griddle over medium heat and add a tablespoon of butter.",
      "Dip each bread slice into the egg mixture, letting it soak for about 10-15 seconds on each side. Don't oversoak or the bread will fall apart.",
      "Place the soaked bread on the hot skillet and cook for 2-3 minutes per side until golden brown.",
      "Transfer to a plate and keep warm while you cook the remaining slices, adding more butter to the pan as needed.",
      "Serve hot with powdered sugar, maple syrup, and fresh berries."
    ],
    notes: [
      "Day-old bread works best as it absorbs the custard without getting too soggy.",
      "For a richer flavor, substitute half the milk with heavy cream.",
      "Add a pinch of nutmeg to the custard for extra warmth.",
      "Leftover French toast can be frozen and reheated in the toaster."
    ],
    equipment: [
      {
        name: "Shallow Dish",
        image: "https://images.unsplash.com/photo-1675179181679-f636d0a7c629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhpbmclMjBib3dsJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjI2MzA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=shallow+dish"
      },
      {
        name: "Whisk",
        image: "https://images.unsplash.com/photo-1755547721520-22c2ea069bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGlzayUyMGtpdGNoZW4lMjB1dGVuc2lsfGVufDF8fHx8MTc2MjYzMDU0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=whisk"
      },
      {
        name: "Large Skillet",
        image: "https://images.unsplash.com/photo-1688940738506-acfe9334bf5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlkZGxlJTIwcGFuJTIwY29va2luZ3xlbnwxfHx8fDE3NjI2MzA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=skillet"
      },
      {
        name: "Spatula",
        image: "https://images.unsplash.com/photo-1615486261079-4452188cacb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGF0dWxhJTIwa2l0Y2hlbiUyMHRvb2x8ZW58MXx8fHwxNzYyNjMwNTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=spatula"
      }
    ]
  },
  "eggs-benedict": {
    title: "Eggs Benedict",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2dzJTIwYmVuZWRpY3R8ZW58MXx8fHwxNzYxOTU1MzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "October 8, 2025",
    author: "Amanda Lynn",
    category: "Breakfast",
    description: "Poached eggs on English muffins with hollandaise sauce and Canadian bacon.",
    prepTime: "15 min",
    cookTime: "15 min",
    totalTime: "30 min",
    servings: "2 servings",
    content: [
      "Eggs Benedict is the ultimate brunch indulgence. While it has a reputation for being difficult, with a few tips you can master this elegant dish at home.",
      "The hollandaise sauce is the star here - rich, buttery, and tangy with lemon. A blender hollandaise makes it foolproof.",
      "Perfectly poached eggs with runny yolks are essential. The key is fresh eggs and gently simmering water with a touch of vinegar.",
      "This dish is worth the effort for a special breakfast or brunch. It's impressive yet achievable."
    ],
    ingredients: [
      { imperial: "2 English muffins, split and toasted", metric: "2 English muffins, split and toasted" },
      { imperial: "4 slices Canadian bacon", metric: "4 slices Canadian bacon" },
      { imperial: "4 large eggs", metric: "4 large eggs" },
      { imperial: "1 tablespoon white vinegar", metric: "15 ml white vinegar" },
      { imperial: "For hollandaise: 3 egg yolks", metric: "For hollandaise: 3 egg yolks" },
      { imperial: "1/2 cup melted butter", metric: "120 ml melted butter" },
      { imperial: "1 tablespoon lemon juice", metric: "15 ml lemon juice" },
      { imperial: "Pinch of cayenne pepper", metric: "Pinch of cayenne pepper" },
      { imperial: "Salt to taste", metric: "Salt to taste" }
    ],
    instructions: [
      "Make the hollandaise: In a blender, combine egg yolks and lemon juice. Blend for 20 seconds.",
      "With the blender running, slowly drizzle in the hot melted butter until thick and creamy. Season with cayenne and salt. Keep warm.",
      "Bring a large pot of water to a gentle simmer and add vinegar.",
      "Crack each egg into a small cup. Create a gentle whirlpool in the water and slide the egg into the center. Poach for 3-4 minutes.",
      "While eggs poach, heat Canadian bacon in a skillet until warmed through.",
      "Toast the English muffin halves until golden.",
      "To assemble: Place a slice of Canadian bacon on each muffin half, top with a poached egg, and generously drizzle with hollandaise sauce.",
      "Garnish with fresh chives and a sprinkle of paprika if desired. Serve immediately."
    ],
    notes: [
      "Fresh eggs are crucial for poaching - they hold together better.",
      "The hollandaise can be kept warm in a bowl over warm (not hot) water for up to 30 minutes.",
      "Try substituting smoked salmon for a Eggs Royale variation.",
      "Add sautéed spinach for Eggs Florentine."
    ],
    equipment: [
      {
        name: "Blender",
        image: "https://images.unsplash.com/photo-1675179181679-f636d0a7c629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhpbmclMjBib3dsJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjI2MzA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=blender"
      },
      {
        name: "Large Pot",
        image: "https://images.unsplash.com/photo-1688940738506-acfe9334bf5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlkZGxlJTIwcGFuJTIwY29va2luZ3xlbnwxfHx8fDE3NjI2MzA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=pot"
      },
      {
        name: "Slotted Spoon",
        image: "https://images.unsplash.com/photo-1615486261079-4452188cacb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGF0dWxhJTIwa2l0Y2hlbiUyMHRvb2x8ZW58MXx8fHwxNzYyNjMwNTQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=slotted+spoon"
      },
      {
        name: "Ramekins",
        image: "https://images.unsplash.com/photo-1675179181679-f636d0a7c629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhpbmclMjBib3dsJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjI2MzA1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        link: "https://www.amazon.com/s?k=ramekins"
      }
    ]
  },
  "greek-yogurt-parfait": {
    title: "Greek Yogurt Parfait",
    image: "https://images.unsplash.com/photo-1636143938155-4c5735fca7f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjB5b2d1cnR8ZW58MXx8fHwxNzYxOTU1MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "October 5, 2025",
    author: "Amanda Lynn",
    category: "Breakfast",
    description: "Layered yogurt with granola, honey, and fresh berries.",
    prepTime: "10 min",
    cookTime: "0 min",
    totalTime: "10 min",
    servings: "2 servings",
    content: [
      "This Greek yogurt parfait is my go-to healthy breakfast when I'm short on time. It's nutritious, delicious, and endlessly customizable.",
      "The layers make it feel special - creamy yogurt, crunchy granola, and sweet fresh berries create the perfect textural contrast.",
      "Greek yogurt provides protein to keep you full all morning, while the honey adds just the right amount of natural sweetness.",
      "Make these ahead in mason jars for grab-and-go breakfasts throughout the week."
    ],
    ingredients: [
      { imperial: "2 cups Greek yogurt", metric: "480 g Greek yogurt" },
      { imperial: "1 cup granola", metric: "120 g granola" },
      { imperial: "1 cup fresh mixed berries", metric: "150 g fresh mixed berries" },
      { imperial: "2 tablespoons honey", metric: "30 ml honey" },
      { imperial: "2 tablespoons sliced almonds", metric: "15 g sliced almonds" },
      { imperial: "Fresh mint leaves for garnish", metric: "Fresh mint leaves for garnish" }
    ],
    instructions: [
      "In two parfait glasses or bowls, add a layer of Greek yogurt (about 1/3 cup).",
      "Add a layer of granola (about 2 tablespoons).",
      "Add a layer of fresh berries (about 1/4 cup).",
      "Repeat the layers until the glasses are filled, ending with berries on top.",
      "Drizzle with honey and sprinkle with sliced almonds.",
      "Garnish with fresh mint leaves if desired. Serve immediately."
    ],
    notes: [
      "Use full-fat Greek yogurt for the creamiest texture.",
      "Any combination of berries works - strawberries, blueberries, raspberries, or blackberries.",
      "Add chia seeds or flax seeds for extra nutrition.",
      "If making ahead, keep the granola separate until ready to eat to maintain crunchiness."
    ]
  },
  "avocado-toast": {
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1687276287139-88f7333c8ca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3R8ZW58MXx8fHwxNzYxOTE5ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "October 1, 2025",
    author: "Amanda Lynn",
    category: "Breakfast",
    description: "Smashed avocado on toasted sourdough with cherry tomatoes and poached egg.",
    prepTime: "10 min",
    cookTime: "5 min",
    totalTime: "15 min",
    servings: "2 servings",
    content: [
      "Avocado toast has become a breakfast classic for good reason. It's simple, nutritious, and absolutely delicious.",
      "The key is using perfectly ripe avocados and good quality bread. I prefer sourdough for its tangy flavor and sturdy texture.",
      "A perfectly poached egg on top takes it from good to amazing. The runny yolk creates a sauce that's pure magic.",
      "Feel free to customize with your favorite toppings - everything bagel seasoning, microgreens, or hot sauce are all great additions."
    ],
    ingredients: [
      { imperial: "4 slices sourdough bread", metric: "4 slices sourdough bread" },
      { imperial: "2 ripe avocados", metric: "2 ripe avocados" },
      { imperial: "1 tablespoon lemon juice", metric: "15 ml lemon juice" },
      { imperial: "1/2 cup cherry tomatoes, halved", metric: "75 g cherry tomatoes, halved" },
      { imperial: "2 eggs (optional)", metric: "2 eggs (optional)" },
      { imperial: "Red pepper flakes", metric: "Red pepper flakes" },
      { imperial: "Sea salt and black pepper", metric: "Sea salt and black pepper" },
      { imperial: "Extra virgin olive oil", metric: "Extra virgin olive oil" }
    ],
    instructions: [
      "Toast the sourdough bread until golden and crispy.",
      "While the bread toasts, halve the avocados and remove the pits. Scoop the flesh into a bowl.",
      "Mash the avocado with a fork, leaving some chunks for texture. Stir in lemon juice and season with salt and pepper.",
      "If making poached eggs, bring a pot of water to a gentle simmer and poach the eggs for 3-4 minutes.",
      "Spread the mashed avocado generously on the toasted bread.",
      "Top with halved cherry tomatoes and a poached egg if using.",
      "Drizzle with olive oil, sprinkle with red pepper flakes, and season with flaky sea salt and freshly cracked black pepper.",
      "Serve immediately while the toast is still warm."
    ],
    notes: [
      "To check if an avocado is ripe, it should yield to gentle pressure.",
      "Add a clove of minced garlic to the mashed avocado for extra flavor.",
      "Try topping with crumbled feta, microgreens, or smoked salmon.",
      "Best enjoyed fresh - avocado browns quickly once exposed to air."
    ]
  },
  "berry-smoothie-bowl": {
    title: "Berry Smoothie Bowl",
    image: "https://images.unsplash.com/photo-1665833876953-9aa02c235d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBzbW9vdGhpZXxlbnwxfHx8fDE3NjE5NTUzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "September 28, 2025",
    author: "Amanda Lynn",
    category: "Breakfast",
    description: "Thick berry smoothie topped with granola, seeds, and fresh fruit.",
    prepTime: "10 min",
    cookTime: "0 min",
    totalTime: "10 min",
    servings: "2 servings",
    content: [
      "Smoothie bowls are like eating ice cream for breakfast - but healthy! This berry version is packed with antioxidants and vitamins.",
      "The key to a good smoothie bowl is getting the right consistency - thick enough to eat with a spoon and support your toppings.",
      "Using frozen fruit creates the thick, creamy texture without needing to add ice, which can water down the flavor.",
      "Top it with anything you love - fresh fruit, nuts, seeds, coconut, or granola. Make it your own!"
    ],
    ingredients: [
      { imperial: "2 cups frozen mixed berries", metric: "300 g frozen mixed berries" },
      { imperial: "1 frozen banana", metric: "1 frozen banana" },
      { imperial: "1/2 cup Greek yogurt", metric: "120 g Greek yogurt" },
      { imperial: "1/2 cup almond milk", metric: "120 ml almond milk" },
      { imperial: "1 tablespoon honey", metric: "15 ml honey" },
      { imperial: "For toppings: granola, fresh berries, chia seeds, coconut flakes, sliced almonds", metric: "For toppings: granola, fresh berries, chia seeds, coconut flakes, sliced almonds" }
    ],
    instructions: [
      "Add frozen berries, frozen banana, Greek yogurt, almond milk, and honey to a blender.",
      "Blend on high speed, using the tamper to push ingredients down. Add more almond milk if needed, but keep it thick.",
      "The mixture should be thick and creamy, like soft-serve ice cream.",
      "Pour into bowls and smooth the top with a spoon.",
      "Arrange your toppings in rows or sections for a beautiful presentation.",
      "Serve immediately with a spoon."
    ],
    notes: [
      "Freeze your bananas ahead of time for the best texture.",
      "Use less liquid than you would for a drinkable smoothie.",
      "Try adding a scoop of protein powder for extra staying power.",
      "Experiment with different fruit combinations - mango, pineapple, and tropical fruits work great too."
    ]
  },
  "classic-bruschetta": {
    title: "Classic Bruschetta",
    image: "https://images.unsplash.com/photo-1536739782508-c2388552aad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVzY2hldHRhJTIwYXBwZXRpemVyfGVufDF8fHx8MTc2MTg3OTA3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "September 25, 2025",
    author: "Amanda Lynn",
    category: "Appetizers",
    description: "Toasted bread topped with fresh tomatoes, basil, and garlic - a perfect Italian starter.",
    prepTime: "15 min",
    cookTime: "5 min",
    totalTime: "20 min",
    servings: "6 servings",
    content: [
      "This classic Italian bruschetta is the perfect appetizer for any gathering. Fresh, simple, and bursting with summer flavors.",
      "The secret is using the ripest, most flavorful tomatoes you can find. In-season heirloom or vine-ripened tomatoes make all the difference.",
      "Toasting the bread with garlic and olive oil creates the perfect crunchy base for the juicy tomato topping.",
      "Make the tomato mixture ahead, but wait to top the bread until just before serving to keep it crispy."
    ],
    ingredients: [
      { imperial: "1 French baguette, sliced 1/2 inch thick", metric: "1 French baguette, sliced 1.25 cm thick" },
      { imperial: "4 large ripe tomatoes, diced", metric: "600 g ripe tomatoes, diced" },
      { imperial: "3 cloves garlic, minced", metric: "3 cloves garlic, minced" },
      { imperial: "1/4 cup fresh basil, chopped", metric: "10 g fresh basil, chopped" },
      { imperial: "2 tablespoons extra virgin olive oil", metric: "30 ml extra virgin olive oil" },
      { imperial: "1 tablespoon balsamic vinegar", metric: "15 ml balsamic vinegar" },
      { imperial: "Salt and pepper to taste", metric: "Salt and pepper to taste" },
      { imperial: "Additional olive oil for brushing", metric: "Additional olive oil for brushing" }
    ],
    instructions: [
      "Preheat your oven to 400°F (200°C).",
      "In a bowl, combine diced tomatoes, minced garlic, chopped basil, olive oil, and balsamic vinegar. Season with salt and pepper. Let sit for 10 minutes.",
      "Arrange baguette slices on a baking sheet and brush lightly with olive oil.",
      "Toast in the oven for 5-7 minutes until golden and crispy.",
      "If desired, rub each toasted slice with a cut garlic clove for extra flavor.",
      "Top each slice with the tomato mixture just before serving.",
      "Drizzle with a little extra olive oil and garnish with additional basil leaves."
    ],
    notes: [
      "Use San Marzano or Roma tomatoes for the best flavor.",
      "The tomato mixture gets better as it sits - let it marinate for up to 2 hours.",
      "For a variation, add diced fresh mozzarella to the tomato mixture.",
      "Toast the bread on a grill for smoky flavor."
    ]
  },
  "artisan-cheese-board": {
    title: "Artisan Cheese Board",
    image: "https://images.unsplash.com/photo-1589881210718-42da05899fe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBwbGF0dGVyfGVufDF8fHx8MTc2MTk1NTE0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "September 20, 2025",
    author: "Amanda Lynn",
    category: "Appetizers",
    description: "Curated selection of gourmet cheeses with fruits, nuts, and honey.",
    prepTime: "15 min",
    cookTime: "0 min",
    totalTime: "15 min",
    servings: "8 servings",
    content: [
      "A beautiful cheese board is the ultimate crowd-pleasing appetizer. It's elegant, delicious, and requires no cooking!",
      "The key to a great cheese board is variety - include different textures, flavors, and milk types. Aim for soft, semi-soft, hard, and blue cheeses.",
      "Pair your cheeses with complementary accompaniments like fresh and dried fruits, nuts, honey, crackers, and artisan bread.",
      "Arrange everything with intention and let the natural beauty of the ingredients shine through."
    ],
    ingredients: [
      { imperial: "8 oz soft cheese (brie or camembert)", metric: "225 g soft cheese (brie or camembert)" },
      { imperial: "8 oz hard cheese (aged cheddar or gouda)", metric: "225 g hard cheese (aged cheddar or gouda)" },
      { imperial: "6 oz blue cheese (gorgonzola or roquefort)", metric: "170 g blue cheese (gorgonzola or roquefort)" },
      { imperial: "6 oz semi-soft cheese (goat cheese or manchego)", metric: "170 g semi-soft cheese (goat cheese or manchego)" },
      { imperial: "Fresh grapes and figs", metric: "Fresh grapes and figs" },
      { imperial: "Dried apricots and cranberries", metric: "Dried apricots and cranberries" },
      { imperial: "Assorted nuts (almonds, walnuts, pistachios)", metric: "Assorted nuts (almonds, walnuts, pistachios)" },
      { imperial: "Honey and fruit preserves", metric: "Honey and fruit preserves" },
      { imperial: "Crackers and sliced baguette", metric: "Crackers and sliced baguette" }
    ],
    instructions: [
      "Remove cheeses from the refrigerator 30-60 minutes before serving to bring to room temperature.",
      "Choose a large wooden board or serving platter.",
      "Arrange the cheeses first, spacing them evenly around the board. Cut some into slices or wedges for easy serving.",
      "Fill in gaps with small bowls of honey, preserves, and nuts.",
      "Add fresh fruits like grapes and figs, and dried fruits in small clusters.",
      "Tuck crackers and bread slices into remaining spaces.",
      "Add small cheese knives and serving utensils.",
      "Garnish with fresh herbs like rosemary or thyme for a beautiful finishing touch."
    ],
    notes: [
      "Rule of thumb: 2-3 oz of cheese per person for an appetizer portion.",
      "Label the cheeses with small cards or tags if serving to guests.",
      "Include both water crackers and seeded crackers for variety.",
      "Pair stronger cheeses like blue cheese with sweet accompaniments like honey or dried fruit."
    ]
  },
  "fresh-spring-rolls": {
    title: "Fresh Spring Rolls",
    image: "https://images.unsplash.com/photo-1695712641569-05eee7b37b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjByb2xsc3xlbnwxfHx8fDE3NjE4ODg1MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "September 18, 2025",
    author: "Amanda Lynn",
    category: "Appetizers",
    description: "Light and refreshing Vietnamese rolls with vegetables and herbs.",
    prepTime: "30 min",
    cookTime: "0 min",
    totalTime: "30 min",
    servings: "4 servings",
    content: [
      "These fresh spring rolls are a healthy, colorful appetizer that's as fun to make as it is to eat. Light, fresh, and packed with vegetables.",
      "The rice paper wrappers create a delicate, translucent shell that showcases the beautiful ingredients inside.",
      "Serve with a tangy peanut sauce or sweet chili sauce for dipping. They're perfect for summer entertaining or as a light lunch.",
      "Once you master the rolling technique, you can customize with your favorite vegetables, herbs, and proteins."
    ],
    ingredients: [
      { imperial: "12 rice paper wrappers", metric: "12 rice paper wrappers" },
      { imperial: "8 oz cooked shrimp or tofu", metric: "225 g cooked shrimp or tofu" },
      { imperial: "2 cups shredded lettuce", metric: "100 g shredded lettuce" },
      { imperial: "1 cup vermicelli rice noodles, cooked", metric: "150 g vermicelli rice noodles, cooked" },
      { imperial: "1 carrot, julienned", metric: "1 carrot, julienned" },
      { imperial: "1 cucumber, julienned", metric: "1 cucumber, julienned" },
      { imperial: "Fresh mint and cilantro", metric: "Fresh mint and cilantro" },
      { imperial: "Peanut dipping sauce", metric: "Peanut dipping sauce" }
    ],
    instructions: [
      "Prepare all ingredients and have them ready before you start rolling.",
      "Fill a large shallow dish with warm water. Dip one rice paper wrapper for 10-15 seconds until pliable.",
      "Lay the softened wrapper on a clean work surface. Place lettuce in the center, leaving space on the sides.",
      "Add a small amount of noodles, vegetables, protein, and fresh herbs on top of the lettuce.",
      "Fold the bottom of the wrapper up over the filling, then fold in the sides.",
      "Roll tightly from the bottom to the top, ensuring the filling stays compact.",
      "Place seam-side down on a plate. Repeat with remaining wrappers and filling.",
      "Serve immediately with peanut sauce or sweet chili sauce for dipping."
    ],
    notes: [
      "Don't oversoak the rice paper - it continues to soften as you work.",
      "Keep finished rolls covered with a damp towel to prevent drying.",
      "Spring rolls are best eaten within a few hours of making.",
      "Try adding mango, avocado, or red bell pepper for variety."
    ]
  },
  "stuffed-mushrooms": {
    title: "Stuffed Mushrooms",
    image: "https://images.unsplash.com/photo-1622268805718-ca073548d4ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVmZmVkJTIwbXVzaHJvb21zfGVufDF8fHx8MTc2MTk1NTE0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "September 15, 2025",
    author: "Amanda Lynn",
    category: "Appetizers",
    description: "Savory mushroom caps filled with herbs, cheese, and breadcrumbs.",
    prepTime: "20 min",
    cookTime: "15 min",
    totalTime: "35 min",
    servings: "6 servings",
    content: [
      "These stuffed mushrooms are the perfect bite-sized appetizer. Rich, savory, and absolutely addictive.",
      "The combination of cream cheese, parmesan, garlic, and fresh herbs creates an irresistible filling that complements the earthy mushrooms.",
      "They're elegant enough for entertaining but easy enough for a weeknight dinner party.",
      "Make them ahead and bake just before serving - they're best enjoyed hot from the oven."
    ],
    ingredients: [
      { imperial: "24 large button mushrooms", metric: "24 large button mushrooms" },
      { imperial: "8 oz cream cheese, softened", metric: "225 g cream cheese, softened" },
      { imperial: "1/2 cup grated parmesan", metric: "50 g grated parmesan" },
      { imperial: "3 cloves garlic, minced", metric: "3 cloves garlic, minced" },
      { imperial: "1/4 cup breadcrumbs", metric: "30 g breadcrumbs" },
      { imperial: "2 tablespoons fresh parsley, chopped", metric: "5 g fresh parsley, chopped" },
      { imperial: "2 tablespoons olive oil", metric: "30 ml olive oil" },
      { imperial: "Salt and pepper to taste", metric: "Salt and pepper to taste" }
    ],
    instructions: [
      "Preheat oven to 375°F (190°C). Line a baking sheet with parchment paper.",
      "Clean mushrooms and remove stems. Chop stems finely and set aside.",
      "In a skillet, heat olive oil and sauté chopped mushroom stems and garlic until softened, about 5 minutes.",
      "In a bowl, mix cream cheese, parmesan, sautéed mushroom stems, parsley, and breadcrumbs. Season with salt and pepper.",
      "Spoon the filling generously into each mushroom cap, mounding it slightly.",
      "Arrange stuffed mushrooms on the baking sheet.",
      "Bake for 15-18 minutes until mushrooms are tender and filling is golden on top.",
      "Serve hot, garnished with additional parsley if desired."
    ],
    notes: [
      "Choose mushrooms that are uniform in size for even cooking.",
      "Add cooked sausage or bacon to the filling for a heartier version.",
      "These can be assembled up to 24 hours ahead and refrigerated until baking.",
      "Leftovers can be reheated in a 350°F oven for 10 minutes."
    ]
  },
  "deviled-eggs": {
    title: "Deviled Eggs",
    image: "https://images.unsplash.com/photo-1626895597772-74988e263fab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXZpbGVkJTIwZWdnc3xlbnwxfHx8fDE3NjE5NTUxNDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "September 12, 2025",
    author: "Amanda Lynn",
    category: "Appetizers",
    description: "Classic appetizer with creamy yolk filling and paprika garnish.",
    prepTime: "15 min",
    cookTime: "10 min",
    totalTime: "25 min",
    servings: "12 servings",
    content: [
      "Deviled eggs are a timeless classic that never goes out of style. Creamy, tangy, and absolutely delicious.",
      "The key is perfectly hard-boiled eggs with yolks that are creamy, not chalky. Follow the timing exactly for best results.",
      "The filling is a simple mixture of mayo, mustard, and seasonings, but it's endlessly customizable.",
      "They're perfect for picnics, potlucks, holidays, or anytime you need a crowd-pleasing appetizer."
    ],
    ingredients: [
      { imperial: "12 large eggs", metric: "12 large eggs" },
      { imperial: "1/2 cup mayonnaise", metric: "120 ml mayonnaise" },
      { imperial: "2 teaspoons Dijon mustard", metric: "10 ml Dijon mustard" },
      { imperial: "1 teaspoon white vinegar", metric: "5 ml white vinegar" },
      { imperial: "1/4 teaspoon salt", metric: "1.5 g salt" },
      { imperial: "1/8 teaspoon black pepper", metric: "0.5 g black pepper" },
      { imperial: "Paprika for garnish", metric: "Paprika for garnish" },
      { imperial: "Fresh chives, chopped (optional)", metric: "Fresh chives, chopped (optional)" }
    ],
    instructions: [
      "Place eggs in a single layer in a saucepan. Cover with cold water by 1 inch.",
      "Bring to a boil over high heat. Once boiling, remove from heat, cover, and let stand for 10 minutes.",
      "Transfer eggs to an ice bath and let cool for 5 minutes. Peel under cool running water.",
      "Slice eggs in half lengthwise. Carefully remove yolks and place in a bowl.",
      "Mash yolks with a fork until smooth. Add mayo, mustard, vinegar, salt, and pepper. Mix until creamy.",
      "Spoon or pipe the yolk mixture back into the egg white halves.",
      "Sprinkle with paprika and garnish with chopped chives if desired.",
      "Refrigerate until ready to serve. Best served chilled."
    ],
    notes: [
      "For easier peeling, use eggs that are at least a week old.",
      "Add a tablespoon of relish or chopped pickles for extra flavor.",
      "Try topping with crispy bacon bits or smoked salmon.",
      "Store covered in the refrigerator for up to 2 days."
    ]
  },
  "caprese-salad-skewers": {
    title: "Caprese Salad Skewers",
    image: "https://images.unsplash.com/photo-1595587870672-c79b47875c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXByZXNlJTIwc2FsYWR8ZW58MXx8fHwxNzYxOTE4NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "September 10, 2025",
    author: "Amanda Lynn",
    category: "Appetizers",
    description: "Fresh mozzarella, tomatoes, and basil on skewers with balsamic glaze.",
    prepTime: "15 min",
    cookTime: "0 min",
    totalTime: "15 min",
    servings: "8 servings",
    content: [
      "These Caprese skewers are the ultimate easy appetizer. Fresh, colorful, and bursting with Italian flavors.",
      "The classic combination of tomatoes, mozzarella, and basil is always a winner, and serving them on skewers makes them perfect for parties.",
      "A drizzle of balsamic glaze adds a sweet and tangy finish that ties everything together.",
      "They're best made with ripe summer tomatoes and fresh mozzarella - quality ingredients really shine here."
    ],
    ingredients: [
      { imperial: "24 cherry tomatoes", metric: "24 cherry tomatoes" },
      { imperial: "24 small mozzarella balls (ciliegine)", metric: "24 small mozzarella balls (ciliegine)" },
      { imperial: "24 fresh basil leaves", metric: "24 fresh basil leaves" },
      { imperial: "2 tablespoons extra virgin olive oil", metric: "30 ml extra virgin olive oil" },
      { imperial: "2 tablespoons balsamic glaze", metric: "30 ml balsamic glaze" },
      { imperial: "Sea salt and black pepper", metric: "Sea salt and black pepper" },
      { imperial: "24 small skewers or toothpicks", metric: "24 small skewers or toothpicks" }
    ],
    instructions: [
      "Thread one cherry tomato, one basil leaf (folded if large), and one mozzarella ball onto each skewer.",
      "Arrange skewers on a serving platter.",
      "Drizzle with extra virgin olive oil and balsamic glaze.",
      "Sprinkle with sea salt and freshly cracked black pepper.",
      "Serve immediately or refrigerate for up to 2 hours before serving.",
      "Let come to room temperature for 15 minutes before serving for best flavor."
    ],
    notes: [
      "Use the ripest tomatoes you can find for maximum flavor.",
      "Fresh mozzarella from the deli is better than pre-packaged.",
      "Make your own balsamic glaze by reducing balsamic vinegar with a little honey.",
      "Add a small piece of prosciutto to each skewer for a heartier appetizer."
    ]
  },
  "pan-seared-steak": {
    title: "Pan-Seared Steak",
    image: "https://images.unsplash.com/photo-1706650616334-97875fae8521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGRpbm5lcnxlbnwxfHx8fDE3NjE5NTQzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "September 5, 2025",
    author: "Amanda Lynn",
    category: "Dinners",
    description: "Perfectly cooked ribeye steak with herb butter and roasted vegetables.",
    prepTime: "15 min",
    cookTime: "30 min",
    totalTime: "45 min",
    servings: "4 servings",
    content: [
      "A perfectly pan-seared steak is one of life's great pleasures. This recipe delivers restaurant-quality results at home.",
      "The key is a screaming hot pan, quality steak, and patience. Let the steak develop a beautiful crust before flipping.",
      "The herb butter adds richness and flavor, melting over the hot steak to create a luxurious sauce.",
      "Serve with roasted vegetables and mashed potatoes for a complete steakhouse experience."
    ],
    ingredients: [
      { imperial: "4 ribeye steaks (8 oz each)", metric: "4 ribeye steaks (225 g each)" },
      { imperial: "2 tablespoons olive oil", metric: "30 ml olive oil" },
      { imperial: "4 tablespoons butter", metric: "60 g butter" },
      { imperial: "4 cloves garlic, smashed", metric: "4 cloves garlic, smashed" },
      { imperial: "2 sprigs fresh rosemary", metric: "2 sprigs fresh rosemary" },
      { imperial: "2 sprigs fresh thyme", metric: "2 sprigs fresh thyme" },
      { imperial: "Salt and freshly ground black pepper", metric: "Salt and freshly ground black pepper" },
      { imperial: "Roasted vegetables for serving", metric: "Roasted vegetables for serving" }
    ],
    instructions: [
      "Remove steaks from refrigerator 30 minutes before cooking. Pat dry and season generously with salt and pepper on both sides.",
      "Heat a cast iron skillet over high heat until smoking hot.",
      "Add olive oil and swirl to coat. Place steaks in the pan without moving them.",
      "Cook for 3-4 minutes until a dark crust forms, then flip.",
      "Add butter, garlic, rosemary, and thyme to the pan. Cook for another 3-4 minutes for medium-rare.",
      "Tilt the pan and baste the steaks with the melted herb butter continuously.",
      "Transfer steaks to a cutting board and let rest for 5-10 minutes.",
      "Slice against the grain and serve with roasted vegetables, drizzled with the herb butter from the pan."
    ],
    notes: [
      "Use a meat thermometer: 130°F for medium-rare, 140°F for medium.",
      "Don't move the steak while it cooks - let the crust develop.",
      "Resting is crucial - it allows juices to redistribute throughout the meat.",
      "Save any leftover steak for sandwiches or salads."
    ]
  },
  "herb-roasted-chicken": {
    title: "Herb Roasted Chicken",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbnxlbnwxfHx8fDE3NjE4NDExOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "September 1, 2025",
    author: "Amanda Lynn",
    category: "Dinners",
    description: "Juicy whole chicken roasted with rosemary, thyme, and garlic.",
    prepTime: "20 min",
    cookTime: "1 hour 10 min",
    totalTime: "1 hour 30 min",
    servings: "6 servings",
    content: [
      "There's nothing quite like a perfectly roasted chicken. Golden, crispy skin on the outside and juicy, tender meat inside.",
      "Fresh herbs and garlic infuse the chicken with incredible flavor from the inside out.",
      "This one-pan meal is impressive enough for company but easy enough for a family dinner.",
      "The leftovers make amazing chicken salad, soup, or sandwiches throughout the week."
    ],
    ingredients: [
      { imperial: "1 whole chicken (5-6 lbs)", metric: "1 whole chicken (2.3-2.7 kg)" },
      { imperial: "4 tablespoons butter, softened", metric: "60 g butter, softened" },
      { imperial: "6 cloves garlic, minced", metric: "6 cloves garlic, minced" },
      { imperial: "2 tablespoons fresh rosemary, chopped", metric: "10 g fresh rosemary, chopped" },
      { imperial: "2 tablespoons fresh thyme, chopped", metric: "10 g fresh thyme, chopped" },
      { imperial: "1 lemon, halved", metric: "1 lemon, halved" },
      { imperial: "1 onion, quartered", metric: "1 onion, quartered" },
      { imperial: "Salt and pepper to taste", metric: "Salt and pepper to taste" },
      { imperial: "2 tablespoons olive oil", metric: "30 ml olive oil" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Pat chicken dry inside and out with paper towels.",
      "Mix softened butter with minced garlic, rosemary, and thyme. Season with salt and pepper.",
      "Carefully loosen the skin over the breast and thighs. Spread half the herb butter under the skin.",
      "Rub the remaining herb butter all over the outside of the chicken. Season generously with salt and pepper.",
      "Stuff the cavity with lemon halves and onion quarters.",
      "Tie the legs together with kitchen twine and tuck the wing tips under.",
      "Place chicken breast-side up in a roasting pan. Drizzle with olive oil.",
      "Roast for 1 hour 10 minutes until golden and juices run clear. Internal temperature should reach 165°F (74°C).",
      "Let rest for 15 minutes before carving."
    ],
    notes: [
      "Trussing helps the chicken cook evenly and look beautiful.",
      "Save the carcass to make homemade chicken stock.",
      "Add root vegetables around the chicken for a complete meal.",
      "For extra crispy skin, pat the chicken very dry before roasting."
    ]
  },
  "grilled-salmon": {
    title: "Grilled Salmon",
    image: "https://images.unsplash.com/photo-1560717845-968823efbee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBkaW5uZXJ8ZW58MXx8fHwxNzYxODc3MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "August 28, 2025",
    author: "Amanda Lynn",
    category: "Dinners",
    description: "Flaky salmon fillet with lemon dill sauce and asparagus.",
    prepTime: "15 min",
    cookTime: "20 min",
    totalTime: "35 min",
    servings: "4 servings",
    content: [
      "This grilled salmon is light, healthy, and packed with flavor. The lemon dill sauce is the perfect complement.",
      "Salmon is one of the easiest fish to grill - it's forgiving and holds together well.",
      "The key is not to overcook it. Salmon should be slightly translucent in the center for the best texture.",
      "Serve with grilled asparagus and rice for a complete, nutritious meal."
    ],
    ingredients: [
      { imperial: "4 salmon fillets (6 oz each)", metric: "4 salmon fillets (170 g each)" },
      { imperial: "2 tablespoons olive oil", metric: "30 ml olive oil" },
      { imperial: "Salt and pepper to taste", metric: "Salt and pepper to taste" },
      { imperial: "1 lb asparagus, trimmed", metric: "450 g asparagus, trimmed" },
      { imperial: "For sauce: 1/2 cup Greek yogurt", metric: "For sauce: 120 g Greek yogurt" },
      { imperial: "2 tablespoons fresh dill, chopped", metric: "5 g fresh dill, chopped" },
      { imperial: "1 tablespoon lemon juice", metric: "15 ml lemon juice" },
      { imperial: "1 clove garlic, minced", metric: "1 clove garlic, minced" },
      { imperial: "Lemon wedges for serving", metric: "Lemon wedges for serving" }
    ],
    instructions: [
      "Preheat grill to medium-high heat (about 400°F/200°C).",
      "Make the sauce: Mix Greek yogurt, dill, lemon juice, and minced garlic. Season with salt and pepper. Refrigerate.",
      "Brush salmon fillets with olive oil and season with salt and pepper.",
      "Toss asparagus with remaining olive oil, salt, and pepper.",
      "Oil the grill grates well. Place salmon skin-side down and asparagus on the grill.",
      "Grill salmon for 4-5 minutes per side until cooked through but still slightly pink in the center.",
      "Grill asparagus for 6-8 minutes, turning occasionally, until tender and lightly charred.",
      "Serve salmon with asparagus, drizzle with lemon dill sauce, and garnish with lemon wedges."
    ],
    notes: [
      "Wild-caught salmon has the best flavor and texture.",
      "If you don't have a grill, bake at 400°F for 12-15 minutes.",
      "The sauce can be made up to 2 days ahead.",
      "Salmon is done when it flakes easily with a fork."
    ]
  },
  "classic-lasagna": {
    title: "Classic Lasagna",
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNhZ25hJTIwZGlubmVyfGVufDF8fHx8MTc2MTk1NTE1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "August 25, 2025",
    author: "Amanda Lynn",
    category: "Dinners",
    description: "Layers of pasta, meat sauce, ricotta, and melted cheese.",
    prepTime: "30 min",
    cookTime: "45 min",
    totalTime: "1 hour 15 min",
    servings: "8 servings",
    content: [
      "This classic lasagna is the ultimate comfort food. Layers of rich meat sauce, creamy ricotta, and melted mozzarella.",
      "Making lasagna from scratch takes some time, but it's absolutely worth it. Plus, it makes great leftovers!",
      "The key is letting it rest after baking so the layers set and it's easier to slice.",
      "This recipe makes a large pan, perfect for feeding a crowd or enjoying throughout the week."
    ],
    ingredients: [
      { imperial: "1 lb lasagna noodles", metric: "450 g lasagna noodles" },
      { imperial: "1 lb ground beef", metric: "450 g ground beef" },
      { imperial: "1 lb Italian sausage", metric: "450 g Italian sausage" },
      { imperial: "1 onion, diced", metric: "1 onion, diced" },
      { imperial: "4 cloves garlic, minced", metric: "4 cloves garlic, minced" },
      { imperial: "28 oz crushed tomatoes", metric: "800 g crushed tomatoes" },
      { imperial: "2 tablespoons tomato paste", metric: "30 g tomato paste" },
      { imperial: "2 teaspoons Italian seasoning", metric: "4 g Italian seasoning" },
      { imperial: "15 oz ricotta cheese", metric: "425 g ricotta cheese" },
      { imperial: "1 egg", metric: "1 egg" },
      { imperial: "4 cups shredded mozzarella", metric: "450 g shredded mozzarella" },
      { imperial: "1 cup grated parmesan", metric: "100 g grated parmesan" },
      { imperial: "Fresh basil for garnish", metric: "Fresh basil for garnish" }
    ],
    instructions: [
      "Preheat oven to 375°F (190°C). Cook lasagna noodles according to package directions. Drain and set aside.",
      "In a large pot, cook ground beef and sausage with onion until meat is browned. Add garlic and cook 1 minute.",
      "Stir in crushed tomatoes, tomato paste, Italian seasoning, salt, and pepper. Simmer for 15 minutes.",
      "In a bowl, mix ricotta cheese with egg and half the parmesan. Season with salt and pepper.",
      "Spread 1 cup meat sauce in a 9x13 inch baking dish. Layer 4 noodles, half the ricotta mixture, 1 cup mozzarella, and 1 cup meat sauce.",
      "Repeat layers. Top with remaining noodles, meat sauce, mozzarella, and parmesan.",
      "Cover with foil and bake for 25 minutes. Remove foil and bake 20 more minutes until bubbly and golden.",
      "Let rest 15 minutes before slicing. Garnish with fresh basil."
    ],
    notes: [
      "Can be assembled up to 24 hours ahead and refrigerated until baking.",
      "Freezes beautifully for up to 3 months.",
      "Use no-boil noodles to save time.",
      "Add spinach or mushrooms to the ricotta layer for extra vegetables."
    ]
  },
  "street-tacos": {
    title: "Street Tacos",
    image: "https://images.unsplash.com/photo-1689774329109-9b70beeefc0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMGRpbm5lcnxlbnwxfHx8fDE3NjE5Mzc0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "August 22, 2025",
    author: "Amanda Lynn",
    category: "Dinners",
    description: "Authentic tacos with seasoned meat, fresh cilantro, and lime.",
    prepTime: "20 min",
    cookTime: "20 min",
    totalTime: "40 min",
    servings: "6 servings",
    content: [
      "These street tacos are authentic, flavorful, and easy to make at home. Simple ingredients, maximum flavor.",
      "The key is marinating the meat with citrus and spices, then cooking it until slightly crispy at the edges.",
      "Serve on small corn tortillas with fresh toppings and let everyone build their own.",
      "These tacos are perfect for casual gatherings or weeknight dinners."
    ],
    ingredients: [
      { imperial: "2 lbs flank steak or chicken thighs", metric: "900 g flank steak or chicken thighs" },
      { imperial: "1/4 cup lime juice", metric: "60 ml lime juice" },
      { imperial: "3 tablespoons olive oil", metric: "45 ml olive oil" },
      { imperial: "4 cloves garlic, minced", metric: "4 cloves garlic, minced" },
      { imperial: "2 teaspoons cumin", metric: "4 g cumin" },
      { imperial: "2 teaspoons chili powder", metric: "4 g chili powder" },
      { imperial: "1 teaspoon paprika", metric: "2 g paprika" },
      { imperial: "24 small corn tortillas", metric: "24 small corn tortillas" },
      { imperial: "For toppings: diced onion, chopped cilantro, lime wedges, salsa", metric: "For toppings: diced onion, chopped cilantro, lime wedges, salsa" }
    ],
    instructions: [
      "In a bowl, combine lime juice, olive oil, garlic, cumin, chili powder, paprika, salt, and pepper.",
      "Add meat and marinate for at least 30 minutes or up to 4 hours in the refrigerator.",
      "Heat a cast iron skillet or grill pan over high heat.",
      "Cook meat for 3-4 minutes per side for medium-rare steak, or until chicken is cooked through.",
      "Let meat rest for 5 minutes, then slice thinly against the grain.",
      "Warm tortillas on the grill or in a dry skillet until pliable and lightly charred.",
      "Serve meat on doubled-up tortillas with diced onion, cilantro, and a squeeze of lime.",
      "Serve with your favorite salsa and hot sauce."
    ],
    notes: [
      "Double up the tortillas for authenticity and to prevent breakage.",
      "Try different proteins - al pastor pork, carnitas, or grilled shrimp.",
      "Make a taco bar with multiple toppings for a fun dinner party.",
      "Leftover meat is great for burrito bowls or quesadillas."
    ]
  },
  "hearty-beef-stew": {
    title: "Hearty Beef Stew",
    image: "https://images.unsplash.com/photo-1664741662725-bd131742b7b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc3Rld3xlbnwxfHx8fDE3NjE4NDc1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "August 18, 2025",
    author: "Amanda Lynn",
    category: "Dinners",
    description: "Slow-cooked beef with carrots, potatoes, and rich gravy.",
    prepTime: "30 min",
    cookTime: "2 hours",
    totalTime: "2 hours 30 min",
    servings: "6 servings",
    content: [
      "This hearty beef stew is pure comfort in a bowl. Tender chunks of beef in a rich, flavorful gravy with vegetables.",
      "The key is searing the beef well before braising. This creates deep, complex flavors in the final dish.",
      "Low and slow cooking transforms tough beef into melt-in-your-mouth tender pieces.",
      "Perfect for cold weather, and it tastes even better the next day!"
    ],
    ingredients: [
      { imperial: "3 lbs beef chuck, cut into 2-inch cubes", metric: "1.4 kg beef chuck, cut into 5 cm cubes" },
      { imperial: "1/4 cup all-purpose flour", metric: "30 g all-purpose flour" },
      { imperial: "3 tablespoons olive oil", metric: "45 ml olive oil" },
      { imperial: "1 large onion, diced", metric: "1 large onion, diced" },
      { imperial: "4 cloves garlic, minced", metric: "4 cloves garlic, minced" },
      { imperial: "4 cups beef broth", metric: "960 ml beef broth" },
      { imperial: "2 tablespoons tomato paste", metric: "30 g tomato paste" },
      { imperial: "2 bay leaves", metric: "2 bay leaves" },
      { imperial: "1 teaspoon thyme", metric: "2 g thyme" },
      { imperial: "4 large carrots, cut into chunks", metric: "4 large carrots, cut into chunks" },
      { imperial: "4 large potatoes, cut into chunks", metric: "4 large potatoes, cut into chunks" },
      { imperial: "2 celery stalks, chopped", metric: "2 celery stalks, chopped" },
      { imperial: "Salt and pepper to taste", metric: "Salt and pepper to taste" }
    ],
    instructions: [
      "Season beef cubes with salt and pepper, then toss with flour until coated.",
      "Heat olive oil in a large Dutch oven over medium-high heat. Brown beef in batches, about 3-4 minutes per side. Set aside.",
      "In the same pot, sauté onion until softened, about 5 minutes. Add garlic and cook 1 minute.",
      "Stir in tomato paste and cook for 1 minute.",
      "Add beef broth, bay leaves, and thyme. Return beef to pot and bring to a boil.",
      "Reduce heat to low, cover, and simmer for 1 hour.",
      "Add carrots, potatoes, and celery. Continue simmering for another hour until beef is tender and vegetables are cooked.",
      "Remove bay leaves. Season with salt and pepper to taste.",
      "Serve hot with crusty bread for dipping."
    ],
    notes: [
      "Chuck roast is the best cut for stew - it becomes incredibly tender.",
      "Don't skip browning the beef - it adds so much flavor.",
      "This stew freezes beautifully for up to 3 months.",
      "Add a splash of red wine for extra depth of flavor."
    ]
  },
  "rich-chocolate-cake": {
    title: "Rich Chocolate Cake",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDF8fHx8MTc2MTkxNzc3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "August 15, 2025",
    author: "Amanda Lynn",
    category: "Desserts",
    description: "Decadent multi-layer chocolate cake with smooth ganache frosting.",
    prepTime: "30 min",
    cookTime: "1 hour",
    totalTime: "1 hour 30 min",
    servings: "12 servings",
    content: [
      "This is the ultimate chocolate cake - moist, rich, and incredibly chocolatey. It's the cake all other cakes aspire to be.",
      "The secret is using both cocoa powder and hot coffee, which enhances the chocolate flavor.",
      "The silky ganache frosting is surprisingly easy to make and creates a professional-looking finish.",
      "Perfect for birthdays, celebrations, or anytime you need a serious chocolate fix."
    ],
    ingredients: [
      { imperial: "2 cups all-purpose flour", metric: "240 g all-purpose flour" },
      { imperial: "2 cups sugar", metric: "400 g sugar" },
      { imperial: "3/4 cup cocoa powder", metric: "75 g cocoa powder" },
      { imperial: "2 teaspoons baking soda", metric: "10 g baking soda" },
      { imperial: "1 teaspoon baking powder", metric: "5 g baking powder" },
      { imperial: "1 teaspoon salt", metric: "6 g salt" },
      { imperial: "2 eggs", metric: "2 eggs" },
      { imperial: "1 cup buttermilk", metric: "240 ml buttermilk" },
      { imperial: "1 cup hot coffee", metric: "240 ml hot coffee" },
      { imperial: "1/2 cup vegetable oil", metric: "120 ml vegetable oil" },
      { imperial: "2 teaspoons vanilla extract", metric: "10 ml vanilla extract" },
      { imperial: "For ganache: 2 cups heavy cream", metric: "For ganache: 480 ml heavy cream" },
      { imperial: "3 cups chocolate chips", metric: "500 g chocolate chips" }
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
      "In a large bowl, whisk together flour, sugar, cocoa, baking soda, baking powder, and salt.",
      "Add eggs, buttermilk, hot coffee, oil, and vanilla. Beat until smooth, about 2 minutes.",
      "Divide batter between prepared pans. Bake for 30-35 minutes until a toothpick comes out clean.",
      "Cool in pans for 10 minutes, then turn out onto wire racks to cool completely.",
      "For ganache: Heat cream until just boiling, pour over chocolate chips. Let sit 5 minutes, then stir until smooth.",
      "Let ganache cool until spreadable, about 30 minutes.",
      "Place one cake layer on a serving plate. Spread with ganache. Top with second layer.",
      "Frost top and sides with remaining ganache. Refrigerate for 30 minutes to set."
    ],
    notes: [
      "The coffee enhances the chocolate flavor but doesn't taste like coffee.",
      "Make sure the cake layers are completely cool before frosting.",
      "Ganache can be made ahead and reheated gently to soften.",
      "Store covered at room temperature for up to 3 days."
    ]
  },
  "fresh-fruit-tart": {
    title: "Fresh Fruit Tart",
    image: "https://images.unsplash.com/photo-1670819916757-e8d5935a6c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHRhcnR8ZW58MXx8fHwxNzYxOTU1MTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "August 12, 2025",
    author: "Amanda Lynn",
    category: "Desserts",
    description: "Buttery tart shell filled with vanilla cream and seasonal fruits.",
    prepTime: "45 min",
    cookTime: "15 min",
    totalTime: "1 hour",
    servings: "8 servings",
    content: [
      "This fresh fruit tart is as beautiful as it is delicious. A buttery crust, silky pastry cream, and vibrant fresh fruit.",
      "The key is making sure each component is perfectly executed - the crisp crust, smooth cream, and perfectly arranged fruit.",
      "Use the freshest, most beautiful fruit you can find. This tart is all about showcasing seasonal produce.",
      "It's an impressive dessert that's perfect for special occasions and summer gatherings."
    ],
    ingredients: [
      { imperial: "For crust: 1 1/2 cups flour", metric: "For crust: 180 g flour" },
      { imperial: "1/2 cup butter, cold", metric: "115 g butter, cold" },
      { imperial: "1/4 cup sugar", metric: "50 g sugar" },
      { imperial: "1 egg yolk", metric: "1 egg yolk" },
      { imperial: "For cream: 2 cups whole milk", metric: "For cream: 480 ml whole milk" },
      { imperial: "1/2 cup sugar", metric: "100 g sugar" },
      { imperial: "4 egg yolks", metric: "4 egg yolks" },
      { imperial: "1/4 cup cornstarch", metric: "30 g cornstarch" },
      { imperial: "2 teaspoons vanilla extract", metric: "10 ml vanilla extract" },
      { imperial: "2 tablespoons butter", metric: "30 g butter" },
      { imperial: "Fresh berries, kiwi, and other fruit for topping", metric: "Fresh berries, kiwi, and other fruit for topping" },
      { imperial: "Apricot jam for glaze", metric: "Apricot jam for glaze" }
    ],
    instructions: [
      "Preheat oven to 375°F (190°C). Make crust: Combine flour and sugar. Cut in cold butter until crumbly.",
      "Add egg yolk and mix until dough comes together. Press into a 9-inch tart pan.",
      "Prick bottom with a fork. Bake for 15-18 minutes until golden. Cool completely.",
      "Make pastry cream: Heat milk in a saucepan until steaming.",
      "Whisk together sugar, egg yolks, and cornstarch. Slowly pour in hot milk while whisking.",
      "Return to saucepan and cook over medium heat, stirring constantly, until thick.",
      "Remove from heat and stir in vanilla and butter. Press plastic wrap directly on surface and chill.",
      "Spread cooled pastry cream in the tart shell.",
      "Arrange fresh fruit in concentric circles on top. Brush with warmed and strained apricot jam.",
      "Refrigerate until ready to serve."
    ],
    notes: [
      "The tart shell can be baked a day ahead.",
      "Pastry cream can be made up to 2 days in advance.",
      "Assemble within 4 hours of serving for best results.",
      "Use a variety of colorful fruits for the most beautiful presentation."
    ]
  },
  "classic-tiramisu": {
    title: "Classic Tiramisu",
    image: "https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxODg2OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "August 8, 2025",
    author: "Amanda Lynn",
    category: "Desserts",
    description: "Italian coffee-soaked dessert with mascarpone and cocoa.",
    prepTime: "30 min + chill time",
    cookTime: "0 min",
    totalTime: "30 min + chill time",
    servings: "8 servings",
    content: [
      "Tiramisu is the quintessential Italian dessert. Layers of coffee-soaked ladyfingers and rich mascarpone cream.",
      "The name means 'pick me up' in Italian, referring to the espresso that infuses every layer.",
      "The key is using good quality espresso and real mascarpone cheese - substitutes just don't compare.",
      "This dessert actually improves with time, so make it a day ahead for the best flavor and texture."
    ],
    ingredients: [
      { imperial: "6 egg yolks", metric: "6 egg yolks" },
      { imperial: "3/4 cup sugar", metric: "150 g sugar" },
      { imperial: "1 1/3 cups mascarpone cheese", metric: "320 g mascarpone cheese" },
      { imperial: "2 cups heavy cream", metric: "480 ml heavy cream" },
      { imperial: "2 cups strong espresso, cooled", metric: "480 ml strong espresso, cooled" },
      { imperial: "3 tablespoons coffee liqueur (optional)", metric: "45 ml coffee liqueur (optional)" },
      { imperial: "40 ladyfinger cookies", metric: "40 ladyfinger cookies" },
      { imperial: "Cocoa powder for dusting", metric: "Cocoa powder for dusting" },
      { imperial: "Dark chocolate shavings for garnish", metric: "Dark chocolate shavings for garnish" }
    ],
    instructions: [
      "In a heatproof bowl, whisk egg yolks and sugar. Place over simmering water and whisk constantly until thick and pale, about 5 minutes.",
      "Remove from heat and let cool slightly. Whisk in mascarpone until smooth.",
      "In a separate bowl, whip heavy cream to stiff peaks. Gently fold into mascarpone mixture.",
      "Combine espresso and coffee liqueur in a shallow dish.",
      "Quickly dip each ladyfinger in the coffee mixture (don't soak them).",
      "Arrange half the dipped ladyfingers in a 9x13 inch dish.",
      "Spread half the mascarpone cream over the ladyfingers. Repeat layers.",
      "Cover and refrigerate for at least 4 hours or overnight.",
      "Before serving, dust generously with cocoa powder and garnish with chocolate shavings."
    ],
    notes: [
      "Use fresh eggs from a trusted source since they're not fully cooked.",
      "Don't over-soak the ladyfingers or they'll become mushy.",
      "Can be made up to 24 hours ahead - the flavors meld beautifully.",
      "For a non-alcoholic version, omit the coffee liqueur."
    ]
  },
  "creme-brulee": {
    title: "Crème Brûlée",
    image: "https://images.unsplash.com/photo-1676300184943-09b2a08319a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVtZSUyMGJydWxlZXxlbnwxfHx8fDE3NjE5NTUxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "August 5, 2025",
    author: "Amanda Lynn",
    category: "Desserts",
    description: "Silky vanilla custard topped with caramelized sugar crust.",
    prepTime: "20 min + chill time",
    cookTime: "30 min",
    totalTime: "50 min + chill time",
    servings: "6 servings",
    content: [
      "Crème brûlée is the epitome of elegant simplicity. Silky smooth custard beneath a crisp caramelized sugar crust.",
      "The contrast between the crackling sugar and creamy custard is what makes this dessert so special.",
      "While it seems fancy, it's actually quite easy to make. The key is baking it in a water bath for even cooking.",
      "The dramatic torch finish makes it perfect for impressing dinner guests."
    ],
    ingredients: [
      { imperial: "2 cups heavy cream", metric: "480 ml heavy cream" },
      { imperial: "1 vanilla bean, split (or 2 tsp vanilla extract)", metric: "1 vanilla bean, split (or 10 ml vanilla extract)" },
      { imperial: "5 egg yolks", metric: "5 egg yolks" },
      { imperial: "1/2 cup sugar", metric: "100 g sugar" },
      { imperial: "Pinch of salt", metric: "Pinch of salt" },
      { imperial: "6 tablespoons sugar for topping", metric: "75 g sugar for topping" }
    ],
    instructions: [
      "Preheat oven to 325°F (165°C). Place six ramekins in a large baking dish.",
      "Heat cream and vanilla bean in a saucepan until steaming. Remove from heat and let steep for 10 minutes.",
      "In a bowl, whisk egg yolks, sugar, and salt until smooth.",
      "Slowly pour the warm cream into the yolk mixture, whisking constantly. Strain through a fine mesh sieve.",
      "Divide custard among ramekins. Pour hot water into the baking dish to come halfway up the sides of the ramekins.",
      "Bake for 30-35 minutes until set but still slightly jiggly in the center.",
      "Remove ramekins from water bath and chill for at least 4 hours or overnight.",
      "Before serving, sprinkle 1 tablespoon sugar evenly over each custard.",
      "Use a kitchen torch to caramelize the sugar until golden and crisp. Let sit 1 minute before serving."
    ],
    notes: [
      "If you don't have a torch, use the broiler but watch carefully.",
      "The custard can be made up to 3 days ahead.",
      "Caramelize the sugar just before serving for the crispest topping.",
      "Use superfine sugar for the smoothest caramelized crust."
    ]
  },
  "artisan-ice-cream": {
    title: "Artisan Ice Cream",
    image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbXxlbnwxfHx8fDE3NjE5MDg0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "August 1, 2025",
    author: "Amanda Lynn",
    category: "Desserts",
    description: "Homemade ice cream in classic and creative flavors.",
    prepTime: "20 min + freeze time",
    cookTime: "20 min",
    totalTime: "40 min + freeze time",
    servings: "8 servings",
    content: [
      "Making ice cream at home is easier than you think and the results are incredible. Rich, creamy, and customizable.",
      "This classic vanilla base can be adapted for endless flavor variations.",
      "The secret to creamy ice cream is the custard base - it prevents ice crystals and creates silky texture.",
      "Once you master this recipe, you'll never want store-bought ice cream again!"
    ],
    ingredients: [
      { imperial: "2 cups heavy cream", metric: "480 ml heavy cream" },
      { imperial: "1 cup whole milk", metric: "240 ml whole milk" },
      { imperial: "3/4 cup sugar", metric: "150 g sugar" },
      { imperial: "Pinch of salt", metric: "Pinch of salt" },
      { imperial: "6 egg yolks", metric: "6 egg yolks" },
      { imperial: "2 teaspoons vanilla extract", metric: "10 ml vanilla extract" }
    ],
    instructions: [
      "In a saucepan, combine cream, milk, half the sugar, and salt. Heat until steaming.",
      "In a bowl, whisk egg yolks with remaining sugar until pale and thick.",
      "Slowly pour hot cream mixture into egg yolks, whisking constantly.",
      "Return mixture to saucepan and cook over medium-low heat, stirring constantly, until it coats the back of a spoon (about 170°F/75°C).",
      "Strain through a fine mesh sieve into a clean bowl. Stir in vanilla.",
      "Cover and refrigerate until completely cold, at least 4 hours or overnight.",
      "Churn in an ice cream maker according to manufacturer's instructions.",
      "Transfer to a freezer-safe container and freeze for at least 4 hours until firm."
    ],
    notes: [
      "For chocolate ice cream, add 1/2 cup cocoa powder to the cream mixture.",
      "Add mix-ins like chocolate chips or cookie pieces in the last minute of churning.",
      "Let ice cream sit at room temperature for 5 minutes before scooping.",
      "Homemade ice cream is best enjoyed within 2 weeks."
    ]
  },
  "french-macarons": {
    title: "French Macarons",
    image: "https://images.unsplash.com/photo-1580421383318-f87fc861a696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNhcm9ucyUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxOTU1MTU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "July 28, 2025",
    author: "Amanda Lynn",
    category: "Desserts",
    description: "Delicate almond meringue cookies with smooth buttercream filling.",
    prepTime: "1 hour",
    cookTime: "1 hour",
    totalTime: "2 hours",
    servings: "24 cookies",
    content: [
      "French macarons are notoriously tricky, but with the right technique, you can master them. These delicate cookies are worth the effort.",
      "The key is precise measurements, proper aging of egg whites, and the macaronage technique.",
      "When done right, they have smooth tops, ruffled 'feet', and a tender, chewy texture.",
      "Fill them with buttercream, ganache, or jam in any flavor you can imagine."
    ],
    ingredients: [
      { imperial: "1 3/4 cups powdered sugar", metric: "200 g powdered sugar" },
      { imperial: "1 cup almond flour", metric: "100 g almond flour" },
      { imperial: "3 large egg whites, room temperature", metric: "3 large egg whites, room temperature" },
      { imperial: "1/4 cup granulated sugar", metric: "50 g granulated sugar" },
      { imperial: "Food coloring (optional)", metric: "Food coloring (optional)" },
      { imperial: "For filling: 1/2 cup butter, softened", metric: "For filling: 115 g butter, softened" },
      { imperial: "1 1/2 cups powdered sugar", metric: "180 g powdered sugar" },
      { imperial: "2 tablespoons heavy cream", metric: "30 ml heavy cream" },
      { imperial: "1 teaspoon vanilla extract", metric: "5 ml vanilla extract" }
    ],
    instructions: [
      "Sift together powdered sugar and almond flour three times. Set aside.",
      "Beat egg whites until foamy. Gradually add granulated sugar and beat to stiff peaks. Add food coloring if using.",
      "Fold the dry ingredients into the meringue in three additions. Mix until batter flows like lava (macaronage).",
      "Transfer to a piping bag and pipe 1.5-inch circles on parchment-lined baking sheets.",
      "Tap pans firmly on counter to release air bubbles. Let sit at room temperature for 30-60 minutes until a skin forms.",
      "Preheat oven to 300°F (150°C). Bake for 12-15 minutes until feet have formed and tops don't move when touched.",
      "Cool completely on pans. Meanwhile, make buttercream by beating butter, powdered sugar, cream, and vanilla until fluffy.",
      "Match macaron shells by size. Pipe buttercream on one shell and sandwich with another.",
      "Let filled macarons mature in the refrigerator for 24 hours before serving."
    ],
    notes: [
      "Humidity is the enemy of macarons - make them on a dry day.",
      "Aging egg whites for 24 hours improves results.",
      "Don't skip the resting time - it creates the signature smooth top.",
      "Store filled macarons in an airtight container in the fridge for up to 5 days."
    ]
  },
  "signature-cocktails": {
    title: "Signature Cocktails",
    image: "https://images.unsplash.com/photo-1714596428132-08574e996bd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGRyaW5rfGVufDF8fHx8MTc2MTg2NTI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "July 25, 2025",
    author: "Amanda Lynn",
    category: "Drinks",
    description: "Handcrafted cocktails with fresh ingredients and creative twists.",
    prepTime: "10 min",
    cookTime: "0 min",
    totalTime: "10 min",
    servings: "2 servings",
    content: [
      "Crafting cocktails at home is an art form. This classic cocktail recipe showcases how simple ingredients can create magic.",
      "The key to a great cocktail is balance - sweet, sour, spirit, and dilution all working in harmony.",
      "Fresh ingredients make all the difference. Use freshly squeezed juices and quality spirits.",
      "Master this basic technique and you can create endless variations."
    ],
    ingredients: [
      { imperial: "4 oz vodka or gin", metric: "120 ml vodka or gin" },
      { imperial: "2 oz fresh lime juice", metric: "60 ml fresh lime juice" },
      { imperial: "1 oz simple syrup", metric: "30 ml simple syrup" },
      { imperial: "4-6 fresh mint leaves", metric: "4-6 fresh mint leaves" },
      { imperial: "Ice cubes", metric: "Ice cubes" },
      { imperial: "Lime wheels and mint sprigs for garnish", metric: "Lime wheels and mint sprigs for garnish" },
      { imperial: "Club soda (optional)", metric: "Club soda (optional)" }
    ],
    instructions: [
      "In a cocktail shaker, gently muddle mint leaves with simple syrup.",
      "Add vodka or gin and lime juice.",
      "Fill shaker with ice and shake vigorously for 15 seconds.",
      "Strain into rocks glasses filled with fresh ice.",
      "Top with a splash of club soda if desired.",
      "Garnish with lime wheels and fresh mint sprigs.",
      "Serve immediately."
    ],
    notes: [
      "To make simple syrup: Combine equal parts sugar and water, heat until dissolved, cool.",
      "Don't over-muddle the mint or it will become bitter.",
      "Chill glasses in the freezer for an extra cold drink.",
      "Experiment with different herbs like basil or cilantro."
    ]
  },
  "berry-smoothie": {
    title: "Berry Smoothie",
    image: "https://images.unsplash.com/photo-1563282396-c299392870cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGRyaW5rfGVufDF8fHx8MTc2MTk1NTE1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "July 22, 2025",
    author: "Amanda Lynn",
    category: "Drinks",
    description: "Nutrient-packed smoothie with fresh berries and superfoods.",
    prepTime: "5 min",
    cookTime: "0 min",
    totalTime: "5 min",
    servings: "1 serving",
    content: [
      "This berry smoothie is the perfect way to start your day. Packed with antioxidants, protein, and natural sweetness.",
      "Frozen fruit creates the thick, creamy texture without needing ice that would water it down.",
      "Add your favorite superfoods like chia seeds, protein powder, or spinach for extra nutrition.",
      "It's a quick, healthy breakfast or post-workout snack that actually tastes amazing."
    ],
    ingredients: [
      { imperial: "1 cup frozen mixed berries", metric: "150 g frozen mixed berries" },
      { imperial: "1 frozen banana", metric: "1 frozen banana" },
      { imperial: "1 cup almond milk", metric: "240 ml almond milk" },
      { imperial: "1/2 cup Greek yogurt", metric: "120 g Greek yogurt" },
      { imperial: "1 tablespoon honey", metric: "15 ml honey" },
      { imperial: "1 tablespoon chia seeds (optional)", metric: "10 g chia seeds (optional)" },
      { imperial: "Handful of spinach (optional)", metric: "Handful of spinach (optional)" }
    ],
    instructions: [
      "Add all ingredients to a blender.",
      "Blend on high speed until completely smooth and creamy.",
      "Add more almond milk if too thick, or more frozen fruit if too thin.",
      "Pour into a glass and enjoy immediately."
    ],
    notes: [
      "Freeze ripe bananas for the best smoothie texture.",
      "Add a scoop of protein powder for a post-workout smoothie.",
      "The spinach is undetectable but adds great nutrition.",
      "Make smoothie packs ahead by portioning frozen fruit into bags."
    ]
  },
  "artisan-coffee-latte": {
    title: "Artisan Coffee Latte",
    image: "https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXR0ZXxlbnwxfHx8fDE3NjE5MzIyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "July 18, 2025",
    author: "Amanda Lynn",
    category: "Drinks",
    description: "Perfect espresso with steamed milk and beautiful latte art.",
    prepTime: "8 min",
    cookTime: "0 min",
    totalTime: "8 min",
    servings: "1 serving",
    content: [
      "Making café-quality lattes at home is totally achievable. It's all about good espresso and properly steamed milk.",
      "The key to great steamed milk is creating microfoam - tiny, silky bubbles that give lattes their signature creamy texture.",
      "Practice your latte art - it's easier than it looks and makes your morning coffee feel extra special.",
      "Once you master this, you'll save a fortune on coffee shop visits!"
    ],
    ingredients: [
      { imperial: "2 oz espresso (double shot)", metric: "60 ml espresso (double shot)" },
      { imperial: "8 oz whole milk", metric: "240 ml whole milk" },
      { imperial: "Sugar or sweetener to taste (optional)", metric: "Sugar or sweetener to taste (optional)" }
    ],
    instructions: [
      "Brew a double shot of espresso into your latte mug.",
      "Add sugar if desired and stir to dissolve.",
      "Pour cold milk into a milk pitcher, filling only halfway.",
      "Steam milk to 150-155°F (65-68°C), creating microfoam by keeping the steam wand just below the surface.",
      "Tap the pitcher on the counter and swirl to remove large bubbles.",
      "Pour steamed milk into the espresso, starting from a height then lowering as you pour.",
      "For latte art, pour into the center, then move the pitcher back and forth as you near the end.",
      "Serve immediately."
    ],
    notes: [
      "Whole milk creates the best microfoam, but alternatives work too.",
      "Don't overheat the milk - it becomes scalded and loses sweetness.",
      "Use freshly ground, quality espresso beans for best results.",
      "A handheld frother works if you don't have an espresso machine."
    ]
  },
  "fresh-lemonade": {
    title: "Fresh Lemonade",
    image: "https://images.unsplash.com/photo-1573500883698-e3ef47a95feb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbmFkZSUyMGRyaW5rfGVufDF8fHx8MTc2MTk1NTE2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "July 15, 2025",
    author: "Amanda Lynn",
    category: "Drinks",
    description: "Classic homemade lemonade with fresh squeezed lemons.",
    prepTime: "15 min",
    cookTime: "0 min",
    totalTime: "15 min",
    servings: "6 servings",
    content: [
      "Nothing beats homemade lemonade on a hot summer day. Fresh, tangy, and perfectly sweet.",
      "The secret is making a simple syrup first so the sugar dissolves completely, creating a smooth drink.",
      "Use freshly squeezed lemon juice - bottled just can't compare to the bright, fresh flavor.",
      "Adjust the sweetness to your preference and serve ice cold for maximum refreshment."
    ],
    ingredients: [
      { imperial: "1 1/2 cups fresh lemon juice (8-10 lemons)", metric: "360 ml fresh lemon juice (8-10 lemons)" },
      { imperial: "1 cup sugar", metric: "200 g sugar" },
      { imperial: "1 cup water (for syrup)", metric: "240 ml water (for syrup)" },
      { imperial: "6 cups cold water", metric: "1.4 L cold water" },
      { imperial: "Ice cubes", metric: "Ice cubes" },
      { imperial: "Lemon slices and fresh mint for garnish", metric: "Lemon slices and fresh mint for garnish" }
    ],
    instructions: [
      "Make simple syrup: In a saucepan, combine sugar and 1 cup water. Heat, stirring until sugar dissolves. Let cool.",
      "Roll lemons on the counter before juicing to get more juice.",
      "Juice lemons into a large pitcher, straining out seeds.",
      "Add the cooled simple syrup and 6 cups cold water. Stir well.",
      "Taste and adjust sweetness or tartness by adding more water or lemon juice.",
      "Chill in the refrigerator for at least 1 hour.",
      "Serve over ice, garnished with lemon slices and fresh mint."
    ],
    notes: [
      "For pink lemonade, add a splash of cranberry or raspberry juice.",
      "Make it sparkly by substituting club soda for half the water.",
      "Add fresh herbs like basil or lavender to the simple syrup for flavored lemonade.",
      "Keeps in the refrigerator for up to 5 days."
    ]
  },
  "peach-iced-tea": {
    title: "Peach Iced Tea",
    image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwdGVhfGVufDF8fHx8MTc2MTk1NTE2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "July 12, 2025",
    author: "Amanda Lynn",
    category: "Drinks",
    description: "Refreshing sweet tea infused with fresh peaches.",
    prepTime: "15 min + chill time",
    cookTime: "5 min",
    totalTime: "20 min + chill time",
    servings: "8 servings",
    content: [
      "This peach iced tea is summer in a glass. Sweet, fruity, and incredibly refreshing.",
      "Using real fresh peaches creates authentic flavor that bottled syrup just can't match.",
      "The peach-infused simple syrup sweetens and flavors the tea all at once.",
      "Make a big batch for picnics, barbecues, or lazy afternoons on the porch."
    ],
    ingredients: [
      { imperial: "8 cups water", metric: "1.9 L water" },
      { imperial: "6 black tea bags", metric: "6 black tea bags" },
      { imperial: "2 ripe peaches, sliced", metric: "2 ripe peaches, sliced" },
      { imperial: "3/4 cup sugar", metric: "150 g sugar" },
      { imperial: "1/2 cup water (for syrup)", metric: "120 ml water (for syrup)" },
      { imperial: "Fresh peach slices for garnish", metric: "Fresh peach slices for garnish" },
      { imperial: "Ice cubes", metric: "Ice cubes" }
    ],
    instructions: [
      "Make peach syrup: In a saucepan, combine sliced peaches, sugar, and 1/2 cup water. Bring to a boil, then simmer for 10 minutes.",
      "Strain syrup through a fine mesh sieve, pressing on peach slices. Discard solids and let syrup cool.",
      "Bring 8 cups water to a boil. Remove from heat and add tea bags. Steep for 5 minutes.",
      "Remove tea bags without squeezing them (prevents bitterness).",
      "While tea is still hot, stir in the peach syrup until combined.",
      "Let cool to room temperature, then refrigerate until cold, at least 2 hours.",
      "Serve over ice with fresh peach slices."
    ],
    notes: [
      "Use ripe, fragrant peaches for the best flavor.",
      "Green tea works well for a lighter version.",
      "Add fresh mint leaves for extra refreshment.",
      "Keeps refrigerated for up to 5 days."
    ]
  },
  "strawberry-milkshake": {
    title: "Strawberry Milkshake",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2V8ZW58MXx8fHwxNzYxOTU1MTYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "July 8, 2025",
    author: "Amanda Lynn",
    category: "Drinks",
    description: "Creamy milkshake made with fresh strawberries and vanilla ice cream.",
    prepTime: "5 min",
    cookTime: "0 min",
    totalTime: "5 min",
    servings: "2 servings",
    content: [
      "This strawberry milkshake is a classic treat that never gets old. Thick, creamy, and bursting with strawberry flavor.",
      "Using fresh strawberries creates bright, natural flavor, while quality vanilla ice cream makes it luxuriously creamy.",
      "The key is finding the right balance - thick enough to need a spoon but smooth enough to sip through a straw.",
      "Top with whipped cream and a fresh strawberry for the full diner experience."
    ],
    ingredients: [
      { imperial: "2 cups vanilla ice cream", metric: "300 g vanilla ice cream" },
      { imperial: "1 cup fresh strawberries, hulled", metric: "150 g fresh strawberries, hulled" },
      { imperial: "1/2 cup whole milk", metric: "120 ml whole milk" },
      { imperial: "2 tablespoons sugar (if needed)", metric: "25 g sugar (if needed)" },
      { imperial: "Whipped cream for topping", metric: "Whipped cream for topping" },
      { imperial: "Fresh strawberries for garnish", metric: "Fresh strawberries for garnish" }
    ],
    instructions: [
      "Add ice cream, strawberries, and milk to a blender.",
      "Blend on high speed until smooth and creamy.",
      "Taste and add sugar if strawberries aren't sweet enough. Blend again briefly.",
      "If too thick, add a splash more milk. If too thin, add more ice cream.",
      "Pour into tall glasses.",
      "Top with whipped cream and garnish with a fresh strawberry.",
      "Serve immediately with a straw and long spoon."
    ],
    notes: [
      "Frozen strawberries work too - use slightly less milk.",
      "For a chocolate strawberry shake, add 2 tablespoons chocolate syrup.",
      "Make it a float by adding a scoop of ice cream on top.",
      "Try other berries like raspberries or blueberries for variety."
    ]
  },
  "savory-herb-stuffing": {
    title: "Roasted Thanksgiving Turkey",
    image: "https://images.unsplash.com/photo-1606728035253-49e8a23146de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFua3NnaXZpbmclMjB0dXJrZXl8ZW58MXx8fHwxNzYxOTU1MzQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "July 5, 2025",
    author: "Amanda Lynn",
    category: "Holiday",
    description: "Perfect golden turkey with herb butter and traditional stuffing.",
    prepTime: "1 hour",
    cookTime: "3 hours",
    totalTime: "4 hours",
    servings: "12 servings",
    content: [
      "The centerpiece of any Thanksgiving feast, this turkey is everything you want - golden skin, juicy meat, and incredible flavor.",
      "The key is brining the turkey overnight for maximum juiciness and seasoning throughout.",
      "Herb butter under the skin keeps the breast meat moist and adds amazing flavor.",
      "Follow the timing guide carefully and use a meat thermometer for perfect results every time."
    ],
    ingredients: [
      { imperial: "1 whole turkey (14-16 lbs)", metric: "1 whole turkey (6.4-7.3 kg)" },
      { imperial: "1 cup butter, softened", metric: "225 g butter, softened" },
      { imperial: "3 tablespoons fresh sage, chopped", metric: "15 g fresh sage, chopped" },
      { imperial: "3 tablespoons fresh rosemary, chopped", metric: "15 g fresh rosemary, chopped" },
      { imperial: "3 tablespoons fresh thyme, chopped", metric: "15 g fresh thyme, chopped" },
      { imperial: "6 cloves garlic, minced", metric: "6 cloves garlic, minced" },
      { imperial: "2 onions, quartered", metric: "2 onions, quartered" },
      { imperial: "2 lemons, halved", metric: "2 lemons, halved" },
      { imperial: "4 cups chicken broth", metric: "960 ml chicken broth" },
      { imperial: "Salt and pepper to taste", metric: "Salt and pepper to taste" }
    ],
    instructions: [
      "If frozen, thaw turkey in refrigerator for 3-4 days before cooking.",
      "Remove giblets and pat turkey completely dry inside and out.",
      "Mix softened butter with herbs and garlic. Season generously with salt and pepper.",
      "Carefully loosen skin over breast and thighs. Spread half the herb butter under the skin.",
      "Rub remaining butter all over the outside. Season inside and out with salt and pepper.",
      "Stuff cavity with onions and lemons. Tie legs together and tuck wing tips under.",
      "Place turkey breast-side up on a rack in a roasting pan. Pour broth into bottom of pan.",
      "Roast at 325°F (165°C) for about 3-3.5 hours (13-15 min per pound) until internal temp reaches 165°F.",
      "Tent with foil if browning too quickly. Baste every 45 minutes.",
      "Rest for 30 minutes before carving. Use pan drippings to make gravy."
    ],
    notes: [
      "Brining the turkey overnight makes it incredibly juicy.",
      "Use a meat thermometer - it's the only way to know when it's done.",
      "Let the turkey rest - this is crucial for juicy meat.",
      "Save the carcass for homemade turkey stock."
    ]
  },
  "christmas-sugar-cookies": {
    title: "Christmas Sugar Cookies",
    image: "https://images.unsplash.com/photo-1639590229762-3c9a8c98ca31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHJpc3RtYXMlMjBjb29raWVzfGVufDF8fHx8MTc2MTk1NTM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "July 1, 2025",
    author: "Amanda Lynn",
    category: "Holiday",
    description: "Festive decorated cookies perfect for holiday celebrations and gift-giving.",
    prepTime: "1 hour",
    cookTime: "30 min",
    totalTime: "1 hour 30 min",
    servings: "24 cookies",
    content: [
      "These Christmas sugar cookies are a holiday tradition. Buttery, tender, and perfect for decorating.",
      "The dough holds its shape beautifully, so your cutout shapes stay crisp and defined.",
      "Decorating cookies is a wonderful activity to do with family, especially kids.",
      "Make them festive with royal icing, sprinkles, and your creativity!"
    ],
    ingredients: [
      { imperial: "3 cups all-purpose flour", metric: "360 g all-purpose flour" },
      { imperial: "1 1/2 teaspoons baking powder", metric: "7 g baking powder" },
      { imperial: "1/2 teaspoon salt", metric: "3 g salt" },
      { imperial: "1 cup butter, softened", metric: "225 g butter, softened" },
      { imperial: "1 cup sugar", metric: "200 g sugar" },
      { imperial: "2 large eggs", metric: "2 large eggs" },
      { imperial: "2 teaspoons vanilla extract", metric: "10 ml vanilla extract" },
      { imperial: "For royal icing: 3 cups powdered sugar", metric: "For royal icing: 360 g powdered sugar" },
      { imperial: "2 tablespoons meringue powder", metric: "15 g meringue powder" },
      { imperial: "5-6 tablespoons water", metric: "75-90 ml water" },
      { imperial: "Food coloring and sprinkles", metric: "Food coloring and sprinkles" }
    ],
    instructions: [
      "In a bowl, whisk together flour, baking powder, and salt.",
      "In a large bowl, beat butter and sugar until light and fluffy, about 3 minutes.",
      "Beat in eggs one at a time, then vanilla.",
      "Gradually mix in dry ingredients until just combined.",
      "Divide dough in half, flatten into disks, wrap in plastic. Chill for at least 1 hour.",
      "Preheat oven to 375°F (190°C). Line baking sheets with parchment.",
      "Roll out dough to 1/4 inch thickness. Cut into shapes and place on baking sheets.",
      "Bake for 8-10 minutes until edges are just set. Don't overbake. Cool completely.",
      "Make royal icing: Beat powdered sugar, meringue powder, and water until glossy and thick.",
      "Divide and tint with food coloring. Decorate cookies and let dry completely."
    ],
    notes: [
      "Chill cut cookies on the baking sheet for 15 minutes before baking for best shape retention.",
      "Royal icing dries hard, perfect for stacking and gifting.",
      "Undecorated cookies freeze well for up to 3 months.",
      "Use different piping consistencies for outlining vs. flooding."
    ]
  },
  "holiday-fruit-pie": {
    title: "Holiday Fruit Pie",
    image: "https://images.unsplash.com/photo-1759877409091-a17f677a3777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwcGllfGVufDF8fHx8MTc2MTk1NTM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "June 28, 2025",
    author: "Amanda Lynn",
    category: "Holiday",
    description: "Traditional holiday pie with flaky crust and seasonal fruit filling.",
    prepTime: "45 min",
    cookTime: "30 min",
    totalTime: "1 hour 15 min",
    servings: "8 servings",
    content: [
      "This holiday fruit pie is a showstopper. Flaky, buttery crust filled with sweet, spiced fruit filling.",
      "The combination of apples and cranberries is perfect for the holidays - sweet, tart, and festive.",
      "A lattice top crust not only looks beautiful but allows steam to escape so the filling cooks perfectly.",
      "Serve warm with vanilla ice cream for the ultimate holiday dessert."
    ],
    ingredients: [
      { imperial: "For crust: 2 1/2 cups flour", metric: "For crust: 300 g flour" },
      { imperial: "1 teaspoon salt", metric: "6 g salt" },
      { imperial: "1 tablespoon sugar", metric: "12 g sugar" },
      { imperial: "1 cup cold butter, cubed", metric: "225 g cold butter, cubed" },
      { imperial: "6-8 tablespoons ice water", metric: "90-120 ml ice water" },
      { imperial: "For filling: 6 cups apples, peeled and sliced", metric: "For filling: 900 g apples, peeled and sliced" },
      { imperial: "1 cup fresh cranberries", metric: "100 g fresh cranberries" },
      { imperial: "3/4 cup sugar", metric: "150 g sugar" },
      { imperial: "1/4 cup flour", metric: "30 g flour" },
      { imperial: "1 teaspoon cinnamon", metric: "3 g cinnamon" },
      { imperial: "1/4 teaspoon nutmeg", metric: "0.5 g nutmeg" },
      { imperial: "2 tablespoons butter", metric: "30 g butter" }
    ],
    instructions: [
      "Make crust: Combine flour, salt, and sugar. Cut in cold butter until pea-sized.",
      "Add ice water 1 tablespoon at a time until dough comes together. Divide in half, form disks, chill 1 hour.",
      "Make filling: Toss apples and cranberries with sugar, flour, cinnamon, and nutmeg.",
      "Preheat oven to 425°F (220°C).",
      "Roll out one disk to fit a 9-inch pie plate. Transfer to plate and trim edges.",
      "Add filling and dot with butter. Roll out second disk and cut into strips for lattice.",
      "Weave strips over filling to create lattice pattern. Trim and crimp edges.",
      "Brush with egg wash and sprinkle with sugar.",
      "Bake 20 minutes at 425°F, then reduce to 375°F and bake 30-40 minutes more until golden and bubbly.",
      "Cool for at least 2 hours before slicing."
    ],
    notes: [
      "Use a mix of sweet and tart apples for best flavor.",
      "Freeze the lattice strips before weaving for easier handling.",
      "Place a baking sheet under the pie to catch any drips.",
      "The pie tastes even better the next day!"
    ]
  },
  "gingerbread-cookies": {
    title: "Gingerbread Cookies",
    image: "https://images.unsplash.com/photo-1616372383709-de2bc15e3dee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaW5nZXJicmVhZCUyMGNvb2tpZXN8ZW58MXx8fHwxNzYxOTEyMjU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "June 25, 2025",
    author: "Amanda Lynn",
    category: "Holiday",
    description: "Spiced gingerbread cookies decorated with royal icing for the holidays.",
    prepTime: "1 hour 30 min",
    cookTime: "30 min",
    totalTime: "2 hours",
    servings: "36 cookies",
    content: [
      "These gingerbread cookies are perfectly spiced with ginger, cinnamon, and molasses. They're a holiday essential!",
      "The dough is sturdy and holds detailed shapes beautifully, perfect for gingerbread people or houses.",
      "The warming spices fill your home with the most wonderful holiday aroma while baking.",
      "Decorate them with royal icing to create edible works of art that are almost too pretty to eat."
    ],
    ingredients: [
      { imperial: "3 1/2 cups all-purpose flour", metric: "420 g all-purpose flour" },
      { imperial: "1 teaspoon baking soda", metric: "5 g baking soda" },
      { imperial: "2 teaspoons ground ginger", metric: "4 g ground ginger" },
      { imperial: "1 teaspoon cinnamon", metric: "3 g cinnamon" },
      { imperial: "1/2 teaspoon cloves", metric: "1 g cloves" },
      { imperial: "1/2 teaspoon salt", metric: "3 g salt" },
      { imperial: "3/4 cup butter, softened", metric: "170 g butter, softened" },
      { imperial: "3/4 cup brown sugar", metric: "165 g brown sugar" },
      { imperial: "1/2 cup molasses", metric: "120 ml molasses" },
      { imperial: "1 large egg", metric: "1 large egg" },
      { imperial: "Royal icing and decorations", metric: "Royal icing and decorations" }
    ],
    instructions: [
      "In a bowl, whisk together flour, baking soda, spices, and salt.",
      "Beat butter and brown sugar until fluffy. Mix in molasses and egg.",
      "Gradually add dry ingredients until combined. Dough will be thick.",
      "Divide dough in half, flatten into disks, wrap and chill for at least 2 hours.",
      "Preheat oven to 350°F (175°C). Line baking sheets with parchment.",
      "Roll out dough to 1/4 inch thickness on floured surface.",
      "Cut into desired shapes and place on baking sheets 2 inches apart.",
      "Bake 8-10 minutes until edges are set. They'll firm up as they cool.",
      "Cool completely on wire racks before decorating.",
      "Decorate with royal icing, candies, and sprinkles."
    ],
    notes: [
      "The dough needs to be well-chilled for easy rolling.",
      "Re-roll scraps only once to keep cookies tender.",
      "For softer cookies, underbake by 1-2 minutes.",
      "Store in airtight container for up to 2 weeks."
    ]
  },
  "classic-pumpkin-pie": {
    title: "Classic Pumpkin Pie",
    image: "https://images.unsplash.com/photo-1637769712646-4dcd5b30092a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdW1wa2luJTIwcGllfGVufDF8fHx8MTc2MTk1NTM0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "June 22, 2025",
    author: "Amanda Lynn",
    category: "Holiday",
    description: "Creamy spiced pumpkin filling in a buttery pie crust with whipped cream.",
    prepTime: "30 min",
    cookTime: "1 hour",
    totalTime: "1 hour 30 min",
    servings: "8 servings",
    content: [
      "Pumpkin pie is THE quintessential Thanksgiving dessert. This version is perfectly spiced and creamy.",
      "The blend of cinnamon, ginger, and nutmeg creates that classic pumpkin pie spice flavor everyone loves.",
      "The secret to smooth filling is whisking thoroughly and baking at the right temperature.",
      "Serve with fresh whipped cream for the perfect finish to your holiday meal."
    ],
    ingredients: [
      { imperial: "1 unbaked 9-inch pie crust", metric: "1 unbaked 23 cm pie crust" },
      { imperial: "15 oz pumpkin puree", metric: "425 g pumpkin puree" },
      { imperial: "3/4 cup sugar", metric: "150 g sugar" },
      { imperial: "1 teaspoon cinnamon", metric: "3 g cinnamon" },
      { imperial: "1/2 teaspoon ginger", metric: "1 g ginger" },
      { imperial: "1/4 teaspoon nutmeg", metric: "0.5 g nutmeg" },
      { imperial: "1/4 teaspoon cloves", metric: "0.5 g cloves" },
      { imperial: "1/2 teaspoon salt", metric: "3 g salt" },
      { imperial: "3 large eggs", metric: "3 large eggs" },
      { imperial: "1 can (12 oz) evaporated milk", metric: "1 can (355 ml) evaporated milk" },
      { imperial: "Whipped cream for serving", metric: "Whipped cream for serving" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C).",
      "In a large bowl, whisk together pumpkin, sugar, spices, and salt.",
      "Beat in eggs one at a time until smooth.",
      "Gradually whisk in evaporated milk until well combined.",
      "Pour filling into unbaked pie crust.",
      "Bake at 425°F for 15 minutes.",
      "Reduce temperature to 350°F (175°C) and bake 40-50 minutes more until a knife inserted near center comes out clean.",
      "The center will still jiggle slightly - it sets as it cools.",
      "Cool completely on a wire rack, then refrigerate for at least 2 hours.",
      "Serve chilled with whipped cream."
    ],
    notes: [
      "Use pure pumpkin puree, not pumpkin pie filling.",
      "Shield the crust edges with foil if browning too quickly.",
      "The pie can be made up to 2 days ahead.",
      "For a decorative touch, use cookie cutters to make leaf shapes from extra pie dough."
    ]
  },
  "holiday-feast-spread": {
    title: "Holiday Feast Spread",
    image: "https://images.unsplash.com/photo-1519910416653-a864f95daa4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpZGF5JTIwZGlubmVyJTIwdGFibGV8ZW58MXx8fHwxNzYxOTU1MzUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "June 18, 2025",
    author: "Amanda Lynn",
    category: "Holiday",
    description: "Complete holiday dinner with all the traditional sides and accompaniments.",
    prepTime: "2 hours",
    cookTime: "1 hour",
    totalTime: "3 hours",
    servings: "10 servings",
    content: [
      "This complete holiday feast includes all the classics - perfectly coordinated and timed to come together beautifully.",
      "The key to a successful holiday dinner is planning and organization. Make what you can ahead.",
      "This menu includes creamy mashed potatoes, green bean casserole, cranberry sauce, dinner rolls, and gravy.",
      "Follow the timeline guide to have everything hot and ready at the same time."
    ],
    ingredients: [
      { imperial: "For mashed potatoes: 5 lbs potatoes", metric: "For mashed potatoes: 2.3 kg potatoes" },
      { imperial: "1 cup butter", metric: "225 g butter" },
      { imperial: "1 cup heavy cream", metric: "240 ml heavy cream" },
      { imperial: "For green beans: 2 lbs fresh green beans", metric: "For green beans: 900 g fresh green beans" },
      { imperial: "1 can cream of mushroom soup", metric: "1 can cream of mushroom soup" },
      { imperial: "For cranberry sauce: 12 oz fresh cranberries", metric: "For cranberry sauce: 340 g fresh cranberries" },
      { imperial: "1 cup sugar", metric: "200 g sugar" },
      { imperial: "1 cup orange juice", metric: "240 ml orange juice" },
      { imperial: "Dinner rolls and gravy ingredients", metric: "Dinner rolls and gravy ingredients" }
    ],
    instructions: [
      "Make cranberry sauce up to 3 days ahead: Simmer cranberries, sugar, and orange juice until berries pop. Chill.",
      "Day of: Start mashed potatoes 1 hour before serving. Boil peeled, cubed potatoes until tender.",
      "Drain and mash with butter, cream, salt, and pepper. Keep warm.",
      "For green bean casserole: Blanch beans, toss with soup and seasonings. Top with fried onions. Bake at 350°F for 25 minutes.",
      "Warm dinner rolls in foil packets during the last 10 minutes of casserole baking.",
      "Make gravy from turkey drippings: Whisk drippings with flour, cook until thick, season.",
      "Time everything to finish together - mashed potatoes can wait covered, casserole stays hot, rolls wrapped in towels.",
      "Serve family style with all dishes on the table."
    ],
    notes: [
      "Make a detailed timeline working backward from serving time.",
      "Prep vegetables the day before to save time.",
      "Use slow cooker to keep mashed potatoes warm.",
      "Double recipes if serving more than 10 people."
    ]
  },
  "garlic-herb-roasted-potatoes": {
    title: "Garlic Herb Roasted Potatoes",
    image: "https://images.unsplash.com/photo-1537786090555-3ae8e11b1d4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwcG90YXRvZXN8ZW58MXx8fHwxNzY2NjAwODU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "November 20, 2025",
    author: "Amanda Lynn",
    category: "Sides",
    description: "Crispy golden potatoes seasoned with fresh herbs and garlic, perfect alongside any main dish.",
    prepTime: "15 min",
    cookTime: "25 min",
    totalTime: "40 min",
    servings: "6 servings",
    content: [
      "These roasted potatoes are the perfect side dish - crispy on the outside, fluffy on the inside, and loaded with garlic and herb flavor.",
      "The secret is cutting the potatoes into even-sized pieces and making sure they're nice and dry before tossing with oil.",
      "Fresh herbs make all the difference here. Rosemary and thyme are classic, but you can use whatever you have on hand.",
      "These potatoes pair beautifully with roasted meats, grilled fish, or as part of a holiday spread."
    ],
    ingredients: [
      { imperial: "3 lbs Yukon gold potatoes", metric: "1.4 kg Yukon gold potatoes" },
      { imperial: "4 tablespoons olive oil", metric: "60 ml olive oil" },
      { imperial: "6 cloves garlic, minced", metric: "6 cloves garlic, minced" },
      { imperial: "2 tablespoons fresh rosemary, chopped", metric: "15 g fresh rosemary, chopped" },
      { imperial: "2 tablespoons fresh thyme, chopped", metric: "15 g fresh thyme, chopped" },
      { imperial: "1 teaspoon salt", metric: "5 g salt" },
      { imperial: "1/2 teaspoon black pepper", metric: "2 g black pepper" },
      { imperial: "Fresh parsley for garnish", metric: "Fresh parsley for garnish" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Line a large baking sheet with parchment paper.",
      "Cut potatoes into 1-inch chunks, keeping them as uniform as possible for even cooking.",
      "Pat the potato pieces dry with a clean kitchen towel - this helps them get crispy.",
      "In a large bowl, toss potatoes with olive oil, minced garlic, rosemary, thyme, salt, and pepper until evenly coated.",
      "Spread potatoes in a single layer on the prepared baking sheet, making sure they're not crowded.",
      "Roast for 25-30 minutes, flipping halfway through, until golden brown and crispy on the edges.",
      "Garnish with fresh parsley and serve immediately."
    ],
    notes: [
      "Don't skip drying the potatoes - moisture is the enemy of crispiness!",
      "For extra crispy potatoes, increase oven temperature to 450°F.",
      "You can prep these ahead: toss with oil and seasonings, then refrigerate until ready to roast.",
      "Leftovers can be reheated in the oven at 400°F for 10 minutes."
    ]
  },
  "homemade-garlic-bread": {
    title: "Homemade Garlic Bread",
    image: "https://images.unsplash.com/photo-1573140401552-3fab0b24306f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJsaWMlMjBicmVhZHxlbnwxfHx8fDE3NjY1OTI1OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "November 18, 2025",
    author: "Amanda Lynn",
    category: "Sides",
    description: "Buttery, crispy garlic bread with fresh parsley and parmesan cheese.",
    prepTime: "10 min",
    cookTime: "5 min",
    totalTime: "15 min",
    servings: "8 servings",
    content: [
      "Nothing beats fresh, homemade garlic bread. This recipe is incredibly simple but delivers restaurant-quality results.",
      "The combination of butter, fresh garlic, and parsley is classic, but the addition of parmesan takes it to the next level.",
      "Use a good quality French or Italian bread - the better the bread, the better your garlic bread will be.",
      "This is perfect alongside pasta, soups, or salads. It also makes a great appetizer."
    ],
    ingredients: [
      { imperial: "1 large French bread loaf", metric: "1 large French bread loaf" },
      { imperial: "1/2 cup butter, softened", metric: "115 g butter, softened" },
      { imperial: "6 cloves garlic, minced", metric: "6 cloves garlic, minced" },
      { imperial: "1/4 cup fresh parsley, chopped", metric: "15 g fresh parsley, chopped" },
      { imperial: "1/4 cup grated parmesan cheese", metric: "25 g grated parmesan cheese" },
      { imperial: "1/4 teaspoon salt", metric: "1.5 g salt" },
      { imperial: "1/8 teaspoon garlic powder (optional)", metric: "0.5 g garlic powder (optional)" }
    ],
    instructions: [
      "Preheat oven to 400°F (200°C).",
      "Slice the bread in half lengthwise to create two long pieces.",
      "In a small bowl, mix together softened butter, minced garlic, parsley, parmesan, salt, and garlic powder (if using).",
      "Spread the garlic butter mixture evenly over both cut sides of the bread.",
      "Place bread on a baking sheet, cut side up.",
      "Bake for 10-12 minutes until the edges are golden and crispy. For extra crispiness, broil for 1-2 minutes at the end.",
      "Slice into individual portions and serve hot."
    ],
    notes: [
      "For a deeper garlic flavor, sauté the minced garlic in the melted butter for 30 seconds before mixing with other ingredients.",
      "Add a pinch of red pepper flakes for a spicy kick.",
      "This can be prepared ahead - assemble the bread with butter mixture, wrap in foil, and bake when ready.",
      "Freeze wrapped portions for up to 3 months."
    ]
  },
  "creamy-coleslaw": {
    title: "Creamy Coleslaw",
    image: "https://images.unsplash.com/photo-1573403707491-38a4ea19edc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xlc2xhdyUyMHNhbGFkfGVufDF8fHx8MTc2NjU5MTIwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "November 15, 2025",
    author: "Amanda Lynn",
    category: "Sides",
    description: "Classic creamy coleslaw with cabbage, carrots, and tangy dressing.",
    prepTime: "15 min",
    cookTime: "0 min",
    totalTime: "15 min",
    servings: "8 servings",
    content: [
      "This classic coleslaw is the perfect balance of creamy and tangy, with just a hint of sweetness.",
      "The secret to great coleslaw is letting it chill for at least an hour before serving - this allows the flavors to meld and the cabbage to soften slightly.",
      "It's perfect for BBQs, picnics, and as a topping for pulled pork sandwiches.",
      "You can easily adjust the sweetness and tanginess to your taste by tweaking the sugar and vinegar."
    ],
    ingredients: [
      { imperial: "1 medium head green cabbage, shredded", metric: "800 g green cabbage, shredded" },
      { imperial: "2 large carrots, grated", metric: "200 g carrots, grated" },
      { imperial: "3/4 cup mayonnaise", metric: "180 ml mayonnaise" },
      { imperial: "2 tablespoons apple cider vinegar", metric: "30 ml apple cider vinegar" },
      { imperial: "2 tablespoons sugar", metric: "25 g sugar" },
      { imperial: "1/2 teaspoon celery salt", metric: "2.5 g celery salt" },
      { imperial: "1/4 teaspoon salt", metric: "1.5 g salt" },
      { imperial: "1/4 teaspoon black pepper", metric: "1 g black pepper" }
    ],
    instructions: [
      "In a large bowl, combine the shredded cabbage and grated carrots.",
      "In a separate small bowl, whisk together mayonnaise, apple cider vinegar, sugar, celery salt, salt, and pepper until smooth.",
      "Pour the dressing over the cabbage mixture and toss until everything is evenly coated.",
      "Cover and refrigerate for at least 1 hour before serving to allow flavors to develop.",
      "Give it a good stir before serving and adjust seasoning if needed."
    ],
    notes: [
      "For best results, use a food processor with a shredding attachment to make quick work of the cabbage.",
      "Make this up to 24 hours ahead - it actually gets better as it sits!",
      "Add a handful of raisins or diced apple for a sweet twist.",
      "For a lighter version, substitute half the mayo with Greek yogurt."
    ]
  },
  "herb-rice-pilaf": {
    title: "Herb Rice Pilaf",
    image: "https://images.unsplash.com/photo-1634324092536-74480096b939?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGlsYWZ8ZW58MXx8fHwxNzY2NTYzNDAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "November 12, 2025",
    author: "Amanda Lynn",
    category: "Sides",
    description: "Fluffy rice pilaf with aromatic herbs and toasted almonds.",
    prepTime: "10 min",
    cookTime: "20 min",
    totalTime: "30 min",
    servings: "6 servings",
    content: [
      "This herb rice pilaf is an elegant side dish that's surprisingly easy to make. It's much more interesting than plain rice!",
      "Toasting the rice in butter before adding liquid gives it a wonderful nutty flavor and helps keep the grains separate.",
      "The combination of fresh herbs and toasted almonds adds texture and sophistication to this simple dish.",
      "It pairs beautifully with chicken, fish, or lamb, and works great for both weeknight dinners and special occasions."
    ],
    ingredients: [
      { imperial: "2 tablespoons butter", metric: "30 g butter" },
      { imperial: "1 small onion, finely diced", metric: "100 g onion, finely diced" },
      { imperial: "1 1/2 cups long-grain white rice", metric: "300 g long-grain white rice" },
      { imperial: "3 cups chicken broth", metric: "720 ml chicken broth" },
      { imperial: "2 tablespoons fresh parsley, chopped", metric: "8 g fresh parsley, chopped" },
      { imperial: "1 tablespoon fresh thyme", metric: "5 g fresh thyme" },
      { imperial: "1/2 teaspoon salt", metric: "2.5 g salt" },
      { imperial: "1/4 teaspoon black pepper", metric: "1 g black pepper" },
      { imperial: "1/3 cup sliced almonds, toasted", metric: "35 g sliced almonds, toasted" }
    ],
    instructions: [
      "In a medium saucepan, melt butter over medium heat. Add diced onion and sauté until softened, about 3-4 minutes.",
      "Add rice and stir to coat with butter. Toast for 2-3 minutes, stirring frequently, until rice becomes slightly translucent.",
      "Pour in chicken broth, add salt and pepper, and bring to a boil.",
      "Reduce heat to low, cover, and simmer for 15-18 minutes until rice is tender and liquid is absorbed.",
      "Remove from heat and let stand, covered, for 5 minutes.",
      "Fluff rice with a fork and stir in fresh parsley and thyme.",
      "Top with toasted almonds and serve."
    ],
    notes: [
      "To toast almonds, place in a dry skillet over medium heat for 3-4 minutes, stirring frequently.",
      "You can use vegetable broth for a vegetarian version.",
      "Add a bay leaf while cooking for extra flavor - just remember to remove it before serving.",
      "This reheats well - add a splash of broth and microwave until heated through."
    ]
  },
  "green-beans-almondine": {
    title: "Green Beans Almondine",
    image: "https://images.unsplash.com/photo-1605402966404-ec40b9bd5009?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGJlYW5zJTIwYWxtb25kc3xlbnwxfHx8fDE3NjY2MDA4NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "November 10, 2025",
    author: "Amanda Lynn",
    category: "Sides",
    description: "Tender green beans sautéed with butter, garlic, and toasted almonds.",
    prepTime: "10 min",
    cookTime: "10 min",
    totalTime: "20 min",
    servings: "4 servings",
    content: [
      "Green Beans Almondine (or Amandine) is a classic French-inspired side dish that's both simple and elegant.",
      "The key is blanching the beans first to get them perfectly tender-crisp, then finishing them in butter with garlic and almonds.",
      "Fresh green beans work best here - they have a wonderful snap and flavor that frozen beans just can't match.",
      "This dish comes together quickly and looks beautiful on the plate, making it perfect for dinner parties."
    ],
    ingredients: [
      { imperial: "1 1/2 lbs fresh green beans, trimmed", metric: "680 g fresh green beans, trimmed" },
      { imperial: "3 tablespoons butter", metric: "45 g butter" },
      { imperial: "3 cloves garlic, minced", metric: "3 cloves garlic, minced" },
      { imperial: "1/2 cup sliced almonds", metric: "55 g sliced almonds" },
      { imperial: "1 tablespoon lemon juice", metric: "15 ml lemon juice" },
      { imperial: "1/2 teaspoon salt", metric: "2.5 g salt" },
      { imperial: "1/4 teaspoon black pepper", metric: "1 g black pepper" },
      { imperial: "Lemon zest for garnish (optional)", metric: "Lemon zest for garnish (optional)" }
    ],
    instructions: [
      "Bring a large pot of salted water to a boil. Prepare a bowl of ice water.",
      "Add green beans to boiling water and cook for 3-4 minutes until bright green and tender-crisp.",
      "Drain beans and immediately transfer to ice water to stop cooking. Drain again and pat dry.",
      "In a large skillet, melt 2 tablespoons of butter over medium heat. Add sliced almonds and toast until golden, about 2-3 minutes. Remove almonds to a plate.",
      "Add remaining butter to skillet. Add garlic and sauté for 30 seconds until fragrant.",
      "Add green beans, salt, and pepper. Sauté for 3-4 minutes until heated through.",
      "Remove from heat, add lemon juice, and toss with toasted almonds. Garnish with lemon zest if desired."
    ],
    notes: [
      "Don't skip the ice bath - it stops the cooking and keeps the beans bright green.",
      "You can blanch the beans several hours ahead and finish them just before serving.",
      "For extra richness, use brown butter instead of regular butter.",
      "Substitute pine nuts or pecans for the almonds if you prefer."
    ]
  },
  "roasted-brussels-sprouts": {
    title: "Roasted Brussels Sprouts",
    image: "https://images.unsplash.com/photo-1633862033803-7abafaf9bcb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWRlJTIwZGlzaCUyMHZlZ2V0YWJsZXxlbnwxfHx8fDE3NjY2MDA4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    publishedDate: "November 8, 2025",
    author: "Amanda Lynn",
    category: "Sides",
    description: "Caramelized Brussels sprouts with balsamic glaze and crispy bacon.",
    prepTime: "15 min",
    cookTime: "20 min",
    totalTime: "35 min",
    servings: "6 servings",
    content: [
      "These roasted Brussels sprouts will convert even the pickiest eaters. High heat caramelizes the edges while keeping the centers tender.",
      "The combination of crispy bacon and sweet balsamic glaze creates the perfect balance of savory and sweet.",
      "Cut the Brussels sprouts in half for maximum caramelized surface area - that's where all the flavor is!",
      "This has become a holiday favorite at my table, but it's easy enough for weeknight dinners too."
    ],
    ingredients: [
      { imperial: "2 lbs Brussels sprouts, trimmed and halved", metric: "900 g Brussels sprouts, trimmed and halved" },
      { imperial: "4 slices bacon, chopped", metric: "4 slices bacon, chopped" },
      { imperial: "3 tablespoons olive oil", metric: "45 ml olive oil" },
      { imperial: "1/2 teaspoon salt", metric: "2.5 g salt" },
      { imperial: "1/4 teaspoon black pepper", metric: "1 g black pepper" },
      { imperial: "2 tablespoons balsamic vinegar", metric: "30 ml balsamic vinegar" },
      { imperial: "1 tablespoon honey", metric: "15 ml honey" }
    ],
    instructions: [
      "Preheat oven to 425°F (220°C). Line a large baking sheet with parchment paper.",
      "In a large skillet, cook chopped bacon over medium heat until crispy. Remove with a slotted spoon and set aside.",
      "In a large bowl, toss Brussels sprouts with olive oil, salt, and pepper.",
      "Spread Brussels sprouts cut-side down on the prepared baking sheet in a single layer.",
      "Roast for 20-25 minutes until deeply caramelized and crispy on the edges.",
      "While sprouts roast, whisk together balsamic vinegar and honey in a small bowl.",
      "Transfer roasted Brussels sprouts to a serving dish, drizzle with balsamic glaze, and top with crispy bacon."
    ],
    notes: [
      "Make sure Brussels sprouts are dry before tossing with oil - excess moisture prevents browning.",
      "Don't crowd the pan - use two baking sheets if needed for proper caramelization.",
      "For a vegetarian version, omit bacon and add toasted pecans instead.",
      "The balsamic glaze can be made ahead and stored in the refrigerator for up to a week."
    ]
  }
};

export function RecipePage() {
  const { postId } = useParams<{ postId: string }>();
  const recipe = postId ? recipes[postId] : null;
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
          size: 'invisible'
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
    return (
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1>Recipe Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find that recipe.</p>
          <Link to="/recipes" className="text-primary hover:underline">
            Browse all recipes →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main>
      <div className="max-w-4xl mx-auto px-[4vw] sm:px-6 lg:px-8 -mt-1.5 mb-0 sm:mb-[50px]">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: "Recipes", href: "/recipes" },
            { label: recipe.category, href: `/${recipe.category.toLowerCase()}` },
            { label: recipe.title }
          ]}
        />
      </div>
      
      <RecipePageTemplate>
          {/* Header with Image and Title */}
          <div className="flex flex-col md:flex-row gap-6 sm:gap-6 lg:gap-8 mb-8 sm:mb-8 print:hidden">
            {/* Left: Recipe Image */}
            <div className="w-[280px] md:w-[339px] h-[200px] md:h-[250px] flex-shrink-0 mx-auto md:mx-0 overflow-visible mt-[7px] sm:mt-0">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover border-[8px] sm:border-[16px] border-white -rotate-[6deg] border border-gray-200"
                style={{
                  boxShadow: 'var(--shadow-hero)'
                }}
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
            <div className="recipe-card-print bg-secondary p-4 sm:p-6 lg:p-8" style={{ boxShadow: '0 12px 17px -4px rgb(0 0 0 / 0.1), 0 5px 7px -5px rgb(0 0 0 / 0.1)' }}>
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
                    <img src={recipe.image} alt="Recipe" className="w-[424px] aspect-square object-cover" />
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
                    <img 
                      src={recipe.image} 
                      alt="Recipe Card" 
                      className="w-[40vw] max-w-[164px] sm:w-[164px] lg:w-[188px] xl:w-[214px] aspect-square object-cover border-8 sm:border-[12px] lg:border-[16px] border-white border border-gray-200"
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
                  <img src={logo} alt="Hello Amanda Lynn" />
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
                          <img
                            src={item.image}
                            alt={item.name}
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
