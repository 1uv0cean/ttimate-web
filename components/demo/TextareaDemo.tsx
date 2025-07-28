'use client';

import { Textarea } from '@/components/ui/Textarea';
import { useState } from 'react';

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
      <h4 className="text-sm font-semibold tracking-wide text-gray-700 uppercase">{label}</h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export const TextareaDemo = () => {
  const [basicValue, setBasicValue] = useState('');
  const [commentValue, setCommentValue] = useState('');
  const [feedbackValue, setFeedbackValue] = useState('');
  const [errorValue, setErrorValue] = useState('');
  const [successValue, setSuccessValue] = useState('This is a valid message!');
  const [limitedValue, setLimitedValue] = useState('');
  const [resizableValue, setResizableValue] = useState('');

  const handleErrorValidation = (value: string) => {
    setErrorValue(value);
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Default Textarea">
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your message..."
                value={basicValue}
                onChange={(e) => setBasicValue(e.target.value)}
              />
              <Textarea
                label="With Label"
                placeholder="Enter your thoughts..."
                helperText="Share your thoughts with us"
              />
            </div>
          </DemoItem>

          <DemoItem label="Required Field">
            <Textarea
              label="Feedback"
              placeholder="Your feedback is important to us..."
              required
              helperText="This field is required"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Small Size">
            <Textarea
              size="sm"
              label="Small Textarea"
              placeholder="Small textarea for brief notes..."
              helperText="Compact size for short inputs"
            />
          </DemoItem>

          <DemoItem label="Medium Size (Default)">
            <Textarea
              size="md"
              label="Medium Textarea"
              placeholder="Standard textarea for regular content..."
              helperText="Default size for most use cases"
            />
          </DemoItem>

          <DemoItem label="Large Size">
            <Textarea
              size="lg"
              label="Large Textarea"
              placeholder="Large textarea for detailed content..."
              helperText="Spacious size for longer content"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="States">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Error State">
            <Textarea
              label="Message"
              placeholder="Type your message..."
              value={errorValue}
              onChange={(e) => handleErrorValidation(e.target.value)}
              error={
                errorValue.length < 10 && errorValue.length > 0
                  ? 'Message must be at least 10 characters long'
                  : ''
              }
              helperText="Minimum 10 characters required"
            />
          </DemoItem>

          <DemoItem label="Success State">
            <Textarea
              label="Approved Content"
              placeholder="Content looks good..."
              value={successValue}
              onChange={(e) => setSuccessValue(e.target.value)}
              success
              helperText="Content has been validated successfully"
            />
          </DemoItem>

          <DemoItem label="Disabled State">
            <Textarea
              label="Read-only Content"
              value="This content cannot be edited"
              disabled
              helperText="This field is currently disabled"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Character Limits">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="With Character Count">
            <Textarea
              label="Tweet Message"
              placeholder="What's happening?"
              value={limitedValue}
              onChange={(e) => setLimitedValue(e.target.value)}
              maxLength={280}
              showCount
              helperText="Share your thoughts in 280 characters or less"
            />
          </DemoItem>

          <DemoItem label="Feedback Form">
            <Textarea
              label="Detailed Feedback"
              placeholder="Please provide detailed feedback..."
              maxLength={500}
              showCount
              helperText="Help us improve by sharing your experience"
              size="lg"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Resize Options">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="No Resize">
            <Textarea
              label="Fixed Size"
              placeholder="This textarea cannot be resized..."
              resize="none"
              helperText="Size is fixed and cannot be changed"
            />
          </DemoItem>

          <DemoItem label="Vertical Resize (Default)">
            <Textarea
              label="Vertical Resize"
              placeholder="You can resize this vertically..."
              resize="vertical"
              helperText="Drag the bottom-right corner to resize vertically"
              value={resizableValue}
              onChange={(e) => setResizableValue(e.target.value)}
            />
          </DemoItem>

          <DemoItem label="Both Directions">
            <Textarea
              label="Free Resize"
              placeholder="You can resize this in any direction..."
              resize="both"
              helperText="Drag the corner to resize in any direction"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Custom Colors">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Brand Colors">
            <div className="grid grid-cols-1 gap-4 sm:gap-4 md:grid-cols-2">
              <Textarea
                label="Brand Primary"
                placeholder="Brand themed textarea..."
                customColor="#007bff"
                helperText="Custom blue theme"
              />
              <Textarea
                label="Brand Secondary"
                placeholder="Another brand color..."
                customColor="#6f42c1"
                helperText="Custom purple theme"
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Real-World Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Contact Form">
            <Textarea
              label="Message"
              placeholder="How can we help you?"
              required
              maxLength={1000}
              showCount
              helperText="Please describe your inquiry in detail"
              size="lg"
              value={feedbackValue}
              onChange={(e) => setFeedbackValue(e.target.value)}
            />
          </DemoItem>

          <DemoItem label="Code Snippet">
            <Textarea
              label="Code"
              placeholder="Paste your code here..."
              className="font-mono"
              helperText="Share your code for review"
              resize="both"
            />
          </DemoItem>

          <DemoItem label="Review Form">
            <div className="space-y-4">
              <Textarea
                label="Product Review"
                placeholder="Share your experience with this product..."
                required
                maxLength={500}
                showCount
                helperText="Your review helps other customers make informed decisions"
              />
              <div className="text-muted-foreground text-xs">
                💡 Tip: Include details about quality, usability, and value for money
              </div>
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};
