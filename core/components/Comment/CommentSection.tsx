import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Box } from '@laodeaksarr/design-system';

import { Comment } from '~/lib/types';
import fetcher from '~/lib/fetcher';
import formComments from '~/lib/formatComment';

import ListComment from './ListComments';
import CommentForm from './CommentForm';

function CommentSection() {
  const router = useRouter();

  const slug = router.query.slug as string;

  const { data: entries } = useSWR<Comment[]>(
    `/api/comment?post=${slug}`,
    fetcher
  );

  return (
    <Box>
      <CommentForm />
      {entries && <ListComment comments={formComments(entries || [])} />}
    </Box>
  );
}

export default CommentSection;
