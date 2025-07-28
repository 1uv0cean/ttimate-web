'use client';

import { Select, SelectOption } from '@/components/ui/Select';
import { Globe, MapPin, User } from 'lucide-react';
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

export const SelectDemo = () => {
  const [values, setValues] = useState({
    basic: '',
    withLabel: '',
    withError: '',
    withSuccess: '',
    searchable: '',
    withIcon: '',
  });

  const handleChange = (key: string) => (value: string) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const basicOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'disabled', label: 'Disabled Option', disabled: true },
  ];

  const countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'kr', label: 'South Korea' },
    { value: 'cn', label: 'China' },
    { value: 'in', label: 'India' },
    { value: 'br', label: 'Brazil' },
    { value: 'mx', label: 'Mexico' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'nl', label: 'Netherlands' },
    { value: 'se', label: 'Sweden' },
    { value: 'no', label: 'Norway' },
    { value: 'dk', label: 'Denmark' },
    { value: 'fi', label: 'Finland' },
    { value: 'pl', label: 'Poland' },
  ];

  const cityOptions: SelectOption[] = [
    { value: 'nyc', label: 'New York City' },
    { value: 'london', label: 'London' },
    { value: 'paris', label: 'Paris' },
    { value: 'tokyo', label: 'Tokyo' },
    { value: 'seoul', label: 'Seoul' },
    { value: 'sydney', label: 'Sydney' },
    { value: 'berlin', label: 'Berlin' },
    { value: 'toronto', label: 'Toronto' },
  ];

  const roleOptions: SelectOption[] = [
    { value: 'admin', label: 'Administrator' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
    { value: 'guest', label: 'Guest' },
  ];

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Basic Select">
            <Select
              placeholder="Choose an option"
              options={basicOptions}
              value={values.basic}
              onValueChange={handleChange('basic')}
            />
          </DemoItem>
          <DemoItem label="Required Select">
            <Select
              label="Country"
              placeholder="Select country"
              required
              options={countryOptions}
              value={values.withLabel}
              onValueChange={handleChange('withLabel')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          <DemoItem label="Small">
            <Select
              size="sm"
              placeholder="Small select"
              options={basicOptions}
            />
          </DemoItem>
          <DemoItem label="Medium">
            <Select
              size="md"
              placeholder="Medium select"
              options={basicOptions}
            />
          </DemoItem>
          <DemoItem label="Large">
            <Select
              size="lg"
              placeholder="Large select"
              options={basicOptions}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="State Variants">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Error State">
            <Select
              variant="error"
              label="Invalid Selection"
              placeholder="Select an option"
              error="Please select a valid option"
              options={basicOptions}
              value={values.withError}
              onValueChange={handleChange('withError')}
            />
          </DemoItem>
          <DemoItem label="Success State">
            <Select
              variant="success"
              label="Verified Selection"
              placeholder="Select an option"
              success={true}
              options={basicOptions}
              value={values.withSuccess}
              onValueChange={handleChange('withSuccess')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Special Features">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Searchable Select">
            <Select
              label="City"
              placeholder="Search cities"
              searchable={true}
              options={cityOptions}
              value={values.searchable}
              onValueChange={handleChange('searchable')}
            />
          </DemoItem>
          <DemoItem label="With Icon">
            <Select
              label="User Role"
              placeholder="Select role"
              leftIcon={<User className="h-4 w-4" />}
              options={roleOptions}
              value={values.withIcon}
              onValueChange={handleChange('withIcon')}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Icons">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Location Icon">
            <Select
              placeholder="Select location"
              leftIcon={<MapPin className="h-4 w-4" />}
              options={cityOptions}
            />
          </DemoItem>
          <DemoItem label="Country Icon">
            <Select
              placeholder="Select country"
              leftIcon={<Globe className="h-4 w-4" />}
              options={countryOptions}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="States">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <DemoItem label="Loading">
            <Select
              placeholder="Loading options..."
              loading={true}
              options={basicOptions}
            />
          </DemoItem>
          <DemoItem label="Disabled">
            <Select
              placeholder="Disabled select"
              disabled
              options={basicOptions}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Complex Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Advanced Country Selector">
            <Select
              label="Country/Region"
              placeholder="Search countries"
              searchable={true}
              leftIcon={<Globe className="h-4 w-4" />}
              options={countryOptions}
            />
          </DemoItem>
          <DemoItem label="Role Assignment">
            <Select
              variant="error"
              label="User Role"
              placeholder="Assign role"
              leftIcon={<User className="h-4 w-4" />}
              options={roleOptions}
              error="Role assignment is required"
            />
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};