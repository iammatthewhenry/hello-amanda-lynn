import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { Section, SectionHeader } from './ui';

export function TopFive() {
  return (
    <Section spacing="lg" containerSize="4xl">
      <SectionHeader
        title="Top Five Recipes"
        subtitle="Most loved by readers right now"
        centered
      />

      {/* Local width override to match Figma */}
      <div className="mx-auto max-w-[1150px] grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-20 items-start">
        {/* Featured Recipe */}
        <div className="mx-auto lg:mx-0">
          <div className="relative bg-white p-[18px] shadow-hero">
            <div className="relative h-[290px] sm:h-[400px] lg:h-[450px] w-[280px] sm:w-[360px] lg:w-[450px] overflow-hidden bg-neutral-100">
              <Image
                src="/images/featured/featured-tomato-soup.jpg"
                alt="Creamy Tomato Soup"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 450px, 90vw"
              />

              {/* Badge */}
              <div className="absolute top-6 left-6 bg-primary/70 px-5 py-2">
                <span className="text-xs sm:text-sm uppercase tracking-wide text-white font-semibold">
                  Chef’s Pick
                </span>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="mt-6 max-w-[450px]">
            <h3 className="text-xl font-display font-semibold mb-2">
              The Best Tomato Soup
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              This velvety tomato soup is perfectly balanced with cream and fresh
              basil. It’s comfort in a bowl and pairs beautifully with grilled
              cheese.
            </p>
          </div>
        </div>

        {/* Most Popular List */}
        <div>
          <h3 className="text-2xl font-display font-bold mb-10 text-center lg:text-left">
            Most Popular
          </h3>

          <ul className="space-y-8">
            {[1, 2, 3, 4, 5].map((rank) => (
              <li
                key={rank}
                className="flex items-start gap-6 pb-8 border-b border-border last:border-b-0"
              >
                {/* Rank Number */}
                <div className="w-12 h-12 flex items-center justify-center font-number text-3xl font-bold text-green opacity-85">
                  {rank}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Link
                    href="#"
                    className="block font-semibold text-[17px] mb-2 hover:underline"
                  >
                    Creamy Tomato Soup
                  </Link>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      4.9 from 2,689 reviews
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
