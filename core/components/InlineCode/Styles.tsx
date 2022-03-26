import { Shadows, styled } from '~/lib/stitches.config';

export const StyledInlineCode = styled('code', {
  fontFamily: '$mono',
  lineHeight: '1.45rem',
  borderRadius: '$1',
  backgroundColor: 'var(--laodeaksar-colors-foreground)',
  color: 'var(--token-keyword)',
  padding: '2px 8px',
  fontSize: '$2',
  fontWeight: '$2 !important',
  wordBreak: 'break-word',
  border: '1px solid var(--laodeaksar-border-color)',
  boxShadow: Shadows[1]
});
