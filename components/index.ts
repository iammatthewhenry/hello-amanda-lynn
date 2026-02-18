// ===================================================================
// COMPONENTS INDEX - Clean exports for all components
// ===================================================================

// Layout Components
export { default as Header } from './Header';
export { default as Footer } from './Footer';

// Hero & Featured
export { Hero } from './Hero';
export type { HeroSlide } from './Hero';

// Cards & Grid
export { CategoryCard, CategoryGrid } from './CategoryCard';
export { BlogPostCard } from './BlogPostCard';
export { RecipeCard } from './RecipeCard';
export { PollCard } from './PollCard';

// Social & Sharing
export { 
  SocialIconButton, 
  SocialIconsRow, 
  getSocialIcon,
  DEFAULT_SOCIAL_LINKS,
} from './SocialIcons';
export type { SocialPlatform, SocialLink } from './SocialIcons';
export { ShareBar } from './ShareBar';

// Sections
export { AboutSection } from './AboutSection';
export { BrowseByCategorySection } from './BrowseByCategorySection';
export { ShopSection } from './ShopSection';
export type { ShopItem } from './ShopSection';
export { TopFive } from './TopFive';
export type { TopFiveItem, TopFiveData } from './TopFive';
export { SeenOnBox } from './SeenOnBox';

// Poll Components
export { Poll } from './Poll';
export type { PollItem } from './Poll';
export { PollResults } from './PollResults';
export type { PollResultItem } from './PollResults';

// Templates & Layouts
export { BlogPostTemplate } from './BlogPostTemplate';
export { RecipePageTemplate } from './recipe-page-template;
export { ListingPageLayout } from './ListingPageLayout';

// Navigation & UI
export { Pagination } from './Pagination';
export { SearchOverlay } from './SearchOverlay';
export type { SearchItem } from './SearchOverlay';
export { Breadcrumbs } from './Breadcrumbs';

// Photo Components
export { FramedPhoto } from './FramedPhoto';
export { TiltedPhoto } from './TiltedPhoto';

// UI Components (micro items only)
// Note: Most UI components have been moved to main components folder
// Only basic micro components remain in ./ui
