import { Section, SectionHeader } from './ui';

interface KitchenTip {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface QuickKitchenTipsProps {
  tips?: KitchenTip[];
}

const DEFAULT_TIPS: KitchenTip[] = [
  {
    id: '1',
    title: 'Sharp Knives Are Safer',
    description: 'Keep your knives sharp for easier cutting and reduced risk of accidents. A sharp knife requires less pressure and gives you better control.',
    icon: '🔪',
  },
  {
    id: '2',
    title: 'Mise en Place',
    description: 'Prepare and organize all ingredients before you start cooking. This French term means "everything in its place" and makes cooking much smoother.',
    icon: '📦',
  },
  {
    id: '3',
    title: 'Taste as You Go',
    description: 'Season throughout the cooking process, not just at the end. This builds layers of flavor and ensures perfectly seasoned food.',
    icon: '👅',
  },
  {
    id: '4',
    title: 'Don\'t Crowd the Pan',
    description: 'Give ingredients space to cook properly. Overcrowding leads to steaming instead of browning, affecting texture and flavor.',
    icon: '🍳',
  },
  {
    id: '5',
    title: 'Let Meat Rest',
    description: 'Allow cooked meat to rest before cutting. This redistributes juices, resulting in more tender and flavorful meat.',
    icon: '🥩',
  },
  {
    id: '6',
    title: 'Room Temperature Ingredients',
    description: 'Bring ingredients like eggs and butter to room temperature before baking for better mixing and more consistent results.',
    icon: '🌡️',
  },
];

export function QuickKitchenTips({ tips = DEFAULT_TIPS }: QuickKitchenTipsProps) {
  return (
    <Section spacing="lg" containerSize="4xl">
      <SectionHeader
        title="Quick Kitchen Tips"
        subtitle="Essential techniques to elevate your cooking"
        centered
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tips.map((tip) => (
          <div
            key={tip.id}
            className="bg-white rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
          >
            {tip.icon && (
              <div className="text-3xl mb-4">{tip.icon}</div>
            )}
            <h3 className="text-lg font-semibold text-foreground mb-3">
              {tip.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
