import { css } from '~/lib/stitches.config';

const prism = css({
  overflowX: 'auto',
  lineHeight: 1,
  code: {
    display: 'block',
    width: 'fit-content',
    minWidth: '100%',
    background: 'none',
    fontFamily: '$mono',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    lineHeight: 1.6,
    MozTabSize: '4',
    OTabSize: '4',
    tabSize: 4,
    WebkitHyphens: 'none',
    MozHyphens: 'none',
    msHyphens: 'none',
    hyphens: 'none',
    py: '$4'
  },

  // Code Highlight Styles
  // Fallback variables
  '$$prism-line-inserted': 'rgba(16, 185, 129, 0.2)',
  '$$prism-line-deleted': 'rgba(239, 68, 68, 0.2)',

  '$$prism-prefix-inserted': 'rgba(16, 185, 129, 1)',
  '$$prism-prefix-deleted': 'rgba(239, 68, 68, 1)',

  '$$prism-line-number': '#888',

  '.code-line': {
    display: 'block',
    pl: '$4',
    pr: '$6',
    borderCollapse: 'collapse',
    borderLeft: '3px solid transparent',

    '&:hover': {
      bc: 'var(--laodeaksar-colors-emphasis)'
    }
  },
  '.code-line.inserted': { backgroundColor: '$$prism-line-inserted' },
  '.code-line.deleted': { backgroundColor: '$$prism-line-deleted' },
  '.line-number::before': {
    pr: '$4',
    color: '$$prism-line-number',
    display: 'inline-block',
    textAlign: 'right',
    content: 'attr(line)',
    width: 30
  },
  '.token.prefix': { padding: '0 0.5em' },
  '.token.prefix.inserted': { color: '$$prism-prefix-inserted' },
  '.token.prefix.deleted': { color: '$$prism-prefix-deleted' },

  '.highlight-line': {
    background: 'var(--laodeaksar-colors-emphasis)',
    borderColor: 'var(--laodeaksar-colors-brand)'
  }
})();

export default prism;
