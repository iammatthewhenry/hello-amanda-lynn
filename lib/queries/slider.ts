/**
 * Slider GraphQL Queries
 * 
 * Queries for fetching homepage slider data from the WordPress Slider Manager plugin.
 */

/**
 * Get slider items from the Slider Manager plugin
 * Returns an array of Post objects (any CPT) that are currently active/scheduled
 */
export const GET_SLIDER_ITEMS = `
  query GetSliderItems {
    sliderManager {
      databaseId
      title
      slug
      excerpt
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      contentType {
        node {
          name
        }
      }
    }
  }
`;
