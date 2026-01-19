import Link from 'next/link';
import Image from 'next/image';

type CategoryCardProps = {
  title: string;
  image: string;
  href: string;
  /**
   * Editorial crop control
   * e.g. 'center 60%', 'center top'
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
        {/* Image frame */}
        <div className="relative h-[220px] sm:h-[240px] lg:h-[260px] overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />

          {/* Text overlay (Figma-style) */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="bg-white/80 backdrop-blur-sm px-4 py-3 text-center">
              <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-green-800">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
