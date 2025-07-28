'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Check, Minus } from 'lucide-react';
import { forwardRef, useId } from 'react';

const checkboxVariants = cva(
  'peer h-4 w-4 shrink-0 rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  {
    variants: {
      variant: {
        default:
          'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary',
        error:
          'border-destructive focus-visible:ring-destructive data-[state=checked]:bg-destructive data-[state=checked]:text-destructive-foreground data-[state=checked]:border-destructive',
        success:
          'border-green-500 focus-visible:ring-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:text-white data-[state=checked]:border-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
  required?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  customColor?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      variant,
      label,
      description,
      error,
      helperText,
      indeterminate,
      required,
      checked,
      disabled,
      onChange,
      onCheckedChange,
      customColor,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const checkboxId = id || generatedId;
    const hasError = !!error;
    const effectiveVariant = hasError ? 'error' : variant;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    const checkboxStyle = customColor
      ? {
          borderColor: customColor,
          backgroundColor: checked || indeterminate ? customColor : 'transparent',
        }
      : {};

    return (
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className="relative inline-flex h-[13.5px]">
            <input
              type="checkbox"
              id={checkboxId}
              className={cn(
                'peer absolute inset-0 cursor-pointer opacity-0',
                disabled && 'cursor-not-allowed',
              )}
              ref={ref}
              checked={checked}
              disabled={disabled}
              onChange={handleChange}
              {...props}
            />
            <div
              className={cn(
                checkboxVariants({ variant: customColor ? undefined : effectiveVariant }),
                'flex items-center justify-center transition-colors',
                !customColor && checked && 'border-current bg-current',
                !customColor && indeterminate && 'border-current bg-current',
                customColor && 'border-2',
                className,
              )}
              style={checkboxStyle}
              data-state={indeterminate ? 'indeterminate' : checked ? 'checked' : 'unchecked'}
            >
              {checked && !indeterminate && (
                <Check className="h-3 w-3 text-white" strokeWidth={3} />
              )}
              {indeterminate && <Minus className="h-3 w-3 text-white" strokeWidth={3} />}
            </div>
          </div>

          {(label || description) && (
            <div className="space-y-0.5">
              {label && (
                <label
                  htmlFor={checkboxId}
                  className={cn(
                    'cursor-pointer text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                    disabled && 'cursor-not-allowed opacity-70',
                  )}
                >
                  {label}
                  {required && <span className="text-destructive ml-1">*</span>}
                </label>
              )}
              {description && (
                <label
                  htmlFor={checkboxId}
                  className={cn(
                    'text-muted-foreground block cursor-pointer text-xs',
                    disabled && 'cursor-not-allowed opacity-70',
                  )}
                >
                  {description}
                </label>
              )}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn('ml-6 text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox, checkboxVariants };
