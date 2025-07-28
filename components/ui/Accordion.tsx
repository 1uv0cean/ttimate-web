'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';
import { forwardRef, useState } from 'react';

const accordionVariants = cva('border border-input rounded-lg', {
  variants: {
    variant: {
      default: 'bg-background',
      outlined: 'bg-background border-2',
      ghost: 'border-transparent bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const accordionHeaderVariants = cva(
  'flex w-full items-center justify-between p-3 sm:p-4 text-left font-medium transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 gap-2',
  {
    variants: {
      variant: {
        default: '',
        outlined: '',
        ghost: 'hover:bg-accent/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface AccordionItemData {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  section?: string;
}

export interface AccordionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof accordionVariants> {
  items: AccordionItemData[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  customColor?: string;
}

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      className,
      variant,
      items,
      type = 'single',
      defaultValue,
      value,
      onValueChange,
      collapsible = true,
      customColor,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string | string[]>(() => {
      if (value !== undefined) return value;
      if (defaultValue !== undefined) return defaultValue;
      return type === 'single' ? '' : [];
    });

    const currentValue = value !== undefined ? value : internalValue;

    const handleValueChange = (itemId: string) => {
      let newValue: string | string[];

      if (type === 'single') {
        const currentSingle = currentValue as string;
        newValue = currentSingle === itemId && collapsible ? '' : itemId;
      } else {
        const currentMultiple = currentValue as string[];
        newValue = currentMultiple.includes(itemId)
          ? currentMultiple.filter((id) => id !== itemId)
          : [...currentMultiple, itemId];
      }

      setInternalValue(newValue);
      onValueChange?.(newValue);
    };

    const isItemOpen = (itemId: string) => {
      if (type === 'single') {
        return currentValue === itemId;
      } else {
        return (currentValue as string[]).includes(itemId);
      }
    };

    const accordionStyle = customColor
      ? {
          borderColor: customColor,
        }
      : {};

    const renderContent = () => {
      let currentSection = '';
      const elements: React.ReactNode[] = [];

      items.forEach((item, index) => {
        const isOpen = isItemOpen(item.id);
        const isLast = index === items.length - 1;

        // Add section header if section changes
        if (item.section && item.section !== currentSection) {
          currentSection = item.section;
          elements.push(
            <div
              key={`section-${item.section}`}
              className="px-4 py-3 bg-muted/30 border-b border-border first:rounded-t-lg"
            >
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {item.section}
              </h4>
            </div>
          );
        }

        elements.push(
          <div key={item.id} className={cn(!isLast && 'border-border border-b')}>
            <button
              className={cn(
                accordionHeaderVariants({ variant }),
                'w-full rounded-none',
                index === 0 && !item.section && 'rounded-t-lg',
                isLast && !isOpen && 'rounded-b-lg',
                item.disabled && 'cursor-not-allowed opacity-50',
              )}
              onClick={() => !item.disabled && handleValueChange(item.id)}
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              type="button"
            >
              <span className="text-sm font-medium flex-1 mr-2">{item.title}</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 shrink-0 transition-transform duration-200',
                  isOpen && 'rotate-180',
                )}
              />
            </button>

            <div
              id={`accordion-content-${item.id}`}
              className={cn(
                'overflow-hidden transition-all duration-200 ease-in-out',
                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
              )}
              aria-hidden={!isOpen}
            >
              <div className="border-t border-border">
                <div className={cn('p-3 sm:p-4', isLast && 'pb-3 sm:pb-4')}>
                  <div className="text-muted-foreground text-sm">{item.content}</div>
                </div>
              </div>
            </div>
          </div>
        );
      });

      return elements;
    };

    return (
      <div
        className={cn(accordionVariants({ variant }), className)}
        style={accordionStyle}
        ref={ref}
        {...props}
      >
        {renderContent()}
      </div>
    );
  },
);

Accordion.displayName = 'Accordion';

export { Accordion, accordionVariants };
