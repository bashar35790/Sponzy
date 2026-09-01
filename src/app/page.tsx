'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { StoryTray } from '@/components/feed/StoryTray';
import { PostCard } from '@/components/feed/PostCard';
import { CreatePostModal } from '@/components/feed/CreatePostModal';
import {
  Sparkles,
  Flame,
  CheckCircle2,
  TrendingUp,
  Award,
  Crown,
  Compass,
  ArrowRight,
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [feedRes, storiesRes, creatorsRes] = await Promise.all([
        api.get('/posts/feed'),
        api.get('/stories/feed'),
        api.get('/users/explore'),
      ]);

      if (feedRes.data?.posts) setPosts(feedRes.data.posts);
      if (storiesRes.data?.stories) setStories(storiesRes.data.stories);
      if (creatorsRes.data?.creators) setCreators(creatorsRes.data.creators);
    } catch (err) {
      console.error('Failed to load feed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 24-Hour Stories Bar */}
      <div className="bg-dark-card/80 border border-dark-border rounded-3xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
        <StoryTray stories={stories} onOpenCreateStory={() => setIsCreatePostOpen(true)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Home Feed (Left 8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Welcome / VIP Banner for Members */}
          <div className="bg-gradient-to-r from-brand-600/20 via-amber-500/10 to-transparent border border-brand-500/25 rounded-3xl p-6 shadow-xl relative overflow-hidden flex items-center justify-between">
            <div className="space-y-1.5 z-10">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">VIP Access Club</span>
              </div>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-white leading-tight">
                Discover Elite Creators & Exclusive Media
              </h2>
              <p className="text-xs text-slate-300 max-w-md">
                Subscribe to your favorite creators to unlock 4K photo sets, behind-the-scenes, and direct 1-on-1 private chat.
              </p>
            </div>
            <div className="hidden sm:block absolute right-4 bottom-2 opacity-15">
              <Flame className="w-32 h-32 text-brand-500" />
            </div>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="h-96 bg-dark-card border border-dark-border rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-dark-card border border-dark-border rounded-3xl p-12 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-brand-500 mx-auto" />
              <h3 className="font-editorial text-lg font-bold text-white">No Posts in Feed</h3>
              <p className="text-xs text-slate-400">Explore and follow top creators to see their latest updates.</p>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-500 text-white font-bold text-xs shadow-md shadow-brand-500/20 hover:bg-brand-600 transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Creators</span>
              </Link>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

        {/* Right Sidebar Spotlight (Right 4 cols) */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
          {/* Top Featured Creators Card */}
          <div className="bg-dark-card border border-dark-border rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-brand-500 fill-brand-500" />
                <h3 className="font-editorial text-base font-bold text-white">Top Creators</h3>
              </div>
              <Link href="/explore" className="text-xs font-bold text-brand-400 hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {creators.slice(0, 4).map((creator) => (
                <div
                  key={creator.id}
                  className="flex items-center justify-between p-2 rounded-2xl bg-dark-bg/60 border border-dark-border/60 hover:border-brand-500/40 transition-all group"
                >
                  <Link href={`/${creator.username}`} className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-500/40 shrink-0">
                      <img
                        src={creator.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold text-white truncate group-hover:text-brand-400 transition-colors">
                          {creator.name}
                        </p>
                        {creator.isVerified && (
                          <CheckCircle2 className="w-3 h-3 text-brand-500 fill-brand-500 text-white shrink-0" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        ${Number(creator.creatorMonthlyPrice || 10).toFixed(0)}/month
                      </p>
                    </div>
                  </Link>

                  <Link
                    href={`/${creator.username}`}
                    className="px-3 py-1.5 rounded-full bg-brand-500/10 hover:bg-brand-500 hover:text-white text-brand-400 font-bold text-xs border border-brand-500/25 transition-all shrink-0"
                  >
                    Follow
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Luxury VIP Membership Box */}
          <div className="bg-gradient-to-br from-dark-card via-dark-card to-brand-900/20 border border-brand-500/30 rounded-3xl p-5 shadow-2xl space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-editorial text-base font-bold text-white">Become a Creator</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              Monetize your audience with custom VIP subscriptions, pay-per-view sets, and direct paid messages.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-400 hover:text-brand-300 transition-colors pt-1"
            >
              <span>Start Earning Today</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Create Post Modal */}
      {isCreatePostOpen && (
        <CreatePostModal
          isOpen={isCreatePostOpen}
          onClose={() => setIsCreatePostOpen(false)}
          onPostCreated={() => {
            setIsCreatePostOpen(false);
            fetchData();
          }}
        />
      )}
    </div>
  );
}
