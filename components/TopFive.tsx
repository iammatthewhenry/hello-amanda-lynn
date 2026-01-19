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

// Mock data that will be replaced by WordPress plugin
const defaultData: TopFiveData = {
  featuredImage: 'https://images.unsplash.com/photo-1620791144170-8a443bf37a33?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  featuredTitle: 'The Best Tomato Soup',
  featuredDescription: "This velvety tomato soup is perfectly balanced with cream and fresh basil. It's comfort in a bowl and pairs beautifully with grilled cheese.",
  featuredSlug: '/recipe/tomato-soup',
  badgeText: "Chef's Pick",
  items: [
    { id: 1, title: 'Fluffy Buttermilk Pancakes', rating: 4.9, reviewCount: 3821, slug: '/recipe/fluffy-buttermilk-pancakes' },
    { id: 2, title: 'Classic French Toast', rating: 4.9, reviewCount: 3156, slug: '/recipe/classic-french-toast' },
    { id: 3, title: 'Grilled Salmon', rating: 4.8, reviewCount: 2945, slug: '/recipe/grilled-salmon' },
    { id: 4, title: 'Rich Chocolate Cake', rating: 4.9, reviewCount: 2689, slug: '/recipe/rich-chocolate-cake' },
    { id: 5, title: 'Herb Roasted Chicken', rating: 4.8, reviewCount: 2531, slug: '/recipe/herb-roasted-chicken' },
  ],
  buttonText: 'See More Favorites',
  buttonLink: '/recipes',
};

export function TopFive({ data = defaultData }: TopFiveProps) {
  return (
    <section className="bg-background py-[22px] sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Grid Layout: Featured on left, List on right */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-start">
          
          {/* Left: Featured Recipe with Badge */}
          <Link 
            href={data.featuredSlug}
            className="relative group cursor-pointer max-w-[77%] lg:max-w-[450px] mx-auto lg:mx-0 block"
          >
            <div className="relative h-[290px] sm:h-[400px] lg:h-[450px] border-[16px] border-white overflow-hidden"
                 style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}>
              <Image
                src={data.featuredImage}
                alt={data.featuredTitle}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 77vw, 450px"
              />
              
              {/* Badge */}
              <div className="absolute top-6 left-6 bg-[#D4A5A5]/80 text-white px-5 py-2.5 sm:px-6 sm:py-3 shadow-lg">
                <span className="uppercase tracking-wider text-xs sm:text-sm">{data.badgeText}</span>
              </div>
            </div>

            {/* Featured Recipe Info */}
            <div className="mt-6">
              <h3 className="mb-3 text-foreground group-hover:text-green transition-colors text-xl sm:text-2xl font-bold">
                {data.featuredTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {data.featuredDescription}
              </p>
            </div>
          </Link>

          {/* Right: Most Popular List */}
          <div>
            <h2 className="mb-3 sm:mb-4 text-center lg:text-left text-2xl sm:text-3xl font-bold">
              Most Popular
            </h2>
            
            <div className="space-y-6">
              {data.items.map((item) => (
                <Link
                  key={item.id}
                  href={item.slug}
                  className="flex items-start gap-4 pb-6 border-b border-[rgba(212,165,165,0.2)] last:border-b-0 cursor-pointer group block"
                >
                  {/* Number */}
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <span className="text-3xl text-green opacity-85 number-font">
                      {item.id}
                    </span>
                  </div>

                  {/* Recipe Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="mb-2 group-hover:text-green transition-colors text-lg font-semibold">
                      {item.title}
                    </h4>
                    
                    {/* Star Rating */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-4 h-4 fill-[#D4A5A5] text-[#D4A5A5]"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.rating} from {item.reviewCount.toLocaleString()} reviews
                      </span>
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
