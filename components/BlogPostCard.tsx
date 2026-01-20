import Image from 'next/image';
import Link from 'next/link';

// ===================================================================
// BLOG POST CARD
// ===================================================================
interface BlogPostCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  category?: string;
  location?: string;
  date?: string;
}

export function BlogPostCard({
  title,
  description,
  image,
  href,
  category,
  location,
  date,
}: BlogPostCardProps) {
  return (
    <Link href={href} className="group block">
      {/* Polaroid-style card with white border */}
      <div 
        className="bg-white p-4 transition-transform duration-300 hover:scale-[1.02]"
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        {/* Image */}
        <div className="aspect-square relative overflow-hidden mb-4">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-green transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/70 mb-4 line-clamp-3">
            {description}
          </p>
          
          {/* Metadata */}
          {(category || location || date) && (
            <div className="text-xs text-foreground/50">
              {category && <span>{category}</span>}
              {location && <span>{location}</span>}
              {date && <span>{date}</span>}
            </div>
          )}
          
          {/* Read More Link */}
          <div className="mt-4 flex items-center gap-2 text-green text-sm font-medium group-hover:gap-3 transition-all">
            <span>Read More</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
