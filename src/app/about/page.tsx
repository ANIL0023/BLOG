import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, Target, Heart, Zap, Users, BookOpen, Globe, ArrowRight } from 'lucide-react';

export const metadata: Metadata = { title: 'About Blogo' };

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To democratize knowledge sharing and give every person a platform to share their expertise with the world.',
    color: 'text-primary-500 bg-primary-50 dark:bg-primary-900/20',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'We believe in authentic storytelling, intellectual curiosity, and the power of well-written content to change minds and inspire action.',
    color: 'text-pink-500 bg-pink-50 dark:bg-pink-900/20',
  },
  {
    icon: Zap,
    title: 'Our Vision',
    description: 'A world where expertise is freely shared, where great ideas reach the people who need them most, regardless of background.',
    color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
  },
];

const stats = [
  { icon: Users, value: '12,400+', label: 'Active Writers' },
  { icon: BookOpen, value: '48,000+', label: 'Published Articles' },
  { icon: Globe, value: '2.1M+', label: 'Monthly Readers' },
  { icon: Heart, value: '5M+', label: 'Total Likes' },
];

const team = [
  { name: 'Jordan Lee', role: 'CEO & Co-founder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JordanLee' },
  { name: 'Riley Chen', role: 'CTO & Co-founder', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RileyChen' },
  { name: 'Sam Park', role: 'Head of Product', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamPark' },
  { name: 'Dana Singh', role: 'Head of Design', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DanaSingh' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 gradient-bg opacity-90" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 mb-6 glass px-4 py-2 rounded-full text-sm font-medium">
            <Flame className="w-4 h-4 text-yellow-300" />
            Our Story
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            We&apos;re Building the Future<br />of Digital Publishing
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Blogo started with a simple belief: everyone has something valuable to say, and the world is better when those ideas are shared freely.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="card p-6 text-center">
              <Icon className="w-6 h-6 mx-auto mb-3 text-primary-500" />
              <div className="text-3xl font-extrabold gradient-text mb-1">{value}</div>
              <div className="text-sm text-gray-500 dark:text-dark-muted">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How Blogo Started
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-dark-muted leading-relaxed">
              <p>
                In 2022, two engineers grew frustrated with existing blogging platforms. They were either too simple, too expensive, or buried great content under algorithmic noise.
              </p>
              <p>
                They wanted a place where quality won. Where a thoughtful, well-researched article could reach readers who genuinely wanted to learn, not just scroll.
              </p>
              <p>
                So they built Blogo—a platform designed first and foremost for writers and readers who take content seriously.
              </p>
            </div>
            <Link href="/auth/register" className="btn-primary mt-6 inline-flex">
              Join Blogo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-64 md:h-auto rounded-3xl overflow-hidden">
            <Image
              src="https://picsum.photos/600/400?random=50"
              alt="Team working"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">What We Stand For</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map(({ icon: Icon, title, description, color }) => (
            <div key={title} className="card p-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-gray-600 dark:text-dark-muted leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-10">Meet the Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="card p-6 text-center group hover:-translate-y-1">
              <Image
                src={member.avatar}
                alt={member.name}
                width={72}
                height={72}
                className="rounded-full bg-gray-100 dark:bg-slate-700 mx-auto mb-3 ring-4 ring-transparent group-hover:ring-primary-100 dark:group-hover:ring-primary-900/30 transition-all"
              />
              <h3 className="font-bold text-gray-900 dark:text-white text-sm">{member.name}</h3>
              <p className="text-xs text-primary-600 dark:text-primary-400 mt-0.5">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
