import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

import { Shadows, styled } from '~/lib/stitches.config';

import {
  ContactIcon,
  EnterIcon,
  ExternalIcon,
  PortfolioIcon,
  RSSIcon,
  TwitterIcon,
  ArrowIcon,
  PlayIcon,
  PauseIcon,
  RepeatIcon,
  InfoIcon,
  AlertIcon,
  GithubIcon,
  MapIcon,
  StackIcon
} from '~/components/Icons';
import Anchor from '~/components/Anchor';
import Blockquote from '~/components/Blockquote';
import Box from '~/components/Box';
import Button from '~/components/Button';
import Callout from '~/components/Callout';
import Checkbox from '~/components/Checkbox';
import CodeBlock from '~/components/Code/CodeBlock';
import Flex from '~/components/Flex';
import Glow from '~/components/Glow';
import Grid from '~/components/Grid';
import InlineCode from '~/components/InlineCode';
import List from '~/components/List';
import Logo from '~/components/Logo';
import Pill from '~/components/Pill';
import Radio from '~/components/Radio';
import Range from '~/components/Range';
import SEO from '~/components/Seo';
import Switch from '~/components/Switch';
import TextInput from '~/components/TextInput';
import TextArea from '~/components/TextArea';
import Tooltip from '~/components/Tooltip';
import Tweet from '~/components/Tweet';
import Card, { Gradients } from '~/components/Card';
import Text, { EM, H1, H2, Heading, Strong } from '~/components/Typography';

import { useTheme } from '~/context/ThemeContext';

import Layout from '~/layout';

import { getTweets } from '~/lib/tweets';
import type { TransformedTweet } from '~/types/tweet';

const Sandpack = dynamic(() => import('~/components/Code/Sandpack'));
const Search = dynamic(() => import('~/components/Search'), {
  ssr: false
});

const WavingHandCode = `import { motion } from 'framer-motion';

const WavingHand = () => (
  <motion.div
    style={{
      marginBottom: '-20px',
      marginRight: '-45px',
      paddingBottom: '20px',
      paddingRight: '45px',
      display: 'inline-block',
    }}
    animate={{ rotate: 20 }}
    transition={{
      repeat: Infinity,
      repeatType: 'mirror',
      duration: 0.2,
      delay: 0.5,
      ease: 'easeInOut',
      type: 'tween',
    }}
  >
  👋
  </motion.div>
);

const Hi = () => (
  <h1>
    Hi <WavingHand /> !
  </h1>
);

export default Hi;
`;

const AppCode = `import WavingHand from './WavingHand';

export default function App() {
  return <WavingHand/>;
}
`;

/**
 * TODO:
 * - Decouple Search in 2 components => Overlay + Dialog and Command Center
 * - Rebuild/Rename Search component
 * - Define specific token for glass card background (foreground is not cutting it)
 * -> hsla(var(--palette-gray-03), 0.2) like code snippet background
 */

