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
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="p-4 sm:p-6 lg:p-8 bg-white rounded-lg"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-green text-3xl sm:text-4xl font-bold">SHOP MY KITCHEN</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {items.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mx-auto mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={256}
                    height={256}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="mb-3 font-semibold text-foreground">{item.title}</h3>
                <Link
                  href={item.link || shopLink}
                  className="inline-block px-4 py-2 bg-green text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Buy This
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href={shopLink}
              className="inline-block px-6 py-3 bg-green text-white font-semibold text-lg rounded-lg hover:opacity-90 transition-opacity"
            >
              Shop All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
