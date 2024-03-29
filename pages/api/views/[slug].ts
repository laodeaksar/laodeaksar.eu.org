import type { NextApiRequest, NextApiResponse } from 'next';

import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  ServerError
} from '~/lib/api';
import prisma from '~/lib/prisma';
import { getClient } from '~/lib/sanity/sanity-server';
import { postBySlugQuery } from '~/lib/sanity/queries';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['GET', 'POST'])) {
    return MethodNotAllowed(res);
  }

  try {
    const slug = req.query.slug?.toString();

    if (!slug) {
      return BadRequest(res, 'Invalid slug');
    }

    if (req.method === 'GET') {
      const postViews = await prisma.post.findUnique({
        where: {
          slug
        }
      });

      if (!postViews) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json(postViews.views.toString());
    }

    const post = await getClient(req.preview ?? false).fetch(postBySlugQuery, {
      slug
    });

    if (!post) {
      return BadRequest(res, 'Post not found');
    }

    const newOrUpdatedViews = await prisma.post.upsert({
      where: { slug },
      create: { slug, views: 1 },
      update: { views: { increment: 1 } }
    });

    return res.status(200).json(newOrUpdatedViews.views.toString());
  } catch (e) {
    return ServerError(res, e);
  }
}
