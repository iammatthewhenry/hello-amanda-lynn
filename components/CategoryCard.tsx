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
    <Link href={href} className="group block">
      {/* Outer white photo mat */}
      <div className="bg-white p-3 shadow-md transition-shadow duration-300 group-hover:shadow-lg">
        {/* Inner image frame */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            style={{ objectPosition }}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>

        {/* Caption */}
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold tracking-tight">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
