import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left side - Image */}
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/images/empty-plate.jpg" // You'll need to add this image to your public/images folder
                alt="Empty ceramic plate"
                width={400}
                height={400}
                className="rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h1 className="text-6xl lg:text-7xl font-bold text-foreground mb-4">
              Oops!
            </h1>
            
            <h2 className="text-2xl lg:text-3xl font-medium text-foreground mb-8">
              This Plate is Empty.
            </h2>
            
            <p className="text-xl lg:text-2xl text-foreground mb-12">
              Let's get you back to<br />
              something delicious!
            </p>

            {/* Buttons - Always centered */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 bg-green text-white font-semibold rounded-full hover:opacity-90 transition-opacity"
              >
                BACK TO HOME
              </Link>
              
              <Link
                href="/recipes"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-green border-2 border-green font-semibold rounded-full hover:bg-green hover:text-white transition-all"
              >
                BROWSE RECIPES
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
