'use client';

import { RecipeCard } from "@/components/RecipeCard";
import { ListingPageLayout } from "@/components/ListingPageLayout";

export default function DessertsPage() {
  const desserts = [
    {
      id: "rich-chocolate-cake",
      title: "Rich Chocolate Cake",
      description: "Decadent multi-layer chocolate cake with smooth ganache frosting.",
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDF8fHx8MTc2MTkxNzc3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      time: "1 hour 30 min",
      servings: "12 servings",
    },
    {
      id: "fresh-fruit-tart",
      title: "Fresh Fruit Tart",
      description: "Buttery tart shell filled with vanilla cream and seasonal fruits.",
      image: "https://images.unsplash.com/photo-1670819916757-e8d5935a6c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcnVpdCUyMHRhcnR8ZW58MXx8fHwxNzYxOTU1MTU1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "1 hour",
      servings: "8 servings",
    },
    {
      id: "classic-tiramisu",
      title: "Classic Tiramisu",
      description: "Italian coffee-soaked dessert with mascarpone and cocoa.",
      image: "https://images.unsplash.com/photo-1714385905983-6f8e06fffae1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aXJhbWlzdSUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxODg2OTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "30 min + chill time",
      servings: "8 servings",
    },
    {
      id: "creme-brulee",
      title: "Crème Brûlée",
      description: "Silky vanilla custard topped with caramelized sugar crust.",
      image: "https://images.unsplash.com/photo-1676300184943-09b2a08319a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVtZSUyMGJydWxlZXxlbnwxfHx8fDE3NjE5NTUxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "50 min + chill time",
      servings: "6 servings",
    },
    {
      id: "artisan-ice-cream",
      title: "Artisan Ice Cream",
      description: "Homemade ice cream in classic and creative flavors.",
      image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbXxlbnwxfHx8fDE3NjE5MDg0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "40 min + freeze time",
      servings: "8 servings",
    },
    {
      id: "french-macarons",
      title: "French Macarons",
      description: "Delicate almond meringue cookies with smooth buttercream filling.",
      image: "https://images.unsplash.com/photo-1580421383318-f87fc861a696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNhcm9ucyUyMGRlc3NlcnR8ZW58MXx8fHwxNzYxOTU1MTE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      time: "2 hours",
      servings: "24 cookies",
    },
  ];

  return (
    <ListingPageLayout
      title="Desserts"
      description="Sweet treats and delicious desserts to satisfy your cravings. From simple cookies to show-stopping cakes, find your next favorite dessert."
      breadcrumbItems={[
        { label: "Recipes", href: "/recipes" },
        { label: "Desserts" },
      ]}
      items={desserts}
      renderItem={(recipe, index) => <RecipeCard key={index} {...recipe} />}
      itemsPerPage={10}
    />
  );
}
