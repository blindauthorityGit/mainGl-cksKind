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
      name: 'farbe',
      title: 'Farbe',
      type: 'simplerColor',
    },
  ],
}
