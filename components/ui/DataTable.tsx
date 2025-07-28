'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, Filter, Search } from 'lucide-react';
import { forwardRef, useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './Table';

const dataTableVariants = cva('w-full space-y-4', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-border rounded-lg p-4',
      card: 'bg-card border border-border rounded-lg p-6 shadow-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  resizable?: boolean;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  cellAlign?: 'left' | 'center' | 'right';
}

export type FilterMode = 'search' | 'column' | 'both' | 'none';
export type DisplayMode = 'pagination' | 'scroll' | 'static';

export interface DataTableProps<T = any>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dataTableVariants> {
  data: T[];
  columns: DataTableColumn<T>[];
  loading?: boolean;

  // Filtering options
  filterMode?: FilterMode;
  searchPlaceholder?: string;

  // Display options
  displayMode?: DisplayMode;
  pageSize?: number;
  maxHeight?: string;

  // Messages
  emptyMessage?: string;
  loadingMessage?: string;

  // Events
  onRowClick?: (row: T, index: number) => void;
  onSearch?: (query: string) => void;
  onFilter?: (filters: Record<string, string>) => void;
}

const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  (
    {
      className,
      variant,
      data,
      columns,
      loading = false,
      filterMode = 'search',
      searchPlaceholder = 'Search...',
      displayMode = 'pagination',
      pageSize = 10,
      maxHeight = '400px',
      emptyMessage = 'No data available',
      loadingMessage = 'Loading...',
      onRowClick,
      onSearch,
      onFilter,
      ...props
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
    const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() => {
      const initialWidths: Record<string, number> = {};
      columns.forEach((column) => {
        if (column.width) {
          initialWidths[column.key] = parseInt(column.width.replace('px', ''));
        }
      });
      return initialWidths;
    });

    // Calculate total table width - dynamic calculation that changes with column resizing
    const totalTableWidth = useMemo(() => {
      const calculatedWidth = columns.reduce((total, column) => {
        const width =
          columnWidths[column.key] || parseInt(column.width?.replace('px', '') || '150');
        return total + width;
      }, 0);
      // Return minimum width but ensure it doesn't exceed container
      return Math.max(calculatedWidth, 320); // Minimum 320px for mobile readability
    }, [columns, columnWidths]);
    const [isResizing, setIsResizing] = useState<string | null>(null);

    // Filter data based on search query and column filters
    const filteredData = useMemo(() => {
      let filtered = [...data];

      // Apply search filter
      if (searchQuery.trim()) {
        filtered = filtered.filter((row) =>
          columns.some((column) => {
            const value = row[column.key];
            return String(value || '')
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }),
        );
      }

      // Apply column filters
      Object.entries(columnFilters).forEach(([columnKey, filterValue]) => {
        if (filterValue.trim()) {
          filtered = filtered.filter((row) => {
            const value = row[columnKey];
            return String(value || '')
              .toLowerCase()
              .includes(filterValue.toLowerCase());
          });
        }
      });

      return filtered;
    }, [data, searchQuery, columnFilters, columns]);

    // Sort filtered data
    const sortedData = useMemo(() => {
      if (!sortColumn || !sortDirection) return filteredData;

      return [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();

        if (sortDirection === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }, [filteredData, sortColumn, sortDirection]);

    // Display data based on mode
    const displayData = useMemo(() => {
      if (displayMode === 'pagination') {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return sortedData.slice(startIndex, endIndex);
      }
      return sortedData;
    }, [sortedData, currentPage, pageSize, displayMode]);

    const totalPages = Math.ceil(sortedData.length / pageSize);

    const handleSort = (columnKey: string) => {
      const column = columns.find((col) => col.key === columnKey);
      if (!column?.sortable) return;

      if (sortColumn === columnKey) {
        if (sortDirection === 'asc') {
          setSortDirection('desc');
        } else if (sortDirection === 'desc') {
          setSortDirection(null);
          setSortColumn(null);
        } else {
          setSortDirection('asc');
        }
      } else {
        setSortColumn(columnKey);
        setSortDirection('asc');
      }
    };

    const handleColumnFilter = (columnKey: string, value: string) => {
      const newFilters = {
        ...columnFilters,
        [columnKey]: value,
      };
      setColumnFilters(newFilters);
      setCurrentPage(1);
      onFilter?.(newFilters);
    };

    const handleSearch = (value: string) => {
      setSearchQuery(value);
      setCurrentPage(1);
      onSearch?.(value);
    };

    const getSortIcon = (columnKey: string) => {
      if (sortColumn !== columnKey) return null;
      if (sortDirection === 'asc') return <ChevronUp className="h-4 w-4" />;
      if (sortDirection === 'desc') return <ChevronDown className="h-4 w-4" />;
      return null;
    };

    // Column resizing handlers
    const handleResizeStart = (columnKey: string, e: React.MouseEvent) => {
      setIsResizing(columnKey);

      const startX = e.clientX;
      const currentColumn = columns.find((col) => col.key === columnKey);
      const startWidth =
        columnWidths[columnKey] || parseInt(currentColumn?.width?.replace('px', '') || '150');

      // Get column constraints
      const minWidth = parseInt(currentColumn?.minWidth?.replace('px', '') || '80'); // Increased minimum
      const maxWidth = currentColumn?.maxWidth
        ? parseInt(currentColumn.maxWidth.replace('px', ''))
        : 300; // Reduced maximum for mobile

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - startX;
        const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth + deltaX));
        setColumnWidths((prev) => ({ ...prev, [columnKey]: newWidth }));
      };

      const handleMouseUp = () => {
        setIsResizing(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      // Improve UX during resize
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const getColumnWidth = (column: DataTableColumn) => {
      if (columnWidths[column.key]) {
        return `${Math.max(columnWidths[column.key], 80)}px`; // Minimum 80px per column
      }
      const defaultWidth = parseInt(column.width?.replace('px', '') || '150');
      return `${Math.max(defaultWidth, 80)}px`; // Minimum 80px per column
    };

    // Double-click to auto-resize column
    const handleDoubleClick = (columnKey: string, e: React.MouseEvent) => {
      e.stopPropagation();

      // Reset to original width or auto-fit content
      const column = columns.find((col) => col.key === columnKey);
      if (column) {
        const originalWidth = parseInt(column.width?.replace('px', '') || '150');
        setColumnWidths((prev) => ({ ...prev, [columnKey]: originalWidth }));
      }
    };

    const renderPagination = () => {
      if (displayMode !== 'pagination' || totalPages <= 1) return null;

      const pages = [];
      const maxVisiblePages = 3; // Show fewer pages on mobile
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Mobile: Info and pagination */}
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </div>
          
          <div className="flex items-center justify-center sm:justify-end">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              {pages.map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={cn(
                    'ring-offset-background focus-visible:ring-ring inline-flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
                    currentPage === page
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
                  )}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      );
    };

    const showSearch = filterMode === 'search' || filterMode === 'both';
    const showColumnFilters = filterMode === 'column' || filterMode === 'both';
    const hasFiltering = filterMode !== 'none';

    if (loading) {
      return (
        <div className={cn(dataTableVariants({ variant }), className)} ref={ref} {...props}>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">{loadingMessage}</div>
          </div>
        </div>
      );
    }

    return (
      <div className={cn(dataTableVariants({ variant }), 'w-full min-w-0', className)} ref={ref} {...props}>
        {/* Search and Filters */}
        {hasFiltering && (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {showSearch && (
              <div className="relative w-full sm:max-w-sm">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-10 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            )}
            {showColumnFilters && (
              <div className="flex items-center space-x-2">
                <Filter className="text-muted-foreground h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Filters active: {Object.values(columnFilters).filter(Boolean).length}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Table */}
        <div className="w-full min-w-0 overflow-hidden rounded-md border">
          <div
            className={cn('overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100')}
            style={{
              ...(displayMode === 'scroll' ? { maxHeight, overflowY: 'auto' } : undefined),
            }}
          >
          {/* Mobile Table Notice */}
          <div className="md:hidden bg-muted/50 border-b border-border px-3 py-2">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <svg className="h-3 w-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4" />
              </svg>
              <span className="truncate">Swipe to see all columns</span>
            </p>
          </div>
          <Table
            style={{
              tableLayout: 'fixed',
              width: `${totalTableWidth}px`,
              minWidth: `${Math.min(totalTableWidth, 320)}px`, // Ensure minimum width for mobile
            }}
          >
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => {
                  // 헤더 정렬 결정: headerAlign > align > 'left' (기본값)
                  const headerAlignment = column.headerAlign || column.align || 'left';
                  const isLastColumn = index === columns.length - 1;

                  return (
                    <TableHead
                      key={column.key}
                      style={{
                        width: getColumnWidth(column),
                        minWidth: getColumnWidth(column),
                        maxWidth: getColumnWidth(column),
                      }}
                      className={cn(
                        'relative',
                        column.sortable && 'hover:bg-muted/50 cursor-pointer select-none',
                      )}
                      onClick={(e) => {
                        // Only handle sort if click wasn't on resize handle
                        const target = e.target as HTMLElement;
                        const isResizeHandle = target.closest('[data-resize-handle="true"]');
                        if (column.sortable && !isResizeHandle) {
                          handleSort(column.key);
                        }
                      }}
                    >
                      <div
                        className={cn(
                          'flex items-center overflow-hidden text-xs sm:text-sm',
                          headerAlignment === 'center' && 'justify-center',
                          headerAlignment === 'right' && 'justify-end gap-1 sm:gap-2',
                          headerAlignment === 'left' && 'justify-start gap-1 sm:gap-2',
                        )}
                      >
                        {headerAlignment === 'center' ? (
                          <div className="relative flex w-full items-center justify-center">
                            <span className="truncate text-center text-[11px] sm:text-sm font-medium">{column.title}</span>
                            {column.sortable && (
                              <div className="absolute right-2 flex flex-col">
                                {getSortIcon(column.key)}
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            <span
                              className={cn(
                                'truncate text-[11px] sm:text-sm font-medium',
                                headerAlignment === 'right' && 'text-right',
                                headerAlignment === 'left' && 'flex-1',
                              )}
                            >
                              {column.title}
                            </span>
                            {column.sortable && (
                              <div className="flex flex-shrink-0 flex-col">
                                {getSortIcon(column.key)}
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Column Separator */}
                      {!isLastColumn && (
                        <div className="bg-border absolute top-1/2 right-0 h-4 w-px -translate-y-1/2" />
                      )}

                      {/* Column Resize Handle */}
                      {column.resizable !== false && (
                        <div
                          data-resize-handle="true"
                          className={cn(
                            'hover:bg-primary/30 absolute top-0 -right-2 z-20 flex h-full w-4 cursor-col-resize items-center justify-center transition-all duration-150',
                            isResizing === column.key && 'bg-primary/50',
                          )}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleResizeStart(column.key, e);
                          }}
                          onDoubleClick={(e) => {
                            e.stopPropagation();
                            handleDoubleClick(column.key, e);
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          title="드래그하여 크기 조정 / 더블클릭으로 원래 크기로 복원"
                        >
                          <div className="bg-border h-4 w-px" />
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
              {showColumnFilters && (
                <TableRow>
                  {columns.map((column, index) => {
                    return (
                      <TableHead
                        key={`filter-${column.key}`}
                        className={cn('p-2')}
                        style={{
                          width: getColumnWidth(column),
                          minWidth: getColumnWidth(column),
                          maxWidth: getColumnWidth(column),
                        }}
                      >
                        {column.filterable && (
                          <input
                            type="text"
                            placeholder={`Filter ${column.title.toLowerCase()}...`}
                            value={columnFilters[column.key] || ''}
                            onChange={(e) => handleColumnFilter(column.key, e.target.value)}
                            className="border-input bg-background placeholder:text-muted-foreground focus:ring-ring w-full rounded border px-2 py-1 text-xs focus:ring-1 focus:outline-none"
                          />
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              )}
            </TableHeader>
            <TableBody>
              {displayData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-muted-foreground py-8 text-center"
                  >
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                displayData.map((row, index) => (
                  <TableRow
                    key={index}
                    className={cn(onRowClick && 'hover:bg-muted/50 cursor-pointer')}
                    onClick={() => onRowClick?.(row, index)}
                  >
                    {columns.map((column, colIndex) => {
                      // 셀 정렬 결정: cellAlign > align > 'left' (기본값)
                      const cellAlignment = column.cellAlign || column.align || 'left';

                      return (
                        <TableCell
                          key={column.key}
                          style={{
                            width: getColumnWidth(column),
                            minWidth: getColumnWidth(column),
                            maxWidth: getColumnWidth(column),
                          }}
                          className={cn(
                            'truncate overflow-hidden text-xs sm:text-sm',
                            cellAlignment === 'center' && 'text-center',
                            cellAlignment === 'right' && 'text-right',
                            cellAlignment === 'left' && 'text-left',
                          )}
                        >
                          {column.render ? (
                            <div
                              className={cn(
                                'flex min-w-0 items-center',
                                cellAlignment === 'center' && 'justify-center',
                                cellAlignment === 'right' && 'justify-end',
                                cellAlignment === 'left' && 'justify-start',
                              )}
                              title={String(row[column.key] || '')}
                            >
                              <div
                                className={cn(
                                  'min-w-0',
                                  cellAlignment === 'center' && 'flex-shrink-0',
                                  (cellAlignment === 'left' || cellAlignment === 'right') &&
                                    'flex-1',
                                )}
                              >
                                {column.render(row[column.key], row, index)}
                              </div>
                            </div>
                          ) : (
                            <span className="block truncate text-[11px] sm:text-sm" title={String(row[column.key] || '')}>
                              {String(row[column.key] || '')}
                            </span>
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          </div>
        </div>

        {/* Pagination */}
        {renderPagination()}
      </div>
    );
  },
);

DataTable.displayName = 'DataTable';

export { DataTable, dataTableVariants };
