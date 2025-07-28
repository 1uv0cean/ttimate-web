'use client';

import { Stepper, Step, createStep, setCurrentStep, updateStepStatus } from '@/components/ui/Stepper';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { 
  ClipboardCheck, 
  Search, 
  FileText, 
  CheckCircle, 
  AlertTriangle,
  Ship,
  Users,
  Settings,
  FileCheck
} from 'lucide-react';
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
    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{label}</h4>
    <div className="space-y-4">{children}</div>
  </div>
);

// Vessel Inspection Process Steps
const inspectionSteps: Step[] = [
  createStep('preparation', 'Preparation', {
    description: 'Review vessel documentation and prepare inspection checklist',
    status: 'completed',
    icon: <ClipboardCheck className="h-full w-full" />,
  }),
  createStep('inspection', 'Inspection', {
    description: 'Conduct physical inspection of vessel and equipment',
    status: 'current',
    icon: <Search className="h-full w-full" />,
  }),
  createStep('reporting', 'Report Writing', {
    description: 'Document findings and prepare inspection report',
    status: 'pending',
    icon: <FileText className="h-full w-full" />,
  }),
  createStep('approval', 'Approval', {
    description: 'Submit report for review and approval',
    status: 'pending',
    icon: <CheckCircle className="h-full w-full" />,
    optional: true,
  }),
  createStep('completion', 'Completion', {
    description: 'Finalize inspection and issue certificates',
    status: 'pending',
    icon: <FileCheck className="h-full w-full" />,
  }),
];

const simpleSteps: Step[] = [
  createStep('step1', 'Start', { status: 'completed' }),
  createStep('step2', 'Process', { status: 'current' }),
  createStep('step3', 'Review', { status: 'pending', optional: true }),
  createStep('step4', 'Complete', { status: 'pending' }),
];

const errorSteps: Step[] = [
  createStep('step1', 'Configuration', { status: 'completed', icon: <Settings className="h-full w-full" /> }),
  createStep('step2', 'Vessel Check', { status: 'completed', icon: <Ship className="h-full w-full" /> }),
  createStep('step3', 'Crew Verification', { 
    status: 'error', 
    icon: <Users className="h-full w-full" />,
    description: 'Issue found with crew certification'
  }),
  createStep('step4', 'Final Review', { status: 'skipped' }),
];

export const StepperDemo = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(1);
  const [interactiveSteps, setInteractiveSteps] = useState<Step[]>(
    setCurrentStep([...inspectionSteps], currentStepIndex)
  );

  const handleNext = () => {
    if (currentStepIndex < interactiveSteps.length - 1) {
      const newIndex = currentStepIndex + 1;
      setCurrentStepIndex(newIndex);
      setInteractiveSteps(setCurrentStep([...inspectionSteps], newIndex));
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      const newIndex = currentStepIndex - 1;
      setCurrentStepIndex(newIndex);
      setInteractiveSteps(setCurrentStep([...inspectionSteps], newIndex));
    }
  };

  const handleStepClick = (step: Step, index: number) => {
    console.log('Step clicked:', step.title, 'at index:', index);
    setCurrentStepIndex(index);
    setInteractiveSteps(setCurrentStep([...inspectionSteps], index));
  };

  const handleError = () => {
    const errorSteps = updateStepStatus([...interactiveSteps], 'inspection', 'error');
    setInteractiveSteps(errorSteps);
  };

  const handleComplete = () => {
    const completedSteps = interactiveSteps.map(step => ({ ...step, status: 'completed' as const }));
    setInteractiveSteps(completedSteps);
    setCurrentStepIndex(completedSteps.length - 1);
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Horizontal Stepper">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Vessel Inspection Process">
            <div className="space-y-4">
              <Stepper
                steps={inspectionSteps}
                orientation="horizontal"
                showDescription
                size="md"
              />
              <div className="text-sm text-muted-foreground">
                Standard vessel inspection workflow with custom icons
              </div>
            </div>
          </DemoItem>

          <DemoItem label="Interactive Navigation">
            <div className="space-y-4 sm:space-y-6">
              <Stepper
                steps={interactiveSteps}
                orientation="horizontal"
                allowNavigation
                showDescription
                onStepClick={handleStepClick}
                size="md"
              />
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentStepIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentStepIndex === interactiveSteps.length - 1}
                >
                  Next
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleError}
                >
                  Simulate Error
                </Button>
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleComplete}
                >
                  Complete All
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Current step: {interactiveSteps[currentStepIndex]?.title} ({currentStepIndex + 1}/{interactiveSteps.length})
              </div>
            </div>
          </DemoItem>

          <DemoItem label="Simple Steps">
            <Stepper
              steps={simpleSteps}
              orientation="horizontal"
              size="sm"
              showDescription={false}
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Vertical Stepper">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Detailed Process Flow">
            <div className="max-w-md">
              <Stepper
                steps={inspectionSteps}
                orientation="vertical"
                showDescription
                size="md"
              />
            </div>
          </DemoItem>

          <DemoItem label="With Error State">
            <div className="max-w-md">
              <Stepper
                steps={errorSteps}
                orientation="vertical"
                showDescription
                allowNavigation
                onStepClick={(step, index) => console.log('Clicked:', step.title)}
                size="md"
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Different Sizes">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Small Size">
            <Stepper
              steps={simpleSteps}
              orientation="horizontal"
              size="sm"
            />
          </DemoItem>

          <DemoItem label="Medium Size (Default)">
            <Stepper
              steps={simpleSteps}
              orientation="horizontal"
              size="md"
            />
          </DemoItem>

          <DemoItem label="Large Size">
            <Stepper
              steps={simpleSteps}
              orientation="horizontal"
              size="lg"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Inspection Workflow Example">
        <div className="space-y-6">
          <DemoItem label="Complete Vessel Inspection Flow">
            <div className="p-6 border rounded-lg bg-gray-50">
              <div className="space-y-4 sm:space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">MV Ocean Explorer</h3>
                  <p className="text-sm text-gray-600">Annual Safety Inspection</p>
                </div>
                
                <Stepper
                  steps={interactiveSteps}
                  orientation="horizontal"
                  allowNavigation
                  showDescription
                  onStepClick={handleStepClick}
                  size="md"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-700">Current Status</h5>
                    <p className="text-sm text-gray-600">
                      {interactiveSteps[currentStepIndex]?.title}: {interactiveSteps[currentStepIndex]?.description}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-700">Progress</h5>
                    <p className="text-sm text-gray-600">
                      {currentStepIndex + 1} of {interactiveSteps.length} steps completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};