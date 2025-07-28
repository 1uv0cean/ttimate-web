'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted resize-none',
  {
    variants: {
      size: {
        sm: 'min-h-[60px] px-2 py-1 text-xs',
        md: 'min-h-[80px] px-3 py-2 text-sm',
        lg: 'min-h-[120px] px-4 py-3 text-base',
      },
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
      resize: 'vertical',
    },
  }
);

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textareaVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  success?: boolean;
  maxLength?: number;
  showCount?: boolean;
  customColor?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size,
      variant,
      resize,
      label,
      error,
      helperText,
      required,
      success,
      maxLength,
      showCount = false,
      customColor,
      disabled,
      value,
      ...props
    },
    ref,
  ) => {
    const currentVariant = error ? 'error' : success ? 'success' : variant;
    const currentValue = String(value || '');
    const characterCount = currentValue.length;

    const textareaStyle = customColor ? {
      borderColor: customColor,
      '--tw-ring-color': customColor,
    } as React.CSSProperties : {};

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm leading-none font-medium">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <textarea
            className={cn(textareaVariants({ size, variant: currentVariant, resize }), className)}
            style={customColor ? textareaStyle : undefined}
            ref={ref}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            {...props}
          />
          
          {(showCount || maxLength) && (
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              {showCount && (
                <span className={cn(
                  maxLength && characterCount > maxLength * 0.8 && 'text-destructive'
                )}>
                  {characterCount}
                  {maxLength && `/${maxLength}`}
                </span>
              )}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="space-y-1">
            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-xs text-muted-foreground">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };