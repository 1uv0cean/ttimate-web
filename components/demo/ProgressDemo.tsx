'use client';

import { Progress, createProgressStep, updateStepProgress, ProgressStep } from '@/components/ui/Progress';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';

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

export const ProgressDemo = () => {
  const [basicProgress, setBasicProgress] = useState(65);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [bufferProgress, setBufferProgress] = useState({ value: 45, buffer: 75 });
  
  // Multi-step progress
  const initialSteps: ProgressStep[] = [
    createProgressStep('validation', 'Document Validation', 100),
    createProgressStep('processing', 'Data Processing', 60),
    createProgressStep('analysis', 'Risk Analysis', 30),
    createProgressStep('reporting', 'Report Generation', 0),
  ];
  
  const [stepProgress, setStepProgress] = useState(initialSteps);
  const [currentStep, setCurrentStep] = useState(1);

  // Simulated file upload
  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  // Auto-advancing buffer demo
  useEffect(() => {
    const interval = setInterval(() => {
      setBufferProgress(prev => ({
        value: Math.min(prev.value + Math.random() * 5, prev.buffer),
        buffer: Math.min(prev.buffer + Math.random() * 3, 100),
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Step progress simulation
  const advanceStepProgress = () => {
    const stepId = stepProgress[currentStep]?.id;
    if (stepId) {
      const currentValue = stepProgress[currentStep].value;
      if (currentValue < 100) {
        const updatedSteps = updateStepProgress(stepProgress, stepId, Math.min(currentValue + 20, 100));
        setStepProgress(updatedSteps);
      } else if (currentStep < stepProgress.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const resetStepProgress = () => {
    setStepProgress(initialSteps);
    setCurrentStep(1);
  };

  return (
    <div className="w-full max-w-full space-y-4 sm:space-y-8 overflow-hidden">
      <DemoSection title="Basic Progress">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Simple Progress Bar">
            <div className="space-y-4">
              <Progress
                value={basicProgress}
                showPercentage
                label="Processing"
                description="Current task progress"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBasicProgress(Math.max(0, basicProgress - 10))}
                >
                  -10%
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBasicProgress(Math.min(100, basicProgress + 10))}
                >
                  +10%
                </Button>
              </div>
            </div>
          </DemoItem>

          <DemoItem label="Different Sizes">
            <div className="space-y-4">
              <Progress value={75} size="sm" showPercentage label="Small" />
              <Progress value={75} size="md" showPercentage label="Medium (Default)" />
              <Progress value={75} size="lg" showPercentage label="Large" />
              <Progress value={75} size="xl" showPercentage label="Extra Large" />
            </div>
          </DemoItem>

          <DemoItem label="Different States">
            <div className="space-y-4">
              <Progress 
                value={100} 
                variant="success" 
                status="success"
                showPercentage 
                label="Completed Successfully" 
              />
              <Progress 
                value={45} 
                variant="error" 
                status="error"
                showPercentage 
                label="Error Occurred" 
                description="An error occurred during processing"
              />
              <Progress 
                value={60} 
                variant="warning" 
                showPercentage 
                label="Warning State" 
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Interactive Progress">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="File Upload Simulation">
            <div className="space-y-4">
              <Progress
                value={uploadProgress}
                status={isUploading ? 'loading' : uploadProgress >= 100 ? 'success' : 'idle'}
                showPercentage
                animated={isUploading}
                label="Uploading vessel_inspection_report.pdf"
                description={isUploading ? 'Please wait...' : 'Ready to upload'}
              />
              <Button
                onClick={simulateUpload}
                disabled={isUploading}
                loading={isUploading}
                size="sm"
              >
                {isUploading ? 'Uploading...' : 'Start Upload'}
              </Button>
            </div>
          </DemoItem>

          <DemoItem label="Buffered Progress">
            <div className="space-y-4">
              <Progress
                value={bufferProgress.value}
                buffer={bufferProgress.buffer}
                showPercentage
                label="Data Processing"
                description={`Processed: ${Math.round(bufferProgress.value)}% | Buffered: ${Math.round(bufferProgress.buffer)}%`}
              />
              <div className="text-sm text-muted-foreground">
                The light bar shows buffered data, dark bar shows processed data
              </div>
            </div>
          </DemoItem>

          <DemoItem label="Indeterminate Progress">
            <div className="space-y-4">
              <Progress
                indeterminate
                status="loading"
                label="Analyzing vessel data"
                description="This may take a few moments..."
                animated
              />
              <Progress
                indeterminate
                size="sm"
                variant="success"
                label="Syncing with database"
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Multi-Step Progress">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Inspection Process Steps">
            <div className="space-y-4">
              <Progress
                steps={stepProgress}
                currentStep={currentStep}
                label="Vessel Inspection Analysis"
                description="Processing inspection data through multiple stages"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={advanceStepProgress}
                  disabled={stepProgress.every(step => step.value >= 100)}
                >
                  Advance Progress
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetStepProgress}
                >
                  Reset
                </Button>
              </div>
            </div>
          </DemoItem>

          <DemoItem label="Custom Colored Steps">
            <Progress
              steps={[
                createProgressStep('safety', 'Safety Check', 100, { color: '#22c55e' }),
                createProgressStep('mechanical', 'Mechanical Review', 80, { color: '#3b82f6' }),
                createProgressStep('documentation', 'Documentation', 45, { color: '#f59e0b' }),
                createProgressStep('certification', 'Certification', 0, { color: '#8b5cf6' }),
              ]}
              currentStep={2}
              label="Inspection Categories"
            />
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Specialized Use Cases">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Vessel Inspection Dashboard">
            <div className="p-4 sm:p-6 border rounded-lg bg-gray-50 space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">MV Ocean Explorer</h3>
                <p className="text-sm text-gray-600">Inspection Progress Overview</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Progress
                    value={95}
                    variant="success"
                    showPercentage
                    label="Hull Inspection"
                    size="sm"
                  />
                  <Progress
                    value={78}
                    showPercentage
                    label="Engine Room"
                    size="sm"
                  />
                  <Progress
                    value={60}
                    variant="warning"
                    showPercentage
                    label="Safety Equipment"
                    size="sm"
                  />
                  <Progress
                    value={30}
                    showPercentage
                    label="Navigation Systems"
                    size="sm"
                  />
                </div>
                
                <div className="space-y-4">
                  <Progress
                    value={100}
                    variant="success"
                    status="success"
                    showPercentage
                    label="Documentation Review"
                    size="sm"
                  />
                  <Progress
                    value={0}
                    variant="error"
                    status="error"
                    showPercentage
                    label="Crew Certification"
                    size="sm"
                  />
                  <Progress
                    indeterminate
                    status="loading"
                    label="Port State Control"
                    size="sm"
                  />
                  <Progress
                    value={85}
                    showPercentage
                    label="Environmental Compliance"
                    size="sm"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Progress
                  value={67}
                  showPercentage
                  label="Overall Inspection Progress"
                  description="8 of 12 sections completed"
                  size="lg"
                />
              </div>
            </div>
          </DemoItem>
        </div>
      </DemoSection>

      <DemoSection title="Advanced Features">
        <div className="space-y-6 sm:space-y-8">
          <DemoItem label="Striped and Animated">
            <div className="space-y-4">
              <Progress
                value={70}
                striped
                animated
                showPercentage
                label="Processing with Animation"
                description="Striped progress bar with animation"
              />
              <Progress
                value={40}
                color="#ff6b6b"
                showPercentage
                label="Custom Color"
                description="Using custom color instead of theme colors"
              />
            </div>
          </DemoItem>

          <DemoItem label="Value Display Options">
            <div className="space-y-4">
              <Progress
                value={42}
                max={50}
                showValue
                label="Custom Maximum"
                description="Progress with custom maximum value"
              />
              <Progress
                value={850}
                max={1000}
                showValue
                label="Large Numbers"
                description="Works with any numeric range"
              />
            </div>
          </DemoItem>
        </div>
      </DemoSection>
    </div>
  );
};