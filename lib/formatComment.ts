import type { Comment, CommentWithChildren } from './types';

function formComments(comments: Comment[]) {
  const map = new Map();

  const roots: CommentWithChildren[] = [];

  for (let i = 0; i < comments.length; i++) {
    const commentId = comments[i]?.id;

    map.set(commentId, i);

    (comments[i] as CommentWithChildren).children = [];

    if (typeof comments[i]?.parentId === 'string') {
      const parentCommentIndex: number = map.get(comments[i]?.parentId);

      (comments[parentCommentIndex] as CommentWithChildren).children.push(
        comments[i] as CommentWithChildren
      );

      continue;
    }

    roots.push(comments[i] as CommentWithChildren);
  }

  return roots;
}

export default formComments;
