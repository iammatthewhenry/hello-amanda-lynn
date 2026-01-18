import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ImageOverlay } from '@/components/ui/image-overlay';

// ===================================================================
// TYPES
// ===================================================================
interface CategoryCardProps {
  title: string;
  image: string;
  href?: string;
  onClick?: () => void;
  count?: number;
  description?: string | ReactNode;
  objectPosition?: string;
  variant?: 'default' | 'compact' | 'overlay';
  className?: string;
}

// ===================================================================
// CATEGORY CARD COMPONENT
// Consolidated version combining CategoryCard and CategoryGrid functionality
// ===================================================================
export function CategoryCard({ 
  title, 
  image, 
  href, 
  onClick,
  count,
  description, 
  objectPosition = 'center',
  variant = 'default',
  className,
}: CategoryCardProps) {
  
  // Height classes based on variant
  const heightClasses = {
    default: 'h-[160px] sm:h-[220px] lg:h-[248px]',
    compact: 'h-[200px]',
    overlay: 'h-[200px]',
  };

  // Container width classes
  const widthClasses = {
    default: 'max-w-[77%] md:max-w-[90%]',
    compact: 'max-w-[280px]',
    overlay: 'max-w-[280px]',
  };

  const content = (
    <div 
      className={cn(
        'group relative cursor-pointer mx-auto overflow-hidden rounded-lg',
        heightClasses[variant],
        widthClasses[variant],
        'w-full',
        className
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-all duration-300 group-hover:scale-105"
        style={{ 
          objectPosition,
          boxShadow: variant !== 'default' ? 'var(--shadow-hero)' : undefined 
        }}
        sizes="(max-width: 640px) 77vw, (max-width: 1024px) 45vw, 280px"
      />
      
      {/* Overlay Content */}
      {variant === 'default' ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 bg-black/0 hover:bg-black/20 transition-colors duration-300">
          <ImageOverlay position="center">
            <h2 className="text-white font-bold text-xl sm:text-2xl drop-shadow-lg text-center">
              {title}
            </h2>

            {count !== undefined && (
              <p className="text-white/90 text-base sm:text-lg text-center drop-shadow-md mt-1">
                {count} {count === 1 ? 'Recipe' : 'Recipes'}
              </p>
            )}

            {description && (
              <p className="text-white/90 text-sm sm:text-base text-center drop-shadow-md mt-2">
                {description}
              </p>
            )}
          </ImageOverlay>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 bg-black/20 py-3 px-4 group-hover:bg-black/40 transition-colors duration-300">
          <h3 className="text-white font-bold text-center drop-shadow-lg">
            {title}
          </h3>
        </div>
      )}
    </div>
  );

  // Wrapper based on navigation type
  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        {content}
      </div>
    );
  }

  return content;
}

// ===================================================================
// CATEGORY GRID COMPONENT
// ===================================================================
interface Category {
  title: string;
  image: string;
  page: string;
  objectPosition?: string;
}

interface CategoryGridProps {
  categories: Category[];
  variant?: 'home' | 'recipes';
  className?: string;
}

export function CategoryGrid({
  categories,
  variant = 'recipes',
  className,
}: CategoryGridProps) {
  const gridCols =
    variant === 'home'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  const gapClasses =
    variant === 'home'
      ? 'gap-x-0 sm:gap-x-px gap-y-[1.3125rem] sm:gap-y-[2.625rem]'
      : 'gap-6 sm:gap-8';

  return (
    <div className={cn('grid', gridCols, gapClasses, className)}>
      {categories.map((category, index) => (
        <div key={index} className="flex flex-col items-center">
          <CategoryCard
            title={category.title}
            image={category.image}
            href={`/${category.page}`}
            objectPosition={category.objectPosition}
            variant={variant === 'home' ? 'compact' : 'overlay'}
          />
        </div>
      ))}
    </div>
  );
}
