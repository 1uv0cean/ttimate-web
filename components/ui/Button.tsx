'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-green-600 text-white hover:bg-green-700',
        warning: 'bg-yellow-600 text-white hover:bg-yellow-700',
        info: 'bg-blue-600 text-white hover:bg-blue-700',
        'hmm-marine': 'bg-[#20265B] text-white hover:bg-[#1a1f4d]',
        'hmm-red': 'bg-[#EE312F] text-white hover:bg-[#d52826]',
      },
      size: {
        sm: 'h-8 px-3 py-1',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 py-3',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  asChild?: boolean;
  customColor?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      loading,
      disabled,
      customColor,
      asChild,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const buttonStyle = customColor ? {
      backgroundColor: customColor,
      color: 'white',
      borderColor: customColor,
    } : {};

    const hoverStyle = customColor ? {
      '--hover-bg': `${customColor}dd`,
    } as React.CSSProperties : {};

    const buttonClasses = cn(
      buttonVariants({ variant: customColor ? undefined : variant, size }),
      customColor && 'hover:opacity-90 transition-opacity',
      className
    );

    const buttonContent = (
      <>
        {loading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        
        {!loading && leftIcon && (
          <span className="mr-2 flex items-center">
            {leftIcon}
          </span>
        )}

        {children && (
          <span className={cn(
            'flex items-center',
            (leftIcon || loading) && !rightIcon && 'ml-0',
            rightIcon && !leftIcon && !loading && 'mr-0'
          )}>
            {children}
          </span>
        )}

        {!loading && rightIcon && (
          <span className="ml-2 flex items-center">
            {rightIcon}
          </span>
        )}
      </>
    );

    // If asChild is true, render children directly with button styles
    if (asChild) {
      // Clone the child element and add button classes
      const child = children as React.ReactElement;
      if (child && typeof child === 'object' && child.type) {
        const childProps = child.props as any;
        const { className: childClassName, style: childStyle, ...restChildProps } = childProps || {};
        
        return (
          <child.type
            {...restChildProps}
            className={cn(buttonClasses, childClassName)}
            style={{ ...buttonStyle, ...hoverStyle, ...childStyle }}
            ref={ref}
          />
        );
      }
      
      // Fallback: render as span if child is not a valid element
      return (
        <span
          className={buttonClasses}
          style={{ ...buttonStyle, ...hoverStyle }}
          ref={ref as any}
          {...props}
        >
          {children}
        </span>
      );
    }

    return (
      <button
        className={buttonClasses}
        style={{...buttonStyle, ...hoverStyle}}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };