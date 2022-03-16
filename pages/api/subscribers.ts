import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Token ' + process.env.REVUE_API_KEY
  };

  const response = await fetch(`https://www.getrevue.co/api/v2/subscribers`, {
    method: 'GET',
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    return res.status(500).json({ error: 'Error retrieving subscribers' });
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  );

  return res.status(200).json({ count: data.length });
}
