'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop',
    alt: 'Delicious homemade pasta dish',
    category: 'FEATURED RECIPE',
    title: 'Fresh Homemade Pasta',
    description:
      'Learn the art of making authentic Italian pasta from scratch with simple ingredients.',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1600&auto=format&fit=crop',
    alt: 'Beautiful breakfast spread',
    category: 'BREAKFAST IDEAS',
    title: 'Weekend Brunch Favorites',
    description:
      'Start your morning right with these delicious and easy breakfast recipes.',
  },
];

const DEFAULT_AUTO_PLAY_DELAY = 5000;

// ===================================================================
// HERO
// ===================================================================
export function Hero({
  slides = DEFAULT_SLIDES,
  autoPlayDelay = DEFAULT_AUTO_PLAY_DELAY,
  showControls = true,
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % slides.length),
    [slides.length]
  );

  const prevSlide = useCallback(
    () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(nextSlide, autoPlayDelay);
    return () => clearInterval(timer);
  }, [nextSlide, slides.length, autoPlayDelay]);

  const slide = slides[currentSlide];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div className="relative h-[420px] sm:h-[480px] lg:h-[560px] xl:h-[620px]">
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center lg:justify-end">
            {/* PHOTO FRAME */}
            <div className="bg-white p-3 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
              <div className="bg-white border border-neutral-200">
                <div className="p-6 sm:p-8 lg:p-10 max-w-xl">
                  <p className="text-xs tracking-[0.25em] text-green font-semibold mb-3">
                    {slide.category}
                  </p>

                  <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
                    {slide.title}
                  </h1>

                  <p className="text-base leading-relaxed text-neutral-700">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
            {/* END FRAME */}
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition"
            aria-label="Next slide"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </section>
  );
}
