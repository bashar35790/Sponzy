'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { User, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreator, setIsCreator] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/register', {
        name,
        username,
        email,
        password,
        isCreator,
      });

      if (res.data?.token && res.data?.user) {
        login(res.data.token, res.data.user);
        router.push(isCreator ? `/${username}` : '/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-dark-card border border-dark-border rounded-3xl p-8 shadow-2xl shadow-black/50 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-lg shadow-pink-500/25">
            S
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Create an Account</h2>
          <p className="text-xs text-slate-400">Join the next-generation subscription community</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Ray"
                className="w-full bg-dark-bg border border-dark-border rounded-2xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Username</label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs text-slate-500 font-bold">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="elenaray"
                className="w-full bg-dark-bg border border-dark-border rounded-2xl pl-8 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-dark-bg border border-dark-border rounded-2xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full bg-dark-bg border border-dark-border rounded-2xl pl-10 pr-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-2.5 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={isCreator}
              onChange={(e) => setIsCreator(e.target.checked)}
              className="rounded bg-dark-bg border-dark-border text-brand-600 focus:ring-brand-500 w-4 h-4"
            />
            <span className="text-xs font-semibold text-pink-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>I want to register as a Content Creator</span>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-600 to-pink-500 hover:from-brand-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-pink-500/25 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>{loading ? 'Creating account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-400 font-bold hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
