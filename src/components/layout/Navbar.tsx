'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Search, Bell, MessageSquare, Wallet, User as UserIcon, Plus } from 'lucide-react';

export const Navbar = ({ onOpenCreatePost }: { onOpenCreatePost?: () => void }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border bg-dark-bg/80 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 font-black text-2xl tracking-tight text-white">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-pink-500/20">
            S
          </div>
          <span>Sponzy</span>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md relative">
          <Search className="absolute left-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search creators, posts..."
            className="w-full bg-dark-card border border-dark-border rounded-full pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        {/* Actions & User Menu */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {onOpenCreatePost && (
                <button
                  onClick={onOpenCreatePost}
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-brand-600 to-pink-500 hover:from-brand-500 hover:to-pink-400 text-white font-medium px-4 py-2 rounded-full text-sm shadow-md shadow-pink-500/20 transition-all hover:scale-[1.02]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Post</span>
                </button>
              )}

              <Link
                href="/messages"
                className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:bg-dark-hover transition-colors relative"
              >
                <MessageSquare className="w-5 h-5" />
              </Link>

              <button className="w-10 h-10 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:bg-dark-hover transition-colors">
                <Bell className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-card border border-dark-border text-sm font-semibold text-emerald-400">
                <Wallet className="w-4 h-4" />
                <span>${Number(user.walletBalance || 0).toFixed(2)}</span>
              </div>

              <Link href={`/${user.username}`} className="flex items-center gap-2 pl-2">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-500/50">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-dark-hover transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-full shadow-md shadow-pink-500/20 transition-all"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
