'use client';

import React from 'react';
import { Spinner } from './Spinner';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonShape = 'pill' | 'card';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  loading?: boolean;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 hover:from-brand-500 hover:to-amber-400 text-white shadow-md shadow-brand-500/25',
  secondary:
    'bg-dark-bg border border-dark-border text-slate-200 hover:text-white hover:border-brand-500/50 hover:bg-dark-hover',
  danger:
    'bg-red-500/10 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/20',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  shape = 'pill',
  loading = false,
  disabled,
  className = '',
  children,
  ...rest
}) => {
  const shapeStyle = shape === 'pill' ? 'rounded-full' : 'rounded-2xl';
  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold transition-all hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100 ${shapeStyle} ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
};
