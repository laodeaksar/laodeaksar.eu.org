import { find, compact, filter, flattenDeep, flatMapDeep } from 'lodash';
import { ParsedUrlQuery } from 'querystring';

import { allBlogs } from 'contentlayer/generated';
import type { Blog } from 'contentlayer/generated';

export const getCurrentBlog = (params: ParsedUrlQuery | undefined) => {
  const currentBlog = find(allBlogs, (blog) => {
    if (blog.slug === params?.slug) {
      return blog;
    }
  });

  return currentBlog as Blog;
};

export const getAllBlogs = () => {
  return allBlogs;
};

export const getAllBlogsWhichBelongToCurrentSlug = (
  params: ParsedUrlQuery | undefined,
  type: 'categories' | 'tags'
) => {
  switch (type) {
    // case 'categories':
    //   const allPostsFromThisCategory = filter(allBlogs, (blog) => {
    //     return blog.categories.includes(params?.slug);
    //   });

    //   return compact(
    //     flattenDeep(allPostsFromThisCategory)
    //   ) as unknown as Blog[];

    case 'tags':
      const allPostsFromThisTag = filter(allBlogs, (blog: any) => {
        return blog.tags.includes(params?.slug);
      });

      return compact(flattenDeep(allPostsFromThisTag)) as unknown as Blog[];

    default:
      break;
  }
};

export const getNextBlogs = (params: ParsedUrlQuery | undefined) =>
  filter(allBlogs, (blog) => blog !== getCurrentBlog(params));

// export const getAllCategories = () => flatMapDeep(allBlogs, 'categories');

export const getAllTags = () => flatMapDeep(allBlogs, 'tags');
