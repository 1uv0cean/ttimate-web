'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { AlertCircle, Check, ChevronDown } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const selectVariants = cva(
  'flex w-full rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer',
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

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  searchable?: boolean;
  required?: boolean;
  portal?: boolean; // Portal mode for DataTable usage
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      className,
      size,
      variant,
      label,
      error,
      helperText,
      leftIcon,
      options,
      value,
      defaultValue,
      placeholder = 'Select an option',
      onValueChange,
      disabled,
      loading,
      success,
      searchable = false,
      required,
      portal = false,
      ...props
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value || defaultValue || '');
    const [searchQuery, setSearchQuery] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

    const hasError = !!error;
    const hasSuccess = success && !hasError;
    const effectiveVariant = hasError ? 'error' : hasSuccess ? 'success' : variant;

    const selectedOption = options.find((option) => option.value === (value || internalValue));
    const displayText = selectedOption ? selectedOption.label : placeholder;

    const filteredOptions = searchable
      ? options.filter((option) => option.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options;

    const handleSelect = (optionValue: string) => {
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      onValueChange?.(optionValue);
      setIsOpen(false);
      setSearchQuery('');
    };

    const updatePosition = () => {
      if (selectRef.current) {
        const rect = selectRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 4,
          left: rect.left,
          width: rect.width,
        });
      }
    };

    const handleToggle = () => {
      if (!disabled && !loading) {
        if (!isOpen) {
          updatePosition();
        }
        setIsOpen(!isOpen);
      }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };

    // Handle events based on portal mode
    useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchQuery('');
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      // Only add scroll listener in portal mode
      if (portal) {
        const handleScroll = () => {
          updatePosition();
        };

        window.addEventListener('scroll', handleScroll, true);

        return () => {
          window.removeEventListener('scroll', handleScroll, true);
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, portal]);

    return (
      <div className="space-y-1">
        {label && (
          <label className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative" ref={selectRef}>
          <div
            className={cn(
              selectVariants({ size, variant: effectiveVariant }),
              leftIcon && 'pl-10',
              'items-center justify-between pr-3',
              isOpen && !disabled && 'ring-ring ring-2 ring-offset-2',
              disabled &&
                'bg-muted text-muted-foreground border-muted cursor-not-allowed opacity-50',
              className,
            )}
            onClick={handleToggle}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggle();
              }
            }}
            {...props}
          >
            <span className={cn('truncate', !selectedOption && 'text-muted-foreground')}>
              {displayText}
            </span>

            <div className="flex items-center space-x-1">
              {loading && (
                <div className="border-muted-foreground h-4 w-4 animate-spin rounded-full border-2 border-t-transparent" />
              )}

              {!loading && hasError && <AlertCircle className="text-destructive h-4 w-4" />}

              {!loading && hasSuccess && <Check className="h-4 w-4 text-green-500" />}

              {!loading && (
                <ChevronDown
                  className={cn(
                    'text-muted-foreground h-4 w-4 transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              )}
            </div>
          </div>
          {leftIcon && (
            <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
              {leftIcon}
            </div>
          )}
          {/* Dropdown - Portal mode (for DataTable) */}
          {isOpen &&
            !disabled &&
            !loading &&
            portal &&
            createPortal(
              <div
                ref={dropdownRef}
                className="border-input bg-background fixed z-[9999] rounded-md border shadow-lg"
                style={{
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                }}
              >
                {searchable && (
                  <div className="border-input border-b p-2">
                    <input
                      type="text"
                      placeholder="Search options..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="border-input focus:ring-ring w-full rounded border bg-transparent px-2 py-1 text-sm focus:ring-1 focus:outline-none"
                      autoFocus
                    />
                  </div>
                )}

                <div className="max-h-60 overflow-auto p-1">
                  {filteredOptions.length === 0 ? (
                    <div className="text-muted-foreground px-2 py-1 text-sm">No options found</div>
                  ) : (
                    filteredOptions.map((option) => (
                      <div
                        key={option.value}
                        className={cn(
                          'hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center rounded px-2 py-1 text-sm',
                          option.disabled && 'cursor-not-allowed opacity-50',
                          option.value === (value || internalValue) &&
                            'bg-accent text-accent-foreground',
                        )}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          if (!option.disabled) {
                            handleSelect(option.value);
                          }
                        }}
                      >
                        <span className="flex-1 truncate">{option.label}</span>
                        {option.value === (value || internalValue) && (
                          <Check className="ml-2 h-4 w-4" />
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>,
              document.body,
            )}

          {/* Dropdown - Normal mode (attached to parent) */}
          {isOpen && !disabled && !loading && !portal && (
            <div
              ref={dropdownRef}
              className="border-input bg-background absolute top-full right-0 left-0 z-50 mt-1 rounded-md border shadow-lg"
            >
              {searchable && (
                <div className="border-input border-b p-2">
                  <input
                    type="text"
                    placeholder="Search options..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border-input focus:ring-ring w-full rounded border bg-transparent px-2 py-1 text-sm focus:ring-1 focus:outline-none"
                    autoFocus
                  />
                </div>
              )}

              <div className="max-h-60 overflow-auto p-1">
                {filteredOptions.length === 0 ? (
                  <div className="text-muted-foreground px-2 py-1 text-sm">No options found</div>
                ) : (
                  filteredOptions.map((option) => (
                    <div
                      key={option.value}
                      className={cn(
                        'hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center rounded px-2 py-1 text-sm',
                        option.disabled && 'cursor-not-allowed opacity-50',
                        option.value === (value || internalValue) &&
                          'bg-accent text-accent-foreground',
                      )}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (!option.disabled) {
                          handleSelect(option.value);
                        }
                      }}
                    >
                      <span className="flex-1 truncate">{option.label}</span>
                      {option.value === (value || internalValue) && (
                        <Check className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  ))
                )}
              </div>
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

Select.displayName = 'Select';

export { Select, selectVariants };
