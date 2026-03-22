'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Users, BookOpen, Twitter, Github, Linkedin } from 'lucide-react';
import { BlogCard } from '@/components/blog/BlogCard';

interface AuthorProfileUIProps {
  author: any;
  blogs: any[];
}

export function AuthorProfileUI({ author, blogs }: AuthorProfileUIProps) {
  const { data: session } = useSession();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState(0);

  useEffect(() => {
    fetch(`/api/user/follow?userId=${author._id}`)
      .then(res => res.json())
      .then(data => {
        setIsFollowing(data.isFollowing);
        setFollowCount(data.followerCount);
      });
  }, [author._id]);

  const handleFollow = async () => {
    if (!session) {
      toast.error('Join Blogo to follow your favorite authors and stay updated on their latest genius!', {
        duration: 5000,
        icon: '✨',
        style: {
          background: '#6366f1',
          color: '#fff',
          fontWeight: '600',
        }
      });
      return;
    }

    try {
      const res = await fetch('/api/user/follow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetUserId: author._id })
      });
      const data = await res.json();
      if (res.ok) {
        setIsFollowing(data.isFollowing);
        setFollowCount(data.followerCount);
        toast.success(data.isFollowing ? `Following ${author.name}` : `Unfollowed ${author.name}`);
      }
    } catch {
      toast.error('Failed to update follow status');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Profile Header */}
      <div className="relative mb-8 md:mb-12">
        {/* Banner */}
        <div className="h-32 md:h-48 rounded-3xl gradient-bg opacity-80 mb-12" />

        {/* Profile Card */}
        <div className="absolute -bottom-6 left-0 right-0 flex flex-col md:flex-row items-start md:items-end gap-3 md:gap-4 px-6">
          <div className="relative">
            <Image
              src={author.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${author.name}`}
              alt={author.name}
              width={80}
              height={80}
              className="md:w-24 md:h-24 rounded-full bg-white dark:bg-dark-card ring-4 ring-white dark:ring-dark-bg shadow-xl"
            />
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{author.name}</h1>
            <p className="text-primary-600 dark:text-primary-400 font-medium">Author & Contributor</p>
          </div>
          <button 
            onClick={handleFollow}
            className={`px-6 py-2.5 rounded-xl text-sm mb-2 transition-all ${
                isFollowing 
                ? 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-slate-600'
                : 'btn-primary'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8 pt-6">
        {/* Articles */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Published Articles ({blogs.length})
          </h2>
          {blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {blogs.map((blog: any) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400 dark:text-dark-muted">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No articles published yet.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Bio */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">About</h3>
            <p className="text-sm text-gray-600 dark:text-dark-muted leading-relaxed">{author.bio}</p>

            {/* Social Links */}
            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-dark-border">
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Stats</h3>
            <div className="space-y-3">
              {[
                { label: 'Followers', value: followCount.toString(), icon: Users },
                { label: 'Articles', value: blogs.length.toString(), icon: BookOpen },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-dark-muted">
                    <Icon className="w-4 h-4 text-primary-400" />
                    {label}
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
