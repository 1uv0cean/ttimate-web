'use client';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { Section } from '@/components/ui/Section';

export const SectionDemo = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Basic Sections */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg font-medium">Basic Sections</h3>

        <Section title="Simple Section" description="A basic section with title and description">
          <p className="text-muted-foreground text-sm">
            This is the content inside a simple section.
          </p>
        </Section>

        <Section
          title="Section with Action"
          description="A section with a header action button"
          headerAction={<Button size="sm">Action</Button>}
        >
          <p className="text-muted-foreground text-sm">
            This section has an action button in the header.
          </p>
        </Section>

        <Section>
          <p className="text-muted-foreground text-sm">This is a section without a header.</p>
        </Section>
      </div>

      {/* Padding Variants */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg font-medium">Padding Variants</h3>

        <Section title="No Padding" padding="none" border="rounded">
          <div className="bg-muted/50 rounded p-4">Content with no section padding</div>
        </Section>

        <Section title="Small Padding" padding="sm" border="rounded">
          <p className="text-muted-foreground text-sm">Small padding (p-4)</p>
        </Section>

        <Section title="Medium Padding" padding="md" border="rounded">
          <p className="text-muted-foreground text-sm">Medium padding (p-6) - default</p>
        </Section>

        <Section title="Large Padding" padding="lg" border="rounded">
          <p className="text-muted-foreground text-sm">Large padding (p-8)</p>
        </Section>

        <Section title="Extra Large Padding" padding="xl" border="rounded">
          <p className="text-muted-foreground text-sm">Extra large padding (p-12)</p>
        </Section>
      </div>

      {/* Background Variants */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg font-medium">Background Variants</h3>

        <Section title="Default Background" background="default" border="rounded">
          <p className="text-muted-foreground text-sm">Default background color</p>
        </Section>

        <Section title="Muted Background" background="muted" border="rounded">
          <p className="text-muted-foreground text-sm">Muted background color</p>
        </Section>

        <Section title="Card Background" background="card" border="rounded">
          <p className="text-muted-foreground text-sm">Card background color</p>
        </Section>

        <Section title="Accent Background" background="accent" border="rounded">
          <p className="text-muted-foreground text-sm">Accent background color</p>
        </Section>
      </div>

      {/* Border Variants */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg font-medium">Border Variants</h3>

        <Section title="Default Border" border="default">
          <p className="text-muted-foreground text-sm">Section with default border</p>
        </Section>

        <Section title="Muted Border" border="muted">
          <p className="text-muted-foreground text-sm">Section with muted border</p>
        </Section>

        <Section title="Rounded Border" border="rounded">
          <p className="text-muted-foreground text-sm">Section with rounded border</p>
        </Section>

        <Section title="Rounded Muted Border" border="rounded-muted">
          <p className="text-muted-foreground text-sm">Section with rounded muted border</p>
        </Section>
      </div>

      {/* Spacing Variants */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg font-medium">Content Spacing</h3>

        <Section title="No Spacing" spacing="none" border="rounded">
          <div className="bg-muted/30 rounded p-2">Item 1</div>
          <div className="bg-muted/30 rounded p-2">Item 2</div>
          <div className="bg-muted/30 rounded p-2">Item 3</div>
        </Section>

        <Section title="Small Spacing" spacing="sm" border="rounded">
          <div className="bg-muted/30 rounded p-2">Item 1</div>
          <div className="bg-muted/30 rounded p-2">Item 2</div>
          <div className="bg-muted/30 rounded p-2">Item 3</div>
        </Section>

        <Section title="Medium Spacing" spacing="md" border="rounded">
          <div className="bg-muted/30 rounded p-2">Item 1</div>
          <div className="bg-muted/30 rounded p-2">Item 2</div>
          <div className="bg-muted/30 rounded p-2">Item 3</div>
        </Section>

        <Section title="Large Spacing" spacing="lg" border="rounded">
          <div className="bg-muted/30 rounded p-2">Item 1</div>
          <div className="bg-muted/30 rounded p-2">Item 2</div>
          <div className="bg-muted/30 rounded p-2">Item 3</div>
        </Section>
      </div>

      {/* HTML Element Variants */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg font-medium">HTML Element Types</h3>

        <Section as="article" title="Article Section" border="rounded">
          <p className="text-muted-foreground text-sm">
            This renders as an &lt;article&gt; element
          </p>
        </Section>

        <Section as="aside" title="Aside Section" border="rounded">
          <p className="text-muted-foreground text-sm">This renders as an &lt;aside&gt; element</p>
        </Section>

        <Section as="main" title="Main Section" border="rounded">
          <p className="text-muted-foreground text-sm">This renders as a &lt;main&gt; element</p>
        </Section>

        <Section as="div" title="Div Section" border="rounded">
          <p className="text-muted-foreground text-sm">This renders as a &lt;div&gt; element</p>
        </Section>
      </div>

      {/* Complex Example - Settings Form */}
      <div className="space-y-4 sm:space-y-6">
        <h3 className="text-lg font-medium">Complex Example - Settings Form</h3>

        <Section
          title="Account Settings"
          description="Manage your account preferences and profile information"
          background="card"
          border="rounded"
          padding="lg"
          spacing="lg"
          headerAction={
            <Button variant="outline" size="sm">
              Reset
            </Button>
          }
        >
          <Section
            title="Profile Information"
            padding="md"
            spacing="md"
            background="muted"
            border="rounded-muted"
          >
            <Input label="Full Name" placeholder="Enter your full name" />
            <Input label="Email" type="email" placeholder="Enter your email" />
          </Section>

          <Section
            title="Preferences"
            padding="md"
            spacing="sm"
            background="muted"
            border="rounded-muted"
          >
            <Checkbox label="Email notifications" description="Receive updates via email" />
            <Checkbox label="Marketing emails" description="Receive promotional content" />
            <Checkbox label="Security alerts" description="Get notified about security events" />
          </Section>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </Section>
      </div>
    </div>
  );
};
