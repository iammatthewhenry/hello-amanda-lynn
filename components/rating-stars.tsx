import { ShoppingBasket } from './ui/shopping-basket';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showText?: boolean;
  className?: string;
}

export function RatingStars({ 
  rating, 
  maxRating = 5, 
  size = 20, 
  showText = true,
  className = "" 
}: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, index) => (
        <ShoppingBasket
          key={index}
          size={size}
          className={`${
            index < rating ? 'text-green' : 'text-gray-300'
          }`}
        />
      ))}
      {showText && (
        <span className="ml-2 text-sm text-muted-foreground">
          {rating}/{maxRating}
        </span>
      )}
    </div>
  );
}

export default RatingStars;
