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

// Mock data that will be replaced by real data
const defaultData: TopFiveData = {
  featuredImage: 'https://images.unsplash.com/photo-1620791144170-8a443bf37a33?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  featuredTitle: 'The Best Tomato Soup',
  featuredDescription: 'This velvety tomato soup is perfectly balanced with cream and fresh basil. It\'s comfort in a bowl and pairs beautifully with grilled cheese.',
  featuredSlug: '/recipes/tomato-soup',
  badgeText: 'Chef\'s Pick',
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
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid Layout: Featured on left, List on right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-start">
          
          {/* Left: Featured Recipe with Badge */}
          <Link href={data.featuredSlug} className="group">
            <div className="relative cursor-pointer">
              <div className="relative h-64 sm:h-96 lg:h-[450px] rounded-lg overflow-hidden">
                <Image
                  src={data.featuredImage}
                  alt={data.featuredTitle}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-green/90 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg">
                  <span className="uppercase tracking-wider text-xs sm:text-sm font-semibold">
                    {data.badgeText}
                  </span>
                </div>
              </div>

              {/* Featured Recipe Info */}
              <div className="mt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-green transition-colors">
                  {data.featuredTitle}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {data.featuredDescription}
                </p>
              </div>
            </div>
          </Link>

          {/* Right: Most Popular List */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-center lg:text-left mb-6 sm:mb-8">
              Most Popular
            </h2>
            
            <div className="space-y-6">
              {data.items.map((item) => (
                <Link key={item.id} href={item.slug}>
                  <div className="flex items-start gap-4 pb-6 border-b border-gray-200 last:border-b-0 group">
                    {/* Number */}
                    <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl font-bold text-green/60">
                        {item.id}
                      </span>
                    </div>

                    {/* Recipe Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-green transition-colors">
                        {item.title}
                      </h4>
                      
                      {/* Star Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
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
