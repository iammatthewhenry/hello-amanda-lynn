'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { Container, Section, PageHeader, ReadMoreLink } from '@/components/ui';
import { Breadcrumbs } from '@/components/Breadcrumbs';

interface FoodDestinationPost {
  title: string;
  description: string;
  location: string;
  date: string;
  slug: string;
  image: string;
  category: string;
}

export default function FoodDestinationIndexPage() {
  const router = useRouter();

  // Food destination posts (non-restaurant review posts from Out of Kitchen)
  const foodDestinationPosts: FoodDestinationPost[] = [
    {
      title: "Exploring Local Food Markets",
      description: "Discovering treasures at the weekly farmer's market.",
      location: "Farmer's Market",
      date: "October 8, 2025",
      slug: "local-food-markets",
      image: "https://images.unsplash.com/photo-1649871198591-61ebbcd13940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBmb29kJTIwbWFya2V0fGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Local Favorites"
    }
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = foodDestinationPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <main>
      {/* Breadcrumbs */}
      <Container size="4xl" className="-mt-1.5 mb-8">
        <Breadcrumbs items={[{ label: 'Out of Kitchen' }]} />
      </Container>

      {/* Hero */}
      <Section spacing="lg" containerSize="4xl">
        <PageHeader
          title="Food Destination"
          description="Exploring culinary adventures beyond the kitchen. From local food markets to hidden gems in different cities, discover the places that inspire my recipes."
        />
      </Section>

      {/* Food Destination Posts List */}
      <Container size="4xl" className="py-20">
        <div className="space-y-8">
          {currentPosts.map((post) => (
            <article 
              key={post.slug}
              className="border-b border-gray-200 pb-8 last:border-b-0 cursor-pointer group"
              onClick={() => router.push(`/out-of-kitchen/${post.slug}`)}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                <div className="flex-1 order-2 sm:order-1">
                  <h2 className="mb-2 group-hover:text-green transition-colors">
                    {post.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-muted-foreground text-sm">
                    <span>{post.location}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    {post.description}
                  </p>
                  <ReadMoreLink href={`/out-of-kitchen/${post.slug}`} />
                </div>
                <div className="w-full sm:w-48 h-48 flex-shrink-0 order-1 sm:order-2">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={192}
                    height={192}
                    className="w-full h-full object-cover border-[16px] border-white"
                    style={{
                      boxShadow: 'var(--shadow-hero)'
                    }}
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </main>
  );
}
