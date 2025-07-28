# 🧠 CLAUDELWP Boilerplate Development Guidelines

> **Mission**: Enable rapid development of production-grade web applications through proven patterns, reusable components, and enterprise architecture.

## 🎯 Development Philosophy

**Build for Production from Day One**
Every component, pattern, and architectural decision should be made with production scalability in mind. This boilerplate accelerates development while maintaining enterprise-grade code quality.

### Core Development Principles

- **🏗️ Clean Architecture**: Separation of concerns, dependency inversion, testable code
- **📐 TypeScript Strict**: Zero tolerance for `any` types, full type safety
- **⚛️ Modern React**: Functional components, hooks, no legacy patterns
- **🧩 Composition > Inheritance**: Build through composition patterns
- **🎨 Design System**: Consistent UI patterns with variant management
- **⚡ Performance First**: Code splitting, lazy loading, optimized bundles
- **🔧 Developer Experience**: Hot reloading, type checking, linting automation
- **📦 pnpm**: Lightning-fast package management
- **📱 Mobile First**: Responsive design with mobile-first approach

**Golden Rule**: Write code as if the next developer maintaining it is a violent psychopath who knows where you live.

## 🚀 Component Library Overview

### 📋 Complete Component Inventory

#### 🎛️ Form Components
| Component | Status | Description | Mobile Optimized |
|-----------|--------|-------------|------------------|
| **Input** | ✅ Complete | Text inputs with validation, icons, types | ✅ |
| **Textarea** | ✅ Complete | Multi-line text input with auto-resize | ✅ |
| **Select** | ✅ Complete | Dropdown with search and validation | ✅ |
| **Checkbox** | ✅ Complete | Binary selection with custom colors | ✅ |
| **Switch** | ✅ Complete | Toggle switches for settings | ✅ |
| **DatePicker** | ✅ Complete | Calendar date selection | ✅ |
| **DateRangePicker** | ✅ Complete | Date range selection | ✅ |
| **FileUpload** | ✅ Complete | Drag & drop file upload | ✅ |
| **Rating** | ✅ Complete | Star rating component | ✅ |

#### 🎯 Action Components
| Component | Status | Description | Mobile Optimized |
|-----------|--------|-------------|------------------|
| **Button** | ✅ Complete | Multi-variant buttons with icons | ✅ |
| **Badge** | ✅ Complete | Status indicators and labels | ✅ |
| **Progress** | ✅ Complete | Progress bars with animations | ✅ |

#### 🏗️ Layout Components
| Component | Status | Description | Mobile Optimized |
|-----------|--------|-------------|------------------|
| **Section** | ✅ Complete | Flexible container with variants | ✅ |
| **Card** | ✅ Complete | Content containers | ✅ |
| **Sidebar** | ✅ Complete | Collapsible navigation with mobile overlay | ✅ |
| **TopNavigator** | ✅ Complete | Responsive navigation header | ✅ |
| **Accordion** | ✅ Complete | Collapsible content sections | ✅ |
| **Tabs** | ✅ Complete | Tab navigation with mobile scroll | ✅ |

#### 📊 Data Components
| Component | Status | Description | Mobile Optimized |
|-----------|--------|-------------|------------------|
| **DataTable** | ✅ Complete | Advanced table with sorting, filtering, pagination | ✅ |
| **Table** | ✅ Complete | Basic table component | ✅ |

#### 🧭 Navigation Components
| Component | Status | Description | Mobile Optimized |
|-----------|--------|-------------|------------------|
| **Breadcrumb** | ✅ Complete | Navigation breadcrumbs | ✅ |
| **Stepper** | ✅ Complete | Step-by-step process indicator | ✅ |

#### 💬 Feedback Components
| Component | Status | Description | Mobile Optimized |
|-----------|--------|-------------|------------------|
| **Dialog** | ✅ Complete | Modal dialogs with variants | ✅ |
| **Toast** | ✅ Complete | Notification system | ✅ |

#### 🎨 Typography Components
| Component | Status | Description | Mobile Optimized |
|-----------|--------|-------------|------------------|
| **Typography** | ✅ Complete | Consistent text styling | ✅ |

