import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#E8E4DF] flex items-center justify-center p-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] lg:max-w-[600px]">
              <Image
                src="/images/empty-plate.jpg"
                alt="Empty ceramic plate"
                width={600}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-[80px] lg:text-[100px] font-bold text-foreground leading-none">
              Oops!
            </h1>
            
            <h2 className="text-3xl lg:text-4xl font-medium text-foreground">
              This Plate is Empty.
            </h2>
            
            <p className="text-2xl lg:text-3xl text-foreground">
              Let's get you back to<br />
              something delicious!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-8">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-10 py-4 bg-green text-white font-bold rounded-full hover:opacity-90 transition-opacity text-sm tracking-wider uppercase"
              >
                Back to Home
              </Link>
              
              <Link
                href="/recipes"
                className="inline-flex items-center justify-center px-10 py-4 bg-white text-[#D4A5A5] border-2 border-[#D4A5A5] font-bold rounded-full hover:bg-[#D4A5A5] hover:text-white transition-all text-sm tracking-wider uppercase"
              >
                Browse Recipes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
