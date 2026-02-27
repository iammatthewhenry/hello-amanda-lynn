import { fetchGraphQL } from '@/lib/wordpress';
import { SLIDER_MANAGER_QUERY } from '@/lib/queries/slider';
import type { HeroSlide } from '@/components/hero-slider';

export async function getSliderManagerSlides(): Promise<HeroSlide[]> {
  try {
    const data = await fetchGraphQL<{ sliderManager: any[] }>(
      SLIDER_MANAGER_QUERY,
      {},
      300
    );

    if (!data?.sliderManager || data.sliderManager.length === 0) {
      return [];
    }

    return data.sliderManager.map((s:any) => ({
      id: String(s.id),
      image: s.featuredImage?.node?.sourceUrl || '',
      alt: s.featuredImage?.node?.altText || s.title,
      category: 'FEATURED',
      title: s.title,
      description: s.description,
      link: s.link,
    }));

  } catch (err) {
    console.error('Slider fetch failed:', err);
    return [];
  }
}