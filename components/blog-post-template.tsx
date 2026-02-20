import { ReactNode } from 'react';
import Image from 'next/image';
import { ShareBar } from './share-bar';
import { Sparkles } from 'lucide-react';

interface BlogPostTemplateProps {
  // Header section
  image: string;
  title: string;
  author: string;
  publishedDate: string;

  // Meta details (flexible to accommodate different types)
  metaDetails: ReactNode;

  // Content
  description: string;
  content: string[];

  // Optional sections
  tipSection?: {
    title: string;
    tips: string[];
  };

  // Share functionality
  shareTitle: string;
  shareDescription: string;
  shareImageUrl: string;
}

export function BlogPostTemplate({
  image,
  title,
  author,
  publishedDate,
  metaDetails,
  description,
  content,
  tipSection,
  shareTitle,
  shareDescription,
  shareImageUrl,
}: BlogPostTemplateProps) {
  return (
    <>
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Left: Image */}
          <div className="w-[250px] md:w-[339px] h-[214px] md:h-[250px] flex-shrink-0 mx-auto md:mx-0 overflow-visible">
            <Image
              src={image}
              alt={title}
              width={339}
              height={250}
              className="w-full h-full object-cover border-8 sm:border-[16px] border-white -rotate-[6deg]"
              style={{
                boxShadow: 'var(--shadow-hero)',
                borderColor: '#E5E5E5',
              }}
              priority
            />
          </div>

          {/* Right: Title and Meta */}
          <div className="flex-1 pt-4 sm:pt-0">
            <h1 className="mb-3 sm:mb-4 font-bold text-3xl md:text-4xl">{title}</h1>

            {/* Meta Details (passed as children for flexibility) */}
            {metaDetails}

            <div className="text-muted-foreground text-sm sm:text-base mb-4">
              <p className="mb-1">By {author}</p>
              <p>Published {publishedDate}</p>
            </div>

            {/* Share Bar */}
            <div>
              <ShareBar
                title={shareTitle}
                description={shareDescription}
                imageUrl={shareImageUrl}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* 175x175 Ad Space */}
        <div className="flex justify-center mb-8">
          <div className="w-[175px] h-[175px] bg-muted border-2 border-border flex items-center justify-center rounded">
            <div className="text-center px-4">
              <p className="text-muted-foreground text-xs sm:text-sm">Advertisement</p>
              <p className="text-muted-foreground text-[10px] sm:text-xs mt-2">175x175 Ad Space</p>
            </div>
          </div>
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-6">
          {content.map((paragraph, index) => (
            <p key={index} className="text-foreground leading-relaxed text-base">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tips/Highlights Section */}
        {tipSection && tipSection.tips.length > 0 && (
          <div className="mt-21 p-8 bg-secondary rounded-lg border-l-4 border-green">
            <h3 className="mb-6 font-bold text-xl">{tipSection.title}</h3>
            <ul className="space-y-4">
              {tipSection.tips.map((tip, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
                >
                  <Sparkles className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </>
  );
}
