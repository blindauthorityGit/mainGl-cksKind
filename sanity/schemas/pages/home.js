// schemas/page.js
export default {
  name: 'home',
  title: 'Home',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'components',
      title: 'Components',
      type: 'array',
      of: [
        {
          type: 'mainHero', // Reference the object type directly
        },
        {
          type: 'basicHero', // Reference the object type directly
        },
        {
          type: 'cardCollection', // Reference the object type directly
        },
        {
          type: 'ctaText', // Reference the object type directly
        },
        {
          type: 'textWithImage', // Reference the object type directly
        },
        {
          type: 'fullImageWidthText', // Reference the object type directly
        },
        {
          type: 'eventslider', // Reference the object type directly
        },
        // Add other custom component types as needed
      ],
    },
    // Add other fields or components as needed
  ],
}
