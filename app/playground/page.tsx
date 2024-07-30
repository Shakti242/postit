"use client";

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

const Playground = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [savedData, setSavedData] = useState(null);
  const [error, setError] = useState('');

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleSaveChanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Input Value:', name); // Log the input value
    setError('');
    try {
      const response = await axios.post('/api/links/addLink', { name });
      setSavedData(response.data);
      closeDialog();
    } catch (error) {
      console.error('Failed to save link:', error);
      setError('Failed to save link. Please try again.');
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
            Please enter the name.
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
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 text-white">Save Changes</Button>
              <Button type="button" onClick={closeDialog} className="bg-gray-500 text-white">Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {savedData && (
        <div className="mt-14 p-8 border rounded-md bg-gray-100">
          <p><strong>ID:</strong> {savedData.id}</p>
          <p><strong>Name:</strong> {savedData.name}</p>
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
