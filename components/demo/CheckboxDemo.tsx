'use client';

import { Checkbox } from '@/components/ui/Checkbox';
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

export const CheckboxDemo = () => {
  const [basicChecked, setBasicChecked] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  const [features, setFeatures] = useState({
    feature1: true,
    feature2: false,
    feature3: true,
  });

  // Simple checkbox states
  const [simple1, setSimple1] = useState(false);
  const [simple2, setSimple2] = useState(true);
  const [simple3, setSimple3] = useState(true);

  // Variant states
  const [defaultVariant, setDefaultVariant] = useState(true);
  const [successVariant, setSuccessVariant] = useState(true);
  const [errorVariant, setErrorVariant] = useState(true);

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

  // Subscription preferences
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [productUpdates, setProductUpdates] = useState(true);
  const [specialOffers, setSpecialOffers] = useState(false);
  const [eventInvites, setEventInvites] = useState(false);

  // Accessibility options
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(true);
  const [screenReader, setScreenReader] = useState(true);

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

  const handleFeatureChange = (key: keyof typeof features) => (checked: boolean) => {
    setFeatures((prev) => ({ ...prev, [key]: checked }));
  };

  const allFeaturesChecked = Object.values(features).every(Boolean);
  const someFeaturesChecked = Object.values(features).some(Boolean);

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Simple Checkbox">
            <Checkbox checked={simple1} onCheckedChange={setSimple1} />
            <Checkbox checked={simple2} onCheckedChange={setSimple2} />
            <Checkbox indeterminate={simple3} checked={simple3} onCheckedChange={setSimple3} />
          </DemoItem>

          <DemoItem label="With Labels">
            <Checkbox
              label="Basic checkbox"
              checked={basicChecked}
              onCheckedChange={setBasicChecked}
            />
            <Checkbox
              label="Newsletter subscription"
              description="Receive weekly updates about new features"
              checked={newsletter}
              onCheckedChange={setNewsletter}
            />
            <Checkbox
              label="Push notifications"
              description="Get notified about important updates"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Variant Types">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="All Variants">
            <Checkbox
              variant="default"
              label="Default variant"
              checked={defaultVariant}
              onCheckedChange={setDefaultVariant}
            />
            <Checkbox
              variant="success"
              label="Success variant"
              checked={successVariant}
              onCheckedChange={setSuccessVariant}
            />
            <Checkbox
              variant="error"
              label="Error variant"
              checked={errorVariant}
              onCheckedChange={setErrorVariant}
            />
          </DemoItem>

          <DemoItem label="Error States">
            <Checkbox
              variant={!terms ? 'error' : 'default'}
              label="Terms and conditions"
              description="Please accept our terms to continue"
              error={!terms ? 'You must accept the terms and conditions' : undefined}
              checked={terms}
              onCheckedChange={setTerms}
              required
            />
            <Checkbox
              variant={!privacy ? 'error' : 'default'}
              label="Privacy policy"
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
            <Checkbox disabled label="Disabled unchecked" />
            <Checkbox disabled checked label="Disabled checked" />
            <Checkbox disabled indeterminate label="Disabled indeterminate" />
          </DemoItem>

          <DemoItem label="Indeterminate State">
            <Checkbox
              checked={allFeaturesChecked}
              indeterminate={!allFeaturesChecked && someFeaturesChecked}
              onCheckedChange={(checked) => {
                setFeatures({
                  feature1: checked,
                  feature2: checked,
                  feature3: checked,
                });
              }}
              label="Select all features"
              description="Toggle all feature options"
            />
            <div className="ml-6 space-y-2">
              <Checkbox
                checked={features.feature1}
                onCheckedChange={handleFeatureChange('feature1')}
                label="Feature 1"
                description="Enable advanced analytics"
              />
              <Checkbox
                checked={features.feature2}
                onCheckedChange={handleFeatureChange('feature2')}
                label="Feature 2"
                description="Enable real-time notifications"
              />
              <Checkbox
                checked={features.feature3}
                onCheckedChange={handleFeatureChange('feature3')}
                label="Feature 3"
                description="Enable data export"
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Form Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Account Settings">
            <Checkbox
              label="Email notifications"
              description="Receive notifications via email"
              checked={emailNotif}
              onCheckedChange={setEmailNotif}
            />
            <Checkbox
              label="SMS notifications"
              description="Receive notifications via SMS"
              checked={smsNotif}
              onCheckedChange={setSmsNotif}
            />
            <Checkbox
              label="Marketing emails"
              description="Receive promotional content and offers"
              checked={marketing}
              onCheckedChange={setMarketing}
            />
            <Checkbox
              label="Two-factor authentication"
              description="Add an extra layer of security to your account"
              variant="success"
              checked={twoFactor}
              onCheckedChange={setTwoFactor}
            />
          </DemoItem>

          <DemoItem label="Privacy Preferences">
            <Checkbox
              label="Data collection"
              description="Allow us to collect anonymous usage data"
              helperText="This helps us improve our service"
              checked={dataCollection}
              onCheckedChange={setDataCollection}
            />
            <Checkbox
              label="Third-party sharing"
              description="Share data with trusted partners"
              disabled
              helperText="Currently disabled by administrator"
              checked={thirdParty}
              onCheckedChange={setThirdParty}
            />
            <Checkbox
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
          <DemoItem label="Required Checkboxes">
            <Checkbox
              label="I agree to the terms of service"
              description="Please read and accept our terms"
              required
              variant={!terms ? 'error' : 'default'}
              error={!terms ? 'You must accept the terms to continue' : undefined}
              checked={terms}
              onCheckedChange={setTerms}
            />
            <Checkbox
              label="I agree to the privacy policy"
              description="Please read and accept our privacy policy"
              required
              variant={!privacy ? 'error' : 'default'}
              error={!privacy ? 'This field is required' : undefined}
              checked={privacy}
              onCheckedChange={setPrivacy}
            />
            <Checkbox
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

      <DemoSection title="Complex Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Subscription Preferences">
            <div className="space-y-4 rounded-lg border p-4">
              <h5 className="font-medium">Newsletter Subscriptions</h5>
              <Checkbox
                label="Weekly digest"
                description="Get a summary of the week's content"
                checked={weeklyDigest}
                onCheckedChange={setWeeklyDigest}
              />
              <Checkbox
                label="Product updates"
                description="Be the first to know about new features"
                checked={productUpdates}
                onCheckedChange={setProductUpdates}
              />
              <Checkbox
                label="Special offers"
                description="Exclusive deals and promotions"
                variant="success"
                checked={specialOffers}
                onCheckedChange={setSpecialOffers}
              />
              <Checkbox
                label="Event invitations"
                description="Get invited to webinars and events"
                checked={eventInvites}
                onCheckedChange={setEventInvites}
              />
            </div>
          </DemoItem>

          <DemoItem label="Accessibility Options">
            <div className="space-y-4 rounded-lg border p-4">
              <h5 className="font-medium">Accessibility Settings</h5>
              <Checkbox
                label="High contrast mode"
                description="Use high contrast colors for better visibility"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
              <Checkbox
                label="Large text"
                description="Increase text size throughout the application"
                checked={largeText}
                onCheckedChange={setLargeText}
              />
              <Checkbox
                label="Screen reader support"
                description="Optimize interface for screen readers"
                variant="success"
                checked={screenReader}
                onCheckedChange={setScreenReader}
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Custom Colors">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Hex Colors">
            <Checkbox
              customColor="#ff6b35"
              label="Orange checkbox"
              description="Custom orange color"
              checked={customColor1}
              onCheckedChange={setCustomColor1}
            />
            <Checkbox
              customColor="#7b68ee"
              label="Purple checkbox"
              description="Custom purple color"
              checked={customColor2}
              onCheckedChange={setCustomColor2}
            />
            <Checkbox
              customColor="#20b2aa"
              label="Teal checkbox"
              description="Custom teal color"
              checked={customColor3}
              onCheckedChange={setCustomColor3}
            />
            <Checkbox
              customColor="#ff1493"
              label="Pink checkbox"
              description="Custom pink color"
              checked={customColor4}
              onCheckedChange={setCustomColor4}
            />
            <Checkbox
              customColor="#32cd32"
              label="Lime checkbox"
              description="Custom lime color"
              checked={customColor5}
              onCheckedChange={setCustomColor5}
            />
          </DemoItem>

          <DemoItem label="Multiple Custom Colors">
            <Checkbox
              customColor="#e91e63"
              label="Pink checkbox"
              checked={customSizeSmall}
              onCheckedChange={setCustomSizeSmall}
            />
            <Checkbox
              customColor="#9c27b0"
              label="Purple checkbox"
              checked={customSizeMedium}
              onCheckedChange={setCustomSizeMedium}
            />
            <Checkbox
              customColor="#607d8b"
              label="Blue-grey checkbox"
              checked={customSizeLarge}
              onCheckedChange={setCustomSizeLarge}
            />
          </DemoItem>

          <DemoItem label="Custom Colors with Required Fields">
            <Checkbox
              customColor="#ff9800"
              label="Accept orange terms"
              description="Please accept our special terms"
              required
              checked={customRequired1}
              onCheckedChange={setCustomRequired1}
            />
            <Checkbox
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
    </div>
  );
};
