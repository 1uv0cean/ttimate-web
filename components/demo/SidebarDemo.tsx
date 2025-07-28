'use client';

import { Sidebar, SidebarItem } from '@/components/ui/Sidebar';
import { useToast } from '@/components/ui/Toast';
import {
  BarChart3,
  Bell,
  Calendar,
  Download,
  FileText,
  Folder,
  Home,
  Image,
  LogOut,
  Mail,
  Music,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Trash,
  User,
  Users,
  Video,
} from 'lucide-react';
import { useState } from 'react';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => {
  return (
    <section
      className={`space-y-3 sm:space-y-6 rounded-lg border border-gray-200 bg-white p-3 sm:p-6 shadow-sm ${className}`}
    >
      <h3 className="border-b border-gray-100 pb-2 text-base sm:text-xl font-semibold text-gray-900">{title}</h3>
      {children}
    </section>
  );
};

interface DemoItemProps {
  label: string;
  children: React.ReactNode;
}

const DemoItem = ({ label, children }: DemoItemProps) => {
  return (
    <div className="space-y-3">
      <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-gray-700 uppercase">{label}</h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export const SidebarDemo = () => {
  const { toast } = useToast();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Basic sidebar items
  const basicItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      href: '/dashboard',
    },
    {
      id: 'users',
      label: 'Users',
      icon: <Users className="h-4 w-4" />,
      badge: '12',
      badgeVariant: 'info',
      onClick: () => toast.info('Navigate', 'Users page clicked'),
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      badge: '5',
      badgeVariant: 'success',
      onClick: () => toast.info('Navigate', 'Analytics page clicked'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      onClick: () => toast.info('Navigate', 'Settings page clicked'),
    },
  ];

  // Nested sidebar items
  const nestedItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      href: '/dashboard',
    },
    {
      id: 'ecommerce',
      label: 'E-commerce',
      icon: <ShoppingCart className="h-4 w-4" />,
      children: [
        {
          id: 'products',
          label: 'Products',
          icon: <Package className="h-4 w-4" />,
          badge: '12',
          badgeVariant: 'info',
          onClick: () => toast.info('Navigate', 'Products page clicked'),
        },
        {
          id: 'orders',
          label: 'Orders',
          icon: <FileText className="h-4 w-4" />,
          badge: 'New',
          badgeVariant: 'warning',
          onClick: () => toast.info('Navigate', 'Orders page clicked'),
        },
        {
          id: 'customers',
          label: 'Customers',
          icon: <Users className="h-4 w-4" />,
          onClick: () => toast.info('Navigate', 'Customers page clicked'),
        },
      ],
    },
    {
      id: 'content',
      label: 'Content',
      icon: <FileText className="h-4 w-4" />,
      children: [
        {
          id: 'posts',
          label: 'Posts',
          onClick: () => toast.info('Navigate', 'Posts page clicked'),
        },
        {
          id: 'pages',
          label: 'Pages',
          onClick: () => toast.info('Navigate', 'Pages page clicked'),
        },
        {
          id: 'media',
          label: 'Media',
          children: [
            {
              id: 'images',
              label: 'Images',
              icon: <Image className="h-4 w-4" />,
              onClick: () => toast.info('Navigate', 'Images page clicked'),
            },
            {
              id: 'videos',
              label: 'Videos',
              icon: <Video className="h-4 w-4" />,
              onClick: () => toast.info('Navigate', 'Videos page clicked'),
            },
            {
              id: 'audio',
              label: 'Audio',
              icon: <Music className="h-4 w-4" />,
              onClick: () => toast.info('Navigate', 'Audio page clicked'),
            },
          ],
        },
      ],
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      badge: '99+',
      badgeVariant: 'error',
      onClick: () => toast.info('Navigate', 'Analytics page clicked'),
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="h-4 w-4" />,
      onClick: () => toast.info('Navigate', 'Settings page clicked'),
    },
  ];

  // Application sidebar
  const appItems: SidebarItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="h-4 w-4" />,
      onClick: () => toast.success('Navigate', 'Home page'),
    },
    {
      id: 'search',
      label: 'Search',
      icon: <Search className="h-4 w-4" />,
      onClick: () => toast.info('Navigate', 'Search page'),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="h-4 w-4" />,
      badge: 3,
      onClick: () => toast.info('Navigate', '3 new notifications'),
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <Mail className="h-4 w-4" />,
      badge: 'New',
      onClick: () => toast.info('Navigate', 'Messages page'),
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: <Calendar className="h-4 w-4" />,
      onClick: () => toast.info('Navigate', 'Calendar page'),
    },
    {
      id: 'files',
      label: 'Files',
      icon: <Folder className="h-4 w-4" />,
      children: [
        {
          id: 'recent',
          label: 'Recent',
          onClick: () => toast.info('Navigate', 'Recent files'),
        },
        {
          id: 'shared',
          label: 'Shared',
          onClick: () => toast.info('Navigate', 'Shared files'),
        },
        {
          id: 'starred',
          label: 'Starred',
          icon: <Star className="h-4 w-4" />,
          onClick: () => toast.info('Navigate', 'Starred files'),
        },
        {
          id: 'downloads',
          label: 'Downloads',
          icon: <Download className="h-4 w-4" />,
          onClick: () => toast.info('Navigate', 'Downloads folder'),
        },
        {
          id: 'trash',
          label: 'Trash',
          icon: <Trash className="h-4 w-4" />,
          onClick: () => toast.warning('Navigate', 'Trash folder'),
        },
      ],
    },
  ];

  // Badge color examples
  const badgeItems: SidebarItem[] = [
    {
      id: 'notifications',
      label: 'Notifications',
      icon: <Bell className="h-4 w-4" />,
      badge: '3',
      badgeVariant: 'default',
      onClick: () => toast.info('Navigate', 'Default badge clicked'),
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: <Mail className="h-4 w-4" />,
      badge: 'New',
      badgeVariant: 'success',
      onClick: () => toast.success('Navigate', 'Success badge clicked'),
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: <Bell className="h-4 w-4" />,
      badge: '!',
      badgeVariant: 'warning',
      onClick: () => toast.warning('Navigate', 'Warning badge clicked'),
    },
    {
      id: 'errors',
      label: 'Errors',
      icon: <Bell className="h-4 w-4" />,
      badge: '5',
      badgeVariant: 'error',
      onClick: () => toast.error('Navigate', 'Error badge clicked'),
    },
    {
      id: 'info',
      label: 'Information',
      icon: <Bell className="h-4 w-4" />,
      badge: '12',
      badgeVariant: 'info',
      onClick: () => toast.info('Navigate', 'Info badge clicked'),
    },
    {
      id: 'secondary',
      label: 'Secondary',
      icon: <Bell className="h-4 w-4" />,
      badge: 'Beta',
      badgeVariant: 'secondary',
      onClick: () => toast.info('Navigate', 'Secondary badge clicked'),
    },
  ];

  const headerContent = (
    <div className="flex items-center gap-3">
      <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-lg">
        <Package className="h-4 w-4" />
      </div>
      <div>
        <div className="text-sm font-semibold">My App</div>
        <div className="text-muted-foreground text-xs">Dashboard</div>
      </div>
    </div>
  );

  const footerContent = (
    <div className="space-y-2">
      <div className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm">
        <User className="h-4 w-4" />
        <span className="flex-1">Profile</span>
      </div>
      <div className="hover:bg-accent hover:text-accent-foreground flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600">
        <LogOut className="h-4 w-4" />
        <span className="flex-1">Logout</span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 sm:p-4">
        <p className="text-xs sm:text-sm text-blue-800">
          <strong>Note:</strong> These sidebars are interactive demos. Click on menu items to see
          toast notifications. Try the collapse/expand functionality on collapsible sidebars.
        </p>
      </div>

      <DemoSection title="Basic Examples">
        <div className="space-y-8">
          <DemoItem label="Simple Sidebar">
            <div className="h-96 overflow-hidden rounded-lg border">
              <Sidebar items={basicItems} defaultActiveItem="dashboard" />
            </div>
          </DemoItem>

          <DemoItem label="Collapsible Sidebar">
            <div className="h-96 overflow-hidden rounded-lg border">
              <Sidebar
                items={basicItems}
                collapsible={true}
                defaultCollapsed={false}
                defaultActiveItem="users"
                header={headerContent}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Variants">
        <div className="space-y-8">
          <DemoItem label="Ghost Variant">
            <div className="h-80 overflow-hidden rounded-lg border">
              <Sidebar
                items={basicItems.slice(0, 3)}
                variant="ghost"
                defaultActiveItem="analytics"
              />
            </div>
          </DemoItem>

          <DemoItem label="Elevated Variant">
            <div className="h-80 overflow-hidden rounded-lg border bg-gray-50">
              <Sidebar
                items={basicItems.slice(0, 3)}
                variant="elevated"
                defaultActiveItem="users"
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="space-y-8">
          <DemoItem label="Small Size">
            <div className="h-80 overflow-hidden rounded-lg border">
              <Sidebar items={basicItems.slice(0, 3)} size="sm" defaultActiveItem="dashboard" />
            </div>
          </DemoItem>

          <DemoItem label="Large Size">
            <div className="h-80 overflow-hidden rounded-lg border">
              <Sidebar
                items={basicItems}
                size="lg"
                defaultActiveItem="settings"
                header={headerContent}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Badge Colors">
        <div className="space-y-8">
          <DemoItem label="Different Badge Variants">
            <div className="h-96 overflow-hidden rounded-lg border">
              <Sidebar
                items={badgeItems}
                defaultActiveItem="notifications"
                header={<div className="text-lg font-semibold">Badge Examples</div>}
              />
            </div>
          </DemoItem>

          <DemoItem label="Badge Color Legend">
            <div className="bg-muted/30 grid grid-cols-2 gap-4 rounded-lg p-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground inline-flex h-5 w-5 items-center justify-center rounded-full text-xs">
                  3
                </span>
                <span className="text-sm">default</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-secondary text-secondary-foreground inline-flex h-5 w-5 items-center justify-center rounded-full text-xs">
                  3
                </span>
                <span className="text-sm">secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  3
                </span>
                <span className="text-sm">success</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs text-white">
                  3
                </span>
                <span className="text-sm">warning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
                <span className="text-sm">error</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                  3
                </span>
                <span className="text-sm">info</span>
              </div>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Nested Navigation">
        <div className="space-y-8">
          <DemoItem label="Multi-level Menu">
            <div className="h-[500px] overflow-hidden rounded-lg border">
              <Sidebar
                items={nestedItems}
                collapsible={true}
                defaultActiveItem="products"
                header={headerContent}
                footer={footerContent}
              />
            </div>
          </DemoItem>

          <DemoItem label="Collapsed with Nested Items">
            <div className="h-[500px] overflow-hidden rounded-lg border">
              <Sidebar
                items={nestedItems}
                collapsible={true}
                defaultCollapsed={true}
                defaultActiveItem="orders"
                header={<Package className="h-6 w-6" />}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Mobile Responsive Features">
        <div className="space-y-8">
          <DemoItem label="Mobile Sidebar with Overlay">
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-4 text-sm text-gray-600">
                On mobile devices (768px), the sidebar becomes an overlay. Try resizing your browser
                or viewing on mobile.
              </p>
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 transition-colors"
              >
                Open Mobile Sidebar
              </button>
              {showMobileSidebar && (
                <Sidebar
                  items={basicItems}
                  showOnMobile={true}
                  mobileOverlay={true}
                  onMobileClose={() => setShowMobileSidebar(false)}
                  defaultActiveItem="dashboard"
                  header={headerContent}
                  footer={footerContent}
                />
              )}
            </div>
          </DemoItem>

          <DemoItem label="Responsive Layout Demo">
            <div className="overflow-hidden rounded-lg border bg-gray-100">
              <div className="border-b bg-gray-200 p-2 text-xs text-gray-500">
                Resize browser to see responsive behavior (hidden on desktop, overlay on mobile)
              </div>
              <div className="relative h-80">
                <Sidebar
                  items={basicItems.slice(0, 4)}
                  className="md:hidden" // Show only on mobile
                  showOnMobile={true}
                  mobileOverlay={false}
                  defaultActiveItem="users"
                  header={<div className="text-sm font-semibold">Mobile Nav</div>}
                />
                <div className="hidden md:flex md:h-full md:items-center md:justify-center md:text-gray-500">
                  Desktop view - sidebar is hidden. Resize to mobile size to see it.
                </div>
              </div>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Real-World Examples">
        <div className="space-y-8">
          <DemoItem label="Application Sidebar">
            <div className="h-[600px] overflow-hidden rounded-lg border">
              <Sidebar
                items={appItems}
                collapsible={true}
                defaultActiveItem="notifications"
                header={
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
                    <div>
                      <div className="text-sm font-semibold">WorkSpace</div>
                      <div className="text-muted-foreground text-xs">Personal</div>
                    </div>
                  </div>
                }
                footer={
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-300" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">John Doe</div>
                      <div className="text-muted-foreground truncate text-xs">john@example.com</div>
                    </div>
                  </div>
                }
              />
            </div>
          </DemoItem>

          <DemoItem label="Admin Dashboard">
            <div className="h-[500px] overflow-hidden rounded-lg border">
              <Sidebar
                items={[
                  {
                    id: 'overview',
                    label: 'Overview',
                    icon: <BarChart3 className="h-4 w-4" />,
                    onClick: () => toast.info('Admin', 'Overview dashboard'),
                  },
                  {
                    id: 'users-mgmt',
                    label: 'User Management',
                    icon: <Users className="h-4 w-4" />,
                    badge: '142',
                    children: [
                      {
                        id: 'all-users',
                        label: 'All Users',
                        onClick: () => toast.info('Admin', 'All users page'),
                      },
                      {
                        id: 'roles',
                        label: 'Roles & Permissions',
                        onClick: () => toast.info('Admin', 'Roles page'),
                      },
                      {
                        id: 'activity',
                        label: 'Activity Log',
                        badge: 'New',
                        onClick: () => toast.info('Admin', 'Activity log'),
                      },
                    ],
                  },
                  {
                    id: 'system',
                    label: 'System',
                    icon: <Settings className="h-4 w-4" />,
                    children: [
                      {
                        id: 'config',
                        label: 'Configuration',
                        onClick: () => toast.info('Admin', 'System config'),
                      },
                      {
                        id: 'monitoring',
                        label: 'Monitoring',
                        badge: '!',
                        onClick: () => toast.warning('Admin', 'System monitoring'),
                      },
                      {
                        id: 'backup',
                        label: 'Backup',
                        onClick: () => toast.info('Admin', 'Backup management'),
                      },
                    ],
                  },
                ]}
                variant="elevated"
                collapsible={true}
                defaultActiveItem="all-users"
                header={<div className="text-primary text-lg font-bold">Admin Panel</div>}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};
