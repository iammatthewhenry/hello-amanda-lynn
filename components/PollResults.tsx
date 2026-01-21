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
        <div className="bg-background border-2 border-green rounded-lg p-8 sm:p-12 lg:p-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-green text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              {title}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              {description}
            </p>
            {totalResponses > 0 && (
              <p className="text-sm sm:text-base text-muted-foreground mt-2 sm:mt-3">
                Based on {totalResponses.toLocaleString()} {totalResponses === 1 ? 'response' : 'responses'}
              </p>
            )}
          </div>

          <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-12">
            {results.map((item) => (
              <div key={item.rank} className="flex items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green text-white flex items-center justify-center text-lg sm:text-xl font-semibold number-font">
                  {item.rank}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                    <span className="text-base sm:text-lg font-medium">{item.text}</span>
                    <span className="text-base sm:text-lg text-muted-foreground ml-4">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5">
                    <div 
                      className="bg-green h-2 sm:h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Take the Poll Button */}
          <div className="flex justify-center">
            <Button 
              href={pollLink} 
              variant="green" 
              size="lg"
              className="uppercase tracking-wider text-sm sm:text-base px-8 sm:px-12 py-3 sm:py-4 rounded-none"
            >
              Take the Poll
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
