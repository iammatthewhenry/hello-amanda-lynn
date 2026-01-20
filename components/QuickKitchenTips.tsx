// components/sections/QuickKitchenTips.tsx

import { Thermometer, BookOpen } from "lucide-react";

// ===================================================================
// QUICK KITCHEN TIPS SECTION
// ===================================================================
interface Tip {
  icon: typeof Thermometer | typeof BookOpen;
  title: string;
  tip: string;
}

interface QuickKitchenTipsProps {
  tips?: Tip[];
}

const defaultTips: Tip[] = [
  {
    icon: Thermometer,
    title: "Room Temperature Ingredients",
    tip: "Bring eggs, butter, and dairy to room temperature before baking for better texture and consistency.",
  },
  {
    icon: BookOpen,
    title: "Read the Recipe First",
    tip: "Always read through the entire recipe before starting. It helps you plan and avoid surprises.",
  },
];

export function QuickKitchenTips({ tips = defaultTips }: QuickKitchenTipsProps) {
  return (
    <section className="pb-0 sm:pb-[9px] lg:pb-[25px] bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-[36px] font-bold text-foreground">Quick Kitchen Tips</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Simple tips that make a big difference
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 text-center"
                style={{ boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)' }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green/10 rounded-full mb-4">
                  <Icon className="text-green" size={28} />
                </div>
                <h3 className="mb-3 font-semibold text-foreground text-lg">{item.title}</h3>
                <p className="text-foreground/70">{item.tip}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
