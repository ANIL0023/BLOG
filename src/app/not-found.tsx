import Link from 'next/link';
import { Home, ArrowLeft, Search, Flame } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-9xl font-extrabold gradient-text leading-none select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-primary-500/10 animate-pulse" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-gray-500 dark:text-dark-muted mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/" className="btn-primary px-6 py-3 rounded-xl">
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/blogs" className="btn-secondary px-6 py-3 rounded-xl">
            <Search className="w-4 h-4" />
            Explore Articles
          </Link>
        </div>

        {/* Suggestions */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-dark-border">
          <p className="text-sm text-gray-400 dark:text-dark-muted mb-4">Popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { href: '/blogs', label: '📖 All Articles' },
              { href: '/authors', label: '👥 Authors' },
              { href: '/categories/technology', label: '💻 Technology' },
              { href: '/about', label: '📌 About' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-4 py-2 text-sm rounded-full bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-muted border border-gray-200 dark:border-dark-border hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
