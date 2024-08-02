import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, url } = req.body;
        if (!name || !url) {
            return res.status(400).json({ error: 'Name and URL are required' });
        }
        try {
            console.log(name, url);
            const newLink = await prisma.link.create({
                data: { name, url },
            });
            res.status(200).json(newLink);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save link' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
