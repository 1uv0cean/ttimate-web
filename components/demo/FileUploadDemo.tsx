'use client';

import { FileUpload, FileItem } from '@/components/ui/FileUpload';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Typography } from '@/components/ui/Typography';
import { useState } from 'react';
import { FileText, Image, Video } from 'lucide-react';

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

export const FileUploadDemo = () => {
  const [basicFiles, setBasicFiles] = useState<FileItem[]>([]);
  const [multipleFiles, setMultipleFiles] = useState<FileItem[]>([]);
  const [imageFiles, setImageFiles] = useState<FileItem[]>([]);
  const [restrictedFiles, setRestrictedFiles] = useState<FileItem[]>([]);

  const handleUpload = async (files: FileItem[]) => {
    // Simulate upload process
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Simulate some files failing randomly
        const shouldFail = Math.random() > 0.7;
        if (shouldFail) {
          reject(new Error('Upload failed - network error'));
        } else {
          resolve();
        }
      }, 2000);
    });
  };

  return (
    <div className="max-w-full space-y-6 sm:space-y-8">
      <DemoSection title="Basic File Upload">
        <div className="space-y-4">
          <FileUpload
            label="Upload Document"
            description="Choose a file to upload"
            helperText="Supported formats: PDF, DOC, TXT"
            accept=".pdf,.doc,.docx,.txt"
            onFileChange={setBasicFiles}
            onUpload={handleUpload}
          />
          <Typography variant="small" color="muted">
            Single file upload with basic configuration
          </Typography>
        </div>
      </DemoSection>

      <DemoSection title="Multiple Files Upload">
        <div className="space-y-4">
          <FileUpload
            label="Upload Multiple Files"
            description="Select up to 5 files"
            multiple
            maxFiles={5}
            maxSize={5 * 1024 * 1024} // 5MB
            onFileChange={setMultipleFiles}
            onUpload={handleUpload}
            size="lg"
          />
          <Typography variant="small" color="muted">
            Multiple file selection with size and count limits
          </Typography>
        </div>
      </DemoSection>

      <DemoSection title="Image Upload with Preview">
        <div className="space-y-4">
          <FileUpload
            label="Upload Images"
            description="Drag and drop your images here"
            accept="image/*"
            multiple
            maxFiles={3}
            showPreview
            onFileChange={setImageFiles}
            variant="default"
          />
          <Typography variant="small" color="muted">
            Image-only upload with preview functionality
          </Typography>
        </div>
      </DemoSection>

      <DemoSection title="Restricted Upload">
        <div className="space-y-4">
          <FileUpload
            label="Small Files Only"
            description="Maximum file size: 1MB"
            accept=".jpg,.png,.pdf"
            maxSize={1024 * 1024} // 1MB
            maxFiles={2}
            onFileChange={setRestrictedFiles}
            helperText="This upload has strict size and type restrictions"
          />
          <Typography variant="small" color="muted">
            Upload with strict file size and type restrictions
          </Typography>
        </div>
      </DemoSection>

      <DemoSection title="Custom Upload Area">
        <div className="space-y-4">
          <FileUpload
            accept="*/*"
            multiple
            size="lg"
          >
            <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="flex space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Image className="h-6 w-6 text-blue-600" />
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <div className="space-y-2">
                <Typography variant="h4" weight="semibold">
                  Upload any file type
                </Typography>
                <Typography variant="muted">
                  Images, documents, videos, and more
                </Typography>
                <Button variant="outline" size="sm">
                  Browse Files
                </Button>
              </div>
            </div>
          </FileUpload>
          <Typography variant="small" color="muted">
            Custom upload area with different styling and content
          </Typography>
        </div>
      </DemoSection>

      <DemoSection title="Upload States">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-2">
            <Typography variant="small" weight="medium">Default State</Typography>
            <FileUpload
              description="Ready for upload"
              size="sm"
            />
          </div>
          
          <div className="space-y-2">
            <Typography variant="small" weight="medium">Error State</Typography>
            <FileUpload
              description="Upload failed"
              error="File type not supported"
              size="sm"
            />
          </div>
          
          <div className="space-y-2">
            <Typography variant="small" weight="medium">Disabled State</Typography>
            <FileUpload
              description="Upload disabled"
              disabled
              size="sm"
            />
          </div>
          
          <div className="space-y-2">
            <Typography variant="small" weight="medium">Success State</Typography>
            <FileUpload
              description="Upload completed"
              variant="success"
              size="sm"
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Size Variants">
        <div className="space-y-4 sm:space-y-6">
          <div className="space-y-2">
            <Typography variant="small" weight="medium">Small</Typography>
            <FileUpload
              size="sm"
              description="Compact upload area"
            />
          </div>
          
          <div className="space-y-2">
            <Typography variant="small" weight="medium">Medium (Default)</Typography>
            <FileUpload
              size="md"
              description="Standard upload area"
            />
          </div>
          
          <div className="space-y-2">
            <Typography variant="small" weight="medium">Large</Typography>
            <FileUpload
              size="lg"
              description="Spacious upload area for better visibility"
            />
          </div>
        </div>
      </DemoSection>

      <DemoSection title="Without Upload Handler">
        <div className="space-y-4">
          <FileUpload
            label="File Selection Only"
            description="This upload doesn't have an upload handler"
            multiple
            onFileChange={(files) => {
              console.log('Files selected:', files);
            }}
          />
          <Typography variant="small" color="muted">
            File selection without upload functionality - useful for form handling
          </Typography>
        </div>
      </DemoSection>

      <DemoSection title="Integration Example">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Submission</CardTitle>
              <CardDescription>
                Please upload the required documents for your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload
                label="Identity Document"
                description="Upload your passport or ID card"
                accept="image/*,.pdf"
                maxSize={5 * 1024 * 1024}
                showPreview
              />
              
              <FileUpload
                label="Supporting Documents"
                description="Additional documents (optional)"
                accept=".pdf,.doc,.docx"
                multiple
                maxFiles={3}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">Save Draft</Button>
                <Button>Submit Application</Button>
              </div>
            </CardContent>
          </Card>
          <Typography variant="small" color="muted">
            Real-world example of file upload in a form context
          </Typography>
        </div>
      </DemoSection>
    </div>
  );
};