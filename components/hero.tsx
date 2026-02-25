import { HeroSlider } from './hero-slider';
import { getSliderManagerSlides } from '@/lib/api/slider';

/**
 * Hero - Server Component
 * 
 * Fetches slider data from WordPress and passes to HeroSlider client component.
 * Falls back to HeroSlider defaults if no slides are configured.
 */
export async function Hero() {
  const slides = await getSliderManagerSlides();
  
  return <HeroSlider slides={slides.length > 0 ? slides : undefined} />;
}
