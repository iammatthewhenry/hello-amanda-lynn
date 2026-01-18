'use client';

import { FramedImage, Card } from '@/components/ui';

export default function AboutPage() {
  const aboutImage = '/images/amanda-portrait.png';
  const travelImage = '/images/amanda-restaurant.png';
  const cocktailImage = '/images/cocktail-mint.png';

  return (
    <main>
      {/* Introduction Section */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-16 sm:mb-24 lg:mb-32">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Portrait Photo - Tilted Polaroid Style */}
          <div className="flex-shrink-0 inline-flex justify-center lg:justify-start ml-[18px] lg:ml-0">
            <FramedImage
              src={aboutImage}
              alt="Amanda Lynn"
              width={300}
              height={400}
              variant="polaroid"
            />
          </div>

          {/* Introduction Text */}
          <div className="space-y-4 lg:pt-8 flex-1" style={{ marginLeft: '16px' }}>
            <p className="mt-[25px] lg:mt-0" style={{ color: '#D4A5A5', fontSize: 'clamp(38px, 4vw, 48px)', fontWeight: 'bold' }}>
              hello, I'm
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green" style={{ 
              fontFamily: 'cursive'
            }}>
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
            <FramedImage
              src={travelImage}
              alt="Travel adventures"
              width={300}
              height={400}
              variant="polaroid-right"
            />
          </div>

          {/* Text */}
          <div className="space-y-4 flex-1" style={{ marginRight: '16px' }}>
            <h2 className="text-green" style={{ fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: '600' }}>
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
            <FramedImage
              src={cocktailImage}
              alt="Culinary creations"
              width={300}
              height={400}
              variant="polaroid"
            />
          </div>

          {/* Text */}
          <div className="space-y-4 flex-1" style={{ marginLeft: '16px' }}>
            <h2 className="text-green" style={{ fontSize: 'clamp(32px, 4vw, 46px)', fontWeight: '600' }}>
              A Culinary Passion
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Creating new recipes, trying recipes from fellow chefs and exploring new restaurants and bars. The Culinary passion that started at a young age is still going strong.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[55px] 2xl:px-[80px] mb-16 sm:mb-24 lg:mb-32">
        <div className="space-y-4">
          <Card variant="accordion" className="p-6">
            <h3 className="text-lg text-green mb-2">What about SoCal do you enjoy most?</h3>
            <p className="text-foreground/70 leading-relaxed">
              I enjoy the with Weather. Growing up in Pennsylvania the winters were cold and snowy and the summers hot and humid. SoCal provided the perfect weather.
            </p>
          </Card>

          <Card variant="accordion" className="p-6">
            <h3 className="text-lg text-green mb-2">Favorite Wine?</h3>
            <p className="text-foreground/70 leading-relaxed">
              Nothing beats a Bold Red like a Cabernet Sauvignon or a Malbec.
            </p>
          </Card>

          <Card variant="accordion" className="p-6">
            <h3 className="text-lg text-green mb-2">Favorite Places to Visit</h3>
            <p className="text-foreground/70 leading-relaxed">
              Any where in the South West Desert.
            </p>
          </Card>

          <Card variant="accordion" className="p-6">
            <h3 className="text-lg text-green mb-2">Favorite food fare?</h3>
            <p className="text-foreground/70 leading-relaxed">
              That would have to be Italian. I enjoy a good parmesan chicken and minestrone soup.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}