## 🎨 Design System Architecture

### 🎯 Component Development Standards

Every reusable UI component MUST follow these standards:

#### ✅ Essential Features Checklist
- **Props Interface**: Accept `className`, `...props`, and type-safe inputs
- **Type Exports**: Export props and types separately for reusability
- **Accessibility**: WCAG 2.1 compliant with proper ARIA attributes
- **Keyboard Navigation**: Full keyboard interaction support
- **TailwindCSS**: Easily customizable with utility classes
- **Demo Component**: Comprehensive examples in `/components/demo`
- **Testability**: Isolated, mockable, and unit-testable
- **forwardRef**: Proper ref forwarding for form libraries
- **Error Handling**: Graceful error states and validation
- **Loading States**: Proper loading/pending state management
- **Mobile Responsive**: Mobile-first responsive design

### 🎨 Design Token System

```tsx
// Color Variants Pattern
export type ComponentVariant = 'default' | 'error' | 'success' | 'warning' | 'info';

// Size System
export type ComponentSize = 'sm' | 'md' | 'lg';

// CVA Pattern Implementation
const componentVariants = cva(
  "base-classes focus-states disabled-states",
  {
    variants: {
      size: {
        sm: 'h-8 px-2 py-1 text-xs',
        md: 'h-10 px-3 py-2 text-sm', 
        lg: 'h-12 px-4 py-3 text-base'
      },
      variant: {
        default: 'bg-background border-input',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-green-500 focus-visible:ring-green-500'
      }
    },
    defaultVariants: { size: 'md', variant: 'default' }
  }
);
```

### 🎯 Component Categories & Patterns

#### 1. Input Components (text-based, user entry)
- **Components**: Input, Select, DatePicker, DateRangePicker, Textarea
- **Features**: Variable sizes (`sm`, `md`, `lg`), icons, validation states
- **Alignment**: Use `items-center` alignment
- **Props Pattern**:
```tsx
interface InputComponentProps {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'error' | 'success';
}
```

#### 2. Toggle Components (binary state)
- **Components**: Checkbox, Switch  
- **Features**: Fixed sizes for consistent label alignment, custom colors
- **Alignment**: Use `items-center` alignment
- **Props Pattern**:
```tsx
interface ToggleComponentProps {
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  customColor?: string;
  onCheckedChange?: (checked: boolean) => void;
}
```

#### 3. Action Components (trigger actions)
- **Components**: Button, Dialog triggers
- **Features**: Variable sizes, loading states, icons, custom colors
- **Props Pattern**:
```tsx
interface ActionComponentProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  customColor?: string;
  disabled?: boolean;
}
```

#### 4. Layout Components (structure and organization)
- **Components**: Section, Card, Sidebar, TopNavigator
- **Features**: Flexible containers, responsive padding, background variants
- **Props Pattern**:
```tsx
interface LayoutComponentProps {
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'responsive';
  background?: 'none' | 'default' | 'muted' | 'card' | 'accent';
  border?: 'none' | 'default' | 'muted' | 'rounded' | 'rounded-muted';
}
```

## 📱 Mobile-First Responsive Design

### 🎯 Responsive Breakpoints
```css
/* Mobile First Approach */
/* xs: 0px - 640px (default) */
/* sm: 640px+ */
/* md: 768px+ */
/* lg: 1024px+ */
/* xl: 1280px+ */
/* 2xl: 1536px+ */
```

### 📏 Mobile Design Standards
- **Text Scaling**: `text-xs sm:text-sm` for mobile optimization
- **Padding**: `p-3 sm:p-4` for touch-friendly spacing
- **Icons**: `h-3 w-3 sm:h-4 sm:w-4` for appropriate scaling
- **Gaps**: `gap-1 sm:gap-2` for compact mobile layouts
- **Overflow**: Always include `overflow-hidden` and `min-w-0` for containers

### 🎨 Mobile Component Patterns
```tsx
// Mobile-optimized component structure
<div className="w-full max-w-full overflow-hidden">
  <div className="min-w-0">
    {/* Content with proper constraints */}
  </div>
</div>
```

## 📁 Project Structure & Organization

