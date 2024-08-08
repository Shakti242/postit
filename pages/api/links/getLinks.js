import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Fetch links from the database
            const links = await prisma.link.findMany({
                select: {
                    id: true,
                    name: true,
                    url: true,
                    uploadedImageURL: true, // Adjust this if your schema has a different field name
                },
            });

            res.status(200).json(links);
        } catch (error) {
            console.error('Failed to fetch links:', error);
            res.status(500).json({ error: 'Failed to fetch links' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
