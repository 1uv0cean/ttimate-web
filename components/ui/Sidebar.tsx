'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { createContext, forwardRef, useContext, useState } from 'react';

const sidebarVariants = cva(
  'flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border-border',
        ghost: 'border-transparent',
        elevated: 'border-border shadow-lg',
      },
      size: {
        sm: 'w-48',
        md: 'w-64',
        lg: 'w-80',
      },
      position: {
        left: 'left-0',
        right: 'right-0',
      },
      mobile: {
        drawer: 'fixed inset-y-0 z-50 md:relative md:translate-x-0',
        overlay: 'fixed inset-y-0 z-50',
        hidden: 'hidden md:flex',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'left',
      mobile: 'hidden',
    },
  },
);

const sidebarItemVariants = cva(
  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent/50 hover:text-accent-foreground',
        subtle: 'hover:bg-muted hover:text-foreground',
      },
      active: {
        true: 'bg-accent text-accent-foreground',
        false: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
      active: false,
    },
  },
);

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  badgeVariant?: BadgeVariant;
  children?: SidebarItem[];
  disabled?: boolean;
}

export interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
  expandedItems: Set<string>;
  toggleExpanded: (id: string) => void;
  // Mobile context
  showOnMobile: boolean;
  setShowOnMobile: (show: boolean) => void;
  mobileOverlay: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  items: SidebarItem[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  defaultActiveItem?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onItemClick?: (item: SidebarItem) => void;
  // Mobile props
  showOnMobile?: boolean;
  onMobileClose?: () => void;
  mobileOverlay?: boolean;
}

