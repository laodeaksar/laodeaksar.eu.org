import React from 'react';

import {styled}from'~/lib/stitches.config';
import prism from '~/styles/prism';

import Card from '~/components/Card';
import { hasTitle } from './utils';
import { CodeBlockProps } from './types';
import { CopyToClipboardButton } from '../Button';


const Pre = (props: CodeBlockProps) => {
  const { codeString, children, metastring } = props;

  const title = hasTitle(metastring);

  return (
    <Card
      css={{
        marginBottom: '32px',
        background: 'unset',

        '@media(max-width: 750px)': {
          width: '100vw',
          position: 'relative',
          left: '50%',
          right: '50%',
          mx: '-50vw',
          borderRadius: '0px'
        }
      }}
    >
      {title && (
        <Card.Header
          css={{
            padding: '0px 16px',
            bc: 'var(--code-snippet-background)'
          }}
        >
          <CodeSnippetTitle>{title}</CodeSnippetTitle>
          <CopyToClipboardButton title={title} text={codeString} />
        </Card.Header>
      )}
      <PreWrapper className={prism}>{children}</PreWrapper>
    </Card>
  );
};

export default Pre;

const PreWrapper = styled('pre', {
  my: '0',
  overflow: 'auto',
  bbr: '$2',
  bc: 'var(--code-snippet-background)',
  fontSize: '$1',
  lineHeight: '26px'
});

const CodeSnippetTitle = styled('p', {
  marginBlockStart: '0px',
  fontSize: '$1',
  marginBottom: '0px',
  color: 'var(--laodeaksar-colors-typeface-primary)',
  fontWeight: '$3'
});