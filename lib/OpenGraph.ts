import { v2 as cloudinary } from 'cloudinary';

export function generateOGImage({
  title,
  imageUrl
}: {
  title: string;
  imageUrl: string;
}) {
  cloudinary.config({
    cloud_name: 'YOUR_CLOUD_NAME'
  });

  return cloudinary.url('og_social_large', {
    width: 1200,
    height: 630,
    crop: 'fill',
    transformation: [
      {
        fetch_format: 'auto',
        quality: 'auto'
      },
      {
        color: '#FFFFFF',
        crop: 'fit',
        width: 630,
        height: 450,
        overlay: {
          font_family: 'Arial',
          font_size: '60',
          font_weight: 'bold',
          text: title
        }
      },
      {
        flags: 'layer_apply',
        gravity: 'west',
        x: 45,
        y: -40
      },
      {
        crop: 'fill',
        overlay: {
          url: imageUrl
        }
      },
      {
        flags: 'layer_apply',
        width: 580,
        height: 640,
        gravity: 'east'
      }
    ]
  });
}

export default function generateSocialImage({
  title,
  cloudName,
  imagePublicID,
  cloudinaryUrlBase = 'https://res.cloudinary.com',
  version = null,
  titleFont = 'arial',
  titleExtraConfig = '_bold',
  underlayImageWidth = 580,
  underlayImageHeight = 630,
  underlayImage = '',
  imageWidth = 1200,
  imageHeight = 630,
  textAreaWidth = 630,
  textAreaHeight = 450,
  textLeftOffset = 45,
  textBottomOffset = -40,
  textColor = 'FFFFFF',
  titleFontSize = 60
}: any): string {
  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${imageWidth}`,
    `h_${imageHeight}`,
    'c_fill',
    'f_auto'
  ].join(',');

  const underlayConfig = [
    `w_${underlayImageWidth}`,
    `h_${underlayImageHeight}`,
    `c_fill`,
    `u_${underlayImage}/fl_layer_apply`,
    `g_east`
  ].join(',');

  // configure the title text
  const titleConfig = [
    `w_${textAreaWidth}`,
    `h_${textAreaHeight}`,
    'c_fit',
    `co_rgb:${textColor}`,
    'g_west',
    `x_${textLeftOffset}`,
    `y_${textBottomOffset}`,
    `l_text:${titleFont}_${titleFontSize}${titleExtraConfig}:${encodeURIComponent(
      title
    )}`
  ].join(',');

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    cloudinaryUrlBase,
    cloudName,
    'image',
    'upload',
    imageConfig,
    underlayConfig,
    titleConfig,
    version,
    imagePublicID
  ];

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean);

  // join all the parts into a valid URL to the generated image
  return validParts.join('/');
}
