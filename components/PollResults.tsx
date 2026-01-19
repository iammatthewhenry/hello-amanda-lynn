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
    <Container size="4xl" className="py-6 sm:py-16 lg:py-20">
      {/* Using exact Figma colors: border-green and bg with warm peachy tone */}
      <div 
        className="border-2 border-green rounded-lg p-3 sm:p-8 shadow-card" 
        style={{ backgroundColor: '#FEFAF8' }}
      >
        <div className="text-center mb-3 sm:mb-6">
          <h3 className="text-green text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">
            {title}
          </h3>
          <p className="text-xs sm:text-base text-foreground/70">
            {description}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {results.map((item) => (
            <div key={item.rank} className="flex items-center gap-2 sm:gap-3">
              <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green text-white flex items-center justify-center text-xs sm:text-base font-semibold">
                {item.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5 sm:mb-1 gap-2">
                  <span className="text-xs sm:text-base font-medium text-foreground">
                    {item.text}
                  </span>
                  <span className="text-xs sm:text-sm text-foreground/60 flex-shrink-0">
                    {item.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                  <div 
                    className="bg-green h-full transition-all duration-500 ease-out rounded-full"
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
    </Container>
  );
}
