import { useState } from 'react';
import { Box, Button, Card, Text } from '@laodeaksarr/design-system';

import type { CommentWithChildren } from '~/lib/types';

import CommentForm from './CommentForm';

function getReplyCount(count: number) {
  if (count === 0) {
    return 'No replies';
  }

  if (count === 1) {
    return '1 reply';
  }

  return `${count} replies`;
}

function CommentActions({
  commentId,
  replyCount
}: {
  commentId: string;
  replyCount: number;
}) {
  const [replying, setReplying] = useState(false);

  return (
    <>
      <Card>
        <Text>{getReplyCount(replyCount)}</Text>
        <Button variant="primary" onClick={() => setReplying(!replying)}>
          Reply
        </Button>
      </Card>

      {replying && <CommentForm parentId={commentId} />}
    </>
  );
}

function Comment({ comment }: { comment: CommentWithChildren }) {
  return (
    <Card>
      <Box>
        <Text>{comment.user?.name}</Text>
        <Text>{comment.created_at}</Text>
        <Text>{comment.body}</Text>
      </Box>

      <CommentActions
        commentId={comment.id}
        replyCount={comment.children.length}
      />

      {comment.children && comment.children.length > 0 && (
        <ListComment comments={comment.children} />
      )}
    </Card>
  );
}

function ListComment({ comments }: { comments: CommentWithChildren[] }) {
  return (
    <Box>
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </Box>
  );
}

export default ListComment;
