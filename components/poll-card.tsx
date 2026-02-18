import Link from 'next/link';
import { Container } from '@/components/container';
import { Card, Button } from '@/components/ui';

interface PollCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
  linkTo?: string;
}

export function PollCard({
  title = 'Take Our Poll',
  description = 'Share what matters most to you in a recipe. Your poll response helps us create better content for you!',
  buttonText = 'Take Our Poll',
  linkTo = '/poll'
}: PollCardProps) {
  return (
    <Container size="4xl" className="py-12 sm:py-16 lg:py-20">
      <Link href={linkTo} className="block group">
        <Card variant="default" className="border-2 border-green rounded-lg p-8 sm:p-12 text-center hover:shadow-lg transition-shadow">
          <h2 className="text-green text-2xl sm:text-3xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-lg text-foreground/70 mb-6 max-w-2xl mx-auto">
            {description}
          </p>
          <div className="inline-block bg-green text-white px-8 py-3 rounded-lg font-semibold group-hover:opacity-90 transition-opacity">
            {buttonText}
          </div>
        </Card>
      </Link>
    </Container>
  );
}
