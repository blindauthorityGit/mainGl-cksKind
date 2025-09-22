// schemas/page.js

import {FaBirthdayCake} from 'react-icons/fa'

export default {
  name: 'kindergeburtstag',
  title: 'Kindergeburtstag',
  type: 'document',
  icon: FaBirthdayCake, // Set the icon for this document type

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
        {
          type: 'downloadBereich', // Reference the object type directly
        },
        // Add other custom component types as needed
      ],
    },

    {
      name: 'anfrageImage',
      title: 'Bild Anfrage',
      type: 'image',
    },
    {
      name: 'ausnahmen',
      title: 'Ausnahmen',
      type: 'array',
      of: [{type: 'exceptions'}],
    },
    // Add other fields or components as needed
  ],
}