export default function Design({ tweets }: Record<string, TransformedTweet>) {
  const { dark } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [email, setEmail] = useState('');
  const [rangeValue, setRangeValue] = useState(250);

  const colorScaleNumbers = useMemo(
    () =>
      Array.from(Array(19).keys()).map((items) => {
        const num = (items + 1) * 5;
        if (num === 5) {
          return `0${num}`;
        }

        return num.toString();
      }),
    []
  );

  const palette = ['gray', 'blue', 'red', 'orange', 'green', 'pink', 'indigo'];

  return (
    <Layout footer headerProps={{ offsetHeight: 100 }}>
      <SEO title="Design Page" />
      <Grid
        columns="medium"
        gapX={4}
        gapY={10}
        all
        css={{ paddingTop: '64px' }}
      >
        <Box as="section">
          <H1 css={{ marginBottom: '0px' }}>Components / Design System</H1>
          <HR />
          <Flex justifyContent="space-between">
            <Pill variant="warning">Work In Progress</Pill>
            <Pill variant="info">v1.0</Pill>
          </Flex>
        </Box>
        <Box as="section">
          <H2>Name (WIP)</H2>
          <Text family="numeric" size="4">
            3X-DS (Explore, Expand, Experiment)
          </Text>
          <br />
          <Text size="2" variant="tertiary">
            A set of tools and components to build and write content
          </Text>
        </Box>
        <Box as="section" id="logo">
          <H2>Logo</H2>
          <Logo />
        </Box>
        <Box as="section" id="Colors">
          <H2>Colors</H2>
          <Grid gap={3}>
            Brand:
            <Tooltip id="brand" tooltipText="--brand">
              <Box
                as="section"
                css={{
                  size: '44px',
                  borderRadius: '$round',
                  background: 'var(--laodeaksar-colors-brand)',
                  border: '2px solid var(--laodeaksar-border-color)'
                }}
              />
            </Tooltip>
            Background:
            <Tooltip id="background" tooltipText="--background">
              <Box
                as="section"
                css={{
                  size: '44px',
                  borderRadius: '$round',
                  background: 'var(--laodeaksar-colors-background)',
                  border: '2px solid var(--laodeaksar-border-color)'
                }}
              />
            </Tooltip>
            Foreground:
            <Tooltip id="foreground" tooltipText="--foreground">
              <Box
                as="section"
                css={{
                  size: '44px',
                  borderRadius: '$round',
                  background: 'var(--laodeaksar-colors-foreground)',
                  border: '2px solid var(--laodeaksar-border-color)'
                }}
              />
            </Tooltip>
            Typeface:
            <Grid css={{ gridTemplateColumns: 'repeat(3, 44px)' }} gap={3}>
              <Tooltip id="typeface-primary" tooltipText="--typeface-primary">
                <Box
                  as="section"
                  css={{
                    size: '44px',
                    borderRadius: '$round',
                    background: 'var(--laodeaksar-colors-typeface-primary)',
                    border: '2px solid var(--laodeaksar-border-color)'
                  }}
                />
              </Tooltip>
              <Tooltip
                id="typeface-secondary"
                tooltipText="--typeface-secondary"
              >
                <Box
                  as="section"
                  css={{
                    size: '44px',
                    borderRadius: '$round',
                    background: 'var(--laodeaksar-colors-typeface-secondary)',
                    border: '2px solid var(--laodeaksar-border-color)'
                  }}
                />
              </Tooltip>
              <Tooltip id="typeface-tertiary" tooltipText="--typeface-tertiary">
                <Box
                  as="section"
                  css={{
                    size: '44px',
                    borderRadius: '$round',
                    background: 'var(--laodeaksar-colors-typeface-tertiary)',
                    border: '2px solid var(--laodeaksar-border-color)'
                  }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
        <Box as="section" id="Palette">
          <H2>Palette</H2>
          <Grid
            gap={6}
            css={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))'
            }}
          >
            {palette.map((paletteItem) => (
              <Grid
                key={paletteItem}
                css={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(2rem, 1fr))',
                  marginRight: '$3'
                }}
              >
                {colorScaleNumbers.map((shade) => (
                  <Tooltip
                    id={`${paletteItem}-${shade}`}
                    key={`${paletteItem}-${shade}`}
                    tooltipText={`--palette-${paletteItem}-${shade}`}
                  >
                    <Box
                      as="section"
                      css={{
                        size: '44px',
                        borderRadius: '$round',
                        background: `hsl(var(--palette-${paletteItem}-${shade}))`,
                        border: '2px solid var(--laodeaksar-border-color)'
                      }}
                    />
                  </Tooltip>
                ))}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box as="section" id="Cards">
          <h2>Card</h2>
          <Grid gapY={6} css={{ width: '100%' }}>
            <Gradients>
              <Box>
                <Box
                  as="p"
                  css={{
                    color: 'rgba(0, 0, 0, 0.4)',
                    fontSize: '32px',
                    marginBottom: '0px',
                    lineHeight: '1rem'
                  }}
                >
                  <Box
                    as="span"
                    css={{
                      marginLeft: '-8px',
                      color: 'rgba(0, 0, 0, 0.4)',
                      fontSize: '112px',
                      fontWeight: '$3'
                    }}
                  >
                    99
                  </Box>
                  %
                </Box>
                <Box
                  as="p"
                  css={{
                    color: 'rgba(0, 0, 0, 0.4)',
                    marginBottom: '0px'
                  }}
                >
                  Blood Oxygen
                </Box>
              </Box>
            </Gradients>

            <Card>
              <Card.Body>Base Card</Card.Body>
            </Card>

            <Card title="Title for the card">
              <Card.Body>
                Card with <InlineCode>title</InlineCode> prop
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>Some Custom Header</Card.Header>
              <Card.Body>Card With Custom Header</Card.Body>
            </Card>

            <Card>
              <Flex
                alignItems="center"
                justifyContent="center"
                css={{
                  padding: '$7'
                }}
              >
                Card With custom Body
              </Flex>
            </Card>
            <Card depth={0}>
              <Card.Body>
                Card <InlineCode>depth={0}</InlineCode>
              </Card.Body>
            </Card>
            <Card depth={1}>
              <Card.Body>
                Card <InlineCode>depth={1}</InlineCode>
              </Card.Body>
            </Card>
            <Card depth={2}>
              <Card.Body>
                Card <InlineCode>depth={2}</InlineCode>
              </Card.Body>
            </Card>

            <Card depth={3}>
              <Card.Body>
                Card <InlineCode>depth={3}</InlineCode>
              </Card.Body>
            </Card>
          </Grid>
        </Box>
        <Box as="section" id="typography">
          <H2>Typography</H2>
          <Label>Display</Label>
          <Text size="4">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Numeric (experimenting)</Label>
          <Text size="3" family="numeric">
            1 AU = 1,495978707x10<sup>11</sup> m
          </Text>
          <Label>Mono</Label>
          <Text size="3" family="mono">
            console.log(foobar)
          </Text>
          <br />
          <Label>H1</Label>
          <Heading as="h1" size="4">
            Almost before we knew it, we had left the ground.
          </Heading>
          <Label>H2</Label>
          <Heading as="h2" size="3">
            Almost before we knew it, we had left the ground.
          </Heading>
          <Label>H3</Label>
          <Heading as="h3" size="2">
            Almost before we knew it, we had left the ground.
          </Heading>
          <Label>H4</Label>
          <Heading as="h4" size="1">
            Almost before we knew it, we had left the ground.
          </Heading>
          <br />
          <Label>Text Size 7</Label>
          <Text as="p" size="7">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text Size 6</Label>
          <Text as="p" size="6">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text Size 5</Label>
          <Text as="p" size="5">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text Size 4</Label>
          <Text as="p" size="4">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text Size 3</Label>
          <Text as="p" size="3">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text Size 2</Label>
          <Text as="p" size="2">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text Size 1</Label>
          <Text as="p" size="1">
            Almost before we knew it, we had left the ground.
          </Text>
          <Label>Text gradient</Label>
          <Text
            as="p"
            size="3"
            gradient
            css={{
              linearGradient: `
                91.83deg, hsl(var(--palette-pink-50)) -20.26%, 
                hsl(var(--palette-blue-50)) 20.55%, 
                hsl(var(--palette-indigo-20)) 60.81%
              `
            }}
          >
            Almost before we knew it, we had left the ground.
          </Text>
          <br />
          <Label>Strong</Label>
          <Strong>Almost before we knew it, we had left the ground.</Strong>
          <Label>EM</Label>
          <EM>Almost before we knew it, we had left the ground.</EM>
          <Label>BigNum (WIP)</Label>
          <Text family="numeric" size="7" weight="4">
            1 AU = 1,495978707x10<sup>11</sup> m
          </Text>
          <Label>BigNum Outline (Experimenting)</Label>
          <Text
            family="numeric"
            size="7"
            weight="4"
            css={{
              color: 'transparent',
              WebkitTextStrokeColor: 'var(--laodeaksar-colors-brand)',
              WebkitTextStrokeWidth: '1px'
            }}
          >
            1 AU = 1,495978707x10<sup>11</sup> m
          </Text>
          <br />
          <Text
            family="numeric"
            size="7"
            weight="4"
            css={{
              color: 'transparent',
              WebkitTextStrokeColor: 'var(--laodeaksar-colors-danger)',
              WebkitTextStrokeWidth: '1px'
            }}
          >
            1 AU = 1,495978707x10<sup>11</sup> m
          </Text>
          <br />
        </Box>
        <Box as="section" id="icons">
          <H2>Icons</H2>
          <IconSection />
        </Box>
        <Box as="section" id="shadows">
          <H2>Shadows</H2>
          <Grid
            columns={2}
            gap={4}
            css={{
              padding: '$5 $3'
            }}
          >
            <Card depth={0}>
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 0
                </Text>
              </Card.Body>
            </Card>
            <Card depth={1}>
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 1
                </Text>
              </Card.Body>
            </Card>
            <Card depth={2}>
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 2
                </Text>
              </Card.Body>
            </Card>
            <Card depth={3}>
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 3
                </Text>
              </Card.Body>
            </Card>
          </Grid>
          <Grid
            columns={2}
            gap={4}
            css={{
              background: 'var(--laodeaksar-colors-emphasis)',
              padding: '$5 $3'
            }}
          >
            <Card
              css={{
                '$$shadow-color': dark ? '222deg 39% 5%' : '222deg 39% 80%'
              }}
              depth={0}
            >
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 0
                </Text>
              </Card.Body>
            </Card>
            <Card
              css={{
                '$$shadow-color': dark ? '222deg 39% 5%' : '222deg 39% 80%'
              }}
              depth={1}
            >
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 1
                </Text>
              </Card.Body>
            </Card>
            <Card
              css={{
                '$$shadow-color': dark ? '222deg 39% 5%' : '222deg 39% 80%'
              }}
              depth={2}
            >
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 2
                </Text>
              </Card.Body>
            </Card>
            <Card
              css={{
                '$$shadow-color': dark ? '222deg 39% 5%' : '222deg 39% 80%'
              }}
              depth={3}
            >
              <Card.Body>
                <Text size="2" variant="secondary">
                  Shadow 3
                </Text>
              </Card.Body>
            </Card>
          </Grid>
        </Box>
        <Box as="section" id="lists">
          <H2>Lists</H2>
          <Grid columns={2}>
            <List variant="unordered">
              <List.Item>
                <List variant="ordered">
                  <List.Item>First</List.Item>
                  <List.Item>Second</List.Item>
                  <List.Item>Third</List.Item>
                </List>
              </List.Item>
              <List.Item>
                <List variant="unordered">
                  <List.Item>First</List.Item>
                  <List.Item>Second</List.Item>
                  <List.Item>Third</List.Item>
                </List>
              </List.Item>
              <List.Item>Third</List.Item>
            </List>
          </Grid>
        </Box>
        <Box as="section" id="tooltip">
          <H2>Tooltip</H2>
          <Tooltip
            id="exampletooltip"
            tooltipText="@ode_aksar"
            tooltipVisuallyHiddenText="Follow Me on Twitter"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              css={{
                height: '50px',
                width: '150px',
                padding: '$2'
              }}
              aria-describedby="exampletooltip"
            >
              <TwitterIcon stroke="var(--laodeaksar-colors-typeface-tertiary)" />{' '}
              Hover Me!
            </Flex>
          </Tooltip>
        </Box>
        <Box as="section" id="pill">
          <H2>Pill</H2>
          <Grid gapY={5}>
            <Box>
              <Pill variant="info">Info Pill</Pill>
            </Box>
            <Box>
              <Pill variant="success">Success Pill</Pill>
            </Box>
            <Box>
              <Pill variant="warning">Warning Pill</Pill>
            </Box>
            <Box>
              <Pill variant="danger">Danger Pill</Pill>
            </Box>
          </Grid>
        </Box>
        <Box as="section" id="new-button">
          <H2>Buttons</H2>
          <Grid gap={5}>
            <Button variant="primary">Primary</Button>
            <Glow>
              <Button variant="primary">Glow Primary</Button>
            </Glow>
            <Button variant="primary" startIcon={<TwitterIcon />}>
              Follow me!
            </Button>
            <Button variant="primary" endIcon={<ExternalIcon />}>
              Portfolio
            </Button>
            <Button variant="primary" disabled>
              Primary Disabled
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary" startIcon={<TwitterIcon />}>
              Follow me!
            </Button>
            <Button variant="secondary" endIcon={<ExternalIcon />}>
              Portfolio
            </Button>
            <Button variant="secondary" disabled>
              Secondary Disabled
            </Button>
            <div>
              <Label>Icon Button</Label>
              <Button
                aria-label="Follow me on Twitter"
                variant="icon"
                icon={<TwitterIcon />}
              />
              <Button
                aria-label="Follow me on Twitter"
                disabled
                variant="icon"
                icon={<TwitterIcon />}
              />
            </div>
          </Grid>
        </Box>
        <Box as="section" id="anchor">
          <H2>Anchor</H2>
          <Grid gap={1}>
            <h3>
              <Anchor href="https://twitter.com/ode_aksar" favicon>
                @ode_aksar
              </Anchor>
            </h3>
            <p>
              <Anchor href="https://twitter.com/ode_aksar" discreet favicon>
                @ode_aksar
              </Anchor>
            </p>
            <h3>
              <Anchor href="https://github.com/laodeaksar" favicon>
                Github
              </Anchor>
            </h3>
            <p>
              <Anchor href="https://github.com/laodeaksar" discreet favicon>
                Github
              </Anchor>
            </p>
            <h3>
              <Anchor href="/" arrow="left">
                Back
              </Anchor>
            </h3>
            <h3>
              <Anchor href="https://twitter.com/ode_aksar" arrow="right">
                Twitter
              </Anchor>
            </h3>
            <p>
              <Anchor
                href="https://github.com/laodeaksar/laodeaksar.eu.org"
                arrow="right"
                discreet
              >
                Check out this repo
              </Anchor>
            </p>
          </Grid>
          <Grid>
            <h1>
              Some text then a link to my Twitter account{' '}
              <Anchor discreet favicon href="https://twitter.com/ode_aksar">
                @ode_aksar
              </Anchor>{' '}
              then the rest of the sentence
            </h1>
            <p>
              Some text then a link to my Twitter account{' '}
              <Anchor discreet favicon href="https://twitter.com/ode_aksar">
                @ode_aksar
              </Anchor>{' '}
              then the rest of the sentence
            </p>
            <h2>
              Over the past few months, I have been working a lot on{' '}
              <Anchor href="/design" underline>
                Design System
              </Anchor>{' '}
              and one aspect of this work that I enjoyed focusing on is{' '}
              <strong>micro-interactions</strong>.
            </h2>
            <h3>
              Over the past few months, I have been working a lot on my{' '}
              <Anchor href="/design" underline>
                Design System
              </Anchor>{' '}
              and one aspect of this work that I enjoyed focusing on is{' '}
              <strong>micro-interactions</strong>.
            </h3>
            <p>
              Over the past few months, I have been working a lot on my{' '}
              <Anchor discreet href="/design" underline>
                Design System
              </Anchor>{' '}
              and one aspect of this work that I enjoyed focusing on is{' '}
              <strong>micro-interactions</strong>.
            </p>
          </Grid>
        </Box>
        <Box as="section" id="form-components">
          <H2>Form Components</H2>
          <Flex gap={2}>
            <TextInput
              aria-label="Email"
              id="subscribe"
              type="email"
              placeholder="me@laodeaksar.eu.org"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
            />
            <Button variant="primary" glow>
              Subscribe
            </Button>
          </Flex>
          <br />
          <Grid
            gap={5}
            css={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
            }}
          >
            <TextInput
              label="Name"
              aria-label="Name"
              id="name-input"
              placeholder="Name"
              onChange={() => {}}
            />
            <TextInput
              label="Name"
              aria-label="Name"
              id="name-input-disabled"
              placeholder="Name"
              disabled
              onChange={() => {}}
              value="Aksar La'ode"
            />
            <TextInput
              aria-label="Email"
              id="email-input"
              type="email"
              placeholder="me@laodeaksar.eu.org"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value={email}
              autoComplete="off"
            />
            <TextInput
              aria-label="Email"
              id="email-input-disabled"
              type="email"
              disabled
              placeholder="me@laodeaksar.eu.org"
              onChange={(e) => setEmail(e.currentTarget.value)}
              value="me@laodeaksar.eu.org"
            />
            <TextInput
              aria-label="Password"
              id="password-input"
              type="password"
              placeholder="Password"
              onChange={() => {}}
            />
            <TextInput
              aria-label="Password"
              id="password-input-disabled"
              type="password"
              placeholder="Password"
              disabled
              onChange={() => {}}
              value="supersecretpassword"
            />
            <TextArea
              aria-label="Example"
              id="example-text-1"
              label="Example Text"
              onChange={() => {}}
              placeholder="Type some text here"
              resize="none"
            />
            <TextArea
              aria-label="Example"
              disabled
              id="example-text-2"
              label="Example"
              onChange={() => {}}
              placeholder="Type some text here"
              resize="none"
              value={`Here's to the crazy ones.
The misfits.
The rebels.
The troublemakers.
The round pegs in the square holes.

The ones who see things differently.

They're not fond of rules.
And they have no respect for the status quo.

You can quote them, disagree with them,
glorify or vilify them.
about the only thing you can't do is ignore them.

Because they change things.

They push the human race forward.

While some may see them as the crazy ones,
we see genius.

Because the people who are crazy enough to think
they can change the world, are the ones who do.`}
            />
          </Grid>
          <br />
          <Grid
            gap={3}
            css={{ gridTemplateColumns: 'repeat(2, minmax(2rem, 1fr))' }}
          >
            <Checkbox aria-label="Checkbox" id="checkbox1" label="Checkbox" />
            <Checkbox
              aria-label="Checkbox"
              id="checkbox3"
              label="Checkbox"
              disabled
            />
            <Checkbox
              aria-label="Checkbox"
              id="checkbox2"
              label="Checkbox"
              onChange={() => {}}
              checked
            />
            <Checkbox
              aria-label="Checkbox"
              id="checkbox4"
              label="Checkbox"
              onChange={() => {}}
              checked
              disabled
            />
          </Grid>
          <br />
          <Grid
            gap={3}
            css={{ gridTemplateColumns: 'repeat(2, minmax(2rem, 1fr))' }}
          >
            <Switch aria-label="Switch" id="switch1" label="Switch" />
            <Switch aria-label="Switch" id="switch2" label="Switch" disabled />
            <Switch
              aria-label="Switch"
              id="switch3"
              label="Switch"
              onChange={() => {}}
              toggled
            />
            <Switch
              aria-label="Switch"
              id="switch4"
              label="Switch"
              onChange={() => {}}
              toggled
              disabled
            />
          </Grid>
          <br />
          <Grid
            gap={3}
            css={{ gridTemplateColumns: 'repeat(2, minmax(2rem, 1fr))' }}
          >
            <Radio.Group
              name="options"
              direction="vertical"
              onChange={() => {}}
            >
              <Radio.Item
                id="option-1"
                value="option1"
                aria-label="Option 1"
                label="Option 1"
              />
              <Radio.Item
                id="option-2"
                value="option2"
                aria-label="Option 2"
                label="Option 2"
                checked
              />
            </Radio.Group>
            <Radio.Group
              name="options-disabled"
              direction="vertical"
              onChange={() => {}}
            >
              <Radio.Item
                id="option-3"
                value="option3"
                aria-label="Option 3"
                label="Option 3"
                disabled
              />
              <Radio.Item
                id="option-4"
                value="option4"
                aria-label="Option 4"
                label="Option 4"
                disabled
                checked
              />
            </Radio.Group>
            <Radio.Group
              name="options-horizontal"
              direction="horizontal"
              onChange={() => {}}
            >
              <Radio.Item
                id="option-5"
                value="option5"
                aria-label="Option 5"
                label="Option 5"
              />
              <Radio.Item
                id="option-6"
                value="option6"
                aria-label="Option 6"
                label="Option 6"
                checked
              />
            </Radio.Group>
          </Grid>
          <br />
          <Grid
            gap={3}
            css={{ gridTemplateColumns: 'repeat(2, minmax(2rem, 1fr))' }}
          >
            <Range
              id="range-1"
              aria-label="Range"
              label="Range"
              value={rangeValue}
              min={0}
              max={500}
              onChange={(value) => setRangeValue(value)}
            />
            <Range
              id="range-2"
              aria-label="Range"
              label="Range"
              value={250}
              min={0}
              max={500}
              onChange={() => {}}
              disabled
            />
          </Grid>
        </Box>
        <Box as="section" id="callout">
          <H2>Callout</H2>
          <Grid gapY={5}>
            <Callout variant="info">Info Callout</Callout>
            <Callout label="Learn more" variant="info">
              Info Callout
            </Callout>
            <Callout variant="danger">Danger Callout</Callout>
            <Callout label="Be careful!" variant="danger">
              Danger Callout
            </Callout>
          </Grid>
        </Box>
        <Box as="section" id="blockquote">
          <Blockquote>
              Almost before we knew it, we had left the ground.
            <cite>~test</cite>
          </Blockquote>
        </Box>
        <Box as="section" id="inline-code">
          <H2>Inline Code</H2>
          <InlineCode>{"const foo= () => 'bar'"}</InlineCode>
        </Box>
        <Box as="section" id="code-block">
          <H2>Code Block</H2>
          <Label>Basic</Label>
          <CodeBlock
            metastring=""
            language="javascript"
            codeString={`console.log("hello world")
/**
 * Some comments
 */
function sayHi(name) {
  var message = \`hi \${name}\`
  return message;
}`}
          />
          <Label>With title and highlighting</Label>
          <CodeBlock
            metastring="{6-8} title=Code snippet title"
            language="javascript"
            codeString={`console.log("hello world")
/**
 * Some comments
 */
function sayHi(name) {
  var message = \`hi \${name}\`
  return message;
}`}
          />
          <Label>Sandpack Code Block</Label>
          <Sandpack
            template="react"
            dependencies={{
              'framer-motion': '5.2.1'
            }}
            files={{
              '/App.js': {
                code: AppCode
              },
              '/WavingHand.js': {
                code: WavingHandCode
              },
              '/styles.css': {
                code: `
                  body: {
                    color: var(--laodeaksar-colors-brand);
                  }
                `
              }
            }}
          />
        </Box>
        <Box as="section" id="command-center">
          <H2>Command Center / Search </H2>
          <Button variant="primary" onClick={() => setShowSearch(true)}>
            Show Command Center
          </Button>
          <AnimatePresence>
            {showSearch && <Search onClose={() => setShowSearch(false)} />}
          </AnimatePresence>
        </Box>
        <Box as="section" id="tweet">
          <H2>Tweet</H2>
          {tweets.map((tweet: TransformedTweet) => (
            <Tweet key={tweet.id} {...{ tweet }} />
          ))}
        </Box>
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  const tweets = await getTweets(['1386013361809281024']);

  return { props: { tweets } };
}

