'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Home,
  Compass,
  Film,
  ShoppingBag,
  MessageSquare,
  Bookmark,
  Radio,
  User,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Home Feed', href: '/', icon: Home },
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'Shorts & Reels', href: '/reels', icon: Film },
    { label: 'Shop Products', href: '/shop', icon: ShoppingBag },
    { label: 'Messages', href: '/messages', icon: MessageSquare },
    { label: 'Live Streams', href: '/live', icon: Radio },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-[65px] h-[calc(100vh-65px)] border-r border-dark-border p-4 flex flex-col justify-between">
      <div className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-brand-600/10 to-pink-500/10 text-pink-400 border border-brand-500/20 font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-dark-card'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-pink-500' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {user && (
          <>
            <div className="pt-4 pb-2 px-4 text-xs font-bold text-slate-500 tracking-wider uppercase">
              Account
            </div>
            <Link
              href={`/${user.username}`}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                pathname === `/${user.username}`
                  ? 'bg-gradient-to-r from-brand-600/10 to-pink-500/10 text-pink-400 border border-brand-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-dark-card'
              }`}
            >
              <User className="w-5 h-5 text-slate-400" />
              <span>My Profile</span>
            </Link>

            {user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium text-amber-400 hover:bg-amber-400/10 transition-colors"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Admin Dashboard</span>
              </Link>
            )}
          </>
        )}
      </div>

      {user && (
        <div className="pt-4 border-t border-dark-border space-y-3">
          <Link
            href={`/${user.username}`}
            className="flex items-center gap-3 p-2 rounded-2xl bg-dark-card/60 hover:bg-dark-card border border-dark-border/60 transition-all group"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-500/40 shrink-0">
              <img
                src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-100 truncate group-hover:text-pink-400 transition-colors">
                {user.name}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                {user.role === 'ADMIN' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
                    👑 Admin
                  </span>
                ) : user.role === 'CREATOR' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-500/15 text-pink-400 border border-brand-500/30 truncate max-w-[140px]">
                    ✨ {user.profession || 'Creator'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    💜 Member
                  </span>
                )}
              </div>
            </div>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </aside>
  );
};
