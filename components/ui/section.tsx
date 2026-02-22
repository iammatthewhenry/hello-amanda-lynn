import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';
  background?: 'transparent' | 'white' | 'muted';
}

const spacingClasses = {
  sm: 'py-6 sm:py-8',
  md: 'py-8 sm:py-12',
  lg: 'py-8 sm:py-16 lg:py-20',
  xl: 'py-12 sm:py-20 lg:py-24'
};

const backgroundClasses = {
  transparent: '',
  white: 'bg-white',
  muted: 'bg-muted'
};

export function Section({ 
  children, 
  className, 
  spacing = 'lg',
  containerSize = '4xl',
  background = 'transparent'
}: SectionProps) {
  return (
    <section className={cn(
      spacingClasses[spacing],
      backgroundClasses[background],
      className
    )}>
      {children}
    </section>
  );
}

export default Section;
