import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type CardVariant = 'default' | 'accordion' | 'feature' | 'content';

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  /** Center content (useful for feature cards) */
  centered?: boolean;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-card p-6 shadow-[0_8px_30px_rgba(0,0,0,0.18),0_2px_12px_rgba(0,0,0,0.12)]',
  accordion: 'bg-secondary p-6 shadow-[0_8px_30px_rgba(0,0,0,0.18),0_2px_12px_rgba(0,0,0,0.12)]',
  feature: 'bg-secondary p-8 shadow-[0_8px_30px_rgba(0,0,0,0.18),0_2px_12px_rgba(0,0,0,0.12)]',
  content: 'bg-content-box p-6',
};

/**
 * Card component with various styles
 * Replaces: .accordion-card, .feature-card CSS classes
 */
export function Card({
  children,
  variant = 'default',
  centered = false,
  className,
  as: Component = 'div',
}: CardProps) {
  return (
    <Component
      className={cn(
        variantStyles[variant],
        centered && 'text-center',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  as?: 'h2' | 'h3' | 'h4';
  className?: string;
}

export function CardTitle({ children, as: Component = 'h3', className }: CardTitleProps) {
  return (
    <Component className={cn('font-bold', className)}>
      {children}
    </Component>
  );
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export default Card;
