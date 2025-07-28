'use client';

import { Button } from '@/components/ui/Button';
import { NavigationItem, TopNavigator } from '@/components/ui/TopNavigator';
import { Typography } from '@/components/ui/Typography';
import { Building2, Home, Layers, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

const HomePage = () => {
  const navItems: NavigationItem[] = [
    {
      label: 'Home',
      href: '/',
      icon: <Home className="h-4 w-4" />,
      active: true,
    },
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      label: 'Components',
      href: '/demo',
      icon: <Layers className="h-4 w-4" />,
    },
    {
      label: 'Organizations',
      href: '/organizations',
      icon: <Building2 className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopNavigator items={navItems} />

      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Typography variant="h1" className="mb-3 sm:mb-4 text-3xl sm:text-4xl">
            Next.js Boilerplate
          </Typography>
          <Typography variant="muted" className="mb-6 sm:mb-8 text-base sm:text-lg">
            A modern React component library with TypeScript support
          </Typography>
          <div className="flex flex-col justify-center gap-2 sm:gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/demo">View Components</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/organizations">Organization Demo</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Login Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
