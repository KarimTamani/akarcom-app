'use client';
import { useEffect, useState } from 'react';
import {
    formatBytes,
    useFileUpload,
    type FileMetadata,
    type FileWithPreview,
} from '@/hooks/use-file-upload';
import {
    Alert,

    AlertDescription,

    AlertTitle,

} from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
    FileArchiveIcon,
    FileSpreadsheetIcon,
    FileTextIcon,
    HeadphonesIcon,
    ImageIcon,
    RefreshCwIcon,
    TriangleAlert,
    UploadIcon,
    VideoIcon,
    XIcon,
} from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
interface FileUploadItem extends FileWithPreview {
    progress: number;
    status: 'uploading' | 'completed' | 'error';
    error?: string;
}
interface ProgressUploadProps {
    maxFiles?: number;
    maxSize?: number;
    accept?: string;
    multiple?: boolean;
    className?: string;
    onFilesChange?: (files: FileWithPreview[]) => void;
    simulateUpload?: boolean;
    defaultFiles?: FileMetadata[]
}
export default function MultiFileUplaod({
    maxFiles = 5,
    maxSize = 10 * 1024 * 1024, // 10MB
    accept = '*',
    multiple = true,
    className,
    onFilesChange,
    simulateUpload = true,
    defaultFiles = []
}: ProgressUploadProps) {
    // Create default images using FileMetadata type

    // Convert default images to FileUploadItem format
    const defaultUploadFiles: FileUploadItem[] = defaultFiles.map((image) => ({
        id: image.id,
        file: {
            name: image.name,
            size: image.size,
            type: image.type,
        } as File,
        preview: image.url,
        progress: 100,
        status: 'completed' as const,
    }));
    const [uploadFiles, setUploadFiles] = useState<FileUploadItem[]>(defaultUploadFiles);
    const [
        { isDragging, errors },
        {
            removeFile,
            clearFiles,
            handleDragEnter,
            handleDragLeave,
            handleDragOver,
            handleDrop,
            openFileDialog,
            getInputProps,
        },
    ] = useFileUpload({
        maxFiles,
        maxSize,
        accept,
        multiple,
        initialFiles: defaultFiles,
        onFilesChange: (newFiles) => {
            // Convert to upload items when files change, preserving existing status
            const newUploadFiles = newFiles.map((file) => {
                // Check if this file already exists in uploadFiles
                const existingFile = uploadFiles.find((existing) => existing.id === file.id);
                if (existingFile) {
                    // Preserve existing file status and progress
                    return {
                        ...existingFile,
                        ...file, // Update any changed properties from the file
                    };
                } else {
                    // New file - set to uploading
                    return {
                        ...file,
                        progress: 0,
                        status: 'uploading' as const,
                    };
                }
            });
            setUploadFiles(newUploadFiles);
            onFilesChange?.(newFiles);
        },
    });

    const retryUpload = (fileId: string) => {
        setUploadFiles((prev) =>
            prev.map((file) =>
                file.id === fileId
                    ? {
                        ...file,
                        progress: 0,
                        status: 'uploading' as const,
                        error: undefined,
                    }
                    : file,
            ),
        );
    };
    const removeUploadFile = (fileId: string) => {
        setUploadFiles((prev) => prev.filter((file) => file.id !== fileId));
        removeFile(fileId);
    };
    const getFileIcon = (file: File | FileMetadata) => {
        const type = file instanceof File ? file.type : file.type;
 
        if (type.startsWith('image/')) return <ImageIcon className="size-4" />;
        if (type.startsWith('video/')) return <VideoIcon className="size-4" />;
        if (type.startsWith('audio/')) return <HeadphonesIcon className="size-4" />;
        if (type.includes('pdf')) return <FileTextIcon className="size-4" />;
        if (type.includes('word') || type.includes('doc')) return <FileTextIcon className="size-4" />;
        if (type.includes('excel') || type.includes('sheet')) return <FileSpreadsheetIcon className="size-4" />;
        if (type.includes('zip') || type.includes('rar')) return <FileArchiveIcon className="size-4" />;
        return <FileTextIcon className="size-4" />;
    };
    const completedCount = uploadFiles.filter((f) => f.status === 'completed').length;
    const errorCount = uploadFiles.filter((f) => f.status === 'error').length;
    const uploadingCount = uploadFiles.filter((f) => f.status === 'uploading').length;

    const t = useTranslations("components.multi_file_uploader")
    return (
        <div className={cn('w-full max-w-2xl', className)}>
            {/* Upload Area */}
            <div
                className={cn(
                    'relative rounded-lg border border-dashed p-8 text-center transition-colors',
                    isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-muted-foreground/50',
                )}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input {...getInputProps()} className="sr-only" />
                <div className="flex flex-col items-center gap-4">
                    <div
                        className={cn(
                            'flex h-16 w-16 items-center justify-center rounded-full',
                            isDragging ? 'bg-primary/10' : 'bg-muted',
                        )}
                    >
                        <UploadIcon className={cn('h-6', isDragging ? 'text-primary' : 'text-muted-foreground')} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{t("title")}</h3>
                        <p className="text-sm text-muted-foreground">{t("drag_drop")}</p>

                        <p className="text-xs text-muted-foreground">
                            {t("support", { size: formatBytes(maxSize) })}
                        </p>

                    </div>
                    <Button onClick={openFileDialog} type='button'>
                        <UploadIcon />
                        {t("select_files")}
                    </Button>
                </div>
            </div>
            {/* Upload Stats */}
            {uploadFiles.length > 0 && (
                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-2">
                        <h4 className="text-sm font-medium">        {t("selected_files")} </h4>
                        <div className="flex items-center gap-2">

                            {uploadingCount > 0 && (
                                <Badge variant="default">
                                    {uploadingCount}
                                </Badge>
                            )}
                        </div>
                    </div>
                    <Button onClick={clearFiles} variant="outline" size="sm" type='button'>
                        {t("clear_all")}
                    </Button>
                </div>
            )}
            {/* File List */}
            {uploadFiles.length > 0 && (
                <div className="mt-4 space-y-3">
                    {uploadFiles.map((fileItem) => (
                        <div key={fileItem.id} className="rounded-lg border border-border bg-card p-4">
                            <div className="flex items-start gap-2.5">
                                {/* File Icon */}
                                <div className="flex-shrink-0">
                                    {fileItem.preview && fileItem.file.type.startsWith('image/') ? (
                                        <img
                                            src={fileItem.preview}
                                            alt={fileItem.file.name}
                                            className="h-12 w-12 rounded-lg border object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border text-muted-foreground">
                                            {getFileIcon(fileItem.file)}
                                        </div>
                                    )}
                                </div>
                                {/* File Info */}
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between mt-0.75">
                                        <p className="inline-flex flex-col justify-center gap-1 truncate font-medium ">
                                            <span className="text-sm">{fileItem.file.name}</span>
                                            {
                                                fileItem.file.size && 
                                                <span className="text-xs text-muted-foreground">{formatBytes(fileItem.file.size)}</span>

                                            }
                                        </p>
                                        <div className="flex items-center gap-2">
                                            {/* Remove Button */}
                                            <Button
                                                onClick={() => removeUploadFile(fileItem.id)}
                                                variant="ghost"
                                                size="icon"
                                                className="size-6 text-muted-foreground hover:opacity-100 hover:bg-transparent"
                                                type='button'
                                            >
                                                <XIcon className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    {/* Progress Bar */}

                                    {/* Error Message */}
                                    {fileItem.status === 'error' && fileItem.error && (
                                        <Alert variant="destructive" className="items-center gap-1.5 mt-2 px-2 py-1">

                                            <AlertTitle className="text-xs">{fileItem.error}</AlertTitle>
                                            <AlertDescription>
                                                <Button
                                                    onClick={() => retryUpload(fileItem.id)}
                                                    variant="ghost"
                                                    size="icon"
                                                    type='button'
                                                    className="size-6 text-muted-foreground hover:opacity-100 hover:bg-transparent"
                                                >
                                                    <RefreshCwIcon className="size-3.5" />
                                                </Button>
                                            </AlertDescription>
                                        </Alert>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Error Messages */}
            {errors.length > 0 && (
                <Alert variant="destructive" className="mt-5">

                    <AlertDescription>
                        <AlertTitle>File upload error(s)</AlertTitle>
                        <AlertDescription>
                            {errors.map((error, index) => (
                                <p key={index} className="last:mb-0">
                                    {error}
                                </p>
                            ))}
                        </AlertDescription>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}