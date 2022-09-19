import { serialize } from 'next-mdx-remote/serialize';
import readingTime from 'reading-time';
import { remarkFigure } from './remark/remark-figure';
import { remarkMeta } from './remark/remark-meta';
import { remarkSectionize } from './remark/remark-sectionize-fork';
import remarkSlug from 'remark-slug';
import remarkGfm from 'remark-gfm';
import remarkAutolinkHeading from 'remark-autolink-headings';

export async function mdxToHtml(source: string) {
  const mdxSource = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkSlug,
        remarkAutolinkHeading,
        remarkFigure,
        remarkGfm,
        remarkSectionize
      ],
      rehypePlugins: [remarkMeta],
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
