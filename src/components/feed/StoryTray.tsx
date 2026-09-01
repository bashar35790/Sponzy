'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Flame } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface StoryTrayProps {
  stories?: Array<{
    id: string;
    mediaUrl: string;
    user: {
      id: string;
      name: string;
      username: string;
      avatar?: string;
    };
  }>;
  onOpenCreateStory?: () => void;
}

export const StoryTray: React.FC<StoryTrayProps> = ({ stories = [], onOpenCreateStory }) => {
  const { user } = useAuth();

  // Fallback demo stories if none currently created
  const displayStories = stories.length > 0 ? stories : [
    {
      id: 's1',
      mediaUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      user: { id: 'u1', name: 'Elena Ray', username: 'elenaray', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' }
    },
    {
      id: 's2',
      mediaUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      user: { id: 'u2', name: 'Alex Rivera', username: 'alexrivera', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' }
    },
    {
      id: 's3',
      mediaUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      user: { id: 'u3', name: 'Mia Chen', username: 'miachen', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' }
    },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
      {/* Create Story Button */}
      <button
        onClick={onOpenCreateStory}
        className="flex flex-col items-center gap-1.5 shrink-0 group"
      >
        <div className="w-16 h-16 rounded-full bg-dark-card border border-dark-border p-1 relative flex items-center justify-center group-hover:border-brand-500 transition-colors shadow-md">
          <div className="w-full h-full rounded-full bg-dark-bg overflow-hidden flex items-center justify-center">
            {user?.avatar ? (
              <img src={user.avatar} alt="You" className="w-full h-full object-cover opacity-80" />
            ) : (
              <Flame className="w-6 h-6 text-brand-500" />
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-md shadow-brand-500/30">
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>
        <span className="text-[11px] font-semibold text-slate-300">Your Story</span>
      </button>

      {/* Creator Stories with Glowing Rings */}
      {displayStories.map((story) => (
        <Link
          key={story.id}
          href={`/${story.user.username}`}
          className="flex flex-col items-center gap-1.5 shrink-0 group"
        >
          <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-brand-600 via-amber-500 to-brand-400 group-hover:scale-105 transition-transform shadow-sm shadow-brand-500/20">
            <div className="w-full h-full rounded-full border-2 border-dark-bg overflow-hidden bg-dark-card">
              <img
                src={story.user.avatar || story.mediaUrl}
                alt={story.user.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-300 truncate max-w-[65px]">
            {story.user.name.split(' ')[0]}
          </span>
        </Link>
      ))}
    </div>
  );
};
