'use client';

import { cn } from '@/lib/utils';
import { VariantProps, cva } from 'class-variance-authority';
import { 
  Check, 
  File, 
  FileImage, 
  FileText, 
  FileVideo, 
  Image, 
  Upload, 
  X 
} from 'lucide-react';
import { forwardRef, useCallback, useState, useRef, useId } from 'react';
import { Button } from './Button';
import { Typography } from './Typography';

const fileUploadVariants = cva(
  'relative border-2 border-dashed rounded-lg transition-colors cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border-border hover:border-primary/50 hover:bg-primary/5',
        active: 'border-primary bg-primary/10',
        success: 'border-green-500 bg-green-50',
        error: 'border-destructive bg-destructive/5',
      },
      size: {
        sm: 'p-4 min-h-[120px]',
        md: 'p-6 min-h-[160px]',
        lg: 'p-8 min-h-[200px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

interface FileItem {
  file: File;
  id: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress?: number;
  error?: string;
  preview?: string;
}

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof fileUploadVariants> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
  helperText?: string;
  showPreview?: boolean;
  onFileChange?: (files: FileItem[]) => void;
  onUpload?: (files: FileItem[]) => Promise<void>;
  children?: React.ReactNode;
}

const getFileIcon = (fileType: string) => {
  if (fileType.startsWith('image/')) return FileImage;
  if (fileType.startsWith('video/')) return FileVideo;
  if (fileType.includes('text') || fileType.includes('document')) return FileText;
  return File;
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      variant,
      size,
      accept,
      multiple = false,
      maxSize = 10 * 1024 * 1024, // 10MB default
      maxFiles = 5,
      disabled = false,
      label,
      description,
      error,
      helperText,
      showPreview = true,
      onFileChange,
      onUpload,
      children,
      ...props
    },
    ref,
  ) => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const componentId = useId();

    const createFileItem = useCallback((file: File): FileItem => {
      const id = Math.random().toString(36).substr(2, 9);
      const item: FileItem = {
        file,
        id,
        status: 'pending',
      };

      // Create preview for images
      if (file.type.startsWith('image/') && showPreview) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFiles(prev => prev.map(f => 
            f.id === id ? { ...f, preview: e.target?.result as string } : f
          ));
        };
        reader.readAsDataURL(file);
      }

      return item;
    }, [showPreview]);

    const validateFile = useCallback((file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `File size must be less than ${formatFileSize(maxSize)}`;
      }
      return null;
    }, [maxSize]);

    const handleFiles = useCallback((newFiles: File[]) => {
      const validFiles: FileItem[] = [];
      const errors: string[] = [];

      newFiles.forEach(file => {
        const error = validateFile(file);
        if (error) {
          errors.push(`${file.name}: ${error}`);
        } else {
          validFiles.push(createFileItem(file));
        }
      });

      if (maxFiles && files.length + validFiles.length > maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      setFiles(updatedFiles);
      onFileChange?.(updatedFiles);
    }, [files, multiple, maxFiles, validateFile, createFileItem, onFileChange]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    }, [disabled]);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      if (disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    }, [disabled, handleFiles]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
      }
    }, [handleFiles]);

    const handleClick = useCallback(() => {
      if (!disabled) {
        fileInputRef.current?.click();
      }
    }, [disabled]);

    const removeFile = useCallback((fileId: string) => {
      const updatedFiles = files.filter(f => f.id !== fileId);
      setFiles(updatedFiles);
      onFileChange?.(updatedFiles);
    }, [files, onFileChange]);

    const handleUpload = useCallback(async () => {
      if (!onUpload || files.length === 0) return;

      setIsUploading(true);
      try {
        await onUpload(files);
        setFiles(prev => prev.map(f => ({ ...f, status: 'success' as const })));
      } catch (error) {
        setFiles(prev => prev.map(f => ({ 
          ...f, 
          status: 'error' as const,
          error: error instanceof Error ? error.message : 'Upload failed'
        })));
      } finally {
        setIsUploading(false);
      }
    }, [onUpload, files]);

    const effectiveVariant = error ? 'error' : isDragOver ? 'active' : variant;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={componentId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}

        <div
          ref={ref}
          className={cn(
            fileUploadVariants({ variant: effectiveVariant, size }),
            disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          {...props}
        >
          <input
            ref={fileInputRef}
            id={componentId}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            className="sr-only"
            disabled={disabled}
          />

          {children || (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <Typography variant="large" weight="medium">
                  {isDragOver ? 'Drop files here' : 'Choose files or drag & drop'}
                </Typography>
                {description && (
                  <Typography variant="small" color="muted">
                    {description}
                  </Typography>
                )}
                <Typography variant="small" color="muted" className="text-xs">
                  {accept && `Supported: ${accept}`}
                  {maxSize && ` • Max size: ${formatFileSize(maxSize)}`}
                  {multiple && maxFiles && ` • Max files: ${maxFiles}`}
                </Typography>
              </div>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <Typography
            variant="small"
            color={error ? 'destructive' : 'muted'}
            className="text-xs"
          >
            {error || helperText}
          </Typography>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Typography variant="small" weight="medium">
                Selected Files ({files.length})
              </Typography>
              {onUpload && (
                <Button
                  size="sm"
                  onClick={handleUpload}
                  loading={isUploading}
                  disabled={files.every(f => f.status === 'success')}
                >
                  Upload Files
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {files.map((fileItem) => {
                const FileIcon = getFileIcon(fileItem.file.type);
                
                return (
                  <div
                    key={fileItem.id}
                    className="flex items-center gap-3 p-3 border rounded-lg bg-background"
                  >
                    {/* Preview or Icon */}
                    <div className="flex-shrink-0">
                      {fileItem.preview ? (
                        <img
                          src={fileItem.preview}
                          alt={fileItem.file.name}
                          className="w-10 h-10 object-cover rounded border"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                          <FileIcon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <Typography variant="small" weight="medium" className="truncate">
                        {fileItem.file.name}
                      </Typography>
                      <Typography variant="small" color="muted" className="text-xs">
                        {formatFileSize(fileItem.file.size)}
                      </Typography>
                      {fileItem.error && (
                        <Typography variant="small" color="destructive" className="text-xs">
                          {fileItem.error}
                        </Typography>
                      )}
                    </div>

                    {/* Status */}
                    <div className="flex items-center gap-2">
                      {fileItem.status === 'success' && (
                        <Check className="h-4 w-4 text-green-600" />
                      )}
                      {fileItem.status === 'uploading' && (
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(fileItem.id)}
                        className="h-6 w-6 p-0"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);

FileUpload.displayName = 'FileUpload';

export { FileUpload, fileUploadVariants };
export type { FileItem };