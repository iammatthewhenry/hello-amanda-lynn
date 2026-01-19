import { Container, Button, Card } from '@/components/ui';

export interface PollResultItem {
  rank: number;
  text: string;
  percentage: number;
}

interface PollResultsProps {
  title?: string;
  description?: string;
  results?: PollResultItem[];
  totalResponses?: number;
  pollLink?: string;
}

export function PollResults({
  title = 'Poll Results',
  description = "Here's what our community loves most",
  results = [
    { rank: 1, text: 'Outstanding Cookies', percentage: 82 },
    { rank: 2, text: 'Nice Cakes', percentage: 76 },
    { rank: 3, text: 'Sweet Home', percentage: 71 },
    { rank: 4, text: 'Absolute', percentage: 65 },
    { rank: 5, text: 'Apple Pie', percentage: 58 }
  ],
  totalResponses = 0,
  pollLink = '/poll'
}: PollResultsProps) {
  return (
    <Container size="4xl" className="py-16 sm:py-20">
      <Card variant="default" className="border border-gray-200 rounded-lg p-8 sm:p-12 bg-white max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            {title}
          </h3>
          <p className="text-sm text-foreground/70">
            {description}
          </p>
        </div>

        <div className="space-y-5 mb-8">
          {results.map((item) => (
            <div key={item.rank} className="flex items-center gap-4">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-green text-white flex items-center justify-center font-semibold text-sm">
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2 gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {item.text}
                  </span>
                  <span className="text-sm text-foreground/60 flex-shrink-0">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-green h-full transition-all duration-500 ease-out"
                    style={{ width: `${item.percentage}%` }}
                    role="progressbar"
                    aria-valuenow={item.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Take the Poll Button */}
        <div className="flex justify-center pt-6 border-t border-gray-200">
          <Button href={pollLink} variant="green" size="md" rounded="md">
            Take the Poll
          </Button>
        </div>
      </Card>
    </Container>
  );
}
