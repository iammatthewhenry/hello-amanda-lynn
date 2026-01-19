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
        'group relative w-full overflow-hidden rounded-xl',
        'aspect-[4/3]',
        'bg-neutral-900',
        className
      )}
    >
      <Image
        src={image}
        alt={title}
        fill
        priority={false}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ objectPosition }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
        <h3 className="text-white font-semibold text-xl sm:text-2xl drop-shadow">
          {title}
        </h3>

        {count !== undefined && (
          <p className="mt-1 text-sm text-white/90">
            {count} {count === 1 ? 'Recipe' : 'Recipes'}
          </p>
        )}

        {description && (
          <p className="mt-2 text-sm text-white/90">{description}</p>
        )}
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
