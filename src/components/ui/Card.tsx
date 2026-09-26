'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md';
}

const PADDING_STYLES: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-3.5 sm:p-5',
  md: 'p-5 sm:p-6',
};

export const Card: React.FC<CardProps> = ({ padding = 'md', className = '', children, ...rest }) => {
  return (
    <div
      className={`bg-dark-card border border-dark-border rounded-3xl shadow-2xl ${PADDING_STYLES[padding]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
