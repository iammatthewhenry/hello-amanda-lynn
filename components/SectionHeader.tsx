import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string | ReactNode;
  className?: string;
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: {
    title: 'text-xl sm:text-2xl',
    subtitle: 'text-sm'
  },
  md: {
    title: 'text-2xl sm:text-3xl',
    subtitle: 'text-base'
  },
  lg: {
    title: 'text-3xl sm:text-4xl lg:text-5xl',
    subtitle: 'text-lg'
  },
  xl: {
    title: 'text-4xl sm:text-5xl lg:text-6xl',
    subtitle: 'text-xl'
  }
};

export function SectionHeader({ 
  title, 
  subtitle, 
  className, 
  centered = false,
  size = 'lg'
}: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-8 sm:mb-12',
      centered && 'text-center',
      className
    )}>
      <h2 className={cn(
        'font-bold text-green tracking-tight mb-4',
        sizeClasses[size].title
      )}>
        {title}
      </h2>
      {subtitle && (
        <div className={cn(
          'text-muted-foreground',
          sizeClasses[size].subtitle
        )}>
          {subtitle}
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
