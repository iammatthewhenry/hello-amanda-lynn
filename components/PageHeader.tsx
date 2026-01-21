import { Breadcrumbs } from "@/components/Breadcrumbs";

interface PageHeaderProps {
  title: string;
  description: string;
  breadcrumbLabel?: string;
}

/**
 * PageHeader - Consistent page header for category pages
 * Includes breadcrumbs, page title, and description with proper alignment
 */
export function PageHeader({ title, description, breadcrumbLabel }: PageHeaderProps) {
  return (
    <>
      {/* Breadcrumbs - Match recipe page positioning */}
      <div className="max-w-4xl mx-auto px-[4vw] sm:px-6 lg:px-8 -mt-1.5 mb-8">
        <Breadcrumbs items={[{ label: breadcrumbLabel || title }]} />
      </div>

      {/* Title & Description Section */}
      <section className="section-spacing-bottom">
        <div className="container-max px-8">
          <div className="page-header -mb-[3px] pl-[1.5%]">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
