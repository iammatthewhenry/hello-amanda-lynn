'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { ShareBar } from '@/components';

// ===================================================================
// TYPES
// ===================================================================
export interface OokRating {
  type: 'price' | 'stars' | 'numeric' | 'none';
  value: string | number;
  displayValue?: string; // Optional custom display (e.g., "8.5/10")
}

export interface OokLocation {
  city: string;
  state: string;
}

export interface OokShareProps {
  title: string;
  description: string;
  imageUrl?: string;
}

export interface OokHeaderProps {
  title: string;
  image: string;
  location?: OokLocation;
  rating?: OokRating;
  author: string;
  publishDate: string;
  shareProps?: OokShareProps;
}

// ===================================================================
// RATING DISPLAY COMPONENT
// ===================================================================
function RatingDisplay({ rating }: { rating: OokRating }) {
  if (rating.type === 'none') return null;

  // Price Rating (e.g., $$$)
  if (rating.type === 'price') {
    return (
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <span className="text-green font-semibold text-lg sm:text-xl">
          {rating.value}
        </span>
      </div>
    );
  }

  // Star Rating (e.g., 4.5 stars) - Matches recipe star styling
  if (rating.type === 'stars') {
    const numericValue = typeof rating.value === 'number' ? rating.value : parseFloat(String(rating.value));
    
    return (
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="flex gap-1 sm:gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 sm:w-6 sm:h-6 text-[#D4A5A5] ${
                star <= Math.floor(numericValue)
                  ? 'fill-[#D4A5A5]'
                  : star - 0.5 <= numericValue
                  ? 'fill-[#D4A5A5] opacity-50'
                  : 'fill-transparent'
              }`}
            />
          ))}
        </div>
        <span className="text-sm sm:text-base text-muted-foreground">
          {numericValue.toFixed(1)}
        </span>
      </div>
    );
  }

  // Numeric Score (e.g., 8.5 or 8.5/10)
  if (rating.type === 'numeric') {
    return (
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <span className="text-green font-semibold text-lg sm:text-xl">
          {rating.displayValue || rating.value}
        </span>
      </div>
    );
  }

  return null;
}

// ===================================================================
// OOK HEADER - REUSABLE HEADER FOR ALL OOK POST TYPES
// Used for: Restaurant Reviews, Culinary Travels, and all OOK content
// Matches Recipe Header Design with Dynamic Rating System
// ===================================================================
export function OokHeader({
  title,
  image,
  location,
  rating,
  author,
  publishDate,
  shareProps,
}: OokHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 sm:gap-6 lg:gap-8 mb-8 sm:mb-8 pt-6 sm:pt-10 lg:pt-[63px]">
      {/* Left: Polaroid Image - Matches Recipe Header Exactly */}
      <div className="w-[280px] md:w-[339px] h-[200px] md:h-[250px] flex-shrink-0 mx-auto md:mx-0 overflow-visible mt-[7px] sm:mt-0">
        <Image
          src={image}
          alt={title}
          width={339}
          height={250}
          className="w-full h-full object-cover border-[8px] sm:border-[16px] border-white -rotate-[6deg] border border-gray-200"
          style={{
            boxShadow: 'var(--shadow-hero)'
          }}
          priority
        />
      </div>

      {/* Right: Title and Meta - Matches Recipe Header Structure */}
      <div className="flex-1 pt-0 sm:pt-0">
        {/* Title */}
        <h1 className="mb-[2vh] sm:mb-3 md:mb-4 text-[6vw] sm:text-[24px] md:text-[28px] lg:text-[42px] leading-[1.2] mt-[13px] md:mt-0">
          {title}
        </h1>

        {/* Location (if provided) */}
        {location && (
          <div className="text-muted-foreground text-[3.8vw] sm:text-[15px] md:text-base mb-2">
            <p>{location.city}, {location.state}</p>
          </div>
        )}

        {/* Author and Publish Date */}
        <div className="text-muted-foreground text-[3.8vw] sm:text-[15px] md:text-base mb-[2vh] sm:mb-4">
          <p className="mb-1 sm:mb-1">By {author}</p>
          <p className="text-[3.8vw] sm:text-[15px] md:text-base">Published {publishDate}</p>
        </div>

        {/* Dynamic Rating Display */}
        {rating && <RatingDisplay rating={rating} />}

        {/* Share Bar - Matches Recipe Layout */}
        {shareProps && (
          <div className="mt-4 sm:mt-6">
            <ShareBar
              title={shareProps.title}
              description={shareProps.description}
              imageUrl={shareProps.imageUrl}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default OokHeader;
