import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  maxWidth?: string;
};

export function Modal({ open, onClose, children, title, maxWidth = 'max-w-lg' }: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div className={`relative w-full ${maxWidth} animate-scale-in`}>
        <div className="glass rounded-3xl border border-canvas-200 shadow-2xl shadow-ink-900/20 p-6 sm:p-8">
          {title && (
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-semibold text-ink-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-canvas-100 transition-colors"
              >
                <X className="h-5 w-5 text-ink-600" />
              </button>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
