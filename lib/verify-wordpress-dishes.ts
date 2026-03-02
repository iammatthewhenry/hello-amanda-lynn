/**
 * WordPress Taxonomy Verification Utility
 * 
 * Run this temporarily to diagnose WordPress/WPGraphQL configuration issues.
 * 
 * This script verifies:
 * 1. Dish taxonomy terms exist in WordPress
 * 2. Each term has the correct post count
 * 3. GraphQL relationships are properly configured
 * 
 * Usage:
 *   Import and call from a server component or API route to see diagnostic output
 */

import { fetchGraphQL } from '@/lib/wordpress';
import type { WPGraphQLConnection, WPDishTerm } from '@/lib/types/wordpress';

/**
 * Verification query that fetches dish terms with their post counts
 */
const VERIFY_DISHES_QUERY = `
  query VerifyDishTerms {
    dishes(first: 100, where: { orderby: NAME, order: ASC }) {
      nodes {
        id
        databaseId
        name
        slug
        description
        count
      }
    }
  }
`;

/**
 * Verification query that fetches recipes and their dish relationships
 */
const VERIFY_RECIPES_WITH_DISHES_QUERY = `
  query VerifyRecipesWithDishes($first: Int = 50) {
    recipes(first: $first, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        databaseId
        title
        slug
        dishes {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

interface VerificationResult {
  success: boolean;
  dishTerms: WPDishTerm[];
  issues: string[];
  recommendations: string[];
}

/**
 * Verify WordPress dish taxonomy configuration
 * Logs detailed diagnostic information to the console
 */
export async function verifyWordPressDishes(): Promise<VerificationResult> {
  const issues: string[] = [];
  const recommendations: string[] = [];
  let dishTerms: WPDishTerm[] = [];

  console.log('\n📋 WORDPRESS TAXONOMY VERIFICATION');
  console.log('═══════════════════════════════════════════════════════════\n');

  // Step 1: Verify dish terms exist
  try {
    console.log('1️⃣  Fetching dish taxonomy terms...');
    const data = await fetchGraphQL<{ dishes: WPGraphQLConnection<WPDishTerm> }>(
      VERIFY_DISHES_QUERY,
      {},
      0 // No caching for verification
    );

    if (!data || !data.dishes) {
      issues.push('GraphQL query for dishes returned null');
      recommendations.push('Check WordPress GraphQL endpoint connectivity');
      recommendations.push('Verify WPGraphQL plugin is active');
      console.log('   ❌ FAILED: No data returned\n');
    } else {
      dishTerms = data.dishes.nodes || [];
      console.log(`   ✓ Found ${dishTerms.length} dish terms\n`);

      if (dishTerms.length === 0) {
        issues.push('No dish terms found in WordPress');
        recommendations.push('Create dish taxonomy terms in WordPress admin');
        recommendations.push('Common terms: breakfast, appetizers, dinners, sides, desserts, drinks');
      } else {
        console.log('   📊 Dish Terms Detail:');
        console.log('   ─────────────────────────────────────────────────────');
        dishTerms.forEach((term) => {
          const countDisplay = term.count !== undefined ? term.count : 'N/A';
          console.log(`   • ${term.name.padEnd(20)} (${term.slug})`);
          console.log(`     Post count: ${countDisplay}`);
          
          if (term.count === 0) {
            issues.push(`Dish term "${term.name}" has 0 posts assigned`);
          }
        });
        console.log('   ─────────────────────────────────────────────────────\n');
      }
    }
  } catch (error) {
    issues.push(`Error fetching dish terms: ${error}`);
    recommendations.push('Check GraphQL query syntax');
    recommendations.push('Verify taxonomy is exposed to GraphQL with correct naming');
    console.log(`   ❌ ERROR: ${error}\n`);
  }

  // Step 2: Verify recipes have dish relationships
  try {
    console.log('2️⃣  Verifying recipe → dish relationships...');
    const data = await fetchGraphQL<{ recipes: WPGraphQLConnection<any> }>(
      VERIFY_RECIPES_WITH_DISHES_QUERY,
      { first: 50 },
      0 // No caching
    );

    if (!data || !data.recipes) {
      issues.push('Could not fetch recipes for relationship verification');
      console.log('   ❌ FAILED: No recipe data returned\n');
    } else {
      const recipes = data.recipes.nodes || [];
      console.log(`   ✓ Fetched ${recipes.length} recipes\n`);

      let recipesWithDishes = 0;
      let recipesWithoutDishes = 0;
      const exampleRecipes: any[] = [];

      recipes.forEach((recipe) => {
        const hasDishes = recipe.dishes?.nodes && recipe.dishes.nodes.length > 0;
        if (hasDishes) {
          recipesWithDishes++;
          if (exampleRecipes.length < 5) {
            exampleRecipes.push(recipe);
          }
        } else {
          recipesWithoutDishes++;
        }
      });

      console.log('   📊 Relationship Statistics:');
      console.log('   ─────────────────────────────────────────────────────');
      console.log(`   Recipes with dishes assigned: ${recipesWithDishes}`);
      console.log(`   Recipes without dishes:       ${recipesWithoutDishes}`);
      console.log('   ─────────────────────────────────────────────────────\n');

      if (recipesWithoutDishes > 0) {
        issues.push(`${recipesWithoutDishes} recipes have no dish terms assigned`);
        recommendations.push('Assign dish terms to recipes in WordPress admin');
      }

      if (exampleRecipes.length > 0) {
        console.log('   📝 Example Recipes with Dishes:');
        console.log('   ─────────────────────────────────────────────────────');
        exampleRecipes.forEach((recipe) => {
          const dishNames = recipe.dishes.nodes.map((d: any) => d.name).join(', ');
          console.log(`   • ${recipe.title}`);
          console.log(`     Dishes: ${dishNames}`);
        });
        console.log('   ─────────────────────────────────────────────────────\n');
      }
    }
  } catch (error) {
    issues.push(`Error verifying recipe relationships: ${error}`);
    console.log(`   ❌ ERROR: ${error}\n`);
  }

  // Final report
  console.log('═══════════════════════════════════════════════════════════');
  if (issues.length === 0) {
    console.log('✅ VERIFICATION PASSED');
    console.log('   All checks completed successfully.');
    console.log('   WordPress dish taxonomy is properly configured.\n');
    return { success: true, dishTerms, issues: [], recommendations: [] };
  } else {
    console.log('❌ VERIFICATION FAILED');
    console.log(`   ${issues.length} issue(s) found:\n`);
    issues.forEach((issue, i) => {
      console.log(`   ${i + 1}. ${issue}`);
    });
    console.log('\n💡 RECOMMENDATIONS:\n');
    recommendations.forEach((rec, i) => {
      console.log(`   ${i + 1}. ${rec}`);
    });
    console.log('\n═══════════════════════════════════════════════════════════\n');
    return { success: false, dishTerms, issues, recommendations };
  }
}
