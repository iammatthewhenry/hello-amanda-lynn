import { Container, Button } from '@/components/ui';

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
    { rank: 1, text: 'Chocolate Chip Cookies', percentage: 82 },
    { rank: 2, text: 'Ice Cream', percentage: 76 },
    { rank: 3, text: 'Cheesecake', percentage: 71 },
    { rank: 4, text: 'Brownies', percentage: 65 },
    { rank: 5, text: 'Apple Pie', percentage: 58 }
  ],
  totalResponses = 0,
  pollLink = '/poll'
}: PollResultsProps) {
  return (
    <section className="py-[22px] sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '896px' }}>
        <div className="bg-background border-2 border-green rounded-lg p-3 sm:p-8">
          <div className="text-center mb-3 sm:mb-6">
            <h3 className="text-green text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
              {title}
            </h3>
            <p className="text-xs sm:text-base text-muted-foreground">
              {description}
            </p>
            {totalResponses > 0 && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 sm:mt-2">
                Based on {totalResponses.toLocaleString()} {totalResponses === 1 ? 'response' : 'responses'}
              </p>
            )}
          </div>

          <div className="space-y-2 sm:space-y-3">
            {results.map((item) => (
              <div key={item.rank} className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green text-white flex items-center justify-center text-xs sm:text-base font-semibold number-font">
                  {item.rank}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5 sm:mb-1">
                    <span className="text-xs sm:text-base font-medium">{item.text}</span>
                    <span className="text-xs sm:text-sm text-muted-foreground ml-2">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                    <div 
                      className="bg-green h-1.5 sm:h-2 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Take the Poll Button */}
          <div className="mt-4 sm:mt-8 flex justify-center">
            <Button 
              href={pollLink} 
              variant="green" 
              size="md"
              className="uppercase tracking-wider text-xs sm:text-sm"
            >
              Take the Poll
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
