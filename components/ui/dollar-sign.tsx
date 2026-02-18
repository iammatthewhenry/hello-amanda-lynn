import { forwardRef, SVGProps } from 'react';

interface DollarSignProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

export const DollarSign = forwardRef<SVGSVGElement, DollarSignProps>(
  ({ size = 24, color = 'currentColor', strokeWidth = 1.5, className, ...props }, ref) => (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
);

DollarSign.displayName = 'DollarSign';

export default DollarSign;
