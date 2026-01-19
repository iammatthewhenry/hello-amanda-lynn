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

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 lg:gap-16 items-start">
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
              <div className="absolute top-6 left-6 bg-primary/80 px-4 py-2">
                <span className="text-xs sm:text-sm uppercase tracking-widest text-white font-semibold">
                  Featured
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div>
          <h3 className="text-2xl font-display font-bold mb-8 text-center lg:text-left">
            Most Popular
          </h3>

          <ul className="space-y-6">
            {[1, 2, 3, 4, 5].map((rank) => (
              <li
                key={rank}
                className="flex items-start gap-4 pb-6 border-b border-border last:border-b-0"
              >
                {/* Number */}
                <div className="w-12 h-12 flex items-center justify-center font-number text-3xl font-bold text-green opacity-85">
                  {rank}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <Link
                    href="#"
                    className="block font-semibold text-base mb-1 hover:underline"
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
                      4.9
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
