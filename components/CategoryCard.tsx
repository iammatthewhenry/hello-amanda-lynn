import Link from 'next/link';
import Image from 'next/image';

type CategoryCardProps = {
  title: string;
  image: string;
  href: string;
  objectPosition?: string;
  size?: 'lg' | 'sm';
};

export function CategoryCard({
  title,
  image,
  href,
  objectPosition = 'center',
  size = 'lg',
}: CategoryCardProps) {
  /**
   * Figma-aligned visible image sizes
   * sm = Browse by Category (~40% smaller)
   * lg = Explore More
   */
  const imageHeight =
    size === 'sm'
      ? 'h-[120px] sm:h-[135px] lg:h-[145px]'
      : 'h-[200px] sm:h-[220px] lg:h-[240px]';

  return (
    <Link href={href} className="block">
      {/* White photo mat */}
      <div
        className="
          bg-white
          p-[18px]
          shadow-[0_0_18px_rgba(0,0,0,0.16)]
        "
      >
        {/* Image frame */}
        <div
          className={`relative ${imageHeight} overflow-hidden bg-neutral-100`}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
            priority={false}
          />

          {/* Bottom text strip */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div
              className="
                bg-[rgba(212,165,165,0.6)]
                px-3
                py-[6px]
                text-center
              "
            >
              <h3
                className="
                  text-sm
                  sm:text-base
                  font-semibold
                  tracking-tight
                  text-green
                  font-display
                "
              >
                {title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
