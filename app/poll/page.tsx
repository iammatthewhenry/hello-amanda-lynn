import type { Metadata } from 'next';
import { Poll } from '@/components';
import { getPollResults } from '@/lib/api/homepage';

/**
 * Poll Page - Server Component
 * 
 * Fetches active poll from WordPress. Falls back to hardcoded poll if unavailable.
 */

// ISR: Revalidate every 60 seconds for dynamic poll data
export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Food Poll',
  description: 'Vote in Amanda Lynn\'s latest food poll and see what other readers think!',
  openGraph: {
    title: 'Food Poll | hello Amanda Lynn',
    description: 'Vote in Amanda Lynn\'s latest food poll',
    type: 'website',
  },
};

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

export default async function PollPage() {
  // Try to fetch poll data from WordPress
  const pollData = await getPollResults();

  // TODO: Once poll CPT is implemented, use WordPress data to populate Poll component
  // For now, using hardcoded poll data

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
