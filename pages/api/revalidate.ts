import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

import { sanityClient } from '~/lib/sanity/sanity-server';
import { postUpdatedQuery } from '~/lib/sanity/queries';
import {
  BadRequest,
  isValidHttpMethod,
  MethodNotAllowed,
  ServerError
} from '~/lib/api';

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

  const signature = req.headers[SIGNATURE_HEADER_NAME] as string;
  const body = await readBody(req); // Read the body into a string
  if (
    !isValidSignature(
      body,
      signature,
      process.env.SANITY_STUDIO_REVALIDATE_SECRET
    )
  ) {
    res.status(401).json({ message: 'Invalid signature' });
    return;
  }

  if (!signature) {
    return BadRequest(res, 'Missing signature');
  }
  const { _id: id } = JSON.parse(body);
  if (typeof id !== 'string' || !id) {
    return BadRequest(res, 'Invalid _id');
  }

  try {
    const slug = await sanityClient.fetch(postUpdatedQuery, { id });
    await Promise.all([
      res.revalidate('/blog'),
      res.revalidate(`/blog/${slug}`)
    ]);
    return res.status(200).json({ message: `[Revalidated] '${slug}' (${id})` });
  } catch (err) {
    return ServerError(res, err);
  }
}

// Next.js will by default parse the body, which can lead to invalid signatures
export const config = {
  api: {
    bodyParser: false
  }
};

async function readBody(readable: NextApiRequest) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}
