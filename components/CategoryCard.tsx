import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ===================================================================
// CATEGORY CARD
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
        'group relative w-full overflow-hidden rounded-lg',
        'aspect-[4/3]',
        className
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        style={{ objectPosition }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
        <h3 className="text-white font-bold text-xl sm:text-2xl drop-shadow text-center">
          {title}
        </h3>

        {count !== undefined && (
          <p className="text-white/90 mt-1">
            {count} {count === 1 ? 'Recipe' : 'Recipes'}
          </p>
        )}

        {description && (
          <p className="text-white/90 mt-2 text-sm text-center">
            {description}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block w-full">
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
