import React from 'react';

interface TakeawayProps {
  title: string;
  items: string[];
}

export function Takeaway({ title, items }: TakeawayProps) {
  return (
    <section className="mb-12">
      <div className="bg-green/5 p-8 rounded-lg border border-green/20">
        <h3 className="text-xl font-bold text-green mb-6">{title}</h3>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-2 h-2 bg-green rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-muted-foreground">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Takeaway;