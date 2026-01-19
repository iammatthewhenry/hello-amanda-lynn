'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: '1',
    image: '/images/hero/hero-pancakes.jpg',
    alt: 'Fluffy Buttermilk Pancakes',
    category: 'FEATURED RECIPE',
    title: 'Fluffy Buttermilk Pancakes',
    description:
      'Light, airy, and made from scratch — these pancakes are a weekend favorite.',
  },
  {
    id: '2',
    image: '/images/hero/hero-cookies.jpg',
    alt: 'Chocolate Chip Cookies',
    category: 'BAKING FAVORITES',
    title: 'Perfect Chocolate Chip Cookies',
    description:
      'Crispy edges, soft centers, and plenty of chocolate in every bite.',
  },
];

export function Hero({
  slides = DEFAULT_SLIDES,
  autoPlayDelay = 6500,
  showControls = true,
}: HeroProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((i) => (i + 1) % slides.length),
    [slides.length]
  );

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + slides.length) % slides.length),
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, autoPlayDelay);
    return () => clearInterval(timer);
  }, [next, slides.length, autoPlayDelay]);

  return (
    <section className="relative w-full overflow-hidden hero-slider-container">
      {/* Slides */}
      <div className="relative h-[250px] sm:h-[320px] lg:h-[420px] xl:h-[480px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slider-slide transition-opacity duration-[1200ms] ease-in-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === current}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Text Card */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center lg:justify-end">
            <div className="hero-text-card bg-white p-6 sm:p-8 lg:p-10">
              <div className="border border-neutral-200">
                <div className="p-6 sm:p-8 max-w-md">
                  {/* Category */}
                  <p className="text-xs sm:text-sm tracking-[0.3em] text-green font-semibold mb-3">
                    {slides[current].category}
                  </p>

                  {/* Title */}
                  <h1 className="text-3xl sm:text-4xl font-display font-bold leading-tight mb-4">
                    {slides[current].title}
                  </h1>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
                    {slides[current].description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-700 p-2 rounded-full shadow transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-neutral-700 p-2 rounded-full shadow transition"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </section>
  );
}
