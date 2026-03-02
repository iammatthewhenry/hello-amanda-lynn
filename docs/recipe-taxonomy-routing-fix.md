/**
 * RECIPE TAXONOMY ROUTING FIX - IMPLEMENTATION SUMMARY
 * =====================================================
 * 
 * Date: March 1, 2026
 * Issue: Recipe dish taxonomy URLs were using /category/{slug} instead of /recipes/{slug}
 * Root Cause: FRONTEND - Incorrect URL generation and missing unified routing logic
 * 
 * =====================================================
 * 1. ROOT CAUSE ANALYSIS
 * =====================================================
 * 
 * DIAGNOSIS: Frontend Issue
 * - GraphQL queries were correct (using taxQuery with taxonomy: DISH)
 * - WordPress configuration was correct (dishes taxonomy exposed to GraphQL)
 * - Problem was in URL generation - using /category/{slug} instead of /recipes/{slug}
 * - Dynamic route at /recipes/[slug]/ only handled recipe posts, not dish taxonomy
 * 
 * =====================================================
 * 2. FILES MODIFIED
 * =====================================================
 * 
 * ✅ NEW FILES CREATED:
 * 
 * • lib/routes.ts
 *   - Centralized URL generation utilities
 *   - Single source of truth for all route patterns
 *   - Provides: getRecipePostUrl(), getRecipeDishUrl(), etc.
 *   - Prevents URL inconsistencies across the application
 * 
 * • lib/verify-wordpress-dishes.ts
 *   - WordPress taxonomy verification utility
 *   - Diagnoses WordPress/WPGraphQL configuration issues
 *   - Checks: dish terms exist, post counts, relationships
 *   - Usage: Import and call from server component for diagnostics
 * 
 * • docs/recipe-taxonomy-routing-fix.md (this file)
 *   - Complete implementation documentation
 *   - Troubleshooting guide
 *   - Testing checklist
 * 
 * ✅ FILES UPDATED:
 * 
 * • app/recipes/[slug]/page.tsx
 *   - NOW HANDLES: Both recipe posts AND dish taxonomy archives
 *   - ROUTING LOGIC: 
 *     1. Try to fetch as recipe post
 *     2. If not found, try to fetch as dish taxonomy term
 *     3. If neither, fall back to local data
 *     4. If still not found, return 404
 *   - Added comprehensive server-side debug logging
 *   - generateStaticParams() now includes both recipe slugs and dish term slugs
 *   - generateMetadata() handles both content types
 * 
 * • lib/data/recipeCategories.ts
 *   - Updated mapDishTermToCategory() to use getRecipeDishUrl()
 *   - Changed all hardcoded category URLs from /category/{slug} to /recipes/{slug}
 *   - Now imports route helper: import { getRecipeDishUrl } from '@/lib/routes'
 * 
 * • lib/api/homepage.ts
 *   - Updated getCategories() to use getRecipeDishUrl()
 *   - Now imports: import { getRecipeDishUrl } from '@/lib/routes'
 *   - Category links now point to /recipes/{slug}
 * 
 * • app/sitemap.ts
 *   - Updated dish taxonomy URLs from /category/{slug} to /recipes/{slug}
 *   - Now generates correct SEO sitemap entries
 * 
 * ⚠️  FILES DEPRECATED (Not Deleted):
 * 
 * • app/category/[slug]/page.tsx
 *   - This route is now UNUSED
 *   - Functionality moved to app/recipes/[slug]/page.tsx
 *   - Safe to delete, but left in place to prevent build errors
 *   - No links in the app point here anymore
 * 
 * =====================================================
 * 3. UPDATED ROUTE STRUCTURE
 * =====================================================
 * 
 * BEFORE:
 * -------
 * /recipes/{recipe-slug}           → Individual recipe posts only
 * /category/{dish-slug}            → Dish taxonomy archives
 * 
 * AFTER:
 * ------
 * /recipes/{slug}                  → UNIFIED ROUTE that handles:
 *                                     - Individual recipe posts (e.g., fluffy-pancakes)
 *                                     - Dish taxonomy archives (e.g., appetizers)
 * 
 * ROUTE PRECEDENCE (Next.js):
 * ---------------------------
 * 1. Static routes (highest)       → /recipes/breakfast/page.tsx (if exists)
 * 2. Dynamic routes                → /recipes/[slug]/page.tsx (catches everything else)
 * 
 * NOTE: Static recipe category pages (breakfast, dinners, etc.) still exist
 * at /recipes/{category}/page.tsx and take precedence. These can be removed
 * later once WordPress data is confirmed working for all categories.
 * 
 * =====================================================
 * 4. URL EXAMPLES
 * =====================================================
 * 
 * Recipe Posts:
 * -------------
 * /recipes/fluffy-pancakes         → Individual recipe (from WordPress or fallback)
 * /recipes/chocolate-cake          → Individual recipe
 * 
 * Dish Taxonomy Archives:
 * -----------------------
 * /recipes/appetizers              → All recipes tagged with "appetizers" dish
 * /recipes/desserts                → All recipes tagged with "desserts" dish
 * /recipes/breakfast               → All recipes tagged with "breakfast" dish
 * 
 * Main Listing:
 * -------------
 * /recipes                         → Browse by category grid (all dish terms)
 * 
 * =====================================================
 * 5. DEBUG LOGGING
 * =====================================================
 * 
 * Server-side logs are now added to /recipes/[slug]/page.tsx:
 * 
 * When you visit a recipe/dish URL, check your terminal/logs for:
 * 
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * [Recipe Route] Processing slug: "appetizers"
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * [Recipe Route] → Attempting to fetch as recipe post...
 * [Recipe Route] ✗ Not found as recipe post
 * [Recipe Route] → Attempting to fetch as dish taxonomy term...
 * [Recipe Route] GraphQL Response: { hasData: true, recipesCount: 5 }
 * [Recipe Route] ✓ SUCCESS: Found 5 recipes for dish "appetizers"
 * [Recipe Route] → Rendering RecipeListingPage component
 * [Recipe Route] First 3 recipes: ['Bruschetta', 'Spring Rolls', ...]
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * 
 * DIAGNOSIS IN LOGS:
 * 
 * If GraphQL returns 0 posts:
 * ⚠️  DIAGNOSIS: WordPress Issue
 *    - Check WordPress admin: are recipes tagged with this dish?
 *    - Verify taxonomy "dishes" is properly registered
 * 
 * If GraphQL returns null:
 * ⚠️  DIAGNOSIS: GraphQL Connection Issue
 *    - WordPress GraphQL endpoint may be unreachable
 *    - Check WORDPRESS_GRAPHQL_ENDPOINT configuration
 * 
 * If query errors:
 * ⚠️  DIAGNOSIS: GraphQL Query Error
 *    - Check if query syntax is correct
 *    - Verify taxonomy enum name (should be DISH)
 * 
 * =====================================================
 * 6. VERIFICATION STEPS
 * =====================================================
 * 
 * Run the verification utility to diagnose WordPress configuration:
 * 
 * ```typescript
 * import { verifyWordPressDishes } from '@/lib/verify-wordpress-dishes';
 * 
 * // In a server component or API route:
 * const result = await verifyWordPressDishes();
 * ```
 * 
 * This will log:
 * - All dish taxonomy terms in WordPress
 * - Post count for each term
 * - Example recipes with their dish assignments
 * - Issues and recommendations if problems found
 * 
 * =====================================================
 * 7. TESTING CHECKLIST
 * =====================================================
 * 
 * ✅ Test dish taxonomy archives:
 *    □ Visit /recipes/appetizers
 *    □ Visit /recipes/desserts  
 *    □ Visit /recipes/breakfast
 *    → Should display recipes filtered by that dish
 * 
 * ✅ Test individual recipe posts:
 *    □ Visit /recipes/fluffy-pancakes (or any recipe slug)
 *    → Should display recipe detail page
 * 
 * ✅ Test fallback behavior:
 *    □ Visit /recipes/nonexistent-dish
 *    → Should show 404
 * 
 * ✅ Test static pages still work:
 *    □ Visit /recipes/breakfast (if static page exists)
 *    → Should show static page (takes precedence over dynamic)
 * 
 * ✅ Check server logs:
 *    □ Terminal shows debug output when visiting routes
 *    □ Logs indicate whether data comes from WordPress or fallback
 * 
 * ✅ Verify sitemap:
 *    □ Visit /sitemap.xml
 *    □ Check that dish taxonomy URLs use /recipes/{slug}
 * 
 * ✅ Test recipe category grid:
 *    □ Visit /recipes
 *    □ Click on category cards
 *    → Should navigate to /recipes/{dish} URLs
 * 
 * =====================================================
 * 8. WORDPRESS CONFIGURATION REQUIREMENTS
 * =====================================================
 * 
 * For this routing to work correctly, WordPress must have:
 * 
 * ✅ Taxonomy Registration:
 *    - Taxonomy slug: "dish" (singular)
 *    - Taxonomy plural: "dishes"
 *    - Attached to: "recipes" CPT
 *    - Exposed to GraphQL: true
 *    - GraphQL single name: "dish"
 *    - GraphQL plural name: "dishes"
 * 
 * ✅ Taxonomy Terms Created:
 *    - breakfast, appetizers, dinners, sides, desserts, drinks, holiday, americana
 *    - (or any other dish categories you want)
 * 
 * ✅ Recipes Tagged:
 *    - Each recipe post should be assigned at least one dish term
 *    - Recipes without dish terms won't appear in taxonomy archives
 * 
 * ✅ WPGraphQL Plugin:
 *    - WPGraphQL plugin must be active and configured
 *    - GraphQL endpoint accessible at: {WORDPRESS_URL}/graphql
 * 
 * =====================================================
 * 9. TROUBLESHOOTING
 * =====================================================
 * 
 * PROBLEM: Visiting /recipes/appetizers shows 404
 * SOLUTION:
 *   1. Check server logs for diagnosis
 *   2. Run verification utility: verifyWordPressDishes()
 *   3. Verify recipes are tagged with "appetizers" dish in WordPress admin
 *   4. Check GraphQL query works in GraphiQL:
 *      query {
 *        recipes(where: { taxQuery: { taxArray: [{ taxonomy: DISH, field: SLUG, terms: ["appetizers"] }] } }) {
 *          nodes { title }
 *        }
 *      }
 * 
 * PROBLEM: Individual recipes don't load
 * SOLUTION:
 *   1. Check if RecipePage component is compatible with WordPress data
 *   2. Verify recipe slug exists in WordPress
 *   3. Check fallback local data in data/recipe-data.ts
 * 
 * PROBLEM: Categories link to wrong URLs
 * SOLUTION:
 *   1. Search codebase for any hardcoded "/category/" URLs
 *   2. Update to use getRecipeDishUrl() from lib/routes.ts
 *   3. Rebuild the project: npm run build
 * 
 * PROBLEM: Static pages still showing instead of WordPress data
 * SOLUTION:
 *   1. This is expected - static routes take precedence in Next.js
 *   2. Delete the static page folder (e.g., app/recipes/breakfast/)
 *   3. Dynamic route will then be used for that slug
 * 
 * =====================================================
 * 10. NEXT STEPS
 * =====================================================
 * 
 * Optional improvements for the future:
 * 
 * □ Remove static recipe category pages once WordPress data confirmed working
 * □ Delete app/category/[slug]/ folder completely (currently unused)
 * □ Remove debug logging from production builds
 * □ Add client-side loading states for better UX
 * □ Implement pagination for large taxonomy archives
 * □ Add breadcrumbs showing current dish category
 * □ Cache dish taxonomy queries more aggressively
 * 
 * =====================================================
 * END OF DOCUMENTATION
 * =====================================================
 */
