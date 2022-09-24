import {
  Anchor,
  Blockquote,
  Button,
  Callout,
  InlineCode,
  List,
  Pill,
  Text,
  EM,
  H2,
  H3,
  Strong,
  Tabs
} from '@laodeaksarr/design-system';
import Code from '@/components/Code';
import VideoPlayer from '@/components/VideoPlayer';

// MDX only components Image,
import Image from './Image';

const MDXComponents = {
  a: function A(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return <Anchor underline {...props} />;
  },
  Anchor,
  Button,
  blockquote: Blockquote,
  Callout,
  em: EM,
  h2: H2,
  h3: H3,
  img: Image,
  Image,
  code: InlineCode,
  li: List.Item,
  ol: function OL(props: React.OlHTMLAttributes<HTMLOListElement>) {
    return <List variant="ordered" {...props} />;
  },
  p: function P(props: React.HTMLAttributes<HTMLParagraphElement>) {
    return <Text as="p" {...props} />;
  },
  Pill,
  pre: Code,
  strong: Strong,
  ul: function UL(props: React.HTMLAttributes<HTMLUListElement>) {
    return <List variant="unordered" {...props} />;
  },
  VideoPlayer,
  Tabs
};

export default MDXComponents;
