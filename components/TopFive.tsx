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

      {/* Figma-width wrapper */}
      <div className="mx-auto max-w-[1240px] grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-24 items-start">
        {/* Featured Recipe */}
        <div>
          <div className="bg-white p-[20px] shadow-hero">
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <Image
                src="/images/featured/featured-tomato-soup.jpg"
                alt="Creamy Tomato Soup"
                fill
                className="object-cover"
                sizes="520px"
              />

              {/* Badge */}
              <div className="absolute top-6 left-6 bg-primary/75 px-6 py-2">
                <span className="text-xs uppercase tracking-widest text-white font-semibold">
                  Chef’s Pick
                </span>
              </div>
            </div>
          </div>

          {/* Caption */}
          <div className="mt-8 max-w-[520px]">
            <h3 className="text-2xl font-display font-semibold mb-3">
              The Best Tomato Soup
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              This velvety tomato soup is perfectly balanced with cream and fresh
              basil. It&apos;s comfort in a bowl and pairs beautifully with grilled
              cheese.
            </p>
          </div>
        </div>

        {/* Most Popular List */}
        <div>
          <h3 className="text-3xl font-display font-bold mb-14">
            Most Popular
          </h3>

          <ul className="space-y-12">
            {[
              'Fluffy Buttermilk Pancakes',
              'Classic French Toast',
              'Grilled Salmon',
              'Rich Chocolate Cake',
              'Herb Roasted Chicken',
            ].map((title, index) => (
              <li
                key={title}
                className="flex items-start gap-10 pb-10 border-b border-border last:border-b-0"
              >
                {/* Rank */}
                <div className="font-number text-[36px] leading-none font-bold text-green/70 w-10">
                  {index + 1}
                </div>

                {/* Content */}
                <div>
                  <Link
                    href="#"
                    className="block text-lg font-medium mb-2 hover:underline"
                  >
                    {title}
                  </Link>

                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-primary text-primary"
                      />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      4.9 from 3,821 reviews
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
