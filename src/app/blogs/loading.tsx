export default function BlogsLoading() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* Title skeleton */}
        <div className="h-10 w-64 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />

        {/* Filter bar skeleton */}
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-24 bg-gray-100 dark:bg-slate-800 rounded-full animate-pulse" />
          ))}
        </div>

        {/* Blog cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
              <div className="space-y-2 px-1">
                <div className="h-5 w-20 bg-gray-100 dark:bg-slate-800 rounded-full animate-pulse" />
                <div className="h-6 w-full bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                <div className="h-4 w-3/4 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
                <div className="flex items-center gap-2 pt-2">
                  <div className="w-7 h-7 bg-gray-100 dark:bg-slate-800 rounded-full animate-pulse" />
                  <div className="h-3 w-20 bg-gray-100 dark:bg-slate-800 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
