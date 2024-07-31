import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const links = await prisma.link.findMany();
            res.status(200).json(links);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch links' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
