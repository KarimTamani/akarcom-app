'use client';

import { useState } from 'react';
import { useFileUpload, type FileMetadata, type FileWithPreview } from '@/hooks/use-file-upload';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CloudUpload, ImageIcon, TriangleAlert, Upload, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface CoverUploadProps {
  maxSize?: number;
  accept?: string;
  className?: string;
  onImageChange?: (file: File | null) => void;
  defaultImage?: string;
}

export default function CoverUpload({
  maxSize = 5 * 1024 * 1024, // 5MB default
  accept = 'image/*',
  className,
  onImageChange,
  defaultImage
}: CoverUploadProps) {


  const t = useTranslations("components.cover");
  const [coverImage, setCoverImage] = useState<FileWithPreview | null>({ preview: defaultImage } as FileWithPreview);

  const [
    { isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
  ] = useFileUpload({
    maxFiles: 1,
    maxSize,
    accept,
    multiple: false,
    onFilesChange: (files) => {
      if (files.length > 0) {
        setCoverImage(files[0]);
        onImageChange?.(files[0].file as File);
      }
    },
  });

  const removeCoverImage = () => {
    setCoverImage(null);
    onImageChange?.(null);
  };

  const hasImage = coverImage && coverImage.preview;

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Cover Upload Area */}
      <div
        className={cn(
          'group relative overflow-hidden rounded-xl transition-all duration-200 border border-border ',
          isDragging
            ? 'border-dashed border-primary bg-primary/5'
            : hasImage
              ? 'border-border bg-background hover:border-primary/50'
              : 'border-dashed border-muted-foreground/25 bg-muted/30 hover:border-primary hover:bg-primary/5',
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {/* Hidden file input */}
        <input {...getInputProps()} className="sr-only" />

        {hasImage ? (
          <>
            {/* Cover Image Display */}
            <div className="relative aspect-[21/9] w-full">
              {/* Loading placeholder */}

              {/* Actual image */}
              <img
                src={coverImage.preview}
                alt="Cover"
                className={cn(
                  'h-full w-full object-cover transition-opacity duration-300',

                )}
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-200 group-hover:bg-black/40" />

              {/* Action buttons overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button
                    onClick={openFileDialog}
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 text-gray-900 hover:bg-white"
                    type='button'
                  >
                    <Upload />
                      {t("change")}
                                      </Button>
                  <Button onClick={removeCoverImage} variant="destructive" size="sm" type='button'>
                    <XIcon />
                      {t("remove")}

                  </Button>
                </div>
              </div>


            </div>
          </>
        ) : (
          /* Empty State */
          <div
            className="flex aspect-[21/9] w-full cursor-pointer flex-col items-center justify-center gap-4 p-8 text-center"
            onClick={openFileDialog}
          >
            <div className="rounded-full bg-primary/10 p-4">
              <CloudUpload className="size-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{t("title")}</h3>
              <p className="text-sm text-muted-foreground">{t("drag_drop")}</p>
              <p className="text-xs text-muted-foreground">{t("size")}</p>
            </div>

            <Button variant="outline" size="sm" type='button'>
              <ImageIcon />
              {t("browse")}
            </Button>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mt-5">
          <AlertTitle>File upload error(s)</AlertTitle>
          <AlertDescription>
            {errors.map((error, index) => (
              <p key={index} className="last:mb-0">
                {error}
              </p>
            ))}
          </AlertDescription>

        </Alert>
      )}

      {/* Upload Error */}

      {/* Upload Tips */}

    </div>
  );
}
