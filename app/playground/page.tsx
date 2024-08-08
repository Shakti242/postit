'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/button';  // Ensure this path is correct
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../components/dialog';  // Ensure this path is correct
import { Plus } from 'lucide-react';
import { FileUploaderRegular } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

type Link = {
  uploadedImageURL?: string;  // Optional field
  id: string;
  name: string;
  url: string;
};

const Playground = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [files, setFiles] = useState<any[]>([]);  // Updated type to any for flexibility

  // Handle file changes from the uploader
  const handleChangeEvent = (items: any) => {
    setFiles([...items.allEntries.filter((file: any) => file.status === 'success')]);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await axios.get('/api/links/getLinks');
      setLinks(response.data);
    } catch (error) {
      console.error('Failed to fetch links:', error);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uploadedImageURL = files[0]?.fileInfo?.cdnUrl;  // Ensure proper URL extraction
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('/api/links/addLink', { name, url, uploadedImageURL });
      setLinks((prevLinks) => [...prevLinks, response.data]); // Update links state with the new link
      closeDialog();
      setName('');
      setUrl('');
      setFiles([]);
    } catch (error) {
      console.error('Failed to save link:', error);
      setError('Failed to save link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen p-4 bg-white text-gray-900">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="absolute top-4 left-4 flex items-center space-x-2 bg-[#304178] text-white hover:bg-[#253c6e] rounded-full shadow-lg transition-transform transform hover:scale-105">
            <Plus className="h-5 w-5" />
            <span>Add content</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-white p-6 rounded-lg shadow-lg border border-[#304178]">
          <DialogTitle className="text-2xl font-semibold text-[#304178]">Add Content</DialogTitle>
          <DialogDescription className="text-gray-700 mt-2">
            Please enter the name and URL of the content you wish to add.
          </DialogDescription>
          <form onSubmit={handleSaveChanges} className="mt-4 space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 text-lg rounded-md border border-[#304178] bg-[#e4e8ee] text-gray-800 focus:border-[#304178] focus:ring-[#304178] transition"
                placeholder="Enter the name"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="p-3 text-lg rounded-md border border-[#304178] bg-[#e4e8ee] text-gray-800 focus:border-[#304178] focus:ring-[#304178] transition"
                placeholder="Enter the URL"
                required
              />
            </div>
            <div>
              <FileUploaderRegular onChange={handleChangeEvent} pubkey="7d98cd312cf4d95d0bf3" />
            </div>
            <DialogFooter className="mt-4 flex justify-between">
              <Button type="submit" className="bg-[#304178] text-white hover:bg-[#253c6e] rounded-lg shadow-md transition" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" onClick={closeDialog} className="bg-gray-500 text-white hover:bg-gray-600 rounded-lg shadow-md transition">Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 shadow-md">
          {error}
        </div>
      )}

      <div className="mt-12">
        <h2 className="text-3xl font-bold text-[#304178] mb-8">Saved Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map(link => (
            <div key={link.id} className="bg-white border border-[#304178] rounded-lg shadow-lg p-4 hover:bg-[#e4e8ee] transition transform hover:scale-105">
              <a
                href={link.uploadedImageURL || link.url}  // Use uploadedImageURL if available
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-[#304178] hover:underline"
              >
                {link.name}
              </a>
              {/* Display the uploaded image if URL is available */}
              {link.uploadedImageURL && (
                <img src={link.uploadedImageURL} alt={link.name} className="mt-2 max-w-full h-auto rounded-lg border border-[#304178]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playground;
