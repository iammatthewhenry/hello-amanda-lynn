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
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&auto=format&fit=crop',
    alt: 'Delicious homemade pasta dish',
    category: 'FEATURED RECIPE',
    title: 'Fresh Homemade Pasta',
    description:
      'Learn the art of making authentic Italian pasta from scratch with simple ingredients.',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1600&auto=format&fit=crop',
    alt: 'Beautiful breakfast spread',
    category: 'BREAKFAST IDEAS',
    title: 'Weekend Brunch Favorites',
    description:
      'Start your morning right with these delicious and easy breakfast recipes.',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1600&auto=format&fit=crop',
    alt: 'Fresh pizza from the oven',
    category: 'DINNER INSPIRATION',
    title: 'Homemade Pizza Night',
    description:
      'Create restaurant-quality pizza at home with our foolproof dough recipe.',
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
    <section className="relative w-full">
      {/* IMAGE LAYER */}
      <div className="relative h-[360px] sm:h-[440px] lg:h-[520px] xl:h-[600px] w-full">
        <Image
          src={slide.image}
          alt={slide.alt}
          fill
          priority={currentSlide === 0}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* CONTENT OVERLAY */}
      <div className="absolute inset-0 flex items-center">
        <div className="page-container w-full flex justify-end">
          <Card className="max-w-md p-8 lg:p-10 shadow-card bg-white">
            <p className="text-sm tracking-widest text-green font-semibold mb-3">
              {slide.category}
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-base leading-relaxed">{slide.description}</p>
          </Card>
        </div>
      </div>

      {/* CONTROLS */}
      {showControls && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </section>
  );
}
