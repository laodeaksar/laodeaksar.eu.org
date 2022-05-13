import type { NextApiRequest, NextApiResponse } from 'next';

export default async function hundler(_: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(
    "https://api.unsplash.com/users/jpvalery/statistics",
    {
      headers: {
        Authorization: 'Bearer' + process.env.UNSPLASH_REFACTOR_TOKEN,
      },
      method: "GET",
    }
  );

  const unsplashdata = await response.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1200, stale-while-revalidate=600"
  );

  return res.status(200).json({
    downloads: unsplashdata.downloads.total,
    views: unsplashdata.views.total,
  });
};
