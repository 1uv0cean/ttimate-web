'use client';

import { DataTable, DataTableColumn } from '@/components/ui/DataTable';
import { useState } from 'react';
import {
  IdBadge,
  NameBadge,
  EmailDisplay,
  RoleBadge,
  StatusBadge,
  DateDisplay,
  ProductDisplay,
  PriceDisplay,
  StockStatus,
  RatingDisplay,
  OrderIdDisplay,
  CurrencyDisplay,
  ItemsCount,
} from './TableRenderComponents';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => {
  return (
    <section className={`space-y-3 sm:space-y-6 rounded-lg border border-gray-200 bg-white p-3 sm:p-6 shadow-sm ${className}`}>
      <h3 className="text-base sm:text-xl font-semibold text-gray-900 border-b border-gray-100 pb-2">{title}</h3>
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
      <div className="space-y-3 sm:space-y-4">{children}</div>
    </div>
  );
};

// Sample data
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  joinDate: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  featured: boolean;
}

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Cancelled' | 'Pending';
  date: string;
  items: number;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15', joinDate: '2023-06-12' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14', joinDate: '2023-08-22' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Moderator', status: 'Inactive', lastLogin: '2024-01-10', joinDate: '2023-04-15' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16', joinDate: '2023-09-03' },
  { id: 5, name: 'Alex Chen', email: 'alex@example.com', role: 'Admin', status: 'Pending', lastLogin: '2024-01-12', joinDate: '2023-11-28' },
  { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-16', joinDate: '2023-07-19' },
  { id: 7, name: 'David Brown', email: 'david@example.com', role: 'Moderator', status: 'Active', lastLogin: '2024-01-13', joinDate: '2023-05-08' },
  { id: 8, name: 'Lisa Garcia', email: 'lisa@example.com', role: 'User', status: 'Inactive', lastLogin: '2024-01-08', joinDate: '2023-10-11' },
];

const products: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, stock: 15, rating: 4.8, featured: true },
  { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 120, rating: 4.5, featured: false },
  { id: 3, name: 'Mechanical Keyboard', category: 'Accessories', price: 79.99, stock: 45, rating: 4.7, featured: true },
  { id: 4, name: '4K Monitor', category: 'Electronics', price: 399, stock: 8, rating: 4.6, featured: false },
  { id: 5, name: 'Webcam HD', category: 'Electronics', price: 89.99, stock: 32, rating: 4.3, featured: false },
  { id: 6, name: 'Desk Lamp', category: 'Furniture', price: 45.50, stock: 67, rating: 4.2, featured: false },
  { id: 7, name: 'Gaming Chair', category: 'Furniture', price: 299, stock: 12, rating: 4.9, featured: true },
  { id: 8, name: 'USB Hub', category: 'Accessories', price: 24.99, stock: 89, rating: 4.1, featured: false },
];

const orders: Order[] = [
  { id: 'ORD-001', customer: 'John Doe', amount: 1299.00, status: 'Completed', date: '2024-01-15', items: 1 },
  { id: 'ORD-002', customer: 'Jane Smith', amount: 109.98, status: 'Processing', date: '2024-01-16', items: 2 },
  { id: 'ORD-003', customer: 'Mike Johnson', amount: 399.00, status: 'Pending', date: '2024-01-16', items: 1 },
  { id: 'ORD-004', customer: 'Sarah Wilson', amount: 344.50, status: 'Completed', date: '2024-01-14', items: 3 },
  { id: 'ORD-005', customer: 'Alex Chen', amount: 79.99, status: 'Cancelled', date: '2024-01-13', items: 1 },
];


