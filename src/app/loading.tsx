'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg">
      {/* Hero Skeleton */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-100 dark:bg-slate-800/50">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative z-10 max-w-3xl w-full px-4 text-center space-y-8">
          <div className="h-10 w-48 bg-gray-200 dark:bg-slate-700 rounded-full mx-auto animate-pulse" />
          <div className="h-16 md:h-24 w-full bg-gray-200 dark:bg-slate-700 rounded-2xl animate-pulse" />
          <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded-xl mx-auto animate-pulse" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-14 w-40 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />
            <div className="h-14 w-40 bg-gray-200 dark:bg-slate-700 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeletons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Section Title */}
        <div className="h-8 w-64 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
        
        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
              <div className="h-6 w-3/4 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              <div className="h-4 w-1/2 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
