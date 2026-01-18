'use client';

import { RecipeCard } from "@/components/RecipeCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";

export default function DrinksPage() {
  const drinks = [
    {
      id: "freshly-squeezed-lemonade",
      title: "Freshly Squeezed Lemonade",
      description: "Classic homemade lemonade with fresh lemons and mint.",
      image: "https://images.unsplash.com/photo-1660664361474-ed33e0b1b05c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbmFkZSUyMGRyaW5rfGVufDF8fHx8MTc2MTk1NTE1MXww&ixlib=rb-4.1.0&q=80&w=1080",
      time: "10 min",
      servings: "4 servings",
    },
    {
      id: "berry-smoothie",
      title: "Berry Smoothie Bowl",
      description: "Nutrient-packed smoothie with fresh berries and superfoods.",
      image: "https://images.unsplash.com/photo-1563282396-c299392870cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGRyaW5rfGVufDF8fHx8MTc2MTk1NTE1OXww&ixlib=rb-4.1.0&q=80&w=1080",
      time: "5 min",
      servings: "1 serving",
    },
    {
      id: "artisan-coffee-latte",
      title: "Artisan Coffee Latte",
      description: "Perfect espresso with steamed milk and beautiful latte art.",
      image: "https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXR0ZXxlbnwxfHx8fDE3NjE5MzIyNjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "8 min",
      servings: "1 serving",
    },
    {
      id: "fresh-lemonade",
      title: "Fresh Lemonade",
      description: "Classic homemade lemonade with fresh squeezed lemons.",
      image: "https://images.unsplash.com/photo-1573500883698-e3ef47a95feb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbmFkZSUyMGRyaW5rfGVufDF8fHx8MTc2MTk1NTE2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      time: "15 min",
      servings: "6 servings",
    },
    {
      id: "peach-iced-tea",
      title: "Peach Iced Tea",
      description: "Refreshing sweet tea infused with fresh peaches.",
      image: "https://images.unsplash.com/photo-1499638673689-79a0b5115d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwdGVhfGVufDF8fHx8MTc2MTk1NTE2MHww&ixlib=rb-4.1.0&q=80&w=1080",
      time: "20 min + chill time",
      servings: "8 servings",
    },
    {
      id: "strawberry-milkshake",
      title: "Strawberry Milkshake",
      description: "Creamy milkshake made with fresh strawberries and vanilla ice cream.",
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWxrc2hha2V8ZW58MXx8fHwxNzYxOTU1MTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "5 min",
      servings: "2 servings",
    },
  ];

  return (
    <ListingPageLayout
      title="Drinks"
      description="Refreshing beverages for every occasion. From morning coffee to evening cocktails, discover drinks that complement any meal or moment."
      breadcrumbItems={[
        { label: "Recipes", href: "/recipes" },
        { label: "Drinks" },
      ]}
      items={drinks}
      renderItem={(recipe, index) => <RecipeCard key={index} {...recipe} />}
      itemsPerPage={10}
    />
  );
}
