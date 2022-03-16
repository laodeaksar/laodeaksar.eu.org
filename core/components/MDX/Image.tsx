// import { loader } from '~/lib/next-image-loader'
import NextImage, { ImageProps } from 'next/image';

import { styled } from '~/lib/stitches.config';

import Box from '~/components/Box';
import Text from '~/components/Typography';

const StyledFigure = styled('figure', {
  marginBottom: '2.25rem',
  mx: 0
});

const Image = (props: ImageProps) => {
  return (
    <StyledFigure>
      <NextImage {...props} /* loader={loader} */ quality={50} />
      <Text
        as="figcaption"
        css={{
          lineHeight: '1.5',
          paddingTop: '10px'
        }}
        size="1"
        variant="tertiary"
        weight="3"
      >
        {props.alt}
      </Text>
    </StyledFigure>
  );
};

export default Image;

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

export const MdxImage = ({
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
  if (alt || title) {
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
            alt={title ? alt : ''}
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
            {title || alt}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <NextImage
      src={src}
      className={classNameList}
      alt=""
      layout="responsive"
      width={width}
      height={height}
    />
  );
};
