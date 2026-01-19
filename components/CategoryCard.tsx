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
  objectPosition = 'center 60%',
  size = 'lg',
}: CategoryCardProps) {
  const imageHeight =
    size === 'sm'
      ? 'h-[130px] sm:h-[145px] lg:h-[155px]' // ~40% smaller
      : 'h-[220px] sm:h-[240px] lg:h-[260px]';

  return (
    <Link href={href} className="group block">
      {/* White photo mat — 18px */}
      <div
        className="
          bg-white
          p-[18px]
          shadow-[0_0_48px_rgba(0,0,0,0.26)]
          transition-shadow
          duration-300
          group-hover:shadow-[0_0_56px_rgba(0,0,0,0.30)]
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
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />

          {/* Bottom label strip — 30% opacity */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="bg-[#F5F2ED]/30 px-3 py-1.5 text-center">
              <h3
                className="text-base sm:text-lg font-semibold tracking-tight"
                style={{
                  color: 'var(--green)',
                  fontFamily: 'var(--font-montserrat)',
                }}
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
