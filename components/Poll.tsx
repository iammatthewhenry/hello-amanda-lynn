'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Container, Button } from '@/components/ui';

// Cookie helper functions
function setCookie(name: string, value: string, days: number = 365) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }
  return null;
}

export interface PollItem {
  id: string;
  text: string;
}

interface PollProps {
  cookieName?: string;
  availableChoices?: PollItem[];
  numRankings?: number;
  showTitle?: boolean;
  showDescription?: boolean;
  title?: string;
  description?: string;
  submittedTitle?: string;
  submittedDescription?: string;
}

const DEFAULT_ITEMS: PollItem[] = [
  { id: '1', text: 'Fresh Ingredients' },
  { id: '2', text: 'Easy to Follow Instructions' },
  { id: '3', text: 'Quick Preparation Time' },
  { id: '4', text: 'Beautiful Food Photography' },
  { id: '5', text: 'Nutritional Information' },
  { id: '6', text: 'Step-by-Step Photos' },
  { id: '7', text: 'Make-Ahead Options' },
  { id: '8', text: 'Substitution Suggestions' },
  { id: '9', text: 'Dietary Modifications' },
  { id: '10', text: 'Cooking Tips & Tricks' },
  { id: '11', text: 'Storage Instructions' },
  { id: '12', text: 'Serving Suggestions' },
  { id: '13', text: 'Recipe Video' },
  { id: '14', text: 'Print-Friendly Format' },
  { id: '15', text: 'User Reviews & Ratings' },
];

export function Poll({
  cookieName = 'poll_completed',
  availableChoices = DEFAULT_ITEMS,
  numRankings = 5,
  showTitle = true,
  showDescription = true,
  title = 'What Matters Most To You?',
  description = `Rank your top ${numRankings} priorities by clicking and dragging items below.`,
  submittedTitle = 'Thank You!',
  submittedDescription = 'Your survey response has been recorded.',
}: PollProps) {
  const [availableItems, setAvailableItems] = useState<PollItem[]>(availableChoices);
  const [rankedItems, setRankedItems] = useState<(PollItem | null)[]>(Array(numRankings).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [draggedItem, setDraggedItem] = useState<PollItem | null>(null);
  const [dragSource, setDragSource] = useState<'available' | 'ranked' | null>(null);

  // Check if user has already completed the poll
  useEffect(() => {
    const pollCompleted = getCookie(cookieName);
    const savedRankedItems = getCookie(`${cookieName}_rankings`);
    
    if (pollCompleted === 'true' && savedRankedItems) {
      try {
        const parsed = JSON.parse(savedRankedItems);
        setRankedItems(parsed);
        setIsSubmitted(true);
      } catch (e) {
        console.error('Failed to parse saved poll data');
      }
    }
  }, [cookieName]);

  const handleDragStart = (item: PollItem, source: 'available' | 'ranked') => {
    setDraggedItem(item);
    setDragSource(source);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnRanked = (targetIndex: number) => {
    if (!draggedItem) return;

    // Can only drop on empty slots
    if (rankedItems[targetIndex] !== null) return;

    // Only allow from available list
    if (dragSource !== 'available') return;

    setRankedItems((current) => {
      const newRanked = [...current];
      newRanked[targetIndex] = draggedItem;
      return newRanked;
    });

    setAvailableItems((current) =>
      current.filter((item) => item.id !== draggedItem.id)
    );

    setDraggedItem(null);
    setDragSource(null);
  };

  const handleRemove = (id: string) => {
    const item = rankedItems.find((i) => i?.id === id);
    if (!item) return;

    setRankedItems((current) =>
      current.map((i) => (i?.id === id ? null : i))
    );

    const originalIndex = availableChoices.findIndex((i) => i.id === id);
    setAvailableItems((current) => {
      const newAvailable = [...current];
      let insertIndex = 0;

      for (let i = 0; i < newAvailable.length; i++) {
        const currentItemOriginalIndex = availableChoices.findIndex(
          (initial) => initial.id === newAvailable[i].id
        );
        if (currentItemOriginalIndex > originalIndex) {
          insertIndex = i;
          break;
        }
        insertIndex = i + 1;
      }

      newAvailable.splice(insertIndex, 0, item);
      return newAvailable;
    });
  };

  const handleSubmit = () => {
    const filledItems = rankedItems.filter((item) => item !== null);
    if (filledItems.length === numRankings) {
      setIsSubmitted(true);
      setCookie(cookieName, 'true');
      setCookie(`${cookieName}_rankings`, JSON.stringify(rankedItems));
    } else {
      alert(`Please rank all ${numRankings} items before submitting!`);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white">
        <Container size="4xl" className="py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            {showTitle && (
              <h1 className="text-green text-3xl sm:text-4xl font-bold mb-4">
                {submittedTitle}
              </h1>
            )}
            {showDescription && (
              <p className="text-lg text-foreground/70 mb-8">
                {submittedDescription}
              </p>
            )}
            <div className="bg-white border-2 border-green rounded-lg p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">
                Your Top {numRankings} Priorities:
              </h2>
              <div className="space-y-4">
                {rankedItems.map((item, index) =>
                  item ? (
                    <div key={item.id} className="flex items-center gap-4 text-left">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-green rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <span className="text-base sm:text-lg font-medium">
                        {item.text}
                      </span>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const filledCount = rankedItems.filter((i) => i !== null).length;

  return (
    <div className="bg-white">
      <Container size="4xl" className="py-12 sm:py-16 lg:py-20">
        {/* Header */}
        {(showTitle || showDescription) && (
          <div className="text-center mb-12">
            {showTitle && (
              <h1 className="text-green text-3xl sm:text-4xl font-bold mb-4">
                {title}
              </h1>
            )}
            {showDescription && (
              <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Ranked Items Grid */}
        <div className="mb-12">
          <h2 className="text-center text-xl sm:text-2xl font-bold text-green mb-6">
            Your Top {numRankings}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
            {rankedItems.map((item, index) => (
              <div key={`ranked-${index}`}>
                {item ? (
                  <div
                    className="bg-white border-2 border-green rounded-lg p-4 relative"
                    draggable={false}
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-green rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                        {index + 1}
                      </div>
                      <p className="text-sm font-medium flex-1 break-words">
                        {item.text}
                      </p>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="flex-shrink-0 text-green hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={() => handleDropOnRanked(index)}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-drop hover:border-green hover:bg-green/5 transition-all min-h-[120px] sm:min-h-[140px] flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-gray-400 mb-2">
                        {index + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-foreground/50">
                        Drop here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mb-12">
          <Button
            onClick={handleSubmit}
            disabled={filledCount < numRankings}
            variant={filledCount === numRankings ? 'green' : 'outline'}
            size="lg"
            rounded="md"
            className={filledCount < numRankings ? 'bg-gray-300 text-foreground/50 cursor-not-allowed border-gray-300' : ''}
          >
            {filledCount === numRankings
              ? 'Submit Poll'
              : `Select ${numRankings - filledCount} more`}
          </Button>
        </div>

        {/* Available Items Grid */}
        <div>
          <h2 className="text-center text-xl sm:text-2xl font-bold mb-6">
            Available Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {availableItems.length > 0 ? (
              availableItems.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={() => handleDragStart(item, 'available')}
                  className={`border-2 border-green rounded-lg p-4 cursor-move hover:shadow-md transition-all ${
                    draggedItem?.id === item.id ? 'opacity-50 bg-gray-100' : ''
                  }`}
                >
                  <p className="text-sm sm:text-base font-medium break-words">
                    {item.text}
                  </p>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-foreground/50 py-8">
                All items have been ranked!
              </p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
