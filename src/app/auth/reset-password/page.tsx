'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Flame, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Suspense } from 'react';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, password })
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setSuccess(true);
        toast.success('Password updated successfully!');
        setTimeout(() => router.push('/auth/login'), 2000);
      } else {
        toast.error(data.error || 'Failed to reset password');
      }
    } catch {
      setLoading(false);
      toast.error('Failed to reset password');
    }
  };

  if (!email || !token) {
      return (
          <div className="text-center">
              <p className="text-red-500">Invalid or missing reset token.</p>
              <Link href="/auth/forgot-password" data-link-internal="true" className="text-primary-600 underline mt-2 block">Request a new link</Link>
          </div>
      );
  }

  if (success) {
      return (
          <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Password Reset!</h3>
              <p className="text-gray-500 dark:text-dark-muted mb-6">Your password has been updated. Redirecting to login...</p>
              <Link href="/auth/login" data-link-internal="true">
                  <Button variant="primary" className="w-full">Sign In Now</Button>
              </Link>
          </div>
      );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="New Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        icon={<Lock className="w-4 h-4" />}
        required
      />
      <Input
        label="Confirm New Password"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        icon={<Lock className="w-4 h-4" />}
        required
      />

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
        Reset Password
      </Button>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <Link href="/" data-link-internal="true" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Blogo</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create new password</h1>
          <p className="text-gray-500 dark:text-dark-muted mt-1">Please enter your new password below</p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border p-8">
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </motion.div>
    </div>
  );
}
