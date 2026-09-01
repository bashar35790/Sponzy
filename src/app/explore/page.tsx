'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Search, Sparkles, CheckCircle2, Flame, MapPin, DollarSign, Filter } from 'lucide-react';

export default function ExplorePage() {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      try {
        const res = await api.get('/users/explore');
        if (res.data?.success) {
          setCreators(res.data.creators || []);
        }
      } catch (err) {
        console.error('Failed to load explore creators:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCreators();
  }, []);

  const categories = ['ALL', 'Fitness', 'Fashion', 'Art & Photography', 'Musician', 'Cosplay', 'Gaming'];

  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.username?.toLowerCase().includes(search.toLowerCase()) ||
      c.profession?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'ALL' ||
      c.profession?.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto pt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-400 text-xs font-bold">
          <Flame className="w-3.5 h-3.5 fill-brand-500" />
          <span>VIP Discover</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-black text-white tracking-tight">
          Explore Elite Creators
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Find your next favorite creator, unlock exclusive photosets, and join VIP member clubs.
        </p>

        {/* Search Bar */}
        <div className="relative pt-2">
          <Search className="absolute left-4 top-5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, @username, or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-dark-card border border-dark-border rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 shadow-xl transition-all"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                : 'bg-dark-card border border-dark-border text-slate-400 hover:text-white hover:bg-dark-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Creators Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-80 bg-dark-card border border-dark-border rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : filteredCreators.length === 0 ? (
        <div className="bg-dark-card border border-dark-border rounded-3xl p-12 text-center text-slate-500 text-xs">
          No creators found matching &quot;{search}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-2xl hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Cover Banner */}
                <div className="h-32 w-full bg-slate-800 relative overflow-hidden">
                  <img
                    src={creator.cover || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'}
                    alt={creator.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-black/30" />
                </div>

                {/* Avatar & Info */}
                <div className="px-5 pb-4 relative -mt-12 space-y-3">
                  <div className="flex items-end justify-between">
                    <div className="w-20 h-20 rounded-full border-4 border-dark-card overflow-hidden bg-dark-bg shadow-xl ring-2 ring-brand-500/40">
                      <img
                        src={creator.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-brand-400">
                        ${Number(creator.creatorMonthlyPrice || 10).toFixed(0)}/mo
                      </span>
                      <p className="text-[10px] text-slate-500 font-semibold">{creator._count?.posts || 0} Posts</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-editorial text-base font-bold text-white group-hover:text-brand-400 transition-colors">
                        {creator.name}
                      </h3>
                      {creator.isVerified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 fill-brand-500 text-white" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-medium">@{creator.username}</p>
                    {creator.profession && (
                      <span className="inline-block mt-1 text-[11px] font-bold text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-full border border-brand-500/20">
                        {creator.profession}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {creator.bio || 'Exclusive weekly sets, behind-the-scenes, and 1-on-1 private messaging.'}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <Link
                  href={`/${creator.username}`}
                  className="block w-full py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold text-center shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.01]"
                >
                  View Profile & Plans
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
