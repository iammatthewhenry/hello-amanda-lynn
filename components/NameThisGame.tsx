'use client';

import { useState } from 'react';
import { Button } from './ui';
import Image from 'next/image';

export interface NameThisGameProps {
  gameTitle?: string;
  gameDescription?: string;
  imageUrl?: string;
  correctAnswer?: string;
  hint?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export function NameThisGame({
  gameTitle = 'Name This Dish!',
  gameDescription = 'Can you guess what this delicious creation is?',
  imageUrl = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
  correctAnswer = 'Salad',
  hint = 'It\'s fresh and healthy!',
  difficulty = 'medium'
}: NameThisGameProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hasGuessed, setHasGuessed] = useState(false);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;
    
    const isAnswerCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setHasGuessed(true);
  };

  const handleReset = () => {
    setUserAnswer('');
    setShowHint(false);
    setIsCorrect(null);
    setHasGuessed(false);
  };

  return (
    <section className="py-[22px] sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '896px' }}>
        <div 
          className="bg-white rounded-xl p-6 sm:p-8 lg:p-10"
          style={{ 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            border: '2px solid #7A9B8E'
          }}
        >
          <div className="text-center mb-6">
            <h3 className="text-green text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              {gameTitle}
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              {gameDescription}
            </p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
              difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {difficulty.toUpperCase()}
            </span>
          </div>

          {/* Image */}
          <div className="mb-6 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt="Guess this dish"
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Game Input */}
          {!hasGuessed ? (
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="Enter your answer..."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green text-base"
                />
              </div>

              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={handleSubmit}
                  variant="green" 
                  size="lg"
                  className="uppercase tracking-wider text-sm font-semibold"
                >
                  Submit Answer
                </Button>
                
                {hint && !showHint && (
                  <Button 
                    onClick={() => setShowHint(true)}
                    variant="outline" 
                    size="lg"
                    className="uppercase tracking-wider text-sm font-semibold"
                  >
                    Show Hint
                  </Button>
                )}
              </div>

              {showHint && hint && (
                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg text-center">
                  <p className="text-sm font-medium text-yellow-800">
                    💡 Hint: {hint}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Result Display */}
              <div className={`p-6 rounded-lg text-center ${
                isCorrect 
                  ? 'bg-green-50 border-2 border-green-500' 
                  : 'bg-red-50 border-2 border-red-500'
              }`}>
                <p className={`text-2xl font-bold mb-2 ${
                  isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {isCorrect ? '🎉 Correct!' : '❌ Not Quite'}
                </p>
                <p className="text-base text-gray-700">
                  {isCorrect 
                    ? `Great job! It was ${correctAnswer}!` 
                    : `The correct answer was: ${correctAnswer}`
                  }
                </p>
              </div>

              {/* Play Again Button */}
              <div className="flex justify-center">
                <Button 
                  onClick={handleReset}
                  variant="green" 
                  size="lg"
                  className="uppercase tracking-wider text-sm font-semibold"
                >
                  Play Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
