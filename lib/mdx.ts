import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import { remarkFigure } from "./remark/remark-figure";
import { remarkSectionize } from "./remark/remark-sectionize-fork";

export async function mdxToHtml(source: any) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        require('remark-autolink-headings'), 
        remarkFigure, 
        remarkSectionize
      ],
      format: 'mdx'
    }
  });

  const tweetMatches = source.match(/<StaticTweet\sid="[0-9]+"\s\/>/g);
  const tweetIDs = tweetMatches?.map((tweet: any) => tweet.match(/[0-9]+/g)[0]);

  return {
    html: mdxSource,
    tweetIDs: tweetIDs || [],
    wordCount: source.split(/\s+/gu).length,
    readingTime: readingTime(source).text
  };
}

