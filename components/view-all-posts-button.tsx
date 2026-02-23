import Link from 'next/link';

interface ViewAllPostsButtonProps {
  navigateTo: string;
  label?: string;
}

export function ViewAllPostsButton({ navigateTo, label = "View All Posts" }: ViewAllPostsButtonProps) {
  return (
    <div className="text-center mb-12 sm:mb-16 lg:mb-20" style={{ marginTop: '-15px' }}>
      <Link
        href={navigateTo}
        className="inline-block px-6 py-3.5 bg-green text-button-text font-semibold text-base hover:opacity-90 transition-opacity"
      >
        {label}
      </Link>
    </div>
  );
}
