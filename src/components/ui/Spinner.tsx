'use client';

import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const SIZE_STYLES: Record<NonNullable<SpinnerProps['size']>, string> = {
  sm: 'w-3.5 h-3.5 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-[3px]',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', label = 'Loading...' }) => {
  return (
    <span role="status" aria-label={label} className="inline-flex items-center justify-center">
      <span className={`rounded-full border-brand-500 border-t-transparent animate-spin ${SIZE_STYLES[size]}`} />
    </span>
  );
};
