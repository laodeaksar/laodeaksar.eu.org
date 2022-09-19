import { type NextRequest } from 'next/server';
import { buildApiResponse } from '~/lib/api';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return buildApiResponse(400, { error: 'Email is required' });

    /*return new Response(
      JSON.stringify({
        error: 'Email is required'
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json'
        }
      }
    );*/
  }

  const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  const data = await result.json();

  if (!result.ok) {
    return buildApiResponse(500, { error: data.error.email[0] });

    /*return new Response(
      JSON.stringify({
        error: data.error.email[0]
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    );*/
  }

  return buildApiResponse(201, { error: '' });

  /*return new Response(
    JSON.stringify({
      error: ''
    }),
    {
      status: 201,
      headers: {
        'content-type': 'application/json'
      }
    }
  );*/
}
