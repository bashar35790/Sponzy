'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, message, action }) => {
  return (
    <div className="bg-dark-card border border-dark-border rounded-3xl p-12 text-center space-y-3">
      <div className="flex justify-center">{icon || <Sparkles className="w-6 h-6 text-brand-500" />}</div>
      <p className="text-sm font-bold text-white">{title}</p>
      {message && <p className="text-xs text-slate-400">{message}</p>}
      {action && <div className="pt-1">{action}</div>}
    </div>
  );
};
