import Image from 'next/image';
import Link from 'next/link';
import { Users, BookOpen, ArrowRight } from 'lucide-react';
import { authors, formatNumber } from '@/lib/data';

export function TopAuthors() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="animate-fadeInUp flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Authors</h2>
        </div>
        <Link
          href="/authors"
          className="flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:gap-2.5 transition-all"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {authors.map((author, index) => (
          <div
            key={author.id}
            className={`animate-fadeInUp stagger-${Math.min(index + 1, 6)}`}
          >
            <Link
              href={`/authors/${author.id}`}
              className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-dark-card
                border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-lg
                hover:border-primary-200 dark:hover:border-primary-800 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative mb-3">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={60}
                  height={60}
                  className="rounded-full bg-gray-100 dark:bg-slate-700 ring-2 ring-transparent group-hover:ring-primary-400 transition-all"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full gradient-bg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{index + 1}</span>
                </div>
              </div>
              <h3 className="font-semibold text-sm text-gray-900 dark:text-white mb-1 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {author.name.split(' ')[0]}
              </h3>
              <span className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-2">
                {author.category}
              </span>
              <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-dark-muted">
                <span className="flex items-center gap-0.5">
                  <Users className="w-3 h-3" />
                  {formatNumber(author.followers)}
                </span>
                <span className="flex items-center gap-0.5">
                  <BookOpen className="w-3 h-3" />
                  {author.articles}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
