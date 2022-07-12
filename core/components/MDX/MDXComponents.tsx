import dynamic from 'next/dynamic';

// Components
import {
  Anchor,
  Blockquote,
  Button,
  Callout,
  Card,
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
import Code from '~/components/Code';
import VideoPlayer from '~/components/VideoPlayer';

// MDX only components Image,
import Image from './Image';

// Widgets (used in blog post for interactive experiences)
const ClipboardAnimationDetails = dynamic(
  () => import('./Widgets/ClipboardAnimationDetails')
);
const FramerMotionPropagation = dynamic(
  () => import('./Widgets/FramerMotionPropagation')
);
const FramerMotionAnimationLayout = dynamic(
  () => import('./Widgets/FramerMotionAnimationLayout')
);
const FramerMotionAnimatePresence = dynamic(
  () => import('./Widgets/FramerMotionAnimatePresence')
);
const HighlightSection = dynamic(() => import('./Widgets/HighlightSection'));
const AnimationTypes = dynamic(() => import('./Widgets/AnimationTypes'));
const Orchestration = dynamic(() => import('./Widgets/Orchestration'));
const ThemePicker = dynamic(() => import('./Widgets/ThemePicker'));
const HSLAShowcase = dynamic(() => import('./Widgets/HSLAShowcase'));
const PaletteGenerator = dynamic(() => import('./Widgets/PaletteGenerator'));
const ScrollSpyWidget = dynamic(() => import('./Widgets/ScrollSpyWidget'), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <div style={{ width: '100%', height: '705px' }} />
});
const CubicBezierVisualizer = dynamic(
  () => import('./Widgets/CubicBezierVisualizer')
);
const BezierCurve = dynamic(() => import('./Widgets/BezierCurves'));
const Callstack = dynamic(() => import('./Widgets/Callstack'));

const FramerMotionLayoutAnimationsBasic = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/Basic')
);
const FramerMotionDistorsions = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/Distorsions')
);
const FramerMotionLayoutAnimationsLayoutProp = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/LayoutProp')
);
const FramerMotionLayoutAnimationsLayoutPosition = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/LayoutPosition')
);
const FramerMotionLayoutAnimationsSharedLayoutAnimationDetails = dynamic(
  () =>
    import(
      './Widgets/FramerMotionLayoutAnimations/SharedLayoutAnimationDetails'
    )
);
const FramerMotionLayoutAnimationsListLayoutGroup = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/ListLayoutGroup')
);
const FramerMotionLayoutAnimationsTabsLayoutGroup = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/TabsLayoutGroup')
);
const FramerMotionAdvanceReorderExample = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/AdvanceReorderExample')
);
const FramerMotionToastNotificationSandpack = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/SandpackNotification')
);
const FramerMotionLayoutTabsSandpack = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/SandpackTabs')
);
const FramerMotionArrowListSandpack = dynamic(
  () => import('./Widgets/FramerMotionLayoutAnimations/SandpackArrowList')
);

const customComponents = {
  AnimationTypes,
  ClipboardAnimationDetails,
  HSLAShowcase,
  Orchestration,
  PaletteGenerator,
  ThemePicker,
  Card,
  CardBody: Card.Body,
  ScrollSpyWidget,
  HighlightSection,
  FramerMotionPropagation,
  FramerMotionAnimatePresence,
  FramerMotionAnimationLayout,
  CubicBezierVisualizer,
  BezierCurve,
  Callstack,

  FramerMotionLayoutAnimationsBasic,
  FramerMotionDistorsions,
  FramerMotionLayoutAnimationsLayoutProp,
  FramerMotionLayoutAnimationsLayoutPosition,
  FramerMotionLayoutAnimationsSharedLayoutAnimationDetails,
  FramerMotionLayoutAnimationsTabsLayoutGroup,
  FramerMotionLayoutAnimationsListLayoutGroup,
  FramerMotionAdvanceReorderExample,
  // Sandpacks
  FramerMotionToastNotificationSandpack,
  FramerMotionLayoutTabsSandpack,
  FramerMotionArrowListSandpack
};

const MDXComponents = {
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Anchor underline {...props} />
  ),
  Anchor,
  Button,
  blockquote: Blockquote,
  Callout,
  em: EM,
  h2: H2,
  h3: H3,
  Image,
  inlineCode: InlineCode,
  li: List.Item,
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <List variant="ordered" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <Text as="p" {...props} />
  ),
  Pill,
  pre: Code,
  strong: Strong,
  VideoPlayer,
  Tabs,
  ...customComponents
};

export default MDXComponents;
