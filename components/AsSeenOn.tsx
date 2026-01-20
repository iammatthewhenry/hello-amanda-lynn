import Image from 'next/image';

// ===================================================================
// TYPES
// ===================================================================
interface AsSeenOnLogo {
  name: string;
  image?: string;  // URL from WordPress media library
  text?: string;   // Fallback text if no image provided
  altText?: string; // Alt text for accessibility
}

interface AsSeenOnProps {
  title?: string;
  logos?: AsSeenOnLogo[];
  className?: string;
}

// ===================================================================
// DEFAULT LOGOS (Fallback when WordPress data not available)
// ===================================================================
const DEFAULT_LOGOS: AsSeenOnLogo[] = [
  {
    name: 'PBS',
    text: 'PBS',
  },
  {
    name: 'Better Homes & Gardens',
    text: 'BETTER HOMES\n& GARDENS',
  },
  {
    name: 'Food Network',
    text: 'FOOD\nNETWORK',
  },
];

// ===================================================================
// AS SEEN ON COMPONENT
// ===================================================================
export function AsSeenOn({ 
  title = 'AS SEEN ON',
  logos = DEFAULT_LOGOS,
  className = '' 
}: AsSeenOnBoxProps) {
  return (
    <div 
      className={`px-6 py-4 sm:px-8 sm:py-5 ${className}`.trim()} 
      style={{ 
        backgroundColor: '#F5EBE8',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)'
      }}
    >
      {/* Title */}
      <p className="text-xs sm:text-sm tracking-wider mb-3 sm:mb-4 text-center text-green font-semibold">
        {title}
      </p>

      {/* Logos Grid */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8">
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center">
            {logo.image ? (
              // WordPress Image
              <Image
                src={logo.image}
                alt={logo.altText || logo.name}
                width={120}
                height={60}
                className="object-contain"
              />
            ) : logo.text ? (
              // Fallback Text Rendering
              <LogoText text={logo.text} name={logo.name} />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================================================================
// LOGO TEXT COMPONENT (For text-based logos)
// ===================================================================
interface LogoTextProps {
  text: string;
  name: string;
}

function LogoText({ text, name }: LogoTextProps) {
  // Special styling for specific logos
  if (name === 'PBS') {
    return (
      <span className="text-2xl sm:text-3xl text-foreground font-bold" style={{ fontFamily: 'serif' }}>
        {text}
      </span>
    );
  }

  // Multi-line text (contains \n)
  if (text.includes('\n')) {
    const lines = text.split('\n');
    
    // Better Homes & Gardens style
    if (name === 'Better Homes & Gardens') {
      return (
        <div className="text-center">
          {lines.map((line, idx) => (
            <div key={idx} className="text-xs sm:text-sm tracking-wide text-foreground font-semibold" style={{ marginTop: idx > 0 ? '-0.25rem' : 0 }}>
              {line}
            </div>
          ))}
        </div>
      );
    }

    // Food Network style
    if (name === 'Food Network') {
      return (
        <div className="text-center">
          {lines.map((line, idx) => (
            <div key={idx} className="text-base sm:text-lg text-foreground font-semibold" style={{ marginTop: idx > 0 ? '-0.25rem' : 0 }}>
              {line}
            </div>
          ))}
        </div>
      );
    }

    // Generic multi-line
    return (
      <div className="text-center">
        {lines.map((line, idx) => (
          <div key={idx} className="text-sm sm:text-base text-foreground font-semibold">
            {line}
          </div>
        ))}
      </div>
    );
  }

  // Single-line default
  return (
    <span className="text-base sm:text-lg text-foreground font-semibold">
      {text}
    </span>
  );
}
