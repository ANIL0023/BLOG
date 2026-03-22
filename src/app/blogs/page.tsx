'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';
import { categories } from '@/lib/data';

export default function BlogsPage() {
  const [dbBlogs, setDbBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'trending'>('recent');

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          const mapped = data.data.map((p: any) => ({
            id: p._id,
            slug: p._id,
            title: p.title,
            excerpt: p.excerpt || p.content?.substring(0, 120) || '',
            content: p.content,
            coverImage: p.coverImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
            category: p.category,
            tags: p.tags || [],
            author: {
              id: p.author?._id || 'unknown',
              name: p.author?.name || 'System',
              avatar: p.author?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.author?.name || 'anon'}`,
            },
            publishedAt: p.createdAt,
            readingTime: Math.max(1, Math.ceil((p.content?.split(/\s+/)?.length || 0) / 200)),
            likes: p.likes || 0,
            views: p.views || 0,
            trending: p.views > 50
          }));
          setDbBlogs(mapped);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const filtered = useMemo(() => {
    let result = [...dbBlogs];
    if (selectedCategory !== 'all') {
      result = result.filter((b) => b.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.tags.some((t: string) => t.toLowerCase().includes(q))
      );
    }
    switch (sortBy) {
      case 'popular': return result.sort((a, b) => b.views - a.views);
      case 'trending': return result.filter((b) => b.trending).concat(result.filter((b) => !b.trending));
      default: return result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }
  }, [search, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Explore{' '}
          <span className="gradient-text">All Articles</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
          Discover thousands of thought-provoking articles from the brightest minds on the internet.
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles, topics, tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 min-w-[160px]"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="trending">Trending</option>
        </select>
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-thin"
      >
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
              : 'bg-white dark:bg-dark-card text-gray-600 dark:text-dark-muted border border-gray-200 dark:border-dark-border hover:border-primary-400'
          }`}
        >
          All Topics
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat.name
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                : 'bg-white dark:bg-dark-card text-gray-600 dark:text-dark-muted border border-gray-200 dark:border-dark-border hover:border-primary-400'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </motion.div>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-500 dark:text-dark-muted">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{filtered.length}</span> articles
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <BlogCard blog={blog} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
          <p className="text-gray-500 dark:text-dark-muted">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}
