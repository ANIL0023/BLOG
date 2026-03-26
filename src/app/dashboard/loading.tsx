export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-4 w-32 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border space-y-3">
              <div className="h-4 w-20 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4 p-4 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
              <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-xl animate-pulse shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
                <div className="h-3 w-1/4 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
