interface PageHeaderProps {
  title: string;
  description?: string;
}

/**
 * Page header component focused on title and description only.
 * Designed to work with StandaloneBreadcrumbs component for consistent spacing.
 * Uses the established pl-[1.5%] left alignment pattern.
 */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-12 sm:mb-16">
      <h1 className="text-[48px] font-bold mb-4 pl-[1.5%]">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground max-w-3xl pl-[1.5%]">{description}</p>
      )}
    </section>
  );
}
