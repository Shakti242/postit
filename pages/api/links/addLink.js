// pages/api/links/addLink.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        try {
            console.log("test");
            const newLink = await prisma.link.create({ data: { name: name } });
            console.log("newlink", newLink);
            res.status(200).json(newLink);

        } catch (error) {
            res.status(500).json({ error: 'Failed to save link' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
