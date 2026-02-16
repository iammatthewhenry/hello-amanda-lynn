'use client';

import Image from 'next/image';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Container } from '@/components/Container';
import { Section, Card, Button } from '@/components/ui';

export default function ShopPage() {
  const shopItems = [
    {
      title: 'Kitchen Essentials Set',
      image: 'https://images.unsplash.com/photo-1723361750261-ba1a1c8b8255?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdXRlbnNpbCUyMHByb2R1Y3R8ZW58MXx8fHwxNzYxNjk4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Artisan Cutting Board',
      image: 'https://images.unsplash.com/photo-1557109434-f47ea8d515df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXR0aW5nJTIwYm9hcmQlMjB3b29kfGVufDF8fHx8MTc2MTY5ODE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: "Chef's Apron",
      image: 'https://images.unsplash.com/photo-1729774092961-17486037d956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwYXByb258ZW58MXx8fHwxNzYxNjk4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Recipe Collection Book',
      image: 'https://images.unsplash.com/photo-1621139563018-0710d6fb8de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rYm9vayUyMHJlY2lwZSUyMGJvb2t8ZW58MXx8fHwxNzYxNjg1OTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Baking Tools',
      image: 'https://images.unsplash.com/photo-1556910110-a5a63dfd393c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtpbmclMjB0b29sc3xlbnwxfHx8fDE3NjE2OTgxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Mixing Bowls',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXhpbmclMjBib3dsc3xlbnwxfHx8fDE3NjE2OTgxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Measuring Cups',
      image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWFzdXJpbmclMjBjdXBzfGVufDF8fHx8MTc2MTY5ODE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Spatulas Set',
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwc3BhdHVsYXxlbnwxfHx8fDE3NjE2OTgxNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Professional Knives',
      image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwa25pdmVzfGVufDF8fHx8MTc2MTY5ODE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Cookware Sets',
      image: 'https://images.unsplash.com/photo-1584990347449-f6b6c1c5c828?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29rd2FyZSUyMHBvdHN8ZW58MXx8fHwxNzYxNjk4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Storage Containers',
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwc3RvcmFnZSUyMGNvbnRhaW5lcnN8ZW58MXx8fHwxNzYxNjk4MTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      title: 'Designer Dish Towels',
      image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdG93ZWxzfGVufDF8fHx8MTc2MTY5ODE1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  return (
    <main className="bg-background">
      {/* Breadcrumbs - Standalone */}
      <Container size="4xl" className="-mt-1.5 mb-8">
        <Breadcrumbs 
      </Container>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 lg:py-2.5 pb-12 sm:pb-16 lg:pb-20" style={{ maxWidth: '85%' }}>
        <Card 
          variant="vintage"
          className="p-6 sm:p-8 lg:p-10 xl:p-12 shadow-xl"
        >
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-green text-[36px] sm:text-[42px] lg:text-[48px]">SHOP MY KITCHEN</h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Discover my favorite kitchen tools and essentials that I use every day to create delicious recipes
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {shopItems.map((item, index) => (
              <div
                key={index}
                className="text-center"
              >
                <div className="aspect-square overflow-hidden mb-3 bg-white">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="mb-3 text-sm sm:text-base">{item.title}</h3>
                <Button variant="green" size="sm">
                  Buy This
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  );
}
