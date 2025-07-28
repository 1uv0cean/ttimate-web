'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import {
  Ship,
  Anchor,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Eye,
  MessageCircle,
  Clock,
  DollarSign,
  Fuel,
  Package,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Waves,
  Container,
  Compass,
  Activity,
  BarChart3,
  Globe,
  Truck,
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
      <div className="space-y-3 sm:space-y-4">{children}</div>
    </div>
  );
};

export const CardDemo = () => {
  const { toast } = useToast();

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Simple Card">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>
                    This is a simple card with basic content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Card content goes here. You can add any content you need.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>With Footer</CardTitle>
                  <CardDescription>
                    Card with header, content, and footer sections.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This card demonstrates all three sections working together.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm">Action</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardContent>
                  <h4 className="font-semibold mb-2">Content Only</h4>
                  <p>This card only has content, no header or footer.</p>
                </CardContent>
              </Card>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Variants">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Style Variants">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card variant="default">
                <CardHeader>
                  <CardTitle size="sm">Default</CardTitle>
                </CardHeader>
                <CardContent>
                  Standard card with subtle shadow and border.
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle size="sm">Outlined</CardTitle>
                </CardHeader>
                <CardContent>
                  Emphasized border with no shadow for clean look.
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardHeader>
                  <CardTitle size="sm">Elevated</CardTitle>
                </CardHeader>
                <CardContent>
                  Enhanced shadow for prominent display.
                </CardContent>
              </Card>

              <Card variant="ghost">
                <CardHeader>
                  <CardTitle size="sm">Ghost</CardTitle>
                </CardHeader>
                <CardContent>
                  Transparent background for subtle presentation.
                </CardContent>
              </Card>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Sizes">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Different Sizes">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <Card size="sm">
                <CardHeader size="sm">
                  <CardTitle size="sm">Small Card</CardTitle>
                  <CardDescription>Compact spacing for tight layouts</CardDescription>
                </CardHeader>
                <CardContent size="sm">
                  Less padding for minimal space usage.
                </CardContent>
                <CardFooter size="sm">
                  <Button size="sm">Small</Button>
                </CardFooter>
              </Card>

              <Card size="md">
                <CardHeader size="md">
                  <CardTitle size="md">Medium Card</CardTitle>
                  <CardDescription>Standard spacing for most use cases</CardDescription>
                </CardHeader>
                <CardContent size="md">
                  Default padding that works well in most situations.
                </CardContent>
                <CardFooter size="md">
                  <Button>Medium</Button>
                </CardFooter>
              </Card>

              <Card size="lg">
                <CardHeader size="lg">
                  <CardTitle size="lg">Large Card</CardTitle>
                  <CardDescription>Generous spacing for prominence</CardDescription>
                </CardHeader>
                <CardContent size="lg">
                  More padding for spacious, premium feel.
                </CardContent>
                <CardFooter size="lg">
                  <Button size="lg">Large</Button>
                </CardFooter>
              </Card>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Hover Effects">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Interactive Cards">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <Card hover="lift">
                <CardHeader>
                  <CardTitle size="sm">Lift Effect</CardTitle>
                </CardHeader>
                <CardContent>
                  Hover to see the card lift up with shadow.
                </CardContent>
              </Card>

              <Card hover="glow">
                <CardHeader>
                  <CardTitle size="sm">Glow Effect</CardTitle>
                </CardHeader>
                <CardContent>
                  Hover to see a subtle glow around the card.
                </CardContent>
              </Card>

              <Card hover="scale">
                <CardHeader>
                  <CardTitle size="sm">Scale Effect</CardTitle>
                </CardHeader>
                <CardContent>
                  Hover to see the card gently scale up.
                </CardContent>
              </Card>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Custom Colors">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Themed Cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card customColor="#3b82f6" variant="outlined">
                <CardHeader>
                  <CardTitle>Blue Theme</CardTitle>
                  <CardDescription>Custom blue border color</CardDescription>
                </CardHeader>
                <CardContent>
                  This card uses a custom blue color for theming.
                </CardContent>
              </Card>

              <Card customColor="#10b981" variant="outlined">
                <CardHeader>
                  <CardTitle>Green Theme</CardTitle>
                  <CardDescription>Custom green border color</CardDescription>
                </CardHeader>
                <CardContent>
                  This card uses a custom green color for theming.
                </CardContent>
              </Card>

              <Card customColor="#f59e0b" variant="outlined">
                <CardHeader>
                  <CardTitle>Orange Theme</CardTitle>
                  <CardDescription>Custom orange border color</CardDescription>
                </CardHeader>
                <CardContent>
                  This card uses a custom orange color for theming.
                </CardContent>
              </Card>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Shipping Management Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Fleet Status Cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card hover="lift" className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-600 relative flex items-center justify-center">
                  <Ship className="h-16 w-16 text-white/80" />
                  <div className="absolute top-2 right-2">
                    <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Active
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>MV Ocean Pioneer</CardTitle>
                  <CardDescription>Container Vessel • IMO: 9876543</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Route:</span>
                      <span className="text-sm font-medium">Shanghai → Long Beach</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">ETA:</span>
                      <span className="text-sm font-medium">Mar 15, 2024</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cargo Load:</span>
                      <span className="text-sm font-medium">85% (1,700 TEU)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.info('Viewing vessel details...')}>
                    <Navigation className="h-4 w-4 mr-2" />
                    Track Vessel
                  </Button>
                </CardFooter>
              </Card>

              <Card hover="lift" className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 relative flex items-center justify-center">
                  <Ship className="h-16 w-16 text-white/80" />
                  <div className="absolute top-2 right-2">
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Delayed
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>MV Atlantic Star</CardTitle>
                  <CardDescription>Bulk Carrier • IMO: 9567891</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Current Route:</span>
                      <span className="text-sm font-medium">Hamburg → New York</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Delay:</span>
                      <span className="text-sm font-medium text-orange-600">+8 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reason:</span>
                      <span className="text-sm font-medium">Weather</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" onClick={() => toast.warning('Checking delay details...')}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    View Status
                  </Button>
                </CardFooter>
              </Card>

              <Card hover="lift" className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-600 relative flex items-center justify-center">
                  <Anchor className="h-16 w-16 text-white/80" />
                  <div className="absolute top-2 right-2">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Waves className="h-3 w-3" />
                      Docked
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>MV Pacific Glory</CardTitle>
                  <CardDescription>Oil Tanker • IMO: 9345678</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Port:</span>
                      <span className="text-sm font-medium">Singapore Port</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Berth:</span>
                      <span className="text-sm font-medium">Terminal 3, Berth 12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Operations:</span>
                      <span className="text-sm font-medium">Cargo Loading</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="secondary" onClick={() => toast.success('Viewing port operations...')}>
                    <Container className="h-4 w-4 mr-2" />
                    Port Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </DemoItem>

          <DemoItem label="Fleet Dashboard Statistics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle size="sm">Fleet Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$12.8M</div>
                  <p className="text-xs text-muted-foreground">
                    +15.2% from last quarter
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle size="sm">Active Vessels</CardTitle>
                  <Ship className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">47</div>
                  <p className="text-xs text-muted-foreground">
                    +3 vessels this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle size="sm">Cargo Volume</CardTitle>
                  <Container className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">125K</div>
                  <p className="text-xs text-muted-foreground">
                    TEU transported this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle size="sm">On-Time Delivery</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% improvement
                  </p>
                </CardContent>
              </Card>
            </div>
          </DemoItem>

          <DemoItem label="Operational Metrics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle size="sm">Fuel Consumption</CardTitle>
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">
                    MT consumed this week
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Efficiency</span>
                      <span className="text-green-600">+5.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-600 h-2 rounded-full w-[78%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle size="sm">Port Calls</CardTitle>
                  <Anchor className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">
                    Successful port calls this month
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Success Rate</span>
                      <span className="text-green-600">98.7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-600 h-2 rounded-full w-[98%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle size="sm">Route Optimization</CardTitle>
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">
                    Routes optimized for efficiency
                  </p>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span>Cost Savings</span>
                      <span className="text-green-600">$1.2M</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-600 h-2 rounded-full w-[87%]"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DemoItem>

          <DemoItem label="Alert & Notification Cards">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card hover="glow" variant="outlined" customColor="#ef4444">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle size="sm">Critical Alert</CardTitle>
                      <CardDescription>Fleet Operations • 15 min ago</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p><strong>MV Atlantic Star</strong> has deviated from planned route due to severe weather conditions. 
                     Estimated delay: 12-16 hours. Alternative routing initiated.</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => toast.info('Viewing details...')}>
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toast.success('Acknowledged')}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Acknowledge
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Card hover="glow" variant="outlined" customColor="#22c55e">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle size="sm">Successful Delivery</CardTitle>
                      <CardDescription>Port Operations • 1h ago</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p><strong>MV Ocean Pioneer</strong> has successfully completed cargo discharge at Port of Long Beach. 
                     All 1,700 TEU containers processed efficiently. Next: Rotterdam.</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" onClick={() => toast.info('Viewing report...')}>
                      <BarChart3 className="h-4 w-4 mr-1" />
                      View Report
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => toast.info('Updating schedule...')}>
                      <Calendar className="h-4 w-4 mr-1" />
                      Update Schedule
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </DemoItem>

          <DemoItem label="Port Operations Cards">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card hover="lift">
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-cyan-600 rounded-t-lg relative flex items-center justify-center">
                  <Anchor className="h-12 w-12 text-white/80" />
                  <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
                    Port Call
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Singapore Port</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    March 18, 2024 - 14:30 UTC
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Ship className="h-4 w-4" />
                    MV Pacific Glory
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    Terminal 3, Berth 12
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="h-4 w-4" />
                    Cargo Loading: 65% Complete
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.info('Viewing port operations...')}>
                    <Activity className="h-4 w-4 mr-2" />
                    Monitor Operations
                  </Button>
                </CardFooter>
              </Card>

              <Card hover="lift">
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-t-lg relative flex items-center justify-center">
                  <Globe className="h-12 w-12 text-white/80" />
                  <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
                    Route Planning
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Trans-Pacific Route</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Navigation className="h-4 w-4" />
                    Shanghai → Los Angeles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Compass className="h-4 w-4" />
                    Distance: 6,434 nautical miles
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4" />
                    Estimated Duration: 14 days
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Fuel className="h-4 w-4" />
                    Fuel Estimate: 847 MT
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.success('Route optimized!')}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Optimize Route
                  </Button>
                </CardFooter>
              </Card>

              <Card hover="lift">
                <div className="aspect-video bg-gradient-to-br from-green-500 to-emerald-600 rounded-t-lg relative flex items-center justify-center">
                  <Container className="h-12 w-12 text-white/80" />
                  <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded text-xs font-medium">
                    Cargo Manifest
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Container Shipment</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    BOL: MSKU7234567890
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Truck className="h-4 w-4" />
                    2,145 TEU Containers
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    Origin: Busan, South Korea
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Destination: Hamburg, Germany
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => toast.info('Opening manifest...')}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Manifest
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};