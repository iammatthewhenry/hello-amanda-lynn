'use client';
import { PageHeader, GridSection } from '@/components';

export default function WineriesIndexPage() {
  const wineries = [
    {
      slug: 'sunset-ridge-winery',
      title: 'Sunset Ridge Winery',
      description: 'Small-batch Pinot Noir and Chardonnay with organic farming practices.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
    {
      slug: 'heritage-valley-estates',
      title: 'Heritage Valley Estates',
      description: 'Bold reds and innovative blends from estate-grown grapes.',
      image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    },
  ];

  return (
    <main className="pt-6 sm:pt-8">
      <PageHeader 
        title="Wineries & Tasting Rooms"
        description="Discover exceptional wineries & tasting rooms and taste the passion behind every bottle. From boutique family operations to innovative estates, explore the places where great wine stories begin."
      />

      <GridSection
        title="Winery Reviews"
        posts={wineries}
        baseSlug="/ook/wineries"
        isFirstSection={true}
      />
    </main>
  );
}