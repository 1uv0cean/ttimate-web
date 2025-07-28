'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ElementType, forwardRef } from 'react';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
      h2: 'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'scroll-m-20 text-lg font-semibold tracking-tight',
      h6: 'scroll-m-20 text-base font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      lead: 'text-xl text-muted-foreground',
      blockquote: 'mt-6 border-l-2 pl-6 italic',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    weight: {
      thin: 'font-thin',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary-foreground',
      destructive: 'text-destructive',
      success: 'text-green-600',
      warning: 'text-yellow-600',
      info: 'text-blue-600',
    },
  },
  defaultVariants: {
    variant: 'p',
    align: 'left',
    color: 'default',
  },
});

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'div'
    | 'blockquote'
    | 'code'
    | 'ul'
    | 'ol'
    | 'li';
  truncate?: boolean;
  gradient?: boolean;
  customColor?: string;
}

const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      variant,
      size,
      weight,
      align,
      color,
      as,
      truncate,
      gradient,
      customColor,
      children,
      style,
      ...props
    },
    ref,
  ) => {
    const Component = (as || getDefaultElement(variant ?? undefined)) as ElementType;

    const customStyle = customColor
      ? {
          color: customColor,
          ...style,
        }
      : style;

    const gradientStyle = gradient
      ? {
          background:
            'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary)) 40%, hsl(var(--muted-foreground)))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          ...customStyle,
        }
      : customStyle;

    return (
      <Component
        className={cn(
          typographyVariants({
            variant: customColor || gradient ? undefined : variant,
            size: variant && !size ? undefined : size,
            weight,
            align,
            color: customColor || gradient ? undefined : color,
          }),
          truncate && 'truncate',
          gradient && 'bg-gradient-to-r',
          className,
        )}
        ref={ref}
        style={gradientStyle}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

const getDefaultElement = (variant?: string): keyof React.JSX.IntrinsicElements => {
  switch (variant) {
    case 'h1':
      return 'h1';
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'h5':
      return 'h5';
    case 'h6':
      return 'h6';
    case 'blockquote':
      return 'blockquote';
    case 'code':
      return 'code';
    case 'list':
      return 'ul';
    case 'large':
    case 'small':
    case 'muted':
    case 'lead':
      return 'p';
    default:
      return 'p';
  }
};

Typography.displayName = 'Typography';

export { Typography, typographyVariants };
