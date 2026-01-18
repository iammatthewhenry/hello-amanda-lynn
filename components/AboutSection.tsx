import { Section, Card, Button, FramedImage } from '@/components/ui';

export function AboutSection() {
  return (
    <Section spacing="lg">
      {/* Page-aligned container */}
      <div className="page-container">
        <Card className="p-8 sm:p-10 lg:p-12 bg-background">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <FramedImage
                src="/images/amanda-photo.jpg"
                alt="Amanda Lynn"
                width={256}
                height={256}
                variant="small"
                className="w-36 h-36 sm:w-52 sm:h-52 lg:w-64 lg:h-64 rounded-lg"
                priority
              />
            </div>

            {/* Text */}
            <div className="text-left">
              <h2 className="mb-4 text-green text-[36px] font-bold">
                HELLO, I&apos;M AMANDA LYNN
              </h2>

              <p className="text-foreground mb-6 leading-relaxed text-sm sm:text-base">
                My passion for exploration culinary arts ignited early in my life.
                Growing up in Pennsylvania, I discovered the joys of food in my
                grandmother&apos;s kitchen. Her teachings became the foundation of
                my culinary journey. Later, my wanderlust was sparked during a trip
                to Germany in college, solidifying my love for both travel and
                cooking. After college I found myself in sunny Southern California
                where I now live.
              </p>

              <Button href="/about" variant="green" size="md">
                My Story
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
