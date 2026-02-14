import { ReactNode } from "react";

interface RecipePageTemplateProps {
  children: ReactNode;
}

/*
 LOCKED RECIPE TEMPLATE
 Uses global spacing from layout.tsx
 No page-specific vertical pushing allowed
*/
export function RecipePageTemplate({ children }: RecipePageTemplateProps) {
  return (
    <div className="mt-6 sm:mt-8">
      <div 
        className="border border-border pt-6 pb-8 px-[4vw] sm:pt-10 sm:pb-16 sm:px-8 lg:pt-[63px] lg:pb-24 lg:px-14 relative w-full"
        style={{
          backgroundColor: '#FCFCFC',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 0 0 1 0'/%3E%3C/feFuncA%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.23' fill='%23000000'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          boxShadow: '0 -12px 24px -6px rgba(0, 0, 0, 0.21), 0 12px 24px -6px rgba(0, 0, 0, 0.21), 0 8px 32px rgba(0, 0, 0, 0.15), 0 16px 48px rgba(0, 0, 0, 0.10)'
        }}
      >
        {children}
      </div>
    </div>
  );
}
