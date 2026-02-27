export const SLIDER_MANAGER_QUERY = `
query GetSlider {
  sliderManager {
    id
    title
    featuredImage {
      node {
        sourceUrl
        altText
      }
    }
    description
    link
  }
}
`;