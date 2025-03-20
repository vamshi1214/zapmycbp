import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ImageUploadProps {
  onImagesSelected: (images: string[]) => void;
}

export function ImageUpload({ onImagesSelected }: ImageUploadProps) {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  // Start session when component mounts
  useEffect(() => {
    startSession();
    
    // Cleanup function to end session when component unmounts
    return () => {
      if (sessionId) {
        endSession();
      }
    };
  }, []);

  const startSession = async () => {
    try {
      const response = await fetch(`${API_URL}/api/start-session`, {
        method: 'POST',
      });
      const data = await response.json();
      setSessionId(data.sessionId);
    } catch (error) {
      console.error('Error starting session:', error);
      toast({
        title: "Error",
        description: "Failed to start session",
        variant: "destructive",
      });
    }
  };

  const endSession = async () => {
    if (!sessionId) return;
    
    try {
      await fetch(`${API_URL}/api/end-session/${sessionId}`, {
        method: 'POST',
      });
      setSessionId(null);
    } catch (error) {
      console.error('Error ending session:', error);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('session_id', sessionId || '');

    try {
      setIsUploading(true);
      console.log('Uploading file:', file.name);
      const response = await fetch(`${API_URL}/api/upload-image`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to upload image');
      }

      console.log('Upload response:', data);
      
      if (!data.filename) {
        throw new Error('No filename returned from server');
      }
      
      return data.filename;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error instanceof Error ? error : new Error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      console.log('Files dropped:', acceptedFiles);
      
      // Check if adding new files would exceed the limit
      if (images.length + acceptedFiles.length > 10) {
        toast({
          title: "Error",
          description: "You can only upload up to 10 images",
          variant: "destructive",
        });
        return;
      }
      
      const uploadedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          try {
            const filename = await uploadImage(file);
            return filename;
          } catch (error) {
            toast({
              title: "Error",
              description: error instanceof Error ? error.message : "Failed to upload image",
              variant: "destructive",
            });
            return null;
          }
        })
      );
      
      // Filter out any failed uploads
      const successfulUploads = uploadedFiles.filter((filename): filename is string => filename !== null);
      
      console.log('Uploaded files:', successfulUploads);
      
      setImages(prevImages => {
        const newImages = [...prevImages, ...successfulUploads];
        console.log('Updated images array:', newImages);
        onImagesSelected(newImages);
        return newImages;
      });

      if (successfulUploads.length > 0) {
        toast({
          title: "Success",
          description: "Images uploaded successfully",
        });
      }
    } catch (error) {
      console.error('Error processing dropped files:', error);
      toast({
        title: "Error",
        description: "Failed to upload images",
        variant: "destructive",
      });
    }
  }, [onImagesSelected, toast, images.length, sessionId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: isUploading || images.length >= 10
  });

  const removeImage = (index: number) => {
    console.log('Removing image at index:', index);
    setImages(prevImages => {
      const newImages = prevImages.filter((_, i) => i !== index);
      console.log('Updated images after removal:', newImages);
      onImagesSelected(newImages);
      return newImages;
    });
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}
          ${(isUploading || images.length >= 10) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {isUploading ? (
          <p>Uploading...</p>
        ) : images.length >= 10 ? (
          <p>Maximum number of images reached (10)</p>
        ) : isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag & drop images here, or click to select files (max 5MB each)</p>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={`${API_URL}/uploads/${image}`}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => {
                  console.error('Error loading image:', image);
                  e.currentTarget.src = 'fallback-image-url';
                }}
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
                disabled={isUploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}