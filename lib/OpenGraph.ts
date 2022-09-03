export default function generateSocialImage({
  title,
  underlayImage = ''
}: any): string {
  const image = {
    width: 1200,
    height: 630
  };
  // configure social media image dimensions, quality, and format
  const imageConfig = [
    `w_${image.width}`,
    `h_${image.height}`,
    'c_fill',
    'q_auto',
    'f_auto'
  ].join(',');

  const underlayConfig = [
    `w_580`,
    `h_${image.height}`,
    `c_fill`,
    `u_${underlayImage}/fl_layer_apply`,
    `g_east`
  ];

  // configure the title text
  const titleConfig = [
    `w_630`,
    `h_450`,
    'c_fit',
    'g_west',
    `co_rgb:ffffff`,
    `x_45`,
    `y_-40`,
    `l_text:ibmplexsansbold.ttf_60:${cleanText(title)}`
  ].join(',');

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [
    'https://res.cloudinary.com',
    'laodeaksar',
    'image',
    'upload',
    imageConfig,
    underlayConfig,
    titleConfig,
    'og_social_large.png'
  ];

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean);

  // join all the parts into a valid URL to the generated image
  return validParts.join('/');
}

function cleanText(text: string) {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
}
