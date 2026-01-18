'use client';

import { RecipeCard } from "@/components/RecipeCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";

export default function BreakfastPage() {
  const breakfasts = [
    {
      id: "fluffy-buttermilk-pancakes",
      title: "Fluffy Buttermilk Pancakes",
      description: "Light and fluffy pancakes with maple syrup and fresh berries.",
      image: "https://images.unsplash.com/photo-1636743713732-125909a35dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBwYW5jYWtlc3xlbnwxfHx8fDE3NjE4ODc4NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "25 min",
      servings: "4 servings",
    },
    {
      id: "classic-french-toast",
      title: "Classic French Toast",
      description: "Golden French toast with cinnamon, powdered sugar, and maple syrup.",
      image: "https://images.unsplash.com/photo-1653194512065-ced623ac3cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjB0b2FzdCUyMGJyZWFrZmFzdHxlbnwxfHx8fDE3NjE4NzkxMTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "20 min",
      servings: "4 servings",
    },
    {
      id: "eggs-benedict",
      title: "Eggs Benedict",
      description: "Poached eggs on English muffins with hollandaise sauce and Canadian bacon.",
      image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2dzJTIwYmVuZWRpY3R8ZW58MXx8fHwxNzYxOTU1MzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "30 min",
      servings: "2 servings",
    },
    {
      id: "greek-yogurt-parfait",
      title: "Greek Yogurt Parfait",
      description: "Layered yogurt with granola, honey, and fresh berries.",
      image: "https://images.unsplash.com/photo-1636143938155-4c5735fca7f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjB5b2d1cnR8ZW58MXx8fHwxNzYxOTU1MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "10 min",
      servings: "2 servings",
    },
    {
      id: "avocado-toast",
      title: "Avocado Toast",
      description: "Smashed avocado on toasted sourdough with cherry tomatoes and poached egg.",
      image: "https://images.unsplash.com/photo-1687276287139-88f7333c8ca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3R8ZW58MXx8fHwxNzYxOTE5ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "15 min",
      servings: "2 servings",
    },
    {
      id: "berry-smoothie-bowl",
      title: "Berry Smoothie Bowl",
      description: "Thick berry smoothie topped with granola, seeds, and fresh fruit.",
      image: "https://images.unsplash.com/photo-1665833876953-9aa02c235d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBzbW9vdGhpZXxlbnwxfHx8fDE3NjE5NTUzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "10 min",
      servings: "2 servings",
    },
  ];

  return (
    <ListingPageLayout
      title="Breakfast"
      description="Start your day right with these delicious breakfast recipes from quick weekday options to leisurely weekend brunches."
      breadcrumbItems={[
        { label: "Recipes", href: "/recipes" },
        { label: "Breakfast" },
      ]}
      items={breakfasts}
      renderItem={(recipe, index) => <RecipeCard key={index} {...recipe} />}
      itemsPerPage={10}
    />
  );
}
