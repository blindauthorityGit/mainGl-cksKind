// schemas/page.js

import {MdHome} from 'react-icons/md'

export default {
  name: 'raumvermietung',
  title: 'Raumvermietung',
  type: 'document',
  icon: MdHome, // Set the icon for this document type

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
        {
          type: 'basicText', // Reference the object type directly
        },
        {
          type: 'roomDetails', // Reference the object type directly
        },
        // Add other custom component types as needed
      ],
    },
    {
      name: 'anfrageImage',
      title: 'Bild Anfrage',
      type: 'image',
    },
    // Add other fields or components as needed
  ],
}
