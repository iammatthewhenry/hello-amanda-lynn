'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'green' | 'green-hover' | 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: 'none' | 'md' | 'lg' | 'full';
  fullWidth?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: never;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  external?: boolean;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<ButtonVariant, string> = {
  green: 'bg-green text-green-foreground hover:opacity-80 transition-opacity',
  'green-hover': 'bg-green text-green-foreground hover:bg-green-hover transition-colors',
  primary: 'bg-primary text-button-text hover:bg-primary-hover transition-colors',
  outline: 'border-2 border-green text-green hover:bg-green hover:text-green-foreground transition-colors',
  ghost: 'text-green hover:bg-green/10 transition-colors',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-base',
  xl: 'px-10 py-3.5 text-lg',
};

const roundedStyles: Record<string, string> = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'green',
      size = 'md',
      rounded = 'lg',
      fullWidth = false,
      children,
      className,
      ...rest
    } = props;

    const baseStyles = cn(
      'inline-flex items-center justify-center font-medium',
      variantStyles[variant],
      sizeStyles[size],
      roundedStyles[rounded],
      fullWidth && 'w-full',
      className
    );

    // Link variant
    if ('href' in props && props.href) {
      const { href, external, ...linkRest } = props as ButtonAsLink;
      
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseStyles}
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className={baseStyles}>
          {children}
        </Link>
      );
    }

    // Button variant
    const buttonProps = rest as Omit<ButtonAsButton, keyof ButtonBaseProps>;
    
    return (
      <button ref={ref} className={baseStyles} {...buttonProps}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
