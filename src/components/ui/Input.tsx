'use client';

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, icon, error, id, className = '', ...rest }) => {
  const inputId = id || rest.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`w-full bg-dark-bg border rounded-2xl py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors ${
            icon ? 'pl-10 pr-4' : 'px-4'
          } ${error ? 'border-red-500/60' : 'border-dark-border'} ${className}`}
          {...rest}
        />
      </div>
      {error && <p className="text-[11px] font-semibold text-red-400">{error}</p>}
    </div>
  );
};
