// import { groq } from "next-sanity";

export const postFields = `
  _id,
  title,
  subtitle,
  date,
  updated,
  description,
  featured,
  colorFeatured,
  cover,
  "tags": tags,
  "slug": slug.current,
`;

export const indexQuery = `
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`;

export const postQuery = `
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  }
}`;

export const postSlugsQuery = `
*[_type == "post" && defined(slug.current)][].slug.current
`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`;

export const postUpdatedQuery = `*[_type == "post" && _id == $id].slug.current`;

export const snippetFields = `
  _id,
  title,
  language,
  date,
  description,
  logo,
  "slug": slug.current,
`;

export const allSnippetsQuery = `
*[_type == "snippet"] | order(date desc, _updatedAt desc) {
  ${snippetFields}
}`;

export const snippetsQuery = `
{
  "snippet": *[_type == "snippet" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${snippetFields}
  }
}`;

export const snippetSlugsQuery = `
*[_type == "snippet" && defined(slug.current)][].slug.current
`;

export const snippetBySlugQuery = `
*[_type == "snippet" && slug.current == $slug][0] {
  ${snippetFields}
}
`;

export const tagsQuery = `
*[_type == "post" && $keyword in tags[].label] {
  ${postFields}
}
`;

const gearFields = `
  _id,
  content,
  category,
  image,
  link,
  affiliateLink,
  affiliateLinkText,
`;

export const gearQuery = `
*[_type == "gear"] | order(_updatedAt desc) {
  ${gearFields}
}`;

