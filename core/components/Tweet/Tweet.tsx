import Image from 'next/image';

import { Anchor, Flex, formatDate, Text } from '@laodeaksarr/design-system';

import {
  LikeIcon,
  ReplyIcon,
  RetweetIcon,
  TwitterLogo,
  VerifiedIcon
} from './Icons';
import {
  ActionIcons,
  Avatar,
  ImageGrid,
  Name,
  SingleImageWrapper,
  TweetWrapper,
  styles
} from './Styles';
import type { Props } from './types';

/*
  Note: this is heavily inspired by https://github.com/leerob/leerob.io/blob/main/components/Tweet.js
*/
const Tweet = ({ tweet }: Props) => {
  if (!tweet || !tweet.author) {
    return null;
  }

  const {
    author,
    media,
    created_at,
    public_metrics,
    id,
    text,
    referenced_tweets
  } = tweet;

  const authorURL = 'https://twitter.com/' + author.username;
  const likeURL = 'https://twitter.com/intent/like?tweet_id=' + id;
  const retweetURL = 'https://twitter.com/intent/retweet?tweet_id=' + id;
  const replyURL = 'https://twitter.com/intent/tweet?in_reply_to=' + id;
  const tweetURL = 'https://twitter.com/' + author.username + '/status/' + id;
  const createdAt = new Date(created_at);

  const formattedText = text
    .replace(/https:\/\/[\n\S]+/g, '')
    .replace('&amp;', '&');
  const quoteTweet =
    referenced_tweets &&
    referenced_tweets.find((t) => t.type === 'quoted');

  return (
    <TweetWrapper>
      <Flex alignItems="center" justifyContent="space-between">
        <Avatar href={authorURL} target="_blank" rel="noopener noreferrer">
          <Image
            alt={author.username}
            height={46}
            width={46}
            src={author.profile_image_url}
            className={styles.profileImage}
          />
        </Avatar>
        <Name
          href={authorURL}
          className="author"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text
            css={{ marginBottom: 0, lineHeight: '1.5', display: 'flex' }}
            title={author.name}
            variant="primary"
            weight="4"
          >
            {author.name}
            {author.verified && <VerifiedIcon outline={false} variant="none" />}
          </Text>
          <Text
            css={{ marginBottom: 0, lineHeight: 'initial' }}
            variant="tertiary"
            title={`@${author.username}`}
            size="2"
          >
            @{author.username}
          </Text>
        </Name>
        <Anchor
          style={{
            marginLeft: 'auto'
          }}
          href={authorURL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`@${author.username}'s Twitter profile`}
        >
          <TwitterLogo outline={false} variant="none" />
        </Anchor>
      </Flex>
      <Text
        as="p"
        css={{
          my: '1rem',
          whiteSpace: 'pre-wrap'
        }}
        variant="primary"
      >
        {formattedText}
      </Text>
      {media && media?.length > 1 ? (
        <ImageGrid>
          {media.map((m: any) => (
            <div
              key={m.media_key}
              style={{
                borderRadius: 'var(--radii-1)',
                overflow: 'hidden'
              }}
            >
              <Image
                alt={text}
                layout="intrinsic"
                height={m.height}
                width={m.width}
                src={m.url}
              />
            </div>
          ))}
        </ImageGrid>
      ) : null}
      {media && media?.length === 1 ? (
        <SingleImageWrapper>
          {media.map((m: any) => (
            <Image
              key={m.media_key}
              alt={text}
              height={m.height}
              width={m.width}
              src={m.url}
              className={styles.singleImage}
            />
          ))}
        </SingleImageWrapper>
      ) : null}
      {quoteTweet && <Tweet tweet={{ ...quoteTweet }} />}
      <Anchor
        discreet
        href={tweetURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <time
          title={`Time Posted: ${createdAt.toUTCString()}`}
          dateTime={createdAt.toISOString()}
        >
          {/* {format(createdAt, 'h:mm a - MMM d, y')} */}
          {formatDate(createdAt.toDateString())}
        </time>
      </Anchor>
      <Flex css={{ marginTop: '1rem' }}>
        <ActionIcons
          css={{
            '&:hover': {
              color: 'var(--laodeaksar-colors-brand)'
            }
          }}
          href={replyURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ReplyIcon outline={false} variant="none" />
          <span>
            {new Number(public_metrics.reply_count).toLocaleString('en', {
              notation: 'compact'
            })}
          </span>
        </ActionIcons>
        <ActionIcons
          css={{
            '&:hover': {
              color: 'hsla(var(--palette-green-45))'
            }
          }}
          href={retweetURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RetweetIcon outline={false} variant="none" />
          <span>
            {new Number(public_metrics.retweet_count).toLocaleString('en', {
              notation: 'compact'
            })}
          </span>
        </ActionIcons>
        <ActionIcons
          css={{
            '&:hover': {
              color: 'var(--laodeaksar-colors-danger)'
            }
          }}
          href={likeURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <LikeIcon outline={false} variant="none" />
          <span>
            {new Number(public_metrics.like_count).toLocaleString('en', {
              notation: 'compact'
            })}
          </span>
        </ActionIcons>
      </Flex>
    </TweetWrapper>
  );
};

export default Tweet;
