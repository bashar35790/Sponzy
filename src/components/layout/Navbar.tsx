'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Search, Bell, MessageSquare, Wallet, Plus, Flame } from 'lucide-react';

export const Navbar = ({ onOpenCreatePost }: { onOpenCreatePost?: () => void }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border/80 bg-dark-bg/85 backdrop-blur-xl px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo with Orange Glow */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <Flame className="w-5 h-5 fill-white text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-editorial text-2xl font-bold tracking-tight text-white leading-none">
              Sponzy
            </span>
            <span className="text-[9px] font-bold tracking-widest text-brand-500 uppercase">
              VIP Club
            </span>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md relative">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search exclusive creators, posts..."
            className="w-full bg-dark-card/90 border border-dark-border rounded-full pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
          />
        </div>

        {/* Actions & User Menu */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {onOpenCreatePost && (
                <button
                  onClick={onOpenCreatePost}
                  className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 hover:from-brand-500 hover:to-amber-400 text-white font-bold px-4 py-2 rounded-full text-xs shadow-md shadow-brand-500/25 transition-all hover:scale-[1.02]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Post</span>
                </button>
              )}

              <Link
                href="/messages"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-500/50 hover:bg-dark-hover transition-all relative shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
              </Link>

              <button className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-500/50 hover:bg-dark-hover transition-all shadow-sm">
                <Bell className="w-4 h-4" />
              </button>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-card/90 border border-brand-500/25 text-xs font-bold text-amber-400 shadow-sm">
                <Wallet className="w-3.5 h-3.5 text-brand-500" />
                <span>${Number(user.walletBalance || 0).toFixed(2)}</span>
              </div>

              <Link href={`/${user.username}`} className="flex items-center gap-2 pl-1 group">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-brand-500/60 group-hover:border-brand-500 shadow-sm transition-colors">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-dark-card transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="text-xs font-bold bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 text-white px-4 py-2 rounded-full shadow-md shadow-brand-500/25 transition-all hover:scale-[1.02]"
              >
                Join VIP
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
