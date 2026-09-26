'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export type ToastKind = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
}

interface ToastContextType {
  notify: (kind: ToastKind, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  notify: () => {},
  success: () => {},
  error: () => {},
  info: () => {},
});

const KIND_STYLES: Record<ToastKind, { icon: typeof Info; ring: string; iconColor: string }> = {
  success: { icon: CheckCircle2, ring: 'border-emerald-500/30', iconColor: 'text-emerald-400' },
  error: { icon: AlertCircle, ring: 'border-red-500/30', iconColor: 'text-red-400' },
  info: { icon: Info, ring: 'border-brand-500/30', iconColor: 'text-brand-400' },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (kind: ToastKind, message: string) => {
      idRef.current += 1;
      const id = idRef.current;
      setToasts((prev) => [...prev.slice(-2), { id, kind, message }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const value = React.useMemo(
    () => ({
      notify,
      success: (message: string) => notify('success', message),
      error: (message: string) => notify('error', message),
      info: (message: string) => notify('info', message),
    }),
    [notify]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast viewport sits above the mobile nav */}
      <div aria-live="polite" className="fixed bottom-20 lg:bottom-6 right-4 z-[60] w-[calc(100%-2rem)] max-w-sm space-y-2">
        {toasts.map((toast) => {
          const style = KIND_STYLES[toast.kind];
          const Icon = style.icon;
          return (
            <div
              key={toast.id}
              role="status"
              className={`flex items-start gap-2.5 rounded-2xl bg-dark-card border ${style.ring} px-4 py-3 shadow-2xl`}
            >
              <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${style.iconColor}`} />
              <p className="flex-1 text-xs font-semibold text-slate-100 leading-relaxed">{toast.message}</p>
              <button
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="text-slate-500 hover:text-white transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
