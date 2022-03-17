import dynamic from 'next/dynamic';

// Components
import Anchor from '~/components/Anchor';
import Blockquote from '~/components/Blockquote';
import Button from '~/components/Button';
import Pre from '~/components/Code/Pre';
import Callout from '~/components/Callout';
import InlineCode from '~/components/InlineCode';
import List from '~/components/List';
import Card from '~/components/Card';
import Pill from '~/components/Pill';
import VideoPlayer from '~/components/VideoPlayer';
import Text, { EM, H2, H3, Strong } from '~/components/Typography';
import Tab from '~/components/Tab'

// MDX only components
import Image, { MdxImage } from './Image';

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
  image: MdxImage,
  inlinecode: InlineCode,
  li: List.Item,
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <List variant="ordered" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <Text as="p" {...props} />
  ),
  Pill,
  pre: Pre,
  strong: Strong,
  VideoPlayer,
Tab,
  ...customComponents
};

export default MDXComponents;
