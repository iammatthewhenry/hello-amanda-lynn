'use client';

import { RecipeCard } from "@/components/RecipeCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";

export default function DinnersPage() {
  const dinners = [
    {
      id: "pan-seared-steak",
      title: "Pan-Seared Steak",
      description: "Perfectly cooked ribeye steak with herb butter and roasted vegetables.",
      image: "https://images.unsplash.com/photo-1706650616334-97875fae8521?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhayUyMGRpbm5lcnxlbnwxfHx8fDE3NjE5NTQzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "45 min",
      servings: "4 servings",
    },
    {
      id: "herb-roasted-chicken",
      title: "Herb Roasted Chicken",
      description: "Juicy whole chicken roasted with rosemary, thyme, and garlic.",
      image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2FzdGVkJTIwY2hpY2tlbnxlbnwxfHx8fDE3NjE4NDExOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "1 hour 30 min",
      servings: "6 servings",
    },
    {
      id: "grilled-salmon",
      title: "Grilled Salmon",
      description: "Flaky salmon fillet with lemon dill sauce and asparagus.",
      image: "https://images.unsplash.com/photo-1560717845-968823efbee1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxtb24lMjBkaW5uZXJ8ZW58MXx8fHwxNzYxODc3MDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "35 min",
      servings: "4 servings",
    },
    {
      id: "classic-lasagna",
      title: "Classic Lasagna",
      description: "Layers of pasta, meat sauce, ricotta, and melted cheese.",
      image: "https://images.unsplash.com/photo-1619895092538-128341789043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXNhZ25hJTIwZGlubmVyfGVufDF8fHx8MTc2MTk1NTE1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      time: "1 hour 15 min",
      servings: "8 servings",
    },
    {
      id: "street-tacos",
      title: "Street Tacos",
      description: "Authentic tacos with seasoned meat, fresh cilantro, and lime.",
      image: "https://images.unsplash.com/photo-1689774329109-9b70beeefc0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvcyUyMGRpbm5lcnxlbnwxfHx8fDE3NjE5Mzc0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "40 min",
      servings: "6 servings",
    },
    {
      id: "hearty-beef-stew",
      title: "Hearty Beef Stew",
      description: "Slow-cooked beef with carrots, potatoes, and rich gravy.",
      image: "https://images.unsplash.com/photo-1664741662725-bd131742b7b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc3Rld3xlbnwxfHx8fDE3NjE4NDc1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "2 hours 30 min",
      servings: "6 servings",
    },
  ];

  return (
    <ListingPageLayout
      title="Dinners"
      description="Delicious dinner recipes for every night of the week. From quick weeknight meals to special occasion dishes that will impress your guests."
      breadcrumbItems={[
        { label: "Recipes", href: "/recipes" },
        { label: "Dinners" },
      ]}
      items={dinners}
      renderItem={(recipe, index) => <RecipeCard key={index} {...recipe} />}
      itemsPerPage={10}
    />
  );
}
