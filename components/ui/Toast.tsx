'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { createContext, forwardRef, useCallback, useContext, useState } from 'react';

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        success:
          'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-50',
        error:
          'border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-50',
        warning:
          'border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-50',
        info: 'border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
  action?: React.ReactNode;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant, title, description, onClose, action, ...props }, ref) => {
    const getIcon = () => {
      switch (variant) {
        case 'success':
          return <CheckCircle className="h-5 w-5 text-green-600" />;
        case 'error':
          return <AlertCircle className="h-5 w-5 text-red-600" />;
        case 'warning':
          return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
        case 'info':
          return <Info className="h-5 w-5 text-blue-600" />;
        default:
          return null;
      }
    };

    return (
      <div ref={ref} className={cn(toastVariants({ variant }), className)} {...props}>
        <div className="flex items-start space-x-3">
          {getIcon()}
          <div className="mt-[-1px] flex-1 space-y-1">
            {title && <div className="text-sm font-semibold">{title}</div>}
            {description && <div className="text-sm opacity-90">{description}</div>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {action}
          {onClose && (
            <button
              onClick={onClose}
              className="focus:ring-ring inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border-transparent opacity-50 hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  },
);

Toast.displayName = 'Toast';

// Toast Types
export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastType;
  duration?: number;
  action?: React.ReactNode;
}

// Toast Context
interface ToastContextType {
  toasts: ToastData[];
  addToast: (toast: Omit<ToastData, 'id'>) => void;
  removeToast: (id: string) => void;
  toast: {
    success: (title: string, description?: string, options?: Partial<ToastData>) => void;
    error: (title: string, description?: string, options?: Partial<ToastData>) => void;
    warning: (title: string, description?: string, options?: Partial<ToastData>) => void;
    info: (title: string, description?: string, options?: Partial<ToastData>) => void;
    default: (title: string, description?: string, options?: Partial<ToastData>) => void;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove toast after duration
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const createToastFn = useCallback(
    (variant: ToastType) => (title: string, description?: string, options?: Partial<ToastData>) => {
      addToast({
        title,
        description,
        variant,
        ...options,
      });
    },
    [addToast],
  );

  const toast = {
    success: createToastFn('success'),
    error: createToastFn('error'),
    warning: createToastFn('warning'),
    info: createToastFn('info'),
    default: createToastFn('default'),
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Container
const ToastContainer = ({
  toasts,
  onRemove,
}: {
  toasts: ToastData[];
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex max-h-screen w-full flex-col-reverse gap-3 sm:top-auto sm:right-4 sm:bottom-4 sm:max-w-sm sm:flex-col sm:gap-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          title={toast.title}
          description={toast.description}
          action={toast.action}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

// Toast Hook
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export { Toast, toastVariants };
