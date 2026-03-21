'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Eye, Heart, MessageCircle, Edit3, Trash2,
  MoreHorizontal, Search, Filter, TrendingUp, Clock, CheckCircle, XCircle
} from 'lucide-react';
import { blogs, formatNumber, formatDate } from '@/lib/data';
import toast from 'react-hot-toast';

type Status = 'published' | 'draft' | 'all';

export function BlogsTable() {
  const [filter, setFilter] = useState<Status>('all');
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const myBlogs = blogs.slice(0, 8).map((b, i) => ({
    ...b,
    status: i % 4 === 0 ? 'draft' : 'published',
  }));

  const filtered = myBlogs.filter((b) => {
    const matchesFilter = filter === 'all' || b.status === filter;
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleDelete = (title: string) => {
    toast.error(`"${title}" deleted`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex rounded-xl border border-gray-200 dark:border-dark-border overflow-hidden bg-white dark:bg-dark-card">
          {(['all', 'published', 'draft'] as Status[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2.5 text-sm font-medium capitalize transition-all ${
                filter === s
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-500 dark:text-dark-muted hover:bg-gray-50 dark:hover:bg-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Bulk action */}
      {selectedIds.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800/30"
        >
          <span className="text-sm font-medium text-primary-700 dark:text-primary-400">
            {selectedIds.size} selected
          </span>
          <button
            onClick={() => { toast.error(`${selectedIds.size} articles deleted`); setSelectedIds(new Set()); }}
            className="ml-auto text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Delete Selected
          </button>
        </motion.div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-dark-border">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) setSelectedIds(new Set(filtered.map((b) => b.id)));
                      else setSelectedIds(new Set());
                    }}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Article</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Metrics</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
              {filtered.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(blog.id)}
                      onChange={() => toggleSelect(blog.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden">
                        <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
                      </div>
                      <div>
                        <Link href={`/blogs/${blog.slug}`} className="font-semibold text-gray-900 dark:text-white text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-1">
                          {blog.title}
                        </Link>
                        <span className="text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 px-2 py-0.5 rounded-full mt-1 inline-block">
                          {blog.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
                      blog.status === 'published'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {blog.status === 'published'
                        ? <CheckCircle className="w-3 h-3" />
                        : <Clock className="w-3 h-3" />
                      }
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-dark-muted">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-green-400" />
                        {formatNumber(blog.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-red-400" />
                        {formatNumber(blog.likes)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                        {blog.comments}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-gray-500 dark:text-dark-muted whitespace-nowrap">
                    {formatDate(blog.publishedAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/write?edit=${blog.id}`}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.title)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile list */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-dark-border">
          {filtered.map((blog) => (
            <div key={blog.id} className="p-4 flex items-start gap-3">
              <div className="relative w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden">
                <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/blogs/${blog.slug}`} className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 hover:text-primary-600 transition-colors">
                  {blog.title}
                </Link>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    blog.status === 'published'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {blog.status}
                  </span>
                  <span className="text-xs text-gray-400">{formatDate(blog.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNumber(blog.views)}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatNumber(blog.likes)}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <Link href={`/write?edit=${blog.id}`} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button onClick={() => handleDelete(blog.title)} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400 dark:text-dark-muted">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BookOpen({ className }: { className: string }) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
}
