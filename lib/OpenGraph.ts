/*function cleanText(text: string) {
  return encodeURIComponent(text).replace(/%(23|2C|2F|3F|5C)/g, '%25$1');
}*/

const e = (str: string) => encodeURIComponent(encodeURIComponent(str));

export const createOgImage = ({
  title,
  meta /*, underlay*/
}: {
  title: string;
  meta: string /*, underlay: string*/;
}) =>
  [
    // ACCOUNT PREFIX
    `https://res.cloudinary.com/laodeaksar/image/upload`,
    // Composed Image Transformations
    `w_1200,h_630,c_fill,q_auto,f_auto`,

    // UNDERLAY
    //`w_580,h_630,c_fill`,
    // Positioning
    //`u_${underlay}/fl_layer_apply, g_east`,

    // TITLE
    // Karla google font in light rose
    `l_text:Karla_72_bold:${e(title)},co_rgb:ffe4e6,c_fit,w_1400,h_240`,
    // Positioning
    `fl_layer_apply,g_south_west,x_100,y_180`,

    // META
    // Karla, but smaller
    `l_text:Karla_48:${e(meta)},co_rgb:ffe4e680,c_fit,w_1400`,
    // Positioning
    `fl_layer_apply,g_south_west,x_100,y_100`,

    // PROFILE IMAGE
    // dynamically fetched from my twitter profile
    `l_twitter_name:ode_aksar`,
    // Transformations
    `c_thumb,g_face,r_max,w_380,h_380,q_100`,
    // Positioning
    `fl_layer_apply,w_140,g_north_west,x_100,y_100`,

    // BG
    `og_social_large.png`
  ].join('/');
