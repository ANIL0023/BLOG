import type { Metadata } from 'next';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Analytics } from '@/components/dashboard/Analytics';
import { PenSquare, BookOpen, TrendingUp, Bell } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Dashboard' };

const quickActions = [
  { href: '/write', icon: PenSquare, label: 'New Article', color: 'bg-primary-600 hover:bg-primary-700 text-white' },
  { href: '/dashboard/blogs', icon: BookOpen, label: 'My Articles', color: 'bg-white dark:bg-dark-card hover:bg-gray-50 text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border' },
  { href: '/dashboard/analytics', icon: TrendingUp, label: 'Analytics', color: 'bg-white dark:bg-dark-card hover:bg-gray-50 text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-gray-500 dark:text-dark-muted text-sm mt-0.5">Welcome back, Alex! Here&apos;s what&apos;s happening.</p>
            </div>
            <Link href="/write" className="btn-primary text-sm px-4 py-2 rounded-xl">
              <PenSquare className="w-4 h-4" />
              Write
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 mb-8">
            {quickActions.map(({ href, icon: Icon, label, color }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:scale-[1.02] ${color}`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </div>

          {/* Analytics */}
          <Analytics />
        </div>
      </div>
    </div>
  );
}
