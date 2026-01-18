// app/loading.tsx – Server-safe loading skeleton
export default function Loading() {
  return (
    <div className="page-loading">
      <div className="loading-hero" />

      <div className="loading-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i}>
            <div
              className="loading-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
            <div
              className="loading-line"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
            <div
              className="loading-line short"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