export const DataTableDemo = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});

  // User table columns
  const userColumns: DataTableColumn<User>[] = [
    {
      key: 'id',
      title: 'ID',
      sortable: true,
      width: '80px',
      render: (value) => <IdBadge id={value} />,
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      filterable: true,
      render: (value) => <NameBadge name={value} />,
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true,
      filterable: true,
      render: (value) => <EmailDisplay email={value} />,
    },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
      filterable: true,
      render: (value) => <RoleBadge role={value} />,
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'lastLogin',
      title: 'Last Login',
      sortable: true,
      render: (value) => <DateDisplay date={value} />,
    },
    {
      key: 'joinDate',
      title: 'Join Date',
      sortable: true,
      render: (value) => <DateDisplay date={value} />,
    },
  ];

  // Product table columns
  const productColumns: DataTableColumn<Product>[] = [
    {
      key: 'name',
      title: 'Product',
      sortable: true,
      filterable: true,
      render: (value, row) => <ProductDisplay name={value} featured={row.featured} />,
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
      filterable: true,
    },
    {
      key: 'price',
      title: 'Price',
      sortable: true,
      headerAlign: 'right',
      cellAlign: 'right',
      render: (value) => <PriceDisplay price={value} />,
    },
    {
      key: 'stock',
      title: 'Stock',
      sortable: true,
      headerAlign: 'center',
      cellAlign: 'center',
      render: (value) => <StockStatus stock={value} />,
    },
    {
      key: 'rating',
      title: 'Rating',
      sortable: true,
      headerAlign: 'center',
      cellAlign: 'center',
      render: (value) => <RatingDisplay rating={value} />,
    },
  ];

  // Orders table columns
  const orderColumns: DataTableColumn<Order>[] = [
    {
      key: 'id',
      title: 'Order ID',
      sortable: true,
      filterable: true,
      render: (value) => <OrderIdDisplay orderId={value} />,
    },
    {
      key: 'customer',
      title: 'Customer',
      sortable: true,
      filterable: true,
      render: (value) => <NameBadge name={value} />,
    },
    {
      key: 'amount',
      title: 'Amount', 
      sortable: true,
      headerAlign: 'right',
      cellAlign: 'right',
      render: (value) => <CurrencyDisplay amount={value} />,
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      filterable: true,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'date',
      title: 'Date',
      sortable: true,
      render: (value) => <DateDisplay date={value} />,
    },
    {
      key: 'items',
      title: 'Items',
      sortable: true,
      headerAlign: 'center',
      cellAlign: 'center',
      render: (value) => <ItemsCount count={value} />,
    },
  ];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Filter Modes">
        <div className="space-y-4 sm:space-y-8">
          <DemoItem label="Search Only">
            <DataTable
              data={users}
              columns={userColumns}
              filterMode="search"
              searchPlaceholder="Search users..."
              onRowClick={(user) => setSelectedUser(user)}
              onSearch={(query) => setSearchQuery(query)}
            />
            {selectedUser && (
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-muted/50 rounded-lg">
                <h5 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Selected User:</h5>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {selectedUser.name} ({selectedUser.email}) - {selectedUser.role}
                </p>
              </div>
            )}
          </DemoItem>

          <DemoItem label="Column Filters Only">
            <DataTable
              data={products.slice(0, 6)}
              columns={productColumns}
              filterMode="column"
              pageSize={4}
              onFilter={(filters) => setFilters(filters)}
            />
          </DemoItem>

          <DemoItem label="Both Search & Column Filters">
            <DataTable
              data={users}
              columns={userColumns.slice(0, 5)}
              filterMode="both"
              searchPlaceholder="Search anything..."
              pageSize={4}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Display Modes">
        <div className="space-y-4 sm:space-y-8">
          <DemoItem label="Pagination Mode (Default)">
            <DataTable
              data={products}
              columns={productColumns}
              displayMode="pagination"
              filterMode="search"
              pageSize={4}
            />
          </DemoItem>

          <DemoItem label="Scroll Mode">
            <DataTable
              data={users}
              columns={userColumns}
              displayMode="scroll"
              maxHeight="300px"
              filterMode="search"
              searchPlaceholder="Search users..."
            />
          </DemoItem>

          <DemoItem label="Static Mode (All Data)">
            <DataTable
              data={orders}
              columns={orderColumns}
              displayMode="static"
              filterMode="search"
              searchPlaceholder="Search orders..."
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Layout Variants">
        <div className="space-y-4 sm:space-y-8">
          <DemoItem label="Card Layout with Scroll">
            <DataTable
              data={users}
              columns={userColumns.slice(0, 4)}
              variant="card"
              displayMode="scroll"
              maxHeight="250px"
              filterMode="search"
            />
          </DemoItem>

          <DemoItem label="Bordered with No Filters">
            <DataTable
              data={products.slice(0, 4)}
              columns={productColumns.slice(0, 4)}
              variant="bordered"
              filterMode="none"
              displayMode="static"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Interactive Features">
        <div className="space-y-4 sm:space-y-8">
          <DemoItem label="Event Callbacks">
            <div className="space-y-4">
              <div className="text-xs sm:text-sm text-muted-foreground">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                  <span>Search: "{searchQuery}"</span>
                  <span>Filters: {Object.keys(filters).length}</span>
                </div>
              </div>
              <DataTable
                data={products}
                columns={productColumns}
                filterMode="both"
                displayMode="pagination"
                pageSize={3}
                onSearch={(query) => setSearchQuery(query)}
                onFilter={(newFilters) => setFilters(newFilters)}
                onRowClick={(product) => alert(`Clicked: ${product.name}`)}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="States">
        <div className="space-y-4 sm:space-y-8">
          <DemoItem label="Loading State">
            <DataTable
              data={[]}
              columns={userColumns}
              loading={true}
              loadingMessage="Fetching user data..."
            />
          </DemoItem>

          <DemoItem label="Empty State">
            <DataTable
              data={[]}
              columns={orderColumns}
              loading={false}
              filterMode="search"
              emptyMessage="No orders found. Try adjusting your search criteria."
            />
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};