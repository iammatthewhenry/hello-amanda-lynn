import Image from 'next/image';
import Link from 'next/link';

export function AboutSection() {
  return (
    <section className="py-[22px] sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '95%' }}>
        <div 
          className="bg-white p-6 sm:p-8 lg:p-12"
          style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)' }}
        >
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-center md:items-start">
            {/* Amanda's Photo */}
            <div className="flex-shrink-0">
              <div 
                className="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 overflow-hidden bg-white"
                style={{ 
                  border: '8px solid white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b217?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHdvbWFuJTIwY29va2luZ3xlbnwxfHx8fDE3NjY0MjAyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Amanda Lynn"
                  width={280}
                  height={280}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-left">
              <h2 className="mb-4 sm:mb-6 text-green text-[28px] sm:text-[32px] lg:text-[36px] font-bold tracking-tight">
                HELLO, I'M AMANDA LYNN
              </h2>
              
              <p className="text-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base lg:text-lg">
                My passion for exploration culinary arts ignited early in my life. Growing up in Pennsylvania, I discovered the joys 
                of food in my grandmother's kitchen. Her teachings became the foundation of my culinary journey. Later, my 
                wanderlust was sparked during a trip to Germany in college, solidifying my love for both travel and cooking. After 
                college I found myself in sunny Southern California where I now live.
              </p>
              
              <Link
                href="/about"
                className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-green text-white font-semibold text-sm sm:text-base hover:opacity-90 transition-opacity"
              >
                My Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
