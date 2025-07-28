import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  {
    variants: {
      size: {
        sm: 'h-8 px-2 py-1',
        md: 'h-10 px-3 py-2',
        lg: 'h-12 px-4 py-3',
      },
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  clearable?: boolean;
  loading?: boolean;
  success?: boolean;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      size,
      variant,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      showPasswordToggle,
      clearable,
      loading,
      success,
      required,
      value,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState(value || '');

    const isPassword = type === 'password';
    const hasError = !!error;
    const hasSuccess = success && !hasError;
    const inputType = isPassword && showPassword ? 'text' : type;

    const effectiveVariant = hasError ? 'error' : hasSuccess ? 'success' : variant;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInternalValue(newValue);
      onChange?.(e);
    };

    const handleClear = () => {
      const event = {
        target: { value: '' },
        currentTarget: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      setInternalValue('');
      onChange?.(event);
    };

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const inputValue = value !== undefined ? value : internalValue;

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                'absolute top-1/2 left-3 -translate-y-1/2',
                disabled ? 'text-muted-foreground/50' : 'text-muted-foreground',
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            type={inputType}
            className={cn(
              inputVariants({ size, variant: effectiveVariant }),
              leftIcon && 'pl-10',
              (rightIcon || showPasswordToggle || clearable || hasError || hasSuccess) && 'pr-10',
              className,
            )}
            ref={ref}
            value={inputValue}
            onChange={handleChange}
            disabled={disabled || loading}
            {...props}
          />

          <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center space-x-1">
            {loading && (
              <div className="border-muted-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
            )}

            {!loading && hasError && <AlertCircle className="text-destructive h-4 w-4" />}

            {!loading && hasSuccess && <Check className="h-4 w-4 text-green-500" />}

            {!loading && clearable && inputValue && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground h-4 w-4 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            {!loading && showPasswordToggle && isPassword && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}

            {!loading &&
              rightIcon &&
              !showPasswordToggle &&
              !clearable &&
              !hasError &&
              !hasSuccess &&
              rightIcon}
          </div>
        </div>

        {(error || helperText) && (
          <p className={cn('text-xs', error ? 'text-destructive' : 'text-muted-foreground')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input, inputVariants };
