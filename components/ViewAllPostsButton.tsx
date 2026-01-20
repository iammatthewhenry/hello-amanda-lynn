'use client';

import { useRouter } from 'next/navigation';

interface ViewAllPostsButtonProps {
  navigateTo: string;
  label?: string;
}

export function ViewAllPostsButton({ navigateTo, label = "View All Posts" }: ViewAllPostsButtonProps) {
  const router = useRouter();
  
  return (
    <div className="text-center -mt-[18px] sm:-mt-12 lg:-mt-16 mb-12 sm:mb-16 lg:mb-20">
      <button
        onClick={() => router.push(navigateTo)}
        className="px-5 py-2 btn-green-scale text-sm"
      >
        {label}
      </button>
    </div>
  );
}
