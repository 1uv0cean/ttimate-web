'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import {
  ChevronDown,
  Home,
  Info,
  Mail,
  Menu,
  Settings,
  ShoppingCart,
  Users,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { forwardRef, useEffect, useState } from 'react';

const topNavigatorVariants = cva(
  'flex items-center justify-between w-full bg-background border-b border-border transition-colors relative',
  {
    variants: {
      variant: {
        default: 'bg-background border-border',
        minimal: 'bg-transparent border-transparent',
        filled: 'bg-primary/5 border-primary/20',
        outline: 'border-2 border-border rounded-lg',
      },
      size: {
        sm: 'h-12 px-3 sm:px-4',
        md: 'h-14 sm:h-16 px-4 sm:px-6',
        lg: 'h-16 sm:h-20 px-4 sm:px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const navItemVariants = cva(
  'inline-flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md cursor-pointer select-none',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground hover:text-foreground hover:bg-accent',
        active: 'text-foreground bg-accent',
        disabled: 'text-muted-foreground/50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface NavigationItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: NavigationItem[];
}

export interface TopNavigatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof topNavigatorVariants> {
  logo?: React.ReactNode;
  logoText?: string;
  items?: NavigationItem[];
  actions?: React.ReactNode;
  showActions?: boolean;
  onItemClick?: (item: NavigationItem) => void;
}

const defaultItems: NavigationItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    label: 'Components',
    href: '/demo',
    icon: <Users className="h-4 w-4" />,
  },
  {
    label: 'About',
    href: '/about',
    icon: <Info className="h-4 w-4" />,
  },
  {
    label: 'Contact',
    href: '/contact',
    icon: <Mail className="h-4 w-4" />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="h-4 w-4" />,
    disabled: true,
  },
];

const TopNavigator = forwardRef<HTMLDivElement, TopNavigatorProps>(
  (
    {
      className,
      variant,
      size,
      logo,
      logoText = 'Next Boilerplate',
      items = defaultItems,
      actions,
      showActions = true,
      onItemClick,
      ...props
    },
    ref,
  ) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Close mobile menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
      };

      if (isMobileMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isMobileMenuOpen]);

    const handleItemClick = (item: NavigationItem) => {
      if (item.disabled) return;

      if (item.onClick) {
        item.onClick();
      }

      onItemClick?.(item);
      setOpenDropdown(null);
      setIsMobileMenuOpen(false); // Close mobile menu on item click
    };

    const toggleDropdown = (label: string) => {
      setOpenDropdown(openDropdown === label ? null : label);
    };

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const renderLogo = () => {
      if (logo) return logo;

      const [primaryText, secondaryText] = logoText.split(' ');

      return (
        <Link href="/" className="flex items-center gap-2 text-base sm:text-lg font-bold">
          <span className="text-primary">{primaryText}</span>
          {secondaryText && <span className="text-muted-foreground">{secondaryText}</span>}
        </Link>
      );
    };

    const renderNavItem = (item: NavigationItem, index: number, isMobile = false) => {
      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openDropdown === item.label;
      const itemVariant = item.disabled ? 'disabled' : item.active ? 'active' : 'default';

      if (hasChildren) {
        return (
          <div key={`${item.label}-${index}`} className={cn('relative', isMobile && 'w-full')}>
            <button
              className={cn(
                navItemVariants({ variant: itemVariant }),
                item.disabled && 'pointer-events-none',
                isMobile && 'w-full justify-between',
              )}
              onClick={() => !item.disabled && toggleDropdown(item.label)}
              disabled={item.disabled}
            >
              <div className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </div>
              <ChevronDown className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')} />
            </button>

            {isOpen && (
              <div
                className={cn(
                  'bg-background border-border z-50 rounded-md border shadow-lg',
                  isMobile ? 'mt-1 w-full' : 'absolute top-full left-0 mt-1 min-w-48',
                )}
              >
                <div className="py-1">
                  {item.children!.map((child, childIndex) => (
                    <button
                      key={`${child.label}-${childIndex}`}
                      className="hover:bg-accent flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors"
                      onClick={() => handleItemClick(child)}
                      disabled={child.disabled}
                    >
                      {child.icon}
                      {child.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      }

      return (
        <Link
          key={`${item.label}-${index}`}
          href={item.href || '#'}
          className={cn(
            navItemVariants({ variant: itemVariant }),
            item.disabled && 'pointer-events-none',
            isMobile && 'w-full',
          )}
          onClick={() => handleItemClick(item)}
        >
          {item.icon}
          {item.label}
        </Link>
      );
    };

    const renderActions = () => {
      if (actions) return actions;

      if (!showActions) return null;

      return (
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
        </div>
      );
    };

    return (
      <div ref={ref} className={cn(topNavigatorVariants({ variant, size }), className)} {...props}>
        {/* Logo */}
        <div className="flex items-center gap-2">{renderLogo()}</div>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {items.map((item, index) => renderNavItem(item, index, false))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center md:flex">{renderActions()}</div>

        {/* Mobile Menu Button */}
        <button
          className="hover:bg-accent rounded-md p-2 transition-colors md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="bg-background border-border absolute top-full right-0 left-0 z-50 border-b shadow-lg md:hidden">
            <div className="space-y-1 p-3 sm:p-4 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {items.map((item, index) => renderNavItem(item, index, true))}

              {showActions && (
                <div className="border-border space-y-2 border-t pt-4">
                  <Link
                    href="/login"
                    className="text-muted-foreground hover:text-foreground hover:bg-accent block w-full rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-primary hover:text-primary/80 hover:bg-accent block w-full rounded-md px-3 py-2 text-sm font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

TopNavigator.displayName = 'TopNavigator';

export { TopNavigator, topNavigatorVariants };
