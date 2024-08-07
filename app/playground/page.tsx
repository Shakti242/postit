'use client';

import React, { useState, useEffect } from 'react';
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
import { Plus, MoreHorizontal } from 'lucide-react';
import * as LR from "@uploadcare/blocks";

// Register custom elements
LR.registerBlocks(LR);

type Link = {
  id: string;
  name: string;
  url: string;
};

const Playground = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();

    // Add stylesheet for Uploadcare Blocks
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.48.0/web/lr-file-uploader-regular.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const uploaderElement = document.querySelector('lr-file-uploader-regular');

    if (uploaderElement) {
      const handleChange = (event: Event) => {
        const detail = (event as CustomEvent).detail;
        if (detail.value) {
          setImageUrl(detail.value);
        }
      };

      uploaderElement.addEventListener('change', handleChange);

      return () => {
        uploaderElement.removeEventListener('change', handleChange);
      };
    }
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

  const handleSaveChanges = async () => {
    if (!imageUrl || !name) return; // Don't proceed if there's no image URL or name

    setError('');
    setLoading(true);
    try {
      const response = await axios.post('/api/links/addLink', { name, url: imageUrl });
      setLinks((prevLinks) => [...prevLinks, response.data]);
      closeDialog();
      setImageUrl('');
      setName('');
    } catch (error) {
      console.error('Failed to save link:', error);
      setError('Failed to save link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLink = async (id: string) => {
    try {
      await axios.delete('/api/links/deleteLinks', { data: { id } });
      setLinks((prevLinks) => prevLinks.filter(link => link.id !== id));
    } catch (error) {
      console.error('Failed to delete link:', error);
      setError('Failed to delete link. Please try again.');
    }
  };

  const toggleMenu = (id: string) => {
    setMenuOpenId(menuOpenId === id ? null : id);
  };

  return (
    <div className="relative h-screen p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="absolute top-4 left-4 flex items-center space-x-2" onClick={openDialog}>
            <Plus className="h-5 w-5" />
            <span>Upload Image</span>
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Please upload an image and provide a name.
          </DialogDescription>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter image name"
            className="mb-4 w-full px-3 py-2 border rounded-md"
          />
          <div>
            <lr-config
              ctx-name="my-uploader"
              pubkey="7d98cd312cf4d95d0bf3"
              max-local-file-size-bytes="10000000"
              multiple="false"
              img-only="true"
            ></lr-config>
            <lr-file-uploader-regular
              ctx-name="my-uploader"
              class="my-config uc-light"
            ></lr-file-uploader-regular>
          </div>
          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="Preview" className="w-full h-auto border rounded-md" />
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white"
              disabled={loading || !imageUrl || !name}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              onClick={closeDialog}
              className="bg-gray-500 text-white"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {error && (
        <div className="mt-4 p-4 border rounded-md bg-red-100 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-14">
        <h2 className="text-xl font-bold">Uploaded Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map(link => (
            <div key={link.id} className="relative border rounded-lg p-4 shadow-lg bg-white hover:bg-gray-100 transition">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                {link.name}
              </a>
              <div className="absolute top-2 right-2">
                <Button onClick={() => toggleMenu(link.id)} className="p-2 rounded-full hover:bg-gray-200">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
              {menuOpenId === link.id && (
                <div className="absolute bottom-2 right-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <Button onClick={() => handleDeleteLink(link.id)} className="w-full text-left p-2 hover:bg-gray-200">
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playground;
