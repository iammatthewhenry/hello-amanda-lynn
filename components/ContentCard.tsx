import Image from 'next/image';
import Link from 'next/link';

// ===================================================================
// CONTENT CARD
// For "Out of Kitchen" and "In The Kitchen" listing pages
// Title and "Read More" link BELOW the image (not overlaid)
// ===================================================================
interface ContentCardProps {
  title: string;
  description?: string;
  image: string;
  href: string;
  objectPosition?: string;
  className?: string;
}

export function ContentCard({
  title,
  description,
  image,
  href,
  objectPosition = 'center',
  className,
}: ContentCardProps) {
  return (
    <Link href={href} className={`group block ${className || ''}`}>
      {/* Polaroid-style card with white border - NO TILT */}
      <div 
        className="bg-white transition-transform duration-300 hover:scale-[1.02]"
        style={{ 
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)',
          padding: '16px 16px 20px 16px'
        }}
      >
        {/* Image - sits inside the white padding */}
        <div className="aspect-square relative overflow-hidden mb-4 bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ objectPosition }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Content - Title below image */}
        <div>
          <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-green transition-colors">
            {title}
          </h3>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-green text-sm font-medium group-hover:gap-3 transition-all">
            <span>Read More</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
