import React from 'react';
import Image from 'next/image';

interface FramedPhotoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  borderWidth?: 'small' | 'medium' | 'large';
  shadow?: 'standard' | 'photo' | 'hero' | 'about' | 'large' | 'none';
  objectFit?: 'cover' | 'contain';
  priority?: boolean;
  fill?: boolean;
}

export function FramedPhoto({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  borderWidth = 'large',
  shadow = 'standard',
  objectFit = 'cover',
  priority = false,
  fill = false,
}: FramedPhotoProps) {
  const borderClasses = {
    small: 'border-8',
    medium: 'border-8 sm:border-[12px] lg:border-[16px]',
    large: 'border-8 sm:border-[16px]',
  };

  const shadowStyles = {
    standard: { boxShadow: 'var(--shadow-card)' },
    photo: { boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)' },
    hero: { boxShadow: 'var(--shadow-hero)' },
    about: { boxShadow: 'var(--shadow-about)' },
    large: { boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)' },
    none: {},
  };

  const baseClasses = `w-full h-full ${borderClasses[borderWidth]} border-white rounded-lg`;
  const finalClasses = `${baseClasses} ${className}`.trim();

  if (fill) {
    return (
      <div className={`relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          objectFit={objectFit}
          className={`${borderClasses[borderWidth]} border-white rounded-lg`}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={shadow !== 'none' ? shadowStyles[shadow] : undefined}
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={finalClasses}
      priority={priority}
      style={shadow !== 'none' ? shadowStyles[shadow] : undefined}
    />
  );
}
