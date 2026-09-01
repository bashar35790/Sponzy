'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { ShoppingBag, Sparkles, Download, CheckCircle2, DollarSign, Flame, FileText, ArrowRight } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/shop/products');
        if (res.data?.products) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error('Failed to load shop products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handlePurchase = async (productId: string) => {
    try {
      setPurchasingId(productId);
      const res = await api.post(`/shop/products/${productId}/purchase`);
      if (res.data.success) {
        alert(res.data.message || 'Product unlocked! Download link generated.');
      }
    } catch (err: any) {
      alert(err.response?.data?.error || 'Purchase failed. Please check your wallet balance.');
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-600/20 via-amber-500/10 to-transparent border border-brand-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-400 text-xs font-bold">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Digital Marketplace</span>
          </div>
          <h1 className="font-editorial text-2xl sm:text-3xl font-black text-white">
            Creator Digital Goods & Vaults
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            Buy signature Lightroom presets, workout PDF blueprints, video masterclasses, and uncompressed photo sets.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 bg-dark-card border border-dark-border rounded-3xl animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-dark-card border border-dark-border rounded-3xl p-12 text-center text-slate-500 text-xs">
          No digital items currently listed for sale.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden shadow-2xl hover:border-brand-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 w-full bg-black/60 relative overflow-hidden">
                  <img
                    src={product.previewUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-dark-bg/90 backdrop-blur-md px-3 py-1 rounded-full border border-dark-border text-xs font-black text-brand-400">
                    ${Number(product.price).toFixed(2)}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={product.creator?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80'}
                      alt={product.creator?.name}
                      className="w-6 h-6 rounded-full object-cover border border-brand-500/40"
                    />
                    <span className="text-xs text-slate-400 font-semibold">{product.creator?.name}</span>
                  </div>

                  <h3 className="font-editorial text-base font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => handlePurchase(product.id)}
                  disabled={purchasingId === product.id}
                  className="w-full py-2.5 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{purchasingId === product.id ? 'Purchasing...' : `Buy & Download • $${Number(product.price).toFixed(2)}`}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
