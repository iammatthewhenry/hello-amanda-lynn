interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Format a URL segment into a readable label
 */
function formatSegmentLabel(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Create breadcrumb items from a path and current page label
 */
export function createBreadcrumbs(
  currentLabel: string,
  parentPath?: string,
  parentLabel?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Add parent path if provided
  if (parentPath && parentLabel) {
    items.push({
      label: parentLabel,
      href: parentPath
    });
  }

  // Add current page (no href since it's the current page)
  items.push({
    label: currentLabel
  });

  return items;
}

/**
 * Create breadcrumbs for nested content (like individual recipes or posts)
 */
export function createNestedBreadcrumbs(
  currentLabel: string,
  category: string,
  categoryPath: string,
  section?: string,
  sectionPath?: string
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  // Add section if provided (like "Recipes" or "Out of Kitchen")
  if (section && sectionPath) {
    items.push({
      label: section,
      href: sectionPath
    });
  }

  // Add category (like "Desserts" or "Culinary Destinations")
  items.push({
    label: category,
    href: categoryPath
  });

  // Add current page
  items.push({
    label: currentLabel
  });

  return items;
}

/**
 * Quick breadcrumbs for simple two-level navigation
 */
export function createSimpleBreadcrumbs(
  currentLabel: string,
  parentLabel: string,
  parentPath: string
): BreadcrumbItem[] {
  return [
    { label: 'Home', href: '/' },
    { label: parentLabel, href: parentPath },
    { label: currentLabel }
  ];
}
