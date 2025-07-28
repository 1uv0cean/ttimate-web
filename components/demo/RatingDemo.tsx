'use client';

import { Rating, RatingScale } from '@/components/ui/Rating';
import { Section } from '@/components/ui/Section';
import { useState } from 'react';

interface DemoSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DemoSection = ({ title, children, className = '' }: DemoSectionProps) => (
  <Section
    title={title}
    padding="md"
    spacing="md"
    background="card"
    border="default"
    className={className}
  >
    {children}
  </Section>
);

interface DemoItemProps {
  label: string;
  children: React.ReactNode;
}

const DemoItem = ({ label, children }: DemoItemProps) => (
  <div className="space-y-3">
    <h4 className="text-sm font-semibold tracking-wide text-gray-700 uppercase">{label}</h4>
    <div className="space-y-4">{children}</div>
  </div>
);

// Custom scales for vessel inspection
const vesselScales: RatingScale[] = [
  { value: 0, label: 'Not Observed', color: 'text-gray-400' },
  { value: 1, label: 'Poor', color: 'text-red-500' },
  { value: 2, label: 'Good', color: 'text-green-500' },
];

const safetyScales: RatingScale[] = [
  { value: 1, label: 'Unsafe', color: 'text-red-600' },
  { value: 2, label: 'Needs Improvement', color: 'text-orange-500' },
  { value: 3, label: 'Acceptable', color: 'text-yellow-500' },
  { value: 4, label: 'Good', color: 'text-blue-500' },
  { value: 5, label: 'Excellent', color: 'text-green-500' },
];

export const RatingDemo = () => {
  const [starRating, setStarRating] = useState<number | boolean | null>(3);
  const [numericRating, setNumericRating] = useState<number | boolean | null>(7);
  const [yesNoRating, setYesNoRating] = useState<number | boolean | null>(null);
  const [vesselRating, setVesselRating] = useState<number | boolean | null>(1);
  const [safetyRating, setSafetyRating] = useState<number | boolean | null>(null);
  const [halfStarRating, setHalfStarRating] = useState<number | boolean | null>(3.5);

  // Additional state for interactive examples
  const [bridgeNav, setBridgeNav] = useState<number | boolean | null>(null);
  const [bridgeComm, setBridgeComm] = useState<number | boolean | null>(null);
  const [fireSafety, setFireSafety] = useState<number | boolean | null>(null);
  const [lifeJackets, setLifeJackets] = useState<number | boolean | null>(null);

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Star Rating">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Basic Star Rating">
            <div className="space-y-4">
              <Rating
                type="star"
                value={starRating}
                max={5}
                showValue
                label="Overall Rating"
                description="Rate your overall experience"
                onChange={setStarRating}
              />
              <div className="text-muted-foreground text-sm">
                Current value: {String(starRating)}
              </div>
            </div>
          </DemoItem>

          <DemoItem label="Half Star Rating">
            <Rating
              type="star"
              value={halfStarRating}
              max={5}
              allowHalf
              showValue
              label="Detailed Rating"
              description="Supports half-star ratings"
              onChange={setHalfStarRating}
            />
          </DemoItem>

          <DemoItem label="Different Sizes">
            <div className="space-y-4">
              <Rating type="star" value={4} size="sm" showValue readOnly />
              <Rating type="star" value={4} size="md" showValue readOnly />
              <Rating type="star" value={4} size="lg" showValue readOnly />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Numeric Rating">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="1-10 Scale">
            <Rating
              type="numeric"
              value={numericRating}
              min={1}
              max={10}
              size="sm"
              showValue
              label="Performance Score"
              description="Rate from 1 to 10"
              onChange={setNumericRating}
            />
          </DemoItem>

          <DemoItem label="0.5 Step Increments">
            <Rating
              type="numeric"
              value={2.5}
              min={1}
              max={3}
              step={0.5}
              size="md"
              showValue
              label="Precision Rating"
              description="Rate with 0.5 increments"
              onChange={(value) => console.log('Half-step rating:', value)}
            />
          </DemoItem>

          <DemoItem label="0-3 Scale">
            <Rating
              type="numeric"
              value={2}
              min={0}
              max={3}
              size="lg"
              showValue
              readOnly
              label="Condition Rating"
              helperText="Read-only numeric rating"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Yes/No Rating">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Binary Choice">
            <Rating
              type="yesno"
              value={yesNoRating}
              label="Compliance Check"
              description="Does the vessel comply with safety regulations?"
              required
              onChange={setYesNoRating}
            />
          </DemoItem>

          <DemoItem label="With Error State">
            <Rating
              type="yesno"
              value={false}
              label="Safety Protocol"
              error="This field is required for safety compliance"
              readOnly
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Scale Rating (Vessel Inspection)">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Vessel Condition (0-2 Scale)">
            <Rating
              type="scale"
              value={vesselRating}
              scales={vesselScales}
              label="Hull Condition"
              description="Assess the overall hull condition"
              showLabels
              onChange={setVesselRating}
            />
          </DemoItem>

          <DemoItem label="Safety Assessment (1-5 Scale)">
            <Rating
              type="scale"
              value={safetyRating}
              scales={safetyScales}
              label="Safety Equipment"
              description="Rate the condition of safety equipment"
              showLabels
              required
              onChange={setSafetyRating}
            />
          </DemoItem>

          <DemoItem label="Disabled State">
            <Rating
              type="scale"
              value={2}
              scales={vesselScales}
              label="Engine Room"
              disabled
              showLabels
              helperText="Rating completed by previous inspector"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Interactive Examples">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Inspection Form Example">
            <div className="grid grid-cols-1 gap-6 rounded-lg border bg-gray-50 p-4 md:grid-cols-2">
              <div className="space-y-4">
                <h5 className="font-medium text-gray-900">Bridge Equipment</h5>
                <Rating
                  type="scale"
                  value={bridgeNav}
                  scales={vesselScales}
                  label="Navigation Equipment"
                  size="sm"
                  showValue
                  onChange={setBridgeNav}
                />
                <Rating
                  type="scale"
                  value={bridgeComm}
                  scales={vesselScales}
                  label="Communication Systems"
                  size="sm"
                  showValue
                  onChange={setBridgeComm}
                />
              </div>

              <div className="space-y-4">
                <h5 className="font-medium text-gray-900">Safety Compliance</h5>
                <Rating
                  type="yesno"
                  value={fireSafety}
                  label="Fire Safety Systems"
                  size="sm"
                  showValue
                  onChange={setFireSafety}
                />
                <Rating
                  type="yesno"
                  value={lifeJackets}
                  label="Life Jacket Availability"
                  size="sm"
                  showValue
                  onChange={setLifeJackets}
                />
              </div>
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};
