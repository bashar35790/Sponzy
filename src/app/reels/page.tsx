'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import {
  Heart,
  MessageCircle,
  Share2,
  Music2,
  Volume2,
  VolumeX,
  Sparkles,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export default function ReelsPage() {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Fallback demo reels
  const demoReels = [
    {
      id: 'r1',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-skater-performing-a-trick-41315-large.mp4',
      caption: 'Golden hour sunset session ✨ Unlock the full unedited behind-the-scenes in my VIP store!',
      audioTrack: 'Original Sound - Elena Ray',
      likesCount: 1420,
      user: {
        name: 'Elena Ray',
        username: 'elenaray',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
    },
    {
      id: 'r2',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-doing-morning-yoga-routine-41221-large.mp4',
      caption: '15-minute core burn routine 💪 Full workout PDF available in my shop!',
      audioTrack: 'Workout Beats - Alex Rivera',
      likesCount: 980,
      user: {
        name: 'Alex Rivera',
        username: 'alexrivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        isVerified: true,
      },
    },
  ];

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const res = await api.get('/reels/feed');
        if (res.data?.reels && res.data.reels.length > 0) {
          setReels(res.data.reels);
        } else {
          setReels(demoReels);
        }
      } catch {
        setReels(demoReels);
      } finally {
        setLoading(false);
      }
    };
    fetchReels();
  }, []);

  return (
    <div className="max-w-md mx-auto space-y-6 pb-16">
      <div className="flex items-center justify-between px-2 pt-2">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-brand-500 fill-brand-500" />
          <h1 className="font-editorial text-2xl font-bold text-white">VIP Reels</h1>
        </div>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2.5 rounded-full bg-dark-card border border-dark-border text-slate-300 hover:text-white"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-brand-400" />}
        </button>
      </div>

      <div className="space-y-8">
        {reels.map((reel) => (
          <div
            key={reel.id}
            className="relative w-full aspect-[9/16] bg-black rounded-3xl overflow-hidden border border-dark-border shadow-2xl shadow-black/80 flex items-center justify-center"
          >
            <video
              src={reel.videoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

            {/* Right Action Icons */}
            <div className="absolute right-4 bottom-8 flex flex-col items-center gap-5 z-20">
              <button className="flex flex-col items-center gap-1 text-white hover:text-brand-400 transition-colors group">
                <div className="w-11 h-11 rounded-full bg-dark-bg/60 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold">{reel.likesCount || 120}</span>
              </button>

              <button className="flex flex-col items-center gap-1 text-white hover:text-brand-400 transition-colors group">
                <div className="w-11 h-11 rounded-full bg-dark-bg/60 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold">48</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Reel link copied!');
                }}
                className="w-11 h-11 rounded-full bg-dark-bg/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-brand-400 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Creator Info & Caption */}
            <div className="absolute left-4 right-16 bottom-6 z-20 space-y-2.5">
              <Link href={`/${reel.user.username}`} className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-500 ring-2 ring-brand-500/30">
                  <img src={reel.user.avatar} alt={reel.user.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-1 font-bold text-white text-sm group-hover:text-brand-400 transition-colors">
                    <span>{reel.user.name}</span>
                    {reel.user.isVerified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 fill-brand-500 text-white" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300">@{reel.user.username}</p>
                </div>
              </Link>

              <p className="text-xs text-slate-200 leading-relaxed line-clamp-2">{reel.caption}</p>

              {reel.audioTrack && (
                <div className="flex items-center gap-2 text-[11px] text-brand-400 font-semibold">
                  <Music2 className="w-3.5 h-3.5" />
                  <span className="truncate">{reel.audioTrack}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
