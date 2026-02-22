import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users } from 'lucide-react';

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  time: string;
  servings: string;
}

export function RecipeCard({ 
  id, 
  title, 
  description, 
  image, 
  time, 
  servings 
}: RecipeCardProps) {
  return (
    <Link href={`/recipe/${id}`}>
      <article className="group cursor-pointer">
        <div className="mb-6 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={400}
            height={272}
            className="w-full h-auto aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-lg font-bold text-foreground group-hover:text-green transition-colors mb-3">
          {title}
        </h3>
        <p className="text-foreground/70 mb-4 line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-4 text-foreground/60 text-sm">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{servings}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
