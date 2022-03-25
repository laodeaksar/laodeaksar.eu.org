import { styled } from '~/lib/stitches.config';

export const StyledAnchor = styled('a', {
  $$color: 'var(--laodeaksar-colors-brand)',

  fontSize: 'inherit',
  lineHeight: 'inherit',
  color: '$$color',
  fontWeight: '$3',
  wordBreak: 'break-word',
  outline: 'none',
  transition: 'border-color 0.3s ease, color 0.3s ease',

  '--hover-color': 'var(--laodeaksar-colors-typeface-primary)',

  '&:focus': {
    $$color: 'var(--hover-color, var(--laodeaksar-colors-brand))',
    '--hover-translation-distance': 'var(--arrow-translation, 0)'
  },

  '@hover': {
    '&:hover': {
      $$color: 'var(--hover-color, var(--laodeaksar-colors-brand))',
      '--hover-translation-distance': 'var(--arrow-translation, 0)'
    }
  },

  variants: {
    discreet: {
      true: {
        $$color: 'var(--laodeaksar-colors-typeface-tertiary)'
      }
    },
    arrow: {
      left: {
        '--size': '1.1em',
        '--arrow-direction': -1,
        '--arrow-translation': '-0.25em',
        '--hover-color': 'unset',

        '&:before': {
          content: '""',
          display: 'inline-block',
          verticalAlign: 'middle',
          size: 'var(--size, 1.05em)',
          maskImage: 'var(--icon)',
          WebkitMaskRepeat: 'no-repeat',
          bc: 'currentColor',
          marginRight: '0.18em',
          transition: 'transform 0.4s ease',
          transform:
            'translateY(-1px) translateX(var(--hover-translation-distance, 0px)) scaleX(var(--arrow-direction, 1))'
        }
      },
      right: {
        '--size': '1.1em',
        '--arrow-translation': '0.25em',
        '--arrow-direction': 1,
        '--hover-color': 'unset',

        '&:after': {
          content: '""',
          display: 'inline-block',
          verticalAlign: 'middle',
          size: 'var(--size, 1.05em)',
          maskImage: 'var(--icon)',
          WebkitMaskRepeat: 'no-repeat',
          bc: 'currentColor',
          marginLeft: '0.18em',
          transition: 'transform 0.4s ease',
          transform:
            'translateY(-2px) translateX(var(--hover-translation-distance, 0px)) scaleX(var(--arrow-direction, 1))'
        }
      }
    },

    favicon: {
      true: {
        '--size': '1.1em',

        '&:before': {
          content: '""',
          display: 'inline-block',
          verticalAlign: 'middle',
          size: 'var(--size, 1.05em)',
          maskImage: 'var(--icon)',
          WebkitMaskRepeat: 'no-repeat',
          bc: 'currentColor',
          marginRight: '0.18em',
          transform: 'translateY(-2px)'
        }
      }
    },

    underline: {
      true: {
        borderBottom: '2px solid',
        borderColor: 'var(--border-color, transparent)',

        '--hover-color': 'unset',

        '&:focus': {
          '--border-color': 'hsl(var(--palette-blue-40))'
        },

        '@hover': {
          '&:hover': {
            '--border-color': 'hsl(var(--palette-blue-40))'
          }
        }
      }
    },
    tags: {
      true: {
        '--size': '1.1em',

        '&:before': {
          content: '""',
          display: 'inline-block',
          verticalAlign: 'middle',
          size: 'var(--size, 1.05em)',
          maskImage: 'var(--icon)',
          WebkitMaskRepeat: 'no-repeat',
          bc: 'currentColor',
          marginRight: '0.18em',
          transform: 'translateY(-2px)'
        }
      }
    }
  }
});
