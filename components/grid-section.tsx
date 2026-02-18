import { ContentCard, ViewAllPostsButton } from "@/components";

interface Post {
  title: string;
  description: string;
  image: string;
  slug: string;
  [key: string]: any; // Allow additional properties
}

interface GridSectionProps {
  title: string;
  posts: Post[];
  baseSlug: string; // e.g., "/out-of-kitchen" or "/in-the-kitchen"
  viewAllLink?: string;
  viewAllLabel?: string;
  isFirstSection?: boolean; // New prop to control spacing
}

/**
 * GridSection - Consistent grid section with title, ContentCards, and View All button
 * Used across category pages for uniform styling and spacing
 */
export function GridSection({ 
  title, 
  posts, 
  baseSlug,
  viewAllLink, 
  viewAllLabel = "View All Posts",
  isFirstSection = false
}: GridSectionProps) {
  // First section keeps full spacing, subsequent sections move up 8px
  const sectionClass = isFirstSection 
    ? "pt-0 pb-[22px] sm:pt-[37px] sm:pb-16 lg:pt-[53px] lg:pb-20"
    : "pt-0 pb-[22px] sm:pt-[29px] sm:pb-16 lg:pt-[45px] lg:pb-20"; // Reduced by 8px
  
  return (
    <>
      {/* Grid Section */}
      <section className={sectionClass}>
        <div className="container-max px-8">
          <h2 className="mb-8 text-[36px] text-left font-bold pl-[1.5%]">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
            {posts.map((post, index) => (
              <ContentCard
                key={index}
                title={post.title}
                description={post.description}
                image={post.image}
                href={`${baseSlug}/${post.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* View All Button */}
      {viewAllLink && (
        <ViewAllPostsButton navigateTo={viewAllLink} label={viewAllLabel} />
      )}
    </>
  );
}
