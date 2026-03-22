'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
  LayoutDashboard, BookOpen, PenSquare, BarChart3,
  Settings, Bell, Bookmark, LogOut, ChevronRight
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const userName = session?.user?.name || 'Author';
  const userImage = session?.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`;

  const [stats, setStats] = useState({ posts: 0, followers: 0, following: 0 });

  useEffect(() => {
    if (session) {
      fetch('/api/user/stats')
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setStats({ posts: data.totalPosts, followers: data.followers, following: data.following });
          }
        });
    }
  }, [session]);

  const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Overview', badge: null },
    { href: '/dashboard/blogs', icon: BookOpen, label: 'My Articles', badge: stats.posts > 0 ? String(stats.posts) : null },
    { href: '/write', icon: PenSquare, label: 'Write New', badge: null },
    { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics', badge: null },
    { href: '/dashboard/bookmarks', icon: Bookmark, label: 'Bookmarks', badge: null },
    { href: '/dashboard/notifications', icon: Bell, label: 'Notifications', badge: null },
    { href: '/dashboard/settings', icon: Settings, label: 'Settings', badge: null },
  ];

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="sticky top-24 space-y-4">
        {/* User Profile Card */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-3">
              <Image
                src={userImage}
                alt={userName}
                width={72}
                height={72}
                className="rounded-full bg-gray-100 dark:bg-slate-700 ring-4 ring-primary-100 dark:ring-primary-900/30"
              />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full gradient-bg text-white text-xs flex items-center justify-center shadow">
                ✎
              </button>
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">{userName}</h3>
            <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-0.5">Blogo Writer</p>
            <div className="flex gap-4 mt-3 pt-3 w-full border-t border-gray-100 dark:border-dark-border">
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.posts}</div>
                <div className="text-xs text-gray-400 dark:text-dark-muted">Posts</div>
              </div>
              <div className="flex-1 text-center border-x border-gray-100 dark:border-dark-border">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.followers}</div>
                <div className="text-xs text-gray-400 dark:text-dark-muted">Followers</div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-lg font-bold text-gray-900 dark:text-white">{stats.following}</div>
                <div className="text-xs text-gray-400 dark:text-dark-muted">Following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
          <nav className="p-2">
            {navItems.map(({ href, icon: Icon, label, badge }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group mb-0.5 ${
                    active
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-primary-600 dark:text-primary-400' : ''}`} />
                  <span className="text-sm font-medium flex-1">{label}</span>
                  {badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      active
                        ? 'bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300'
                        : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-dark-muted'
                    }`}>
                      {badge}
                    </span>
                  )}
                  {active && <ChevronRight className="w-3.5 h-3.5 text-primary-500" />}
                </Link>
              );
            })}
          </nav>
          <div className="px-2 pb-2 border-t border-gray-100 dark:border-dark-border pt-2">
            <button 
              onClick={async () => {
                const toastId = toast.loading('Signing out...');
                try {
                  await firebaseSignOut(auth);
                  await signOut({ redirect: false, callbackUrl: '/' });
                  router.push('/');
                  router.refresh();
                  toast.success('Signed out!', { id: toastId });
                } catch (error) {
                  toast.error('Sign out failed', { id: toastId });
                }
              }} 
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
