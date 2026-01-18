// =================================================================
// CENTRALIZED BLOG POSTS DATA
// Single source of truth for all blog/article mock data
// =================================================================

export interface BlogPost {
  slug: string;
  title: string;
  image: string;
  publishedDate: string;
  author: string;
  category: string;
  readTime: string;
  description: string;
  content: string[];
  tips?: string[];
}

export const inTheKitchenPosts: Record<string, BlogPost> = {
  'mastering-knife-skills': {
    slug: 'mastering-knife-skills',
    title: 'Knife Skills for Beginners',
    image: 'https://images.unsplash.com/photo-1636647511729-6703539ba71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raW5nJTIwa2l0Y2hlbnxlbnwxfHx8fDE3NjE0NzQ0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'October 20, 2025',
    author: 'Amanda Lynn',
    category: 'Techniques',
    readTime: '8 min read',
    description: 'Learn the essential knife techniques that will transform your cooking.',
    content: [
      'When I first started cooking, I was intimidated by knives. I\'d awkwardly saw through vegetables, my cuts were uneven, and prep work took forever. Learning proper knife skills was a game-changer that transformed not just my cooking, but my confidence in the kitchen.',
      'Let\'s start with the basics: holding your knife correctly. Place your thumb and forefinger on opposite sides of the blade, just above the handle. Your other three fingers wrap around the handle. This \'pinch grip\' gives you maximum control and feels awkward at first, but stick with it.',
      'Your other hand—the guide hand—is equally important. Curl your fingertips inward, using your knuckles as a guide for the blade. This \'claw grip\' protects your fingertips while keeping ingredients stable. The knife blade should rest against your knuckles as you cut.',
      'The three essential cuts every home cook should master are the slice, the dice, and the chiffonade. For slicing, use a smooth rocking motion, keeping the tip of the knife on the cutting board. For dicing, first slice lengthwise, then crosswise. For chiffonade (ribbons), stack leafy greens, roll tightly, and slice thinly.',
      'Practice makes perfect, but smart practice makes progress faster. Start slow and focus on consistency rather than speed. Speed will come naturally as your technique improves. Use a sharp knife—dull knives are actually more dangerous because they require more pressure and are more likely to slip.',
      'A good quality chef\'s knife is worth the investment. You don\'t need a whole set—just one 8-inch chef\'s knife will handle 90% of your kitchen tasks. Keep it sharp, hand wash it, and store it properly. A sharp knife is a safe knife and makes cooking so much more enjoyable.',
      'One of my favorite exercises for beginners is the \'dice an onion\' challenge. Onions are forgiving, affordable, and require all the basic techniques. Practice dicing a few onions (freeze them for later use!) and watch your confidence soar.'
    ],
    tips: [
      'Keep your knife sharp—a sharp knife is safer than a dull one',
      'Use a stable cutting board with a damp towel underneath to prevent slipping',
      'Focus on consistency before speed—speed comes with practice',
      'Practice the claw grip to protect your fingertips',
      'Invest in one good chef\'s knife rather than a cheap set'
    ]
  },
  'building-spice-collection': {
    slug: 'building-spice-collection',
    title: 'Building Your Essential Spice Collection',
    image: 'https://images.unsplash.com/photo-1558013637-a125529cc856?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljZSUyMGphcnMlMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2MjczMzg3MHww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'October 12, 2025',
    author: 'Amanda Lynn',
    category: 'Tips',
    readTime: '10 min read',
    description: 'A guide to the must-have spices for every home kitchen.',
    content: [
      'Walking into a well-stocked spice store can be overwhelming. Hundreds of jars, exotic names, steep prices—where do you even start? After years of cooking and experimenting, I\'ve narrowed down the essential spices that form the foundation of my cooking.',
      'Let\'s start with the big five: salt, black pepper, garlic powder, onion powder, and paprika. These five spices will get you through most basic recipes. Real kosher salt and freshly ground black pepper are non-negotiables in my kitchen. The difference in flavor is dramatic.',
      'Next level up: add cumin, chili powder, cinnamon, oregano, and basil. Now you can cook Mexican, Italian, Middle Eastern, and baking recipes. These ten spices cover about 80% of recipes you\'ll encounter. Buy them in small quantities from bulk bins if possible—spices lose potency over time.',
      'Storage matters more than people think. Spices should be stored in airtight containers away from heat, light, and moisture. That means not above your stove! A cool, dark cabinet is ideal. Whole spices last longer than ground—buy whole peppercorns, nutmeg, and cinnamon sticks when possible.',
      'Here\'s a controversial opinion: those pre-mixed spice blends aren\'t always bad. Italian seasoning, herbs de Provence, and curry powder are convenient and consistent. But read the ingredients—some contain fillers or salt. As you grow more confident, you can create your own custom blends.',
      'When to use dried vs. fresh herbs? Heartier herbs like rosemary, thyme, and oregano work well dried for long cooking times. Delicate herbs like basil, cilantro, and parsley are best fresh as a finishing touch. Dried herbs are about 3x more potent than fresh, so adjust accordingly.',
      'Finally, smell your spices before using them. If they don\'t smell strongly, they won\'t taste strongly. Most ground spices last 1-2 years, whole spices 3-4 years. Date your jars and refresh them regularly. Quality, fresh spices make the difference between okay food and amazing food.'
    ],
    tips: [
      'Start with the basic five: salt, pepper, garlic powder, onion powder, paprika',
      'Buy in small quantities and refresh regularly for best flavor',
      'Store in a cool, dark place away from the stove',
      'Toast whole spices before grinding for maximum flavor',
      'Smell test your spices—if they don\'t smell strong, they won\'t taste strong'
    ]
  },
  'perfect-pasta': {
    slug: 'perfect-pasta',
    title: 'The Art of Making Perfect Pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYxNDc5NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'October 5, 2025',
    author: 'Amanda Lynn',
    category: 'Techniques',
    readTime: '9 min read',
    description: 'Discover the secrets to cooking pasta like an Italian grandmother.',
    content: [
      'Pasta seems simple—boil water, add pasta, drain. But there\'s an art to achieving that perfect al dente texture and properly coating each strand with sauce. These techniques transformed my pasta from merely edible to restaurant-quality.',
      'First, use plenty of water. The general rule is 4-6 quarts of water per pound of pasta. Pasta needs room to move freely as it cooks. Cramped pasta sticks together and cooks unevenly. Yes, it takes longer to boil that much water, but it\'s worth it.',
      'Salt your water generously—it should taste like the sea. This is your only chance to season the pasta itself. About 1-2 tablespoons of salt per pound of pasta. Don\'t add oil to the water; it prevents sauce from adhering to the pasta later.',
      'Don\'t rely solely on the package timing. Start testing pasta 2 minutes before the recommended time. Al dente means \'to the tooth\' in Italian—the pasta should have a slight firmness when you bite into it. It will continue cooking slightly after you drain it.',
      'Here\'s the game-changer: save a cup of pasta cooking water before draining. This starchy, salty water is liquid gold for creating silky, cohesive sauces. Add it gradually to your sauce along with the pasta to achieve that glossy, restaurant-quality finish.',
      'Never rinse your pasta unless you\'re making a cold pasta salad. The starch on the surface helps sauce cling. Instead, immediately toss hot, just-drained pasta with your sauce. The residual heat helps the sauce penetrate the pasta.',
      'Match pasta shapes to sauces thoughtfully. Long, thin pasta like spaghetti pairs with oil-based or light tomato sauces. Tube pasta like penne holds chunky sauces. Wide noodles like pappardelle work with hearty meat sauces. Ridged pasta (rigate) catches more sauce than smooth.'
    ],
    tips: [
      'Use 4-6 quarts of water per pound of pasta',
      'Salt water generously until it tastes like the sea',
      'Save pasta water before draining—it\'s perfect for sauce',
      'Test pasta 2 minutes before package time for al dente',
      'Never rinse hot pasta—the starch helps sauce cling'
    ]
  },
  'kitchen-organization': {
    slug: 'kitchen-organization',
    title: 'Kitchen Organization Hacks',
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwb3JnYW5pemF0aW9ufGVufDF8fHx8MTc2MTUxMzQyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    publishedDate: 'September 28, 2025',
    author: 'Amanda Lynn',
    category: 'Organization',
    readTime: '7 min read',
    description: 'Transform your kitchen workflow with simple organization tips.',
    content: [
      'A disorganized kitchen is frustrating. You waste time searching for tools, ingredients expire forgotten in the back of cabinets, and cooking feels like a chore. When I reorganized my kitchen using these principles, cooking became genuinely enjoyable again.',
      'Start with a ruthless declutter. If you haven\'t used something in a year, donate it. That single-use gadget you never reach for? Gone. Duplicate tools collecting dust? Out. Be honest about what you actually use and need.',
      'Organize by workflow, not by appearance or category. Keep items where you use them. Cutting boards and knives near the prep area. Pots and pans near the stove. Baking supplies together in one zone. This means less movement and more efficiency.',
      'Use vertical space effectively. Wall-mounted shelves, magnetic knife strips, hanging pots, pegboards—they multiply your storage capacity. I installed a pegboard system that lets me see everything at a glance and customize the layout.',
      'Implement the \'first in, first out\' system for ingredients. Move older items to the front when restocking. Use clear containers so you can see what you have at a glance. Label everything with contents and dates.',
      'Create zones for different meal types. Breakfast items in one area, baking supplies together, snacking foods grouped. This makes meal prep faster and prevents you from buying duplicates.',
      'Finally, a clean and organized kitchen isn\'t about being perfect—it\'s about making cooking enjoyable. Invest in storage solutions that fit your kitchen and your habits. What works for me might not work for you, so experiment and adjust.'
    ],
    tips: [
      'Organize by workflow, not appearance',
      'Keep your most-used tools in the most accessible spots',
      'Use clear containers and label with dates',
      'Create a \'first in, first out\' system for ingredients',
      'Invest in vertical storage solutions to maximize space'
    ]
  }
};

// Helper to get post list for listing pages
export function getInTheKitchenPostsList() {
  return Object.values(inTheKitchenPosts).map(post => ({
    slug: post.slug,
    title: post.title,
    image: post.image,
    description: post.description,
    category: post.category,
    readTime: post.readTime,
  }));
}

// Helper to get a single post by slug
export function getInTheKitchenPost(slug: string): BlogPost | undefined {
  return inTheKitchenPosts[slug];
}
