'use client';

import { useState, useEffect } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { PostCard } from '@/components/dashboard/PostCard';
import { Bookmark, Search, Loader2 } from 'lucide-react';

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/user/bookmarks')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBookmarks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredBookmarks = bookmarks.filter(b => 
    b.title?.toLowerCase().includes(search.toLowerCase()) || 
    b.category?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bookmarks</h1>
              <p className="text-gray-500 dark:text-dark-muted text-sm mt-0.5">Articles you've saved for later reading.</p>
            </div>
            
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input 
                  type="text" 
                  placeholder="Search saved articles..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm w-64" 
               />
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
               <div className="flex justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
               </div>
            ) : filteredBookmarks.length === 0 ? (
               <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                     <Bookmark className="w-8 h-8 text-gray-300 dark:text-dark-muted" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                     {search ? 'No matches found' : 'No bookmarks yet'}
                  </h3>
                  <p className="text-gray-500 dark:text-dark-muted max-w-sm">
                     {search ? 'Try searching for something else.' : "When you find an article you want to read later, click the bookmark icon and it will show up here."}
                  </p>
               </div>
            ) : (
               filteredBookmarks.map((post) => (
                  <PostCard key={post._id} post={post} />
               ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
