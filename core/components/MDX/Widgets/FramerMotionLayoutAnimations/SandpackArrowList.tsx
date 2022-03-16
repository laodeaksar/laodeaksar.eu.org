import Sandpack from '~/components/Code/Sandpack';

const ComponentCode = `import { styled } from '@stitches/react';

export const List = styled('ul', {
  display: 'flex',
  gap: '12px',
  padding: 0
})

export const Item = styled('li', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  cursor: 'pointer',
  color: '#98a0b3',
  userSelect: 'none'
})

export const ArrowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    {...props}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
`;

const AppCode = `import { motion } from 'framer-motion';
import React from 'react';
import { List, Item, ArrowIcon } from './Components';

const ITEMS = [1, 2, 3];

const SelectableList = () => {
  const [selected, setSelected] = React.useState(1);

  return (
    <List>
      {ITEMS.map((item) => (
        <Item
          onClick={() => setSelected(item)}
          onLeyDown={(event: { key: string }) => event.key === 'Enter' ? setSelected(item) : null}
          tabIndex={0}
        >
          <div>Item {item}</div>
          {item === selected ? (
            <motion.div layoutId="arrow">
              <ArrowIcon
                style={{
                  height: '24px',
                  color: '#5686f5',
                  transform: 'rotate(-90deg)'
                }}
              />
            </motion.div>
          ) : null }
        </Item>
      ))}
    </List>
  )
}

export default SelectableList;
`;

const SandpackArrowList = () => (
  <Sandpack
    template="react"
    dependencies={{
      'framer-motion': '6.2.4',
      '@stitches/react': '1.2.5'
    }}
    files={{
      '/app.js': {
        code: AppCode
      },
      '/Components.js': {
        code: ComponentCode
      }
    }}
  />
);

export default SandpackArrowList;
