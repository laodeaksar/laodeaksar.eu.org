import { motion } from 'framer-motion';
import Image from 'next/image';

import { styled } from '~/lib/stitches.config';

import type { RepliesProps, Reply } from './types';

const Replies = ({ replies }: RepliesProps) => {
  const sanitizedReplies = replies
    .filter((reply) => reply.data.url.includes('https://twitter.com'))
    .reduce((acc: Record<string, Reply>, item: Reply) => {
      if (item.data?.author?.url && !acc[item.data.author.url]) {
        acc[item.data.author.url] = item;
        return acc;
      }

      return acc;
    }, {});

  return (
    <>
      {Object.values(sanitizedReplies) &&
      Object.values(sanitizedReplies).length ? (
        <RepliesList
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              opacity: 1,
              transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
              }
            },
            hidden: {
              opacity: 0,
              transition: {
                when: 'afterChildren'
              }
            }
          }}
        >
          {Object.values(sanitizedReplies)
            .filter((link) => link.data.author)
            .map((link) => (
              <Head
                key={link.id}
                data-tip={link.activity.sentence}
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0, x: -10 }
                }}
                whileHover={{
                  marginRight: '2px',
                  transition: { ease: 'easeOut' }
                }}
              >
                <a
                  href={link.data.author.url}
                  style={{ flexShrink: 0, cursor: 'pointer' }}
                >
                  <Image
                    height={50}
                    width={50}
                    src={link.data.author.photo}
                    alt={'avatar of' + link.data.author.name}
                  />
                </a>
              </Head>
            ))}
          {/* <ReactTooltip place="top" effect="solid" /> */}
        </RepliesList>
      ) : null}
    </>
  );
};

export default Replies;

const RepliesList = styled(motion.ul, {
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '0px',
  marginBottom: '8px',
  marginTop: '15px',
  padding: '0'
});

const Head = styled(motion.li, {
  listStyle: 'none',
  marginRight: '-10px',
  marginBottom: 'calc(1.45rem / 2',

  img: {
    borderRadius: '$round',
    border: '3px solid var(--laodeaksar-colors-brand)'
  }
});
