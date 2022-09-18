import { type NextRequest } from 'next/server';
import { buildApiResponse } from '~/lib/api';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(_: NextRequest) {
  const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
    method: 'GET',
    headers: {
      Authorization: `Token ${process.env.REVUE_API_KEY}`
    }
  });

  const data = await result.json();

  if (!result.ok) {
    return buildApiResponse(500, { error: 'Error retrieving subscribers' });

    /*return new Response(
      JSON.stringify({ error: 'Error retrieving subscribers' }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json'
        }
      }
    );*/
  }

  return buildApiResponse(
    200,
    { count: data.length },
    { 'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600' }
  );

  /*return new Response(JSON.stringify({ count: data.length }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600'
    }
  });*/
}
