import React from 'react';

export interface Toast {
  id: number;
  type: "success" | "error";
  title: string;
  subtitle?: string;
  status?: string;
}

interface ToastNotificationProps {
  toasts: Toast[];
}

export default function ToastNotification({ toasts }: ToastNotificationProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 w-80 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto animate-[slideIn_0.3s_ease-out] border rounded-xl p-4 backdrop-blur-md shadow-2xl transition-all ${
            toast.type === "success"
              ? "bg-success-dark/80 border-success/30"
              : "bg-danger-dark/80 border-danger/30"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                toast.type === "success"
                  ? "bg-success text-black"
                  : "bg-danger text-black"
              }`}
            >
              {toast.type === "success" ? "✓" : "✕"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-days text-sm uppercase tracking-tight text-white truncate">
                {toast.title}
              </p>
              {toast.subtitle && (
                <p className="font-abel text-[10px] text-white/50 truncate">
                  {toast.subtitle}
                </p>
              )}
            </div>
            {toast.status && (
              <span
                className={`font-days text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full border shrink-0 ${
                  toast.status === "present"
                    ? "border-success/30 text-success"
                    : "border-warning/30 text-warning"
                }`}
              >
                {toast.status}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
