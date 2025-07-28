'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { Check, Circle, Star, X } from 'lucide-react';
import { forwardRef, useId, useState } from 'react';
import { Typography } from './Typography';

const ratingVariants = cva('flex items-center gap-1', {
  variants: {
    size: {
      sm: 'gap-0.5',
      md: 'gap-1',
      lg: 'gap-1.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type RatingType = 'star' | 'numeric' | 'yesno' | 'scale';

export interface RatingScale {
  value: number;
  label: string;
  color?: string;
}

export interface RatingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof ratingVariants> {
  type?: RatingType;
  value?: number | boolean | null;
  max?: number;
  min?: number;
  step?: number; // Step size for numeric ratings (e.g., 0.5, 1)
  scales?: RatingScale[];
  disabled?: boolean;
  readOnly?: boolean;
  allowHalf?: boolean;
  showValue?: boolean;
  showLabels?: boolean;
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  onChange?: (value: number | boolean | null) => void;
  onHover?: (value: number | null) => void;
}

// Default scales for common inspection ratings
const defaultScales = {
  '0-2': [
    { value: 0, label: 'Not Observed', color: 'text-gray-400' },
    { value: 1, label: 'Poor', color: 'text-red-500' },
    { value: 2, label: 'Good', color: 'text-green-500' },
  ],
  '1-3': [
    { value: 1, label: 'Poor', color: 'text-red-500' },
    { value: 2, label: 'Fair', color: 'text-yellow-500' },
    { value: 3, label: 'Good', color: 'text-green-500' },
  ],
  '1-5': [
    { value: 1, label: 'Very Poor', color: 'text-red-600' },
    { value: 2, label: 'Poor', color: 'text-orange-500' },
    { value: 3, label: 'Fair', color: 'text-yellow-500' },
    { value: 4, label: 'Good', color: 'text-blue-500' },
    { value: 5, label: 'Excellent', color: 'text-green-500' },
  ],
};

const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      className,
      size,
      type = 'star',
      value,
      max = 5,
      min = 0,
      step = 1,
      scales,
      disabled = false,
      readOnly = false,
      allowHalf = false,
      showValue = false,
      showLabels = false,
      label,
      description,
      error,
      helperText,
      required = false,
      onChange,
      onHover,
      ...props
    },
    ref,
  ) => {
    const [hoveredValue, setHoveredValue] = useState<number | null>(null);
    const componentId = useId();

    // Get effective scales based on type and range
    const effectiveScales =
      scales ||
      (() => {
        if (type === 'scale') {
          const key = `${min}-${max}` as keyof typeof defaultScales;
          return defaultScales[key] || [];
        }
        return [];
      })();

    // Convert value to numeric for consistency
    const numericValue = typeof value === 'boolean' ? (value ? 1 : 0) : (value ?? null);
    const displayValue = hoveredValue ?? numericValue;

    const handleClick = (newValue: number | boolean) => {
      if (disabled || readOnly) return;
      onChange?.(newValue);
    };

    const handleMouseEnter = (newValue: number) => {
      if (disabled || readOnly) return;
      setHoveredValue(newValue);
      onHover?.(newValue);
    };

    const handleMouseLeave = () => {
      if (disabled || readOnly) return;
      setHoveredValue(null);
      onHover?.(null);
    };

    // Star Rating Component
    const renderStarRating = () => {
      const stars: React.ReactElement[] = [];
      for (let i = 1; i <= max; i++) {
        const isFilled = displayValue !== null && displayValue >= i;
        const isHalfFilled =
          allowHalf && displayValue !== null && displayValue >= i - 0.5 && displayValue < i;

        stars.push(
          <button
            key={i}
            type="button"
            disabled={disabled}
            className={cn(
              'focus:ring-ring relative rounded transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none',
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110',
              size === 'sm' && 'p-0.5',
              size === 'md' && 'p-1',
              size === 'lg' && 'p-1.5',
            )}
            onClick={() => handleClick(i)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            aria-label={`Rate ${i} out of ${max} stars`}
          >
            <Star
              className={cn(
                'transition-all duration-200',
                size === 'sm' && 'h-4 w-4',
                size === 'md' && 'h-5 w-5',
                size === 'lg' && 'h-6 w-6',
                isFilled || isHalfFilled
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-none text-gray-300 hover:text-yellow-400',
              )}
            />
            {isHalfFilled && (
              <Star
                className={cn(
                  'absolute inset-0 fill-yellow-400 text-yellow-400 transition-all duration-200',
                  size === 'sm' && 'h-4 w-4',
                  size === 'md' && 'h-5 w-5',
                  size === 'lg' && 'h-6 w-6',
                )}
                style={{ clipPath: 'inset(0 50% 0 0)' }}
              />
            )}
          </button>,
        );
      }
      return stars;
    };

    // Numeric Rating Component with step support
    const renderNumericRating = () => {
      const numbers: React.ReactElement[] = [];
      
      // Generate values based on step size
      const values: number[] = [];
      for (let i = min; i <= max; i += step) {
        // Round to avoid floating point precision issues
        values.push(Math.round(i * 100) / 100);
      }

      values.forEach((val) => {
        const isSelected = numericValue === val;
        const isHovered = hoveredValue === val;

        numbers.push(
          <button
            key={val}
            type="button"
            disabled={disabled}
            className={cn(
              'focus:ring-ring flex items-center justify-center rounded border-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none shrink-0',
              size === 'sm' && 'h-8 min-w-[3rem] max-w-[3rem] text-sm',
              size === 'md' && 'h-10 min-w-[4rem] max-w-[4rem] text-base',
              size === 'lg' && 'h-12 min-w-[5rem] max-w-[5rem] text-lg',
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105',
              isSelected
                ? 'border-[#20265B] bg-[#20265B] text-white shadow-md'
                : isHovered
                ? 'border-[#20265B]/80 bg-[#20265B]/80 text-white shadow-md'
                : 'border-input bg-background hover:border-[#20265B]/50 hover:bg-[#20265B]/5',
            )}
            onClick={() => handleClick(val)}
            onMouseEnter={() => handleMouseEnter(val)}
            onMouseLeave={handleMouseLeave}
            aria-label={`Rate ${val}`}
          >
            {val % 1 === 0 ? val : val.toFixed(1)}
          </button>,
        );
      });
      
      return numbers;
    };

    // Yes/No Rating Component
    const renderYesNoRating = () => {
      const booleanValue = typeof value === 'boolean' ? value : null;

      return (
        <div className="flex gap-3">
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'focus:ring-ring flex items-center gap-2 rounded-lg border-2 px-4 py-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none',
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105',
              booleanValue === true
                ? 'border-green-500 bg-green-50 text-green-700 shadow-md'
                : 'border-input bg-background hover:border-green-500/50 hover:bg-green-50/50',
            )}
            onClick={() => handleClick(true)}
            aria-label="Yes"
          >
            <Check className="h-4 w-4" />
            <Typography variant="small" weight="medium">
              Yes
            </Typography>
          </button>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              'focus:ring-ring flex items-center gap-2 rounded-lg border-2 px-4 py-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none',
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105',
              booleanValue === false
                ? 'border-red-500 bg-red-50 text-red-700 shadow-md'
                : 'border-input bg-background hover:border-red-500/50 hover:bg-red-50/50',
            )}
            onClick={() => handleClick(false)}
            aria-label="No"
          >
            <X className="h-4 w-4" />
            <Typography variant="small" weight="medium">
              No
            </Typography>
          </button>
        </div>
      );
    };

    // Scale Rating Component
    const renderScaleRating = () => {
      return (
        <div className="flex flex-wrap gap-2">
          {effectiveScales.map((scale) => {
            const isSelected = numericValue === scale.value;
            const isHovered = hoveredValue === scale.value;

            return (
              <button
                key={scale.value}
                type="button"
                disabled={disabled}
                className={cn(
                  'focus:ring-ring flex items-center gap-2 rounded-lg border-2 px-3 py-2 font-medium transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none',
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-105',
                  isSelected
                    ? 'border-[#20265B] bg-[#20265B] text-white shadow-md'
                    : isHovered
                    ? 'border-[#20265B]/80 bg-[#20265B]/80 text-white shadow-md'
                    : 'border-input bg-background hover:border-[#20265B]/50 hover:bg-[#20265B]/5',
                )}
                onClick={() => handleClick(scale.value)}
                onMouseEnter={() => handleMouseEnter(scale.value)}
                onMouseLeave={handleMouseLeave}
                aria-label={`Rate ${scale.label}`}
              >
                <Circle
                  className={cn(
                    'h-3 w-3 transition-colors duration-200',
                    isSelected || isHovered ? 'fill-white text-white' : scale.color || 'text-gray-400',
                  )}
                />
                <Typography 
                  variant="small" 
                  weight="medium"
                  className={isSelected || isHovered ? 'text-white' : ''}
                >
                  {scale.label}
                </Typography>
              </button>
            );
          })}
        </div>
      );
    };

    // Main render function
    const renderRating = () => {
      switch (type) {
        case 'numeric':
          return renderNumericRating();
        case 'yesno':
          return renderYesNoRating();
        case 'scale':
          return renderScaleRating();
        default:
          return renderStarRating();
      }
    };

    // Get current label for display
    const getCurrentLabel = () => {
      if (type === 'yesno') {
        return typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 'Not selected';
      }

      if (type === 'scale' && effectiveScales.length > 0) {
        const scale = effectiveScales.find((s) => s.value === numericValue);
        return scale?.label || 'Not rated';
      }

      if (numericValue === null) return 'Not rated';
      return `${displayValue}/${max}`;
    };

    return (
      <div className="space-y-2">
        {/* Label */}
        {label && (
          <label
            htmlFor={componentId}
            className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        {/* Description */}
        {description && (
          <Typography variant="small" color="muted">
            {description}
          </Typography>
        )}

        {/* Rating Component */}
        <div ref={ref} className={cn(ratingVariants({ size }), className)} {...props}>
          {renderRating()}

          {/* Show current value */}
          {showValue && (
            <Typography variant="small" color="muted" className="ml-3 font-medium">
              {getCurrentLabel()}
            </Typography>
          )}
        </div>

        {/* Current label for scale types */}
        {showLabels && type === 'scale' && effectiveScales.length > 0 && numericValue !== null && (
          <div className="text-muted-foreground text-xs">
            Current rating: <span className="font-medium">{getCurrentLabel()}</span>
          </div>
        )}

        {/* Error or helper text */}
        {(error || helperText) && (
          <Typography variant="small" color={error ? 'destructive' : 'muted'} className="text-xs">
            {error || helperText}
          </Typography>
        )}
      </div>
    );
  },
);

Rating.displayName = 'Rating';

// Helper function to create rating scales
export const createRatingScale = (value: number, label: string, color?: string): RatingScale => ({
  value,
  label,
  color,
});

export { Rating, ratingVariants };
