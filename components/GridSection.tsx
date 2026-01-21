import { ContentCard } from "@/components/ContentCard";
import { ViewAllPostsButton } from "@/components/ViewAllPostsButton";

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
  viewAllLabel = "View All Posts" 
}: GridSectionProps) {
  return (
    <>
      {/* Grid Section */}
      <section className="pt-0 pb-[22px] sm:pt-[37px] sm:pb-16 lg:pt-[53px] lg:pb-20">
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
