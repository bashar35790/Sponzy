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
      // rollback on error
      setIsLiked(isLiked);
      setLikesCount(likesCount);
    }
  };

  const handleUnlockPPV = async () => {
    try {
      setIsUnlocking(true);
      const res = await api.post(`/posts/${post.id}/unlock`);
      if (res.data.success) {
        window.location.reload();
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to unlock post');
    } finally {
      setIsUnlocking(false);
    }
  };

  return (
    <article className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-xl shadow-black/40 mb-6">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <Link href={`/${post.user.username}`} className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full overflow-hidden border border-dark-border group-hover:border-pink-500 transition-colors">
            <img
              src={post.user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
              alt={post.user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold text-white group-hover:text-pink-400 transition-colors">
              <span>{post.user.name}</span>
              {post.user.isVerified && <CheckCircle2 className="w-4 h-4 text-brand-500 fill-brand-500/20" />}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>@{post.user.username}</span>
              <span className="text-[10px] text-pink-400 font-bold bg-brand-500/10 px-1.5 py-0.2 rounded-full border border-brand-500/20">
                Creator
              </span>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {onTipClick && (
            <button
              onClick={() => onTipClick(post.user)}
              className="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-semibold text-xs px-3 py-1.5 rounded-full border border-emerald-500/20 transition-colors"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Tip</span>
            </button>
          )}
          <button className="text-slate-400 hover:text-white p-1">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post Text Description */}
      {post.description && (
        <div className="px-4 pb-3 text-sm text-slate-200 leading-relaxed">
          {post.description}
        </div>
      )}

      {/* Post Media / Locked Content Overlay */}
      {post.media && post.media.length > 0 && (
        <div className="relative w-full aspect-square sm:aspect-[4/3] bg-black/60 overflow-hidden flex items-center justify-center">
          {post.isLocked ? (
            <div className="relative w-full h-full">
              {/* Blurred backdrop image */}
              <img
                src={post.media[0].url}
                alt="Locked Content"
                className="w-full h-full object-cover blur-2xl scale-110 opacity-40"
              />
              <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-brand-600/20 to-pink-500/20 border border-brand-500/30 flex items-center justify-center text-pink-400 mb-4 shadow-lg shadow-pink-500/10">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white mb-1">
                  {post.lockType === 'PAY_PER_VIEW' ? 'Premium Pay-Per-View Content' : 'Subscribers Only Content'}
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mb-5">
                  {post.lockType === 'PAY_PER_VIEW'
                    ? `Unlock full high-definition media from @${post.user.username} for $${Number(post.price).toFixed(2)}.`
                    : `Subscribe to @${post.user.username}'s page to access this exclusive post and full feed.`}
                </p>

                {post.lockType === 'PAY_PER_VIEW' ? (
                  <button
                    onClick={handleUnlockPPV}
                    disabled={isUnlocking}
                    className="bg-gradient-to-r from-brand-600 to-pink-500 hover:from-brand-500 hover:to-pink-400 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-pink-500/25 transition-all text-sm"
                  >
                    {isUnlocking ? 'Unlocking...' : `Unlock for $${Number(post.price).toFixed(2)}`}
                  </button>
                ) : (
                  <Link
                    href={`/${post.user.username}`}
                    className="bg-gradient-to-r from-brand-600 to-pink-500 hover:from-brand-500 hover:to-pink-400 text-white font-bold px-6 py-2.5 rounded-full shadow-lg shadow-pink-500/25 transition-all text-sm"
                  >
                    Subscribe to Unlock
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <img
              src={post.media[0].url}
              alt="Post Media"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}

      {/* Post Actions Footer */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button
            onClick={handleToggleLike}
            className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              isLiked ? 'text-pink-500' : 'text-slate-400 hover:text-pink-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-pink-500 text-pink-500' : ''}`} />
            <span>{likesCount}</span>
          </button>

          <button className="flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-slate-200 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{post.commentsCount || 0}</span>
          </button>

          <button className="text-slate-400 hover:text-slate-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`text-slate-400 hover:text-white transition-colors ${isBookmarked ? 'text-brand-500 fill-brand-500' : ''}`}
        >
          <Bookmark className="w-5 h-5" />
        </button>
      </div>
    </article>
  );
};
