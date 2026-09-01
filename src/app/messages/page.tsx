'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Send, Image as ImageIcon, DollarSign, Lock, Search, CheckCircle2 } from 'lucide-react';

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

  const [text, setText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      senderId: user?.id || 'me',
      body: text.trim(),
      price: 0,
      isLocked: false,
      createdAt: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setText('');
  };

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto h-[calc(100vh-80px)] flex gap-4">
      {/* Conversations List */}
      <div className="w-full sm:w-80 shrink-0 bg-dark-card border border-dark-border rounded-3xl overflow-hidden flex flex-col shadow-xl">
        <div className="p-4 border-b border-dark-border">
          <h2 className="font-bold text-white text-lg mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-dark-bg border border-dark-border rounded-full pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-dark-border/50">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConv(conv)}
              className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-dark-hover transition-colors ${
                activeConv?.id === conv.id ? 'bg-brand-500/10 border-l-4 border-brand-500' : ''
              }`}
            >
              <img
                src={conv.partner.avatar}
                alt={conv.partner.name}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 font-bold text-white text-sm truncate">
                    <span>{conv.partner.name}</span>
                    {conv.partner.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />}
                  </div>
                </div>
                <p className="text-xs text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Conversation Box */}
      <div className="hidden sm:flex flex-1 bg-dark-card border border-dark-border rounded-3xl overflow-hidden flex-col shadow-xl">
        {/* Chat Header */}
        <div className="p-4 border-b border-dark-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeConv.partner.avatar}
              alt={activeConv.partner.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-white text-sm flex items-center gap-1">
                <span>{activeConv.partner.name}</span>
                {activeConv.partner.isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-brand-500" />}
              </h3>
              <p className="text-xs text-emerald-400 font-medium">Online now</p>
            </div>
          </div>

          <button className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/20">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Send Tip</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isMe = m.senderId === user?.id || m.senderId === 'me';
            return (
              <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-sm rounded-3xl p-4 shadow-lg ${
                    isMe
                      ? 'bg-gradient-to-r from-brand-600 to-pink-600 text-white rounded-br-none'
                      : 'bg-dark-bg border border-dark-border text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{m.body}</p>

                  {/* PPV Media Attachment */}
                  {m.media && (
                    <div className="mt-3 relative rounded-2xl overflow-hidden aspect-[4/3] bg-black/50 flex items-center justify-center">
                      <img
                        src={m.media[0].url}
                        alt="Media"
                        className="w-full h-full object-cover blur-xl opacity-40"
                      />
                      {m.isLocked && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black/40">
                          <Lock className="w-6 h-6 text-pink-400 mb-2" />
                          <button className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-2 rounded-full shadow-lg">
                            Unlock for ${Number(m.price).toFixed(2)}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-dark-border flex items-center gap-2">
          <button type="button" className="p-2 rounded-full text-slate-400 hover:text-white">
            <ImageIcon className="w-5 h-5" />
          </button>
          <button type="button" className="p-2 rounded-full text-slate-400 hover:text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-dark-bg border border-dark-border rounded-full px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-brand-500"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full bg-brand-600 hover:bg-brand-500 text-white flex items-center justify-center shadow-md shadow-pink-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
