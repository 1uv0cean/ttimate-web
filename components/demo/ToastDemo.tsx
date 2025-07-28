'use client';

import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
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
      <h4 className="text-xs sm:text-sm font-semibold tracking-wide text-gray-700 uppercase">{label}</h4>
      <div className="space-y-4">{children}</div>
    </div>
  );
};

export const ToastDemo = () => {
  const { toast } = useToast();
  const [counter, setCounter] = useState(0);

  const showSuccessToast = () => {
    toast.success('Success!', 'Your action was completed successfully.');
  };

  const showErrorToast = () => {
    toast.error('Error occurred', 'Something went wrong. Please try again.');
  };

  const showWarningToast = () => {
    toast.warning('Warning', 'Please review your input before proceeding.');
  };

  const showInfoToast = () => {
    toast.info('Information', 'Here is some helpful information for you.');
  };

  const showDefaultToast = () => {
    toast.default('Notification', 'This is a standard notification message.');
  };

  const showCustomDurationToast = () => {
    toast.success('Quick toast', 'This will disappear in 2 seconds', { duration: 2000 });
  };

  const showPersistentToast = () => {
    toast.info('Persistent toast', 'This toast will stay until manually closed', { duration: 0 });
  };

  const showActionToast = () => {
    toast.warning(
      'Unsaved changes',
      'You have unsaved changes that will be lost.',
      {
        action: (
          <Button
            size="sm"
            variant="outline"
            onClick={() => alert('Changes saved!')}
          >
            Save
          </Button>
        ),
      }
    );
  };

  const showMultipleToasts = () => {
    const newCounter = counter + 1;
    setCounter(newCounter);
    
    toast.success(`Toast #${newCounter}`, `This is toast number ${newCounter}`);
    
    setTimeout(() => {
      toast.info(`Toast #${newCounter + 1}`, `This is toast number ${newCounter + 1}`);
    }, 500);
    
    setTimeout(() => {
      toast.warning(`Toast #${newCounter + 2}`, `This is toast number ${newCounter + 2}`);
    }, 1000);
  };

  const showLongContentToast = () => {
    toast.error(
      'Form Validation Failed',
      'Please check the following errors: Email format is invalid, password must be at least 8 characters long, and phone number is required.'
    );
  };

  const showMinimalToast = () => {
    toast.success('Saved!');
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Toasts will appear in the top-right corner (or bottom-right on mobile). 
          Click the buttons below to trigger different toast notifications.
        </p>
      </div>

      <DemoSection title="Basic Toast Types">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Standard Variants">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Button onClick={showSuccessToast} variant="outline">
                Success Toast
              </Button>
              <Button onClick={showErrorToast} variant="outline">
                Error Toast
              </Button>
              <Button onClick={showWarningToast} variant="outline">
                Warning Toast
              </Button>
              <Button onClick={showInfoToast} variant="outline">
                Info Toast
              </Button>
              <Button onClick={showDefaultToast} variant="outline">
                Default Toast
              </Button>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Toast Durations">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Duration Control">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={showCustomDurationToast} variant="outline">
                Quick (2s)
              </Button>
              <Button onClick={showSuccessToast} variant="outline">
                Normal (5s)
              </Button>
              <Button onClick={showPersistentToast} variant="outline">
                Persistent
              </Button>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Interactive Features">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Action Buttons">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={showActionToast} variant="outline">
                Toast with Action
              </Button>
              <Button onClick={showMultipleToasts} variant="outline">
                Multiple Toasts
              </Button>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Content Variations">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Different Content Types">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={showMinimalToast} variant="outline">
                Title Only
              </Button>
              <Button onClick={() => toast.info('', 'Description only toast without a title')} variant="outline">
                Description Only
              </Button>
              <Button onClick={showLongContentToast} variant="outline">
                Long Content
              </Button>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Real-World Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Common Use Cases">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => toast.success('Profile updated', 'Your profile information has been saved successfully.')}
                  variant="outline"
                >
                  Profile Saved
                </Button>
                <Button 
                  onClick={() => toast.error('Upload failed', 'The file size is too large. Please choose a smaller file.')}
                  variant="outline"
                >
                  Upload Error
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => toast.warning('Session expiring', 'Your session will expire in 5 minutes. Please save your work.')}
                  variant="outline"
                >
                  Session Warning
                </Button>
                <Button 
                  onClick={() => toast.info('New feature', 'Check out our new dark mode in settings!')}
                  variant="outline"
                >
                  Feature Announcement
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={() => toast.success('Order placed', 'Your order #12345 has been confirmed and will be processed shortly.', {
                    action: (
                      <Button size="sm" variant="outline" onClick={() => alert('Viewing order...')}>
                        View Order
                      </Button>
                    )
                  })}
                  variant="outline"
                >
                  Order Confirmation
                </Button>
                <Button 
                  onClick={() => toast.error('Payment failed', 'Your payment could not be processed. Please check your card details.', {
                    action: (
                      <Button size="sm" variant="outline" onClick={() => alert('Retrying payment...')}>
                        Retry
                      </Button>
                    )
                  })}
                  variant="outline"
                >
                  Payment Error
                </Button>
              </div>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Stress Test">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Multiple Toasts">
            <div className="space-y-4">
              <Button 
                onClick={() => {
                  // Create multiple toasts rapidly
                  for (let i = 1; i <= 5; i++) {
                    setTimeout(() => {
                      toast.info(`Batch Toast ${i}`, `This is toast ${i} of 5 in the batch`);
                    }, i * 200);
                  }
                }}
                variant="outline"
              >
                Show 5 Toasts (Batch)
              </Button>
              <p className="text-sm text-muted-foreground">
                This will create 5 toasts in quick succession to test the stacking behavior.
              </p>
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};