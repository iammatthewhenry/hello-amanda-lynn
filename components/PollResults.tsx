// components/PollResults.tsx
import { Button } from '@/components/ui';

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
      <div className="mx-auto" style={{ maxWidth: '896px' }}>
        <div 
          className="bg-white rounded-xl p-6 sm:p-8 lg:p-10"
          style={{ 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '2px solid #7A9B8E'
          }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-green text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {description}
            </p>
            {totalResponses > 0 && (
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Based on {totalResponses.toLocaleString()} {totalResponses === 1 ? 'response' : 'responses'}
              </p>
            )}
          </div>

          <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
            {results.map((item) => (
              <div key={item.rank} className="flex items-center gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green text-white flex items-center justify-center text-sm sm:text-base font-bold">
                  {item.rank}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm sm:text-base font-semibold text-gray-800">{item.text}</span>
                    <span className="text-sm sm:text-base font-medium text-gray-600">{item.percentage}%</span>
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

          <div className="flex justify-center">
            <Button 
              href={pollLink} 
              variant="green" 
              size="lg"
              className="uppercase tracking-wider text-sm font-semibold px-8 py-3"
            >
              Take the Poll
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}