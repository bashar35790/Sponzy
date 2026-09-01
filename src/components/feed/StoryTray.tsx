'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface StoryCreator {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  hasUnseen: boolean;
}

export const StoryTray = ({ stories }: { stories?: StoryCreator[] }) => {
  const { user } = useAuth();

  const dummyStories: StoryCreator[] = stories && stories.length > 0 ? stories : [
    {
      user: {
        id: '1',
        name: 'Elena Ray',
        username: 'elenaray',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
      hasUnseen: true,
    },
    {
      user: {
        id: '2',
        name: 'Alex Rivera',
        username: 'alexrivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      },
      hasUnseen: true,
    },
    {
      user: {
        id: '3',
        name: 'Maya Lin',
        username: 'mayalin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      },
      hasUnseen: false,
    },
    {
      user: {
        id: '4',
        name: 'Lucas Silva',
        username: 'lucassilva',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      },
      hasUnseen: false,
    },
  ];

  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none">
      {/* Create story item for current user */}
      <div className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
        <div className="relative w-16 h-16 rounded-full p-[2px] border border-dashed border-slate-600 group-hover:border-pink-500 transition-colors">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="My Story"
            className="w-full h-full rounded-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center border-2 border-dark-bg">
            <Plus className="w-3 h-3" />
          </div>
        </div>
        <span className="text-xs text-slate-300 font-medium">Your story</span>
      </div>

      {/* Stories list */}
      {dummyStories.map((item) => (
        <div key={item.user.id} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
          <div
            className={`w-16 h-16 rounded-full p-[2.5px] transition-transform group-hover:scale-105 ${
              item.hasUnseen
                ? 'bg-gradient-to-tr from-yellow-400 via-brand-500 to-purple-600'
                : 'bg-slate-700'
            }`}
          >
            <div className="w-full h-full rounded-full bg-dark-bg p-[2px]">
              <img
                src={item.user.avatar}
                alt={item.user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <span className="text-xs text-slate-300 font-medium truncate max-w-[68px]">
            {item.user.username}
          </span>
        </div>
      ))}
    </div>
  );
};
