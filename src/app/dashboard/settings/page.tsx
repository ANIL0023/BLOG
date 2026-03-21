'use client';

import { useState } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  User, Mail, Lock, Bell, Shield, Globe,
  Twitter, Github, Linkedin, Camera, Save, Eye, EyeOff,
} from 'lucide-react';
import { authors } from '@/lib/data';
import toast from 'react-hot-toast';

type Tab = 'profile' | 'account' | 'notifications' | 'privacy';

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Globe },
];

export default function DashboardSettingsPage() {
  const author = authors[0];
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [saving, setSaving] = useState(false);

  // Profile form state
  const [profile, setProfile] = useState({
    name: author.name,
    bio: author.bio,
    website: 'https://alexmorgan.dev',
    twitter: author.social.twitter ?? '',
    github: author.social.github ?? '',
    linkedin: author.social.linkedin ?? '',
  });

  // Account form state
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [showPasswords, setShowPasswords] = useState({ current: false, newPassword: false, confirm: false });
  const [passwords, setPasswords] = useState({ current: '', newPassword: '', confirm: '' });

  // Notification preferences
  const [notifPrefs, setNotifPrefs] = useState({
    newFollower: true,
    articleLike: true,
    articleComment: true,
    newsletter: false,
    weeklyDigest: true,
    productUpdates: false,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showEmail: false,
    allowIndexing: true,
    dataSharing: false,
  });

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaving(false);
    toast.success('Settings saved!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-500 dark:text-dark-muted text-sm mt-0.5">Manage your profile, account, and preferences.</p>
          </div>

          <div className="flex gap-6">
            {/* Tabs sidebar */}
            <nav className="w-44 shrink-0 space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-card'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>

            {/* Tab content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 min-w-0"
            >
              {/* ── Profile Tab ── */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  {/* Avatar */}
                  <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Profile Photo</h2>
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <Image
                          src={author.avatar}
                          alt={author.name}
                          width={80}
                          height={80}
                          className="rounded-full bg-gray-100 dark:bg-slate-700 ring-4 ring-primary-100 dark:ring-primary-900/30"
                        />
                        <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full gradient-bg text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <Camera className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Upload a new photo</p>
                        <p className="text-xs text-gray-400 dark:text-dark-muted mt-0.5">JPG, PNG or GIF · Max 2 MB</p>
                        <button
                          onClick={() => toast.success('Image upload coming soon!')}
                          className="mt-2 text-xs text-primary-600 dark:text-primary-400 hover:underline font-medium"
                        >
                          Choose file
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Personal info */}
                  <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">Display Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            value={profile.name}
                            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                            className="input-field pl-9 text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">Bio</label>
                        <textarea
                          value={profile.bio}
                          onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                          rows={3}
                          className="input-field text-sm resize-none"
                        />
                        <p className="text-xs text-gray-400 dark:text-dark-muted mt-1">{profile.bio.length}/200 characters</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">Website</label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <input
                            value={profile.website}
                            onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))}
                            className="input-field pl-9 text-sm"
                            placeholder="https://yourwebsite.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Social Links</h2>
                    <div className="space-y-4">
                      {[
                        { key: 'twitter', icon: Twitter, placeholder: '@username', label: 'Twitter / X' },
                        { key: 'github', icon: Github, placeholder: 'username', label: 'GitHub' },
                        { key: 'linkedin', icon: Linkedin, placeholder: 'username', label: 'LinkedIn' },
                      ].map(({ key, icon: Icon, placeholder, label }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">{label}</label>
                          <div className="relative">
                            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              value={profile[key as keyof typeof profile]}
                              onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                              placeholder={placeholder}
                              className="input-field pl-9 text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── Account Tab ── */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Email Address</h2>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field pl-9 text-sm"
                      />
                    </div>
                  </div>

                  <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
                    <div className="space-y-4">
                      {[
                        { key: 'current', label: 'Current Password' },
                        { key: 'newPassword', label: 'New Password' },
                        { key: 'confirm', label: 'Confirm New Password' },
                      ].map(({ key, label }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-dark-text mb-1.5">{label}</label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type={showPasswords[key as keyof typeof showPasswords] ? 'text' : 'password'}
                              value={passwords[key as keyof typeof passwords]}
                              onChange={(e) => setPasswords((p) => ({ ...p, [key]: e.target.value }))}
                              className="input-field pl-9 pr-10 text-sm"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords((s) => ({ ...s, [key]: !s[key as keyof typeof s] }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                            >
                              {showPasswords[key as keyof typeof showPasswords] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-200 dark:border-red-800/30 p-6">
                    <h2 className="font-semibold text-red-700 dark:text-red-400 mb-1">Danger Zone</h2>
                    <p className="text-sm text-red-600/70 dark:text-red-400/70 mb-4">
                      Once you delete your account, all your data will be permanently removed.
                    </p>
                    <button
                      onClick={() => toast.error('Account deletion requires confirmation.')}
                      className="text-sm font-semibold text-red-600 dark:text-red-400 border border-red-300 dark:border-red-700 px-4 py-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}

              {/* ── Notifications Tab ── */}
              {activeTab === 'notifications' && (
                <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Email Notifications</h2>
                  <div className="divide-y divide-gray-100 dark:divide-dark-border">
                    {(
                      [
                        { key: 'newFollower', label: 'New follower', desc: 'When someone follows your profile' },
                        { key: 'articleLike', label: 'Article liked', desc: 'When someone likes your article' },
                        { key: 'articleComment', label: 'New comment', desc: 'When someone comments on your article' },
                        { key: 'newsletter', label: 'Newsletter', desc: 'Weekly newsletter from Blogo' },
                        { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Summary of your top-performing articles' },
                        { key: 'productUpdates', label: 'Product updates', desc: 'New features and improvements' },
                      ] as { key: keyof typeof notifPrefs; label: string; desc: string }[]
                    ).map(({ key, label, desc }) => (
                      <label key={key} className="flex items-center justify-between py-4 cursor-pointer group">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {label}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-dark-muted">{desc}</p>
                        </div>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={notifPrefs[key]}
                            onChange={(e) => setNotifPrefs((p) => ({ ...p, [key]: e.target.checked }))}
                            className="sr-only"
                          />
                          <div
                            onClick={() => setNotifPrefs((p) => ({ ...p, [key]: !p[key] }))}
                            className={`w-10 h-5.5 rounded-full transition-colors cursor-pointer relative ${
                              notifPrefs[key] ? 'bg-primary-600' : 'bg-gray-200 dark:bg-slate-700'
                            }`}
                            style={{ height: '22px', width: '40px' }}
                          >
                            <span
                              className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white shadow-sm transition-transform ${
                                notifPrefs[key] ? 'translate-x-[18px]' : 'translate-x-0'
                              }`}
                              style={{ width: '18px', height: '18px' }}
                            />
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Privacy Tab ── */}
              {activeTab === 'privacy' && (
                <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
                  <h2 className="font-semibold text-gray-900 dark:text-white mb-5">Privacy Settings</h2>
                  <div className="divide-y divide-gray-100 dark:divide-dark-border">
                    {(
                      [
                        { key: 'publicProfile', label: 'Public profile', desc: 'Your profile is visible to everyone' },
                        { key: 'showEmail', label: 'Show email address', desc: 'Display your email on your public profile' },
                        { key: 'allowIndexing', label: 'Search engine indexing', desc: 'Allow search engines to index your articles' },
                        { key: 'dataSharing', label: 'Analytics data sharing', desc: 'Share anonymised analytics to improve Blogo' },
                      ] as { key: keyof typeof privacy; label: string; desc: string }[]
                    ).map(({ key, label, desc }) => (
                      <label key={key} className="flex items-center justify-between py-4 cursor-pointer group">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                            {label}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-dark-muted">{desc}</p>
                        </div>
                        <div
                          onClick={() => setPrivacy((p) => ({ ...p, [key]: !p[key] }))}
                          className={`w-10 rounded-full transition-colors cursor-pointer relative flex-shrink-0 ${
                            privacy[key] ? 'bg-primary-600' : 'bg-gray-200 dark:bg-slate-700'
                          }`}
                          style={{ height: '22px', width: '40px' }}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 rounded-full bg-white shadow-sm transition-transform`}
                            style={{
                              width: '18px',
                              height: '18px',
                              transform: privacy[key] ? 'translateX(18px)' : 'translateX(0)',
                            }}
                          />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Save button (not shown for the danger-only account tab) */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn-primary text-sm px-6 py-2.5 rounded-xl"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
