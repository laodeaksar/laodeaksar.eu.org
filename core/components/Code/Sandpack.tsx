import {
  SandpackProvider,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPredefinedTemplate
} from '@codesandbox/sandpack-react';

import { Shadows, styled } from '@laodeaksarr/design-system';

import setupFiles from './SandpackSetupFiles';

// Default Theme
const theme = {
  colors: {
    hover: 'var(--laodeaksar-colors-brand)',
    clickable: 'var(--laodeaksar-colors-typeface-secondary)',
    accent: 'var(--laodeaksar-colors-brand)',
    errorSurface: 'var(--laodeaksar-colors-danger-emphasis)',
    error: 'var(--laodeaksar-colors-danger)',
    surface3: 'var(--laodeaksar-colors-emphasis)',
    surface2: 'var(--laodeaksar-border-color)',
    surface1: 'var(--laodeaksar-snippet-background)'
  },

  syntax: {
    plain: 'var(--token-comment)',

    comment: {
      color: 'var(--token-comment)'
    },

    keyword: 'var(--token-keyword)',
    tag: 'var(--token-symbol)',
    punctuation: 'var(--token-punctuation)',
    definition: 'var(--token-function)',
    property: 'var(--token-function)',
    static: 'var(--token-comment)',
    string: 'var(--token-selector)'
  },

  font: {
    body: 'var(--fonts-display)',
    mono: 'var(--fonts-mono)',
    size: '14px',
    lineHeight: '26px'
  }
};

const defaultEditorOptions = {
  showNavigator: false,
  showInlineErrors: true,
  showLineNumbers: true,
  editorHeight: 520
};

// Styles
const SandpackWrapper = styled('div', {
  '.sp-layout': {
    position: 'relative',
    marginBottom: '2.25rem',
    borderRadius: '$2',
    shadow: `${Shadows[1]}`,

    '@media (max-width: 750px)': {
      display: 'block'
    },

    '@media (max-width: 1200px)': {
      width: '100vw',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      borderRadius: '0px'
    },

    '@media (min-width: 1200px)': {
      position: 'relative',
      width: 'calc(100% + 200px)',
      mx: '-100px'
    }
  },

  '.cm-gutterElement': {
    fontSize: '12px',
    userSelect: 'none',
    opacity: '1',
    color: 'var(--laodeaksar-colors-typeface-tertiary)'
  },

  '.button': {
    backgroundColor: 'var(--laodeaksar-colors-body)!important',
    cursor: 'pointer !important',

    '&:hover': {
      backgroundColor: 'var(--laodeaksar-colors-body)!important'
    }
  }
});

// TODO extends from sandpack type
interface SandpackOptions {
  editorWidthPercentage: number;
  editorHeight: number;
}

interface SandpackProps {
  template: SandpackPredefinedTemplate;
  options?: SandpackOptions;
  // Type using Sandpack built in types
  files: Record<string, any>;
  dependencies?: Record<string, string>;
  autorun?: boolean;
  editorOnly?: boolean;
  renderOnly?: boolean; // TODO Make sure you can't have autorun = true and renderOnly = true
}

const Sandpack = (props: SandpackProps) => {
  const {
    files,
    dependencies,
    template,
    autorun = true,
    editorOnly = false,
    renderOnly = false
  } = props;
  const editorPart = props.options?.editorWidthPercentage || 50;
  const previewPart = 100 - editorPart;

  const defaultFilesByTemplate: Record<SandpackPredefinedTemplate, any> = {
    react: setupFiles,
    // TODO
    'react-ts': '',
    vanilla: '',
    'vanilla-ts': '',
    angular: '',
    vue: '',
    vue3: '',
    svelte: '',
    solid: ''
  };

  return (
    <SandpackWrapper>
      <SandpackProvider
        template={template}
        theme={theme}
        files={{
          ...files,
          ...defaultFilesByTemplate[template]
        }}
        customSetup={{
          dependencies: dependencies || {}
        }}
        options={{
          autorun
        }}
      >
        <SandpackLayout>
          {!editorOnly && (
            <SandpackPreview
              showNavigator={defaultEditorOptions.showNavigator}
              style={{
                height: defaultEditorOptions.editorHeight,
                flexGrow: previewPart,
                flexShrink: previewPart,
                minWidth: 700 * (previewPart / (previewPart + editorPart))
              }}
            />
          )}
          {!renderOnly && (
            <SandpackCodeEditor
              {...defaultEditorOptions}
              style={{
                height: defaultEditorOptions.editorHeight,
                flexGrow: editorPart,
                flexShrink: editorPart,
                minWidth: 700 * (editorPart / (previewPart + editorPart))
              }}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </SandpackWrapper>
  );
};

export default Sandpack;
