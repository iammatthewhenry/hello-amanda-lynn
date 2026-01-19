import Link from 'next/link';
import Image from 'next/image';

// ===================================================================
// CATEGORY CARD
// ===================================================================
interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
  objectPosition?: string;
}

export function CategoryCard({
  title,
  image,
  href,
  objectPosition = 'center',
}: CategoryCardProps) {
  return (
    <Link href={href} className="block group">
      {/* PHOTO FRAME */}
      <div className="bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden border border-neutral-200 bg-neutral-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="pt-4 text-center">
          <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
        </div>
      </div>
    </Link>
  );
}
