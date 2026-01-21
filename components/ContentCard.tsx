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
 * Updated: Cards fill 90% of grid cell, tighter spacing
 */
export function ContentCard({ title, description, image, href }: ContentCardProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Polaroid Card - White frame with image inside - fills 90% of cell */}
      <Link href={href} className="block group mx-auto w-[90%]">
        <div 
          className="bg-white p-2 sm:p-3"
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

      {/* Text Content - BELOW the card, scaled down proportionally */}
      <div className="mt-3 mx-auto w-[90%]">
        <h3 className="text-xs sm:text-sm font-bold text-foreground mb-1 leading-tight">
          {title}
        </h3>
        <Link 
          href={href}
          className="inline-flex items-center gap-1 text-green hover:text-green/80 transition-colors text-[10px] sm:text-xs"
        >
          Read More
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}

export default ContentCard;
