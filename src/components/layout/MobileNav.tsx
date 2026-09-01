'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Film, MessageSquare, ShoppingBag } from 'lucide-react';

export const MobileNav = () => {
  const pathname = usePathname();

  const items = [
    { href: '/', icon: Home },
    { href: '/explore', icon: Compass },
    { href: '/reels', icon: Film },
    { href: '/shop', icon: ShoppingBag },
    { href: '/messages', icon: MessageSquare },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-bg/95 backdrop-blur-lg border-t border-dark-border py-2 px-6 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2.5 rounded-xl transition-all ${
              isActive ? 'text-pink-500 bg-brand-500/10' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Icon className="w-6 h-6" />
          </Link>
        );
      })}
    </div>
  );
};
