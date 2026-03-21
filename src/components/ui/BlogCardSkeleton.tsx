export function BlogCardSkeleton() {
  return (
    <div className="card overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-slate-700 rounded-t-2xl" />
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 bg-gray-200 dark:bg-slate-700 rounded-full" />
          <div className="h-5 w-16 bg-gray-200 dark:bg-slate-700 rounded-full" />
        </div>
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-5/6" />
        <div className="flex items-center gap-3 pt-2">
          <div className="h-8 w-8 bg-gray-200 dark:bg-slate-700 rounded-full" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="ml-auto h-4 w-16 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    </div>
  );
}
