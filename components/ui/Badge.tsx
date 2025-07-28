'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { X } from 'lucide-react';
import { forwardRef } from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground border-border hover:bg-accent hover:text-accent-foreground',
        success: 'border-transparent bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        info: 'border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200',
        muted: 'border-transparent bg-muted text-muted-foreground hover:bg-muted/80',
        purple: 'border-transparent bg-purple-100 text-purple-800 hover:bg-purple-200',
        pink: 'border-transparent bg-pink-100 text-pink-800 hover:bg-pink-200',
        indigo: 'border-transparent bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
        teal: 'border-transparent bg-teal-100 text-teal-800 hover:bg-teal-200',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs',
        md: 'px-3 py-1 text-sm',
        lg: 'px-4 py-1.5 text-base',
      },
      shape: {
        rounded: 'rounded-full',
        square: 'rounded-md',
        pill: 'rounded-full px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'rounded',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  dot?: boolean;
  customColor?: string;
  children: React.ReactNode;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      dismissible = false,
      onDismiss,
      icon,
      dot = false,
      customColor,
      children,
      ...props
    },
    ref,
  ) => {
    const customStyle = customColor
      ? {
          backgroundColor: `${customColor}20`,
          color: customColor,
          borderColor: `${customColor}40`,
        }
      : {};

    const handleDismiss = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDismiss?.();
    };

    return (
      <div
        className={cn(
          badgeVariants({ variant: customColor ? undefined : variant, size, shape }),
          className,
        )}
        style={customColor ? customStyle : undefined}
        ref={ref}
        {...props}
      >
        {/* Dot indicator */}
        {dot && (
          <div className="mr-1.5 h-2 w-2 rounded-full bg-current opacity-60" />
        )}

        {/* Icon */}
        {icon && (
          <div className={cn('flex-shrink-0', children && 'mr-1.5')}>
            {icon}
          </div>
        )}

        {/* Content */}
        <span className="truncate">{children}</span>

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            className="ml-1.5 flex-shrink-0 rounded-full p-0.5 hover:bg-black/10 focus:outline-none focus:ring-1 focus:ring-current"
            onClick={handleDismiss}
            aria-label="Remove badge"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  },
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };