'use client';

import { Poll } from '@/components';

const DESSERT_CHOICES = [
  { id: '1', text: 'Chocolate Cake' },
  { id: '2', text: 'Tiramisu' },
  { id: '3', text: 'Lemon Bars' },
  { id: '4', text: 'Cheesecake' },
  { id: '5', text: 'Apple Pie' },
  { id: '6', text: 'Chocolate Chip Cookies' },
  { id: '7', text: 'Brownies' },
  { id: '8', text: 'Ice Cream' },
  { id: '9', text: 'Cookies' },
  { id: '10', text: 'Cherry Pie' },
  { id: '11', text: 'Fruit Tart' },
  { id: '12', text: 'Chocolate Mousse' },
  { id: '13', text: 'Cupcakes' },
  { id: '14', text: 'Pudding' },
  { id: '15', text: 'Key Lime Pie' },
];

export default function PollPage() {
  return (
    <Poll
      cookieName="poll_completed"
      availableChoices={DESSERT_CHOICES}
      showTitle={true}
      showDescription={true}
      title="Favorite Desserts?"
      description="Drag and drop your top 5 favorite desserts from the list below."
      submittedTitle="Thank You!"
      submittedDescription="Your dessert preferences have been recorded."
    />
  );
}
