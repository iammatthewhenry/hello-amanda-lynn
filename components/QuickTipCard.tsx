import { LucideIcon } from "lucide-react";

interface QuickTipCardProps {
  icon: LucideIcon;
  title: string;
  tip: string;
}

/**
 * QuickTipCard - Card component for displaying kitchen tips with icons
 * Features pink/beige background matching FavoriteSpotCard style
 */
export function QuickTipCard({ icon: Icon, title, tip }: QuickTipCardProps) {
  return (
    <div 
      className="p-8 text-center"
      style={{ 
        backgroundColor: '#F5EBE8',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.18), 0 2px 12px rgba(0, 0, 0, 0.12)'
      }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green/10 rounded-full mb-4">
        <Icon className="text-green" size={28} />
      </div>
      <h3 className="mb-3 font-bold">{title}</h3>
      <p className="text-muted-foreground">{tip}</p>
    </div>
  );
}
