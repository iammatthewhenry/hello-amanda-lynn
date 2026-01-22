import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <div className={`min-h-10 sm:min-h-12 flex items-center mb-4 sm:mb-6 mt-6 sm:mt-8 ${className || ''}`}>
      <div className="relative inline-flex flex-wrap">
        {/* Crooked tape effect behind breadcrumbs */}
        <div 
          className="absolute bg-[#F5EBE8]/80"
          style={{
            top: '-8px',
            bottom: '-12px',
            left: '-20px',
            right: '-20px',
            transform: 'skewY(-1deg)',
            boxShadow: '0 3px 8px rgba(0,0,0,0.15), inset 0 2px 0 rgba(255,255,255,0.4)',
            borderTop: '1px solid rgba(212, 165, 165, 0.2)',
            borderBottom: '1px solid rgba(212, 165, 165, 0.2)',
          }}
        ></div>
        <div className="bg-secondary px-3 py-1.5 inline-flex relative">
          <Breadcrumb>
            <BreadcrumbList>
              {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                  <div key={index} className="inline-flex items-center gap-1.5 sm:gap-2.5">
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="text-green">{item.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link href={item.href!}>{item.label}</Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && (
                      <BreadcrumbSeparator>
                        <MoveRight />
                      </BreadcrumbSeparator>
                    )}
                  </div>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumbs;
