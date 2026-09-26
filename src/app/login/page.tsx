'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, UserCheck, Flame } from 'lucide-react';
import { Button, Card, ErrorState, Input } from '@/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const executeLogin = async (emailVal: string, passVal: string) => {
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', {
        emailOrUsername: emailVal,
        password: passVal,
      });

      if (res.data?.token && res.data?.user) {
        login(res.data.token, res.data.user);
        if (res.data.user.role === 'ADMIN') {
          router.push('/admin');
        } else if (res.data.user.role === 'CREATOR') {
          router.push(`/${res.data.user.username}`);
        } else {
          router.push('/');
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await executeLogin(emailOrUsername, password);
  };

  const fillAndLogin = async (email: string, pass: string) => {
    setEmailOrUsername(email);
    setPassword(pass);
    await executeLogin(email, pass);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-8">
      <Card padding="none" className="w-full max-w-md p-6 sm:p-8 space-y-6 shadow-black/80">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-lg shadow-brand-500/25">
            <Flame className="w-6 h-6 fill-white" />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-xs text-slate-400">Log in to support creators or manage your VIP club</p>
        </div>

        {/* 1-Click Demo Accounts Quick Selector */}
        <div className="space-y-2 p-3.5 rounded-2xl bg-dark-bg/80 border border-dark-border">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            ⚡ Quick 1-Click Demo Login
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => fillAndLogin('admin@sponzy.com', 'password123')}
              className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-center transition-all group flex flex-col items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold">Admin</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => fillAndLogin('elena@sponzy.com', 'password123')}
              className="p-2 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 text-brand-400 text-center transition-all group flex flex-col items-center gap-1"
            >
              <Sparkles className="w-4 h-4 text-brand-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold">Creator</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => fillAndLogin('alex@sponzy.com', 'password123')}
              className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-center transition-all group flex flex-col items-center gap-1"
            >
              <UserCheck className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-bold">Member</span>
            </button>
          </div>
        </div>

        <ErrorState message={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email or Username"
            icon={<Mail className="w-4 h-4" />}
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="admin@sponzy.com"
            required
          />

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300">Password</label>
              <span className="text-[11px] text-slate-500">Default: password123</span>
            </div>
            <Input
              icon={<Lock className="w-4 h-4" />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" shape="card" loading={loading} className="w-full py-3">
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-brand-400 font-bold hover:underline">
            Sign up now
          </Link>
        </div>
      </Card>
    </div>
  );
}
