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
      {/* Polaroid-style card with thick white border */}
      <div 
        className="bg-white transition-transform duration-300 hover:scale-[1.02]"
        style={{ 
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
          padding: '16px 16px 24px 16px' // Top/sides: 16px, bottom: 24px for polaroid look
        }}
      >
        {/* Image - no border, sits inside the white padding */}
        <div className="aspect-square relative overflow-hidden mb-6 bg-muted">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="px-2">
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-green transition-colors">
            {title}
          </h3>
          <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
            {description}
          </p>
          
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
