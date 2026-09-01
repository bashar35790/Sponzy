'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Search, CheckCircle2, Sparkles, Users, Image as ImageIcon } from 'lucide-react';

export default function ExplorePage() {
  const [creators, setCreators] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const res = await api.get('/users/explore');
        if (res.data?.creators) {
          setCreators(res.data.creators);
        }
      } catch {
        // Fallback demo creators
        setCreators([
          {
            id: '1',
            name: 'Elena Ray',
            username: 'elenaray',
            profession: 'Fashion & Visual Model',
            bio: 'Exclusive high-definition galleries, weekly behind the scenes, and direct chat! ✨',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
            cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
            isVerified: true,
            creatorMonthlyPrice: 9.99,
            _count: { posts: 148, subscriptionsReceived: 1250 },
          },
          {
            id: '2',
            name: 'Alex Rivera',
            username: 'alexrivera',
            profession: 'Fitness Coach & Athlete',
            bio: 'Transform your body with my custom workout programs, daily meal plans & live coaching.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
            cover: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
            isVerified: true,
            creatorMonthlyPrice: 14.99,
            _count: { posts: 84, subscriptionsReceived: 890 },
          },
          {
            id: '3',
            name: 'Maya Lin',
            username: 'mayalin',
            profession: 'Digital Illustrator & Anime',
            bio: 'Drawing tutorials, layered PSD files, wallpapers, and monthly art pack downloads.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80',
            cover: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
            isVerified: true,
            creatorMonthlyPrice: 4.99,
            _count: { posts: 210, subscriptionsReceived: 3400 },
          },
        ]);
      }
    };
    fetchCreators();
  }, []);

  const filtered = creators.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.username.toLowerCase().includes(search.toLowerCase()) ||
    (c.profession && c.profession.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-purple-900/60 via-brand-900/40 to-pink-900/60 border border-brand-500/20 p-8 sm:p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 text-pink-300 font-semibold text-xs border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Top Creators</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Trending Talents
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Subscribe to favorite artists, fitness coaches, models, musicians, and creators from around the world.
          </p>

          {/* Search box */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="absolute left-4 top-5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, skill, username..."
              className="w-full bg-dark-bg/90 border border-dark-border rounded-full pl-12 pr-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((creator) => (
          <div
            key={creator.id}
            className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col group"
          >
            {/* Header Cover */}
            <div className="h-28 w-full bg-slate-800 relative overflow-hidden">
              <img
                src={creator.cover || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'}
                alt="Cover"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Avatar & Content */}
            <div className="px-5 pb-5 pt-0 flex-1 flex flex-col justify-between relative">
              <div className="-mt-12 mb-3 flex items-end justify-between">
                <div className="w-20 h-20 rounded-full border-4 border-dark-card overflow-hidden bg-dark-bg shadow-lg">
                  <img
                    src={creator.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'}
                    alt={creator.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-medium">Subscription</span>
                  <span className="text-base font-extrabold text-emerald-400">
                    {creator.freeSubscription || Number(creator.creatorMonthlyPrice) === 0
                      ? 'Free'
                      : `$${Number(creator.creatorMonthlyPrice).toFixed(2)}/mo`}
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 font-bold text-white text-base">
                  <span>{creator.name}</span>
                  {creator.isVerified && <CheckCircle2 className="w-4 h-4 text-brand-500" />}
                </div>
                <p className="text-xs text-slate-400 mb-2">@{creator.username}</p>
                {creator.bio && (
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {creator.bio}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" />
                    {creator._count?.posts || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {creator._count?.subscriptionsReceived || 0}
                  </span>
                </div>

                <Link
                  href={`/${creator.username}`}
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-pink-500/20 transition-all"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
