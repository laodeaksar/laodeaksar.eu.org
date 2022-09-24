import React from 'react';
import { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
import { Box, Button, TextArea } from '@laodeaksarr/design-system';

import { Form, FormState } from '~/lib/types';

function CommentForm({ parentId }: { parentId?: string }) {
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const slug = router.query.slug as string;

  const inputEl = React.useRef<HTMLTextAreaElement | null>(null);
  const [form, setForm] = React.useState<FormState>({ state: Form.Initial });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ state: Form.Loading });

    if (inputEl === null || inputEl.current === null) {
      setForm({ state: Form.Error });
      return;
    }

    if (inputEl.current.value.trim().length === 0) {
      setForm({ state: Form.Error, message: 'error' });
      return;
    }

    const res = await fetch('/api/comment?slug=' + slug, {
      body: JSON.stringify({
        body: inputEl.current.value,
        slug
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    });

    const { error } = await res.json();
    if (error) {
      setForm({
        state: Form.Error,
        message: error
      });
      return;
    }

    inputEl.current.value = '';
    mutate(`/api/comment?post=${slug}`);
    setForm({
      state: Form.Success,
      message: 'comment'
    });
  };

  const isLoading = form.state === Form.Loading;

  return (
    <Box>
      <form onSubmit={onSubmit}>
        <TextArea
          required
          ref={inputEl}
          id="comment"
          disabled={isLoading}
          placeholder="Comment"
          aria-label="comment"
          onChange={() => {}}
        />
        <Button isLoading={isLoading} variant="primary" type="submit">
          {parentId ? 'Post reply' : 'Post Comment'}
        </Button>
      </form>
    </Box>
  );
}

export default CommentForm;
