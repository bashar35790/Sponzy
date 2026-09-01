'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Heart, MessageCircle, Share2, Music, CheckCircle2, Volume2, VolumeX } from 'lucide-react';

export default function ReelsPage() {
  const [reels, setReels] = useState<any[]>([
    {
      id: 'r1',
      user: {
        id: '1',
        name: 'Elena Ray',
        username: 'elenaray',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-sign-1232-large.mp4',
      caption: 'Night vibes in Tokyo ✨ Neon aesthetics and midnight shoots.',
      audioTrack: 'Elena Ray • Midnight Dream',
      likesCount: 1420,
      commentsCount: 184,
      isLiked: false,
    },
    {
      id: 'r2',
      user: {
        id: '2',
        name: 'Alex Rivera',
        username: 'alexrivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-athlete-working-out-with-heavy-ropes-in-a-gym-41588-large.mp4',
      caption: 'Full body battle rope finisher! Try 5 sets of 45 seconds 🔥',
      audioTrack: 'Workout Beats • High Energy Vol. 4',
      likesCount: 2380,
      commentsCount: 95,
      isLiked: false,
    },
  ]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const toggleLike = async (idx: number) => {
    const reel = reels[idx];
    const newReels = [...reels];
    newReels[idx].isLiked = !reel.isLiked;
    newReels[idx].likesCount = reel.isLiked ? reel.likesCount - 1 : reel.likesCount + 1;
    setReels(newReels);
    try {
      await api.post(`/reels/${reel.id}/like`);
    } catch {}
  };

  const currentReel = reels[currentIdx];

  return (
    <div className="flex items-center justify-center p-2 sm:p-6 min-h-[calc(100vh-80px)]">
      <div className="relative w-full max-w-sm sm:max-w-md h-[78vh] sm:h-[82vh] bg-black rounded-3xl overflow-hidden shadow-2xl border border-dark-border flex flex-col justify-between">
        {/* Video Player */}
        <video
          src={currentReel.videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Top Header controls */}
        <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
          <span className="text-sm font-bold text-white tracking-wider">Shorts & Reels</span>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Bottom Content & Side Action buttons */}
        <div className="relative z-10 p-5 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end justify-between gap-4">
          {/* Creator & Caption */}
          <div className="space-y-3 min-w-0 flex-1">
            <Link href={`/${currentReel.user.username}`} className="flex items-center gap-2.5 group">
              <img
                src={currentReel.user.avatar}
                alt={currentReel.user.name}
                className="w-10 h-10 rounded-full border-2 border-brand-500 object-cover"
              />
              <div>
                <div className="flex items-center gap-1 font-bold text-white text-sm">
                  <span>{currentReel.user.name}</span>
                  {currentReel.user.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />}
                </div>
                <span className="text-xs text-slate-300">@{currentReel.user.username}</span>
              </div>
            </Link>

            <p className="text-sm text-slate-100 leading-snug">{currentReel.caption}</p>

            <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
              <Music className="w-3.5 h-3.5 animate-pulse text-brand-400" />
              <span className="truncate">{currentReel.audioTrack}</span>
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex flex-col items-center gap-5 pb-2">
            <button
              onClick={() => toggleLike(currentIdx)}
              className="flex flex-col items-center gap-1 text-white group"
            >
              <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart
                  className={`w-6 h-6 ${
                    currentReel.isLiked ? 'fill-pink-500 text-pink-500' : 'text-white'
                  }`}
                />
              </div>
              <span className="text-xs font-bold">{currentReel.likesCount}</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white group">
              <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold">{currentReel.commentsCount}</span>
            </button>

            <button className="flex flex-col items-center gap-1 text-white group">
              <div className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold">Share</span>
            </button>
          </div>
        </div>

        {/* Previous / Next indicator buttons for desktop */}
        {reels.length > 1 && (
          <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
            <button
              onClick={() => setCurrentIdx((prev) => (prev > 0 ? prev - 1 : reels.length - 1))}
              className="w-10 h-10 rounded-full bg-dark-card border border-dark-border text-white flex items-center justify-center font-bold hover:bg-dark-hover"
            >
              ▲
            </button>
            <button
              onClick={() => setCurrentIdx((prev) => (prev < reels.length - 1 ? prev + 1 : 0))}
              className="w-10 h-10 rounded-full bg-dark-card border border-dark-border text-white flex items-center justify-center font-bold hover:bg-dark-hover"
            >
              ▼
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
