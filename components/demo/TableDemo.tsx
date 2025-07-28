'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => {
  return (
    <section
      className={`space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:space-y-6 sm:p-6 ${className}`}
    >
      <h3 className="border-b border-gray-100 pb-2 text-lg font-semibold text-gray-900 sm:text-xl">
        {title}
      </h3>
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
      <h4 className="text-xs font-semibold tracking-wide text-gray-700 uppercase sm:text-sm">
        {label}
      </h4>
      <div className="space-y-3 sm:space-y-4">{children}</div>
    </div>
  );
};

// Sample data
const invoices = [
  {
    invoice: 'INV-001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV-002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV-003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV-004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV-005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
];

const products = [
  { id: 1, name: 'Laptop Pro', price: '$1,299.00', stock: 15, category: 'Electronics' },
  { id: 2, name: 'Wireless Mouse', price: '$29.99', stock: 120, category: 'Accessories' },
  { id: 3, name: 'Keyboard', price: '$79.99', stock: 45, category: 'Accessories' },
  { id: 4, name: 'Monitor 4K', price: '$399.00', stock: 8, category: 'Electronics' },
  { id: 5, name: 'Webcam HD', price: '$89.99', stock: 32, category: 'Electronics' },
];

const users = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive' },
  { name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Moderator', status: 'Active' },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'paid':
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'unpaid':
    case 'inactive':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const TableDemo = () => {
  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Tables">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Simple Data Table">
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>A list of recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                      <TableCell className="font-medium">{invoice.invoice}</TableCell>
                      <TableCell>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(invoice.paymentStatus)}`}
                        >
                          {invoice.paymentStatus}
                        </span>
                      </TableCell>
                      <TableCell>{invoice.paymentMethod}</TableCell>
                      <TableCell className="text-right font-medium">
                        {invoice.totalAmount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right font-bold">$1,750.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </DemoItem>
          <DemoItem label="Product Inventory">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-mono text-xs">{product.id}</TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${
                            product.stock < 10
                              ? 'bg-red-100 text-red-800'
                              : product.stock < 50
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-medium">{product.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DemoItem>
        </div>
      </DemoSection>
      <DemoSection title="Table Variants">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Striped Table">
            <Table variant="striped">
              <TableHeader>
                <TableRow variant="striped">
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.email} variant="striped">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          user.role === 'Admin'
                            ? 'bg-purple-100 text-purple-800'
                            : user.role === 'Moderator'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DemoItem>
          <DemoItem label="Bordered Table">
            <Table variant="bordered">
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Sales</TableHead>
                  <TableHead>Growth</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Laptop Pro</TableCell>
                  <TableCell>342 units</TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">+12.5%</span>
                  </TableCell>
                  <TableCell className="text-right font-medium">$445,580</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Wireless Mouse</TableCell>
                  <TableCell>1,205 units</TableCell>
                  <TableCell>
                    <span className="font-medium text-green-600">+5.2%</span>
                  </TableCell>
                  <TableCell className="text-right font-medium">$36,150</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Monitor 4K</TableCell>
                  <TableCell>89 units</TableCell>
                  <TableCell>
                    <span className="font-medium text-red-600">-2.1%</span>
                  </TableCell>
                  <TableCell className="text-right font-medium">$35,511</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DemoItem>
        </div>
      </DemoSection>
      <DemoSection title="Table Sizes">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Small Table">
            <Table size="sm">
              <TableHeader>
                <TableRow>
                  <TableHead size="sm">Name</TableHead>
                  <TableHead size="sm">Status</TableHead>
                  <TableHead size="sm" className="text-right">
                    Value
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell size="sm" className="font-medium">
                    API Server
                  </TableCell>
                  <TableCell size="sm">
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-800">
                      Online
                    </span>
                  </TableCell>
                  <TableCell size="sm" className="text-right">
                    99.9%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell size="sm" className="font-medium">
                    Database
                  </TableCell>
                  <TableCell size="sm">
                    <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-800">
                      Online
                    </span>
                  </TableCell>
                  <TableCell size="sm" className="text-right">
                    99.8%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DemoItem>
          <DemoItem label="Large Table">
            <Table size="lg">
              <TableHeader>
                <TableRow>
                  <TableHead size="lg">Campaign</TableHead>
                  <TableHead size="lg">Impressions</TableHead>
                  <TableHead size="lg">Clicks</TableHead>
                  <TableHead size="lg" className="text-right">
                    Conversion Rate
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell size="lg" className="font-medium">
                    Summer Sale 2024
                  </TableCell>
                  <TableCell size="lg">45,678</TableCell>
                  <TableCell size="lg">1,234</TableCell>
                  <TableCell size="lg" className="text-right">
                    2.7%
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell size="lg" className="font-medium">
                    Holiday Special
                  </TableCell>
                  <TableCell size="lg">32,156</TableCell>
                  <TableCell size="lg">967</TableCell>
                  <TableCell size="lg" className="text-right">
                    3.0%
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </DemoItem>
        </div>
      </DemoSection>
      <DemoSection title="Interactive Tables">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Actionable Rows">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono">#ORD-001</TableCell>
                    <TableCell>John Doe</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                        Processing
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">$129.99</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 hover:bg-blue-200">
                        View
                      </button>
                      <button className="rounded bg-green-100 px-2 py-1 text-xs text-green-800 hover:bg-green-200">
                        Ship
                      </button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono">#ORD-002</TableCell>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                        Completed
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">$89.50</TableCell>
                    <TableCell className="space-x-2 text-right">
                      <button className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 hover:bg-blue-200">
                        View
                      </button>
                      <button
                        className="cursor-not-allowed rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        disabled
                      >
                        Ship
                      </button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Data Visualization">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Analytics Table">
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>Website analytics for the last 30 days</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Previous</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Page Views</TableCell>
                    <TableCell>124,567</TableCell>
                    <TableCell>118,234</TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">+5.4%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-16 overflow-hidden rounded bg-green-100">
                        <div className="h-full w-3/4 bg-green-500"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Unique Visitors</TableCell>
                    <TableCell>45,123</TableCell>
                    <TableCell>47,892</TableCell>
                    <TableCell>
                      <span className="font-medium text-red-600">-5.8%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-16 overflow-hidden rounded bg-red-100">
                        <div className="h-full w-2/3 bg-red-500"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bounce Rate</TableCell>
                    <TableCell>34.2%</TableCell>
                    <TableCell>38.7%</TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">-4.5%</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-16 overflow-hidden rounded bg-green-100">
                        <div className="h-full w-1/2 bg-green-500"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};
