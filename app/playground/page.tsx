"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '../components/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../components/dialog';
import { Plus } from 'lucide-react';
import UploadcareComponent from '../playground/uploadCareComponent';

interface SavedData {
  id: string;
  name: string;
  url: string;
}

const Playground = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [savedData, setSavedData] = useState<SavedData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/links/addLink', { name, imageUrl: savedData?.url });
      setSavedData(response.data);
      setName('');
      closeDialog();
    } catch (error) {
      console.error('Failed to save link:', error);
      setError('Failed to save link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (url: string) => {
    setSavedData((prevData) => ({
      ...(prevData || { id: '', name: '', url: '' }),
      url
    }));
    setUploadMessage('Uploaded');
  };

  const handleUploadComplete = (url: string) => {
    setUploadMessage('Upload Complete');
    // Additional actions can be added here if needed
  };

  return (
    <div className="relative h-screen p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="absolute top-4 left-4 flex items-center space-x-2" onClick={openDialog}>
            <Plus className="h-5 w-5" />
            <span>Add content</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Add Content</DialogTitle>
          <DialogDescription>
            Please enter the name and upload an image.
          </DialogDescription>
          <form onSubmit={handleSaveChanges} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-4 text-lg rounded-md my-2 bg-gray-200"
                placeholder="Enter the name"
                required
              />
            </div>
            <UploadcareComponent onUpload={handleUpload} onUploadComplete={handleUploadComplete} />
            {uploadMessage && <p className="text-green-500 mt-2">{uploadMessage}</p>}
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 text-white" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" onClick={closeDialog} className="bg-gray-500 text-white">Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {savedData && (
        <div className="mt-14 p-8 border rounded-md bg-gray-100">
          <p><strong>ID:</strong> {savedData.id}</p>
          <p><strong>Name:</strong> {savedData.name}</p>
          <p><strong>Image URL:</strong> <a href={savedData.url} target="_blank" rel="noopener noreferrer">{savedData.url}</a></p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 border rounded-md bg-red-100 text-red-700">
          {error}
        </div>
      )}
    </div>
  );
};

export default Playground;
