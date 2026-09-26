'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry, retryLabel = 'Try Again' }) => {
  if (!message) return null;
  return (
    <div role="alert" className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold space-y-2">
      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
        <p className="flex-1 leading-relaxed">{message}</p>
      </div>
      {onRetry && (
        <Button variant="danger" onClick={onRetry} className="w-full">
          {retryLabel}
        </Button>
      )}
    </div>
  );
};
