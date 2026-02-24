// app/offerWorks/loading.jsx
export default function Loading() {
  return (
    <div className="flex flex-row gap-2">
      {/* Skeleton listy */}
      <div className="flex-1 flex flex-col gap-2">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="animate-pulse bg-neutral-700 h-20 w-full rounded" />
        ))}
      </div>

      {/* Skeleton mapy */}
      <div className="flex-1 bg-neutral-800 animate-pulse rounded min-h-[580px]" />
    </div>
  );
}
