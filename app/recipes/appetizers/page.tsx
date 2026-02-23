import type { Metadata } from 'next';
import { PageHeader } from "@/components";
// Add other imports as needed

export const metadata: Metadata = {
  title: 'Appetizer Recipes',
  description: 'Easy and impressive appetizer recipes from Amanda Lynn — perfect starters for parties, gatherings, and entertaining.',
};

export default function AppetizersPage() {
  return (
    <main className="pt-6 sm:pt-8">
      <PageHeader 
        title="Appetizers"
        description="Start your meal with these delicious appetizer recipes"
      />

      {/* Your existing content goes here */}
    </main>
  );
}
