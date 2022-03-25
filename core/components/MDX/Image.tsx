// import { loader } from '~/lib/next-image-loader'
import NextImage from 'next/image';

import Box from '~/components/Box';
import Text from '~/components/Typography';

interface Props {
  src: string | StaticImageData;
  alt?: string;
  className?: string;
  title?: string;
  height: string;
  width: string;
  placeholder?: 'blur' | 'empty';
  'placeholder-data'?: string;
  'is-remote'?: boolean | string;
  shadow?: boolean;
  rounded?: boolean;
}

export const Image = ({
  src,
  alt,
  title,
  height,
  width,
  className,
  placeholder,
  'placeholder-data': placeholderData,
  shadow,
  rounded,
  'is-remote': isRemote
}: Props) => {
  const classNameList = className;
  return (
    <Box
      as="figure"
      className={classNameList}
      css={{
        position: 'relative',
        padding: 0,
        mx: 0,
        width: isRemote ? '100%' : undefined,
        height: isRemote ? '468px' : undefined
      }}
      my="6"
    >
      <Box
        css={{
          boxShadow: shadow ? '$default' : undefined,
          borderRadius: rounded ? '$1' : undefined,
          overflow: 'hidden'
        }}
      >
        <NextImage
          src={src}
          alt={alt}
          layout={!isRemote ? 'responsive' : 'fill'}
          width={width}
          height={height}
          placeholder={placeholderData ? 'blur' : placeholder}
          blurDataURL={placeholderData ? placeholderData : undefined}
          objectFit={isRemote ? 'cover' : undefined}
        />
        <Text
          as="figcaption"
          css={{
            fontStyle: 'italic',
            textAlign: 'center',
            lineHeight: '1.5',
            mt: '$2',
            position: isRemote ? 'absolute' : undefined,
            bottom: isRemote ? -5 : undefined,
            width: isRemote ? '100%' : undefined
          }}
          size="1"
          variant="tertiary"
          weight="3"
        >
          {alt || title}
        </Text>
      </Box>
    </Box>
  );
};

export default Image;
