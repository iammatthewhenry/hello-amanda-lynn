// app/error.tsx - Global Error Boundary
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
import plateImage from '@/public/images/plate.png';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service (e.g., Sentry)
    console.error('Application error:', error);
  }, [error]);

  return (
    <section className="h-[calc(100dvh-64px)] sm:h-[calc(100dvh-80px)] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-6 px-4">
        <div className="relative w-full max-w-6xl flex-shrink" style={{ maxHeight: 'calc(100% - 100px)' }}>
          <Image
            src={plateImage}
            alt="Empty ceramic plate on white background"
            className="w-full h-full object-contain block"
          />
          
          <div 
            className="absolute text-left flex flex-col"
            style={{ 
              left: 'calc(55% + 15px)',
              top: '50%',
              transform: 'translateY(-50%)',
              gap: 'clamp(0.5rem, 1.5vw, 1rem)',
              maxWidth: '42%'
            }}
          >
            <h1 
              className="mb-0"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.8rem, 5vw, 5rem)',
                fontWeight: 500,
                lineHeight: 1.1,
                color: '#000000'
              }}
            >
              Oops!
            </h1>
            <p 
              style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(0.9rem, 2.5vw, 2.5rem)',
                lineHeight: 1.4,
                color: '#000000'
              }}
            >
              This Plate is Empty.<br />
              Let's get you back to<br />
              something delicious!
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center flex-shrink-0">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full btn-green px-10 py-3 text-xs tracking-wider uppercase"
            style={{ fontWeight: 600, letterSpacing: '0.09em' }}
          >
            Back to Home
          </Link>
          <Link
            href="/recipes"
            className="inline-flex items-center justify-center rounded-full border-2 border-primary bg-white text-primary px-10 py-3 text-xs tracking-wider uppercase hover:bg-primary hover:text-white transition-all"
            style={{ fontWeight: 600, letterSpacing: '0.09em' }}
          >
            Browse Recipes
          </Link>
        </div>
      </div>
    </section>
  );
}
