'use client';

import Image from 'next/image';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumbs - Now matches recipe category page positioning */}
       items={[{ label: 'About' }]} />

      <main className="pt-6 sm:pt-8">
        {/* Introduction Section */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-16 sm:mb-24 lg:mb-32">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Portrait Photo - Tilted Polaroid Style */}
            <div className="flex-shrink-0 inline-flex justify-center lg:justify-start ml-[18px] lg:ml-0">
              <div className="polaroid-image">
                <Image
                  src="/images/amanda-portrait.png"
                  alt="Amanda Lynn"
                  width={250}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Introduction Text */}
            <div className="space-y-4 lg:pt-8 flex-1 ml-4">
              <p className="mt-[25px] lg:mt-0 text-[#D4A5A5] font-bold" style={{ fontSize: 'clamp(38px, 4vw, 48px)' }}>
                hello, I'm
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green font-script">
                Amanda Lynn
              </h1>
              <p className="text-foreground/70 leading-relaxed">
                My passion for exploration culinary arts ignited early in my life. Growing up in Pennsylvania, I discovered this passion in my grandmother's kitchen. Her teachings became the foundation of my culinary journey. Later, my wanderlust was sparked during a trip to Germany in college, solidifying my love for both travel and culinary arts. After college, I found my self in sunny Southern California where I now live.
              </p>
            </div>
          </div>
        </section>

        {/* A Passion For Exploring */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-16 sm:mb-24 lg:mb-32">
          <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-8 items-center">
            {/* Travel Photo - Tilted Polaroid Style */}
            <div className="flex-shrink-0 flex justify-center lg:justify-end ml-[18px] lg:ml-0">
              <div className="polaroid-image-right">
                <Image
                  src="/images/amanda-restaurant.png"
                  alt="Travel adventures"
                  width={250}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-4 flex-1 mr-4">
              <h2 className="text-green font-semibold" style={{ fontSize: 'clamp(32px, 4vw, 46px)' }}>
                A Passion For Exploring
              </h2>
              <p className="text-foreground/70 leading-relaxed">
                The wanderlust for travel I experienced in college still exists to this day. My travels today take me not only far and wide but also close an near. I am all ways looking for new locals, activities, and culinary experiences.
              </p>
            </div>
          </div>
        </section>

        {/* A Culinary Passion */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-16 sm:mb-24">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">
            {/* Cocktail Photo - Tilted Polaroid Style */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start ml-[18px] lg:ml-0">
              <div className="polaroid-image">
                <Image
                  src="/images/cocktail-mint.png"
                  alt="Culinary creations"
                  width={250}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Text */}
            <div className="space-y-4 flex-1 ml-4">
              <h2 className="text-green font-semibold" style={{ fontSize: 'clamp(32px, 4vw, 46px)' }}>
                A Culinary Passion
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Creating new recipes, trying recipes from fellow chefs and exploring new restaurants and bars. The Culinary passion that started at a young age is still going strong.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[55px] 2xl:px-[80px] mb-16 sm:mb-24 lg:mb-32">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border-none">
              <div className="p-6 bg-secondary" style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}>
                <AccordionTrigger className="hover:no-underline py-0 text-base">
                  <span className="text-lg text-green">What about SoCal do you enjoy most?</span>
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  <p className="text-foreground/70 leading-relaxed">
                    I enjoy the with Weather. Growing up in Pennsylvania the winters were cold and snowy and the summers hot and humid. SoCal provided the perfect weather.
                  </p>
                </AccordionContent>
              </div>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-none">
              <div className="p-6 bg-secondary" style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}>
                <AccordionTrigger className="hover:no-underline py-0 text-base">
                  <span className="text-lg text-green">Favorite Wine?</span>
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  <p className="text-foreground/70 leading-relaxed">
                    Nothing beats a Bold Red like a Cabernet Sauvignon or a Malbec.
                  </p>
                </AccordionContent>
              </div>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-none">
              <div className="p-6 bg-secondary" style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}>
                <AccordionTrigger className="hover:no-underline py-0 text-base">
                  <span className="text-lg text-green">Favorite Places to Visit</span>
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  <p className="text-foreground/70 leading-relaxed">
                    Any where in the South West Desert.
                  </p>
                </AccordionContent>
              </div>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-none">
              <div className="p-6 bg-secondary" style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}>
                <AccordionTrigger className="hover:no-underline py-0 text-base">
                  <span className="text-lg text-green">Favorite food fare?</span>
                </AccordionTrigger>
                <AccordionContent className="text-base">
                  <p className="text-foreground/70 leading-relaxed">
                    That would have to be Italian. I enjoy a good parmesan chicken and minestrone soup.
                  </p>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        </section>
      </main>
    </>
  );
}
