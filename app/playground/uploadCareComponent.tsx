import React from 'react';
import { uploadFile } from '@uploadcare/upload-client';

interface UploadcareComponentProps {
    onUpload: (url: string) => void;
    onUploadComplete: (url: string) => void; // Add this if it's required
}

const UploadcareComponent: React.FC<UploadcareComponentProps> = ({ onUpload, onUploadComplete }) => {
    const handleUpload = async (file: File) => {
        try {
            const result = await uploadFile(file, {
                publicKey: '6e694834a8285cd233e7',
                store: 'auto',
            });
            if (result.fileUrl) {
                onUpload(result.fileUrl);
                onUploadComplete(result.fileUrl); // Call this function when upload is complete
            }
        } catch (error) {
            console.error('Upload failed:', error);
        }
    };

    return (
        <input
            type="file"
            accept="image/*"
            onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    handleUpload(e.target.files[0]);
                }
            }}
        />
    );
};

export default UploadcareComponent;
