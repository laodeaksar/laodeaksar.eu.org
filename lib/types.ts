import { MDXRemoteSerializeResult } from 'next-mdx-remote';

export type Post = {
  _id: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  subtitle: string;
  date: string;
  updated: string;
  description: string;
  featured?: boolean;
  colorFeatured?: string;
  fontFeatured?: string;
  cover?: string;
  readingTime: string;
  image: any;
  tags: any[];
  url: any;
  tweets: any[];
  ogImage: any;
};

export type Gear = {
  id: string;
  description: any;
  title: string;
  category: 'Hardware' | 'Software' | 'Office' | 'Lifestyle';
  image: any;
  link?: string;
  affiliateLink?: string;
  affiliateLinkText?: string;
};

export type Snippet = {
  _id: string;
  date: string;
  language: string;
  logo: string;
  slug: string;
  content: MDXRemoteSerializeResult;
  title: string;
  description: string;
};

export type Views = {
  total: number;
};

export enum Form {
  Initial,
  Loading,
  Success,
  Error
}

export interface FormState {
  state: Form;
  message?: string;
}

type TweetMedia = {
  media_key: string;
  type: string;
  url: string;
  height: number;
  width: number;
};

export type RawTweetType = {
  includes: {
    media: TweetMedia[];
    users: Array<{
      verified: boolean;
      url: string;
      profile_image_url: string;
      protected: boolean;
      username: string;
      name: string;
      id: string;
    }>;
    tweets: TweetData[];
  };
  data: TweetData[];
};

export interface TweetData {
  text: string;
  type: string;
  referenced_tweets: TweetData[];
  public_metrics: {
    retweet_count?: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  created_at: string;
  attachments: {
    media_keys: string[];
  };
  id: string;
  author_id: string;
}

export interface TransformedTweet extends TweetData {
  map(
    arg0: (tweet: TransformedTweet) => JSX.Element
  ):
    | string
    | number
    | boolean
    | {}
    | import('react').ReactElement<
        any,
        string | import('react').JSXElementConstructor<any>
      >
    | import('react').ReactNodeArray
    | import('react').ReactPortal
    | null
    | undefined;
  author: {
    verified: boolean;
    url: string;
    profile_image_url: string;
    protected: boolean;
    username: string;
    name: string;
    id: string;
  };
  media: TweetMedia[];
  referenced_tweets: TransformedTweet[];
}

export type Comment = {
  id: string;
  parentId: string;
  user:
    | {
        name?: string | null | undefined;
        email?: string | null | undefined;
        image?: string | null | undefined;
      }
    | undefined;
  created_at: string;
  body: string;
};

export type CommentWithChildren = Comment & {
  children: CommentWithChildren[];
};
