import { ReactNode } from 'react';

interface SiteContainerProps {
  children: ReactNode;
  className?: string;
}

/*
 MASTER GRID CONTAINER — CONTROLLED BREAKOUT SYSTEM
 - Locks content at 1416px
 - Allows decorative elements to visually extend
 - Keeps horizontal rhythm consistent site-wide
*/
export default function SiteContainer({ children, className = '' }: SiteContainerProps) {
  return (
    <div className="w-full relative">
      <div className="mx-auto w-full max-w-[1416px] px-4 sm:px-6 lg:px-8">
        <div className={`relative ${className}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
