'use client';

import { Button } from '@/components/ui/Button';
import { AlertDialog, ConfirmDialog, Dialog, DialogFooter } from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Mail,
  Phone,
  Settings,
  Upload,
  User,
} from 'lucide-react';
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
      <div className="flex flex-wrap gap-2 sm:gap-3">{children}</div>
    </div>
  );
};

export const DialogDemo = () => {
  const [dialogs, setDialogs] = useState({
    basic: false,
    withIcon: false,
    withForm: false,
    destructive: false,
    success: false,
    warning: false,
    info: false,
    alert: false,
    confirm: false,
    deleteConfirm: false,
    large: false,
    small: false,
    fullscreen: false,
    settings: false,
    profile: false,
    upload: false,
    scrolling: false,
    nestedParent: false,
    nestedChild: false,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const openDialog = (key: string) => {
    setDialogs((prev) => ({ ...prev, [key]: true }));
  };

  const closeDialog = (key: string) => {
    setDialogs((prev) => ({ ...prev, [key]: false }));
  };

  const handleFormSubmit = () => {
    console.log('Form submitted:', formData);
    closeDialog('withForm');
    closeDialog('profile');
    // Reset form
    setFormData({ name: '', email: '', phone: '' });
  };

  const handleDelete = () => {
    console.log('Item deleted');
    closeDialog('deleteConfirm');
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Basic Dialog">
            <Button onClick={() => openDialog('basic')}>Open Basic Dialog</Button>
            <Dialog
              open={dialogs.basic}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, basic: open }))}
              title="Basic Dialog"
              description="This is a basic dialog with title and description."
              footer={
                <DialogFooter>
                  <Button variant="outline" onClick={() => closeDialog('basic')}>
                    Cancel
                  </Button>
                  <Button onClick={() => closeDialog('basic')}>OK</Button>
                </DialogFooter>
              }
            >
              <p className="text-muted-foreground text-sm">
                This is the content of the dialog. You can put any content here including forms,
                lists, or other components.
              </p>
            </Dialog>
          </DemoItem>

          <DemoItem label="Dialog with Icon">
            <Button
              leftIcon={<Settings className="h-4 w-4" />}
              onClick={() => openDialog('withIcon')}
            >
              Open Settings
            </Button>
            <Dialog
              open={dialogs.withIcon}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, withIcon: open }))}
              title="Settings"
              description="Configure your application settings."
              icon={<Settings className="text-primary h-5 w-5" />}
              footer={
                <DialogFooter>
                  <Button variant="outline" onClick={() => closeDialog('withIcon')}>
                    Cancel
                  </Button>
                  <Button onClick={() => closeDialog('withIcon')}>Save Settings</Button>
                </DialogFooter>
              }
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div>
                    <label className="text-sm font-medium">Language</label>
                    <select className="border-input mt-1 w-full rounded-md border px-3 py-2 text-sm">
                      <option>English</option>
                      <option>Korean</option>
                      <option>Japanese</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Theme</label>
                    <select className="border-input mt-1 w-full rounded-md border px-3 py-2 text-sm">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notifications" className="rounded" />
                  <label htmlFor="notifications" className="text-sm">
                    Enable notifications
                  </label>
                </div>
              </div>
            </Dialog>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Variant Types">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="State Variants">
            <Button
              variant="destructive"
              leftIcon={<AlertTriangle className="h-4 w-4" />}
              onClick={() => openDialog('destructive')}
            >
              Error Dialog
            </Button>
            <Button
              variant="success"
              leftIcon={<CheckCircle className="h-4 w-4" />}
              onClick={() => openDialog('success')}
            >
              Success Dialog
            </Button>
            <Button
              variant="warning"
              leftIcon={<AlertTriangle className="h-4 w-4" />}
              onClick={() => openDialog('warning')}
            >
              Warning Dialog
            </Button>
            <Button
              variant="info"
              leftIcon={<Info className="h-4 w-4" />}
              onClick={() => openDialog('info')}
            >
              Info Dialog
            </Button>

            {/* Destructive Dialog */}
            <Dialog
              open={dialogs.destructive}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, destructive: open }))}
              variant="destructive"
              title="Error Occurred"
              description="An error occurred while processing your request."
              footer={
                <DialogFooter>
                  <Button variant="outline" onClick={() => closeDialog('destructive')}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => closeDialog('destructive')}>
                    Retry
                  </Button>
                </DialogFooter>
              }
            >
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">The following error occurred:</p>
                <div className="bg-destructive/10 border-destructive/20 rounded-md border p-3">
                  <code className="text-destructive text-sm">
                    Network connection failed. Please check your internet connection and try again.
                  </code>
                </div>
              </div>
            </Dialog>

            {/* Success Dialog */}
            <Dialog
              open={dialogs.success}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, success: open }))}
              variant="success"
              title="Success!"
              description="Your operation completed successfully."
              footer={
                <DialogFooter>
                  <Button onClick={() => closeDialog('success')}>Continue</Button>
                </DialogFooter>
              }
            >
              <p className="text-muted-foreground text-sm">
                Your data has been saved successfully. You can now continue with your workflow.
              </p>
            </Dialog>

            {/* Warning Dialog */}
            <Dialog
              open={dialogs.warning}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, warning: open }))}
              variant="warning"
              title="Warning"
              description="Please review before proceeding."
              footer={
                <DialogFooter>
                  <Button variant="outline" onClick={() => closeDialog('warning')}>
                    Cancel
                  </Button>
                  <Button onClick={() => closeDialog('warning')}>Proceed</Button>
                </DialogFooter>
              }
            >
              <p className="text-muted-foreground text-sm">
                This action may affect other parts of the system. Please make sure you want to
                continue.
              </p>
            </Dialog>

            {/* Info Dialog */}
            <Dialog
              open={dialogs.info}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, info: open }))}
              variant="info"
              title="Information"
              description="Here's some important information."
              footer={
                <DialogFooter>
                  <Button onClick={() => closeDialog('info')}>Got it</Button>
                </DialogFooter>
              }
            >
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">
                  This feature is currently in beta. Some functionality may be limited.
                </p>
                <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-sm">
                  <li>Feature may be unstable</li>
                  <li>Data backup recommended</li>
                  <li>Report issues to support</li>
                </ul>
              </div>
            </Dialog>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Different Sizes">
            <Button size="sm" onClick={() => openDialog('small')}>
              Small Dialog
            </Button>
            <Button onClick={() => openDialog('basic')}>Medium Dialog (Default)</Button>
            <Button size="lg" onClick={() => openDialog('large')}>
              Large Dialog
            </Button>
            <Button variant="outline" onClick={() => openDialog('fullscreen')}>
              Fullscreen Dialog
            </Button>

            {/* Small Dialog */}
            <Dialog
              open={dialogs.small}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, small: open }))}
              size="sm"
              title="Small Dialog"
              description="This is a small dialog."
              footer={
                <DialogFooter>
                  <Button size="sm" onClick={() => closeDialog('small')}>
                    Close
                  </Button>
                </DialogFooter>
              }
            >
              <p className="text-sm">
                This is a compact dialog for simple messages or quick actions.
              </p>
            </Dialog>

            {/* Large Dialog */}
            <Dialog
              open={dialogs.large}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, large: open }))}
              size="lg"
              title="Large Dialog"
              description="This dialog has more space for complex content."
              footer={
                <DialogFooter>
                  <Button variant="outline" onClick={() => closeDialog('large')}>
                    Cancel
                  </Button>
                  <Button onClick={() => closeDialog('large')}>Save</Button>
                </DialogFooter>
              }
            >
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Left Section</h4>
                    <p className="text-muted-foreground text-sm">
                      This large dialog provides more space for complex layouts and multiple
                      sections of content.
                    </p>
                    <div className="space-y-2">
                      <Input placeholder="Field 1" />
                      <Input placeholder="Field 2" />
                      <Input placeholder="Field 3" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Right Section</h4>
                    <p className="text-muted-foreground text-sm">
                      You can organize content in multiple columns and sections.
                    </p>
                    <div className="bg-muted rounded-md p-3">
                      <p className="text-sm">Additional content area</p>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog>

            {/* Fullscreen Dialog */}
            <Dialog
              open={dialogs.fullscreen}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, fullscreen: open }))}
              size="full"
              title="Fullscreen Dialog"
              description="This dialog takes up the entire screen."
              footer={
                <DialogFooter>
                  <Button variant="outline" onClick={() => closeDialog('fullscreen')}>
                    Cancel
                  </Button>
                  <Button onClick={() => closeDialog('fullscreen')}>Save Changes</Button>
                </DialogFooter>
              }
            >
              <div className="h-full space-y-6">
                <div className="grid h-full grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
                  <div className="space-y-4">
                    <h4 className="font-medium">Navigation</h4>
                    <div className="space-y-2">
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Button>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <Mail className="mr-2 h-4 w-4" />
                        Messages
                      </Button>
                    </div>
                  </div>
                  <div className="col-span-2 space-y-4">
                    <h4 className="font-medium">Main Content</h4>
                    <p className="text-muted-foreground text-sm">
                      Fullscreen dialogs are perfect for complex forms, detailed views, or when you
                      need maximum screen real estate.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                      <Input placeholder="Full name" />
                      <Input placeholder="Email address" />
                      <Input placeholder="Phone number" />
                      <Input placeholder="Company" />
                    </div>
                    <textarea
                      className="border-input min-h-[200px] w-full resize-none rounded-md border p-3 text-sm"
                      placeholder="Additional notes..."
                    />
                  </div>
                </div>
              </div>
            </Dialog>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Simple Alert & Confirm">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Alert Dialogs">
            <Button onClick={() => openDialog('alert')}>Show Alert</Button>
            <AlertDialog
              open={dialogs.alert}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, alert: open }))}
              title="Alert"
              message="This is a simple alert dialog with just an OK button."
              onConfirm={() => console.log('Alert acknowledged')}
            />
          </DemoItem>

          <DemoItem label="Confirm Dialogs">
            <Button onClick={() => openDialog('confirm')}>Show Confirm</Button>
            <Button variant="destructive" onClick={() => openDialog('deleteConfirm')}>
              Delete Item
            </Button>

            <ConfirmDialog
              open={dialogs.confirm}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, confirm: open }))}
              title="Confirm Action"
              message="Are you sure you want to proceed with this action?"
              onConfirm={() => console.log('Action confirmed')}
              onCancel={() => console.log('Action cancelled')}
            />

            <ConfirmDialog
              open={dialogs.deleteConfirm}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, deleteConfirm: open }))}
              variant="destructive"
              title="Delete Item"
              message="Are you sure you want to delete this item? This action cannot be undone."
              confirmText="Delete"
              onConfirm={handleDelete}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Business Use Cases">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="User Profile">
            <Button leftIcon={<User className="h-4 w-4" />} onClick={() => openDialog('profile')}>
              Edit Profile
            </Button>
            <Dialog
              open={dialogs.profile}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, profile: open }))}
              title="Edit Profile"
              description="Update your profile information."
              icon={<User className="text-primary h-5 w-5" />}
              footer={
                <DialogFooter>
                  <Button variant="outline" onClick={() => closeDialog('profile')}>
                    Cancel
                  </Button>
                  <Button onClick={handleFormSubmit}>Save Changes</Button>
                </DialogFooter>
              }
            >
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    leftIcon={<Mail className="h-4 w-4" />}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                    leftIcon={<Phone className="h-4 w-4" />}
                    className="mt-1"
                  />
                </div>
              </div>
            </Dialog>
          </DemoItem>

          <DemoItem label="File Upload">
            <Button leftIcon={<Upload className="h-4 w-4" />} onClick={() => openDialog('upload')}>
              Upload Files
            </Button>
            <Dialog
              open={dialogs.upload}
              onOpenChange={(open) => setDialogs((prev) => ({ ...prev, upload: open }))}
              size="lg"
              title="Upload Files"
              description="Select files to upload to the server."
              icon={<Upload className="text-primary h-5 w-5" />}
              footer={
                <DialogFooter>
                  <Button variant="outline" onClick={() => closeDialog('upload')}>
                    Cancel
                  </Button>
                  <Button onClick={() => closeDialog('upload')}>Start Upload</Button>
                </DialogFooter>
              }
            >
              <div className="space-y-4">
                <div className="border-muted-foreground/25 rounded-lg border-2 border-dashed p-8 text-center">
                  <Upload className="text-muted-foreground mx-auto mb-4 h-8 w-8" />
                  <p className="text-muted-foreground mb-2 text-sm">
                    Drag and drop files here, or click to select files
                  </p>
                  <Button variant="outline" size="sm">
                    Choose Files
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>document.pdf</span>
                    <span className="text-muted-foreground">2.4 MB</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>image.jpg</span>
                    <span className="text-muted-foreground">1.8 MB</span>
                  </div>
                </div>
              </div>
            </Dialog>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Advanced Features">
        <div className="space-y-4">
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <h4 className="mb-2 font-semibold text-blue-900">Dialog Features:</h4>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• Portal rendering for proper z-index stacking</li>
              <li>• Keyboard navigation (ESC to close)</li>
              <li>• Click outside to close (configurable)</li>
              <li>• Body scroll prevention when open</li>
              <li>• Accessibility with ARIA attributes</li>
              <li>• Composition pattern with Header, Content, Footer</li>
              <li>• Built-in AlertDialog and ConfirmDialog variants</li>
            </ul>
          </div>
        </div>
      </DemoSection>
    </div>
  );
};
