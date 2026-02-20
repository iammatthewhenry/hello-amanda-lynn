import React from 'react';
import { Tag } from 'lucide-react';

interface TakeawayProps {
  title: string;
  items: string[];
}

export function Takeaway({ title, items }: TakeawayProps) {
  return (
    <div className="mt-12 p-8 bg-accent/30 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="text-green" size={20} />
        <h3 className="m-0">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="text-muted-foreground flex items-start gap-3">
            <span className="text-green mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Takeaway;