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
        'group relative w-full overflow-hidden rounded-lg bg-white',
        'shadow-card hover:shadow-lg transition-shadow duration-300',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority={false}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          style={{ objectPosition }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Title Below Image */}
      <div className="p-4 text-center">
        <h3 className="text-foreground font-semibold text-base sm:text-lg">
          {title}
        </h3>

        {count !== undefined && (
          <p className="mt-1 text-sm text-foreground/60">
            {count} {count === 1 ? 'Recipe' : 'Recipes'}
          </p>
        )}

        {description && (
          <p className="mt-2 text-sm text-foreground/60">{description}</p>
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
