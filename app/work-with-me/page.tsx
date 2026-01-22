'use client';

import { PageBreadcrumbs } from '@/components/PageBreadcrumbs';
import { Instagram, FileText } from 'lucide-react';
import Image from 'next/image';

export default function WorkWithMePage() {
  return (
    <>
      {/* Breadcrumbs - Consistent positioning via component */}
      <PageBreadcrumbs items={[{ label: 'Work With Me' }]} />

      <main className="pt-6 sm:pt-8">
        {/* Hero Section */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-16 sm:mb-24 lg:mb-32">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            {/* Portrait Photo - Tilted Polaroid Style */}
            <div className="flex-shrink-0 inline-flex justify-center lg:justify-start ml-[18px] lg:ml-0">
              <div className="polaroid-image">
                <Image
                  src="/images/amanda-portrait.png"
                  alt="Amanda Lynn"
                  width={250}
                  height={350}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Introduction Text */}
            <div className="space-y-4 lg:pt-8 flex-1" style={{ marginLeft: '16px' }}>
              <h1 className="mb-6 text-[28px] sm:text-[36px] lg:text-[42px] font-bold leading-[1.5]">Let's Work Together</h1>
              <p className="text-foreground/70 leading-relaxed">
                Hi! I'm Amanda Lynn, and I'm passionate about creating beautiful, authentic content that tells your culinary story. Whether you're a restaurant looking to showcase your latest menu, a food brand wanting to highlight your products, or a destination seeking to share your unique flavors with the world, I'd love to help bring your vision to life.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                With years of experience in food photography, recipe development, and culinary storytelling, I specialize in creating engaging content across Instagram Reels, Instagram Stories, and blog posts. My goal is to help you connect with food lovers and grow your audience through compelling visuals and genuine narratives.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Let's collaborate to highlight what makes your restaurant, brand, or destination special and create content that resonates with your audience!
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-16 sm:mb-24">
          <div className="space-y-16 sm:space-y-24">
            {/* Instagram Reels */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="polaroid-image-right mx-auto">
                  <Image
                    src="https://images.unsplash.com/photo-1564758596018-3e5b1f2340cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG9uZSUyMGluc3RhZ3JhbSUyMGZvb2R8ZW58MXx8fHwxNzYyNzI4MjI3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Instagram Reels on phone"
                    width={400}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Instagram className="text-green" size={32} />
                  <h3 className="text-[18px] font-medium leading-[1.5]">Instagram Reels</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  Short-form video content is king on Instagram, and I create eye-catching Reels that stop the scroll. From recipe tutorials to restaurant tours, behind-the-scenes moments to product showcases, I'll craft engaging 15-60 second videos that capture attention and drive engagement.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Perfect for: New menu launches, recipe features, cooking tips, restaurant atmospheres, product demonstrations, and food styling showcases.
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    <span>Professional filming and editing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    <span>Trending audio and hashtag research</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    <span>Optimized captions and calls-to-action</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Instagram Stories */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="polaroid-image mx-auto">
                  <Image
                    src="/images/spices-flat-lay.png"
                    alt="Colorful spices in spoons"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <Instagram className="text-green" size={32} />
                  <h3 className="text-[18px] font-medium leading-[1.5]">Instagram Stories</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  Instagram Stories offer a more casual, intimate way to connect with your audience. I create authentic, engaging story content that keeps your brand top-of-mind and encourages direct interaction with your followers through polls, questions, and swipe-up links.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Perfect for: Daily specials, limited-time offers, event coverage, customer testimonials, Q&A sessions, and building brand personality.
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    <span>Story sequences and highlights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    <span>Interactive stickers and engagement tools</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    <span>Branded templates and consistent aesthetic</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Blog Posts */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 items-center">
              <div className="lg:w-1/2">
                <div className="polaroid-image-right mx-auto">
                  <Image
                    src="/images/pasta-carbonara.png"
                    alt="Food blogging"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="text-green" size={32} />
                  <h3 className="text-[18px] font-medium leading-[1.5]">Blog Posts</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed">
                  Long-form content builds trust and authority. I write detailed blog posts that tell your story, showcase your offerings, and provide value to readers while improving your SEO. From restaurant reviews to recipe features, product spotlights to culinary travel guides, I create content that educates and inspires.
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  Perfect for: Restaurant reviews, recipe features, brand collaborations, product launches, culinary experiences, and thought leadership pieces.
                </p>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    <span>SEO-optimized writing (800-2000+ words)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    <span>Professional food photography included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green mt-1">•</span>
                    <span>Social media promotion across my platforms</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              className="p-6 sm:p-8 lg:p-12 xl:p-16 text-center"
              style={{ backgroundColor: '#F5EBE8' }}
            >
              <h2 className="mb-4 sm:mb-6 text-green text-[36px]">
                Ready To Collaborate?
              </h2>
              <p className="text-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
                I'd love to hear about your project and discuss how we can work together to create amazing content. Whether you need a one-time feature or ongoing content creation, let's chat about bringing your vision to life!
              </p>
              <a 
                href="/contact"
                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base bg-green text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
