import { useEffect, useState } from 'react';

import Button from '~/components/Button';
import Card from '~/components/Card';
import Flex from '~/components/Flex';
import Text from '~/components/Typography';
import Tooltip from '~/components/Tooltip';
import { HighlightedCodeText } from '~/components/Code/CodeBlock';
import { calculateLinesToHighlight } from '~/components/Code/utils';
import { ArrowIcon, PauseIcon, PlayIcon } from '~/components/Icons';

function getStackTrace() {
  let stack = new Error().stack || '';
  const Stack = stack.split('\n').map((line) => line.trim());

  const cleanedStack = Stack.splice(stack[0] == 'Error' ? 2 : 1).map(
    (line) => line.split(' ')[1]
  );
  return cleanedStack;
}

function add(value: any, increment: number) {
  console.log(getStackTrace);
  return value + increment;
}

function plusTwo(value: number) {
  console.log(getStackTrace);
  return add(value, 2);
}

function run() {
  console.log(getStackTrace);
  console.log(plusTwo(1));
}

run();

const codeString = `function add(value, increment) {
  return value + increment;
}

function plusTwo(value: number) {
  return add(value, 2);
}

function run() {
  console.log(plusTwo(1));
}

run()`;

const linesToHighlight = [
  '',
  '',
  '{13,9}',
  '{5,10}',
  '{1,6}',
  '{5,10}',
  '{13,9}',
  '',
  ''
];

const blockInCallStack = [
  [],
  ['main()'],
  ['run()', 'main()'],
  ['plusTwo(1)', 'run()', 'main()'],
  ['add(1,2)', 'plusTwo(1)', 'run()', 'main()'],
  ['plusTwo(1)', 'run()', 'main()'],
  ['run()', 'main()'],
  ['main()'],
  []
];

const Callstack = () => {
  const [indexHighlight, setIndexHighlight] = useState(0);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (paused) {
      return;
    }

    if (indexHighlight === linesToHighlight.length - 1) {
      setPaused(true);
      setIndexHighlight(0);
      return;
    }
  }, [indexHighlight, paused]);

  // eval(codeString)

  run();
  return (
    <Card title="Callstack" css={{ marginBottom: '2.25rem' }}>
      <Flex>
        <HighlightedCodeText
          codeString={codeString}
          language="javascript"
          highlightLine={calculateLinesToHighlight(
            linesToHighlight[indexHighlight]
          )}
          // highlightStyle="opacity"
        />
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="end"
          id="callstack"
          css={{
            height: '250px',
            flexGrow: 1,
            gap: '8px'
          }}
        >
          {blockInCallStack[indexHighlight].map((code, index) => (
            <Flex
              direction="column"
              justifyContent="center"
              css={{
                width: '90%',
                height: '48px',
                background: 'var(--laodeaksar-colors-emphasis)',
                color: 'var(--laodeaksar-colors-typeface-primary)',
                borderRadius: '$1'
              }}
              key={index}
            >
              {code}
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Card.Body>
        <Flex justifyContent="space-between">
          <Tooltip
            id="playpauseButton-callstack"
            tooltipText={paused ? 'Play' : 'Pause'}
          >
            <Button
              aria-label={paused ? 'Play' : 'Pause'}
              aria-describedby="playpauseButton"
              variant="icon"
              icon={paused ? <PlayIcon /> : <PauseIcon />}
              onClick={() => setPaused((prev) => !prev)}
            />
          </Tooltip>
          <Flex justifyContent="center" gap={3}>
            <Tooltip id="previous-step-callstack" tooltipText="Previous step">
              <Button
                id="prev"
                aria-label="Previous"
                variant="icon"
                icon={<ArrowIcon style={{ transform: 'scaleX(-1)' }} />}
                onClick={() =>
                  setIndexHighlight((prev) => {
                    if (prev - 1 < 0) {
                      return 0;
                    }
                    return prev - 1;
                  })
                }
              />
            </Tooltip>
            <Text css={{ marginBottom: 0 }} size="2">
              {indexHighlight + 1}/{linesToHighlight.length - 1}
            </Text>
            <Tooltip id="next-step-callstack" tooltipText="Next step">
              <Button
                id="next"
                aria-label="Next"
                variant="icon"
                icon={<ArrowIcon />}
                onClick={() =>
                  setIndexHighlight((prev) => {
                    if (prev + 1 > linesToHighlight.length - 1) {
                      return 0;
                    }
                    return prev + 1;
                  })
                }
              />
            </Tooltip>
          </Flex>
          <div />
        </Flex>
      </Card.Body>
    </Card>
  );
};

export default Callstack;
