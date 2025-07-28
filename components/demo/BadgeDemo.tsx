'use client';

import { Badge } from '@/components/ui/Badge';
import { Typography } from '@/components/ui/Typography';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Heart,
  Mail,
  Settings,
  Shield,
  Star,
  Users,
  Zap,
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
      className={`space-y-4 sm:space-y-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm ${className}`}
    >
      <h3 className="border-b border-gray-100 pb-2 text-lg sm:text-xl font-semibold text-gray-900">{title}</h3>
      {children}
    </section>
  );
};

export const BadgeDemo = () => {
  const [dismissibleBadges, setDismissibleBadges] = useState([
    { id: 1, label: 'React', variant: 'default' as const },
    { id: 2, label: 'TypeScript', variant: 'info' as const },
    { id: 3, label: 'Next.js', variant: 'success' as const },
    { id: 4, label: 'Tailwind', variant: 'purple' as const },
  ]);

  const removeBadge = (id: number) => {
    setDismissibleBadges((prev) => prev.filter((badge) => badge.id !== id));
  };

  return (
    <div className="max-w-full space-y-6 sm:space-y-8">
      <DemoSection title="Basic Variants">
        <div className="flex flex-wrap gap-3">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="info">Info</Badge>
          <Badge variant="muted">Muted</Badge>
        </div>
        <Typography variant="small" color="muted">
          Various color variants for different contexts and meanings
        </Typography>
      </DemoSection>

      <DemoSection title="Color Variants">
        <div className="flex flex-wrap gap-3">
          <Badge variant="purple">Purple</Badge>
          <Badge variant="pink">Pink</Badge>
          <Badge variant="indigo">Indigo</Badge>
          <Badge variant="teal">Teal</Badge>
          <Badge variant="success">Green</Badge>
          <Badge variant="warning">Yellow</Badge>
          <Badge variant="info">Blue</Badge>
          <Badge variant="destructive">Red</Badge>
        </div>
        <Typography variant="small" color="muted">
          Extended color palette for visual distinction and categorization
        </Typography>
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="flex flex-wrap items-center gap-4">
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
          <Badge size="lg">Large</Badge>
        </div>
        <Typography variant="small" color="muted">
          Different sizes to fit various UI contexts
        </Typography>
      </DemoSection>

      <DemoSection title="Shapes">
        <div className="flex flex-wrap gap-3">
          <Badge shape="rounded">Rounded</Badge>
          <Badge shape="square">Square</Badge>
          <Badge shape="pill">Pill Shape</Badge>
        </div>
        <Typography variant="small" color="muted">
          Various shapes for different design preferences
        </Typography>
      </DemoSection>

      <DemoSection title="With Icons">
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" icon={<CheckCircle className="h-3 w-3" />}>
            Completed
          </Badge>
          <Badge variant="warning" icon={<Clock className="h-3 w-3" />}>
            Pending
          </Badge>
          <Badge variant="destructive" icon={<AlertCircle className="h-3 w-3" />}>
            Error
          </Badge>
          <Badge variant="info" icon={<Mail className="h-3 w-3" />}>
            New Message
          </Badge>
          <Badge variant="purple" icon={<Star className="h-3 w-3" />}>
            Featured
          </Badge>
        </div>
        <Typography variant="small" color="muted">
          Icons help convey meaning and improve visual recognition
        </Typography>
      </DemoSection>

      <DemoSection title="With Dot Indicators">
        <div className="flex flex-wrap gap-3">
          <Badge variant="success" dot>
            Online
          </Badge>
          <Badge variant="warning" dot>
            Away
          </Badge>
          <Badge variant="destructive" dot>
            Offline
          </Badge>
          <Badge variant="info" dot>
            Busy
          </Badge>
          <Badge variant="muted" dot>
            Inactive
          </Badge>
        </div>
        <Typography variant="small" color="muted">
          Dot indicators for status representation
        </Typography>
      </DemoSection>

      <DemoSection title="Dismissible Badges">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {dismissibleBadges.map((badge) => (
              <Badge
                key={badge.id}
                variant={badge.variant}
                dismissible
                onDismiss={() => removeBadge(badge.id)}
              >
                {badge.label}
              </Badge>
            ))}
          </div>
          <Typography variant="small" color="muted">
            Click the × button to dismiss badges. Try removing some tags above!
          </Typography>
        </div>
      </DemoSection>

      <DemoSection title="Custom Colors">
        <div className="flex flex-wrap gap-3">
          <Badge customColor="#ff6b6b">Custom Red</Badge>
          <Badge customColor="#4ecdc4">Custom Teal</Badge>
          <Badge customColor="#45b7d1">Custom Blue</Badge>
          <Badge customColor="#f9ca24">Custom Yellow</Badge>
          <Badge customColor="#6c5ce7">Custom Purple</Badge>
          <Badge customColor="#fd79a8">Custom Pink</Badge>
        </div>
        <Typography variant="small" color="muted">
          Use custom hex colors for brand-specific badges
        </Typography>
      </DemoSection>

      <DemoSection title="Usage Examples">
        <div className="space-y-4 sm:space-y-6">
          {/* User Profile */}
          <div className="space-y-2">
            <Typography variant="small" weight="medium">
              User Profile
            </Typography>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
              <div className="space-y-1">
                <Typography variant="small" weight="medium">
                  John Doe
                </Typography>
                <div className="flex gap-2">
                  <Badge variant="success" size="sm" dot>
                    Online
                  </Badge>
                  <Badge variant="purple" size="sm">
                    Premium
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Notification */}
          <div className="space-y-2">
            <Typography variant="small" weight="medium">
              Notification
            </Typography>
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <Typography variant="small">You have new messages</Typography>
              </div>
              <Badge variant="destructive" size="sm">
                3
              </Badge>
            </div>
          </div>

          {/* Task Status */}
          <div className="space-y-2">
            <Typography variant="small" weight="medium">
              Task Management
            </Typography>
            <div className="space-y-2">
              {[
                { task: 'Design Review', status: 'success', label: 'Done' },
                { task: 'Code Implementation', status: 'warning', label: 'In Progress' },
                { task: 'Testing', status: 'muted', label: 'Pending' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded p-2 hover:bg-gray-50"
                >
                  <Typography variant="small">{item.task}</Typography>
                  <Badge variant={item.status as any} size="sm">
                    {item.label}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Tags */}
          <div className="space-y-2">
            <Typography variant="small" weight="medium">
              Feature Tags
            </Typography>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge variant="info" icon={<Zap className="h-3 w-3" />}>
                  Fast
                </Badge>
                <Badge variant="success" icon={<Shield className="h-3 w-3" />}>
                  Secure
                </Badge>
                <Badge variant="purple" icon={<Heart className="h-3 w-3" />}>
                  Loved
                </Badge>
                <Badge variant="warning" icon={<Settings className="h-3 w-3" />}>
                  Configurable
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Accessibility & States">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Normal</Badge>
            <Badge variant="default" className="opacity-75">
              Disabled State
            </Badge>
            <Badge variant="outline" className="ring-primary ring-2">
              Focused
            </Badge>
            <Badge
              variant="secondary"
              className="cursor-pointer transition-transform hover:scale-105"
            >
              Hoverable
            </Badge>
          </div>
          <Typography variant="small" color="muted">
            Badges support various states and can be made interactive with CSS classes
          </Typography>
        </div>
      </DemoSection>
    </div>
  );
};
