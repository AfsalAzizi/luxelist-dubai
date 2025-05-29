export default function PropertyCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="relative h-48 w-full bg-gray-200 animate-pulse" />
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded w-24 animate-pulse mt-2" />
      </div>
    </div>
  );
}
