import Sandpack from '~/components/Code/Sandpack';

const AppCode = `import { motion } from "framer-motion";
import React from "react";
import { Wrapper, Tab } from "./Components";

const Tabs = () => {
  const [focused, setFocused] = React.useState(null);
  const [selected, setSelected] = React.useState('Item 1');

  const tabs = ['Item 1', 'Item 2', 'Item 3'];

  return (
    <Wrapper onMouseLeave={() => setFocused(null)}>
      {tabs.map((item) => (
        <Tab
          key={item}
          onClick={() => setSelected(item)}
          onKeyDown={(event: { key: string }) =>
            event.key === 'Enter' ? setSelected(item) : null
          }
          onFocus={() => setFocused(item)}
          onMouseEnter={() => setFocused(item)}
          tabIndex={0}
        >
          <span>{item}</span>
            {focused === item && (
              <motion.div
                transition={{
                  layout: {
                    duration: 0.2,
                    ease: 'easeOut',
                  }
                }}
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '-10px',
                  right: 0,
                  width: '140%',
                  height: '110%',
                  background: '#23272f',
                  borderRadius: '8px',
                  zIndex: 0
                }}
                layoutId="highlight"
              />
            ) }
            {selected === item && (
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '-10px',
                  left: '0px',
                  right: 0,
                  height: '4px',
                  background: '#5686f5',
                  borderRadius: '8px',
                  zIndex: 0
                }}
                layoutId="underline"
              />
            ) }
        </Tab>
      ))}
    </Wrapper>
  )
}

export default Tabs;
`;

const ComponentsCode = `import { styled } from "@stitches/react";

export const Wrapper = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 16px',
  background: '#1a1d23',
  borderRadius: '8px',
  border: '1px solid #2b303b',
  width: 'fit-content',
  gap: '32px'
})

export const Tab = styled('li', {
  position: 'relative',
  listStyle: 'none',
  width: '50px',
  height: '30px',
  outline: 'none',

  span: {
    position: 'absolute',
    left: '4px',
    right: 0,
    top: '6px',
    bottom: 0,
    zIndex: 1,
    userSelect: 'none',
    fontSize: '1rem',
    color: '#e8e8fd',
  },
})
`;

const SandpackTabs = () => {
  return (
    <Sandpack
      template="react"
      dependencies={{
        'framer-motion': '6.2.4',
        '@stitches/react': '1.2.5'
      }}
      files={{
        '/App.js': {
          code: AppCode
        },
        '/Components.js': {
          code: ComponentsCode
        }
      }}
    />
  );
};

export default SandpackTabs;
