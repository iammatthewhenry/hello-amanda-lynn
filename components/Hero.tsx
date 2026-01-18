'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Container, Card } from './ui';

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
// DEFAULT SLIDES - Used when no slides prop provided
// ===================================================================
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop',
    alt: 'Delicious homemade pasta dish',
    category: 'FEATURED RECIPE',
    title: 'Fresh Homemade Pasta',
    description: 'Learn the art of making authentic Italian pasta from scratch with simple ingredients.',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&auto=format&fit=crop',
    alt: 'Beautiful breakfast spread',
    category: 'BREAKFAST IDEAS',
    title: 'Weekend Brunch Favorites',
    description: 'Start your morning right with these delicious and easy breakfast recipes.',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop',
    alt: 'Fresh pizza from the oven',
    category: 'DINNER INSPIRATION',
    title: 'Homemade Pizza Night',
    description: 'Create restaurant-quality pizza at home with our foolproof dough recipe.',
  },
];

const DEFAULT_AUTO_PLAY_DELAY = 5000;

// ===================================================================
// HERO COMPONENT
// ===================================================================
export function Hero({ 
  slides = DEFAULT_SLIDES, 
  autoPlayDelay = DEFAULT_AUTO_PLAY_DELAY,
  showControls = true 
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Navigation handlers
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setAutoPlay(false);
    // Resume autoplay after 10 seconds
    setTimeout(() => setAutoPlay(true), 10000);
  }, []);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  // Auto-play effect
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayDelay);

    return () => clearInterval(timer);
  }, [autoPlay, slides.length, autoPlayDelay]);

  // Empty state
  if (!slides || slides.length === 0) {
    return (
      <section className="w-full py-2 sm:py-4 lg:py-6">
        <Container>
          <div className="h-[250px] sm:h-[320px] lg:h-[420px] bg-muted flex items-center justify-center rounded-lg">
            <p className="text-muted-foreground">No slides available</p>
          </div>
        </Container>
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section className="w-full py-2 sm:py-4 lg:py-6">
      <Container>
        <div className="relative h-[250px] sm:h-[320px] lg:h-[420px] xl:h-[480px] overflow-hidden rounded-lg">
          {/* Image */}
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={currentSlide === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"
          />

          {/* Text Card Overlay */}
          <div className="absolute inset-0 flex items-center justify-center sm:justify-end px-4 sm:px-8 lg:px-16 pointer-events-none">
            <Card 
              className="p-3 sm:p-6 lg:p-8 xl:p-10 max-w-[384px] sm:max-w-sm lg:max-w-md w-full sm:w-auto rounded-lg"
            >
              <p className="text-[10px] sm:text-sm tracking-wider mb-1.5 sm:mb-3 text-green font-semibold">
                {slide.category}
              </p>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-4">
                {slide.title}
              </h2>
              <p className="text-foreground text-[12px] sm:text-base leading-relaxed">
                {slide.description}
              </p>
            </Card>
          </div>

          {/* Navigation Controls */}
          {showControls && slides.length > 1 && (
            <>
              {/* Arrow Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-white w-6 sm:w-8' 
                        : 'bg-white/50 hover:bg-white/70 w-2 sm:w-3'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === currentSlide ? 'true' : 'false'}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
