import React from 'react';

interface SeenOnBoxProps {
  className?: string;
}

export function SeenOnBox({ className = '' }: SeenOnBoxProps) {
  const publications = [
    { name: 'PBS', style: { fontFamily: 'serif', fontSize: '1.875rem' } },
    { name: 'Today', style: { fontFamily: 'serif', fontWeight: 'bold', fontSize: '1.25rem' } },
    { name: 'Taste of Home', style: { fontFamily: 'sans-serif', fontSize: '1.125rem' } },
    { name: 'The Pioneer Woman', style: { fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.125rem' } },
    { name: 'Food Network', style: { fontFamily: 'sans-serif', fontWeight: '600', fontSize: '1.125rem' } },
  ];

  return (
    <div 
      className={`px-0 py-2 sm:py-3 w-full bg-secondary rounded-lg ${className}`.trim()} 
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <p className="text-xs sm:text-sm tracking-wider mb-2 sm:mb-3 text-center text-green font-semibold">
        AS SEEN ON
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5 px-3 sm:px-4">
        {publications.map((pub) => (
          <div key={pub.name} className="flex items-center">
            <span 
              className="text-foreground"
              style={pub.style}
            >
              {pub.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
