import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, imageUrl } = req.body;
        if (!name || !imageUrl) {
            return res.status(400).json({ error: 'Name and Image URL are required' });
        }
        try {
            console.log(name, imageUrl); // Logs the received data to the console for debugging
            const newLink = await prisma.link.create({
                data: { name, url: imageUrl }, // Use `url` field in Prisma schema
            });
            res.status(200).json(newLink);
        } catch (error) {
            console.error('Error saving link:', error); // Logs error details for debugging
            res.status(500).json({ error: 'Failed to save link' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
