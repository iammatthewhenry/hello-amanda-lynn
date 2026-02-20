'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs, Pagination, Container, PageHeader } from '@/components';
import { Section, ReadMoreLink } from '@/components/ui';

interface WineryPost {
  title: string;
  description: string;
  location: string;
  date: string;
  slug: string;
  image: string;
  category: string;
}

export default function WineriesIndexPage() {
  const router = useRouter();

  // Winery posts
  const wineryPosts: WineryPost[] = [
    {
      title: 'Sunset Ridge Winery',
      description: 'Small-batch Pinot Noir and Chardonnay with organic farming practices.',
      location: "Sonoma, CA",
      date: 'September 15, 2025',
      slug: 'sunset-ridge-winery',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      category: 'Boutique Winery'
    },
    {
      title: 'Heritage Valley Estates',
      description: 'Bold reds and innovative blends from estate-grown grapes.',
      location: "Paso Robles, CA",
      date: 'October 2, 2025',
      slug: 'heritage-valley-estates',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      category: 'Family-Owned'
    }
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = wineryPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(wineryPosts.length / postsPerPage);

  return (
    <main>
      
      {/* Hero */}
      <Section spacing="lg" containerSize="4xl">
        <PageHeader
          title="Wineries"
          description="Discover exceptional wineries and taste the passion behind every bottle. From boutique family operations to innovative estates, explore the places where great wine stories begin."
        />
      </Section>

      {/* Wineries Posts List */}
      <Container size="4xl" className="py-20">
        <div className="space-y-8">
          {currentPosts.map((post) => (
            <article 
              key={post.slug}
              className="border-b border-gray-200 pb-8 last:border-b-0 cursor-pointer group"
              onClick={() => router.push(`/ook/wineries/${post.slug}`)}
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
                  <ReadMoreLink href={`/ook/wineries/${post.slug}`} />
                </div>
                <div className="w-full sm:w-48 h-48 flex-shrink-0 order-1 sm:order-2">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover border-[16px] border-white border border-gray-200"
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

      {/* Pagination */}
      <Section spacing="sm" containerSize="4xl">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Section>
    </main>
  );
}