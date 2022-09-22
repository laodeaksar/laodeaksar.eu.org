import React from 'react';
import { Button, Icon } from '@laodeaksarr/design-system';
import { signIn } from 'next-auth/react';

function LogInWithGithub() {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/auth/signin/github"
      onClick={(e: React.FormEvent) => {
        e.preventDefault();
        signIn('github');
      }}
    >
      <Button variant="primary" endIcon={<Icon.Github />}>
        Signup with Github
      </Button>
    </a>
  );
}

export default LogInWithGithub;
