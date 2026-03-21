'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';
import { searchBlogs } from '@/lib/data';
import { Suspense } from 'react';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const results = query ? searchBlogs(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Search className="w-6 h-6 text-primary-500" />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {query ? `Results for "${query}"` : 'Search'}
          </h1>
        </div>
        {query && (
          <p className="text-gray-500 dark:text-dark-muted">
            Found <span className="font-semibold text-gray-900 dark:text-white">{results.length}</span> article{results.length !== 1 ? 's' : ''}
          </p>
        )}
      </motion.div>

      {/* Results */}
      {!query ? (
        <div className="text-center py-20">
          <Search className="w-16 h-16 mx-auto mb-4 text-gray-200 dark:text-slate-700" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Start searching</h3>
          <p className="text-gray-500 dark:text-dark-muted">Enter a keyword to discover articles</p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No results found</h3>
          <p className="text-gray-500 dark:text-dark-muted">
            We couldn&apos;t find any articles matching &quot;{query}&quot;. Try different keywords.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" /></div>}>
      <SearchResults />
    </Suspense>
  );
}
