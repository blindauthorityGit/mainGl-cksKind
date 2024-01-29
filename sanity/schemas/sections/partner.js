// schemas/partner.js
import {FaRegHandshake} from 'react-icons/fa'

export default {
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: FaRegHandshake,
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
      name: 'image',
      title: 'Image',
      type: 'image',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'website',
      title: 'Website',
      type: 'string',
    },
    {
      name: 'kurse',
      title: 'Kurse',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'kategorie'}], // Adjust the reference type as needed
        },
      ],
    },
    {
      name: 'beschreibung',
      title: 'Beschreibung',
      type: 'text',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'basicText', // Reference your custom basicText component type
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}
