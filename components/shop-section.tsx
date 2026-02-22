import Image from 'next/image';
import Link from 'next/link';

export interface ShopItem {
  title: string;
  image: string;
  link?: string;
}

interface ShopSectionProps {
  items?: ShopItem[];
  shopLink?: string;
}

const defaultItems: ShopItem[] = [
  {
    title: 'Kitchen Essentials Set',
    image: 'https://images.unsplash.com/photo-1723361750261-ba1a1c8b8255?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdXRlbnNpbCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYxNjk4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Stand Mixer',
    image: 'https://images.unsplash.com/photo-1758279745446-2e4ba34c7d32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFuZCUyMG1peGVyJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjY0MjAyNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Professional Knife Set',
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVmJTIwa25pZmUlMjBzZXR8ZW58MXx8fHwxNzY2NDIwMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Cast Iron Skillet',
    image: 'https://images.unsplash.com/photo-1567954046925-780ec4ab0157?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN0JTIwaXJvbiUyMHNraWxsZXR8ZW58MXx8fHwxNzY2NDIwMjY1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    title: 'Wooden Cutting Board',
    image: 'https://images.unsplash.com/photo-1629539890438-cb562ec70f70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY3V0dGluZyUyMGJvYXJkfGVufDF8fHx8MTc2NjQyMDI2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function ShopSection({ items = defaultItems, shopLink = '/shop' }: ShopSectionProps) {
  return (
    <section className="py-[22px] sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '85%' }}>
        <div 
          className="p-1 sm:p-1.5 lg:p-2 xl:p-2.5 bg-background"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="text-center mb-3 sm:mb-4">
            <h2 className="text-green text-2xl sm:text-3xl lg:text-[36px] font-bold tracking-tight">
              SHOP MY KITCHEN
            </h2>
          </div>

          {/* 3 columns on desktop, 2 on tablet, 1 on mobile - 5 items total */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[18px] sm:gap-[18px]">
            {items.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="w-[46%] sm:w-[69%] lg:w-[92%] aspect-square overflow-hidden bg-white mx-auto mb-3 sm:mb-4 mt-[6px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <Link
                  href={item.link || shopLink}
                  className="inline-block px-3 py-1 bg-green text-white text-base font-semibold hover:opacity-90 transition-opacity"
                >
                  Buy This
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-[46px] sm:mt-8 mb-3 sm:mb-4">
            <Link
              href={shopLink}
              className="inline-block px-4 sm:px-5 py-1 sm:py-1.5 bg-green text-white font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity scale-[1.20] sm:scale-100"
            >
              Shop All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
