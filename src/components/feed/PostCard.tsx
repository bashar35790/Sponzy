'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Lock,
  DollarSign,
  CheckCircle2,
  MoreHorizontal,
  Flame,
  Sparkles,
} from 'lucide-react';
import { api } from '@/lib/api';

interface PostCardProps {
  post: {
    id: string;
    user: {
      id: string;
      name: string;
      username: string;
      avatar?: string;
      isVerified?: boolean;
      role?: string;
    };
    description?: string | null;
    lockType: 'FREE' | 'SUBSCRIBERS_ONLY' | 'PAY_PER_VIEW';
    price?: number | string;
    isLocked?: boolean;
    isLiked?: boolean;
    isBookmarked?: boolean;
    likesCount?: number;
    commentsCount?: number;
    createdAt: string;
    media?: Array<{
      id: string;
      type: 'IMAGE' | 'VIDEO' | 'AUDIO';
      url: string;
      thumbnailUrl?: string;
      isBlurred?: boolean;
    }>;
  };
  onTipClick?: (creator: any) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onTipClick }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isBookmarked, setIsBookmarked] = useState(post.isBookmarked || false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleToggleLike = async () => {
    try {
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      await api.post(`/posts/${post.id}/like`);
    } catch {
      setIsLiked(isLiked);
    }
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleUnlockPost = async () => {
    try {
      setIsUnlocking(true);
      const res = await api.post(`/posts/${post.id}/unlock`);
      if (res.data.success) {
        alert('Post unlocked successfully!');
        window.location.reload();
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to unlock post. Please top up your wallet balance.');
    } finally {
      setIsUnlocking(false);
    }
  };

  const isSubOnly = post.lockType === 'SUBSCRIBERS_ONLY' && post.isLocked;
  const isPPV = post.lockType === 'PAY_PER_VIEW' && post.isLocked;

  return (
    <article className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-dark-border/90 mb-6">
      {/* Post Header */}
      <div className="p-4 sm:p-5 flex items-center justify-between">
        <Link href={`/${post.user.username}`} className="flex items-center gap-3.5 group">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-brand-500/40 group-hover:border-brand-500 transition-colors shadow-sm">
            <img
              src={post.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={post.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-brand-400 transition-colors">
              <span className="text-sm font-semibold">{post.user.name}</span>
              {post.user.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 fill-brand-500 text-white" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>@{post.user.username}</span>
              <span>•</span>
              <span className="text-[11px] text-slate-500">
                {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {onTipClick && (
            <button
              onClick={() => onTipClick(post.user)}
              className="flex items-center gap-1 bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 font-bold text-xs px-3 py-1.5 rounded-full border border-brand-500/25 transition-all shadow-sm"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Tip</span>
            </button>
          )}
          <button className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-dark-hover transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post Text Description */}
      {post.description && (
        <div className="px-4 sm:px-5 pb-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
          {post.description}
        </div>
      )}

      {/* Post Media Container */}
      {post.media && post.media.length > 0 && (
        <div className="relative w-full aspect-square sm:aspect-[4/3] bg-black/80 overflow-hidden flex items-center justify-center">
          {isSubOnly ? (
            <div className="absolute inset-0 bg-dark-bg/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-3xl bg-brand-500/20 text-brand-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-lg font-bold text-white">Subscribers-Only Content</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Subscribe to @{post.user.username} to instantly unlock this exclusive set and all VIP posts.
                </p>
              </div>
              <Link
                href={`/${post.user.username}`}
                className="bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
              >
                Subscribe to Unlock
              </Link>
            </div>
          ) : isPPV ? (
            <div className="absolute inset-0 bg-dark-bg/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <Lock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="font-editorial text-lg font-bold text-white">Pay-Per-View Content</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Unlock this high-resolution post for just ${Number(post.price || 5).toFixed(2)}.
                </p>
              </div>
              <button
                onClick={handleUnlockPost}
                disabled={isUnlocking}
                className="bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 text-white font-bold text-xs px-6 py-3 rounded-full shadow-lg shadow-brand-500/25 transition-all hover:scale-[1.02]"
              >
                <span>{isUnlocking ? 'Unlocking...' : `Unlock for $${Number(post.price || 5).toFixed(2)}`}</span>
              </button>
            </div>
          ) : post.media[0].type === 'VIDEO' ? (
            <video
              src={post.media[0].url}
              controls
              className="w-full h-full object-cover"
              poster={post.media[0].thumbnailUrl}
            />
          ) : (
            <img
              src={post.media[0].url}
              alt="Post Media"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>
      )}

      {/* Engagement Actions Row */}
      <div className="p-4 sm:p-5 flex items-center justify-between border-t border-dark-border/60">
        <div className="flex items-center gap-5">
          <button
            onClick={handleToggleLike}
            className={`flex items-center gap-1.5 text-xs font-bold transition-transform active:scale-125 ${
              isLiked ? 'text-brand-500' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-brand-500' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{post.commentsCount || 0}</span>
          </button>

          <button
            onClick={handleToggleBookmark}
            className={`text-slate-400 hover:text-white transition-colors ${
              isBookmarked ? 'text-brand-500 fill-brand-500' : ''
            }`}
          >
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Post link copied to clipboard!');
          }}
          className="text-slate-400 hover:text-white p-1 rounded-full transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>
    </article>
  );
};
