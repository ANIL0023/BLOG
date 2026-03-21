import type { Metadata } from 'next';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { BlogsTable } from '@/components/dashboard/BlogsTable';
import { PenSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'My Articles – Dashboard' };

export default function DashboardBlogsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Articles</h1>
              <p className="text-gray-500 dark:text-dark-muted text-sm mt-0.5">Manage and track all your published and draft articles.</p>
            </div>
            <Link href="/write" className="btn-primary text-sm px-4 py-2 rounded-xl">
              <PenSquare className="w-4 h-4" />
              New Article
            </Link>
          </div>
          <BlogsTable />
        </div>
      </div>
    </div>
  );
}
