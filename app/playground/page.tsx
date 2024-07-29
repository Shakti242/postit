"use client";

import React, { useState } from 'react';
import { Button } from '../components/button'; // Ensure this path is correct
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '../components/dialog'; // Import your dialog components
import { Plus } from 'lucide-react'; // Import the Plus icon

const Playground = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Name:', name);
    console.log('Username:', username);
    closeDialog(); // Close the dialog after saving changes
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
            Please enter your name and username.
          </DialogDescription>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-blue-500 text-white">Save Changes</Button>
              <Button onClick={closeDialog} className="bg-gray-500 text-white">Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Playground;
