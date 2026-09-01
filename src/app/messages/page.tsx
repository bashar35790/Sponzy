'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Paperclip,
  Smile,
  Sparkles,
} from 'lucide-react';

export default function MessagesPage() {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      lastMessageAt: '12:34 PM',
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
      lastMessageAt: '11:15 AM',
      isRead: false,
    },
  ]);

  const [activeConv, setActiveConv] = useState<any>(conversations[0]);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      id: 'm1',
      senderId: '1',
      body: 'Hey! Thanks so much for supporting my VIP page ❤️',
      price: 0,
      isLocked: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'm2',
      senderId: '1',
      body: 'I sent you an exclusive private 4K photo session from yesterday:',
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showMobileChat]);

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

    setMessages((prev) => [...prev, newMsg]);
    setInputMsg('');
  };

  const selectConversation = (conv: any) => {
    setActiveConv(conv);
    setShowMobileChat(true);
  };

  return (
    <div className="max-w-6xl mx-auto pb-20 px-1 sm:px-0">
      <div className="bg-dark-card border border-dark-border rounded-3xl h-[calc(100vh-130px)] min-h-[560px] max-h-[850px] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12">
        {/* Left Conversations Sidebar (4 cols on desktop, full width on mobile) */}
        <div
          className={`md:col-span-4 border-r border-dark-border flex flex-col h-full bg-dark-card/90 ${
            showMobileChat ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Top Search & Header Bar */}
          <div className="h-18 px-4 py-3.5 border-b border-dark-border flex flex-col justify-center shrink-0">
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full bg-dark-bg border border-dark-border rounded-full pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Conversations List */}
          <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-dark-border/40 scrollbar-none">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv)}
                className={`w-full text-left px-4 py-3.5 flex items-center gap-3.5 transition-all ${
                  activeConv?.id === conv.id
                    ? 'bg-gradient-to-r from-brand-600/15 via-brand-500/10 to-transparent border-l-4 border-brand-500'
                    : 'hover:bg-dark-hover/70'
                }`}
              >
                <div className="w-11 h-11 rounded-full overflow-hidden border border-brand-500/40 shrink-0 shadow-sm">
                  <img src={conv.partner.avatar} alt={conv.partner.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-slate-100 truncate">{conv.partner.name}</p>
                    <span className="text-[10px] text-slate-500">{conv.lastMessageAt}</span>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{conv.lastMessage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Chat Pane (8 cols on desktop, full width on mobile) */}
        <div
          className={`md:col-span-8 flex flex-col h-full bg-dark-bg/60 ${
            showMobileChat ? 'flex' : 'hidden md:flex'
          }`}
        >
          {/* Aligned Top Header */}
          <div className="h-18 px-4 sm:px-6 border-b border-dark-border flex items-center justify-between bg-dark-card/95 shrink-0 z-10">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setShowMobileChat(false)}
                className="md:hidden p-1.5 rounded-full hover:bg-dark-hover text-slate-400 hover:text-white shrink-0"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-500/60 shrink-0 shadow-sm">
                <img src={activeConv?.partner.avatar} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-xs sm:text-sm font-bold text-white truncate">{activeConv?.partner.name}</h2>
                  {activeConv?.partner.isVerified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 fill-brand-500 text-white shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 truncate">@{activeConv?.partner.username}</p>
              </div>
            </div>

            <button
              onClick={() => alert('Tip sent to creator!')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-500/15 hover:bg-brand-500 text-brand-400 hover:text-white font-bold text-xs border border-brand-500/30 transition-all shadow-sm shrink-0"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Send Tip</span>
            </button>
          </div>

          {/* Messages Stream with Perfectly Sized Responsive Bubbles */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-3.5">
            {messages.map((m) => {
              const isMine = m.senderId === user?.id || m.senderId === 'me';
              const formattedTime = new Date(m.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  {/* Sent Message Bubble (Hugs Content Naturally) */}
                  {isMine ? (
                    <div className="max-w-[85%] sm:max-w-[70%] bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 text-white rounded-2xl rounded-tr-xs px-3.5 py-2 shadow-lg shadow-brand-500/15">
                      <div className="flex flex-wrap items-baseline justify-end gap-x-2.5 gap-y-0.5">
                        <span className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
                          {m.body}
                        </span>
                        <span className="text-[9px] text-white/80 font-semibold shrink-0 select-none">
                          {formattedTime}
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Received Message Bubble */
                    <div className="max-w-[85%] sm:max-w-[70%] bg-dark-card border border-dark-border text-slate-100 rounded-2xl rounded-tl-xs px-4 py-3 shadow-md space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <span className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-200 font-normal">
                          {m.body}
                        </span>
                        <span className="text-[9px] text-slate-500 font-semibold shrink-0 select-none ml-auto">
                          {formattedTime}
                        </span>
                      </div>

                      {/* Locked Media PPV Bubble */}
                      {m.isLocked && (
                        <div className="relative rounded-2xl overflow-hidden aspect-video bg-black/60 flex items-center justify-center border border-white/10 mt-2">
                          <img
                            src={
                              m.media?.[0]?.url ||
                              'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80'
                            }
                            alt=""
                            className="w-full h-full object-cover filter blur-md"
                          />
                          <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center p-3 text-center space-y-2">
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
                    </div>
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Guaranteed Visible Message Input Bar */}
          <div className="p-3 sm:p-4 border-t border-dark-border bg-dark-card/95 shrink-0 z-10">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Photo attachment modal opened!')}
                className="p-2 rounded-full text-slate-400 hover:text-brand-400 hover:bg-dark-bg transition-colors shrink-0"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 bg-dark-bg border border-dark-border rounded-full px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all shadow-inner"
              />

              <button
                type="submit"
                disabled={!inputMsg.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 disabled:opacity-40 text-white flex items-center justify-center shadow-lg shadow-brand-500/25 transition-all shrink-0 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
