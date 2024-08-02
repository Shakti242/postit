// components/UploadcareComponent.tsx
import React, { useState } from 'react';
import { Widget } from '@uploadcare/react-widget';
import '../styles/globals.css';
interface UploadcareComponentProps {
    onUpload: (url: string) => void;
}

const UploadcareComponent: React.FC<UploadcareComponentProps> = ({ onUpload }) => {
    const [imageUrl, setImageUrl] = useState<string>('');

    const handleUploadComplete = (fileInfo: any) => {
        if (fileInfo && fileInfo.cdnUrl) {
            setImageUrl(fileInfo.cdnUrl);
            onUpload(fileInfo.cdnUrl);
        }
    };

    return (
        <div>
            <Widget
                publicKey="your_public_key_here" // Replace with your actual public key
                clearable
                onChange={handleUploadComplete}
            />
            {imageUrl && (
                <div className="mt-4">
                    <p>Uploaded Image:</p>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default UploadcareComponent;
