export const defaultOptions = {
  preview: false
};

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const previewToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

class ContentfulApi {
  static async callContentful(
    query: any,
    variables = {},
    options = defaultOptions
  ) {
    const fetchUrl =
      'https://graphql.contentful.com/content/v1/spaces/' + spaceId;

    const token = options.preview ? previewToken : accessToken;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };

    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers
    };

    try {
      const data = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json()
      );
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default class ContentfulGears extends ContentfulApi {
  static async getAll() {
    const query = `{
      gearCollection(order: [title_ASC]) {
        items {
          sys {
            id
          }
          title
          description
          category,
          link,
          affiliateLinkText,
          affiliateLink
          image {
            url
            title
          }
        }
      }
    }`;

    const response = await this.callContentful(query);

    const gearCollection = response.data.gearCollection.items
      ? response.data.gearCollection.items
      : [];

    return gearCollection;
  }
}
