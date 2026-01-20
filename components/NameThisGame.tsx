import { useState } from 'react';
import { Button } from './ui';
import Image from 'next/image';

interface GameItem {
  id: string;
  image: string;
  correctAnswer: string;
  options: string[];
  hint?: string;
}

interface NameThisGameProps {
  items?: GameItem[];
}

const DEFAULT_ITEMS: GameItem[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1574653853027-5a2d0275c0dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    correctAnswer: 'Whisk',
    options: ['Whisk', 'Beater', 'Mixer', 'Stirrer'],
    hint: 'Used for whipping cream and beating eggs',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    correctAnswer: 'Mandoline',
    options: ['Mandoline', 'Slicer', 'Grater', 'Peeler'],
    hint: 'Creates perfectly thin, uniform slices',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1565376872409-0d6efe2b7e86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
    correctAnswer: 'Mortar and Pestle',
    options: ['Mortar and Pestle', 'Grinder', 'Crusher', 'Bowl and Stick'],
    hint: 'Traditional tool for grinding spices and herbs',
  },
];

export function NameThisGame({ items = DEFAULT_ITEMS }: NameThisGameProps) {
  const [currentItem, setCurrentItem] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    if (answer === items[currentItem].correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentItem < items.length - 1) {
      setCurrentItem(currentItem + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetGame = () => {
    setCurrentItem(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const isGameComplete = currentItem === items.length - 1 && showResult;
  const currentGameItem = items[currentItem];

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-green mb-4">
            Name This Kitchen Tool!
          </h2>
          <p className="text-muted-foreground mb-2">
            Test your kitchen knowledge with this fun game
          </p>
          <p className="text-sm text-muted-foreground">
            Score: {score} / {items.length} | Question {currentItem + 1} of {items.length}
          </p>
        </div>

        {!isGameComplete ? (
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-green/20">
            <div className="text-center mb-6">
              <div className="relative w-64 h-64 mx-auto mb-4">
                <Image
                  src={currentGameItem.image}
                  alt="Kitchen tool"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              {currentGameItem.hint && (
                <p className="text-sm text-muted-foreground italic">
                  Hint: {currentGameItem.hint}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {currentGameItem.options.map((option) => (
                <Button
                  key={option}
                  variant={
                    showResult
                      ? option === currentGameItem.correctAnswer
                        ? 'green'
                        : option === selectedAnswer
                        ? 'destructive'
                        : 'outline'
                      : selectedAnswer === option
                      ? 'green'
                      : 'outline'
                  }
                  className="h-12"
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                >
                  {option}
                </Button>
              ))}
            </div>

            {showResult && (
              <div className="text-center">
                <p className="mb-4">
                  {selectedAnswer === currentGameItem.correctAnswer ? (
                    <span className="text-green font-semibold">Correct! 🎉</span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Incorrect. The answer was: {currentGameItem.correctAnswer}
                    </span>
                  )}
                </p>
                {currentItem < items.length - 1 ? (
                  <Button onClick={nextQuestion} variant="green">
                    Next Question
                  </Button>
                ) : null}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-green text-center">
            <h3 className="text-2xl font-bold text-green mb-4">Game Complete!</h3>
            <p className="text-lg mb-6">
              Final Score: {score} / {items.length}
            </p>
            <p className="text-muted-foreground mb-6">
              {score === items.length
                ? "Perfect! You're a kitchen tool expert! 🏆"
                : score >= items.length * 0.7
                ? "Great job! You know your way around the kitchen! 👏"
                : "Keep practicing - you'll get better! 💪"}
            </p>
            <Button onClick={resetGame} variant="green">
              Play Again
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
