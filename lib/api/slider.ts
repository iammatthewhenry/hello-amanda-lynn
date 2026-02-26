import { fetchGraphQL } from '@/lib/wordpress';
import type { HeroSlide } from '@/components/hero-slider';

const SLIDER_QUERY = `
query GetSlider {
  sliderManager {
    id
    title
    image
    description
    link
  }
}
`;

export async function getSliderManagerSlides(): Promise<HeroSlide[]> {
  try {
    const data = await fetchGraphQL<{ sliderManager: any[] }>(
      SLIDER_QUERY,
      {},
      300
    );

    if (!data?.sliderManager || data.sliderManager.length === 0) {
      return [];
    }

    return data.sliderManager.map((s: any) => ({
      id: String(s.id),
      image: s.image,
      alt: s.title,
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