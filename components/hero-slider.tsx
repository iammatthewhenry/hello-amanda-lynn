'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

interface HeroSliderProps {
  slides?: HeroSlide[];
  autoPlayDelay?: number;
  showControls?: boolean;
}

// ===================================================================
// FALLBACK SLIDES
// ===================================================================
const FALLBACK_SLIDES: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1636743713732-125909a35dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    alt: 'Fluffy buttermilk pancakes',
    category: 'BREAKFAST FAVORITE',
    title: 'Fluffy Buttermilk Pancakes',
    description: 'Light and fluffy pancakes with maple syrup and fresh berries. The secret to their fluffiness is the buttermilk.',
    link: '/recipes/fluffy-buttermilk-pancakes',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    alt: 'Chocolate chip cookies',
    category: "CHEF'S PICK",
    title: 'Perfect Chocolate Chip Cookies',
    description: 'Crispy edges with a soft, chewy center. These classic cookies are loaded with chocolate chips.',
    link: '/recipes/chocolate-chip-cookies',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1606313564948-b37f0802b5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    alt: 'Classic banana bread',
    category: 'COMFORT BAKING',
    title: 'Classic Banana Bread',
    description: 'Moist and flavorful banana bread perfect for breakfast or an afternoon snack.',
    link: '/recipes/classic-banana-bread',
  },
];

const DEFAULT_AUTO_PLAY_DELAY = 5000;

// ================= CLIENT COMPONENT =================
export function HeroSliderClient({
  slides = FALLBACK_SLIDES,
  autoPlayDelay = DEFAULT_AUTO_PLAY_DELAY,
  showControls = true,
}: HeroSliderProps) {
  const displaySlides = slides && slides.length > 0 ? slides : FALLBACK_SLIDES;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Pause autoplay for 10s when user manually navigates
  const pauseAutoPlay = useCallback(() => {
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index);
      pauseAutoPlay();
    },
    [pauseAutoPlay]
  );

  const nextSlide = useCallback(
    () => goToSlide((currentSlide + 1) % displaySlides.length),
    [currentSlide, displaySlides.length, goToSlide]
  );

  const prevSlide = useCallback(
    () => goToSlide((currentSlide - 1 + displaySlides.length) % displaySlides.length),
    [currentSlide, displaySlides.length, goToSlide]
  );

  useEffect(() => {
    if (!autoPlay || displaySlides.length <= 1) return;
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % displaySlides.length),
      autoPlayDelay
    );
    return () => clearInterval(timer);
  }, [autoPlay, displaySlides.length, autoPlayDelay]);

  const slide = displaySlides[currentSlide];

  return (
    <section className="w-full pt-[37px] pb-2 sm:pt-[61px] sm:pb-4 lg:pt-[69px] lg:pb-6">
      <div className="container-max">
        <div className="relative h-[250px] sm:h-[320px] lg:h-[420px] xl:h-[480px] overflow-hidden cursor-pointer">
          {/* Background image */}
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={currentSlide === 0}
            className="w-full h-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 1280px"
          />
          {/* Text Card Overlay */}
          <div className="absolute inset-y-[63px] sm:inset-y-20 lg:inset-y-[105px] xl:inset-y-[120px] right-4 sm:right-8 lg:right-16 flex items-center pointer-events-none">
            <div className="bg-white p-3 sm:p-6 lg:p-8 xl:p-10 max-w-[384px] sm:max-w-sm lg:max-w-md w-full overflow-hidden" style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}>
              <p className="text-[10px] sm:text-sm tracking-wider mb-1.5 sm:mb-3 text-green overflow-hidden text-ellipsis whitespace-nowrap">
                {slide.category}
              </p>
              <h2 className="mb-2 sm:mb-4 overflow-hidden text-ellipsis line-clamp-2 text-lg sm:text-2xl lg:text-3xl font-bold">
                {slide.title}
              </h2>
              <p className="text-foreground text-[12px] sm:text-base leading-normal sm:leading-normal overflow-hidden line-clamp-3 sm:line-clamp-4">
                {slide.description}
              </p>
              {slide.link && (
                <Link
                  href={slide.link}
                  className="inline-block text-[11px] sm:text-sm font-semibold text-green border border-green px-3 py-1.5 hover:bg-green hover:text-white transition-colors mt-2"
                >
                  View Recipe →
                </Link>
              )}
            </div>
          </div>
          {/* Controls and dots remain unchanged for now */}
          {showControls && displaySlides.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground p-1.5 sm:p-2 shadow-md transition-colors z-10"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-foreground p-1.5 sm:p-2 shadow-md transition-colors z-10"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
                {displaySlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ================= SERVER WRAPPER =================
import React from 'react';

interface ServerHeroProps {
  slides?: HeroSlide[];
  autoPlayDelay?: number;
  showControls?: boolean;
}

const HeroSlider = ({ slides = [], autoPlayDelay, showControls }: ServerHeroProps) => {
  return (
    <HeroSliderClient
      slides={slides}
      autoPlayDelay={autoPlayDelay}
      showControls={showControls}
    />
  );
};

export default HeroSlider;
