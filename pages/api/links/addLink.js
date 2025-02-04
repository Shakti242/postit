import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, url, uploadedImageURL } = req.body;
        console.log(uploadedImageURL);

        try {
            console.log(name, url, uploadedImageURL);
            const newLink = await prisma.link.create({
                data: { name, url, uploadedImageURL },
            });
            res.status(200).json(newLink); // Return the new link with its id
        } catch (error) {
            console.error('Error saving link:', error); // Logs error details for debugging
            res.status(500).json({ error: 'Failed to save link' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
