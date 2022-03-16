import type { NextApiRequest, NextApiResponse } from 'next';

const allowCors =
  (fn: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, OPTIONS, PATCH, DELETE, POST, PUT'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, path } = req.body as { email: string; path: string };

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Token ' + process.env.REVUE_API_KEY
  };

  const existingSubscribers = await fetch(
    'https://www.getrevue.co/api/v2/subscribers',
    {
      method: 'GET',
      headers
    }
  );
  const subscribers = await existingSubscribers.json();

  if (subscribers.some((sub: { email: string }) => sub.email === email)) {
    return res
      .status(201)
      .json({ error: '', message: `You're already subscribed! 😊` });
  }

  const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      email,
      tags: ['laodeaksar.eu.org' + path]
    })
  });
  const data = await result.json();

  if (!result.ok) {
    return res.status(500).json({ error: data.error.email[0] });
  }

  return res.status(201).json({
    message: `Hey, ${email}, Please check your email and verify it. Can't wait to get you borded.`,
    error: ''
  });
};

export default allowCors(handler);
