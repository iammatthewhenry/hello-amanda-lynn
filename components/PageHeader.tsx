import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

/**
 * PageHeader component - handles page title and description only
 * Breadcrumbs should be added separately using the Breadcrumbs component
 */
export function PageHeader({ title, description, className, centered = false }: PageHeaderProps) {
  return (
    <div className={cn('py-8 sm:py-12 lg:py-16 bg-background', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn('max-w-4xl', centered && 'mx-auto text-center')}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;