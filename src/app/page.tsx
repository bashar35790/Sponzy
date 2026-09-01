'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StoryTray } from '@/components/feed/StoryTray';
import { PostCard } from '@/components/feed/PostCard';
import { CreatePostModal } from '@/components/feed/CreatePostModal';
import { api } from '@/lib/api';
import { Sparkles, CheckCircle2, TrendingUp, Compass } from 'lucide-react';

export default function HomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await api.get('/posts/feed');
        if (res.data?.posts && res.data.posts.length > 0) {
          setPosts(res.data.posts);
        } else {
          // Fallback sample posts
          setPosts([
            {
              id: 'sample-1',
              user: {
                id: '1',
                name: 'Elena Ray',
                username: 'elenaray',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                isVerified: true,
              },
              description: 'Behind the scenes from today’s sunset photo shoot on the coast! ✨ Full 4K gallery available below.',
              lockType: 'FREE',
              likesCount: 142,
              commentsCount: 28,
              createdAt: new Date().toISOString(),
              media: [
                {
                  id: 'm1',
                  type: 'IMAGE',
                  url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80',
                },
              ],
            },
            {
              id: 'sample-2',
              user: {
                id: '2',
                name: 'Alex Rivera',
                username: 'alexrivera',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                isVerified: true,
              },
              description: 'Exclusive 4K travel vlog & drone recordings from Bali 🌴 Only available to my active VIP subscribers.',
              lockType: 'SUBSCRIBERS_ONLY',
              price: 0,
              isLocked: true,
              likesCount: 395,
              commentsCount: 64,
              createdAt: new Date().toISOString(),
              media: [
                {
                  id: 'm2',
                  type: 'IMAGE',
                  url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&auto=format&fit=crop&q=80',
                },
              ],
            },
          ]);
        }
      } catch {
        // Fallback demo posts on backend offline
        setPosts([
          {
            id: 'sample-1',
            user: {
              id: '1',
              name: 'Elena Ray',
              username: 'elenaray',
              avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              isVerified: true,
            },
            description: 'Behind the scenes from today’s sunset photo shoot on the coast! ✨ Full 4K gallery available below.',
            lockType: 'FREE',
            likesCount: 142,
            commentsCount: 28,
            createdAt: new Date().toISOString(),
            media: [
              {
                id: 'm1',
                type: 'IMAGE',
                url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80',
              },
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  return (
    <div className="flex gap-8 p-4 lg:p-6">
      {/* Center Feed Column */}
      <div className="flex-1 max-w-2xl mx-auto space-y-6">
        {/* Stories Tray */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-4 shadow-lg shadow-black/20">
          <StoryTray />
        </div>

        {/* Quick Post Prompt */}
        <div
          onClick={() => setIsCreateOpen(true)}
          className="bg-dark-card border border-dark-border rounded-3xl p-4 flex items-center gap-3 cursor-pointer hover:border-slate-700 transition-colors shadow-lg shadow-black/20"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-600 to-pink-500 flex items-center justify-center text-white font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1 text-sm text-slate-400 font-medium">
            Post an update, photos, or pay-per-view video...
          </div>
          <button className="bg-brand-600/10 text-pink-400 border border-brand-500/20 px-4 py-2 rounded-full text-xs font-bold">
            Post
          </button>
        </div>

        {/* Feed Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar: Featured Creators & Suggestions */}
      <aside className="w-80 shrink-0 hidden xl:block space-y-6 sticky top-[80px] h-fit">
        <div className="bg-dark-card border border-dark-border rounded-3xl p-5 shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <TrendingUp className="w-4 h-4 text-pink-500" />
              <span>Suggested Creators</span>
            </div>
            <Link href="/explore" className="text-xs text-pink-400 font-semibold hover:underline">
              See all
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                name: 'Elena Ray',
                username: 'elenaray',
                role: 'Photographer & Model',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
              },
              {
                name: 'Alex Rivera',
                username: 'alexrivera',
                role: 'Fitness & Lifestyle Coach',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
              },
              {
                name: 'Maya Lin',
                username: 'mayalin',
                role: 'Digital Artist & Cosplay',
                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
              },
            ].map((c) => (
              <div key={c.username} className="flex items-center justify-between gap-3">
                <Link href={`/${c.username}`} className="flex items-center gap-3 min-w-0">
                  <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1 font-semibold text-white text-xs truncate">
                      <span>{c.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{c.role}</p>
                  </div>
                </Link>
                <Link
                  href={`/${c.username}`}
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-md shadow-pink-500/20 transition-all shrink-0"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-3 text-xs text-slate-500 space-y-2">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/cookies" className="hover:underline">Cookies</Link>
            <Link href="/help" className="hover:underline">Help & Support</Link>
          </div>
          <p>© 2026 Sponzy Inc. All rights reserved.</p>
        </div>
      </aside>

      <CreatePostModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
    </div>
  );
}
