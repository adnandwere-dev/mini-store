export default function Loading() {
  return (
    <div className="flex min-h-96 items-center justify-center p-6">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      <span className="sr-only">Loading store</span>
    </div>
  );
}
