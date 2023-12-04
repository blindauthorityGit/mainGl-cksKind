// schemas/kontakt.js
import {FaAddressCard} from 'react-icons/fa' // You can replace this with your preferred icon

export default {
  name: 'kontakt',
  title: 'Kontakt',
  type: 'document',
  icon: FaAddressCard, // Icon for the kontakt schema
  fields: [
    {
      name: 'headline',
      title: 'Überschrift',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'text',
    },
    {
      name: 'email',
      title: 'E-Mail',
      type: 'string',
    },
    {
      name: 'adresse',
      title: 'Adresse',
      type: 'text',
    },
    {
      name: 'telefon',
      title: 'Telefon',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
  },
}
