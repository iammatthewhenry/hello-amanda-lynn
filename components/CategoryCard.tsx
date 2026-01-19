import Link from 'next/link';
import Image from 'next/image';

type CategoryCardProps = {
  title: string;
  image: string;
  href: string;
  objectPosition?: string;
};

export function CategoryCard({
  title,
  image,
  href,
  objectPosition = 'center',
}: CategoryCardProps) {
  return (
    <Link href={href} className="block">
      {/* White photo mat — 16px */}
      <div
        className="
          bg-white
          p-4
          shadow-photo
        "
      >
        {/* Image frame — Figma 280 × 200 */}
        <div
          className="
            relative
            h-[200px]
            w-[280px]
            overflow-hidden
            bg-neutral-100
            mx-auto
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="280px"
          />

          {/* Bottom text strip — slim, 60% opacity */}
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
                  font-display
                  font-semibold
                  tracking-tight
                  text-green
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
