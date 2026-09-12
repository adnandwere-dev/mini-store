export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
      {Array(18)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"
          />
        ))}
    </div>
  );
}
