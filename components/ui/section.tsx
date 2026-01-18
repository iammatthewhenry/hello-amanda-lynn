import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container, type ContainerSize } from './container';

export type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface SectionProps {
  children: ReactNode;
  /** Vertical padding size */
  spacing?: SectionSpacing;
  /** Container max-width */
  containerSize?: ContainerSize;
  /** Use responsive padding */
  responsive?: boolean;
  /** Skip container wrapper */
  noContainer?: boolean;
  /** Background color class */
  bg?: string;
  className?: string;
  id?: string;
}

const spacingStyles: Record<SectionSpacing, string> = {
  none: '',
  sm: 'py-8 sm:py-10',
  md: 'py-12 sm:py-16',
  lg: 'py-12 sm:py-16 lg:py-20',
  xl: 'py-16 sm:py-20 lg:py-24',
};

/**
 * Section component for consistent page sections
 * Replaces: .section-spacing combined with container classes
 */
export function Section({
  children,
  spacing = 'lg',
  containerSize = '7xl',
  responsive = false,
  noContainer = false,
  bg,
  className,
  id,
}: SectionProps) {
  const content = noContainer ? (
    children
  ) : (
    <Container size={containerSize} responsive={responsive}>
      {children}
    </Container>
  );

  return (
    <section
      id={id}
      className={cn(spacingStyles[spacing], bg, className)}
    >
      {content}
    </section>
  );
}

export default Section;
