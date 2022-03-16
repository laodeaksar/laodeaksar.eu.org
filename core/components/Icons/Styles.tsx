import { getVariant, styled, VariantProps } from '~/lib/stitches.config';

export const StyledSVG = styled('svg', {
  variants: {
    variant: {
      default: { stroke: 'currentColor', fill: 'none' },
      primary: {
        stroke: 'var(--laodeaksar-colors-typeface-primary)',
        fill: 'none'
      },
      secondary: {
        stroke: 'var(--laodeaksar-colors-typeface-secondary)',
        fill: 'none'
      },
      tertiary: {
        stroke: 'var(--laodeaksar-colors-typeface-tertiary)',
        fill: 'none'
      },
      info: {
        stroke: 'var(--laodeaksar-colors-brand)',
        fill: 'var(--laodeaksar-colors-emphasis)'
      },
      danger: {
        stroke: 'var(--laodeaksar-colors-danger)',
        fill: 'var(--laodeaksar-colors-danger-emphasis)'
      },
      success: {
        stroke: 'var(--laodeaksar-colors-success)',
        fill: 'var(--laodeaksar-colors-success-emphasis)'
      },
      warning: {
        stroke: 'var(--laodeaksar-colors-warning)',
        fill: 'var(--laodeaksar-colors-warning-emphasis)'
      },
      none: {}
    },
    outline: {
      true: {
        fill: 'none !important'
      }
    },
    size: getVariant('sizes', (token) => ({ size: token }))
  },
  defaultVariants: {
    variant: 'default',
    outline: true,
    size: 5
  }
});

export type IconSize = VariantProps<typeof StyledSVG>['size'];
export type IconVariant = VariantProps<typeof StyledSVG>['variant'];
