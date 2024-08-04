
"use client";

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

type Link = {
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

  // Fetch links on component mount
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
    console.log('Input Values:', { name, url });
    setError('');
    setLoading(true);
    try {
      const response = await axios.post('/api/links/addLink', { name, url });
      setLinks((prevLinks) => [...prevLinks, response.data]); // Update links state with the new link
      closeDialog();
      setName('');
      setUrl('');
    } catch (error) {
      console.error('Failed to save link:', error);
      setError('Failed to save link. Please try again.');
    } finally {
      setLoading(false);
    }
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
            Please enter the name and URL.
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
            <div className="flex flex-col my-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="p-4 text-lg rounded-md my-2 bg-gray-200"
                placeholder="Enter the URL"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 text-white" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" onClick={closeDialog} className="bg-gray-500 text-white">Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {error && (
        <div className="mt-4 p-4 border rounded-md bg-red-100 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-14">
        <h2 className="text-xl font-bold">Saved Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map(link => (
            <div key={link.id} className="border rounded-lg p-4 shadow-lg bg-white hover:bg-gray-100 transition">
              <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                {link.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playground;