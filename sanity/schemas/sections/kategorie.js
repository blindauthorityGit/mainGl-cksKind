// schemas/kategorie.js
import {FaTags} from 'react-icons/fa'

export default {
  name: 'kategorie',
  title: 'Kategorie',
  type: 'document',
  icon: FaTags,

  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Beschreibung',
      type: 'text',
    },
    {
      name: 'button',
      title: 'Button',
      type: 'button',
      description: 'Optionaler Button für zusätzliche Aktionen.',
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
    },
    {
      name: 'farbe',
      title: 'Farbe',
      type: 'simplerColor',
    },
  ],
}
