'use client';

import React, { useState } from 'react';
import { X, Image as ImageIcon, Lock, DollarSign, Globe, Users } from 'lucide-react';
import { api } from '@/lib/api';

export const CreatePostModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [description, setDescription] = useState('');
  const [lockType, setLockType] = useState<'FREE' | 'SUBSCRIBERS_ONLY' | 'PAY_PER_VIEW'>('FREE');
  const [price, setPrice] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post('/posts', {
        description,
        lockType,
        price: lockType === 'PAY_PER_VIEW' ? price : 0,
        media: mediaUrl ? [{ url: mediaUrl, type: 'IMAGE' }] : [],
      });
      window.location.reload();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-dark-card border border-dark-border rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-dark-border flex items-center justify-between">
          <h3 className="font-bold text-white text-lg">Create New Post</h3>
          <button onClick={onClose} className="p-1 rounded-full text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's new with you? Share updates, photos, or thoughts..."
            rows={4}
            className="w-full bg-dark-bg border border-dark-border rounded-2xl p-4 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
          />

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Media URL (Image or Video)</label>
            <input
              type="url"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-dark-bg border border-dark-border rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400">Post Visibility / Pricing</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLockType('FREE')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  lockType === 'FREE'
                    ? 'border-brand-500 bg-brand-500/10 text-pink-400'
                    : 'border-dark-border bg-dark-bg text-slate-400 hover:text-slate-200'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>Public / Free</span>
              </button>

              <button
                type="button"
                onClick={() => setLockType('SUBSCRIBERS_ONLY')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  lockType === 'SUBSCRIBERS_ONLY'
                    ? 'border-brand-500 bg-brand-500/10 text-pink-400'
                    : 'border-dark-border bg-dark-bg text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Subscribers</span>
              </button>

              <button
                type="button"
                onClick={() => setLockType('PAY_PER_VIEW')}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all ${
                  lockType === 'PAY_PER_VIEW'
                    ? 'border-brand-500 bg-brand-500/10 text-pink-400'
                    : 'border-dark-border bg-dark-bg text-slate-400 hover:text-slate-200'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Pay-Per-View</span>
              </button>
            </div>
          </div>

          {lockType === 'PAY_PER_VIEW' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400">Unlock Price ($ USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-emerald-400" />
                <input
                  type="number"
                  step="0.50"
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="4.99"
                  className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
                  required
                />
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-brand-600 to-pink-500 hover:from-brand-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-pink-500/25 transition-all"
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
