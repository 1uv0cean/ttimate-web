'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { forwardRef, useEffect, useState } from 'react';
import { Typography } from './Typography';

const progressVariants = cva('relative overflow-hidden rounded-full bg-secondary', {
  variants: {
    size: {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
      xl: 'h-6',
    },
    variant: {
      default: '',
      success: 'bg-green-100',
      error: 'bg-red-100',
      warning: 'bg-yellow-100',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

const progressBarVariants = cva('h-full transition-all duration-300 ease-out rounded-full', {
  variants: {
    variant: {
      default: 'bg-primary',
      success: 'bg-green-500',
      error: 'bg-destructive',
      warning: 'bg-yellow-500',
    },
    animated: {
      true: 'bg-gradient-to-r from-primary/80 to-primary bg-[length:2em_100%] animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    animated: false,
  },
});

export type ProgressVariant = 'default' | 'success' | 'error' | 'warning';
export type ProgressStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'value'>,
    VariantProps<typeof progressVariants> {
  value?: number; // 0-100
  max?: number;
  indeterminate?: boolean;
  status?: ProgressStatus;
  showPercentage?: boolean;
  showValue?: boolean;
  label?: string;
  description?: string;
  animated?: boolean;
  striped?: boolean;
  color?: string;
  buffer?: number; // For buffered progress (0-100)
  steps?: ProgressStep[];
  currentStep?: number;
}

export interface ProgressStep {
  id: string;
  label: string;
  value: number;
  color?: string;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size,
      variant: variantProp,
      value = 0,
      max = 100,
      indeterminate = false,
      status = 'idle',
      showPercentage = false,
      showValue = false,
      label,
      description,
      animated = false,
      striped = false,
      color,
      buffer,
      steps,
      currentStep,
      ...props
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = useState(0);

    // Determine variant based on status
    const variant: ProgressVariant =
      variantProp ||
      (() => {
        switch (status) {
          case 'success':
            return 'success';
          case 'error':
            return 'error';
          case 'loading':
            return 'default';
          default:
            return 'default';
        }
      })();

    // Animate value changes
    useEffect(() => {
      if (indeterminate) return;

      const timer = setTimeout(() => {
        setDisplayValue(value);
      }, 50);

      return () => clearTimeout(timer);
    }, [value, indeterminate]);

    const percentage = Math.min(Math.max((displayValue / max) * 100, 0), 100);
    const bufferPercentage = buffer ? Math.min(Math.max((buffer / max) * 100, 0), 100) : 0;

    const getStatusIcon = () => {
      switch (status) {
        case 'loading':
          return <Loader2 className="h-4 w-4 animate-spin" />;
        case 'success':
          return <CheckCircle className="h-4 w-4 text-green-500" />;
        case 'error':
          return <AlertCircle className="text-destructive h-4 w-4" />;
        default:
          return null;
      }
    };

    const formatValue = () => {
      if (showPercentage) {
        return `${Math.round(percentage)}%`;
      }
      if (showValue) {
        return `${displayValue}${max !== 100 ? `/${max}` : ''}`;
      }
      return null;
    };

    const renderSteppedProgress = () => {
      if (!steps || steps.length === 0) return null;

      return (
        <div className="space-y-2">
          {steps.map((step, index) => {
            const isCompleted = currentStep !== undefined ? index < currentStep : step.value >= 100;
            const isCurrent = currentStep !== undefined ? index === currentStep : false;
            const stepPercentage = Math.min(Math.max(step.value, 0), 100);

            return (
              <div key={step.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <Typography variant="small" weight="medium">
                    {step.label}
                  </Typography>
                  <Typography variant="small" color="muted">
                    {Math.round(stepPercentage)}%
                  </Typography>
                </div>
                <div className={cn(progressVariants({ size: 'sm', variant }))}>
                  <div
                    className={cn(
                      progressBarVariants({
                        variant: isCompleted ? 'success' : isCurrent ? 'default' : 'default',
                        animated: isCurrent && animated,
                      }),
                      striped &&
                        'bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1em_100%]',
                    )}
                    style={{
                      width: `${stepPercentage}%`,
                      backgroundColor: step.color || undefined,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    if (steps && steps.length > 0) {
      return (
        <div className="space-y-3">
          {(label || description) && (
            <div className="space-y-1">
              {label && (
                <Typography variant="small" weight="medium">
                  {label}
                </Typography>
              )}
              {description && (
                <Typography variant="small" color="muted">
                  {description}
                </Typography>
              )}
            </div>
          )}
          {renderSteppedProgress()}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {/* Header */}
        {(label || description || showPercentage || showValue || status !== 'idle') && (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {label && (
                <div className="flex items-center gap-2">
                  <Typography variant="small" weight="medium">
                    {label}
                  </Typography>
                  {getStatusIcon()}
                </div>
              )}
              {description && (
                <Typography variant="small" color="muted">
                  {description}
                </Typography>
              )}
            </div>
            {(showPercentage || showValue) && (
              <Typography variant="small" color="muted" weight="medium">
                {formatValue()}
              </Typography>
            )}
          </div>
        )}

        {/* Progress Bar */}
        <div
          ref={ref}
          className={cn(progressVariants({ size, variant }), className)}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : displayValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          {...props}
        >
          {/* Buffer Progress (background) */}
          {buffer !== undefined && (
            <div
              className="bg-primary/30 absolute inset-y-0 left-0 rounded-full transition-all duration-500"
              style={{ width: `${bufferPercentage}%` }}
            />
          )}

          {/* Main Progress */}
          <div
            className={cn(
              progressBarVariants({
                variant,
                animated: animated || indeterminate,
              }),
              striped &&
                'animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:1em_100%]',
              indeterminate && 'animate-progress-indeterminate absolute inset-y-0 w-1/3',
            )}
            style={{
              width: indeterminate ? '33%' : `${percentage}%`,
              backgroundColor: color || undefined,
            }}
          />
        </div>

        {/* Footer Info */}
        {status === 'error' && (
          <Typography variant="small" color="destructive" className="text-xs">
            An error occurred while processing
          </Typography>
        )}
        {status === 'success' && percentage >= 100 && (
          <Typography variant="small" color="success" className="text-xs">
            Completed successfully
          </Typography>
        )}
      </div>
    );
  },
);

Progress.displayName = 'Progress';

// Helper function to create progress steps
export const createProgressStep = (
  id: string,
  label: string,
  value: number = 0,
  options: Partial<Omit<ProgressStep, 'id' | 'label' | 'value'>> = {},
): ProgressStep => ({
  id,
  label,
  value: Math.min(Math.max(value, 0), 100),
  ...options,
});

// Helper function to update step progress
export const updateStepProgress = (
  steps: ProgressStep[],
  stepId: string,
  value: number,
): ProgressStep[] =>
  steps.map((step) =>
    step.id === stepId ? { ...step, value: Math.min(Math.max(value, 0), 100) } : step,
  );

export { Progress, progressVariants };
