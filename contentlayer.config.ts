import {
  ComputedFields,
  defineDocumentType,
  makeSource
} from 'contentlayer/source-files';

import { remarkFigure } from './lib/remark-figure';
import { remarkSectionize } from './lib/remark-sectionize-fork';

import readingTime from 'reading-time';
import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length
  },
  tweetIds: {
    type: 'json',
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(
        /<StaticTweet\sid="[0-9]+"\s\/>/g
      );
      const tweetIDs = tweetMatches?.map(
        (tweet: any) => tweet.match(/[0-9]+/g)[0]
      );
      return tweetIDs ?? [];
    }
  },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
  }
};

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    subtitle: { type: 'string', required: true },
    date: { type: 'date', required: true },
    updated: { type: 'date', required: true },
    tags: { type: 'list', required: true, of: { type: 'string' }, default: [] },
    keywords: { type: 'json' },
    cover: { type: 'string' },
    colorFeatured: { type: 'string' },
    fontFeatured: { type: 'string' },
    featured: { type: 'boolean' }
  },
  computedFields
}));

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    language: { type: 'string', required: true },
    date: { type: 'date', required: true },
    snippetImage: { type: 'string', required: true }
  },
  computedFields: { slug: computedFields.slug }
}));

const OtherPage = defineDocumentType(() => ({
  name: 'OtherPage',
  filePathPattern: '*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true }
  },
  computedFields: { slug: computedFields.slug }
}));

const contentLayerConfig = makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Snippet, OtherPage],
  mdx: {
    remarkPlugins: [
remarkSlug,
      remarkSectionize
    ]
  }
});

export default contentLayerConfig;
