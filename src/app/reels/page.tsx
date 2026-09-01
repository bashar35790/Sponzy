'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import {
  Heart,
  MessageCircle,
  Share2,
  Music2,
  Sparkles,
  Flame,
  CheckCircle2,
  Volume2,
  VolumeX,
} from 'lucide-react';

export default function ReelsPage() {
  const [reels, setReels] = useState<any[]>([]);
  const [likedReels, setLikedReels] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});

  // Curated YouTube Shorts & Reels dummy videos
  const youtubeReels = [
    {
      id: 'yr1',
      youtubeId: '5qap5aO4i9A',
      caption: 'Sunset vibes & beach aesthetic 🌅 Full 4K set is live for all VIP subscribers!',
      audioTrack: 'Original Sound - Elena Ray',
      initialLikes: 2450,
      commentsCount: 142,
      user: {
        name: 'Elena Ray',
        username: 'elenaray',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
    },
    {
      id: 'yr2',
      youtubeId: 'kJQP7kiw5Fk',
      caption: 'Full body high-intensity routine 🔥 15 mins daily transformation program!',
      audioTrack: 'Workout Beat - Alex Rivera',
      initialLikes: 1890,
      commentsCount: 89,
      user: {
        name: 'Alex Rivera',
        username: 'alexrivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
    },
    {
      id: 'yr3',
      youtubeId: 'fJ9rUzIMcZQ',
      caption: 'Behind the scenes studio recording session 🎶 Drop a comment if you want the stems!',
      audioTrack: 'Acoustic Studio - Marcus Vance',
      initialLikes: 1320,
      commentsCount: 65,
      user: {
        name: 'Marcus Vance',
        username: 'marcusvance',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
    },
  ];

  useEffect(() => {
    setReels(youtubeReels);
    const initialLikes: Record<string, number> = {};
    youtubeReels.forEach((r) => {
      initialLikes[r.id] = r.initialLikes;
    });
    setLikeCounts(initialLikes);
  }, []);

  const toggleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const isCurrentlyLiked = !!prev[reelId];
      setLikeCounts((cPrev) => ({
        ...cPrev,
        [reelId]: (cPrev[reelId] || 0) + (isCurrentlyLiked ? -1 : 1),
      }));
      return { ...prev, [reelId]: !isCurrentlyLiked };
    });
  };

  return (
    <div className="max-w-md mx-auto space-y-6 pb-20 px-1 sm:px-0">
      {/* Header */}
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-brand-500 fill-brand-500" />
          <h1 className="font-editorial text-2xl font-bold text-white">VIP Shorts & Reels</h1>
        </div>
        <div className="text-xs font-bold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
          YouTube Shorts
        </div>
      </div>

      {/* Vertical Reels Feed */}
      <div className="space-y-8">
        {reels.map((reel) => {
          const isLiked = !!likedReels[reel.id];
          const count = likeCounts[reel.id] || reel.initialLikes;

          return (
            <div
              key={reel.id}
              className="relative w-full aspect-[9/16] bg-black rounded-3xl overflow-hidden border border-dark-border shadow-2xl shadow-black/90 flex flex-col justify-between"
            >
              {/* YouTube Embed Player */}
              <div className="absolute inset-0 w-full h-full pointer-events-auto">
                <iframe
                  src={`https://www.youtube.com/embed/${reel.youtubeId}?autoplay=0&controls=1&rel=0&modestbranding=1&loop=1&playlist=${reel.youtubeId}`}
                  title={reel.caption}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover rounded-3xl border-0"
                />
              </div>

              {/* Gradient overlays */}
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none z-10" />

              {/* Top Header info */}
              <div className="relative z-20 p-4 flex items-center justify-between pointer-events-none">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-dark-bg/80 backdrop-blur-md text-slate-200 border border-white/10">
                  Featured Reel
                </span>
              </div>

              {/* Bottom Interactive Area */}
              <div className="relative z-20 p-4 flex items-end justify-between gap-3 pointer-events-auto">
                {/* Left: Author details & caption */}
                <div className="space-y-2 flex-1 min-w-0 pr-2">
                  <Link href={`/${reel.user.username}`} className="flex items-center gap-2.5 group">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-500 ring-2 ring-brand-500/30 shrink-0">
                      <img src={reel.user.avatar} alt={reel.user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1 font-bold text-white text-xs sm:text-sm group-hover:text-brand-400 transition-colors">
                        <span className="truncate">{reel.user.name}</span>
                        {reel.user.isVerified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 fill-brand-500 text-white shrink-0" />
                        )}
                      </div>
                      <p className="text-[10px] text-slate-300">@{reel.user.username}</p>
                    </div>
                  </Link>

                  <p className="text-xs text-slate-200 leading-snug line-clamp-2">{reel.caption}</p>

                  <div className="flex items-center gap-1.5 text-[10px] text-brand-400 font-semibold">
                    <Music2 className="w-3 h-3" />
                    <span className="truncate">{reel.audioTrack}</span>
                  </div>
                </div>

                {/* Right: Actions Column */}
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <button
                    onClick={() => toggleLike(reel.id)}
                    className="flex flex-col items-center gap-1 text-white group"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                        isLiked
                          ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/40 scale-110'
                          : 'bg-dark-bg/80 border-white/20 text-slate-200 group-hover:scale-105'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-white' : ''}`} />
                    </div>
                    <span className="text-[10px] font-bold">{count}</span>
                  </button>

                  <button className="flex flex-col items-center gap-1 text-white group">
                    <div className="w-10 h-10 rounded-full bg-dark-bg/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-200 group-hover:scale-105 transition-transform">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold">{reel.commentsCount}</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Reel link copied to clipboard!');
                    }}
                    className="w-10 h-10 rounded-full bg-dark-bg/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-200 hover:text-white transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
