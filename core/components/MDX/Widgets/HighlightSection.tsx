import { useEffect, useState } from 'react';

import { Card, InlineCode, Switch } from '@laodeaksarr/design-system';

const HighlightSection = () => {
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');

    if (highlight) {
      sections.forEach((section) => {
        // @ts-ignore
        section.style = `
        -webkit-transition: box-shadow linear 0.5s;
        transition: box-shadow linear 0.5s;
        box-shadow: 0 0 20px #ff008c;
        `;
      });
    } else {
      sections.forEach((section) => {
        // @ts-ignore
        section.style = `
        -webkit-transition: box-shadow linear 0.5s;
        transition: box-shadow linear 0.5s;
        box-shadow: none;
        `;
      });
    }
  }, [highlight]);

  return (
    <Card
      depth={1}
      css={{
        marginBottom: '2.25rem'
      }}
    >
      <Card.Body>
        <Switch
          aria-label="Highlight the section tags of this post"
          toggled={highlight}
          id="highlight"
          label={
            <div>
              Highlight the <InlineCode>{'<section/>'}</InlineCode> tags of this
              post
            </div>
          }
          onChange={() => {
            setHighlight((prev) => !prev);
          }}
        />
      </Card.Body>
    </Card>
  );
};

export default HighlightSection;
