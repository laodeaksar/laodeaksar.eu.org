import React from 'react';
import { Language } from 'prism-react-renderer';

export type PrePropsType = {
  /* children: {
    props: {
      metastring: string;
      mdxType?: string;
      className?: string;
      children: string;
    };
  };*/
  children: React.ReactNode;
};

export interface CodeBlockProps {
  codeString: string;
  language: Language;
  metastring: string | null;
  children?: React.ReactNode;
  highlightLine?: any;
}

export interface HighlightedCodeTextProps {
  codeString: string;
  language: Language | 'glsl';
  //highlightLine?: (index: number) => boolean;
  highlightLine?: any;
}
