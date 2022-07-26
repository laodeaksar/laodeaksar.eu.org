import { Language } from 'prism-react-renderer';
import React from 'react';

export type PrePropsType = {
  props: {
    live?: boolean;
    render?: boolean;
  };
  children: {
    props: {
      metastring: string;
      mdxType?: string;
      className?: string;
      children: string;
    };
  };
};

export interface CodeBlockProps {
  codeString: string;
  language: Language | 'glsl';
  metastring: string | null;
  live?: boolean;
  render?: boolean;
  children?: React.ReactNode
}

export interface HighlightedCodeTextProps {
  codeString: string;
  language: Language;
  highlightLine?: (index: number) => boolean;
}
