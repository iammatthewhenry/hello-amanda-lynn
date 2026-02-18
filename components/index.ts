// ===================================================================
// COMPONENTS INDEX - Clean exports for all components
// ===================================================================

// Layout Components
export { default as Header } from './header';
export { default as Footer } from './footer';

// Hero & Featured
export { Hero } from './hero';
export type { HeroSlide } from './hero';

// Cards & Grid
export { CategoryCard, CategoryGrid } from './category-card';
export { BlogPostCard } from './blog-post-card';
export { RecipeCard } from './recipe-card';
export { PollCard } from './poll-card';

// Social & Sharing
export { 
  SocialIconButton, 
  SocialIconsRow, 
  getSocialIcon,
  DEFAULT_SOCIAL_LINKS,
} from './social-icons';
export type { SocialPlatform, SocialLink } from './social-icons';
export { ShareBar } from './share-bar';

// Sections
export { AboutSection } from './about-section';
export { BrowseByCategorySection } from './browse-by-category-section';
export { ShopSection } from './shop-section';
export type { ShopItem } from './shop-section';
export { TopFive } from './top-five';
export type { TopFiveItem, TopFiveData } from './top-five';
export { SeenOnBox } from './seen-on-box';
export { ExploreMore } from './explore-more';

// Poll Components
export { Poll } from './poll';
export type { PollItem } from './poll';
export { PollResults } from './poll-results';
export type { PollResultItem } from './poll-results';

// Templates & Layouts
export { BlogPostTemplate } from './blog-post-template';
export { RecipePageTemplate } from './recipe-page-template';
export { default as RecipePage } from './recipe-page';
export { ListingPageLayout } from './listing-page-layout';
export { SectionPageLayout } from './section-page-layout';

// Navigation & UI
export { Pagination } from './pagination';
export { SearchOverlay } from './search-overlay';
export type { SearchItem } from './search-overlay';
export { Breadcrumbs } from './breadcrumbs';
export { Container } from './container';
export { PageHeader } from './page-header';
export { GridSection } from './grid-section';
export { ContentCard } from './content-card';
export { ViewAllPostsButton } from './view-all-posts-button';

// Photo Components
export { FramedPhoto } from './framed-photo';
export { TiltedPhoto } from './tilted-photo';

// Additional Components  
export { OokHeader } from './ook-header';

// UI Components (micro items only)
// Note: Most UI components have been moved to main components folder
// Only basic micro components remain in ./ui
