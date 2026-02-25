/**
 * As Seen On Logos GraphQL Query
 * 
 * Fetches logos from the WordPress "Hello Amanda Lynn - As Seen On" plugin
 * exposed via WPGraphQL at the root field asSeenOnLogos.
 */

export const GET_AS_SEEN_ON_LOGOS = `
  query GetAsSeenOnLogos {
    asSeenOnLogos {
      name
      imageUrl
      altText
      link
    }
  }
`;
