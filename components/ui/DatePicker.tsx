'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertCircle, Calendar, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';

const datePickerVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:border-muted',
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

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size' | 'defaultValue'>,
    VariantProps<typeof datePickerVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  value?: Date | null;
  defaultValue?: Date | null;
  placeholder?: string;
  onDateChange?: (date: Date | null) => void;
  disabled?: boolean;
  required?: boolean;
  success?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      className,
      size,
      variant,
      label,
      error,
      helperText,
      leftIcon,
      value,
      defaultValue,
      placeholder = 'Select date',
      onDateChange,
      disabled,
      required,
      success,
      minDate,
      maxDate,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<Date | null>(value || defaultValue || null);
    const [currentMonth, setCurrentMonth] = useState(internalValue || new Date());
    const datePickerRef = useRef<HTMLDivElement>(null);

    const hasError = !!error;
    const hasSuccess = success && !hasError;
    const effectiveVariant = hasError ? 'error' : hasSuccess ? 'success' : variant;

    const selectedDate = value !== undefined ? value : internalValue;
    const displayText = selectedDate
      ? selectedDate.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })
      : placeholder;

    const handleDateSelect = (date: Date) => {
      if (disabled) return;

      // Check min/max date constraints
      if (minDate && date < minDate) return;
      if (maxDate && date > maxDate) return;

      if (value === undefined) {
        setInternalValue(date);
      }
      onDateChange?.(date);
      setIsOpen(false);
    };

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    };

    const handleClear = () => {
      if (disabled) return;
      if (value === undefined) {
        setInternalValue(null);
      }
      onDateChange?.(null);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }
    }, [isOpen]);

    // Calendar logic
    const getDaysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const isSameDate = (date1: Date, date2: Date | null) => {
      if (!date2) return false;
      return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
      );
    };

    const navigateMonth = (direction: 'prev' | 'next') => {
      setCurrentMonth((prev) => {
        const newMonth = new Date(prev);
        if (direction === 'prev') {
          newMonth.setMonth(prev.getMonth() - 1);
        } else {
          newMonth.setMonth(prev.getMonth() + 1);
        }
        return newMonth;
      });
    };

    const renderCalendar = () => {
      const daysInMonth = getDaysInMonth(currentMonth);
      const firstDay = getFirstDayOfMonth(currentMonth);
      const days = [];

      // Empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-8 w-full" />);
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const isSelected = isSameDate(date, selectedDate);
        const isDisabled = isDateDisabled(date);
        const isToday = isSameDate(date, new Date());

        days.push(
          <button
            key={day}
            type="button"
            onClick={() => !isDisabled && handleDateSelect(date)}
            className={cn(
              'hover:bg-accent hover:text-accent-foreground focus:ring-ring h-8 w-full rounded text-xs sm:text-sm focus:ring-1 focus:outline-none',
              isSelected && 'bg-primary text-primary-foreground hover:bg-primary/90',
              isToday && !isSelected && 'text-primary font-semibold',
              isDisabled && 'cursor-not-allowed opacity-50 hover:bg-transparent hover:text-current',
            )}
            disabled={isDisabled}
          >
            {day}
          </button>,
        );
      }

      return days;
    };

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative" ref={datePickerRef}>
          <div
            ref={ref}
            className={cn(
              datePickerVariants({ size, variant: effectiveVariant }),
              leftIcon && 'pl-10',
              'items-center justify-between pr-3',
              isOpen && !disabled && 'ring-ring ring-2 ring-offset-2',
              className,
            )}
            onClick={handleToggle}
            role="button"
            aria-expanded={isOpen}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
              }
            }}
            {...props}
          >
            <span className={cn('truncate', !selectedDate && 'text-muted-foreground')}>
              {displayText}
            </span>

            <div className="flex items-center space-x-1">
              {hasError && <AlertCircle className="text-destructive h-4 w-4" />}
              {hasSuccess && <Check className="h-4 w-4 text-green-500" />}
              <Calendar className="text-muted-foreground h-4 w-4" />
            </div>
          </div>

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

          {isOpen && !disabled && (
            <div className="border-input bg-background absolute top-full z-50 mt-1 w-full sm:w-80 max-w-[calc(100vw-2rem)] left-0 sm:left-auto sm:right-auto rounded-md border p-3 shadow-lg">
              {/* Calendar Header */}
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigateMonth('prev')}
                  className="hover:bg-accent rounded p-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="font-semibold">
                  {currentMonth.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => navigateMonth('next')}
                  className="hover:bg-accent rounded p-1"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Days of week header */}
              <div className="mb-2 grid grid-cols-7 gap-1">
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                  <div
                    key={day}
                    className="text-muted-foreground flex h-8 w-full items-center justify-center text-[10px] sm:text-xs font-medium"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

              {/* Clear button */}
              {selectedDate && (
                <div className="border-border mt-3 border-t pt-3">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-muted-foreground hover:text-foreground text-sm"
                  >
                    Clear selection
                  </button>
                </div>
              )}
            </div>
          )}
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

DatePicker.displayName = 'DatePicker';

export { DatePicker, datePickerVariants };
