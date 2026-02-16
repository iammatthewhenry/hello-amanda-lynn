interface PageHeaderProps {
  title: string;
  description?: string;
}

/**
 * Clean page header.
 * Width and horizontal spacing are controlled by SiteContainer.
 */
export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="mb-12 sm:mb-16">
      <h1 className="text-[48px] font-bold mb-4">
        {title}
      </h1>

      {description && (
        <p className="text-lg text-muted-foreground max-w-3xl">
          {description}
        </p>
      )}
    </section>
  );
}
