'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Radio, Users, Heart, MessageCircle, DollarSign, Send, CheckCircle2 } from 'lucide-react';

export default function LivePage() {
  const [messages, setMessages] = useState([
    { id: '1', user: 'Alex Rivera', comment: 'Welcome to the live stream everyone! 🔥' },
    { id: '2', user: 'Maya Lin', comment: 'Hello! Excited for the live workout session.' },
    { id: '3', user: 'John Doe', comment: 'Sent $10.00 Tip! Keep up the great work!' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([...messages, { id: Date.now().toString(), user: 'You', comment: inputMsg.trim() }]);
    setInputMsg('');
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            <span>LIVE NOW</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">VIP Live Broadcast</h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-dark-card border border-dark-border px-3 py-1.5 rounded-full">
          <Users className="w-4 h-4 text-emerald-400" />
          <span>248 Viewers</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[72vh]">
        {/* Live Stream Video Player */}
        <div className="lg:col-span-2 bg-black rounded-3xl overflow-hidden relative border border-dark-border flex items-center justify-center shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80"
            alt="Live Stream"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Alex Rivera"
                className="w-11 h-11 rounded-full border-2 border-brand-500 object-cover"
              />
              <div>
                <div className="flex items-center gap-1 font-bold text-white text-sm">
                  <span>Alex Rivera</span>
                  <CheckCircle2 className="w-4 h-4 text-brand-500" />
                </div>
                <p className="text-xs text-slate-300">Live Q&A and Core Training</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => alert('Tip sent!')}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg shadow-emerald-500/25 transition-all"
              >
                <DollarSign className="w-4 h-4" />
                <span>Send Live Tip</span>
              </button>

              <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-pink-400 hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 fill-pink-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Live Chat Panel */}
        <div className="bg-dark-card border border-dark-border rounded-3xl overflow-hidden flex flex-col shadow-2xl">
          <div className="p-4 border-b border-dark-border font-bold text-white text-sm flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-pink-500" />
            <span>Live Stream Chat</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="text-xs leading-relaxed bg-dark-bg/60 p-2.5 rounded-2xl border border-dark-border/50">
                <span className="font-bold text-pink-400 block mb-0.5">{m.user}</span>
                <span className="text-slate-200">{m.comment}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-dark-border flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Send a live message..."
              className="flex-1 bg-dark-bg border border-dark-border rounded-full px-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
