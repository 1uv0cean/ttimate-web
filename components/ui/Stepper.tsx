'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertCircle, Check, ChevronRight, Clock } from 'lucide-react';
import { forwardRef } from 'react';
import { Typography } from './Typography';

const stepperVariants = cva('flex items-center w-full min-w-0 overflow-x-auto', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

export type StepStatus = 'pending' | 'current' | 'completed' | 'error' | 'skipped';

export interface Step {
  id: string;
  title: string;
  description?: string;
  status: StepStatus;
  optional?: boolean;
  icon?: React.ReactNode;
}

export interface StepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof stepperVariants> {
  steps: Step[];
  currentStep?: number;
  allowNavigation?: boolean;
  showDescription?: boolean;
  showConnector?: boolean;
  onStepClick?: (step: Step, index: number) => void;
}

const getStepIcon = (step: Step, size: 'sm' | 'md' | 'lg' | null) => {
  const iconSize = size === 'sm' ? 'h-3 w-3 sm:h-4 sm:w-4' : size === 'lg' ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-4 w-4 sm:h-5 sm:w-5';

  if (step.icon) {
    return <div className={iconSize}>{step.icon}</div>;
  }

  switch (step.status) {
    case 'completed':
      return <Check className={cn(iconSize, 'text-white')} />;
    case 'error':
      return <AlertCircle className={cn(iconSize, 'text-white')} />;
    case 'current':
      return <Clock className={cn(iconSize, 'text-white')} />;
    default:
      return null;
  }
};

const getStepColors = (step: Step, allowNavigation: boolean, isClickable: boolean) => {
  const baseClasses =
    'transition-all duration-200 rounded-full border-2 flex items-center justify-center';
  const hoverClasses = isClickable && allowNavigation ? 'hover:scale-110 cursor-pointer' : '';

  switch (step.status) {
    case 'completed':
      return cn(baseClasses, hoverClasses, 'bg-green-500 border-green-500 text-white shadow-lg');
    case 'current':
      return cn(
        baseClasses,
        hoverClasses,
        'bg-primary border-primary text-primary-foreground shadow-lg ring-4 ring-primary/20',
      );
    case 'error':
      return cn(
        baseClasses,
        hoverClasses,
        'bg-destructive border-destructive text-destructive-foreground shadow-lg',
      );
    case 'skipped':
      return cn(baseClasses, hoverClasses, 'bg-gray-300 border-gray-300 text-gray-600');
    default:
      return cn(
        baseClasses,
        hoverClasses,
        'bg-gray-100 border-gray-300 text-gray-500 hover:border-gray-400',
      );
  }
};

const getStepSize = (size: 'sm' | 'md' | 'lg' | null) => {
  switch (size) {
    case 'sm':
      return 'h-7 w-7 sm:h-8 sm:w-8';
    case 'lg':
      return 'h-10 w-10 sm:h-12 sm:w-12';
    default:
      return 'h-8 w-8 sm:h-10 sm:w-10';
  }
};

const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      orientation,
      size = 'md',
      steps,
      currentStep,
      allowNavigation = false,
      showDescription = true,
      showConnector = true,
      onStepClick,
      ...props
    },
    ref,
  ) => {
    const handleStepClick = (step: Step, index: number) => {
      if (!allowNavigation) return;

      // Allow navigation to completed steps or current step
      if (step.status === 'completed' || step.status === 'current' || step.status === 'error') {
        onStepClick?.(step, index);
      }
    };

    const isStepClickable = (step: Step) => {
      return (
        allowNavigation &&
        (step.status === 'completed' || step.status === 'current' || step.status === 'error')
      );
    };

    if (orientation === 'vertical') {
      return (
        <div ref={ref} className={cn(stepperVariants({ orientation, size }), className)} {...props}>
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const isClickable = isStepClickable(step);

            return (
              <div key={step.id} className="flex w-full">
                {/* Step Content */}
                <div className="flex flex-col items-center">
                  {/* Step Circle */}
                  <div
                    className={cn(
                      getStepColors(step, allowNavigation, isClickable),
                      getStepSize(size),
                    )}
                    onClick={() => handleStepClick(step, index)}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        handleStepClick(step, index);
                      }
                    }}
                  >
                    {getStepIcon(step, size)}
                  </div>

                  {/* Connector Line */}
                  {!isLast && showConnector && <div className="my-1 sm:my-2 h-8 sm:h-12 w-px bg-gray-300" />}
                </div>

                {/* Step Text */}
                <div className="ml-3 sm:ml-4 flex-1 pb-6 sm:pb-8">
                  <div
                    className={cn('group', isClickable && 'cursor-pointer')}
                    onClick={() => handleStepClick(step, index)}
                  >
                    <Typography
                      variant="small"
                      weight="medium"
                      className={cn(
                        'transition-colors',
                        step.status === 'current' && 'text-primary',
                        step.status === 'completed' && 'text-green-700',
                        step.status === 'error' && 'text-destructive',
                        isClickable && 'group-hover:text-primary',
                      )}
                    >
                      {step.title}
                      {step.optional && <span className="ml-1 text-gray-500">(Optional)</span>}
                    </Typography>

                    {showDescription && step.description && (
                      <Typography variant="small" color="muted" className="mt-1">
                        {step.description}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Horizontal orientation
    return (
      <div ref={ref} className={cn(stepperVariants({ orientation, size }), 'min-w-0', className)} {...props}>
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          const isClickable = isStepClickable(step);

          return (
            <div key={step.id} className="flex flex-1 min-w-0 items-center">
              {/* Step Content */}
              <div className="flex flex-1 flex-col items-center">
                {/* Step Circle */}
                <div
                  className={cn(
                    getStepColors(step, allowNavigation, isClickable),
                    getStepSize(size),
                  )}
                  onClick={() => handleStepClick(step, index)}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleStepClick(step, index);
                    }
                  }}
                >
                  {getStepIcon(step, size)}
                </div>

                {/* Step Text */}
                <div
                  className={cn('group mt-1 sm:mt-2 max-w-20 sm:max-w-32 text-center', isClickable && 'cursor-pointer')}
                  onClick={() => handleStepClick(step, index)}
                >
                  <Typography
                    variant="small"
                    weight="medium"
                    className={cn(
                      'transition-colors',
                      step.status === 'current' && 'text-primary',
                      step.status === 'completed' && 'text-green-700',
                      step.status === 'error' && 'text-destructive',
                      isClickable && 'group-hover:text-primary',
                    )}
                  >
                    {step.title}
                    {step.optional && <span className="ml-1 text-[10px] sm:text-xs text-gray-500">(Opt.)</span>}
                  </Typography>

                  {showDescription && step.description && (
                    <Typography
                      variant="small"
                      color="muted"
                      className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs leading-tight"
                    >
                      {step.description}
                    </Typography>
                  )}
                </div>
              </div>

              {/* Connector Arrow */}
              {!isLast && showConnector && (
                <div className="flex items-center px-1 sm:px-2">
                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = 'Stepper';

// Helper function to create steps with default properties
export const createStep = (
  id: string,
  title: string,
  options: Partial<Omit<Step, 'id' | 'title'>> = {},
): Step => ({
  id,
  title,
  status: 'pending',
  ...options,
});

// Helper function to update step status
export const updateStepStatus = (steps: Step[], stepId: string, status: StepStatus): Step[] =>
  steps.map((step) => (step.id === stepId ? { ...step, status } : step));

// Helper function to set current step and update statuses
export const setCurrentStep = (steps: Step[], currentIndex: number): Step[] =>
  steps.map((step, index) => ({
    ...step,
    status: index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'pending',
  }));

export { Stepper, stepperVariants };
