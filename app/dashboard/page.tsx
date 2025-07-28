'use client';

import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { TopNavigator } from '@/components/ui/TopNavigator';
import { Typography } from '@/components/ui/Typography';
import {
  Activity,
  BarChart3,
  Bell,
  Calendar,
  Clock,
  DollarSign,
  Download,
  Filter,
  Globe,
  Mail,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { useState } from 'react';

const StatCard = ({
  title,
  value,
  change,
  icon: Icon,
  positive = true,
}: {
  title: string;
  value: string;
  change: string;
  icon: any;
  positive?: boolean;
}) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {change} from last month
      </p>
    </CardContent>
  </Card>
);

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('7d');

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: '+20.1%',
      icon: DollarSign,
      positive: true,
    },
    {
      title: 'Active Users',
      value: '2,350',
      change: '+180.1%',
      icon: Users,
      positive: true,
    },
    {
      title: 'Conversion Rate',
      value: '12.5%',
      change: '+19%',
      icon: Activity,
      positive: true,
    },
    {
      title: 'Page Views',
      value: '89,400',
      change: '+201',
      icon: Globe,
      positive: true,
    },
  ];

  const recentActivities = [
    {
      user: 'John Doe',
      action: 'Created new project',
      time: '2 minutes ago',
      avatar: 'JD',
    },
    {
      user: 'Sarah Wilson',
      action: 'Updated dashboard settings',
      time: '5 minutes ago',
      avatar: 'SW',
    },
    {
      user: 'Mike Johnson',
      action: 'Completed task review',
      time: '10 minutes ago',
      avatar: 'MJ',
    },
    {
      user: 'Emily Brown',
      action: 'Published new article',
      time: '1 hour ago',
      avatar: 'EB',
    },
  ];

  const upcomingTasks = [
    {
      title: 'Review Q4 Analytics Report',
      deadline: 'Today, 3:00 PM',
      priority: 'high',
    },
    {
      title: 'Team Meeting - Project Sync',
      deadline: 'Tomorrow, 10:00 AM',
      priority: 'medium',
    },
    {
      title: 'Update Documentation',
      deadline: 'Dec 15, 2024',
      priority: 'low',
    },
    {
      title: 'Client Presentation Prep',
      deadline: 'Dec 18, 2024',
      priority: 'high',
    },
  ];

  const quickActions = [
    { label: 'New Project', icon: Plus, color: 'bg-blue-500' },
    { label: 'Generate Report', icon: BarChart3, color: 'bg-green-500' },
    { label: 'Send Message', icon: Mail, color: 'bg-purple-500' },
    { label: 'Schedule Meeting', icon: Calendar, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <TopNavigator variant="filled" />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <Typography variant="h1" className="text-3xl">
              Dashboard
            </Typography>
            <Typography variant="muted">
              Welcome back! Here's what's happening with your projects.
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
              Export
            </Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              New Project
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search projects, users, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Select
                  options={[
                    { label: 'Last 7 days', value: '7d' },
                    { label: 'Last 30 days', value: '30d' },
                    { label: 'Last 3 months', value: '3m' },
                    { label: 'Last year', value: '1y' },
                  ]}
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                  placeholder="Select period"
                />
                <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
                  Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Area */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Analytics Overview
                </CardTitle>
                <CardDescription>
                  Performance metrics for the selected period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                    <Typography variant="h3" color="muted">
                      Chart Visualization
                    </Typography>
                    <Typography variant="muted" className="max-w-sm">
                      Interactive charts and graphs would be displayed here using a
                      charting library like Chart.js or Recharts.
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start"
                    leftIcon={
                      <div className={`p-1 rounded ${action.color}`}>
                        <action.icon className="h-3 w-3 text-white" />
                      </div>
                    }
                  >
                    {action.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Typography variant="small" weight="medium" className="text-xs">
                        {activity.avatar}
                      </Typography>
                    </div>
                    <div className="flex-1 space-y-1">
                      <Typography variant="small" weight="medium">
                        {activity.user}
                      </Typography>
                      <Typography variant="small" color="muted" className="text-xs">
                        {activity.action}
                      </Typography>
                      <Typography variant="small" color="muted" className="text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </Typography>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
              <CardDescription>
                Stay on top of your deadlines and priorities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <Typography variant="small" weight="medium">
                      {task.title}
                    </Typography>
                    <Typography variant="small" color="muted" className="text-xs">
                      {task.deadline}
                    </Typography>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-700'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {task.priority}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                System Status
              </CardTitle>
              <CardDescription>
                Monitor your system health and performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'API Response Time', value: '145ms', status: 'good' },
                { name: 'Database Connection', value: 'Active', status: 'good' },
                { name: 'Server Load', value: '23%', status: 'good' },
                { name: 'Memory Usage', value: '67%', status: 'warning' },
                { name: 'Disk Space', value: '89%', status: 'critical' },
              ].map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Typography variant="small">{metric.name}</Typography>
                  <div className="flex items-center gap-2">
                    <Typography variant="small" weight="medium">
                      {metric.value}
                    </Typography>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        metric.status === 'good'
                          ? 'bg-green-500'
                          : metric.status === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Settings Quick Access */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="large" weight="medium">
                  Need to adjust your settings?
                </Typography>
                <Typography variant="muted" className="mt-1">
                  Customize your dashboard, notifications, and preferences.
                </Typography>
              </div>
              <Button variant="outline" rightIcon={<Settings className="h-4 w-4" />}>
                Open Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MainPage;