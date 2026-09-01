'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { PostCard } from '@/components/feed/PostCard';
import {
  CheckCircle2,
  DollarSign,
  MessageSquare,
  Lock,
  Grid,
  Image as ImageIcon,
  Film,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';

export default function CreatorProfilePage() {
  const params = useParams();
  const username = params?.username as string;

  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'posts' | 'photos' | 'videos' | 'shop'>('posts');
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await api.get(`/users/${username}`);
        if (res.data?.profile) {
          setProfile(res.data.profile);
        }
      } catch {
        // Fallback demo profile
        setProfile({
          id: '1',
          name: 'Elena Ray',
          username: username || 'elenaray',
          bio: 'Visual artist, fashion enthusiast & lifestyle creator ✨ Exclusive weekly 4K photo sets, behind-the-scenes videos, and daily 1-on-1 private messaging!',
          profession: 'Fashion & Visual Creator',
          website: 'https://elenaray.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
          cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
          isVerified: true,
          creatorMonthlyPrice: 9.99,
          subscribersCount: 1420,
          postsCount: 52,
          isSubscribed: false,
          plans: [
            { id: 'p1', name: 'Monthly Membership', price: 9.99, interval: '1 Month' },
            { id: 'p2', name: 'VIP 3 Months (15% Off)', price: 24.99, interval: '3 Months' },
            { id: 'p3', name: 'Annual VIP Pass (30% Off)', price: 79.99, interval: '1 Year' },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  const handleSubscribe = async (planId?: string) => {
    try {
      setIsSubscribing(true);
      const res = await api.post('/subscriptions/subscribe', {
        creatorId: profile.id,
        planId,
      });
      if (res.data.success) {
        alert(res.data.message || 'Subscribed successfully!');
        window.location.reload();
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Subscription failed');
    } finally {
      setIsSubscribing(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Cover Image */}
      <div className="h-48 sm:h-72 w-full bg-slate-800 relative overflow-hidden">
        <img
          src={profile.cover || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80'}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-black/30" />
      </div>

      {/* Profile Header Details */}
      <div className="px-4 sm:px-8 relative -mt-16 sm:-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div className="flex items-end gap-4">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-dark-bg overflow-hidden bg-dark-card shadow-2xl shrink-0">
              <img
                src={profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pb-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{profile.name}</h1>
                {profile.isVerified && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
              </div>
              <p className="text-sm text-slate-400 font-medium">@{profile.username}</p>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                {profile.role === 'ADMIN' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    👑 Platform Admin
                  </span>
                ) : profile.role === 'CREATOR' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-pink-400 bg-brand-500/15 px-2.5 py-0.5 rounded-full border border-brand-500/30">
                    ✨ Content Creator • {profile.profession || 'Creator'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-300 bg-purple-500/15 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                    💜 Member / Subscriber
                  </span>
                )}
                {profile.freeSubscription && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Free Follow
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/messages"
              className="flex items-center gap-2 bg-dark-card border border-dark-border hover:bg-dark-hover text-slate-200 font-semibold text-sm px-4 py-2.5 rounded-full transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </Link>

            <button
              onClick={() => handleSubscribe()}
              disabled={isSubscribing || profile.isSubscribed}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all ${
                profile.isSubscribed
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-gradient-to-r from-brand-600 to-pink-500 hover:from-brand-500 text-white shadow-pink-500/25 hover:scale-[1.02]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {profile.isSubscribed
                  ? 'Subscribed'
                  : profile.freeSubscription || Number(profile.creatorMonthlyPrice) === 0
                  ? 'Subscribe Free'
                  : `Subscribe $${Number(profile.creatorMonthlyPrice).toFixed(2)}/mo`}
              </span>
            </button>
          </div>
        </div>

        {/* Bio & Stats */}
        <div className="max-w-2xl space-y-3 mb-8">
          <p className="text-sm text-slate-200 leading-relaxed">{profile.bio}</p>
          <div className="flex items-center gap-6 text-sm text-slate-400 pt-1">
            <span>
              <strong className="text-white font-bold">{profile.postsCount || 0}</strong> Posts
            </span>
            <span>
              <strong className="text-white font-bold">{profile.subscribersCount || 0}</strong> Subscribers
            </span>
          </div>
        </div>

        {/* Subscription Tier Plans */}
        {profile.plans && profile.plans.length > 0 && !profile.isSubscribed && (
          <div className="mb-10 bg-dark-card border border-dark-border rounded-3xl p-6 shadow-xl">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span>Subscription Packages</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {profile.plans.map((plan: any) => (
                <div
                  key={plan.id}
                  className="bg-dark-bg border border-dark-border hover:border-brand-500/50 p-5 rounded-2xl flex flex-col justify-between transition-colors group"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-pink-400 transition-colors">
                      {plan.name}
                    </h4>
                    <span className="text-2xl font-black text-white block mt-2">
                      ${Number(plan.price).toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">every {plan.interval}</span>
                  </div>
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    className="mt-4 w-full bg-brand-600/20 hover:bg-brand-600 text-pink-300 hover:text-white border border-brand-500/30 text-xs font-bold py-2.5 rounded-full transition-all"
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Tabs */}
        <div className="border-b border-dark-border flex items-center gap-8 mb-6">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'posts'
                ? 'border-brand-500 text-pink-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid className="w-4 h-4" />
            <span>Posts</span>
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'photos'
                ? 'border-brand-500 text-pink-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photos</span>
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'videos'
                ? 'border-brand-500 text-pink-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Videos</span>
          </button>
        </div>

        {/* Posts Content */}
        <div className="max-w-2xl mx-auto space-y-6">
          <PostCard
            post={{
              id: 'profile-post-1',
              user: {
                id: profile.id,
                name: profile.name,
                username: profile.username,
                avatar: profile.avatar,
                isVerified: profile.isVerified,
              },
              description: 'Welcome to my official creator subscription page! Enjoy full access to my photos, tutorials, and exclusive video streams.',
              lockType: 'FREE',
              likesCount: 230,
              commentsCount: 34,
              createdAt: new Date().toISOString(),
              media: [
                {
                  id: 'pm1',
                  type: 'IMAGE',
                  url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80',
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}
