'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Flame, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resetUrl, setResetUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setLoading(false);
      
      if (res.ok) {
        setSubmitted(true);
        if (data.simulatedUrl) {
            setResetUrl(data.simulatedUrl);
        }
        toast.success(data.message || 'Reset link sent!');
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch {
      setLoading(false);
      toast.error('Failed to send reset link');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Blogo</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reset your password</h1>
          <p className="text-gray-500 dark:text-dark-muted mt-1">We'll send you a link to reset it</p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl border border-gray-100 dark:border-dark-border p-8">
          {submitted ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Check your email</h3>
              <p className="text-sm text-gray-500 dark:text-dark-muted mb-6">
                We sent a password reset link to <strong>{email}</strong>
              </p>
              {resetUrl && typeof window !== 'undefined' && window.location.hostname === 'localhost' && (
                  <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-left">
                      <p className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">Simulated Link (Local Dev):</p>
                      <a href={resetUrl} className="text-sm text-blue-600 dark:text-blue-400 break-all underline">
                          {resetUrl}
                      </a>
                  </div>
              )}
              <Link href="/auth/login">
                <Button variant="primary" className="w-full">
                  Return to sign in
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                Send reset link
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-dark-muted dark:hover:text-white font-medium transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
