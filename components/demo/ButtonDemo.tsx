'use client';

import { Button } from '@/components/ui/Button';
import { 
  Download, 
  Upload, 
  Save, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  Settings, 
  User,
  Mail,
  Phone,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
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
      <div className="flex flex-wrap gap-2 sm:gap-3">{children}</div>
    </div>
  );
};

export const ButtonDemo = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingDemo = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Primary Button">
            <Button>Click me</Button>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Add Item
            </Button>
            <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
          </DemoItem>
          
          <DemoItem label="Secondary Button">
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary" leftIcon={<Edit className="h-4 w-4" />}>
              Edit
            </Button>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Variant Types">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="All Variants">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="info">Info</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </DemoItem>
          
          <DemoItem label="HMM Brand Colors">
            <Button variant="hmm-marine">HMM Marine Blue</Button>
            <Button variant="hmm-red">HMM Pioneer Red</Button>
          </DemoItem>
          
          <DemoItem label="Brand Colors with Icons">
            <Button variant="hmm-marine" leftIcon={<Save className="h-4 w-4" />}>
              Save Document
            </Button>
            <Button variant="hmm-red" leftIcon={<Plus className="h-4 w-4" />}>
              Add Container
            </Button>
            <Button variant="hmm-marine" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue Booking
            </Button>
          </DemoItem>
          
          <DemoItem label="Other Variants with Icons">
            <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
              Delete
            </Button>
            <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
              Download
            </Button>
            <Button variant="ghost" rightIcon={<ChevronDown className="h-4 w-4" />}>
              More Options
            </Button>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Text Buttons">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </DemoItem>
          
          <DemoItem label="Icon Buttons">
            <Button size="icon" variant="outline">
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary">
              <User className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </DemoItem>
          
          <DemoItem label="Mixed Sizes with Icons">
            <Button size="sm" leftIcon={<Mail className="h-3 w-3" />}>
              Email
            </Button>
            <Button size="md" leftIcon={<Phone className="h-4 w-4" />}>
              Call
            </Button>
            <Button size="lg" leftIcon={<Upload className="h-5 w-5" />}>
              Upload File
            </Button>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Interactive States">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Loading States">
            <Button loading>Loading...</Button>
            <Button variant="secondary" loading>
              Processing
            </Button>
            <Button 
              variant="outline" 
              loading={loading}
              onClick={handleLoadingDemo}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DemoItem>
          
          <DemoItem label="Disabled States">
            <Button disabled>Disabled</Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <Button variant="outline" disabled leftIcon={<Settings className="h-4 w-4" />}>
              Disabled with Icon
            </Button>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Icon Combinations">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Left Icons">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Add New
            </Button>
            <Button variant="secondary" leftIcon={<Search className="h-4 w-4" />}>
              Search
            </Button>
            <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
              Export
            </Button>
          </DemoItem>
          
          <DemoItem label="Right Icons">
            <Button rightIcon={<ArrowRight className="h-4 w-4" />}>
              Next Step
            </Button>
            <Button variant="secondary" rightIcon={<ChevronDown className="h-4 w-4" />}>
              Options
            </Button>
          </DemoItem>
          
          <DemoItem label="Loading with Icons">
            <Button loading leftIcon={<Save className="h-4 w-4" />}>
              Saving...
            </Button>
            <Button variant="outline" loading rightIcon={<Upload className="h-4 w-4" />}>
              Uploading...
            </Button>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Action Groups">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Primary Actions">
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Create New
            </Button>
            <Button variant="secondary" leftIcon={<Edit className="h-4 w-4" />}>
              Edit
            </Button>
            <Button variant="outline" leftIcon={<Save className="h-4 w-4" />}>
              Save Draft
            </Button>
          </DemoItem>
          
          <DemoItem label="Destructive Actions">
            <Button variant="destructive" leftIcon={<Trash2 className="h-4 w-4" />}>
              Delete
            </Button>
            <Button variant="outline" leftIcon={<Trash2 className="h-4 w-4" />}>
              Remove
            </Button>
          </DemoItem>
          
          <DemoItem label="Utility Actions">
            <Button variant="ghost" size="sm" leftIcon={<Download className="h-3 w-3" />}>
              Export
            </Button>
            <Button variant="ghost" size="sm" leftIcon={<Upload className="h-3 w-3" />}>
              Import
            </Button>
            <Button variant="ghost" size="sm" leftIcon={<Settings className="h-3 w-3" />}>
              Settings
            </Button>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Custom Colors">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Hex Colors">
            <Button customColor="#ff6b35">Orange</Button>
            <Button customColor="#7b68ee">Purple</Button>
            <Button customColor="#20b2aa">Teal</Button>
            <Button customColor="#ff1493">Pink</Button>
            <Button customColor="#32cd32">Lime</Button>
          </DemoItem>
          
          <DemoItem label="Custom Colors with Icons">
            <Button customColor="#ff6b35" leftIcon={<Save className="h-4 w-4" />}>
              Save Draft
            </Button>
            <Button customColor="#7b68ee" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
            <Button customColor="#20b2aa" size="sm" leftIcon={<Plus className="h-3 w-3" />}>
              Add Item
            </Button>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Complex Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="HMM Business Actions">
            <Button variant="hmm-marine" size="lg" leftIcon={<Save className="h-5 w-5" />}>
              Complete Booking
            </Button>
            <Button variant="outline" size="lg">
              Draft Booking
            </Button>
            <Button variant="hmm-red" size="lg" leftIcon={<Plus className="h-5 w-5" />}>
              New Container
            </Button>
          </DemoItem>
          
          <DemoItem label="General Form Actions">
            <Button size="lg" leftIcon={<Save className="h-5 w-5" />}>
              Save Changes
            </Button>
            <Button variant="outline" size="lg">
              Cancel
            </Button>
            <Button variant="destructive" size="lg" leftIcon={<Trash2 className="h-5 w-5" />}>
              Delete Item
            </Button>
          </DemoItem>
          
          <DemoItem label="Navigation Actions">
            <Button variant="ghost" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue Setup
            </Button>
            <Button variant="link" size="sm">
              Skip for now
            </Button>
          </DemoItem>
          
          <DemoItem label="Mixed Custom Colors">
            <Button customColor="#e91e63" leftIcon={<Save className="h-4 w-4" />}>
              Save Project
            </Button>
            <Button customColor="#9c27b0" variant="outline" size="lg">
              Custom Outline
            </Button>
            <Button customColor="#607d8b" loading>
              Processing...
            </Button>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};