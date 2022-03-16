import { NextApiRequest, NextApiResponse } from 'next';

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

const headers = {
  Authorization: 'Token ' + process.env.REVUE_API_KEY,
  'Content-Type': 'application/json'
};

const subscribe = async (email: string, path: string) =>
  fetch(`https://www.getrevue.co/api/v2/subscribers`, {
    body: JSON.stringify({
      email,
      tags: ['laodeaksar.eu.org' + path]
    }),
    headers,
    method: 'POST'
  });

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, path } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const response = await subscribe(email, path);

    if (response.status >= 400) {
      const message = await response.json();
      return res.status(400).json({ error: message.error.email[0] });
    }
    return res.status(201).json({
      message: `Hey, ${email},Please check your email and verify it.Can't wait to get you borded.`,
      error: ''
    });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ error: err.message || err.toString() });
  }
};

export default allowCors(handler);
