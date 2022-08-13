import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidRequest, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { sanityClient } from '~/lib/sanity-server';
import { postUpdatedQuery } from '~/lib/queries';
import { BadRequest, isValidHttpMethod, MethodNotAllowed } from '~/lib/api';

async function stringifyRequest(req: NextApiRequest) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!isValidHttpMethod(req.method, ['POST'])) {
    return MethodNotAllowed(res);
  }

  if (!process.env.SANITY_STUDIO_REVALIDATE_SECRET) {
    return res
      .status(500)
      .json({ message: 'Missing sanity studio revalidate secret' });
  }

  const signature = req.headers[SIGNATURE_HEADER_NAME]?.toString();
  const stringifiedRequest = await stringifyRequest(req);

  if (!signature) {
    return BadRequest(res, 'Missing signature');
  }

  if (
    !isValidRequest(
      stringifiedRequest,
      signature,
      process.env.SANITY_STUDIO_REVALIDATE_SECRET
    )
  ) {
    return res.status(401).json({ message: 'Invalid request' });
  }

  const { _id: id } = JSON.parse(stringifiedRequest);
  if (typeof id !== 'string' || !id) {
    return BadRequest(res, 'Invalid _id');
  }

  try {
    const slug = await sanityClient.fetch(postUpdatedQuery, { id });
    await Promise.all([
      res.revalidate('/blog'),
      res.revalidate(`/blog/${slug}`)
    ]);
    return res.status(200).json({ message: `[Revalidated] ${slug}` });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    } else {
      return res.status(500).json({ message: 'Unknown error' });
    }
  }
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false
  }
};
