import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

/**
 * PageHeader component - handles page title and description only
 * Breadcrumbs should be added separately using the Breadcrumbs component
 */
export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn('py-8 sm:py-12 lg:py-16', className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h1>
          {description && (
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageHeader;