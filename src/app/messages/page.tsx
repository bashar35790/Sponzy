'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import {
  Send,
  Image as ImageIcon,
  DollarSign,
  Lock,
  Search,
  CheckCircle2,
  ChevronLeft,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<any[]>([
    {
      id: 'c1',
      partner: {
        id: '1',
        name: 'Elena Ray',
        username: 'elenaray',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      lastMessage: 'Hey! Thanks for the sub, here is a preview from today’s set! ✨',
      lastMessageAt: new Date().toISOString(),
      isRead: true,
    },
    {
      id: 'c2',
      partner: {
        id: '2',
        name: 'Alex Rivera',
        username: 'alexrivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        isVerified: true,
      },
      lastMessage: 'Let me know if you need help with your workout schedule.',
      lastMessageAt: new Date().toISOString(),
      isRead: false,
    },
  ]);

  const [activeConv, setActiveConv] = useState<any>(conversations[0]);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'm1',
      senderId: '1',
      body: 'Hey! Thanks so much for supporting my page ❤️',
      price: 0,
      isLocked: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'm2',
      senderId: '1',
      body: 'I sent you an exclusive private 4K video session from yesterday:',
      price: 4.99,
      isLocked: true,
      media: [
        {
          id: 'med1',
          url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
          isBlurred: true,
        },
      ],
      createdAt: new Date().toISOString(),
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      senderId: user?.id || 'me',
      body: inputMsg.trim(),
      price: 0,
      isLocked: false,
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setInputMsg('');
  };

  const selectConversation = (conv: any) => {
    setActiveConv(conv);
    setShowMobileChat(true);
  };

  return (
    <div className="max-w-6xl mx-auto pb-16 h-[80vh]">
      <div className="bg-dark-card border border-dark-border rounded-3xl h-full overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
        {/* Left Conversations List */}
        <div
          className={`md:col-span-4 border-r border-dark-border flex flex-col h-full ${
            showMobileChat ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="p-4 border-b border-dark-border space-y-3">
            <h1 className="font-editorial text-xl font-bold text-white">Direct Messages</h1>
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-dark-bg border border-dark-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-dark-border/40 scrollbar-none">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv)}
                className={`w-full text-left p-3.5 flex items-center gap-3 transition-colors ${
                  activeConv?.id === conv.id
                    ? 'bg-brand-500/10 border-l-2 border-brand-500'
                    : 'hover:bg-dark-hover/70'
                }`}
              >
                <div className="w-11 h-11 rounded-full overflow-hidden border border-brand-500/40 shrink-0">
                  <img src={conv.partner.avatar} alt={conv.partner.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-bold text-slate-100 truncate">{conv.partner.name}</p>
                    <span className="text-[10px] text-slate-500">12:34 PM</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div
          className={`md:col-span-8 flex flex-col h-full bg-dark-bg/40 ${
            showMobileChat ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 px-4 sm:px-6 border-b border-dark-border flex items-center justify-between bg-dark-card/90">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileChat(false)}
                className="md:hidden p-1.5 rounded-full hover:bg-dark-hover text-slate-400 hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-500/50">
                <img src={activeConv?.partner.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h2 className="text-xs sm:text-sm font-bold text-white">{activeConv?.partner.name}</h2>
                  {activeConv?.partner.isVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 fill-brand-500 text-white" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400">@{activeConv?.partner.username}</p>
              </div>
            </div>

            <button
              onClick={() => alert('Tip modal opened!')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/15 hover:bg-brand-500 text-brand-400 hover:text-white font-bold text-xs border border-brand-500/25 transition-all shadow-sm"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Send Tip</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((m) => {
              const isMine = m.senderId === user?.id || m.senderId === 'me';
              return (
                <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs sm:max-w-md rounded-2xl p-3.5 space-y-2.5 text-xs shadow-md ${
                      isMine
                        ? 'bg-gradient-to-r from-brand-600 to-amber-500 text-white'
                        : 'bg-dark-card border border-dark-border text-slate-200'
                    }`}
                  >
                    <p className="leading-relaxed">{m.body}</p>

                    {/* Locked Media PPV Bubble */}
                    {m.isLocked && (
                      <div className="relative rounded-xl overflow-hidden aspect-video bg-black/60 flex items-center justify-center border border-white/10">
                        <img
                          src={m.media?.[0]?.url || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80'}
                          alt=""
                          className="w-full h-full object-cover filter blur-md"
                        />
                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-3 text-center space-y-2">
                          <Lock className="w-5 h-5 text-brand-400" />
                          <button
                            onClick={() => alert(`Unlocked for $${m.price}`)}
                            className="px-4 py-1.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-[11px] shadow-lg shadow-brand-500/30 transition-all"
                          >
                            Unlock for ${Number(m.price).toFixed(2)}
                          </button>
                        </div>
                      </div>
                    )}

                    <span className={`text-[10px] block text-right opacity-70`}>
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 border-t border-dark-border bg-dark-card/90 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Type a private message..."
              className="flex-1 bg-dark-bg border border-dark-border rounded-full px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/25 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
