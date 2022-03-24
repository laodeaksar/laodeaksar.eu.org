import type { CSS } from '~/lib/stitches.config';

export type ArrowPosition = 'left' | 'right';

interface BaseAnchor extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  discreet?: boolean;
  css?: CSS;
}

interface UnderlineAnchorProps extends BaseAnchor {
  arrow?: never;
  underline?: boolean;
  favicon?: never;
}

interface ArrowAnchorProps extends BaseAnchor {
  arrow?: ArrowPosition;
  underline?: never;
  favicon?: never;
}

interface FaviconAnchorProps extends BaseAnchor {
  arrow?: never;
  underline?: never;
  favicon?: boolean;
}

export type AnchorProps =
  | ArrowAnchorProps
  | FaviconAnchorProps
  | UnderlineAnchorProps;
