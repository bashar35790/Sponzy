'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Flame,
  LayoutGrid,
  Compass,
  Film,
  ShoppingBag,
  MessageSquare,
  Radio,
  PlusCircle,
  ShieldCheck,
  LogOut,
  ChevronRight,
  User as UserIcon,
} from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Posts', href: '/', icon: LayoutGrid },
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'Shorts & Reels', href: '/reels', icon: Film },
    { label: 'Shop', href: '/shop', icon: ShoppingBag },
    { label: 'Messages', href: '/messages', icon: MessageSquare },
    { label: 'Live VIP', href: '/live', icon: Radio },
  ];

  return (
    <aside className="w-64 shrink-0 hidden lg:block sticky top-[68px] h-[calc(100vh-80px)] p-2">
      <div className="h-full bg-dark-card/95 border border-dark-border rounded-3xl p-3.5 flex flex-col justify-between shadow-2xl backdrop-blur-xl overflow-y-auto scrollbar-none">
        {/* Navigation List */}
        <div className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600/15 via-brand-500/10 to-transparent text-white border border-brand-500/30 shadow-sm shadow-brand-500/10'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-dark-hover/70'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30' : 'bg-dark-bg text-slate-400 group-hover:text-white'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="tracking-wide">{item.label}</span>
              </Link>
            );
          })}

          {user?.role === 'ADMIN' && (
            <div className="pt-2">
              <Link
                href="/admin"
                className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  pathname === '/admin'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10'
                }`}
              >
                <div className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>Admin Panel</span>
              </Link>
            </div>
          )}
        </div>

        {/* User Card & Clear Logout Button at bottom */}
        {user ? (
          <div className="pt-3 border-t border-dark-border/80 space-y-2 mt-auto">
            {/* User Profile Info Card */}
            <Link
              href={`/${user.username}`}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-dark-bg/90 hover:bg-dark-hover border border-dark-border transition-all group shadow-inner"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-500/50 shrink-0">
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-100 truncate group-hover:text-brand-400 transition-colors">
                    {user.name}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {user.role === 'ADMIN' ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Admin
                      </span>
                    ) : user.role === 'CREATOR' ? (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-brand-500/20 text-brand-400 border border-brand-500/30 truncate max-w-[95px]">
                        {user.profession || 'Creator'}
                      </span>
                    ) : (
                      <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-md bg-purple-500/20 text-purple-300">
                        Member
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors shrink-0" />
            </Link>

            {/* Prominent Always-Visible Logout Button */}
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold text-red-400/90 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          <div className="pt-3 border-t border-dark-border/80 space-y-2 mt-auto">
            <Link
              href="/login"
              className="block w-full py-2.5 rounded-2xl bg-dark-bg hover:bg-dark-hover border border-dark-border text-center text-xs font-bold text-slate-200 transition-all"
            >
              Log In
            </Link>
            <Link
              href="/register"
              className="block w-full py-2.5 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 text-white text-xs font-bold text-center shadow-md shadow-brand-500/25 transition-all"
            >
              Join VIP Club
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};
