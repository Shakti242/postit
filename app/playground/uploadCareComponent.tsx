// "use client";

// import React, { useState } from 'react';
// import { Button } from '../components/button';
// import {
//     Dialog,
//     DialogTrigger,
//     DialogContent,
//     DialogTitle,
//     DialogDescription,
//     DialogFooter
// } from '../components/dialog';
// import { Plus } from 'lucide-react';
// import axios from 'axios';

// const Playground = () => {
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [name, setName] = useState('');
//     const [url, setUrl] = useState('');
//     const [savedData, setSavedData] = useState(null); // To store saved link data

//     const openDialog = () => setIsDialogOpen(true);
//     const closeDialog = () => setIsDialogOpen(false);

//     const handleSaveChanges = async () => {
//         try {
//             const response = await axios.post('/api/links/addLink', { name, url });
//             setSavedData(response.data); // Store the returned data with id
//             closeDialog();
//         } catch (error) {
//             console.error('Failed to save link:', error);
//         }
//     };

//     return (
//         <div className="relative h-screen p-4">
//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                 {/* <DialogTrigger asChild>
//                     <Button className="absolute top-4 left-4 flex items-center space-x-2" onClick={openDialog}>
//                         <Plus className="h-5 w-5" />
//                         <span>Add content</span>
//                     </Button>
//                 </DialogTrigger> */}

//                 <DialogContent>
//                     <DialogTitle>Add Content</DialogTitle>
//                     <DialogDescription>
//                         Please enter the name and URL.
//                     </DialogDescription>
//                     <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
//                             <input
//                                 id="name"
//                                 type="text"
//                                 value={name}
//                                 onChange={(e) => setName(e.target.value)}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
//                             <input
//                                 id="url"
//                                 type="url"
//                                 value={url}
//                                 onChange={(e) => setUrl(e.target.value)}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                                 required
//                             />
//                         </div>
//                         <DialogFooter>
//                             <Button type="submit" className="bg-blue-500 text-white">Save Changes</Button>
//                             <Button onClick={closeDialog} className="bg-gray-500 text-white">Cancel</Button>
//                         </DialogFooter>
//                     </form>
//                 </DialogContent>
//             </Dialog>

//             {savedData && (
//                 <div className="mt-4 p-4 border rounded-md bg-gray-100">
//                     <p><strong>ID:</strong> {savedData.id}</p>
//                     <p><strong>Name:</strong> {savedData.name}</p>
//                     <p><strong>URL:</strong> {savedData.url}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Playground;
