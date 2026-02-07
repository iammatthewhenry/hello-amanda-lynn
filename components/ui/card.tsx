import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost' | 'vintage';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const variantClasses = {
  default: 'bg-white border border-gray-200',
  outline: 'border border-gray-200',
  ghost: '',
  vintage: 'bg-white border-2 border-green/20'
};

const paddingClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8'
};

export function Card({ 
  children, 
  className, 
  variant = 'default',
  padding = 'lg'
}: CardProps) {
  return (
    <div 
      className={cn(
        'rounded-lg',
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      style={variant === 'vintage' ? { boxShadow: 'var(--shadow-card)' } : undefined}
    >
      {children}
    </div>
  );
}

export default Card;
