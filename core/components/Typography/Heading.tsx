import { forwardRef } from 'react';
import { merge } from 'lodash';

import { CSS } from '~/lib/stitches.config';

import Text from './Text';
import { DEFAULT_TAG } from './constant';
import {
  HeadingProps,
  HeadingSizeVariants,
  ShortHandHeadingProps,
  TextSizeVariants
} from './types';

const Heading = forwardRef<React.ElementRef<typeof DEFAULT_TAG>, HeadingProps>(
  (props, ref) => {
    const { size = '1', ...rest } = props;

    const headingSize: Record<HeadingSizeVariants, TextSizeVariants['size']> = {
      1: { '@initial': '4' },
      2: { '@initial': '5' },
      3: { '@initial': '6' },
      4: { '@initial': '7' }
    };

    const headingCSS: Record<HeadingSizeVariants, CSS> = {
      1: {
        fontWeight: '$4',
        lineHeight: '1.6818',
        letterSpacing: '0px',
        marginBottom: '1.45rem'
      },
      2: {
        fontWeight: '$4',
        lineHeight: '1.6818',
        letterSpacing: '0px',
        marginBottom: '1.45rem'
      },
      3: {
        fontWeight: '$4',
        lineHeight: '1.6818',
        letterSpacing: '0px',
        marginBottom: '1.45rem'
      },
      4: {
        fontWeight: '$4',
        lineHeight: '1.6818',
        letterSpacing: '0px',
        marginBottom: '1.45rem'
      }
    };

    return (
      <Text
        as={DEFAULT_TAG}
        {...rest}
        ref={ref}
        size={headingSize[size]}
        css={{
          ...merge(headingCSS[size], props.css)
        }}
      />
    );
  }
);

export const H1 = forwardRef<React.ElementRef<'h1'>, ShortHandHeadingProps>(
  (props, ref) => (
    <Heading
      {...props}
      ref={ref}
      as="h1"
      size="4"
      spaced={false}
      variant="primary"
    />
  )
);

H1.displayName = 'H1';

export const H2 = forwardRef<React.ElementRef<'h2'>, ShortHandHeadingProps>(
  (props, ref) => (
    <Heading
      {...props}
      ref={ref}
      as="h2"
      size="3"
      spaced={false}
      variant="primary"
    />
  )
);

H2.displayName = 'H2';

export const H3 = forwardRef<React.ElementRef<'h3'>, ShortHandHeadingProps>(
  (props, ref) => (
    <Heading
      {...props}
      ref={ref}
      as="h3"
      size="2"
      spaced={false}
      variant="primary"
    />
  )
);

H3.displayName = 'H3';

export const H4 = forwardRef<React.ElementRef<'h4'>, ShortHandHeadingProps>(
  (props, ref) => (
    <Heading
      {...props}
      ref={ref}
      as="h4"
      size="1"
      spaced={false}
      variant="primary"
    />
  )
);

H4.displayName = 'H4';

Heading.displayName = 'Heading';

export default Heading;
