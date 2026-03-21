'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageCircle, Eye, Clock, ArrowRight, Star } from 'lucide-react';
import { type Blog, formatDate, formatNumber } from '@/lib/data';

interface FeaturedStoryProps {
  blog: Blog;
}

export function FeaturedStory({ blog }: FeaturedStoryProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-8"
      >
        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        <span className="text-sm font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider">
          Featured Story
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <Link href={`/blogs/${blog.slug}`}>
          <div className="group relative overflow-hidden rounded-3xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-2xl transition-all duration-500 grid md:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 md:h-auto overflow-hidden">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10 dark:to-black/30" />

              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="category-badge shadow-lg">{blog.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                  Editor&apos;s Pick
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {blog.title}
              </h2>

              <p className="text-gray-600 dark:text-dark-muted leading-relaxed mb-6 line-clamp-3">
                {blog.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-dark-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-dark-border">
                <Image
                  src={blog.author.avatar}
                  alt={blog.author.name}
                  width={40}
                  height={40}
                  className="rounded-full bg-gray-100 dark:bg-slate-700"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">
                    {blog.author.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-dark-muted">
                    {formatDate(blog.publishedAt)}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-gray-400 dark:text-dark-muted text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{blog.readingTime} min read</span>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-dark-muted">
                  <span className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-red-400" />
                    {formatNumber(blog.likes)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 text-blue-400" />
                    {formatNumber(blog.comments)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-green-400" />
                    {formatNumber(blog.views)}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:gap-2.5 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
