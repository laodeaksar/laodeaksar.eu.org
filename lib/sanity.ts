import createImageUrlBuilder from '@sanity/image-url';
import { sanityConfig } from './sanity-config';

export const imageBuilder = createImageUrlBuilder(sanityConfig as any);

export const urlForImage = (source:any) =>
  imageBuilder.image(source).auto('format').fit('max');
