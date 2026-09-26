'use client';

import React from 'react';

type BadgeVariant = 'brand' | 'amber' | 'purple' | 'green' | 'gray';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  brand: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
  amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
  purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
  green: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  gray: 'bg-dark-bg text-slate-400 border-dark-border',
};

export const Badge: React.FC<BadgeProps> = ({ variant = 'brand', className = '', children, ...rest }) => {
  return (
    <span
      className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-full border ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
};
