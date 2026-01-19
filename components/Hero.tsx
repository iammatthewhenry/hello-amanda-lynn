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
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80',
    alt: 'Delicious homemade pasta dish',
    category: 'FEATURED RECIPE',
    title: 'Fresh Homemade Pasta',
    description:
      'Learn the art of making authentic Italian pasta from scratch with simple ingredients.',
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=1920&q=80',
    alt: 'Beautiful breakfast spread',
    category: 'BREAKFAST IDEAS',
    title: 'Weekend Brunch Favorites',
    description:
      'Start your morning right with these delicious and easy breakfast recipes.',
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
    <section className="relative w-full overflow-hidden">
      {/* Slides */}
      <div className="relative h-[250px] sm:h-[320px] lg:h-[420px] xl:h-[480px]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
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

      {/* Text card */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white p-4 shadow-card">
              <div className="border border-neutral-200">
                <div className="p-4 sm:p-6 max-w-md">
                  <p className="text-[10px] tracking-[0.25em] text-green font-semibold mb-2">
                    {slides[current].category}
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-display font-bold leading-tight mb-3">
                    {slides[current].title}
                  </h1>

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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-neutral-700 p-2 rounded-full shadow transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-neutral-700 p-2 rounded-full shadow transition"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}
    </section>
  );
}
