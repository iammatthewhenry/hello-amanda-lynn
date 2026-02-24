export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await fetch("https://example.com", {
    cache: "no-store",
  });

  const text = await res.text();

  return (
    <div>
      <h1>SSR is active</h1>
      <p>Length: {text.length}</p>
    </div>
  );
}
