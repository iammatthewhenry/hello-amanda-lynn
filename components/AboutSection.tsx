import { Section, Card, Button, FramedImage } from '@/components/ui';

export function AboutSection() {
  return (
    <Section spacing="lg">
      {/* Page-aligned container */}
      <div className="page-container">
        <Card className="p-8 sm:p-10 lg:p-14 bg-white shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start">
              <FramedImage
                src="/images/amanda-photo.jpg"
                alt="Amanda Lynn"
                width={280}
                height={280}
                variant="small"
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-[280px] md:h-[280px] rounded-lg"
                priority
              />
            </div>

            {/* Text */}
            <div className="text-left">
              <h2 className="mb-5 text-green text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight">
                HELLO, I&apos;M AMANDA LYNN
              </h2>

              <p className="text-foreground/80 mb-7 leading-relaxed text-sm sm:text-base">
                My passion for exploration culinary arts ignited early in my life.
                Growing up in Pennsylvania, I discovered the joys of food in my
                grandmother&apos;s kitchen. Her teachings became the foundation of
                my culinary journey. Later, my wanderlust was sparked during a trip
                to Germany in college, solidifying my love for both travel and
                cooking. After college I found myself in sunny Southern California
                where I now live.
              </p>

              <Button href="/about" variant="green" size="md" rounded="md">
                My Story
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
