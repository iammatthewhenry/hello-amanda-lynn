import { DollarSign } from './ui/dollar-sign';

interface PriceRangeProps {
  price: string; // "$", "$$", "$$$", "$$$$"
  size?: number;
  className?: string;
}

export function PriceRange({ price, size = 18, className = "" }: PriceRangeProps) {
  const dollarCount = price.length;
  const maxDollars = 4; // Show up to 4 dollar signs

  return (
    <div className={`flex items-center ${className}`}>
      {Array.from({ length: maxDollars }).map((_, index) => (
        <DollarSign
          key={index}
          size={size}
          className={`${
            index < dollarCount 
              ? 'text-green' 
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default PriceRange;
