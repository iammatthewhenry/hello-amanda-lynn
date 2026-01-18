import { Section, Card, Button, FramedImage } from '@/components/ui';

export function AboutSection() {
  return (
    <Section spacing="lg" containerSize="7xl" className="max-w-[95%] sm:max-w-[85%]">
      <Card className="p-8 sm:p-10 lg:p-12 bg-background">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          <div className="flex-shrink-0">
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
          <div className="flex-1 text-left">
            <h2 className="mb-3 sm:mb-4 text-green text-[36px] font-bold">
              HELLO, I'M AMANDA LYNN
            </h2>
            <p className="text-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              My passion for exploration culinary arts ignited early in my life. Growing up in Pennsylvania, I discovered the joys of food in my grandmother's kitchen. Her teachings became the foundation of my culinary journey. Later, my wanderlust was sparked during a trip to Germany in college, solidifying my love for both travel and cooking. After college I found my self in sunny Southern California where I now live.
            </p>
            <Button href="/about" variant="green" size="md">
              My Story
            </Button>
          </div>
        </div>
      </Card>
    </Section>
  );
}
