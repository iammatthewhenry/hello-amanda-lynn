// components/sections/NameThisGame.tsx

'use client';

import { Gamepad2 } from "lucide-react";
import { useRouter } from "next/navigation";

// ===================================================================
// NAME THIS GAME SECTION
// ===================================================================
interface NameThisGameProps {
  title?: string;
  description?: string;
  buttonText?: string;
  gameUrl?: string;
}

export function NameThisGame({ 
  title = "Name This Game",
  description = "Test your culinary knowledge! Can you identify these dishes, ingredients, and kitchen tools?",
  buttonText = "Start Game",
  gameUrl = "/name-this"
}: NameThisGameProps) {
  const router = useRouter();

  return (
    <section className="pb-0 sm:pb-[9px] lg:pb-[25px] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 text-center max-w-3xl mx-auto" 
          style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-green/10 rounded-full">
              <Gamepad2 className="text-green" size={18} />
            </div>
            <h3 className="font-semibold text-foreground text-lg">{title}</h3>
          </div>
          <p className="text-foreground/70 mb-6 text-sm">
            {description}
          </p>
          <button
            onClick={() => router.push(gameUrl)}
            className="px-6 py-2.5 bg-green text-white font-semibold hover:opacity-90 transition-opacity text-sm"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