### 🏗️ Directory Architecture
```
components/
├── ui/                 # Shared UI Components Library
│   ├── Input.tsx       # Form inputs
│   ├── Button.tsx      # Action buttons
│   ├── DataTable.tsx   # Complex data display
│   ├── Dialog.tsx      # Modal dialogs
│   ├── Sidebar.tsx     # Navigation sidebar
│   └── index.ts        # Barrel exports
├── demo/               # Component Demonstrations
│   ├── InputDemo.tsx   # Input usage examples
│   ├── ButtonDemo.tsx  # Button usage examples
│   └── ...             # All component demos
├── features/           # Business Logic Components
│   ├── auth/          # Authentication flows
│   ├── dashboard/     # Dashboard-specific
│   └── profile/       # User profile
├── forms/             # Form Compositions
├── layout/            # Layout Components
└── providers/         # Context Providers
```

### 🎯 Component Placement Rules

**`/components/ui/`** - Shared UI Components Only
- ✅ Reusable, configurable components
- ✅ Design system components
- ❌ Business logic components
- ❌ Feature-specific components

**`/components/demo/`** - Component Demonstrations
- ✅ Interactive examples
- ✅ Copy-paste code snippets
- ✅ Multiple usage scenarios

**`/components/features/`** - Business Logic
- ✅ Domain-specific components
- ✅ Complex feature implementations
- ✅ Data-fetching components

## 🚀 Rapid Development Workflow

### 🎯 Quick Start Guide

#### 1. Component Creation Keywords → Route to `/components/ui/`:
- "Create a reusable [component]"
- "Build a shared [component]" 
- "Make a common [component]"
- "Design system [component]"

#### 2. Feature Keywords → Route to `/components/features/`:
- "Build [feature name] functionality"
- "Create [business logic]"
- "Implement [user workflow]"

### 🔧 Development Commands
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint

# View component demos
# Navigate to /demo in browser
```

### 🚀 Rapid Prototyping Patterns

#### Form Creation (5 minutes)
```tsx
import { Input, Button, Checkbox, Select } from '@/components/ui';

const QuickForm = () => (
  <form className="space-y-4 max-w-md">
    <Input 
      label="Email" 
      type="email" 
      required 
      leftIcon={<Mail className="h-4 w-4" />}
    />
    <Select 
      label="Country"
      options={countries}
      searchable
    />
    <Checkbox 
      label="Subscribe to newsletter"
      description="Get updates about new features"
    />
    <Button type="submit" className="w-full">
      Sign Up
    </Button>
  </form>
);
```

#### Dashboard Layout (10 minutes)
```tsx
import { Sidebar, TopNavigator, Section, Card, DataTable } from '@/components/ui';

const Dashboard = () => (
  <div className="min-h-screen bg-background">
    <TopNavigator items={navItems} />
    <div className="flex">
      <Sidebar 
        items={sidebarItems} 
        collapsible 
        showOnMobile 
      />
      <main className="flex-1 p-4">
        <Section title="Analytics" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card title="Users">
              <DataTable data={users} columns={userColumns} />
            </Card>
          </div>
        </Section>
      </main>
    </div>
  </div>
);
```

#### Modal Workflow (3 minutes)
```tsx
import { Dialog, Button, Input } from '@/components/ui';

const [open, setOpen] = useState(false);

// Simple confirmation
<Dialog 
  open={open}
  onOpenChange={setOpen}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  footer={
    <div className="flex gap-2">
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button onClick={handleConfirm}>
        Confirm
      </Button>
    </div>
  }
