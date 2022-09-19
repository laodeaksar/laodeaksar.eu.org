export const getDisplayedPoster = (poster: string, dark: boolean) => {
  if (dark) {
    return `/static/posters/${poster}_dark.png`;
  }

  return `/static/posters/${poster}_light.png`;
};
