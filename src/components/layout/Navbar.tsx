'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Search, Menu, X, PenSquare, Bell, User, ChevronDown, Flame } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const navLinks = [
  { href: '/blogs', label: 'Explore' },
  { href: '/categories/technology', label: 'Technology' },
  { href: '/categories/design', label: 'Design' },
  { href: '/authors', label: 'Authors' },
  { href: '/about', label: 'About' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-lg shadow-lg shadow-black/5 border-b border-gray-200/50 dark:border-dark-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Blogo</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-card'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 dark:text-dark-muted
                  bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border
                  hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-200 min-w-[120px]"
              >
                <Search className="w-4 h-4" />
                <span>Search...</span>
                <kbd className="ml-auto text-xs bg-gray-200 dark:bg-slate-700 px-1.5 py-0.5 rounded">⌘K</kbd>
              </button>

              <ThemeToggle />

              <Link
                href="/write"
                className="btn-primary text-sm px-4 py-2 rounded-lg"
              >
                <PenSquare className="w-4 h-4" />
                Write
              </Link>

              <Link
                href="/auth/login"
                className="btn-secondary text-sm px-4 py-2 rounded-lg"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-dark-border px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-gray-200 dark:border-dark-border flex gap-2">
              <Link href="/write" className="btn-primary flex-1 text-sm py-2.5 rounded-xl">
                <PenSquare className="w-4 h-4" /> Write
              </Link>
              <Link href="/auth/login" className="btn-secondary flex-1 text-sm py-2.5 rounded-xl">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Search Modal */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearch} className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-dark-border gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search articles, topics, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-lg outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
            <div className="p-4">
              <p className="text-sm text-gray-500 dark:text-dark-muted mb-3 font-medium">Popular Topics</p>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'AI', 'Design Systems', 'Productivity'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setSearchQuery(tag);
                      router.push(`/search?q=${encodeURIComponent(tag)}`);
                      setSearchOpen(false);
                    }}
                    className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-dark-text hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
