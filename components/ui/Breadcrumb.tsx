'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ChevronRight, Home, MoreHorizontal } from 'lucide-react';
import { forwardRef } from 'react';

const breadcrumbVariants = cva('flex items-center space-x-0.5 sm:space-x-1 text-sm text-muted-foreground', {
  variants: {
    size: {
      sm: 'text-[10px] sm:text-xs',
      md: 'text-xs sm:text-sm',
      lg: 'text-sm sm:text-base',
    },
    variant: {
      default: '',
      ghost: 'bg-transparent',
      outline: 'border border-border rounded-md px-3 py-2',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
});

const breadcrumbItemVariants = cva(
  'inline-flex items-center gap-1 sm:gap-1.5 transition-colors hover:text-foreground',
  {
    variants: {
      active: {
        true: 'text-foreground font-medium',
        false: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

const breadcrumbLinkVariants = cva(
  'transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm',
  {
    variants: {
      active: {
        true: 'text-foreground cursor-default',
        false: 'text-muted-foreground hover:text-foreground cursor-pointer',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface BreadcrumbProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof breadcrumbVariants> {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  showHome?: boolean;
  maxItems?: number;
  homeIcon?: React.ReactNode;
  homeHref?: string;
  onHomeClick?: () => void;
}

const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      className,
      size,
      variant,
      items,
      separator = <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />,
      showHome = true,
      maxItems,
      homeIcon = <Home className="h-3 w-3 sm:h-4 sm:w-4" />,
      homeHref = '/',
      onHomeClick,
      ...props
    },
    ref,
  ) => {
    // Handle item collapse when maxItems is set
    const processedItems =
      maxItems && items.length > maxItems
        ? [
            ...items.slice(0, 1),
            { label: '...', icon: <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" /> },
            ...items.slice(items.length - (maxItems - 2)),
          ]
        : items;

    const handleItemClick = (item: BreadcrumbItem, index: number) => {
      if (item.onClick) {
        item.onClick();
      }
    };

    const renderBreadcrumbItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
      const isCollapsed = item.label === '...';

      if (isCollapsed) {
        return (
          <div key={`collapsed-${index}`} className="flex items-center gap-1.5">
            <span className={cn(breadcrumbItemVariants({ active: false }))}>{item.icon}</span>
          </div>
        );
      }

      const content = (
        <>
          {item.icon && <span className="shrink-0">{item.icon}</span>}
          <span className="truncate max-w-[80px] sm:max-w-none">{item.label}</span>
        </>
      );

      if (isLast) {
        return (
          <div key={index} className={cn(breadcrumbItemVariants({ active: true }))}>
            {content}
          </div>
        );
      }

      if (item.href) {
        return (
          <a
            key={index}
            href={item.href}
            className={cn(breadcrumbLinkVariants({ active: false }))}
            onClick={(e) => {
              if (item.onClick) {
                e.preventDefault();
                handleItemClick(item, index);
              }
            }}
          >
            {content}
          </a>
        );
      }

      if (item.onClick) {
        return (
          <button
            key={index}
            onClick={() => handleItemClick(item, index)}
            className={cn(breadcrumbLinkVariants({ active: false }))}
          >
            {content}
          </button>
        );
      }

      return (
        <span key={index} className={cn(breadcrumbItemVariants({ active: false }))}>
          {content}
        </span>
      );
    };

    const renderSeparator = (index: number) => (
      <span key={`separator-${index}`} className="text-muted-foreground/50 shrink-0">
        {separator}
      </span>
    );

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn(breadcrumbVariants({ size, variant }), 'w-full min-w-0', className)}
        {...props}
      >
        <ol className="flex items-center gap-0.5 sm:gap-1.5 overflow-hidden min-w-0 flex-1">
          {/* Home link */}
          {showHome && (
            <>
              <li>
                {homeHref ? (
                  <a
                    href={homeHref}
                    className={cn(breadcrumbLinkVariants({ active: false }))}
                    onClick={(e) => {
                      if (onHomeClick) {
                        e.preventDefault();
                        onHomeClick();
                      }
                    }}
                    aria-label="Home"
                  >
                    {homeIcon}
                  </a>
                ) : onHomeClick ? (
                  <button
                    onClick={onHomeClick}
                    className={cn(breadcrumbLinkVariants({ active: false }))}
                    aria-label="Home"
                  >
                    {homeIcon}
                  </button>
                ) : (
                  <span className={cn(breadcrumbItemVariants({ active: false }))} aria-label="Home">
                    {homeIcon}
                  </span>
                )}
              </li>
              {processedItems.length > 0 && <li>{renderSeparator(0)}</li>}
            </>
          )}

          {/* Breadcrumb items */}
          {processedItems.map((item, index) => {
            const isLast = index === processedItems.length - 1;
            return (
              <li key={index} className="flex items-center gap-0.5 sm:gap-1.5 min-w-0">
                {renderBreadcrumbItem(item, index, isLast)}
                {!isLast && renderSeparator(index)}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';

export { Breadcrumb, breadcrumbVariants };
