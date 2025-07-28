'use client';

import { Breadcrumb, BreadcrumbItem } from '@/components/ui/Breadcrumb';
import { useToast } from '@/components/ui/Toast';
import { 
  Home, 
  Folder, 
  FileText, 
  Users, 
  Settings, 
  ShoppingCart, 
  Package,
  ChevronRight,
  Slash,
  Dot
} from 'lucide-react';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => {
  return (
    <section
      className={`space-y-4 sm:space-y-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm ${className}`}
    >
      <h3 className="border-b border-gray-100 pb-2 text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
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
    <div className="space-y-2 sm:space-y-3">
      <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-gray-700 uppercase">{label}</h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export const BreadcrumbDemo = () => {
  const { toast } = useToast();

  // Basic breadcrumb items
  const basicItems: BreadcrumbItem[] = [
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Laptops', href: '/products/electronics/laptops' },
    { label: 'MacBook Pro' },
  ];

  // Items with icons
  const iconItems: BreadcrumbItem[] = [
    { 
      label: 'Dashboard', 
      href: '/dashboard',
      icon: <Home className="h-4 w-4" />
    },
    { 
      label: 'Users', 
      href: '/dashboard/users',
      icon: <Users className="h-4 w-4" />
    },
    { 
      label: 'Profile', 
      href: '/dashboard/users/profile',
      icon: <Settings className="h-4 w-4" />
    },
    { 
      label: 'Edit Profile',
      icon: <FileText className="h-4 w-4" />
    },
  ];

  // Items with click handlers
  const clickableItems: BreadcrumbItem[] = [
    { 
      label: 'Home', 
      onClick: () => toast.info('Navigate to Home', 'Clicked on Home breadcrumb')
    },
    { 
      label: 'Category', 
      onClick: () => toast.info('Navigate to Category', 'Clicked on Category breadcrumb')
    },
    { 
      label: 'Subcategory', 
      onClick: () => toast.info('Navigate to Subcategory', 'Clicked on Subcategory breadcrumb')
    },
    { 
      label: 'Current Page'
    },
  ];

  // Long breadcrumb for collapse demo
  const longItems: BreadcrumbItem[] = [
    { label: 'Root', href: '/' },
    { label: 'Level 1', href: '/level1' },
    { label: 'Level 2', href: '/level1/level2' },
    { label: 'Level 3', href: '/level1/level2/level3' },
    { label: 'Level 4', href: '/level1/level2/level3/level4' },
    { label: 'Level 5', href: '/level1/level2/level3/level4/level5' },
    { label: 'Current Page' },
  ];

  // File system example
  const fileSystemItems: BreadcrumbItem[] = [
    { 
      label: 'Documents', 
      href: '/documents',
      icon: <Folder className="h-4 w-4" />
    },
    { 
      label: 'Projects', 
      href: '/documents/projects',
      icon: <Folder className="h-4 w-4" />
    },
    { 
      label: 'Web App', 
      href: '/documents/projects/webapp',
      icon: <Folder className="h-4 w-4" />
    },
    { 
      label: 'README.md',
      icon: <FileText className="h-4 w-4" />
    },
  ];

  // E-commerce example
  const ecommerceItems: BreadcrumbItem[] = [
    { 
      label: 'Shop', 
      href: '/shop',
      icon: <ShoppingCart className="h-4 w-4" />
    },
    { 
      label: 'Electronics', 
      href: '/shop/electronics' 
    },
    { 
      label: 'Computers', 
      href: '/shop/electronics/computers' 
    },
    { 
      label: 'Gaming Laptop',
      icon: <Package className="h-4 w-4" />
    },
  ];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Simple Breadcrumb">
            <Breadcrumb items={basicItems} />
          </DemoItem>

          <DemoItem label="Without Home Icon">
            <Breadcrumb items={basicItems} showHome={false} />
          </DemoItem>

          <DemoItem label="With Custom Home">
            <Breadcrumb 
              items={basicItems} 
              homeHref="/dashboard"
              onHomeClick={() => toast.success('Home clicked', 'Navigating to dashboard')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Small Size">
            <Breadcrumb items={basicItems.slice(0, 3)} size="sm" />
          </DemoItem>

          <DemoItem label="Medium Size (Default)">
            <Breadcrumb items={basicItems.slice(0, 3)} size="md" />
          </DemoItem>

          <DemoItem label="Large Size">
            <Breadcrumb items={basicItems.slice(0, 3)} size="lg" />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Style Variants">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Default Style">
            <Breadcrumb items={basicItems.slice(0, 3)} variant="default" />
          </DemoItem>

          <DemoItem label="Ghost Style">
            <Breadcrumb items={basicItems.slice(0, 3)} variant="ghost" />
          </DemoItem>

          <DemoItem label="Outline Style">
            <Breadcrumb items={basicItems.slice(0, 3)} variant="outline" />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="With Icons">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Icon Breadcrumbs">
            <Breadcrumb items={iconItems} />
          </DemoItem>

          <DemoItem label="File System Navigation">
            <Breadcrumb items={fileSystemItems} />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Interactive Features">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Clickable Items">
            <Breadcrumb items={clickableItems} />
          </DemoItem>

          <DemoItem label="Mixed Navigation">
            <Breadcrumb 
              items={[
                { label: 'Products', href: '/products' },
                { 
                  label: 'Category', 
                  onClick: () => toast.info('Category', 'Category breadcrumb clicked') 
                },
                { label: 'Current Item' }
              ]} 
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Custom Separators">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Slash Separator">
            <Breadcrumb 
              items={basicItems.slice(0, 3)} 
              separator={<Slash className="h-4 w-4" />} 
            />
          </DemoItem>

          <DemoItem label="Dot Separator">
            <Breadcrumb 
              items={basicItems.slice(0, 3)} 
              separator={<Dot className="h-4 w-4" />} 
            />
          </DemoItem>

          <DemoItem label="Text Separator">
            <Breadcrumb 
              items={basicItems.slice(0, 3)} 
              separator={<span className="text-muted-foreground">→</span>} 
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Long Breadcrumbs">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Full Length">
            <Breadcrumb items={longItems} />
          </DemoItem>

          <DemoItem label="Collapsed (Max 4 items)">
            <Breadcrumb items={longItems} maxItems={4} />
          </DemoItem>

          <DemoItem label="Collapsed (Max 3 items)">
            <Breadcrumb items={longItems} maxItems={3} />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Real-World Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="E-commerce Navigation">
            <div className="space-y-3">
              <Breadcrumb items={ecommerceItems} />
              <p className="text-xs text-muted-foreground">
                Typical product page navigation in an online store
              </p>
            </div>
          </DemoItem>

          <DemoItem label="Admin Dashboard">
            <div className="space-y-3">
              <Breadcrumb 
                items={[
                  { 
                    label: 'Dashboard', 
                    href: '/admin',
                    icon: <Home className="h-4 w-4" />
                  },
                  { 
                    label: 'Users', 
                    href: '/admin/users',
                    icon: <Users className="h-4 w-4" />
                  },
                  { 
                    label: 'User Settings',
                    icon: <Settings className="h-4 w-4" />
                  },
                ]}
                variant="outline"
              />
              <p className="text-xs text-muted-foreground">
                Admin panel navigation with outlined style
              </p>
            </div>
          </DemoItem>

          <DemoItem label="Documentation Site">
            <div className="space-y-3">
              <Breadcrumb 
                items={[
                  { label: 'Docs', href: '/docs' },
                  { label: 'Components', href: '/docs/components' },
                  { label: 'Navigation', href: '/docs/components/navigation' },
                  { label: 'Breadcrumb' },
                ]}
                size="sm"
                showHome={false}
              />
              <p className="text-xs text-muted-foreground">
                Documentation navigation without home icon
              </p>
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};