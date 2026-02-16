'use client';

 } 
import { PageHeader } from "@/components/PageHeader";
// Add other imports as needed

export default function AppetizersPage() {
  return (
    <>
      {/*  handles container, positioning, and spacing */}
       items={[
        { label: 'Recipes', href: '/recipes' },
        { label: 'Appetizers' }
      ]} />

      <main className="pt-6 sm:pt-8">
        {/* PageHeader now focuses only on title and description */}
        <PageHeader 
          title="Appetizers"
          description="Start your meal with these delicious appetizer recipes"
        />

        {/* Your existing content goes here */}
      </main>
    </>
  );
}
