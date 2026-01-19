import Link from 'next/link';
import Image from 'next/image';

type CategoryCardProps = {
  title: string;
  image: string;
  href: string;
  /**
   * Controls intentional editorial cropping.
   * Examples:
   * - 'center 60%' (default, Figma-safe)
   * - 'center top'
   * - 'center 75%'
   */
  objectPosition?: string;
};

export function CategoryCard({
  title,
  image,
  href,
  objectPosition = 'center 60%',
}: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      {/* White photo mat */}
      <div className="bg-white p-3 shadow-md transition-shadow duration-300 group-hover:shadow-lg">
        {/* Fixed editorial crop window */}
        <div className="relative h-[220px] sm:h-[240px] lg:h-[260px] overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>

        {/* Caption */}
        <div className="mt-3 text-center">
          <h3 className="text-base sm:text-lg font-semibold tracking-tight">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
