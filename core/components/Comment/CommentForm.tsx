import { useRouter } from 'next/router';
import { Box, Button, TextArea } from '@laodeaksarr/design-system';

function CommentForm({ parentId }: { parentId?: string }) {
  const router = useRouter();

  function handleSubmit(values: { body: string }) {
    const payload = {
      ...values,
      slug,
      parentId,
    };

    return mutate(payload);
  }

  return (
    <Box>
      <form onSubmit={()=>handleSubmit()}>
        <TextArea
          required
          id="comment"
          disabled={isLoading}
          placeholder="Comment"
          aria-label="comment"
        />
        <Button isLoading={isLoading} variant="primary" type="submit">
          {parentId ? 'Post reply' : 'Post Comment'}
        </Button>
      </form>
    </Box>
  );
}

export default CommentForm;
