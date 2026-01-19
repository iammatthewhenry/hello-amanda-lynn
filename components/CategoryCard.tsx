import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ===================================================================
// CATEGORY CARD (FIGMA-ACCURATE)
// ===================================================================
interface CategoryCardProps {
  title: string;
  image: string;
  href?: string;
  count?: number;
  description?: string | ReactNode;
  objectPosition?: string;
  className?: string;
}

export function CategoryCard({
  title,
  image,
  href,
  count,
  description,
  objectPosition = 'center',
  className,
}: CategoryCardProps) {
  const card = (
    <div
      className={cn(
        'group relative cursor-pointer h-[160px] sm:h-[220px] lg:h-[248px] max-w-[77%] md:max-w-[90%] mx-auto',
        className
      )}
    >
      {/* Image with 16px white border and shadow */}
      <div className="relative w-full h-full border-[16px] border-white overflow-hidden"
           style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}>
        <Image
          src={image}
          alt={title}
          fill
          priority={false}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ objectPosition }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Semi-transparent peachy overlay with green text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div 
          className="px-4 sm:px-6 py-2 sm:py-3 w-[85%] text-center"
          style={{ backgroundColor: 'rgba(250, 248, 246, 0.93)' }}
        >
          <h2 className="text-green text-lg sm:text-xl lg:text-2xl font-bold transition-all duration-300 group-hover:font-bold">
            {title}
          </h2>

          {count !== undefined && (
            <p className="text-green/90 text-sm sm:text-base mt-1">
              {count} {count === 1 ? 'Recipe' : 'Recipes'}
            </p>
          )}

          {description && (
            <p className="text-green/90 text-xs sm:text-sm mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full focus:outline-none">
        {card}
      </Link>
    );
  }

  return card;
}

// ===================================================================
// CATEGORY GRID
// ===================================================================
interface Category {
  title: string;
  image: string;
  page: string;
  objectPosition?: string;
}

interface CategoryGridProps {
  categories: Category[];
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {categories.map((category) => (
        <CategoryCard
          key={category.title}
          title={category.title}
          image={category.image}
          href={`/${category.page}`}
          objectPosition={category.objectPosition}
        />
      ))}
    </div>
  );
}
