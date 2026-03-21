'use client';

import Link from 'next/link';
import { Flame, Twitter, Github, Linkedin, Mail, Rss } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Explore', href: '/blogs' },
    { label: 'Authors', href: '/authors' },
    { label: 'Categories', href: '/blogs' },
    { label: 'Write a Story', href: '/write' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Blog', href: '/blogs' },
    { label: 'Partners', href: '#' },
  ],
  Resources: [
    { label: 'Help Center', href: '#' },
    { label: 'Writing Guide', href: '#' },
    { label: 'Style Guide', href: '#' },
    { label: 'API Docs', href: '#' },
    { label: 'Status', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'DMCA', href: '#' },
  ],
};

const categories = [
  'Technology', 'Design', 'Business', 'AI & ML', 'Finance', 'Wellness', 'Science', 'Culture',
];

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-dark-border mt-20">
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl gradient-bg p-8 md:p-12 text-white text-center mb-16">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Stay in the loop</h3>
            <p className="text-white/80 mb-6">
              Get the best stories delivered to your inbox every week. No spam, ever.
            </p>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30
                  placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl
                  hover:bg-gray-100 transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-white/60">
              Join 50,000+ readers. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Blogo</span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-dark-muted leading-relaxed mb-4">
              A place to share your ideas, expertise, and stories with the world.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Rss, href: '#', label: 'RSS' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 dark:text-dark-muted
                    hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20
                    transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-3">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-500 dark:text-dark-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="border-t border-gray-200 dark:border-dark-border pt-8 mb-8">
          <p className="text-xs font-semibold text-gray-400 dark:text-dark-muted uppercase tracking-wider mb-3">
            Browse Categories
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categories/${cat.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                className="px-3 py-1.5 text-xs rounded-full bg-white dark:bg-dark-card text-gray-600 dark:text-dark-muted
                  border border-gray-200 dark:border-dark-border hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400
                  transition-all duration-200"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-dark-border">
          <p className="text-sm text-gray-500 dark:text-dark-muted">
            © {new Date().getFullYear()} Blogo. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-dark-muted">
            <span>Built with</span>
            <span className="text-red-500">♥</span>
            <span>using Next.js & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
