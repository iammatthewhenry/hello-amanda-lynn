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
  objectPosition = 'center 60%',
}: CategoryCardProps) {
  return (
    <Link href={href} className="group block">
      {/* White photo mat — doubled thickness */}
      <div
        className="
          bg-white
          p-6
          shadow-[0_0_40px_rgba(0,0,0,0.20)]
          transition-shadow
          duration-300
          group-hover:shadow-[0_0_48px_rgba(0,0,0,0.24)]
        "
      >
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

          {/* Bottom label strip */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0">
            <div className="bg-[#F5F2ED]/70 px-4 py-2 text-center">
              <h3
                className="text-lg sm:text-xl font-semibold tracking-tight"
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
