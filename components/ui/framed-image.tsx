import Image from 'next/image';
import { cn } from '@/lib/utils';

export type FrameVariant = 'standard' | 'tilted' | 'small' | 'recipe' | 'polaroid' | 'polaroid-right';

interface FramedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** Frame style variant */
  variant?: FrameVariant;
  /** Use priority loading */
  priority?: boolean;
  /** Fill parent container */
  fill?: boolean;
  /** Object fit style */
  objectFit?: 'cover' | 'contain' | 'fill';
  className?: string;
  /** Container className */
  containerClassName?: string;
}

const variantStyles: Record<FrameVariant, string> = {
  standard: 'border-[16px] border-white shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_8px_rgba(0,0,0,0.08)]',
  tilted: 'border-8 sm:border-[16px] border-white -rotate-[6deg] shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_8px_rgba(0,0,0,0.08)]',
  small: 'border-[8px] border-white shadow-[0_0_15px_rgba(0,0,0,0.1),0_0_8px_rgba(0,0,0,0.08)]',
  recipe: 'border-4 border-white shadow-[0_0_6px_rgba(0,0,0,0.1),0_0_4px_rgba(0,0,0,0.06)]',
  polaroid: 'bg-white p-3 lg:p-4 -rotate-[5deg] max-w-[200px] lg:max-w-[300px] shadow-[0_0_20px_rgba(0,0,0,0.12),0_0_12px_rgba(0,0,0,0.1)]',
  'polaroid-right': 'bg-white p-3 lg:p-4 rotate-[5deg] max-w-[200px] lg:max-w-[300px] shadow-[0_0_20px_rgba(0,0,0,0.12),0_0_12px_rgba(0,0,0,0.1)]',
};

/**
 * Framed image component with various border styles
 * Replaces: .image-border-*, .polaroid-image CSS classes
 */
export function FramedImage({
  src,
  alt,
  width,
  height,
  variant = 'standard',
  priority = false,
  fill = false,
  objectFit = 'cover',
  className,
  containerClassName,
}: FramedImageProps) {
  const isPolaroid = variant === 'polaroid' || variant === 'polaroid-right';

  if (fill) {
    return (
      <div className={cn('relative', variantStyles[variant], containerClassName)}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn(`object-${objectFit}`, className)}
        />
      </div>
    );
  }

  // For polaroid style, wrap image in a div
  if (isPolaroid) {
    return (
      <div className={cn(variantStyles[variant], containerClassName)}>
        <Image
          src={src}
          alt={alt}
          width={width || 300}
          height={height || 300}
          priority={priority}
          className={cn(`object-${objectFit} w-full h-auto`, className)}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 400}
      height={height || 300}
      priority={priority}
      className={cn(variantStyles[variant], `object-${objectFit}`, className)}
    />
  );
}

export default FramedImage;
