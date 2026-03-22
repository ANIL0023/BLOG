'use client';

import { useState, useEffect } from 'react';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { User, Mail, Bell, Shield } from 'lucide-react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { update } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', bio: '' });

  useEffect(() => {
    fetch('/api/user/profile')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
           setFormData({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || '',
              bio: data.bio || ''
           });
        }
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load profile.');
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSave = async () => {
    setSaving(true);
    try {
       const res = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
       });
       if (res.ok) {
          // Trigger NextAuth session update
          await update({
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email
          });
          toast.success('Settings saved successfully!');
       } else {
          const data = await res.json();
          toast.error(data.error || 'Failed to update settings');
       }
    } catch {
       toast.error('Server error.');
    } finally {
       setSaving(false);
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
            <p className="text-gray-500 dark:text-dark-muted text-sm mt-0.5">Manage your account preferences and profile details.</p>
          </div>
          
          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden flex flex-col md:flex-row min-h-[500px]">
              {/* Settings Nav */}
              <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-100 dark:border-dark-border bg-gray-50/50 dark:bg-slate-800/50 p-4 space-y-2 shrink-0">
                 <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all ${activeTab === 'profile' ? 'bg-white dark:bg-dark-card shadow-sm font-semibold text-primary-600 dark:text-primary-400' : 'font-medium text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                 >
                    <User className="w-4 h-4" /> Profile
                 </button>
                 <button 
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all ${activeTab === 'notifications' ? 'bg-white dark:bg-dark-card shadow-sm font-semibold text-primary-600 dark:text-primary-400' : 'font-medium text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                 >
                    <Bell className="w-4 h-4" /> Notifications
                 </button>
                 <button 
                    onClick={() => setActiveTab('privacy')}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-all ${activeTab === 'privacy' ? 'bg-white dark:bg-dark-card shadow-sm font-semibold text-primary-600 dark:text-primary-400' : 'font-medium text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                 >
                    <Shield className="w-4 h-4" /> Privacy
                 </button>
              </div>
              
              {/* Settings Content */}
              <div className="flex-1 p-8">
                 {activeTab === 'profile' ? (
                   <>
                     <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                     
                     <form className="space-y-6 max-w-xl">
                        <div className="flex items-center gap-6">
                           <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-slate-700 border-4 border-white dark:border-dark-card shadow-md flex items-center justify-center overflow-hidden">
                              <User className="w-8 h-8 text-gray-400" />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1.5">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} disabled={loading} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50" placeholder="John" />
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled={loading} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50" placeholder="Doe" />
                           </div>
                        </div>

                        <div className="space-y-1.5">
                           <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                           <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <input type="email" name="email" value={formData.email} onChange={handleChange} disabled={loading} className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50" placeholder="user@example.com" />
                           </div>
                        </div>
                        
                        <div className="space-y-1.5">
                           <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                           <textarea rows={4} name="bio" value={formData.bio} onChange={handleChange} disabled={loading} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none disabled:opacity-50" placeholder="Write a short bio about yourself..." />
                        </div>

                        <div className="pt-4 border-t border-gray-100 dark:border-dark-border flex justify-end">
                           <button type="button" onClick={handleSave} disabled={saving || loading} className="btn-primary px-6 py-2.5 rounded-xl shadow-md disabled:opacity-50">
                              {saving ? 'Saving...' : 'Save Changes'}
                           </button>
                        </div>
                     </form>
                   </>
                 ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                       <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                          {activeTab === 'notifications' ? <Bell className="w-8 h-8 text-gray-300" /> : <Shield className="w-8 h-8 text-gray-300" />}
                       </div>
                       <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
                       <p className="text-gray-500 dark:text-dark-muted max-w-xs">Specific {activeTab} settings are coming soon as part of the next update!</p>
                    </div>
                 )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
