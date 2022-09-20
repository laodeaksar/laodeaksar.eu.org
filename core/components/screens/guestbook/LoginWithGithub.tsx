import { Button, Icon } from '@laodeaksarr/design-system';
import { signIn } from 'next-auth/react';
import { ClickEvent } from '~/lib/types';

function LogInWithGithub() {
  return (
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a
      href="/api/auth/signin/github"
      onClick={(e: ClickEvent) => {
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
