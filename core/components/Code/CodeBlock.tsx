import Highlight, { defaultProps, Prism } from 'prism-react-renderer';
import { Card, styled } from '@bahutara/design-system';

import { CopyToClipboardButton } from '@/components/Buttons';

import { /*calculateLinesToHighlight,*/ hasTitle } from './utils';
import type { CodeBlockProps, HighlightedCodeTextProps } from './types';

// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

/**
 * This imports the syntax highlighting style for the Swift language
 */
require('prismjs/components/prism-swift');
require('prismjs/components/prism-glsl');

export const HighlightedCodeText = (props: HighlightedCodeTextProps) => {
  const { codeString, language, highlightLines = {} } = props;

  return (
    <Highlight
      {...defaultProps}
      theme={{ plain: {}, styles: [] }}
      code={codeString}
      // @ts-ignore let glsl be a valid language
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens
            .map((line, index) => {
              if (
                index === tokens.length - 1 &&
                line.length === 1 &&
                line[0].content === '\n'
              ) {
                return null;
              }

              const lineNumber = index + 1;
              const shouldHighlight = lineNumber in highlightLines[lineNumber];
              const { className: lineClassName, lineProps } = getLineProps({
                className: shouldHighlight ? 'highlight-line' : '',
                key: index,
                line
              });

              return (
                <Line {...lineProps} key={index} className={lineClassName}>
                  <LineNo>
                    {highlightLines[lineNumber]?.label || lineNumber}
                  </LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span
                        key={`${index}.${key}`}
                        {...getTokenProps({ key, token })}
                      />
                    ))}
                  </LineContent>
                </Line>
              );
            })
            .filter(Boolean)}
        </Pre>
      )}
    </Highlight>
  );
};

const CodeBlock = (props: CodeBlockProps) => {
  const { codeString, language, metastring , highlightLines } = props;

  //const highlightLineFn = calculateLinesToHighlight(metastring);
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
      <HighlightedCodeText
        codeString={codeString}
        language={language}
        highlightLines={highlightLines}
      />
    </Card>
  );
};

export default CodeBlock;

const Pre = styled('pre', {
  my: '0',
  textAlign: 'left',
  padding: '8px 0px',
  overflow: 'auto',
  bbr: '$2',
  bc: 'var(--code-snippet-background)',
  fontFamily: '$mono',
  fontSize: '$1',
  lineHeight: '26px',

  '.token.parameter,.token.imports,.token.plain,.token.comment,.token.prolog,.token.doctype,.token.cdata':
    {
      color: 'var(--token-comment)'
    },

  '.token.punctuation': {
    color: 'var(--token-punctuation)'
  },

  '.token.property,.token.tag,.token.boolean,.token.number,.token.constant,.token.symbol,.token.deleted':
    {
      color: 'var(--token-symbol)'
    },

  '.token.selector,.token.attr-name,.token.char,.token.builtin,.token.number,.token.string,.token.inserted':
    {
      color: 'var(--token-selector)'
    },

  '.token.operator,.token.entity,.token.url,.language-css .style': {
    color: 'var(--token-operator)'
  },

  '.token.atrule,.token.attr-value,.token.keyword': {
    color: 'var(--token-keyword)'
  },

  '.token.function,.token.maybe-class-name,.token.class-name': {
    color: 'var(--token-function)'
  },

  '.token.regex,.token.important,.token.variable': {
    color: 'var(--token-operator)'
  },

  '.token.comment,.token.italic': {
    fontStyle: 'italic'
  },

  '.token.important,.token.bold': {
    fontWeight: 'bold'
  },

  '.token.entity': {
    cursor: 'help'
  }
});

const Line = styled('div', {
  display: 'table',
  borderCollapse: 'collapse',
  padding: '0px 14px',
  borderLeft: '3px solid transparent',

  '&.highlight-line': {
    background: 'var(--laodeaksar-colors-emphasis)',
    borderColor: 'var(--laodeaksar-colors-brand)'
  },

  hover: {
    bc: 'var(--laodeaksar-colors-emphasis)'
  }
});

const LineNo = styled('div', {
  width: '45px',
  padding: '0 12px',
  userSelect: 'none',
  opacity: '1',
  color: 'var(--laodeaksar-colors-typeface-tertiary)',
  textAlign: 'right'
});

const LineContent = styled('span', {
  display: 'table-cell',
  width: '$full'
});

const CodeSnippetTitle = styled('p', {
  marginBlockStart: '0px',
  fontSize: '$1',
  marginBottom: '0px',
  color: 'var(--laodeaksar-colors-typeface-primary)',
  fontWeight: '$3'
});
