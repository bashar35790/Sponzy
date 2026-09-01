'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import {
  User as UserIcon,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  HeartHandshake,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Flame,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [role, setRole] = useState<'USER' | 'CREATOR'>('USER');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profession, setProfession] = useState('');
  const [creatorMonthlyPrice, setCreatorMonthlyPrice] = useState('9.99');
  const [bio, setBio] = useState('');
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
        role,
        profession: role === 'CREATOR' ? profession : undefined,
        bio: role === 'CREATOR' ? bio : undefined,
        creatorMonthlyPrice: role === 'CREATOR' ? parseFloat(creatorMonthlyPrice || '0') : 0,
      });

      if (res.data?.token && res.data?.user) {
        login(res.data.token, res.data.user);
        router.push(role === 'CREATOR' ? `/${username.toLowerCase()}` : '/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed. Please check your information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 py-8">
      <div className="w-full max-w-lg bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-lg shadow-brand-500/25">
            <Flame className="w-6 h-6 fill-white" />
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white tracking-tight">Create an Account</h2>
          <p className="text-xs text-slate-400">Choose your membership type and join the VIP community</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection Cards */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Select Account Type</label>
            <div className="grid grid-cols-2 gap-3">
              {/* Fan / Member Option */}
              <button
                type="button"
                onClick={() => setRole('USER')}
                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all ${
                  role === 'USER'
                    ? 'border-brand-500 bg-brand-500/10 text-white shadow-md shadow-brand-500/10 ring-1 ring-brand-500'
                    : 'border-dark-border bg-dark-bg text-slate-400 hover:text-slate-200 hover:bg-dark-hover'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs">Fan / Member</span>
                  {role === 'USER' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Subscribe, view exclusive media, and tip creators
                </p>
              </button>

              {/* Creator Option */}
              <button
                type="button"
                onClick={() => setRole('CREATOR')}
                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all ${
                  role === 'CREATOR'
                    ? 'border-brand-500 bg-brand-500/10 text-white shadow-md shadow-brand-500/10 ring-1 ring-brand-500'
                    : 'border-dark-border bg-dark-bg text-slate-400 hover:text-slate-200 hover:bg-dark-hover'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold text-xs">Content Creator</span>
                  {role === 'CREATOR' && <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />}
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Monetize posts, sell subscriptions, and host lives
                </p>
              </button>
            </div>
          </div>

          {/* Basic User Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Elena Ray"
                  className="w-full bg-dark-bg border border-dark-border rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
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
                  className="w-full bg-dark-bg border border-dark-border rounded-2xl pl-8 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
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
                className="w-full bg-dark-bg border border-dark-border rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
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
                className="w-full bg-dark-bg border border-dark-border rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                required
              />
            </div>
          </div>

          {/* Creator-Specific Fields */}
          {role === 'CREATOR' && (
            <div className="p-4 rounded-2xl bg-brand-500/5 border border-brand-500/20 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-1.5 text-xs font-bold text-brand-400">
                <Sparkles className="w-4 h-4" />
                <span>Creator Profile Details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Profession / Category</label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={profession}
                      onChange={(e) => setProfession(e.target.value)}
                      placeholder="e.g. Model, Fitness, Artist"
                      className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">Monthly Sub Price ($ USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 w-3.5 h-3.5 text-emerald-400" />
                    <input
                      type="number"
                      step="0.50"
                      min="0"
                      value={creatorMonthlyPrice}
                      onChange={(e) => setCreatorMonthlyPrice(e.target.value)}
                      placeholder="9.99 (0 for free)"
                      className="w-full bg-dark-bg border border-dark-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">Bio / About your page</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell your fans what kind of exclusive content they will enjoy..."
                  rows={2}
                  className="w-full bg-dark-bg border border-dark-border rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 resize-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-brand-500/25 transition-all flex items-center justify-center gap-2 text-xs"
          >
            <span>{loading ? 'Creating account...' : `Sign Up as ${role === 'CREATOR' ? 'Creator' : 'Member'}`}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-400 font-bold hover:underline">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
