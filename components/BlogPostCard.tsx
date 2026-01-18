import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { FramedImage, ReadMoreLink } from '@/components/ui';

// ===================================================================
// TYPES
// ===================================================================
interface BlogPostCardProps {
  id?: string;
  slug?: string;
  title: string;
  excerpt?: string;
  description?: string;
  image: string;
  date?: string;
  category?: string;
  href?: string;
  onClick?: () => void;
}

// ===================================================================
// BLOG POST CARD COMPONENT
// ===================================================================
export function BlogPostCard({ 
  id, 
  slug,
  title, 
  excerpt, 
  description, 
  image, 
  date, 
  category,
  href,
  onClick,
}: BlogPostCardProps) {
  const displayText = excerpt || description || '';
  
  // Determine the href
  const cardHref = href || (slug && category ? `/${category.toLowerCase()}/${slug}` : undefined);
  
  const content = (
    <article className="group cursor-pointer h-full">
      <div className="mb-6 overflow-hidden rounded-lg">
        <FramedImage
          src={image}
          alt={title}
          width={400}
          height={272}
          variant="standard"
          className="w-full h-[272px] group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <h3 className="mb-3 group-hover:text-green transition-colors font-bold text-lg">
        {title}
      </h3>
      
      {displayText && (
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {displayText}
        </p>
      )}
      
      {date && (
        <p className="text-sm text-muted-foreground mb-3">
          {formatDate(date)}
        </p>
      )}
      
      <ReadMoreLink href={cardHref || '#'} />
    </article>
  );

  // Handle onClick
  if (onClick) {
    return (
      <div 
        onClick={onClick} 
        className="cursor-pointer"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        {content}
      </div>
    );
  }

  // Handle Link navigation
  if (cardHref) {
    return (
      <Link href={cardHref} className="block">
        {content}
      </Link>
    );
  }

  // Fallback: render without link
  return content;
}
