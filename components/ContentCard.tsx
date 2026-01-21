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
 * Updated: Cards fill 75.6% of grid cell (20% bigger), proportionally scaled fonts
 */
export function ContentCard({ title, description, image, href }: ContentCardProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Polaroid Card - White frame with image inside - fills 75.6% of cell (20% bigger) */}
      <Link href={href} className="block group mx-auto w-[75.6%]">
        <div 
          className="bg-white p-1.5 sm:p-2"
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

      {/* Text Content - BELOW the card, scaled down proportionally to match smaller card size */}
      <div className="mt-2 mx-auto w-[75.6%]">
        <h3 className="text-sm sm:text-base font-bold text-foreground mb-0.5 leading-tight">
          {title}
        </h3>
      </div>
    </div>
  );
}

export default ContentCard;
