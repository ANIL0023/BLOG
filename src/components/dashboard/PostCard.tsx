'use client';

import { useState } from 'react';
import { Edit3, Trash2, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function PostCard({ post }: { post: any }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${post._id}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Article deleted');
        router.refresh();
      } else {
        toast.error('Failed to delete article');
      }
    } catch {
      toast.error('An error occurred');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={`bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-dark-border shadow-sm flex items-center justify-between group hover:shadow-md transition-all ${deleting ? 'opacity-50 pointer-events-none' : ''}`}>
       <div className="flex-1 min-w-0 mr-6">
          <div className="flex items-center gap-3 mb-2">
             <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                {post.category}
             </span>
             {!post.isPublished && (
               <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                 Draft
               </span>
             )}
             <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.createdAt).toLocaleDateString()}
             </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap overflow-hidden text-ellipsis mb-1">
             {post.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap overflow-hidden text-ellipsis">
             {post.excerpt || 'No excerpt available...'}
          </p>
       </div>
       <div className="flex items-center gap-4">
          <div className="text-center px-4 border-x border-gray-100 dark:border-dark-border hidden md:block">
             <div className="text-lg font-bold text-gray-900 dark:text-white">{post.views || 0}</div>
             <div className="text-xs text-gray-400">Views</div>
          </div>
          <div className="flex items-center gap-2">
             <Link href={`/write?id=${post._id}`} className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors inline-block">
                <Edit3 className="w-4 h-4" />
             </Link>
             <button onClick={handleDelete} disabled={deleting} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
             </button>
          </div>
       </div>
    </div>
  );
}
