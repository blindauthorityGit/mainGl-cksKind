import {MdInfo} from 'react-icons/md'

export default {
  name: 'kursInfo',
  title: 'Kurs Info',
  type: 'document',
  icon: MdInfo, // Use the MdInfo icon
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // Adjust as needed
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
        isUnique: () => true, // You can customize this function to check uniqueness
      },
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
          type: 'mainHero',
        },
        {
          type: 'basicHero',
        },
        {
          type: 'cardCollection',
        },
        {
          type: 'ctaText',
        },
        {
          type: 'textWithImage',
        },
        {
          type: 'fullImageWidthText',
        },
        {
          type: 'eventslider',
        },
        {
          type: 'basicText',
        },
        // Add other custom component types as needed
      ],
    },
    // Add other fields or components as needed
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}
