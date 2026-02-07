import { forwardRef, SVGProps } from 'react';

interface ShoppingBasketProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number | string;
}

export const ShoppingBasket = forwardRef<SVGSVGElement, ShoppingBasketProps>(
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
      {/* Basket handles */}
      <path d="M7 10 L9.5 2" />
      <path d="M17 10 L14.5 2" />
      
      {/* Basket body - with matched rounded corners */}
      <path d="M4.5 10 Q4 10 4.3 11 L6 20 Q6.1 20.5 6.5 20.5 L17.5 20.5 Q17.9 20.5 18 20 L19.7 11 Q20 10 19.5 10 L4.5 10" />
      <line x1="5" y1="13" x2="19" y2="13" />
      <line x1="8" y1="13" x2="7" y2="20" />
      <line x1="12" y1="13" x2="12" y2="20" />
      <line x1="16" y1="13" x2="17" y2="20" />
    </svg>
  )
);

ShoppingBasket.displayName = 'ShoppingBasket';

export default ShoppingBasket;
