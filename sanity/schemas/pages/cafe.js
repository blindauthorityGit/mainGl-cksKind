// schemas/page.js

import {IoIosCafe} from 'react-icons/io'

export default {
  name: 'cafe',
  title: 'Cafe',
  type: 'document',
  icon: IoIosCafe, // Set the icon for this document type

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
          type: 'cardButtonCollection', // Reference the object type directly
        },
        {
          type: 'imageGallery', // Reference the object type directly
        },
        // Add other custom component types as needed
      ],
    },
    {
      name: 'reservationImage',
      title: 'Bild Reservierung',
      type: 'image',
    },
    {
      name: 'oeffnungszeiten',
      title: 'Öffnungszeiten',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Öffnungszeit',
          fields: [
            {
              name: 'day',
              title: 'Tag',
              type: 'string',
              description: 'Wochentag, z.B. "Montag"',
            },
            {
              name: 'time',
              title: 'Zeit',
              type: 'string',
              description: 'Öffnungszeit, z.B. "08:00 - 18:00"',
            },
          ],
          preview: {
            select: {
              title: 'day',
              subtitle: 'time',
            },
          },
        },
      ],
    },
    // Add other fields or components as needed
  ],
}