/>
```

## 🎮 Interactive Demo System

### 📚 Demo Component Standards
Each UI component has a comprehensive demo showing:

- **All Variants**: default, error, success states
- **All Sizes**: sm, md, lg where applicable  
- **Interactive Examples**: Real form submissions, state changes
- **Copy-Paste Code**: Ready-to-use code snippets
- **Accessibility Features**: Keyboard navigation, screen reader support
- **Edge Cases**: Loading states, disabled states, error handling
- **Mobile Responsiveness**: Optimized for all screen sizes

### 🎯 Using Demos for Development
1. **Exploration**: Visit `/demo` to see all components
2. **Copy Patterns**: Use demo code as starting templates
3. **Customization**: Modify patterns for specific use cases

## 🔧 Development Best Practices

### ✅ Code Quality Standards
- TypeScript strict mode compliance
- ESLint passes without warnings  
- Components are responsive (mobile-first)
- Accessibility testing with keyboard navigation
- Error boundaries for error handling
- Loading states for async operations
- Proper form validation patterns

### 🎨 Styling Guidelines
- **Mobile First**: Always start with mobile styles
- **Semantic Tokens**: Use design system tokens
- **Consistent Spacing**: Follow spacing scale
- **Focus States**: Proper focus indicators
- **Color Usage**: Semantic color meanings

### 🧪 Testing Strategy
- **Unit Tests**: Component logic
- **Integration Tests**: User workflows  
- **Accessibility Tests**: WCAG compliance
- **Visual Tests**: Cross-browser compatibility
- **Mobile Tests**: Responsive behavior

## 🚀 Production Deployment

### ✅ Pre-Deployment Checklist
- `pnpm build` succeeds without errors
- `pnpm lint` passes  
- `pnpm type-check` passes
- All pages load correctly
- Mobile responsiveness tested
- Accessibility audit completed  
- Performance audit (Lighthouse score 90+)

### ⚡ Performance Optimization
- **Images**: Next.js `Image` component
- **Fonts**: Optimized with `next/font`
- **Bundle**: Automatic code splitting
- **SEO**: Meta tags configured
- **Analytics**: Performance monitoring

### 🔒 Security Best Practices
- No secrets in client code
- Input validation and sanitization
- HTTPS enforcement
- Content Security Policy
- Regular dependency updates

## 💡 Quick Reference

### 🎯 Common Development Patterns

#### Responsive Form Layout
```tsx
<div className="w-full max-w-md mx-auto space-y-4">
  <Input 
    label="Email" 
    type="email" 
    required 
    error={errors.email}
    size="md"
  />
  <Button 
    type="submit" 
    loading={isSubmitting}
    className="w-full"
  >
    Submit
  </Button>
</div>
```

#### Data Display Pattern
```tsx
<Section title="User Management" padding="lg">
  <DataTable 
    data={users}
    columns={userColumns}
    filterMode="both"
    displayMode="pagination"
    pageSize={10}
    variant="card"
  />
</Section>
```

#### Navigation Layout
```tsx
<div className="min-h-screen">
  <TopNavigator items={navItems} />
  <div className="flex">
    <Sidebar 
      items={sidebarItems}
      collapsible
      showOnMobile
      mobileOverlay
    />
    <main className="flex-1 min-w-0">
      {children}
    </main>
  </div>
</div>
```

### 🚀 Essential Commands
```bash
pnpm dev              # Start development
pnpm build            # Production build  
pnpm lint             # Code quality check
pnpm type-check       # TypeScript validation
visit /demo           # Explore components
```

## 🎯 Component Quick Start

### Input Components
```tsx
// Text Input
<Input label="Name" placeholder="Enter name" required />

// Select Dropdown  
<Select label="Country" options={countries} searchable />

// Date Selection
<DatePicker label="Birth Date" />

// Toggle Switch
<Switch label="Enable notifications" />
```

### Layout Components
```tsx
// Flexible Section
<Section title="Settings" padding="lg" background="card">
  {content}
</Section>

// Data Table
<DataTable 
  data={items} 
  columns={columns}
  filterMode="search"
  displayMode="pagination"
/>

// Navigation
<Sidebar items={menuItems} collapsible showOnMobile />
```

### Action Components  
```tsx
// Primary Button
<Button leftIcon={<Save />} loading={saving}>
  Save Changes
</Button>

// Modal Dialog
<Dialog 
  title="Confirm"
  description="Are you sure?"
  open={open}
  onOpenChange={setOpen}
/>
```

---

**Remember**: This boilerplate is designed for speed without sacrificing quality. Every pattern and component has been battle-tested in production environments with full mobile optimization.

## 📈 Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s  
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Mobile Performance Score**: 90+
- **Desktop Performance Score**: 95+

**Build once, deploy everywhere. Scale with confidence.**