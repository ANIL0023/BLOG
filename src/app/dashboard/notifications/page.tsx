import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { Bell, CheckCircle } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        <DashboardSidebar />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              <p className="text-gray-500 dark:text-dark-muted text-sm mt-0.5">Stay updated with your latest alerts and activity.</p>
            </div>
            <button className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-2 hover:opacity-80 transition-opacity">
               <CheckCircle className="w-4 h-4" />
               Mark all as read
            </button>
          </div>

          <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border shadow-sm overflow-hidden">
             
             <div className="divide-y divide-gray-100 dark:divide-dark-border">
                
                {[1, 2, 3].map((item) => (
                   <div key={item} className="p-5 flex gap-4 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative">
                      {item === 1 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500"></div>}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item === 1 ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400' : 'bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-gray-400'}`}>
                         <Bell className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className={`text-sm ${item === 1 ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                            {item === 1 ? 'Welcome to your new dashboard!' : 'Complete your profile setup to get started.'}
                         </p>
                         <p className="text-xs text-gray-400 mt-1">
                            {item === 1 ? 'Just now' : `${item} hours ago`}
                         </p>
                      </div>
                   </div>
                ))}

             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
