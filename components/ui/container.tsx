import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '4xl' | '7xl';

interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  /** Use viewport-based padding on mobile */
  responsive?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
}

const sizeStyles: Record<ContainerSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '4xl': 'max-w-4xl',
  '7xl': 'max-w-7xl',
};

/**
 * Container component for consistent page layout
 * Replaces: .container-max, .container-max-4xl, .container-responsive
 */
export function Container({
  children,
  size = '7xl',
  responsive = false,
  className,
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={cn(
        sizeStyles[size],
        'mx-auto',
        responsive ? 'px-[4vw] sm:px-6 lg:px-8' : 'px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </Component>
  );
}

export default Container;
