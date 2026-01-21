'use client';

import { useRouter } from 'next/navigation';

interface ViewAllPostsButtonProps {
  navigateTo: string;
  label?: string;
}

export function ViewAllPostsButton({ navigateTo, label = "View All Posts" }: ViewAllPostsButtonProps) {
  const router = useRouter();
  
  return (
    <div className="text-center mt-6 sm:mt-8 mb-12 sm:mb-16 lg:mb-20">
      <button
        onClick={() => router.push(navigateTo)}
        className="inline-block px-6 py-3.5 bg-green text-white font-semibold text-base hover:opacity-90 transition-opacity"
      >
        {label}
      </button>
    </div>
  );
}
