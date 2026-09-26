'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Search, Bell, MessageSquare, Wallet, Plus, Flame, LogOut, User as UserIcon } from 'lucide-react';

/** Global event fired when the navbar "Create Post" button is pressed.
 *  Pages that own a composer (e.g. the home feed) listen for it, so the
 *  button works app-wide without prop drilling through the root layout. */
export const OPEN_CREATE_POST_EVENT = 'sponzy:open-create-post';

export const Navbar = ({ onOpenCreatePost }: { onOpenCreatePost?: () => void }) => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const handleCreatePost = () => {
    if (onOpenCreatePost) {
      onOpenCreatePost();
      return;
    }
    window.dispatchEvent(new CustomEvent(OPEN_CREATE_POST_EVENT));
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border/80 bg-dark-bg/85 backdrop-blur-xl transition-all">
      {/* Inner container mirrors the layout content width/padding (max-w-7xl, px-2 sm:px-4 lg:px-6)
          so header edges align with page content on every route. */}
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between gap-3 sm:gap-4 px-2 sm:px-4 lg:px-6">
        {/* Brand Logo with Orange Glow */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 group" aria-label="Sponzy home">
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

        {/* Search Bar (desktop) */}
        <form onSubmit={submitSearch} role="search" className="hidden md:flex items-center flex-1 max-w-md relative">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exclusive creators, posts..."
            aria-label="Search creators"
            className="w-full bg-dark-card/90 border border-dark-border rounded-full pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
          />
        </form>

        {/* Actions & User Menu */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {loading ? (
            <div className="flex items-center gap-3" aria-hidden="true">
              <div className="hidden sm:block w-24 h-8 rounded-full bg-dark-card animate-pulse" />
              <div className="w-9 h-9 rounded-full bg-dark-card animate-pulse" />
            </div>
          ) : user ? (
            <>
              <button
                onClick={handleCreatePost}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 hover:from-brand-500 hover:to-amber-400 text-white font-bold px-4 py-2 rounded-full text-xs shadow-md shadow-brand-500/25 transition-all hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4" />
                <span>Create Post</span>
              </button>

              <Link
                href="/messages"
                aria-label="Messages"
                className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-500/50 hover:bg-dark-hover transition-all relative shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
              </Link>

              <div ref={notifRef} className="relative">
                <button
                  onClick={() => {
                    setNotifOpen((v) => !v);
                    setMenuOpen(false);
                  }}
                  aria-label="Notifications"
                  aria-expanded={notifOpen}
                  className="w-9 h-9 rounded-full bg-dark-card border border-dark-border flex items-center justify-center text-slate-300 hover:text-white hover:border-brand-500/50 hover:bg-dark-hover transition-all shadow-sm"
                >
                  <Bell className="w-4 h-4" />
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-dark-card border border-dark-border shadow-2xl p-4 text-center space-y-2">
                    <Bell className="w-5 h-5 text-slate-500 mx-auto" />
                    <p className="text-xs font-bold text-white">No new notifications</p>
                    <p className="text-[11px] text-slate-400">Likes, tips and new subscribers will show up here.</p>
                  </div>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-dark-card/90 border border-brand-500/25 text-xs font-bold text-amber-400 shadow-sm">
                <Wallet className="w-3.5 h-3.5 text-brand-500" />
                <span>${Number(user.walletBalance || 0).toFixed(2)}</span>
              </div>

              <div ref={menuRef} className="relative">
                <button
                  onClick={() => {
                    setMenuOpen((v) => !v);
                    setNotifOpen(false);
                  }}
                  aria-label="Account menu"
                  aria-expanded={menuOpen}
                  className="flex items-center rounded-full group"
                >
                  <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-brand-500/60 group-hover:border-brand-500 shadow-sm transition-colors">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </button>
                {menuOpen && (
                  <div role="menu" className="absolute right-0 mt-2 w-56 rounded-2xl bg-dark-card border border-dark-border shadow-2xl p-2 space-y-1">
                    <div className="px-3 py-2 border-b border-dark-border/60">
                      <p className="text-xs font-bold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">@{user.username}</p>
                    </div>
                    <Link
                      href={`/${user.username}`}
                      onClick={() => setMenuOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-dark-hover transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>View Profile</span>
                    </Link>
                    <div className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-amber-400">
                      <Wallet className="w-4 h-4 text-brand-500" />
                      <span>${Number(user.walletBalance || 0).toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      role="menuitem"
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
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

      {/* Search Bar (mobile, below main row) */}
      <div className="md:hidden px-2 sm:px-4 pb-2.5">
        <form onSubmit={submitSearch} role="search" className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search exclusive creators..."
            aria-label="Search creators"
            className="w-full bg-dark-card/90 border border-dark-border rounded-full pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
          />
        </form>
      </div>
    </header>
  );
};
