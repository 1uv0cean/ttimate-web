'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

const tableVariants = cva(
  'w-full caption-bottom text-sm',
  {
    variants: {
      variant: {
        default: '',
        striped: '',
        bordered: 'border border-border',
      },
      size: {
        sm: 'text-xs',
        md: 'text-xs sm:text-sm',
        lg: 'text-sm sm:text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const tableHeaderVariants = cva(
  'border-b border-border font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      size: {
        sm: 'h-8 px-1 py-1 sm:px-2',
        md: 'h-10 px-2 py-2 sm:px-4',
        lg: 'h-12 px-3 py-3 sm:px-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const tableCellVariants = cva(
  'border-b border-border [&:has([role=checkbox])]:pr-0',
  {
    variants: {
      size: {
        sm: 'p-1 sm:p-2',
        md: 'px-2 py-2 sm:px-4',
        lg: 'px-3 py-3 sm:px-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const tableRowVariants = cva(
  'border-b border-border transition-colors',
  {
    variants: {
      variant: {
        default: 'hover:bg-muted/50 data-[state=selected]:bg-muted',
        striped: 'odd:bg-muted/30 hover:bg-muted/50 data-[state=selected]:bg-muted',
        bordered: 'hover:bg-muted/50 data-[state=selected]:bg-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

// Table Root Component
export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div className="relative w-full min-w-0 overflow-auto">
      <table
        ref={ref}
        className={cn(
          tableVariants({ variant, size }),
          'w-full min-w-full', // Ensure table takes full width and doesn't shrink
          className
        )}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

// Table Header
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

// Table Body
export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  ),
);
TableBody.displayName = 'TableBody';

// Table Footer
export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn(
        'border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  ),
);
TableFooter.displayName = 'TableFooter';

// Table Row
export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement>,
    VariantProps<typeof tableRowVariants> {}

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, variant, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(tableRowVariants({ variant }), className)}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

// Table Head Cell
export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeaderVariants> {}

const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, size, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        tableHeaderVariants({ size }),
        'text-left align-middle font-medium text-muted-foreground',
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = 'TableHead';

// Table Data Cell
export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariants> {}

const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ size }), 'align-middle', className)}
      {...props}
    />
  ),
);
TableCell.displayName = 'TableCell';

// Table Caption
export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {}

const TableCaption = forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  ),
);
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};