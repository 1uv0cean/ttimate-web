'use client';

import { Switch } from '@/components/ui/Switch';
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
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

export const SwitchDemo = () => {
  // Basic examples
  const [simple1, setSimple1] = useState(false);
  const [simple2, setSimple2] = useState(true);
  const [simple3, setSimple3] = useState(false);

  // With labels
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Variant states
  const [defaultVariant, setDefaultVariant] = useState(true);
  const [successVariant, setSuccessVariant] = useState(true);
  const [errorVariant, setErrorVariant] = useState(false);

  // Error states
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);

  // Account settings
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  // Privacy preferences
  const [dataCollection, setDataCollection] = useState(false);
  const [thirdParty, setThirdParty] = useState(false);
  const [cookies, setCookies] = useState(true);

  // Age confirmation
  const [ageConfirm, setAgeConfirm] = useState(true);

  // Custom colors - Basic examples
  const [customColor1, setCustomColor1] = useState(true);
  const [customColor2, setCustomColor2] = useState(false);
  const [customColor3, setCustomColor3] = useState(true);
  const [customColor4, setCustomColor4] = useState(false);
  const [customColor5, setCustomColor5] = useState(true);

  // Custom colors - Size variants
  const [customSizeSmall, setCustomSizeSmall] = useState(false);
  const [customSizeMedium, setCustomSizeMedium] = useState(true);
  const [customSizeLarge, setCustomSizeLarge] = useState(false);

  // Custom colors - Required fields
  const [customRequired1, setCustomRequired1] = useState(false);
  const [customRequired2, setCustomRequired2] = useState(true);

  // Advanced features
  const [autoSave, setAutoSave] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [backupEnabled, setBackupEnabled] = useState(false);

  // Accessibility options
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(true);
  const [screenReader, setScreenReader] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Simple Switch">
            <Switch checked={simple1} onCheckedChange={setSimple1} />
            <Switch checked={simple2} onCheckedChange={setSimple2} />
            <Switch checked={simple3} onCheckedChange={setSimple3} />
          </DemoItem>

          <DemoItem label="With Labels">
            <Switch label="Basic switch" checked={basicSwitch} onCheckedChange={setBasicSwitch} />
            <Switch
              label="Push notifications"
              description="Receive notifications on your device"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
            <Switch
              label="Dark mode"
              description="Switch to dark theme for better night viewing"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Variant Types">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="All Variants">
            <Switch
              variant="default"
              label="Default variant"
              checked={defaultVariant}
              onCheckedChange={setDefaultVariant}
            />
            <Switch
              variant="success"
              label="Success variant"
              checked={successVariant}
              onCheckedChange={setSuccessVariant}
            />
            <Switch
              variant="error"
              label="Error variant"
              checked={errorVariant}
              onCheckedChange={setErrorVariant}
            />
          </DemoItem>

          <DemoItem label="Error States">
            <Switch
              variant={!terms ? 'error' : 'default'}
              label="Accept terms and conditions"
              description="Please accept our terms to continue"
              error={!terms ? 'You must accept the terms and conditions' : undefined}
              checked={terms}
              onCheckedChange={setTerms}
              required
            />
            <Switch
              variant={!privacy ? 'error' : 'default'}
              label="Accept privacy policy"
              error={!privacy ? 'This field is required' : undefined}
              checked={privacy}
              onCheckedChange={setPrivacy}
              required
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Interactive States">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Disabled States">
            <Switch disabled label="Disabled off" />
            <Switch disabled checked label="Disabled on" />
            <Switch
              disabled
              label="Disabled with description"
              description="This switch cannot be toggled"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Settings Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Account Settings">
            <Switch
              label="Email notifications"
              description="Receive notifications via email"
              checked={emailNotif}
              onCheckedChange={setEmailNotif}
            />
            <Switch
              label="SMS notifications"
              description="Receive notifications via SMS"
              checked={smsNotif}
              onCheckedChange={setSmsNotif}
            />
            <Switch
              label="Marketing emails"
              description="Receive promotional content and offers"
              checked={marketing}
              onCheckedChange={setMarketing}
            />
            <Switch
              label="Two-factor authentication"
              description="Add an extra layer of security to your account"
              variant="success"
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
            />
          </DemoItem>

          <DemoItem label="Privacy Preferences">
            <Switch
              label="Data collection"
              description="Allow us to collect anonymous usage data"
              helperText="This helps us improve our service"
              checked={dataCollection}
              onCheckedChange={setDataCollection}
            />
            <Switch
              label="Third-party sharing"
              description="Share data with trusted partners"
              disabled
              helperText="Currently disabled by administrator"
              checked={thirdParty}
              onCheckedChange={setThirdParty}
            />
            <Switch
              label="Cookies"
              description="Accept all cookies for better experience"
              checked={cookies}
              onCheckedChange={setCookies}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Required Fields">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Required Switches">
            <Switch
              label="I agree to the terms of service"
              description="Please read and accept our terms"
              required
              variant={!terms ? 'error' : 'default'}
              error={!terms ? 'You must accept the terms to continue' : undefined}
              checked={terms}
              onCheckedChange={setTerms}
            />
            <Switch
              label="I agree to the privacy policy"
              description="Please read and accept our privacy policy"
              required
              variant={!privacy ? 'error' : 'default'}
              error={!privacy ? 'This field is required' : undefined}
              checked={privacy}
              onCheckedChange={setPrivacy}
            />
            <Switch
              label="I am over 18 years old"
              description="Confirm your age to proceed"
              required
              variant="success"
              checked={ageConfirm}
              onCheckedChange={setAgeConfirm}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Custom Colors">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Hex Colors">
            <Switch
              customColor="#ff6b35"
              label="Orange switch"
              description="Custom orange color"
              checked={customColor1}
              onCheckedChange={setCustomColor1}
            />
            <Switch
              customColor="#7b68ee"
              label="Purple switch"
              description="Custom purple color"
              checked={customColor2}
              onCheckedChange={setCustomColor2}
            />
            <Switch
              customColor="#20b2aa"
              label="Teal switch"
              description="Custom teal color"
              checked={customColor3}
              onCheckedChange={setCustomColor3}
            />
            <Switch
              customColor="#ff1493"
              label="Pink switch"
              description="Custom pink color"
              checked={customColor4}
              onCheckedChange={setCustomColor4}
            />
            <Switch
              customColor="#32cd32"
              label="Lime switch"
              description="Custom lime color"
              checked={customColor5}
              onCheckedChange={setCustomColor5}
            />
          </DemoItem>

          <DemoItem label="Multiple Custom Colors">
            <Switch
              customColor="#e91e63"
              label="Pink switch"
              checked={customSizeSmall}
              onCheckedChange={setCustomSizeSmall}
            />
            <Switch
              customColor="#9c27b0"
              label="Purple switch"
              checked={customSizeMedium}
              onCheckedChange={setCustomSizeMedium}
            />
            <Switch
              customColor="#607d8b"
              label="Blue-grey switch"
              checked={customSizeLarge}
              onCheckedChange={setCustomSizeLarge}
            />
          </DemoItem>

          <DemoItem label="Custom Colors with Required Fields">
            <Switch
              customColor="#ff9800"
              label="Accept orange terms"
              description="Please accept our special terms"
              required
              checked={customRequired1}
              onCheckedChange={setCustomRequired1}
            />
            <Switch
              customColor="#4caf50"
              label="Green agreement"
              description="Eco-friendly options enabled"
              required
              checked={customRequired2}
              onCheckedChange={setCustomRequired2}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Advanced Features">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="App Features">
            <div className="space-y-4 rounded-lg border p-4">
              <h5 className="font-medium">Application Settings</h5>
              <Switch
                label="Auto-save"
                description="Automatically save your work"
                checked={autoSave}
                onCheckedChange={setAutoSave}
              />
              <Switch
                label="Offline mode"
                description="Enable offline functionality"
                checked={offlineMode}
                onCheckedChange={setOfflineMode}
              />
              <Switch
                label="Sync enabled"
                description="Sync data across devices"
                variant="success"
                checked={syncEnabled}
                onCheckedChange={setSyncEnabled}
              />
              <Switch
                label="Backup enabled"
                description="Create automatic backups"
                checked={backupEnabled}
                onCheckedChange={setBackupEnabled}
              />
            </div>
          </DemoItem>

          <DemoItem label="Accessibility Options">
            <div className="space-y-4 rounded-lg border p-4">
              <h5 className="font-medium">Accessibility Settings</h5>
              <Switch
                label="High contrast mode"
                description="Use high contrast colors for better visibility"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
              <Switch
                label="Large text"
                description="Increase text size throughout the application"
                checked={largeText}
                onCheckedChange={setLargeText}
              />
              <Switch
                label="Screen reader support"
                description="Optimize interface for screen readers"
                variant="success"
                checked={screenReader}
                onCheckedChange={setScreenReader}
              />
              <Switch
                label="Reduced motion"
                description="Minimize animations and transitions"
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};
