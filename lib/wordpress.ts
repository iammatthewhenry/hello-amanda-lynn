/**
 * WordPress GraphQL Client
 *
 * Cloudflare Edge–safe version.
 * Never throws during rendering — prevents 404 crashes on Pages/OpenNext.
 * Supports Next.js ISR via `revalidate`.
 */

const WORDPRESS_GRAPHQL_ENDPOINT =
  "https://recipes.helloamandalynn.com/graphql";

interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * Fetch data from WordPress GraphQL endpoint
 *
 * @param query - GraphQL query string
 * @param variables - Optional query variables
 * @param revalidate - ISR cache time (seconds)
 *
 * IMPORTANT:
 * This function NEVER throws.
 * Cloudflare Workers must fail softly or the page returns 404.
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate: number = 3600
): Promise<T | null> {
  try {
    const response = await fetch(WORDPRESS_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: variables || {},
      }),
      next: {
        revalidate,
      },
    });

    // ✅ Do NOT throw on HTTP failure (Edge runtime safety)
    if (!response.ok) {
      console.error(
        `WordPress GraphQL request failed: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const json: GraphQLResponse<T> = await response.json();

    // ✅ Do NOT throw on schema/query errors
    if (json.errors && json.errors.length > 0) {
      console.error("GraphQL Errors:", json.errors);
      return null;
    }

    // ✅ Missing data should not crash rendering
    if (!json.data) {
      console.warn("GraphQL response contained no data");
      return null;
    }

    return json.data;
  } catch (error) {
    // ✅ Network / runtime failures must NOT throw on Cloudflare
    console.error("Error fetching from WordPress GraphQL:", error);
    return null;
  }
}