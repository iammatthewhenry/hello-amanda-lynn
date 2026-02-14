import { ReactNode } from 'react';

interface SiteContainerProps {
  children: ReactNode;
  className?: string;
}

/*
 MASTER GRID CONTAINER — HARD LOCK
 Defines permanent site layout width.
 Breadcrumb alignment becomes global grid.
 Nothing else should control page width.
*/
export default function SiteContainer({ children, className = '' }: SiteContainerProps) {
  return (
    <div className="w-full flex justify-center">
      <div
        className={`
          w-full
          max-w-[1180px]
          px-[4vw] sm:px-6 lg:px-8
          layout-container
          ${className}
        `}
      >
        {children}
      </div>
    </div>
  );
}
