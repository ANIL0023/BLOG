import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { type Blog, formatDate } from '@/lib/data';

interface RelatedArticlesProps {
  blogs: Blog[];
}

export function RelatedArticles({ blogs }: RelatedArticlesProps) {
  if (blogs.length === 0) return null;

  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
      <h3 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
        <ArrowRight className="w-4 h-4 text-primary-500" />
        Related Articles
      </h3>
      <div className="space-y-4">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group flex gap-3">
            <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={blog.coverImage}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight mb-1">
                {blog.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-dark-muted">
                <Clock className="w-3 h-3" />
                <span>{blog.readingTime} min</span>
                <span>·</span>
                <span>{formatDate(blog.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
