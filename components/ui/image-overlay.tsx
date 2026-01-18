import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ImageOverlayProps {
  children: ReactNode;
  /** Full width or 85% centered */
  fullWidth?: boolean;
  /** Position of overlay */
  position?: 'bottom' | 'center' | 'top';
  className?: string;
}

const positionStyles: Record<string, string> = {
  bottom: 'absolute bottom-4 left-1/2 -translate-x-1/2',
  center: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  top: 'absolute top-4 left-1/2 -translate-x-1/2',
};

/**
 * Image overlay component for text on images
 * Replaces: .image-text-overlay, .image-text-overlay-full CSS classes
 * 
 * Use inside a group class parent for hover effects:
 * <div className="group relative">
 *   <Image ... />
 *   <ImageOverlay>
 *     <h3>Title</h3>
 *   </ImageOverlay>
 * </div>
 */
export function ImageOverlay({
  children,
  fullWidth = false,
  position = 'bottom',
  className,
}: ImageOverlayProps) {
  return (
    <div
      className={cn(
        'bg-background-overlay/[0.93] py-2 px-4',
        positionStyles[position],
        fullWidth ? 'w-full' : 'w-[85%]',
        // Children text styling
        '[&_h2]:text-green [&_h2]:text-center [&_h2]:transition-all [&_h2]:duration-300',
        '[&_h3]:text-green [&_h3]:text-center [&_h3]:transition-all [&_h3]:duration-300',
        // Hover effects (when parent has group class)
        'group-hover:[&_h2]:font-bold group-hover:[&_h3]:font-bold',
        className
      )}
    >
      {children}
    </div>
  );
}

export default ImageOverlay;
