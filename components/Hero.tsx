'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from './ui';

// ===================================================================
// TYPES
// ===================================================================
export interface HeroSlide {
  id: string;
  image: string;
  alt: string;
  category: string;
  title: string;
  description: string;
  link?: string;
}

interface HeroProps {
  slides?: HeroSlide[];
  autoPlayDelay?: number;
  showControls?: boolean;
}

// ===================================================================
// DEFAULT SLIDES
// ===================================================================
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1636743713732-125909a35dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    alt: 'Fluffy buttermilk pancakes',
    category: 'BREAKFAST FAVORITE',
    title: 'Fluffy Buttermilk Pancakes',
    description: 'Light and fluffy pancakes with maple syrup and fresh berries. The secret to their fluffiness is the buttermilk.',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    alt: 'Chocolate chip cookies',
    category: "CHEF'S PICK",
    title: 'Perfect Chocolate Chip Cookies',
    description: 'Crispy edges with a soft, chewy center. These classic cookies are loaded with chocolate chips.',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1606313564948-b37f0802b5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    alt: 'Classic banana bread',
    category: 'COMFORT BAKING',
    title: 'Classic Banana Bread',
    description: 'Moist and flavorful banana bread perfect for breakfast or an afternoon snack.',
  },
];

const DEFAULT_AUTO_PLAY_DELAY = 5000;

// ===================================================================
// HERO (FIGMA-ACCURATE)
// ===================================================================
export function Hero({
  slides = DEFAULT_SLIDES,
  autoPlayDelay = DEFAULT_AUTO_PLAY_DELAY,
  showControls = true,
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  }, []);

  const nextSlide = useCallback(
    () => goToSlide((currentSlide + 1) % slides.length),
    [currentSlide, slides.length, goToSlide]
  );

  const prevSlide = useCallback(
    () => goToSlide((currentSlide - 1 + slides.length) % slides.length),
    [currentSlide, slides.length, goToSlide]
  );

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      autoPlayDelay
    );
    return () => clearInterval(timer);
  }, [autoPlay, slides.length, autoPlayDelay]);

  const slide = slides[currentSlide];

  return (
    <section className="w-full py-2 sm:py-4 lg:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-[35px]">
        <div className="relative h-[250px] sm:h-[320px] lg:h-[420px] xl:h-[480px] overflow-hidden cursor-pointer">
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={currentSlide === 0}
            className="object-cover"
            sizes="100vw"
          />
          
          {/* Text Card Overlay - positioned to center/right */}
          <div className="absolute inset-0 flex items-center justify-center sm:justify-end px-4 sm:px-8 lg:px-16 pointer-events-none">
            <div 
              className="bg-white p-3 sm:p-6 lg:p-8 xl:p-10 max-w-[384px] sm:max-w-sm lg:max-w-md w-full sm:w-auto" 
              style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}
            >
              <p className="text-[10px] sm:text-sm tracking-wider mb-1.5 sm:mb-3 text-green">
                {slide.category}
              </p>
              <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
                {slide.title}
              </h2>
              <p className="text-foreground text-[12px] sm:text-base leading-normal">
                {slide.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
