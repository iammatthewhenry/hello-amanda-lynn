import React from 'react';
import Image from 'next/image';

interface TiltedPhotoProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  rotate?: number; // CSS rotation in degrees (e.g., 3 or -3)
}

export function TiltedPhoto({ 
  src, 
  alt,
  width = 400,
  height = 400,
  className = '',
  containerClassName = '',
  rotate = 2
}: TiltedPhotoProps) {
  return (
    <div className={`relative w-full sm:w-auto ${containerClassName}`.trim()}>
      <div 
        className={`overflow-hidden rounded-lg border border-border ${className}`.trim()}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
