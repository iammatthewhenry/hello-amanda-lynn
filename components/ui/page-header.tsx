import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  /** Page title (h1) */
  title: string;
  /** Optional subtitle/description */
  description?: string | ReactNode;
  /** Center align instead of left */
  centered?: boolean;
  /** Additional content below description */
  children?: ReactNode;
  className?: string;
}

/**
 * Page header component for consistent page titles
 * Replaces: .page-header CSS class
 */
export function PageHeader({
  title,
  description,
  centered = false,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        'mb-8 sm:mb-12',
        centered ? 'text-center' : 'text-left',
        className
      )}
    >
      <h1 className="mb-4">{title}</h1>
      {description && (
        <p className={cn(
          'text-muted-foreground',
          centered ? 'max-w-2xl mx-auto' : 'max-w-2xl'
        )}>
          {description}
        </p>
      )}
      {children}
    </header>
  );
}

interface SectionHeaderProps {
  /** Section title (h2 or h3) */
  title: string;
  /** Use h3 instead of h2 */
  as?: 'h2' | 'h3';
  /** Optional subtitle */
  subtitle?: string;
  /** Center align */
  centered?: boolean;
  className?: string;
}

/**
 * Section header component for consistent section titles
 * Replaces: .page-section-header CSS class
 */
export function SectionHeader({
  title,
  as: Component = 'h2',
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        'mb-8 sm:mb-12',
        centered ? 'text-center' : 'text-left',
        className
      )}
    >
      <Component className={cn(
        'mb-3 sm:mb-4',
        Component === 'h2' && 'text-[36px]'
      )}>
        {title}
      </Component>
      {subtitle && (
        <p className="text-muted-foreground">{subtitle}</p>
      )}
    </header>
  );
}

export default PageHeader;
