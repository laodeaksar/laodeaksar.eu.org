import type { Props } from './types';

const VisuallyHidden = ({ as: Component, ...props }: Props) => (
  <Component
    {...props}
    style={{
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: '0'
    }}
  >
    {props.children}
  </Component>
);

export default VisuallyHidden;
