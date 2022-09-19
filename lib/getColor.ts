// const slugify = (str) => str.replace(/\s+/g, '-').toLowerCase();

export const getColor = (name?: string) => {
  let color;

  switch (name) {
    case 'just':
      color = '90deg, #ffa0ae 0%, #aacaef 75%';
      break;

    default:
      color = '90deg, #ffa0ae 0%, #aacaef 75%';
      break;
  }

  return color;
};