const HR = styled('hr', {
  height: '2px',
  width: '$full',
  background: 'hsl(var(--palette-gray-20))',
  border: 'none',
  marginBottom: '16px'
});

const Label = styled('p', {
  marginBottom: '8px'
});

const IconSection = () => (
  <Flex direction="column" gap={8} alignItems="stretch" css={{ width: '100%' }}>
    <Grid flow="column" gap={4}>
      <TwitterIcon variant="info" size={5} />
      <TwitterIcon variant="danger" size={5} />
      <TwitterIcon variant="success" size={5} />
      <TwitterIcon variant="warning" size={5} />
      <TwitterIcon variant="primary" size={5} />
      <TwitterIcon variant="secondary" size={5} />
      <TwitterIcon variant="tertiary" size={5} />
    </Grid>
    <Box
      css={{
        color: 'hsl(var(--palette-pink-50))',

        svg: {
          strokeWidth: '1',
          fill: 'hsla(var(--palette-pink-50), 50%) !important'
        }
      }}
    >
      <TwitterIcon />
    </Box>
    <Grid gapY={4} columns={5} flow="row" align="center">
      <TwitterIcon variant="default" size={7} />
      <TwitterIcon variant="default" size={6} />
      <TwitterIcon variant="default" size={5} />
      <TwitterIcon variant="default" size={4} />
      <TwitterIcon variant="default" size={3} />
      <GithubIcon variant="default" size={7} />
      <GithubIcon variant="default" size={6} />
      <GithubIcon variant="default" size={5} />
      <GithubIcon variant="default" size={4} />
      <GithubIcon variant="default" size={3} />
      <ContactIcon variant="default" size={7} />
      <ContactIcon variant="default" size={6} />
      <ContactIcon variant="default" size={5} />
      <ContactIcon variant="default" size={4} />
      <ContactIcon variant="default" size={3} />
      <MapIcon variant="default" size={7} />
      <MapIcon variant="default" size={6} />
      <MapIcon variant="default" size={5} />
      <MapIcon variant="default" size={4} />
      <MapIcon variant="default" size={3} />
      <ExternalIcon variant="default" size={7} />
      <ExternalIcon variant="default" size={6} />
      <ExternalIcon variant="default" size={5} />
      <ExternalIcon variant="default" size={4} />
      <ExternalIcon variant="default" size={3} />
      <RSSIcon variant="default" size={7} />
      <RSSIcon variant="default" size={6} />
      <RSSIcon variant="default" size={5} />
      <RSSIcon variant="default" size={4} />
      <RSSIcon variant="default" size={3} />
      <EnterIcon variant="default" size={7} />
      <EnterIcon variant="default" size={6} />
      <EnterIcon variant="default" size={5} />
      <EnterIcon variant="default" size={4} />
      <EnterIcon variant="default" size={3} />
      <ArrowIcon variant="default" size={7} />
      <ArrowIcon variant="default" size={6} />
      <ArrowIcon variant="default" size={5} />
      <ArrowIcon variant="default" size={4} />
      <ArrowIcon variant="default" size={3} />
      <PortfolioIcon variant="default" size={7} />
      <PortfolioIcon variant="default" size={6} />
      <PortfolioIcon variant="default" size={5} />
      <PortfolioIcon variant="default" size={4} />
      <PortfolioIcon variant="default" size={3} />
      <PlayIcon variant="default" size={7} />
      <PlayIcon variant="default" size={6} />
      <PlayIcon variant="default" size={5} />
      <PlayIcon variant="default" size={4} />
      <PlayIcon variant="default" size={3} />
      <PauseIcon variant="default" size={7} />
      <PauseIcon variant="default" size={6} />
      <PauseIcon variant="default" size={5} />
      <PauseIcon variant="default" size={4} />
      <PauseIcon variant="default" size={3} />
      <RepeatIcon variant="default" size={7} />
      <RepeatIcon variant="default" size={6} />
      <RepeatIcon variant="default" size={5} />
      <RepeatIcon variant="default" size={4} />
      <RepeatIcon variant="default" size={3} />
      <InfoIcon variant="default" size={7} />
      <InfoIcon variant="default" size={6} />
      <InfoIcon variant="default" size={5} />
      <InfoIcon variant="default" size={4} />
      <InfoIcon variant="default" size={3} />
      <AlertIcon variant="default" size={7} />
      <AlertIcon variant="default" size={6} />
      <AlertIcon variant="default" size={5} />
      <AlertIcon variant="default" size={4} />
      <AlertIcon variant="default" size={3} />
      <StackIcon variant="default" size={7} />
      <StackIcon variant="default" size={6} />
      <StackIcon variant="default" size={5} />
      <StackIcon variant="default" size={4} />
      <StackIcon variant="default" size={3} />
    </Grid>
  </Flex>
);
