import { createConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { markdownSchema } from 'sanity-plugin-markdown';

export default createConfig({
  name: 'default',
  title: 'laodeaksar.eu.org',
  projectId: '1zvjuck5',
  dataset: 'production',
  plugins: [deskTool(), markdownSchema()],
  schema: {
    types: [
      {
        name: 'post',
        type: 'document',
        title: 'Post',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string'
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title'
            }
          },
          {
            name: 'content',
            title: 'Content',
            type: 'markdown'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'string'
          },
          {
            name: 'cover',
            title: 'Cover',
            type: 'image'
          },
          {
            name: 'date',
            title: 'Date',
            type: 'datetime'
          },
          {
            name: 'featured',
            title: 'Featured',
            type: 'boolean'
          },
          {
            name: 'colorFeatured',
            title: 'Color Featured',
            type: 'string'
          },
          {
            name: 'fontFeatured',
            title: 'Font Featured',
            type: 'string'
          },
          {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }]
          },
          {
            name: 'updated',
            title: 'Updated',
            type: 'datetime'
          }
        ]
      },
      {
        name: 'snippet',
        type: 'document',
        title: 'Snippet',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'title'
            }
          },
          {
            name: 'content',
            title: 'Content',
            type: 'markdown'
          },
          {
            name: 'description',
            title: 'Description',
            type: 'string'
          },
          {
            name: 'logo',
            title: 'Logo',
            type: 'image'
          },
          {
            name: 'language',
            title: 'Language',
            type: 'string'
          }
        ]
      }
    ]
  }
});
