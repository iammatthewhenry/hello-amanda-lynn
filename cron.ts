// Cache Warmer — runs every 2 hours via Cloudflare Cron
// Fetches your sitemap and pings every page to keep Cloudflare cache warm

export async function scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
  console.log('Cache warmer starting...');

  try {
    // 1. Fetch your sitemap
    const sitemap = await fetch('https://helloamandalyn.com/sitemap.xml');
    const text = await sitemap.text();

    // 2. Extract all URLs
    const urls = [...text.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

    console.log(`Found ${urls.length} URLs to warm`);

    // 3. Ping in batches of 10 to avoid overwhelming anything
    for (let i = 0; i < urls.length; i += 10) {
      const batch = urls.slice(i, i + 10);
      await Promise.all(
        batch.map((url) =>
          fetch(url, {
            headers: {
              'User-Agent': 'CacheWarmer/1.0',
            },
          }).catch((err) => console.error(`Failed to warm ${url}:`, err))
        )
      );
    }

    console.log('Cache warmer complete');
  } catch (err) {
    console.error('Cache warmer failed:', err);
  }
}
