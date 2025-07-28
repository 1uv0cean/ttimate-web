'use client';

import { Accordion, AccordionItemData } from '@/components/ui/Accordion';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/Table';
import { useState } from 'react';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => {
  return (
    <section className={`space-y-4 sm:space-y-6 rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm ${className}`}>
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">{title}</h3>
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
      <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">{label}</h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export const AccordionDemo = () => {
  // Basic accordion data
  const basicItems: AccordionItemData[] = [
    {
      id: 'item-1',
      title: 'What is Next.js?',
      content: 'Next.js is a React framework that enables functionality such as server-side rendering and generating static websites for React based web applications.',
    },
    {
      id: 'item-2', 
      title: 'How do I install Next.js?',
      content: 'You can install Next.js by running "npm install next react react-dom" or by using the create-next-app command for a new project.',
    },
    {
      id: 'item-3',
      title: 'What are the benefits?',
      content: 'Next.js provides automatic code splitting, server-side rendering, static site generation, and many other performance optimizations out of the box.',
    },
  ];

  // FAQ items
  const faqItems: AccordionItemData[] = [
    {
      id: 'faq-1',
      title: 'How do I get started?',
      content: (
        <div className="space-y-2">
          <p>Getting started is easy! Follow these steps:</p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Install the dependencies</li>
            <li>Run the development server</li>
            <li>Open your browser to localhost:3000</li>
            <li>Start building your application</li>
          </ol>
        </div>
      ),
    },
    {
      id: 'faq-2',
      title: 'Can I customize the components?',
      content: (
        <div className="space-y-2">
          <p>Yes! All components are fully customizable:</p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Custom colors with hex values</li>
            <li>Tailwind CSS classes</li>
            <li>Style overrides</li>
            <li>Variant modifications</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq-3',
      title: 'Is TypeScript supported?',
      content: 'Yes, all components are built with TypeScript and provide full type safety. You get autocomplete, type checking, and excellent developer experience.',
    },
    {
      id: 'faq-4',
      title: 'What about accessibility?',
      content: 'All components follow WAI-ARIA guidelines and include proper keyboard navigation, focus management, and screen reader support.',
      disabled: false,
    },
  ];

  // Feature items
  const featureItems: AccordionItemData[] = [
    {
      id: 'feature-1',
      title: '🚀 Performance',
      content: 'Built with performance in mind. Automatic code splitting, optimized loading, and minimal bundle size ensure your application runs fast.',
    },
    {
      id: 'feature-2',
      title: '🎨 Customizable',
      content: 'Every component can be customized to match your brand. Use custom colors, modify styles, and create your own variants.',
    },
    {
      id: 'feature-3',
      title: '♿ Accessible',
      content: 'WCAG 2.1 compliant components with full keyboard navigation, screen reader support, and proper focus management.',
    },
    {
      id: 'feature-4',
      title: '📱 Responsive',
      content: 'Mobile-first design that works perfectly on all devices. Components adapt to different screen sizes automatically.',
    },
  ];

  // Settings items with sections
  const settingsItems: AccordionItemData[] = [
    {
      id: 'account',
      title: 'Account Settings',
      section: 'Personal',
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Email notifications</span>
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm">Enabled</button>
          </div>
          <div className="flex justify-between items-center">
            <span>Two-factor authentication</span>
            <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">Setup</button>
          </div>
        </div>
      ),
    },
    {
      id: 'profile',
      title: 'Profile Information',
      section: 'Personal',
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Display name</span>
            <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">Edit</button>
          </div>
          <div className="flex justify-between items-center">
            <span>Profile photo</span>
            <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">Update</button>
          </div>
        </div>
      ),
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      section: 'Security',
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Data collection</span>
            <button className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md text-sm">Disabled</button>
          </div>
          <div className="flex justify-between items-center">
            <span>Cookie preferences</span>
            <button className="px-3 py-1 bg-success text-white rounded-md text-sm">Manage</button>
          </div>
        </div>
      ),
    },
    {
      id: 'sessions',
      title: 'Active Sessions',
      section: 'Security',
      content: (
        <div className="space-y-2">
          <p className="text-sm">Manage your active login sessions across different devices.</p>
          <div className="text-xs text-muted-foreground">
            • Desktop - Chrome (Current session)<br />
            • Mobile - Safari (Last active: 2 hours ago)<br />
            • Tablet - Firefox (Last active: 1 day ago)
          </div>
        </div>
      ),
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      section: 'Billing',
      content: 'Manage your subscription, view billing history, and update payment methods. Contact support for billing inquiries.',
      disabled: true,
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      section: 'Billing',
      content: (
        <div className="space-y-2">
          <p className="text-sm">Your saved payment methods:</p>
          <div className="text-xs text-muted-foreground">
            • Visa ****1234 (Default)<br />
            • PayPal account (Backup)
          </div>
        </div>
      ),
    },
  ];

  // State for controlled examples
  const [singleValue, setSingleValue] = useState<string>('item-2');
  const [multipleValue, setMultipleValue] = useState<string[]>(['faq-1', 'faq-3']);

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Single Selection (Default)">
            <Accordion items={basicItems} />
          </DemoItem>
          
          <DemoItem label="Multiple Selection">
            <Accordion 
              items={faqItems} 
              type="multiple"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Variant Types">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Default Variant">
            <Accordion 
              items={basicItems.slice(0, 2)} 
              variant="default"
            />
          </DemoItem>
          
          <DemoItem label="Outlined Variant">
            <Accordion 
              items={basicItems.slice(0, 2)} 
              variant="outlined"
            />
          </DemoItem>
          
          <DemoItem label="Ghost Variant">
            <Accordion 
              items={basicItems.slice(0, 2)} 
              variant="ghost"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Interactive Features">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Rich Content">
            <Accordion 
              items={featureItems}
              defaultValue="feature-1"
            />
          </DemoItem>
          
          <DemoItem label="Sectioned Accordion">
            <Accordion 
              items={settingsItems}
              type="multiple"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Controlled Components">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Controlled Single Selection">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSingleValue('item-1')}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm"
                >
                  Open First
                </button>
                <button
                  onClick={() => setSingleValue('item-2')}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm"
                >
                  Open Second
                </button>
                <button
                  onClick={() => setSingleValue('')}
                  className="px-3 py-1 bg-outline text-foreground border rounded text-sm"
                >
                  Close All
                </button>
              </div>
              <Accordion 
                items={basicItems} 
                value={singleValue}
                onValueChange={(value) => setSingleValue(value as string)}
              />
            </div>
          </DemoItem>
          
          <DemoItem label="Controlled Multiple Selection">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setMultipleValue(['faq-1', 'faq-2', 'faq-3'])}
                  className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm"
                >
                  Open All
                </button>
                <button
                  onClick={() => setMultipleValue([])}
                  className="px-3 py-1 bg-outline text-foreground border rounded text-sm"
                >
                  Close All
                </button>
              </div>
              <Accordion 
                items={faqItems.slice(0, 3)} 
                type="multiple"
                value={multipleValue}
                onValueChange={(value) => setMultipleValue(value as string[])}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Custom Colors">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Custom Border Colors">
            <div className="space-y-4">
              <Accordion 
                items={basicItems.slice(0, 2)} 
                customColor="#ff6b35"
              />
              <Accordion 
                items={faqItems.slice(0, 2)} 
                customColor="#7b68ee"
                variant="outlined"
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Real-World Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="FAQ Section">
            <Accordion 
              items={[
                {
                  id: 'shipping',
                  title: 'What are the shipping options?',
                  content: 'We offer free standard shipping on orders over $50. Express shipping is available for $9.99 and overnight shipping for $19.99.',
                },
                {
                  id: 'returns',
                  title: 'What is your return policy?',
                  content: 'Items can be returned within 30 days of purchase. Items must be in original condition with tags attached. Return shipping is free for defective items.',
                },
                {
                  id: 'warranty',
                  title: 'Do you offer warranties?',
                  content: 'Yes, we offer a 1-year warranty on all electronic items and a 6-month warranty on accessories. Extended warranties are available for purchase.',
                },
              ]}
              type="single"
              collapsible
            />
          </DemoItem>
          
          <DemoItem label="Product Features">
            <Accordion 
              items={[
                {
                  id: 'specs',
                  title: 'Technical Specifications',
                  content: (
                    <div className="space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm">
                        <div><strong>Processor:</strong> Intel Core i7</div>
                        <div><strong>Memory:</strong> 16GB DDR4</div>
                        <div><strong>Storage:</strong> 512GB SSD</div>
                        <div><strong>Display:</strong> 15.6" 4K</div>
                      </div>
                    </div>
                  ),
                },
                {
                  id: 'included',
                  title: 'What\'s Included',
                  content: (
                    <ul className="space-y-1 text-sm">
                      <li>• Device unit</li>
                      <li>• Power adapter</li>
                      <li>• USB-C cable</li>
                      <li>• Quick start guide</li>
                      <li>• 1-year warranty card</li>
                    </ul>
                  ),
                },
                {
                  id: 'pricing-table',
                  title: 'Pricing & Plans',
                  content: (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Choose the perfect plan for your needs. All plans include our core features with different usage limits and support levels.
                      </p>
                      <Table size="sm">
                        <TableHeader>
                          <TableRow>
                            <TableHead size="sm">Plan</TableHead>
                            <TableHead size="sm">Users</TableHead>
                            <TableHead size="sm">Storage</TableHead>
                            <TableHead size="sm" className="text-right">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell size="sm" className="font-medium">Starter</TableCell>
                            <TableCell size="sm">Up to 5</TableCell>
                            <TableCell size="sm">10GB</TableCell>
                            <TableCell size="sm" className="text-right font-medium">$9/month</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell size="sm" className="font-medium">Pro</TableCell>
                            <TableCell size="sm">Up to 20</TableCell>
                            <TableCell size="sm">100GB</TableCell>
                            <TableCell size="sm" className="text-right font-medium">$29/month</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell size="sm" className="font-medium">Enterprise</TableCell>
                            <TableCell size="sm">Unlimited</TableCell>
                            <TableCell size="sm">1TB+</TableCell>
                            <TableCell size="sm" className="text-right font-medium">Custom</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <div className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                        <p><strong>Note:</strong> All plans include 24/7 customer support, regular backups, and SSL security. Enterprise plans offer custom integrations and dedicated account management.</p>
                      </div>
                    </div>
                  ),
                },
              ]}
              type="multiple"
              defaultValue={['specs']}
              variant="outlined"
            />
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};