import { css } from '~/lib/stitches.config';

export const styles = {
  controlStyle: css({
    position: 'relative'
  })(),
  tipStyle: css({
    color: 'hsla(var(--palette-gray-00))',
    background: 'hsla(var(--palette-gray-75))',
    borderRadius: '$0',
    position: 'absolute',
    bottom: '-60%',
    fontWeight: '$3',
    fontSize: '$2',
    display: 'flex',
    padding: '4px 10px',
    zIndex: 5,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    userSelect: 'none'
  })()
};
