'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Eye, Clock, Bookmark } from 'lucide-react';
import { type Blog, formatDate, formatNumber } from '@/lib/data';

interface BlogCardProps {
  blog: Blog;
  compact?: boolean;
}

export function BlogCard({ blog, compact = false }: BlogCardProps) {
  return (
    <article
      className="card overflow-hidden h-full flex flex-col group hover:-translate-y-1 transition-transform duration-200"
    >
      {/* Image */}
      {!compact && (
        <Link href={`/blogs/${blog.slug}`} className="block overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {blog.trending && (
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 text-xs font-semibold bg-orange-500 text-white rounded-full shadow-lg flex items-center gap-1">
                  🔥 Trending
                </span>
              </div>
            )}
            <button
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-dark-card/90 flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-white dark:hover:bg-dark-card transition-all shadow-sm opacity-0 group-hover:opacity-100"
              aria-label="Bookmark"
              onClick={(e) => e.preventDefault()}
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </Link>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Category + Reading time */}
        <div className="flex items-center justify-between mb-3">
          <Link href={`/categories/${blog.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}>
            <span className="category-badge hover:bg-primary-200 dark:hover:bg-primary-800/50 transition-colors cursor-pointer">
              {blog.category}
            </span>
          </Link>
          <span className="flex items-center gap-1 text-xs text-gray-400 dark:text-dark-muted">
            <Clock className="w-3.5 h-3.5" />
            {blog.readingTime} min
          </span>
        </div>

        {/* Title */}
        <Link href={`/blogs/${blog.slug}`}>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight mb-2
            group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-dark-muted leading-relaxed line-clamp-2 mb-4 flex-1">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {blog.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-dark-muted">
              #{tag}
            </span>
          ))}
        </div>

        {/* Author + Metrics */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100 dark:border-dark-border">
          <Link href={`/authors/${blog.author.id}`} className="flex items-center gap-2 group/author">
            <Image
              src={blog.author.avatar}
              alt={blog.author.name}
              width={28}
              height={28}
              className="rounded-full bg-gray-100 dark:bg-slate-700"
            />
            <span className="text-xs font-medium text-gray-700 dark:text-dark-text group-hover/author:text-primary-600 dark:group-hover/author:text-primary-400 transition-colors">
              {blog.author.name.split(' ')[0]}
            </span>
          </Link>
          <span className="text-gray-300 dark:text-dark-border text-xs">•</span>
          <span className="text-xs text-gray-400 dark:text-dark-muted">{formatDate(blog.publishedAt)}</span>

          {/* Metrics */}
          <div className="ml-auto flex items-center gap-3 text-xs text-gray-400 dark:text-dark-muted">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-red-400" />
              {formatNumber(blog.likes)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-green-400" />
              {formatNumber(blog.views)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
