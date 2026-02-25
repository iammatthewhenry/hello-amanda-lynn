/**
 * GraphQL Fragments
 * 
 * Reusable GraphQL fragments for common data shapes.
 * These can be embedded in larger queries using the spread operator.
 */

export const MEDIA_ITEM_FIELDS = `
  fragment MediaItemFields on MediaItem {
    sourceUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`;

export const CATEGORY_FIELDS = `
  fragment CategoryFields on Category {
    id
    databaseId
    name
    slug
    description
    count
  }
`;

export const TAG_FIELDS = `
  fragment TagFields on Tag {
    id
    databaseId
    name
    slug
  }
`;

export const AUTHOR_FIELDS = `
  fragment AuthorFields on User {
    id
    name
    firstName
    lastName
    description
    avatar {
      url
    }
  }
`;

export const POST_CARD_FIELDS = `
  ${MEDIA_ITEM_FIELDS}
  ${CATEGORY_FIELDS}
  
  fragment PostCardFields on Post {
    id
    databaseId
    title
    slug
    date
    excerpt
    featuredImage {
      node {
        ...MediaItemFields
      }
    }
    categories {
      nodes {
        ...CategoryFields
      }
    }
  }
`;

export const POST_FULL_FIELDS = `
  ${MEDIA_ITEM_FIELDS}
  ${CATEGORY_FIELDS}
  ${TAG_FIELDS}
  ${AUTHOR_FIELDS}
  
  fragment PostFullFields on Post {
    id
    databaseId
    title
    slug
    date
    modified
    excerpt
    content
    featuredImage {
      node {
        ...MediaItemFields
      }
    }
    categories {
      nodes {
        ...CategoryFields
      }
    }
    tags {
      nodes {
        ...TagFields
      }
    }
    author {
      node {
        ...AuthorFields
      }
    }
  }
`;

export const PAGE_FIELDS = `
  ${MEDIA_ITEM_FIELDS}
  
  fragment PageFields on Page {
    id
    databaseId
    title
    slug
    content
    excerpt
    featuredImage {
      node {
        ...MediaItemFields
      }
    }
  }
`;
