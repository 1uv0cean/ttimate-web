'use client';

import { TopNavigator, NavigationItem } from '@/components/ui/TopNavigator';
import { Button } from '@/components/ui/Button';
import { Code2, Database, Globe, Monitor, Palette, Zap, Star, Bell } from 'lucide-react';
import { useState } from 'react';

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

export const TopNavigatorDemo = () => {
  const [variant, setVariant] = useState<'default' | 'minimal' | 'filled' | 'outline'>('default');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showActions, setShowActions] = useState(true);

  const customItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <Monitor className="h-4 w-4" />,
      active: true,
    },
    {
      label: 'Development',
      href: '/dev',
      icon: <Code2 className="h-4 w-4" />,
      children: [
        {
          label: 'Frontend',
          href: '/dev/frontend',
          icon: <Globe className="h-4 w-4" />,
        },
        {
          label: 'Backend',
          href: '/dev/backend',
          icon: <Database className="h-4 w-4" />,
        },
        {
          label: 'Performance',
          href: '/dev/performance',
          icon: <Zap className="h-4 w-4" />,
        },
      ],
    },
    {
      label: 'Design',
      href: '/design',
      icon: <Palette className="h-4 w-4" />,
    },
    {
      label: 'Favorites',
      href: '/favorites',
      icon: <Star className="h-4 w-4" />,
      disabled: true,
    },
  ];

  const customActions = (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm">
        <Bell className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm">Login</Button>
      <Button size="sm">Sign Up</Button>
    </div>
  );

  return (
    <div className="max-w-full space-y-6 sm:space-y-8">
      <DemoSection title="Default Top Navigator">
        <div className="space-y-4">
          <TopNavigator />
          <p className="text-sm text-muted-foreground">
            A simple navigation component with default items, logo, and actions.
          </p>
        </div>
      </DemoSection>

      <DemoSection title="Navigation Variants">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {(['default', 'minimal', 'filled', 'outline'] as const).map((v) => (
              <Button
                key={v}
                variant={variant === v ? 'default' : 'outline'}
                size="sm"
                onClick={() => setVariant(v)}
                className="capitalize"
              >
                {v}
              </Button>
            ))}
          </div>
          
          <TopNavigator variant={variant} />
        </div>
      </DemoSection>

      <DemoSection title="Navigation Sizes">
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <Button
                key={s}
                variant={size === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSize(s)}
                className="uppercase"
              >
                {s}
              </Button>
            ))}
          </div>
          
          <TopNavigator size={size} variant="outline" />
        </div>
      </DemoSection>

      <DemoSection title="Custom Items & Logo">
        <div className="space-y-4">
          <TopNavigator
            items={customItems}
            logoText="Dev Portal"
            variant="filled"
            onItemClick={(item) => console.log('Clicked:', item.label)}
          />
          <p className="text-sm text-muted-foreground">
            Custom navigation items with dropdowns, active states, and disabled items.
          </p>
        </div>
      </DemoSection>

      <DemoSection title="Custom Actions">
        <div className="space-y-4">
          <TopNavigator
            logoText="My App"
            actions={customActions}
            variant="minimal"
          />
          <p className="text-sm text-muted-foreground">
            Custom action buttons instead of default login/signup links.
          </p>
        </div>
      </DemoSection>

      <DemoSection title="Without Actions">
        <div className="space-y-4">
          <TopNavigator
            logoText="Simple Nav"
            showActions={false}
            variant="outline"
            size="sm"
          />
          <p className="text-sm text-muted-foreground">
            Navigation without any action buttons or links.
          </p>
        </div>
      </DemoSection>

      <DemoSection title="Interactive Example">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showActions}
                onChange={(e) => setShowActions(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Show Actions</span>
            </label>
          </div>
          
          <TopNavigator
            items={customItems}
            showActions={showActions}
            logoText="Interactive Demo"
            variant={variant}
            size={size}
            onItemClick={(item) => {
              alert(`Navigation clicked: ${item.label}`);
            }}
          />
          <p className="text-sm text-muted-foreground">
            Try clicking navigation items and toggling the show actions checkbox.
          </p>
        </div>
      </DemoSection>

      <DemoSection title="In Card Layout">
        <div className="rounded-lg border bg-card p-4">
          <TopNavigator
            logoText="Card Nav"
            variant="minimal"
            size="sm"
            className="border-0"
          />
          <div className="mt-4 p-4 bg-muted/50 rounded text-center text-sm text-muted-foreground">
            Navigation component used inside a card layout
          </div>
        </div>
      </DemoSection>
    </div>
  );
};
