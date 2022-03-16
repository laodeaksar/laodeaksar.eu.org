import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '~/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const slug = req.query.slug.toString();

    if (req.method === 'GET') {
      const post = await prisma.post.findUnique({
        where: {
          slug
        }
      });

      return res.status(200).json({ views: post?.views ?? 0 });
    }

    if (req.method === 'POST') {
      const post = await prisma.post.upsert({
        create: {
          slug,
          likes: 0,
          views: 1
        },
        update: {
          views: {
            increment: 1
          }
        },
        where: {
          slug
        }
      });

      return res.status(200).json({ views: post?.views ?? 0 });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
