# Public Assets

This folder contains static assets for the Hello Amanda Lynn food blog.

## Structure

```
public/
├── images/          # All image assets
├── logo.svg         # Site logo
└── favicon.ico      # Browser favicon (add your own)
```

## Adding New Images

1. Add images to `/public/images/`
2. Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/your-image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

## Supported Formats

- PNG - for graphics with transparency
- JPG - for photographs  
- WebP - for modern browsers
- SVG - for logos and icons
