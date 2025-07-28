// Global type definitions for the Next.js boilerplate

export interface BaseComponent {
  className?: string;
  children?: React.ReactNode;
}

export interface VariantComponent<T = any> extends BaseComponent {
  variant?: T;
  size?: 'sm' | 'md' | 'lg';
}

export interface FormComponent extends BaseComponent {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface CustomColorSupport {
  customColor?: string;
}

export interface LoadingState {
  loading?: boolean;
}

export interface ToggleComponent extends FormComponent, CustomColorSupport {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: NavigationItem[];
  disabled?: boolean;
  badge?: string | number;
}

// Data table types
export interface DataTableColumn<T = any> {
  key: string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  resizable?: boolean;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  cellAlign?: 'left' | 'center' | 'right';
}

export type SortDirection = 'asc' | 'desc' | null;

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface FormField {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  rules?: ValidationRule;
  defaultValue?: any;
}

// Theme and styling types
export type ColorVariant = 
  | 'default' 
  | 'primary' 
  | 'secondary' 
  | 'destructive' 
  | 'success' 
  | 'warning' 
  | 'info' 
  | 'muted';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type Alignment = 'left' | 'center' | 'right' | 'justify';

// Component state types
export interface ComponentState {
  loading?: boolean;
  error?: string;
  success?: boolean;
  disabled?: boolean;
}

// Event handler types
export type ValueChangeHandler<T> = (value: T) => void;
export type ClickHandler = (event: React.MouseEvent) => void;
export type SubmitHandler = (event: React.FormEvent) => void;

// Utility types
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// API types (for mock data and future API integration)
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: 'success' | 'error';
  pagination?: PaginationState;
}

export interface ApiError {
  message: string;
  code?: string | number;
  details?: any;
}

// Date and time types
export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface TimeRange {
  startTime: string;
  endTime: string;
}

// File upload types
export interface FileUploadInfo {
  file: File;
  id: string;
  name: string;
  size: number;
  type: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

// Modal and dialog types
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
  onClose?: () => void;
}

// Toast notification types
export interface ToastMessage {
  id: string;
  title?: string;
  message: string;
  variant: ColorVariant;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Organization types (specific to this boilerplate)
export interface Organization {
  id: string;
  name: string;
  nameEn: string;
  businessNumber: string;
  phone: string;
  address: string;
  industry: string;
  registrationDate: string;
  approved: boolean;
  withdrawn: boolean;
  manager: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  lastLogin?: string;
  status: 'active' | 'inactive' | 'suspended';
}

// Dashboard types
export interface DashboardMetric {
  label: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: React.ReactNode;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

// Search and filter types
export interface SearchFilter {
  query: string;
  filters: Record<string, any>;
  sortBy?: string;
  sortDirection?: SortDirection;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

// Layout types
export interface LayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

// Component ref types for better TypeScript support
export type InputRef = React.ElementRef<'input'>;
export type ButtonRef = React.ElementRef<'button'>;
export type DivRef = React.ElementRef<'div'>;
export type SelectRef = React.ElementRef<'select'>;

// Generic component props that extend HTML element props
export type ComponentPropsWithRef<T extends React.ElementType> = 
  React.ComponentPropsWithRef<T> & BaseComponent;

// Polymorphic component types for flexible component APIs
export type PolymorphicRef<C extends React.ElementType> = 
  React.ComponentPropsWithRef<C>['ref'];

export type PolymorphicComponentProp<C extends React.ElementType, Props = {}> = 
  React.PropsWithChildren<Props & { as?: C }> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props>;

export type PolymorphicComponent<C extends React.ElementType, Props = {}> = 
  <Component extends React.ElementType = C>(
    props: PolymorphicComponentProp<Component, Props> & { ref?: PolymorphicRef<Component> }
  ) => React.ReactElement | null;