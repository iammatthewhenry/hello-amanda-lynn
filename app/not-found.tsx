import { Button } from '@/components/ui';

export default function NotFoundPage() {
  const errorImage = '/images/error-plate.png';

  return (
    // 404 Hero - Full viewport centered
    // h-[calc(100dvh-64px)] = viewport - header (64px mobile)
    // sm:h-[calc(100dvh-80px)] = viewport - header (80px desktop)
    <section className="h-[calc(100dvh-64px)] sm:h-[calc(100dvh-80px)] flex items-center justify-center overflow-hidden">
      <div className="w-full h-full flex flex-col items-center justify-center gap-4 sm:gap-6 px-4">
        {/* Image with Text Overlay - Constrained to fit in viewport */}
        <div className="relative w-full max-w-6xl flex-shrink" style={{ maxHeight: 'calc(100% - 100px)' }}>
          <img
            src={errorImage}
            alt="Empty ceramic plate on white background"
            className="w-full h-full object-contain block"
          />
          
          {/* Text Overlay - Positioned to the right of plate */}
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
            {/* Oops! Heading */}
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

            {/* Body Text */}
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

        {/* CTA Buttons - Below Image */}
        <div className="flex flex-wrap gap-4 justify-center flex-shrink-0">
          <Button
            href="/"
            variant="green"
            rounded="full"
            className="px-10 py-3 text-xs tracking-wider uppercase"
          >
            Back to Home
          </Button>
          <Button
            href="/recipes"
            variant="outline"
            rounded="full"
            className="px-10 py-3 text-xs tracking-wider uppercase border-primary text-primary hover:bg-primary hover:text-white"
          >
            Browse Recipes
          </Button>
        </div>
      </div>
    </section>
  );
}
