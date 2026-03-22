import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import Post from '@/models/Post';
import User from '@/models/User';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { PostCard } from '@/components/dashboard/PostCard';
import Link from 'next/link';

export default async function MyArticlesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/auth/login');

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Articles</h1>
              <p className="text-gray-500 dark:text-dark-muted text-sm mt-0.5">Manage your published and drafted content.</p>
            </div>
            <Link href="/write" className="btn-primary text-sm px-4 py-2 rounded-xl">
               Write New
            </Link>
          </div>

          <div className="space-y-4">
            {posts.length === 0 ? (
               <div className="text-center py-12 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border">
                  <p className="text-gray-500 mb-4">You haven't written anything yet.</p>
                  <Link href="/write" className="btn-primary px-6 py-2.5 rounded-xl font-medium inline-block">Start Writing</Link>
               </div>
            ) : (
               posts.map((post: any) => (
                  <PostCard key={post._id} post={JSON.parse(JSON.stringify(post))} />
               ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
