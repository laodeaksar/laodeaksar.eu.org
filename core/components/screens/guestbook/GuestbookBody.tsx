import { Spinner } from '@bahutara/design-system';

import GuestbookForm from './GuestbookForm';
import LogInWithGithub from './LoginWithGithub';

function GuestbookBody({ status }: { status: string }) {
  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'unauthenticated') return <LogInWithGithub />;

  return <GuestbookForm />;
}

export default GuestbookBody;
