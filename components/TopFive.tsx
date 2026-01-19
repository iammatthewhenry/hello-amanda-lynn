import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface TopFiveItem {
  id: number;
  title: string;
  rating: number;
  reviewCount: number;
  slug: string;
}

export interface TopFiveData {
  featuredImage: string;
  featuredTitle: string;
  featuredDescription: string;
  featuredSlug: string;
  badgeText: string;
  items: TopFiveItem[];
  buttonText: string;
  buttonLink: string;
}

interface TopFiveProps {
  data?: TopFiveData;
}

/* Mock data (will be replaced later) */
const defaultData: TopFiveData = {
  featuredImage:
    'https://images.unsplash.com/photo-1620791144170-8a443bf37a33?auto=format&fit=crop&w=900&q=80',
  featuredTitle: 'The Best Tomato Soup',
  featuredDescription:
    "This velvety tomato soup is perfectly balanced with cream and fresh basil. It's comfort in a bowl and pairs beautifully with grilled cheese.",
  featuredSlug: '/recipes/tomato-soup',
  badgeText: "Chef's Pick",
  items: [
    { id: 1, title: 'Fluffy Buttermilk Pancakes', rating: 4.9, reviewCount: 3821, slug: '/recipes/fluffy-buttermilk-pancakes' },
    { id: 2, title: 'Classic French Toast', rating: 4.9, reviewCount: 3156, slug: '/recipes/classic-french-toast' },
    { id: 3, title: 'Grilled Salmon', rating: 4.8, reviewCount: 2945, slug: '/recipes/grilled-salmon' },
    { id: 4, title: 'Rich Chocolate Cake', rating: 4.9, reviewCount: 2689, slug: '/recipes/rich-chocolate-cake' },
    { id: 5, title: 'Herb Roasted Chicken', rating: 4.8, reviewCount: 2531, slug: '/recipes/herb-roasted-chicken' },
  ],
  buttonText: 'See More Favorites',
  buttonLink: '/recipes',
};

export function TopFive({ data = defaultData }: TopFiveProps) {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">

          {/* Featured Recipe */}
          <Link href={data.featuredSlug} className="block">
            <div className="relative">

              {/* White photo mat */}
              <div className="bg-white p-4 shadow-hero">
                <div className="relative h-[290px] sm:h-[400px] lg:h-[450px] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={data.featuredImage}
                    alt={data.featuredTitle}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 450px, 90vw"
                  />

                  {/* Badge */}
                  <div className="absolute top-6 left-6 bg-[rgba(212,165,165,0.8)] px-5 py-2">
                    <span className="uppercase tracking-wider text-xs font-semibold text-white">
                      {data.badgeText}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured text */}
              <div className="mt-6 max-w-md">
                <h3 className="text-xl font-semibold mb-3">
                  {data.featuredTitle}
                </h3>
                <p className="text-base text-foreground/70 leading-relaxed">
                  {data.featuredDescription}
                </p>
              </div>
            </div>
          </Link>

          {/* Most Popular List */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-center lg:text-left mb-8">
              Most Popular
            </h2>

            <div className="space-y-6">
              {data.items.map((item, index) => (
                <Link key={item.id} href={item.slug} className="block">
                  <div className="flex gap-4 pb-6 border-b border-border last:border-b-0">

                    {/* Number */}
                    <div className="w-12 h-12 flex items-center justify-center">
                      <span className="text-3xl font-bold font-number text-green opacity-85">
                        {index + 1}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h4 className="text-base font-semibold mb-2">
                        {item.title}
                      </h4>

                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className="fill-primary text-primary"
                            />
                          ))}
                        </div>
                        <span className="text-sm text-foreground/60">
                          {item.rating} from {item.reviewCount.toLocaleString()} reviews
                        </span>
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
