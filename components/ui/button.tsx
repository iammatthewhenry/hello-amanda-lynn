import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'green' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const variantClasses = {
  default: 'bg-foreground text-background hover:bg-foreground/90',
  green: 'bg-green text-white hover:bg-green/90',
  outline: 'border-2 border-green text-green hover:bg-green hover:text-white',
  ghost: 'text-green hover:bg-green/10'
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl'
};

export function Button({ 
  children, 
  className, 
  variant = 'default',
  size = 'md',
  href,
  onClick,
  disabled = false,
  type = 'button'
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-semibold transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-green/50',
    'disabled:opacity-50 disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}

export default Button;
