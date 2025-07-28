'use client';

import { Input } from '@/components/ui/Input';
import { Lock, Mail, Phone, Search, User } from 'lucide-react';
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
      <div>{children}</div>
    </div>
  );
};

export const InputDemo = () => {
  const [values, setValues] = useState({
    basic: '',
    withLabel: '',
    withError: '',
    withSuccess: '',
    password: '',
    clearable: '',
    withIcons: '',
  });

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Basic Input">
            <Input
              placeholder="Basic input"
              value={values.basic}
              onChange={handleChange('basic')}
            />
          </DemoItem>
          <DemoItem label="Required Input">
            <Input
              label="Username"
              placeholder="Enter name"
              required
              value={values.withLabel}
              onChange={handleChange('withLabel')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <DemoItem label="Small">
            <Input size="sm" placeholder="Small size" className="w-full max-w-[200px]" />
          </DemoItem>
          <DemoItem label="Medium">
            <Input size="md" placeholder="Medium size" className="w-full max-w-[200px]" />
          </DemoItem>
          <DemoItem label="Large">
            <Input size="lg" placeholder="Large size" className="w-full max-w-[200px]" />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="State Variants">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Error State">
            <Input
              variant="error"
              label="Email"
              placeholder="Enter email"
              error="Invalid format"
              value={values.withError}
              onChange={handleChange('withError')}
            />
          </DemoItem>
          <DemoItem label="Success State">
            <Input
              variant="success"
              label="Username"
              placeholder="Enter username"
              success={true}
              value={values.withSuccess}
              onChange={handleChange('withSuccess')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Special Features">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Password Toggle">
            <Input
              type="password"
              placeholder="Password"
              showPasswordToggle={true}
              value={values.password}
              onChange={handleChange('password')}
            />
          </DemoItem>
          <DemoItem label="Clear Button">
            <Input
              placeholder="Clearable input"
              clearable={true}
              value={values.clearable}
              onChange={handleChange('clearable')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Icons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Left Icon">
            <Input placeholder="Search" leftIcon={<Search className="h-4 w-4" />} />
          </DemoItem>
          <DemoItem label="Both Icons">
            <Input
              placeholder="User info"
              leftIcon={<User className="h-4 w-4" />}
              rightIcon={<Mail className="h-4 w-4" />}
              value={values.withIcons}
              onChange={handleChange('withIcons')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Input Types">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <DemoItem label="Email">
            <Input type="email" placeholder="Email" leftIcon={<Mail className="h-4 w-4" />} />
          </DemoItem>
          <DemoItem label="Phone">
            <Input type="tel" placeholder="Phone number" leftIcon={<Phone className="h-4 w-4" />} />
          </DemoItem>
          <DemoItem label="Number">
            <Input type="number" placeholder="Age" />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="States">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Loading">
            <Input placeholder="Loading..." loading={true} />
          </DemoItem>
          <DemoItem label="Disabled">
            <Input placeholder="Disabled" disabled />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Complex Examples">
        <div className="space-y-8">
          <DemoItem label="Advanced Search">
            <Input
              placeholder="Search keywords"
              leftIcon={<Search className="h-4 w-4" />}
              clearable={true}
              helperText="Press Enter to search"
            />
          </DemoItem>
          <DemoItem label="Security Code">
            <Input
              variant="error"
              placeholder="6-digit code"
              leftIcon={<Lock className="h-4 w-4" />}
              error="Code is incorrect"
              maxLength={6}
            />
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};
