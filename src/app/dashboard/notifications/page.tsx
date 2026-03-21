'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Bell, Heart, MessageCircle, UserPlus, Eye, CheckCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { authors } from '@/lib/data';

type NotifType = 'like' | 'comment' | 'follow' | 'view';

interface Notification {
  id: string;
  type: NotifType;
  actor: { name: string; avatar: string };
  target: string;
  time: string;
  read: boolean;
}

const initialNotifications: Notification[] = [
  { id: '1', type: 'like', actor: { name: authors[1].name, avatar: authors[1].avatar }, target: 'Mastering React Server Components', time: '2 min ago', read: false },
  { id: '2', type: 'comment', actor: { name: authors[2].name, avatar: authors[2].avatar }, target: 'Advanced TypeScript Patterns', time: '18 min ago', read: false },
  { id: '3', type: 'follow', actor: { name: authors[3].name, avatar: authors[3].avatar }, target: '', time: '1 hour ago', read: false },
  { id: '4', type: 'like', actor: { name: authors[4].name, avatar: authors[4].avatar }, target: 'CSS Grid Mastery Guide', time: '3 hours ago', read: true },
  { id: '5', type: 'view', actor: { name: '38 new readers', avatar: '' }, target: 'Building Design Systems at Scale', time: '5 hours ago', read: true },
  { id: '6', type: 'comment', actor: { name: authors[5].name, avatar: authors[5].avatar }, target: 'Node.js Performance Tuning', time: 'Yesterday', read: true },
  { id: '7', type: 'follow', actor: { name: authors[0].name, avatar: authors[0].avatar }, target: '', time: '2 days ago', read: true },
];

const iconMap: Record<NotifType, { icon: React.ElementType; bg: string; color: string }> = {
  like: { icon: Heart, bg: 'bg-red-50 dark:bg-red-900/20', color: 'text-red-500' },
  comment: { icon: MessageCircle, bg: 'bg-blue-50 dark:bg-blue-900/20', color: 'text-blue-500' },
  follow: { icon: UserPlus, bg: 'bg-purple-50 dark:bg-purple-900/20', color: 'text-purple-500' },
  view: { icon: Eye, bg: 'bg-green-50 dark:bg-green-900/20', color: 'text-green-500' },
};

const messageMap: Record<NotifType, (target: string) => string> = {
  like: (t) => `liked your article "${t}"`,
  comment: (t) => `commented on "${t}"`,
  follow: () => 'started following you',
  view: (t) => `viewed "${t}"`,
};

export default function DashboardNotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              <p className="text-gray-500 dark:text-dark-muted text-sm mt-0.5">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all as read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
            {notifications.length > 0 ? (
              notifications.map((notif, i) => {
                const { icon: Icon, bg, color } = iconMap[notif.type];
                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-start gap-4 p-4 border-b border-gray-100 dark:border-dark-border last:border-0 transition-colors ${
                      notif.read ? '' : 'bg-primary-50/40 dark:bg-primary-900/10'
                    }`}
                  >
                    {/* Actor avatar */}
                    <div className="relative shrink-0">
                      {notif.actor.avatar ? (
                        <Image
                          src={notif.actor.avatar}
                          alt={notif.actor.name}
                          width={40}
                          height={40}
                          className="rounded-full bg-gray-100 dark:bg-slate-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm">
                          {notif.actor.name.charAt(0)}
                        </div>
                      )}
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${bg} flex items-center justify-center border-2 border-white dark:border-dark-card`}>
                        <Icon className={`w-2.5 h-2.5 ${color}`} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 dark:text-dark-text">
                        <span className="font-semibold text-gray-900 dark:text-white">{notif.actor.name}</span>{' '}
                        {messageMap[notif.type](notif.target)}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-dark-muted mt-0.5">{notif.time}</p>
                    </div>

                    {/* Unread indicator / mark read */}
                    {!notif.read ? (
                      <button
                        onClick={() => markRead(notif.id)}
                        title="Mark as read"
                        className="shrink-0 w-2.5 h-2.5 rounded-full bg-primary-500 mt-1.5 hover:bg-primary-700 transition-colors"
                      />
                    ) : (
                      <Check className="shrink-0 w-4 h-4 text-gray-300 dark:text-slate-600 mt-1" />
                    )}
                  </motion.div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
                  <Bell className="w-8 h-8 text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No notifications yet</h3>
                <p className="text-gray-400 dark:text-dark-muted text-sm">When someone likes or comments on your articles, you&apos;ll see it here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