const SidebarProvider = ({
  children,
  defaultCollapsed = false,
  defaultActiveItem,
  items,
  showOnMobile = false,
  mobileOverlay = true,
}: {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  defaultActiveItem?: string;
  items?: SidebarItem[];
  showOnMobile?: boolean;
  mobileOverlay?: boolean;
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [activeItem, setActiveItem] = useState<string | null>(defaultActiveItem || null);
  const [showOnMobileState, setShowOnMobile] = useState(showOnMobile);

  // Auto-expand parent menus based on active item
  const getInitialExpandedItems = () => {
    const expandedSet = new Set<string>();

    if (defaultActiveItem && items) {
      const findParentAndExpand = (itemList: SidebarItem[], targetId: string): boolean => {
        for (const item of itemList) {
          if (item.children) {
            // Check if target is in children
            const hasTarget = item.children.some((child) => child.id === targetId);
            if (hasTarget) {
              expandedSet.add(item.id);
              return true;
            }
            // Recursively check nested children
            if (findParentAndExpand(item.children, targetId)) {
              expandedSet.add(item.id);
              return true;
            }
          }
        }
        return false;
      };

      findParentAndExpand(items, defaultActiveItem);
    }

    return expandedSet;
  };

  const [expandedItems, setExpandedItems] = useState<Set<string>>(getInitialExpandedItems());

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        activeItem,
        setActiveItem,
        expandedItems,
        toggleExpanded,
        showOnMobile: showOnMobileState,
        setShowOnMobile,
        mobileOverlay,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

const getBadgeStyles = (variant: BadgeVariant = 'default') => {
  switch (variant) {
    case 'secondary':
      return 'bg-secondary text-secondary-foreground';
    case 'success':
      return 'bg-green-500 text-white';
    case 'warning':
      return 'bg-yellow-500 text-white';
    case 'error':
      return 'bg-red-500 text-white';
    case 'info':
      return 'bg-blue-500 text-white';
    default:
      return 'bg-primary text-primary-foreground';
  }
};

const SidebarItem = ({
  item,
  level = 0,
  onItemClick,
}: {
  item: SidebarItem;
  level?: number;
  onItemClick?: (item: SidebarItem) => void;
}) => {
  const { collapsed, activeItem, setActiveItem, expandedItems, toggleExpanded } = useSidebar();
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.has(item.id);
  const isActive = activeItem === item.id;

  const handleClick = () => {
    if (item.disabled) return;

    if (hasChildren) {
      toggleExpanded(item.id);
    } else {
      setActiveItem(item.id);
      if (item.onClick) {
        item.onClick();
      }
      if (onItemClick) {
        onItemClick(item);
      }
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (item.onClick) {
      e.preventDefault();
      handleClick();
    }
  };

  const itemContent = (
    <>
      {item.icon && (
        <span className={cn('shrink-0', collapsed && level === 0 && 'mx-auto')}>{item.icon}</span>
      )}
      {(!collapsed || level > 0) && (
        <>
          <span
            className={cn(
              'flex-1 truncate whitespace-nowrap transition-opacity duration-300',
              collapsed ? 'opacity-0' : 'opacity-100 delay-150',
            )}
          >
            {item.label}
          </span>
          {item.badge && (
            <span
              className={cn(
                'ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-2 text-xs font-medium transition-opacity duration-300',
                collapsed ? 'opacity-0' : 'opacity-100 delay-150',
                getBadgeStyles(item.badgeVariant),
              )}
            >
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <span
              className={cn(
                'ml-auto shrink-0 transition-opacity duration-300',
                collapsed ? 'opacity-0' : 'opacity-100 delay-150',
              )}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          )}
        </>
      )}
    </>
  );

  const itemClasses = cn(
    sidebarItemVariants({ active: isActive }),
    item.disabled && 'cursor-not-allowed opacity-50',
    level > 0 && 'ml-6 text-xs',
    collapsed && level === 0 && 'justify-center px-2 overflow-hidden',
    'transition-all duration-300 ease-in-out',
  );

  return (
    <div>
      {item.href ? (
        <a
          href={item.href}
          onClick={handleLinkClick}
          className={itemClasses}
          title={collapsed ? item.label : undefined}
        >
          {itemContent}
        </a>
      ) : (
        <div
          onClick={handleClick}
          className={itemClasses}
          title={collapsed ? item.label : undefined}
        >
          {itemContent}
        </div>
      )}

      {hasChildren && isExpanded && (!collapsed || level > 0) && (
        <div className="mt-1">
          {item.children!.map((child) => (
            <SidebarItem key={child.id} item={child} level={level + 1} onItemClick={onItemClick} />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      variant,
      size,
      position,
      items,
      collapsible = true,
      defaultCollapsed = false,
      defaultActiveItem,
      header,
      footer,
      onItemClick,
      showOnMobile = false,
      onMobileClose,
      mobileOverlay = true,
      ...props
    },
    ref,
  ) => {
    return (
      <SidebarProvider
        defaultCollapsed={defaultCollapsed}
        defaultActiveItem={defaultActiveItem}
        items={items}
        showOnMobile={showOnMobile}
        mobileOverlay={mobileOverlay}
      >
        <SidebarContent
          ref={ref}
          className={className}
          variant={variant}
          size={size}
          position={position}
          items={items}
          collapsible={collapsible}
          header={header}
          footer={footer}
          onItemClick={onItemClick}
          onMobileClose={onMobileClose}
          {...props}
        />
      </SidebarProvider>
    );
  },
);

const SidebarContent = forwardRef<
  HTMLDivElement,
  Omit<SidebarProps, 'defaultCollapsed' | 'defaultActiveItem'>
>(
  (
    {
      className,
      variant,
      size,
      position,
      items,
      collapsible,
      header,
      footer,
      onItemClick,
      onMobileClose,
      ...props
    },
    ref,
  ) => {
    const { collapsed, setCollapsed, showOnMobile, setShowOnMobile, mobileOverlay } = useSidebar();

    const sidebarClasses = cn(
      sidebarVariants({ 
        variant, 
        size: collapsed ? 'sm' : size, 
        position,
        mobile: showOnMobile ? (mobileOverlay ? 'overlay' : 'drawer') : 'hidden'
      }),
      collapsed && 'w-16',
      // Mobile-specific classes
      showOnMobile && mobileOverlay && position === 'left' && '-translate-x-full md:translate-x-0',
      showOnMobile && mobileOverlay && position === 'right' && 'translate-x-full md:translate-x-0',
      showOnMobile && mobileOverlay && 'data-[state=open]:translate-x-0',
      className,
    );

    // Close on mobile when clicking outside
    const handleOverlayClick = () => {
      if (showOnMobile && mobileOverlay) {
        setShowOnMobile(false);
        onMobileClose?.();
      }
    };

    // Close on item click on mobile
    const handleItemClick = (item: SidebarItem) => {
      onItemClick?.(item);
      // Close mobile sidebar when clicking on an item
      if (showOnMobile) {
        setShowOnMobile(false);
        onMobileClose?.();
      }
    };

    return (
      <>
        {/* Mobile Overlay */}
        {showOnMobile && mobileOverlay && (
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
            onClick={handleOverlayClick}
          />
        )}
        
        {/* Sidebar */}
        <div 
          ref={ref} 
          className={sidebarClasses} 
          data-state={showOnMobile ? 'open' : 'closed'}
          {...props}
        >
        {/* Header */}
        {(header || collapsible) && (
          <div className="border-border flex items-center justify-between overflow-hidden p-3 sm:p-4">
            {!collapsed && header && (
              <div
                className={cn(
                  'flex-1 overflow-hidden whitespace-nowrap transition-opacity duration-300',
                  collapsed ? 'opacity-0' : 'opacity-100 delay-150',
                )}
              >
                {header}
              </div>
            )}
            {collapsible && (
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none transition-colors"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </button>
            )}
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 p-3 sm:p-4 pt-2 overflow-y-auto">
          {items.map((item) => (
            <SidebarItem key={item.id} item={item} onItemClick={handleItemClick} />
          ))}
        </nav>

        {/* Footer */}
        {footer && (
          <div
            className={cn(
              'border-border border-t p-4 transition-all duration-300',
              collapsed ? 'h-0 overflow-hidden border-0 p-0 opacity-0' : 'opacity-100 delay-50',
            )}
          >
            {!collapsed && footer}
          </div>
        )}
        </div>
      </>
    );
  },
);

Sidebar.displayName = 'Sidebar';
SidebarContent.displayName = 'SidebarContent';

export { Sidebar, SidebarProvider, sidebarVariants };
