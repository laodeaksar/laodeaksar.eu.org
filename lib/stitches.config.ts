import type { PropertyValue } from '@stitches/react';
import { createStitches, CSS as StitchesCSS } from '@stitches/react';
import { Prefixed } from '@stitches/react/types/util';

export const Shadows = {
  0: 'none',
  1: `
    0.5px 1px 1px hsl($$shadow-color / 0.333)
  `,
  2: `
    1px 2px 2px hsl($$shadow-color / 0.333)
    2px 4px 4px hsl($$shadow-color / 0.333)
    3px 6px 6px hsl($$shadow-color / 0.333)
  `,
  3: `
    1px 2px 2px hsl($$shadow-color / 0.2)
    2px 4px 4px hsl($$shadow-color / 0.2)
    4px 8px 8px hsl($$shadow-color / 0.2)
    8px 16px 16px hsl($$shadow-color / 0.2)
    16px 32px 32px hsl($$shadow-color / 0.2)
  `
};

const spaces = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '40px',
  8: '48px',
  9: '56px',
  10: '64px',
  11: '80px',
  12: '96px',
  13: '128px',
  14: '256px',
  15: '512px'
};

const { styled, css, theme, getCssText, keyframes, config,reset } = createStitches({
  theme: {
    fonts: {
      default: 'inherit',
      display:
        'IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      mono: 'Iosevka, menlo, monospace',
      numeric: 'IBM Plex Sans'
    },
    space: {
      ...spaces,
      auto: 'auto'
    },
    sizes: {
      ...spaces,
      full: '100%',
      ws: '100vw',
      hs: '100vh',
      max: 'max-content',
      min: 'min-content'
    },
    fontSizes: {
      1: '14px',
      2: '0.875rem',
      3: '1rem',
      4: '1.125rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '2rem'
    },
    lineHeights: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    },
    radii: {
      0: '4px',
      1: '8px',
      2: '12px',
      round: '50%',
      pill: '9999px'
    },
    zIndices: {
      1: '100',
      2: '200',
      3: '300',
      4: '400',
      max: '999'
    },
    fontWeights: {
      1: '300',
      2: '400',
      3: '500',
      4: '600'
    }
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    motion: '(prefers-reduced-motion)',
    hover: '(hover: hover) and (pointer: fine)',
    dark: '(prefers-color-scheme: dark)',
    light: '(prefers-color-scheme: light)'
  },
  utils: {
    pt: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value
    }),
    pr: (value: PropertyValue<'paddingRight'>) => ({
      paddingRight: value
    }),
    pb: (value: PropertyValue<'paddingBottom'>) => ({
      paddingBottom: value
    }),
    pl: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value
    }),
    px: (value: PropertyValue<'paddingLeft'>) => ({
      paddingLeft: value,
      paddingRight: value
    }),
    py: (value: PropertyValue<'paddingTop'>) => ({
      paddingTop: value,
      paddingBottom: value
    }),

    mt: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value
    }),
    mr: (value: PropertyValue<'marginRight'>) => ({
      marginRight: value
    }),
    mb: (value: PropertyValue<'marginBottom'>) => ({
      marginBottom: value
    }),
    ml: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value
    }),
    mx: (value: PropertyValue<'marginLeft'>) => ({
      marginLeft: value,
      marginRight: value
    }),
    my: (value: PropertyValue<'marginTop'>) => ({
      marginTop: value,
      marginBottom: value
    }),

    bc: (value: PropertyValue<'backgroundColor'>) => ({
      backgroundColor: value
    }),
    linearGradient: (value: PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `linear-gradient(${value})`
    }),
    radialGradient: (value: PropertyValue<'backgroundImage'>) => ({
      backgroundImage: `radial-gradient(${value})`
    }),

    btrr: (value: PropertyValue<'borderTopRightRadius'>) => ({
      borderTopRightRadius: value
    }),
    bbrr: (value: PropertyValue<'borderBottomRightRadius'>) => ({
      borderBottomRightRadius: value
    }),
    bblr: (value: PropertyValue<'borderBottomLeftRadius'>) => ({
      borderBottomLeftRadius: value
    }),
    btlr: (value: PropertyValue<'borderTopLeftRadius'>) => ({
      borderTopLeftRadius: value
    }),
    btr: (value: PropertyValue<'borderRadius'>) => ({
      borderTopLeftRadius: value,
      borderTopRightRadius: value
    }),
    brr: (value: PropertyValue<'borderRadius'>) => ({
      borderTopRightRadius: value,
      borderBottomRightRadius: value
    }),
    bbr: (value: PropertyValue<'borderRadius'>) => ({
      borderBottomRightRadius: value,
      borderBottomLeftRadius: value
    }),
    blr: (value: PropertyValue<'borderRadius'>) => ({
      borderTopLeftRadius: value,
      borderBottomLeftRadius: value
    }),

    insetX: (value: PropertyValue<'left'>) => ({
      left: value,
      right: value
    }),
    insetY: (value: PropertyValue<'top'>) => ({
      top: value,
      bottom: value
    }),

    userSelect: (value: PropertyValue<'userSelect'>) => ({
      WebkitUserSelect: value,
      MozUserSelect: value,
      MsUserSelect: value,
      userSelect: value
    }),

    size: (value: PropertyValue<'width'>) => ({
      width: value,
      height: value
    }),

    appearance: (value: PropertyValue<'appearance'>) => ({
      WebkitAppearance: value,
      MozAppearance: 'none',
      appearance: value
    }),
    backgroundClip: (value: PropertyValue<'backgroundClip'>) => ({
      WebkitBackgroundClip: value,
      backgroundClip: value
    })
  }
});

export type CSS = StitchesCSS<typeof config>;
export type { VariantProps } from '@stitches/react';
export { config, css, getCssText, keyframes, styled, theme };

export const getVariant = <
  K extends keyof typeof config.theme,
  T extends keyof typeof config.theme[K],
  P extends Prefixed<'$', T>,
  R extends Record<T, CSS>
>(
  prop: K,
  map: (tokenValue: P) => CSS
): R => {
  const values = Object.keys(config.theme[prop]) as T[];
  return values.reduce<R>(
    (acc, tokenValue) => ({ ...acc, [tokenValue]: map(`$${String(tokenValue)}` as P) }),
    {} as R
  );
};
