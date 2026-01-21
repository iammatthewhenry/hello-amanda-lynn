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
        <div className="bg-background border-2 border-green p-6 sm:p-10">
          <div className="text-center mb-6">
            <h2 className="text-green text-xl sm:text-2xl font-bold mb-2">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              {description}
            </p>
            {totalResponses > 0 && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Based on {totalResponses.toLocaleString()} {totalResponses === 1 ? 'response' : 'responses'}
              </p>
            )}
          </div>

          <div className="space-y-3 mb-6">
            {results.map((item) => (
              <div key={item.rank} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green text-white flex items-center justify-center text-base font-semibold number-font">
                  {item.rank}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm sm:text-base font-medium">{item.text}</span>
                    <span className="text-sm sm:text-base text-muted-foreground ml-3">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-green h-1.5 rounded-full transition-all duration-500"
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
              size="sm"
              className="uppercase tracking-wider text-xs sm:text-sm px-8 py-2 rounded-none"
            >
              Take the Poll
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
