'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  CheckCircle2,
  Lock,
  Heart,
  MessageSquare,
  Sparkles,
  MapPin,
  Flame,
  LayoutGrid,
  Image as ImageIcon,
  Film,
  ShoppingBag,
  DollarSign,
  ChevronDown,
  Gift,
  Share2,
} from 'lucide-react';
import { PostCard } from '@/components/feed/PostCard';

export default function CreatorProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { user: currentUser } = useAuth();

  const [profile, setProfile] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'timeline' | 'media' | 'videos' | 'shop'>('timeline');
  const [loading, setLoading] = useState(true);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/users/${username}`);
        if (res.data?.success) {
          setProfile(res.data.creator);
          setPosts(res.data.creator.posts || []);
          if (res.data.creator.plans && res.data.creator.plans.length > 0) {
            setSelectedPlanId(res.data.creator.plans[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch creator profile:', err);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchProfile();
    }
  }, [username]);

  const handleSubscribe = async (planId?: string) => {
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    try {
      setIsSubscribing(true);
      const targetPlan = planId || selectedPlanId || (profile?.plans?.[0]?.id);
      const res = await api.post('/subscriptions/subscribe', {
        creatorId: profile.id,
        planId: targetPlan,
      });
      if (res.data.success) {
        alert(res.data.message || 'Subscribed successfully!');
        window.location.reload();
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Subscription failed. Please check your wallet balance.');
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

  // Default plans if none explicitly configured in database
  const displayPlans = profile.plans && profile.plans.length > 0 ? profile.plans : [
    { id: 'p1', name: '1 Month', interval: '1 Month', price: profile.creatorMonthlyPrice || '10.00' },
    { id: 'p2', name: '2 Month', interval: '2 Months', price: (Number(profile.creatorMonthlyPrice || 10) * 1.5).toFixed(2) },
    { id: 'p3', name: '3 Month', interval: '3 Months', price: (Number(profile.creatorMonthlyPrice || 10) * 2.0).toFixed(2) },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-16">
      {/* Top Section: Hero Profile Card + Subscription Plans Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Creator Hero Card (Matches Screenshot) */}
        <div className="lg:col-span-8 bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-2xl space-y-4">
          {/* Cover Banner */}
          <div className="h-44 sm:h-64 w-full bg-slate-800 relative overflow-hidden">
            <img
              src={profile.cover || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80'}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-black/40" />
          </div>

          {/* Profile Header Details */}
          <div className="px-6 pb-6 pt-0 relative -mt-16 sm:-mt-20">
            <div className="flex items-end justify-between gap-4 mb-4">
              <div className="flex items-end gap-4">
                {/* Circular Cutout Avatar */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-dark-card overflow-hidden bg-dark-bg shadow-2xl shrink-0 ring-2 ring-brand-500/40">
                  <img
                    src={profile.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="pb-1">
                  <div className="flex items-center gap-2">
                    <h1 className="font-editorial text-xl sm:text-2xl font-bold text-white tracking-wide">
                      {profile.name}
                    </h1>
                    {profile.isVerified && (
                      <CheckCircle2 className="w-4 h-4 text-brand-500 fill-brand-500 text-white" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mt-0.5">
                    <span>@{profile.username}</span>
                    <span className="text-[10px] bg-dark-bg px-2 py-0.5 rounded-full border border-dark-border text-slate-400">
                      Follows You
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3 h-3 text-brand-500" />
                    <span>Istanbul, Turkey</span>
                  </div>
                </div>
              </div>

              {/* Follow / Subscribe Action Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSubscribe()}
                  disabled={isSubscribing || profile.isSubscribed}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold shadow-lg transition-all ${
                    profile.isSubscribed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 text-white shadow-brand-500/30 hover:scale-[1.02]'
                  }`}
                >
                  <Flame className="w-4 h-4 fill-white" />
                  <span>{profile.isSubscribed ? 'Subscribed' : 'Follow'}</span>
                </button>
              </div>
            </div>

            {/* Creator Bio */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal pt-2 border-t border-dark-border/60">
              {profile.bio || 'Exclusive weekly 4K sets, behind-the-scenes, and daily 1-on-1 private messaging! Transform your experience with VIP access.'}
            </p>
          </div>
        </div>

        {/* Subscription Plans Card (Right Side matching Reference Screenshot) */}
        <div className="lg:col-span-4 bg-dark-card border border-dark-border rounded-3xl p-5 shadow-2xl flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-4 h-4 text-brand-500" />
              <h2 className="font-editorial text-lg font-bold">Subscription Plans</h2>
            </div>

            {/* Limited Offer Promo Box */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-brand-600/15 to-amber-500/10 border border-brand-500/30 text-xs text-slate-200 space-y-1">
              <div className="font-bold text-brand-400 flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Limited Offer – 50% Off For 31 Days!</span>
              </div>
              <p className="text-[11px] text-slate-400">50% OFF + VIP VIDEO GIFT • Just For This Week</p>
            </div>

            {/* Plan Tier Rows */}
            <div className="space-y-2 pt-1">
              {displayPlans.map((plan: any) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                    selectedPlanId === plan.id
                      ? 'border-brand-500 bg-brand-500/10 text-white shadow-md shadow-brand-500/10'
                      : 'border-dark-border bg-dark-bg/60 text-slate-400 hover:text-slate-200 hover:bg-dark-hover'
                  }`}
                >
                  <span className="text-slate-300 font-semibold">{plan.name || plan.interval}</span>
                  <span className="text-brand-400 font-bold">${Number(plan.price).toFixed(0)} Total</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSubscribe()}
            disabled={isSubscribing || profile.isSubscribed}
            className="w-full bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 text-white font-bold py-3 rounded-2xl shadow-lg shadow-brand-500/25 transition-all text-xs flex items-center justify-center gap-2"
          >
            <span>{profile.isSubscribed ? 'Active VIP Member' : 'Subscribe Now'}</span>
          </button>
        </div>
      </div>

      {/* Expandable Promotional Banner Bar (Matches Screenshot) */}
      <div className="bg-dark-card border border-brand-500/40 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl shadow-brand-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-editorial text-sm sm:text-base font-bold text-white">My Subscription Plans</h3>
              <span className="text-[10px] bg-brand-500/20 text-brand-400 px-2 py-0.2 rounded-full font-bold">50% OFF</span>
            </div>
            <p className="text-xs text-slate-400">50% OFF + VIDEO GIFT • Just For This Week</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSubscribe()}
            className="px-6 py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md shadow-brand-500/30 transition-all flex items-center gap-1.5"
          >
            <span>${Number(profile.creatorMonthlyPrice || 10).toFixed(0)} Per/Month</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Segmented Filter Pills (Matches Screenshot) */}
      <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
        <div className="bg-dark-card border border-dark-border rounded-full p-1 flex items-center gap-1">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'timeline'
                ? 'bg-dark-bg text-white shadow-sm border border-dark-border'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5 text-brand-500" />
            <span>{posts.length || 1980} Timeline</span>
          </button>

          <button
            onClick={() => setActiveTab('media')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'media'
                ? 'bg-dark-bg text-white shadow-sm border border-dark-border'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>2654 Media</span>
          </button>

          <button
            onClick={() => setActiveTab('videos')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'videos'
                ? 'bg-dark-bg text-white shadow-sm border border-dark-border'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5 text-slate-400" />
            <span>Videos</span>
          </button>

          <button
            onClick={() => setActiveTab('shop')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all ${
              activeTab === 'shop'
                ? 'bg-dark-bg text-white shadow-sm border border-dark-border'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-slate-400" />
            <span>Store</span>
          </button>
        </div>
      </div>

      {/* Creator Posts Feed */}
      <div className="max-w-2xl mx-auto space-y-6 pt-2">
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-dark-card border border-dark-border rounded-3xl p-8 space-y-3">
            <Sparkles className="w-8 h-8 text-brand-500 mx-auto opacity-70" />
            <h3 className="font-editorial text-lg font-bold text-white">No Posts Yet</h3>
            <p className="text-xs text-slate-400">Subscribe to get notified as soon as new exclusive sets are posted.</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={{ ...post, user: profile }} />
          ))
        )}
      </div>
    </div>
  );
}
