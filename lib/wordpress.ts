/**
 * WordPress GraphQL Client
 * 
 * Provides a reusable function for fetching data from the headless WordPress backend
 * using WPGraphQL. Supports Next.js ISR with configurable revalidation.
 */

const WORDPRESS_GRAPHQL_ENDPOINT = 'https://recipes.helloamandalynn.com/graphql';

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
 * @param revalidate - Next.js revalidation time in seconds (default: 3600 = 1 hour)
 * @returns Typed response data
 * @throws Error if the request fails or GraphQL returns errors
 */
export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>,
  revalidate: number = 3600
): Promise<T> {
  try {
    const response = await fetch(WORDPRESS_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: variables || {},
      }),
      next: {
        revalidate,
      },
    });

    if (!response.ok) {
      throw new Error(
        `WordPress GraphQL request failed: ${response.status} ${response.statusText}`
      );
    }

    const json: GraphQLResponse<T> = await response.json();

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors);
      throw new Error(
        `GraphQL query failed: ${json.errors.map((e) => e.message).join(', ')}`
      );
    }

    if (!json.data) {
      throw new Error('GraphQL response contained no data');
    }

    return json.data;
  } catch (error) {
    console.error('Error fetching from WordPress GraphQL:', error);
    throw error;
  }
}
