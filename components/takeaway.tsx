import React from 'react';
import { Sparkles } from 'lucide-react';

interface TakeawayProps {
  title: string;
  items: string[];
}

export function Takeaway({ title, items }: TakeawayProps) {
  return (
    <div className="mt-12 p-8 bg-secondary rounded-r-lg border-l-4 border-green">
      <h3 className="mb-6 font-bold text-xl">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-3 transition-transform duration-200 hover:translate-x-1"
          >
            <Sparkles className="w-5 h-5 text-green mt-0.5 flex-shrink-0" />
            <span className="text-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Takeaway;