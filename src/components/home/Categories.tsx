'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Tag } from 'lucide-react';
import { categories } from '@/lib/data';

export function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2 mb-8"
      >
        <Tag className="w-5 h-5 text-primary-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse by Topic</h2>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Link
              href={`/categories/${cat.slug}`}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl bg-white dark:bg-dark-card
                border border-gray-100 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700
                shadow-sm hover:shadow-md transition-all duration-300 text-center hover:-translate-y-1"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-semibold text-gray-700 dark:text-dark-text group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                {cat.name}
              </span>
              <span className="text-xs text-gray-400 dark:text-dark-muted">{cat.count}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
