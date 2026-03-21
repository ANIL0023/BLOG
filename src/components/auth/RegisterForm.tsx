'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Flame } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (!agreed) e.agree = 'You must agree to the terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    toast.success('Account created! Welcome to Blogo 🎉');
    setTimeout(() => router.push('/dashboard'), 1500);
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold gradient-text">Blogo</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
        <p className="text-gray-500 dark:text-dark-muted mt-1">Join thousands of writers and readers</p>
      </div>

      <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border p-8">
        {/* Social */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { name: 'Google', icon: '🌐' },
            { name: 'GitHub', icon: '⚡' },
          ].map((p) => (
            <button
              key={p.name}
              onClick={() => toast.success(`${p.name} signup coming soon!`)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 dark:border-dark-border text-sm font-medium text-gray-600 dark:text-dark-muted hover:bg-gray-50 dark:hover:bg-slate-700 transition-all"
            >
              <span>{p.icon}</span>
              {p.name}
            </button>
          ))}
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-dark-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white dark:bg-dark-card text-gray-400">or fill in your details</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Alex Morgan"
            value={form.name}
            onChange={update('name')}
            error={errors.name}
            icon={<User className="w-4 h-4" />}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update('email')}
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Min. 8 characters"
            value={form.password}
            onChange={update('password')}
            error={errors.password}
            icon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            value={form.confirm}
            onChange={update('confirm')}
            error={errors.confirm}
            icon={<Lock className="w-4 h-4" />}
          />

          {/* Password strength */}
          {form.password && (
            <div className="space-y-1">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      form.password.length >= i * 2
                        ? i <= 1 ? 'bg-red-400' : i <= 2 ? 'bg-yellow-400' : i <= 3 ? 'bg-blue-400' : 'bg-green-400'
                        : 'bg-gray-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-400">
                {form.password.length < 4 ? 'Too short' : form.password.length < 6 ? 'Weak' : form.password.length < 10 ? 'Good' : 'Strong'}
              </p>
            </div>
          )}

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-600 dark:text-dark-muted">
              I agree to the{' '}
              <Link href="#" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">Terms of Service</Link>
              {' '}and{' '}
              <Link href="#" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">Privacy Policy</Link>
            </span>
          </label>
          {errors.agree && <p className="text-xs text-red-500">⚠ {errors.agree}</p>}

          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-dark-muted">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary-600 dark:text-primary-400 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
