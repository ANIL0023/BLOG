'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Users, BookOpen, TrendingUp, Search } from 'lucide-react';
import { useState } from 'react';
import { authors, formatNumber } from '@/lib/data';

export default function AuthorsPage() {
  const [search, setSearch] = useState('');

  const filtered = authors.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Meet Our <span className="gradient-text">Authors</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-dark-muted max-w-2xl mx-auto">
          Brilliant minds sharing their expertise across technology, design, business, and more.
        </p>
      </motion.div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search authors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Authors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((author, index) => (
          <motion.div
            key={author.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/authors/${author.id}`} className="group block">
              <div className="card p-6 hover:-translate-y-1">
                {/* Avatar + Follow */}
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      width={72}
                      height={72}
                      className="rounded-full bg-gray-100 dark:bg-slate-700 ring-4 ring-gray-50 dark:ring-dark-bg group-hover:ring-primary-100 dark:group-hover:ring-primary-900/30 transition-all"
                    />
                  </div>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="btn-primary text-xs px-4 py-2 rounded-lg"
                  >
                    Follow
                  </button>
                </div>

                {/* Info */}
                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-0.5">
                  {author.name}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-3">{author.category} Expert</p>
                <p className="text-sm text-gray-600 dark:text-dark-muted leading-relaxed line-clamp-2 mb-4">
                  {author.bio}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-dark-border">
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-dark-muted">
                    <Users className="w-4 h-4 text-primary-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{formatNumber(author.followers)}</span>
                    <span>followers</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-dark-muted">
                    <BookOpen className="w-4 h-4 text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">{author.articles}</span>
                    <span>articles</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">👤</div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No authors found</h3>
          <p className="text-gray-500 dark:text-dark-muted">Try a different search term.</p>
        </div>
      )}
    </div>
  );
}
