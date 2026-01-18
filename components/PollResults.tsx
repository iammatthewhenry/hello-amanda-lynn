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
    { rank: 1, text: 'Fresh Ingredients', percentage: 82 },
    { rank: 2, text: 'Easy to Follow Instructions', percentage: 76 },
    { rank: 3, text: 'Beautiful Food Photography', percentage: 71 },
    { rank: 4, text: 'Quick Preparation Time', percentage: 65 },
    { rank: 5, text: 'Nutritional Information', percentage: 58 }
  ],
  totalResponses = 0,
  pollLink = '/poll'
}: PollResultsProps) {
  return (
    <Container size="4xl" className="py-12 sm:py-16 lg:py-20">
      <Card variant="default" className="border-2 border-green rounded-lg p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-green text-2xl sm:text-3xl font-bold mb-2">
            {title}
          </h3>
          <p className="text-base text-foreground/70">
            {description}
          </p>
          {totalResponses > 0 && (
            <p className="text-sm text-foreground/60 mt-2">
              Based on {totalResponses.toLocaleString()} {totalResponses === 1 ? 'response' : 'responses'}
            </p>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6 mb-8">
          {results.map((item) => (
            <div key={item.rank} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green text-white flex items-center justify-center font-bold text-sm sm:text-base">
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1 sm:mb-2 gap-2">
                  <span className="text-sm sm:text-base font-medium text-foreground truncate">
                    {item.text}
                  </span>
                  <span className="text-xs sm:text-sm text-foreground/60 flex-shrink-0">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 overflow-hidden">
                  <div 
                    className="bg-green h-full transition-all duration-500"
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
        <div className="flex justify-center pt-4 sm:pt-6 border-t border-border">
          <Button href={pollLink} variant="green" size="lg" rounded="md">
            Take the Poll
          </Button>
        </div>
      </Card>
    </Container>
  );
}
