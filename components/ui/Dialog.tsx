'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const dialogVariants = cva('fixed inset-0 z-50 flex items-center justify-center p-4', {
  variants: {
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
      full: 'p-0',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const dialogContentVariants = cva(
  'relative bg-background rounded-lg shadow-lg border border-border max-h-[90vh] overflow-hidden flex flex-col',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive/20',
        success: 'border-green-500/20',
        warning: 'border-yellow-500/20',
        info: 'border-blue-500/20',
      },
      size: {
        sm: 'max-w-[calc(100%-2rem)] sm:max-w-md w-full',
        md: 'max-w-[calc(100%-2rem)] sm:max-w-lg w-full',
        lg: 'max-w-[calc(100%-2rem)] sm:max-w-2xl w-full',
        xl: 'max-w-[calc(100%-2rem)] sm:max-w-4xl w-full',
        full: 'w-full h-full max-w-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface DialogProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'>,
    VariantProps<typeof dialogVariants>,
    VariantProps<typeof dialogContentVariants> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
}

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      className,
      size,
      variant,
      open = false,
      onOpenChange,
      title,
      description,
      children,
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      icon,
      footer,
      ...props
    },
    ref,
  ) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleClose = () => {
      onOpenChange?.(false);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnOverlayClick) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        handleClose();
      }
    };

    useEffect(() => {
      if (open && closeOnEscape) {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
        };
      }
    }, [open, closeOnEscape]);

    // Prevent body scroll when dialog is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = 'unset';
        };
      }
    }, [open]);

    const getVariantIcon = () => {
      if (icon) return icon;

      switch (variant) {
        case 'destructive':
          return <AlertTriangle className="text-destructive h-5 w-5" />;
        case 'success':
          return <CheckCircle className="h-5 w-5 text-green-500" />;
        case 'warning':
          return <AlertCircle className="h-5 w-5 text-yellow-500" />;
        case 'info':
          return <Info className="h-5 w-5 text-blue-500" />;
        default:
          return null;
      }
    };

    if (!mounted || !open) return null;

    const dialogContent = (
      <div
        className={cn(dialogVariants({ size }), className)}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'dialog-title' : undefined}
        aria-describedby={description ? 'dialog-description' : undefined}
        {...props}
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        {/* Dialog Content */}
        <div ref={ref} className={cn(dialogContentVariants({ variant, size }), 'relative z-10')}>
          {/* Header */}
          {(title || description || showCloseButton) && (
            <div className="border-border flex items-start justify-between border-b p-4 sm:p-6 gap-3">
              <div className="flex items-start space-x-3">
                {getVariantIcon()}
                <div className="min-w-0 flex-1">
                  {title && (
                    <h2 id="dialog-title" className="text-foreground mb-1 text-base sm:text-lg font-semibold leading-tight">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="dialog-description" className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {showCloseButton && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="ring-offset-background focus:ring-ring flex-shrink-0 rounded-sm p-1 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none cursor-pointer"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          {children && <div className="flex-1 overflow-auto p-4 sm:p-6">{children}</div>}

          {/* Footer */}
          {footer && <div className="border-border border-t p-4 sm:p-6">{footer}</div>}
        </div>
      </div>
    );

    return createPortal(dialogContent, document.body);
  },
);

Dialog.displayName = 'Dialog';

// Dialog components for composition
export interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)}
      {...props}
    />
  ),
);
DialogHeader.displayName = 'DialogHeader';

export interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  ),
);
DialogTitle.displayName = 'DialogTitle';

export interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-muted-foreground text-sm', className)} {...props} />
  ),
);
DialogDescription.displayName = 'DialogDescription';

export interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 overflow-auto', className)} {...props} />
  ),
);
DialogContent.displayName = 'DialogContent';

export interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const DialogFooter = forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2',
        className,
      )}
      {...props}
    />
  ),
);
DialogFooter.displayName = 'DialogFooter';

// Simple dialog variants for common use cases
export interface AlertDialogProps extends Omit<DialogProps, 'children'> {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const AlertDialog = ({
  message,
  confirmText = 'OK',
  cancelText,
  onConfirm,
  onCancel,
  variant = 'default',
  ...props
}: AlertDialogProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    props.onOpenChange?.(false);
  };

  const handleCancel = () => {
    onCancel?.();
    props.onOpenChange?.(false);
  };

  return (
    <Dialog
      {...props}
      variant={variant}
      footer={
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          {cancelText && (
            <button
              type="button"
              onClick={handleCancel}
              className="text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground focus:ring-ring rounded-md border bg-transparent px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={handleConfirm}
            className={cn(
              'focus:ring-ring rounded-md px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none cursor-pointer w-full sm:w-auto',
              variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : variant === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      <p className="text-sm">{message}</p>
    </Dialog>
  );
};

export interface ConfirmDialogProps extends Omit<DialogProps, 'children'> {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmDialog = ({
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'default',
  ...props
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm?.();
    props.onOpenChange?.(false);
  };

  const handleCancel = () => {
    onCancel?.();
    props.onOpenChange?.(false);
  };

  return (
    <Dialog
      {...props}
      variant={variant}
      footer={
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:space-x-2 sm:space-y-0">
          <button
            type="button"
            onClick={handleCancel}
            className="text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground focus:ring-ring rounded-md border bg-transparent px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none cursor-pointer w-full sm:w-auto"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={cn(
              'focus:ring-ring rounded-md px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:outline-none cursor-pointer w-full sm:w-auto',
              variant === 'destructive'
                ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                : variant === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90',
            )}
          >
            {confirmText}
          </button>
        </div>
      }
    >
      <p className="text-sm">{message}</p>
    </Dialog>
  );
};

export {
  AlertDialog,
  ConfirmDialog,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  dialogContentVariants,
  dialogVariants,
};
