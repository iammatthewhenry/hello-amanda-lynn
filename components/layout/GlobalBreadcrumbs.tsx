'use client';

import { usePathname } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

function formatLabel(segment: string) {
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function GlobalBreadcrumbs() {
  const pathname = usePathname();

  if (!pathname) return null;

  const excludedRoutes = [
    '/',
    '/about',
    '/contact',
    '/contact-me',
    '/work-with-me',
  ];

  if (excludedRoutes.includes(pathname)) {
    return null;
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const items = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');

    return {
      label: formatLabel(segment),
      href: index === segments.length - 1 ? undefined : href,
    };
  });

  return <Breadcrumbs items={items} />;
}
