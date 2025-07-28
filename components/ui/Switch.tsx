'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef, useId } from 'react';

const switchVariants = cva(
  'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
        error: 'data-[state=checked]:bg-destructive data-[state=unchecked]:bg-input',
        success: 'data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-input',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

const switchThumbVariants = cva(
  'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
);

export interface SwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof switchVariants> {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  customColor?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      variant,
      label,
      description,
      error,
      helperText,
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
    const switchId = id || generatedId;
    const hasError = !!error;
    const effectiveVariant = hasError ? 'error' : variant;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
      onCheckedChange?.(e.target.checked);
    };

    const switchStyle = customColor
      ? {
          backgroundColor: checked ? customColor : 'hsl(var(--input))',
        }
      : {};

    return (
      <div className="space-y-1">
        <div className="flex items-center space-x-2">
          <div className="relative inline-flex h-4">
            <input
              type="checkbox"
              id={switchId}
              className="peer absolute inset-0 cursor-pointer opacity-0"
              ref={ref}
              checked={checked}
              disabled={disabled}
              onChange={handleChange}
              {...props}
            />
            <div
              className={cn(
                switchVariants({ variant: customColor ? undefined : effectiveVariant }),
                customColor && 'border-transparent',
                className,
              )}
              style={switchStyle}
              data-state={checked ? 'checked' : 'unchecked'}
            >
              <div
                className={cn(switchThumbVariants())}
                data-state={checked ? 'checked' : 'unchecked'}
              />
            </div>
          </div>

          {(label || description) && (
            <div className="space-y-0.5">
              {label && (
                <label
                  htmlFor={switchId}
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
                  htmlFor={switchId}
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
          <p className={cn('ml-11 text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Switch.displayName = 'Switch';

export { Switch, switchVariants };
