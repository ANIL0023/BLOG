'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, Users } from 'lucide-react';

const stats = [
  { label: 'Active Writers', value: '12,400+', icon: Users },
  { label: 'Published Articles', value: '48,000+', icon: TrendingUp },
  { label: 'Monthly Readers', value: '2.1M+', icon: Sparkles },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg opacity-90" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-white/90 text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4 text-yellow-300" />
          The home of great ideas and brilliant minds
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          Share your{' '}
          <span className="relative">
            <span className="text-yellow-300 drop-shadow-lg">Genius</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.5C50 2 150 2 299 5.5"
                stroke="#fde047"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <br />
          with the World
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Write, discover, and connect with the most insightful minds on the internet.
          From technology to wellness, find stories that matter.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary-700
              font-bold text-lg shadow-2xl hover:shadow-white/25 hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-200"
          >
            Start Exploring
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/write"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass text-white
              font-bold text-lg hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98]
              transition-all duration-200 border border-white/30"
          >
            Start Writing
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="glass rounded-2xl p-4 text-white text-center">
              <Icon className="w-5 h-5 mx-auto mb-2 text-yellow-300" />
              <div className="text-2xl md:text-3xl font-extrabold">{value}</div>
              <div className="text-xs md:text-sm text-white/70 mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40L60 36.7C120 33.3 240 26.7 360 28.3C480 30 600 40 720 43.3C840 46.7 960 43.3 1080 38.3C1200 33.3 1320 26.7 1380 23.3L1440 20V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V40Z"
            className="fill-white dark:fill-dark-bg"
          />
        </svg>
      </div>
    </section>
  );
}
