export function PostCardSkeleton() {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4">
      <div className="space-y-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/4 animate-pulse rounded bg-gray-100" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
} 