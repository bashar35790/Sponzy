'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ShoppingBag, Download, CheckCircle2, Sparkles, Tag } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([
    {
      id: 'prod1',
      creator: {
        id: '1',
        name: 'Elena Ray',
        username: 'elenaray',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      name: 'Autumn Warmth Lightroom Presets (Desktop & Mobile)',
      description: 'Pack of 12 signature presets tailored for warm sunsets, golden hour portraits, and moody aesthetics.',
      price: 19.99,
      isPhysical: false,
      salesCount: 342,
      previewUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'prod2',
      creator: {
        id: '2',
        name: 'Alex Rivera',
        username: 'alexrivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      name: '12-Week Hypertrophy & Fat Loss Blueprint (PDF + Video Guides)',
      description: 'Comprehensive workout schedule, macro calculation formulas, and full exercise demonstration library.',
      price: 29.99,
      isPhysical: false,
      salesCount: 512,
      previewUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 'prod3',
      creator: {
        id: '3',
        name: 'Maya Lin',
        username: 'mayalin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      name: 'Anime Character Brush Set for Procreate & Photoshop',
      description: '25 custom ink pens, sketch pencils, shading airbrushes, and stamp textures for manga and anime artwork.',
      price: 12.50,
      isPhysical: false,
      salesCount: 890,
      previewUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
    },
  ]);

  return (
    <div className="p-4 lg:p-8 max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-indigo-900/40 border border-brand-500/20 p-8 sm:p-12 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 text-pink-300 font-semibold text-xs border border-brand-500/30">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Creator Storefront</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Digital Goods & Exclusive Items</h1>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Purchase digital art packs, Lightroom presets, workout blueprints, ebooks, and custom merchandise directly from creators.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-xl hover:border-slate-700 transition-all flex flex-col group"
          >
            {/* Preview Image */}
            <div className="aspect-[16/10] w-full bg-slate-800 relative overflow-hidden">
              <img
                src={item.previewUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-dark-bg/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-emerald-400 border border-dark-border">
                ${Number(item.price).toFixed(2)}
              </div>
            </div>

            {/* Product Info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <Link href={`/${item.creator.username}`} className="flex items-center gap-2 mb-3">
                  <img
                    src={item.creator.avatar}
                    alt={item.creator.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-300 hover:text-white">
                    {item.creator.name}
                  </span>
                  {item.creator.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />}
                </Link>

                <h3 className="font-bold text-white text-base leading-snug group-hover:text-pink-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-dark-border flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {item.salesCount} sold
                </span>

                <button
                  onClick={() => alert(`Purchasing ${item.name} for $${Number(item.price).toFixed(2)}`)}
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-md shadow-pink-500/20 transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Buy & Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
