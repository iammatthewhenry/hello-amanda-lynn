'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { RotateCcw, Clock } from 'lucide-react';
import { Container, Button, Card } from '@/components/ui';

interface GameCard {
  id: number;
  image: string;
  name: string;
}

export default function NameThisPage() {
  const gameCards: GameCard[] = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1662422325326-19089df23d98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGJhc2lsJTIwaGVyYnxlbnwxfHx8fDE3NjI4MzE3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Basil',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1586161665517-0325578c2784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NlbWFyeSUyMGhlcmJ8ZW58MXx8fHwxNzYyNzg3OTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Rosemary',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1679061584104-534b7ec4afe6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHltZSUyMGhlcmJ8ZW58MXx8fHwxNzYyODM5MzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Thyme',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1666283331315-2eecb3330799?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJzbGV5JTIwaGVyYnxlbnwxfHx8fDE3NjI4MzkzNDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Parsley',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1601493700603-43461216807a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaWxhbnRybyUyMGhlcmJ8ZW58MXx8fHwxNzYyODM5MzQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Cilantro',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1596398998950-34508ed6d173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWdlJTIwaGVyYnxlbnwxfHx8fDE3NjI4MzkzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      name: 'Sage',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [backCardIndex, setBackCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCards, setCompletedCards] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Flash scroll past header on page load
  useEffect(() => {
    const scrollAmount = window.innerWidth >= 640 ? 82 : 67;
    window.scrollTo(0, scrollAmount);
  }, []);

  // Countdown effect
  useEffect(() => {
    if (isCountdownActive && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isCountdownActive && countdown === 0) {
      setIsCountdownActive(false);
      setIsTimerRunning(true);
    }
  }, [countdown, isCountdownActive]);

  // Stopwatch effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Stop timer when game completes
  useEffect(() => {
    if (completedCards === gameCards.length) {
      setIsTimerRunning(false);
    }
  }, [completedCards, gameCards.length]);

  const handleCardClick = () => {
    if (isTransitioning || isCountdownActive) return;

    if (!isFlipped) {
      setBackCardIndex(currentIndex);
      setIsFlipped(true);
    } else {
      setIsTransitioning(true);
      
      if (currentIndex < gameCards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setDisplayIndex(currentIndex + 1);
        setCompletedCards(completedCards + 1);
      } else {
        setCompletedCards(completedCards + 1);
      }
      
      setIsFlipped(false);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 600);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setDisplayIndex(0);
    setBackCardIndex(0);
    setIsFlipped(false);
    setCompletedCards(0);
    setCountdown(3);
    setIsCountdownActive(true);
    setElapsedTime(0);
    setIsTimerRunning(false);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const currentCard = gameCards[displayIndex];
  const backCard = gameCards[backCardIndex];
  const isGameComplete = completedCards === gameCards.length;

  return (
    <main>
      {/* Breadcrumbs */}
      <Container size="4xl" className="-mt-1.5 mb-8">
        <Breadcrumbs items={[{ label: 'In The Kitchen', href: '/in-the-kitchen' }, { label: 'Name This' }]} />
      </Container>

      {/* Game Content */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Score and Reset */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="text-lg mb-2">
              <span className="text-muted-foreground">Progress: </span>
              <span className="text-green">
                {completedCards} / {gameCards.length}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={16} />
              <span className="tabular-nums">{formatTime(elapsedTime)}</span>
            </div>
          </div>
          <Button onClick={handleReset} variant="green" size="lg">
            <RotateCcw size={18} className="mr-2" />
            Reset Game
          </Button>
        </div>

        {/* Card Stack */}
        {!isGameComplete ? (
          <div className="relative flex justify-center">
            <div className="relative w-[95%] sm:w-full sm:max-w-[314px] card-container" style={{ aspectRatio: '20/27' }}>
              {/* Countdown Overlay */}
              {isCountdownActive && countdown > 0 && (
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ zIndex: 30 }}
                >
                  <div className="countdown-circle">
                    <span className="countdown-number">{countdown}</span>
                  </div>
                </div>
              )}

              {/* Background stack cards */}
              {[1, 2, 3].map((i) => (
                <div
                  key={`stack-${i}`}
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    transform: `translateY(${i * 8}px) scale(${1 - i * 0.03})`,
                    zIndex: 10 - i,
                    opacity: currentIndex + i < gameCards.length ? 1 - i * 0.3 : 0,
                    transition: 'opacity 0.3s',
                  }}
                >
                  <div className="playing-card-back w-full h-full"></div>
                </div>
              ))}

              {/* Active Card */}
              <div
                className="absolute inset-0 cursor-pointer"
                style={{ 
                  zIndex: 20,
                  transform: 'translateY(0)',
                }}
                onClick={handleCardClick}
              >
                <div className="flip-card w-full h-full">
                  <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
                    {/* Front of Card */}
                    <div className="flip-card-front playing-card-back flex items-center justify-center p-12">
                      {!isCountdownActive && (
                        <img
                          src={currentCard.image}
                          alt="Herb"
                          className="relative z-10 max-w-[280px] max-h-[280px] w-auto h-auto object-contain rounded-lg shadow-2xl"
                        />
                      )}
                    </div>

                    {/* Back of Card */}
                    <div className="flip-card-back">
                      <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-white border border-gray-200">
                        <img
                          src={backCard.image}
                          alt={backCard.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-6 text-center border-t-4 border-green">
                          <h3 className="text-xl mb-2">{backCard.name}</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Game Complete Screen
          <div className="text-center py-20">
            <Card variant="feature" className="bg-green/10 border-4 border-green p-12 max-w-md mx-auto">
              <h2 className="mb-4">🎉 Game Complete!</h2>
              <p className="text-muted-foreground">
                You've revealed all {gameCards.length} herbs!
              </p>
            </Card>
          </div>
        )}
      </section>

      <style>{`
        @media (min-width: 640px) {
          .card-container {
            aspect-ratio: 2/3 !important;
          }
        }

        .flip-card {
          perspective: 1000px;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .flip-card-inner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        .playing-card-back {
          background: linear-gradient(135deg, #D4A5A5 0%, #C89595 100%);
          border-radius: 1rem;
          border: 8px solid white;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          position: relative;
          overflow: hidden;
        }

        .playing-card-back::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px);
        }

        .playing-card-back::after {
          content: '';
          position: absolute;
          inset: 12px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 0.5rem;
        }

        .countdown-circle {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
          animation: countdown-pulse 1s ease-in-out;
          border: 4px solid rgba(122, 155, 142, 0.6);
        }

        .countdown-number {
          font-size: 96px;
          font-weight: bold;
          color: #7A9B8E;
          line-height: 1;
          text-shadow: 0 2px 8px rgba(255, 255, 255, 0.8);
        }

        @keyframes countdown-pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
}
