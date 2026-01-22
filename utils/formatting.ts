/**
 * Format a date string into a readable format
 */
export function formatDate(date: string | Date, format: 'short' | 'long' | 'relative' = 'long'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }

  const now = new Date();
  const diffTime = now.getTime() - dateObj.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    
    case 'relative':
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Yesterday';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    
    case 'long':
    default:
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  }
}

/**
 * Format cooking time (e.g., "PT15M" to "15 mins")
 */
export function formatCookingTime(duration: string): string {
  if (!duration) return '';
  
  // Handle ISO 8601 duration format (PT15M, PT1H30M, etc.)
  if (duration.startsWith('PT')) {
    const hours = duration.match(/(\d+)H/);
    const minutes = duration.match(/(\d+)M/);
    
    const h = hours ? parseInt(hours[1]) : 0;
    const m = minutes ? parseInt(minutes[1]) : 0;
    
    if (h === 0) return `${m} min${m !== 1 ? 's' : ''}`;
    if (m === 0) return `${h} hr${h !== 1 ? 's' : ''}`;
    return `${h} hr${h !== 1 ? 's' : ''} ${m} min${m !== 1 ? 's' : ''}`;
  }
  
  // Handle simple number (assume minutes)
  const num = parseInt(duration);
  if (!isNaN(num)) {
    if (num >= 60) {
      const hours = Math.floor(num / 60);
      const minutes = num % 60;
      if (minutes === 0) return `${hours} hr${hours !== 1 ? 's' : ''}`;
      return `${hours} hr${hours !== 1 ? 's' : ''} ${minutes} min${minutes !== 1 ? 's' : ''}`;
    }
    return `${num} min${num !== 1 ? 's' : ''}`;
  }
  
  return duration; // Return as-is if we can't parse it
}

/**
 * Format serving size
 */
export function formatServings(servings: number | string): string {
  const num = typeof servings === 'string' ? parseInt(servings) : servings;
  if (isNaN(num)) return servings.toString();
  
  return `${num} serving${num !== 1 ? 's' : ''}`;
}

/**
 * Truncate text to a specific length with ellipsis
 */
export function truncateText(text: string, length: number = 150, wordBoundary: boolean = true): string {
  if (text.length <= length) return text;
  
  if (wordBoundary) {
    const truncated = text.slice(0, length);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.slice(0, lastSpace) + '...' : text.slice(0, length) + '...';
  }
  
  return text.slice(0, length) + '...';
}

/**
 * Convert string to URL-friendly slug
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Format recipe difficulty
 */
export function formatDifficulty(difficulty: string | number): string {
  if (typeof difficulty === 'number') {
    if (difficulty <= 1) return 'Easy';
    if (difficulty <= 2) return 'Medium';
    return 'Hard';
  }
  
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
}

/**
 * Format rating (e.g., 4.5 to "4.5 stars")
 */
export function formatRating(rating: number, showText: boolean = true): string {
  const rounded = Math.round(rating * 10) / 10; // Round to 1 decimal
  const stars = '★'.repeat(Math.floor(rounded)) + (rounded % 1 ? '☆' : '');
  
  if (showText) {
    return `${rounded} star${rounded !== 1 ? 's' : ''} (${stars})`;
  }
  
  return stars;
}

/**
 * Format price (e.g., 1299 to "$12.99")
 */
export function formatPrice(cents: number, currency: string = 'USD'): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(dollars);
}

/**
 * Extract excerpt from HTML or markdown content
 */
export function extractExcerpt(content: string, length: number = 160): string {
  // Remove HTML tags
  const textOnly = content.replace(/<[^>]*>/g, '');
  
  // Remove markdown formatting
  const cleanText = textOnly
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/`(.*?)`/g, '$1') // Code
    .replace(/#{1,6}\s*(.*)/g, '$1') // Headers
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/\n+/g, ' ') // Multiple newlines to space
    .trim();
  
  return truncateText(cleanText, length);
}

/**
 * Capitalize first letter of each word
 */
export function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Format ingredient amounts (e.g., "1.5" to "1½")
 */
export function formatFraction(amount: string | number): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(num)) return amount.toString();
  
  const whole = Math.floor(num);
  const fraction = num - whole;
  
  const fractionMap: { [key: string]: string } = {
    '0.25': '¼',
    '0.33': '⅓',
    '0.5': '½',
    '0.66': '⅔',
    '0.67': '⅔',
    '0.75': '¾'
  };
  
  const fractionStr = fraction.toFixed(2);
  const fractionSymbol = fractionMap[fractionStr];
  
  if (whole === 0 && fractionSymbol) {
    return fractionSymbol;
  } else if (whole > 0 && fractionSymbol) {
    return `${whole}${fractionSymbol}`;
  } else if (whole > 0 && fraction === 0) {
    return whole.toString();
  }
  
  return num.toString();
}

/**
 * Format large numbers (e.g., 1500 to "1.5k")
 */
export function formatNumber(num: number, compact: boolean = false): string {
  if (!compact) return num.toLocaleString();
  
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  
  return num.toString();
}

/**
 * Generate reading time estimate
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  if (minutes === 1) return '1 min read';
  return `${minutes} min read`;
}
