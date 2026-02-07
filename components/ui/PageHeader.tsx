import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  className?: string;
  centered?: boolean;
}

export function PageHeader({ 
  title, 
  description, 
  className, 
  centered = false 
}: PageHeaderProps) {
  return (
    <div className={cn(
      'mb-12 sm:mb-16',
      centered && 'text-center',
      className
    )}>
      <h1 className={cn(
        'text-4xl sm:text-5xl lg:text-6xl font-bold text-green tracking-tight mb-6',
        'leading-tight'
      )}>
        {title}
      </h1>
      {description && (
        <div className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
