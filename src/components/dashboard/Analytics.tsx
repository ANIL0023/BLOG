'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Eye, Heart, Users, ArrowUp, ArrowDown } from 'lucide-react';

const stats = [
  { label: 'Total Views', value: '124,580', change: '+18.2%', up: true, icon: Eye, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { label: 'Total Likes', value: '8,432', change: '+12.5%', up: true, icon: Heart, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/20' },
  { label: 'New Followers', value: '1,284', change: '+24.3%', up: true, icon: Users, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { label: 'Avg. Read Rate', value: '68%', change: '-2.1%', up: false, icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20' },
];

const topArticles = [
  { title: 'Mastering React Server Components', views: 12400, change: '+24%' },
  { title: 'Advanced TypeScript Patterns', views: 9800, change: '+18%' },
  { title: 'CSS Grid Mastery', views: 7600, change: '+12%' },
  { title: 'Building Design Systems', views: 6200, change: '+9%' },
  { title: 'Node.js Performance Guide', views: 4800, change: '+6%' },
];

const monthlyData = [40, 65, 45, 80, 60, 95, 70, 110, 85, 130, 100, 145];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function Analytics() {
  const maxVal = Math.max(...monthlyData);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-5 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-semibold ${stat.up ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 dark:text-dark-muted mt-0.5">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Views Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white">Monthly Views</h3>
            <select className="text-xs border border-gray-200 dark:border-dark-border rounded-lg px-2 py-1.5 bg-white dark:bg-dark-card text-gray-600 dark:text-dark-muted focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>

          {/* Bar Chart */}
          <div className="flex items-end gap-2 h-40">
            {monthlyData.map((val, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(val / maxVal) * 100}%` }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex-1 group relative"
              >
                <div
                  className="w-full rounded-t-lg bg-primary-200 dark:bg-primary-900/40 group-hover:bg-primary-500 transition-colors cursor-pointer"
                  style={{ height: '100%' }}
                />
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 hidden group-hover:flex bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {val}k views
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            {months.map((m) => (
              <div key={m} className="flex-1 text-center text-xs text-gray-400 dark:text-dark-muted">{m}</div>
            ))}
          </div>
        </div>

        {/* Top Articles */}
        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 dark:text-white mb-5">Top Articles</h3>
          <div className="space-y-4">
            {topArticles.map((article, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full gradient-bg text-white text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 leading-tight mb-1">
                    {article.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 dark:text-dark-muted flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {article.views.toLocaleString()}
                    </span>
                    <span className="text-xs text-green-600 font-semibold">{article.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Audience Breakdown */}
      <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-dark-border p-6 shadow-sm">
        <h3 className="font-bold text-gray-900 dark:text-white mb-5">Traffic Sources</h3>
        <div className="space-y-3">
          {[
            { source: 'Organic Search', pct: 42, color: 'bg-primary-500' },
            { source: 'Social Media', pct: 28, color: 'bg-pink-500' },
            { source: 'Direct', pct: 18, color: 'bg-blue-500' },
            { source: 'Referrals', pct: 12, color: 'bg-green-500' },
          ].map((item) => (
            <div key={item.source} className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-dark-muted w-32">{item.source}</span>
              <div className="flex-1 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className={`h-full rounded-full ${item.color}`}
                />
              </div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white w-10 text-right">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
