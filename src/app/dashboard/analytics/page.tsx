import type { Metadata } from 'next';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Analytics } from '@/components/dashboard/Analytics';

export const metadata: Metadata = { title: 'Analytics – Dashboard' };

export default function DashboardAnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
            <p className="text-gray-500 dark:text-dark-muted text-sm mt-0.5">Track your article performance and audience insights.</p>
          </div>
          <Analytics />
        </div>
      </div>
    </div>
  );
}
