'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LayoutGrid, Compass, Film, ShoppingBag, MessageSquare, ShieldCheck, User } from 'lucide-react';

export const MobileNav = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  const items = [
    { href: '/', icon: LayoutGrid, label: 'Feed' },
    { href: '/explore', icon: Compass, label: 'Explore' },
    { href: '/reels', icon: Film, label: 'Reels' },
    { href: '/shop', icon: ShoppingBag, label: 'Shop' },
    { href: '/messages', icon: MessageSquare, label: 'Chat' },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-card/95 backdrop-blur-xl border-t border-dark-border/80 py-2.5 px-4 flex items-center justify-around shadow-2xl">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
              isActive
                ? 'text-brand-400 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-brand-500' : ''}`} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </Link>
        );
      })}

      {user && (
        <Link
          href={`/${user.username}`}
          className={`flex flex-col items-center gap-1 p-1.5 rounded-xl transition-all ${
            pathname === `/${user.username}` ? 'text-brand-400 font-bold scale-105' : 'text-slate-400'
          }`}
        >
          <div className="w-5 h-5 rounded-full overflow-hidden border border-brand-500/50">
            <img src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80'} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] tracking-tight">Profile</span>
        </Link>
      )}
    </div>
  );
};
