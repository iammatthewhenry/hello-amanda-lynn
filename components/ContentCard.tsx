import Image from 'next/image';
import Link from 'next/link';

interface ContentCardProps {
  title: string;
  description?: string;
  image: string;
  href: string;
}

/**
 * ContentCard - Polaroid-style card with text BELOW the card
 * Text is outside the white frame, left-aligned to card edge
 * 
 * CRITICAL FIX: Cards are constrained to ~95% of their grid cell width
 * This creates visible gaps between cards even with grid gap-10
 */
export function ContentCard({ title, description, image, href }: ContentCardProps) {
  return (
    <div className="flex flex-col w-full max-w-full">
      {/* Polaroid Card - White frame with image inside - Constrained to 95% width */}
      <Link href={href} className="block group mx-auto w-[95%]">
        <div 
          className="bg-white p-3 sm:p-4"
          style={{ 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
          }}
        >
          <div className="aspect-square overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={400}
              height={400}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </Link>

      {/* Text Content - BELOW the card, left-aligned to card edge */}
      <div className="mt-4 mx-auto w-[95%]">
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 leading-tight">
          {title}
        </h3>
        <Link 
          href={href}
          className="inline-flex items-center gap-1 text-green hover:text-green/80 transition-colors text-sm"
        >
          Read More
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

export default ContentCard;
